import "server-only";
import type { CreateCatalogInput, UpdateCatalogInput } from "@/contracts/catalog";
import { getPrisma } from "@/server/db/prisma";
import { AppError } from "@/server/http/errors";

export async function getAdminCatalogs() {
  const prisma = getPrisma();
  const catalogs = await prisma.catalog.findMany({
    orderBy: { createdAt: "desc" },
    include: { fileAsset: true },
  });

  return catalogs.map((cat) => ({
    id: cat.id,
    title: cat.title,
    language: cat.language,
    description: cat.description,
    fileAssetId: cat.fileAssetId,
    fileUrl: cat.fileAsset?.storageKey ? (cat.fileAsset.storageKey.startsWith("/") ? cat.fileAsset.storageKey : "/" + cat.fileAsset.storageKey) : "/catalog/Katalog.pdf",
    status: cat.status,
    version: cat.version,
    publishedAt: cat.publishedAt ? cat.publishedAt.toISOString() : null,
    createdAt: cat.createdAt.toISOString(),
  }));
}

export async function createAdminCatalog(input: CreateCatalogInput, actorUserId: string, requestId: string) {
  const prisma = getPrisma();

  const catalog = await prisma.$transaction(async (tx) => {
    const created = await tx.catalog.create({
      data: {
        title: input.title,
        language: input.language,
        description: input.description,
        fileAssetId: input.fileAssetId || null,
        status: input.status,
        publishedAt: input.status === "PUBLISHED" ? new Date() : null,
      },
    });

    await tx.auditLog.create({
      data: {
        actorUserId,
        action: "CATALOG_CREATE",
        entityType: "Catalog",
        entityId: created.id,
        afterJson: JSON.parse(JSON.stringify(created)),
        requestId,
      },
    });

    return created;
  });

  return catalog;
}

export async function updateAdminCatalog(id: string, input: UpdateCatalogInput, actorUserId: string, requestId: string) {
  const prisma = getPrisma();
  const existing = await prisma.catalog.findUnique({ where: { id } });

  if (!existing) {
    throw new AppError("Katalog bulunamadı.", { code: "NOT_FOUND", status: 404 });
  }

  const updated = await prisma.$transaction(async (tx) => {
    const res = await tx.catalog.update({
      where: { id },
      data: {
        ...(input.title !== undefined && { title: input.title }),
        ...(input.language !== undefined && { language: input.language }),
        ...(input.description !== undefined && { description: input.description }),
        ...(input.fileAssetId !== undefined && { fileAssetId: input.fileAssetId }),
        ...(input.status !== undefined && {
          status: input.status,
          publishedAt: input.status === "PUBLISHED" ? existing.publishedAt || new Date() : null,
        }),
      },
    });

    await tx.auditLog.create({
      data: {
        actorUserId,
        action: "CATALOG_UPDATE",
        entityType: "Catalog",
        entityId: id,
        beforeJson: JSON.parse(JSON.stringify(existing)),
        afterJson: JSON.parse(JSON.stringify(res)),
        requestId,
      },
    });

    return res;
  });

  return updated;
}
