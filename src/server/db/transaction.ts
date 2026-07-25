import "server-only";
import type { Prisma } from "@/generated/prisma/client";
import { getPrisma } from "@/server/db/prisma";

export type TransactionClient = Prisma.TransactionClient;

export function withTransaction<T>(
  operation: (transaction: TransactionClient) => Promise<T>,
): Promise<T> {
  return getPrisma().$transaction(operation);
}
