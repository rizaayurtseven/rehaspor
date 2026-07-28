import "server-only";
import type { LoginInput } from "@/contracts/auth";
import { getPrisma } from "@/server/db/prisma";
import { AppError } from "@/server/http/errors";
import {
  createSessionToken,
  getSessionDurationSeconds,
  hashSessionToken,
  type SessionContext,
} from "@/server/auth/session";
import { hashPassword, verifyPassword } from "@/server/auth/password";

type LoginRequestMetadata = {
  ipHash?: string;
  userAgent?: string;
  requestId: string;
};

export type LoginResult = {
  user: SessionContext["user"];
  token: string;
  maxAge: number;
};

export async function login(
  input: LoginInput,
  metadata: LoginRequestMetadata,
): Promise<LoginResult> {
  const prisma = getPrisma();
  const user = await prisma.user.findUnique({ where: { email: input.email } });

  if (!user) {
    await hashPassword(input.password);
    throw invalidCredentialsError();
  }

  const isPasswordValid = await verifyPassword(user.passwordHash, input.password);
  if (!isPasswordValid || user.status !== "ACTIVE") {
    await prisma.auditLog.create({
      data: {
        actorUserId: user.id,
        action: "AUTH_LOGIN_FAILED",
        entityType: "User",
        entityId: user.id,
        requestId: metadata.requestId,
      },
    });
    throw invalidCredentialsError();
  }

  const token = createSessionToken();
  const maxAge = getSessionDurationSeconds(input.rememberMe);
  const expiresAt = new Date(Date.now() + maxAge * 1_000);

  await prisma.$transaction(async (transaction) => {
    await transaction.session.create({
      data: {
        userId: user.id,
        tokenHash: hashSessionToken(token),
        expiresAt,
        ipHash: metadata.ipHash,
        userAgent: metadata.userAgent,
      },
    });
    await transaction.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });
    await transaction.auditLog.create({
      data: {
        actorUserId: user.id,
        action: "AUTH_LOGIN_SUCCEEDED",
        entityType: "User",
        entityId: user.id,
        requestId: metadata.requestId,
      },
    });
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      role: user.role,
    },
    token,
    maxAge,
  };
}

export async function logout(token: string, requestId: string): Promise<void> {
  const prisma = getPrisma();
  const session = await prisma.session.findUnique({
    where: { tokenHash: hashSessionToken(token) },
    select: { id: true, userId: true },
  });

  if (!session) {
    return;
  }

  await prisma.$transaction([
    prisma.session.delete({ where: { id: session.id } }),
    prisma.auditLog.create({
      data: {
        actorUserId: session.userId,
        action: "AUTH_LOGOUT",
        entityType: "Session",
        entityId: session.id,
        requestId,
      },
    }),
  ]);
}

function invalidCredentialsError(): AppError {
  return new AppError("E-posta veya şifre hatalı.", {
    code: "INVALID_CREDENTIALS",
    status: 401,
  });
}
