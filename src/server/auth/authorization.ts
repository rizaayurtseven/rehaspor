import "server-only";
import type { AuthenticatedAdmin } from "@/contracts/auth";
import { getCurrentSession } from "@/server/auth/session";
import { AppError } from "@/server/http/errors";

export async function requireAdmin(): Promise<AuthenticatedAdmin> {
  const session = await getCurrentSession();

  if (!session) {
    throw new AppError("Bu işlem için giriş yapmalısınız.", {
      code: "UNAUTHENTICATED",
      status: 401,
    });
  }

  if (session.user.role !== "ADMIN") {
    throw new AppError("Bu işlem için yetkiniz yok.", {
      code: "FORBIDDEN",
      status: 403,
    });
  }

  return session.user;
}
