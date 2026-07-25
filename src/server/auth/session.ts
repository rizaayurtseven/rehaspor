import "server-only";
import { createHmac, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import type { AuthenticatedAdmin } from "@/contracts/auth";
import { getAuthEnv } from "@/server/config/env";
import { getPrisma } from "@/server/db/prisma";

const shortSessionSeconds = 60 * 60 * 8;
const rememberedSessionSeconds = 60 * 60 * 24 * 30;

export type SessionContext = {
  id: string;
  user: AuthenticatedAdmin;
};

export function createSessionToken(): string {
  return randomBytes(32).toString("base64url");
}

export function hashSessionToken(token: string): string {
  const { SESSION_SECRET } = getAuthEnv();
  return createHmac("sha256", SESSION_SECRET).update(token).digest("hex");
}

export function getSessionDurationSeconds(rememberMe: boolean): number {
  return rememberMe ? rememberedSessionSeconds : shortSessionSeconds;
}

export function getSessionCookieOptions(maxAge: number) {
  const { SESSION_COOKIE_NAME, NODE_ENV } = getAuthEnv();

  return {
    name: SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

export async function getCurrentSession(): Promise<SessionContext | null> {
  const { SESSION_COOKIE_NAME } = getAuthEnv();
  const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const prisma = getPrisma();
  const session = await prisma.session.findUnique({
    where: { tokenHash: hashSessionToken(token) },
    include: { user: true },
  });

  if (!session) {
    return null;
  }

  if (session.expiresAt <= new Date() || session.user.status !== "ACTIVE") {
    await prisma.session.delete({ where: { id: session.id } }).catch(() => undefined);
    return null;
  }

  return {
    id: session.id,
    user: {
      id: session.user.id,
      email: session.user.email,
      displayName: session.user.displayName,
      role: session.user.role,
    },
  };
}

export async function getSessionFromToken(token: string): Promise<SessionContext | null> {
  const prisma = getPrisma();
  const session = await prisma.session.findUnique({
    where: { tokenHash: hashSessionToken(token) },
    include: { user: true },
  });

  if (!session || session.expiresAt <= new Date() || session.user.status !== "ACTIVE") {
    return null;
  }

  return {
    id: session.id,
    user: {
      id: session.user.id,
      email: session.user.email,
      displayName: session.user.displayName,
      role: session.user.role,
    },
  };
}
