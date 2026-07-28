import "server-only";
import { getPrisma } from "@/server/db/prisma";

export async function checkDatabaseConnection(): Promise<{ latencyMs: number }> {
  const startedAt = performance.now();
  await getPrisma().$queryRaw`SELECT 1`;

  return {
    latencyMs: Math.max(0, Math.round(performance.now() - startedAt)),
  };
}
