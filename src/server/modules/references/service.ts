import "server-only";
import type { CreateReferenceInput, UpdateReferenceInput } from "@/contracts/reference";
import { getPrisma } from "@/server/db/prisma";
import { AppError } from "@/server/http/errors";

function formatAssetUrl(storageKey?: string | null): string | undefined {
  if (!storageKey) return undefined;
  if (storageKey.startsWith("http://") || storageKey.startsWith("https://")) return storageKey;
  let cleaned = storageKey;
  if (cleaned.startsWith("public/")) cleaned = cleaned.slice(7);
  if (!cleaned.startsWith("/")) cleaned = "/" + cleaned;
  return cleaned;
}

async function resolveAssetId(
  tx: any,
  assetId?: string | null,
  imageUrl?: string | null,
  actorUserId?: string | null
): Promise<string | null> {
  if (assetId) {
    const existing = await tx.asset.findUnique({ where: { id: assetId } });
    if (existing) return existing.id;
  }

  if (imageUrl) {
    let storageKey = imageUrl.startsWith("/") ? imageUrl.slice(1) : imageUrl;
    if (storageKey.startsWith("public/")) {
      storageKey = storageKey.slice(7);
    }
    const existing = await tx.asset.findUnique({ where: { storageKey } });
    if (existing) return existing.id;

    const created = await tx.asset.create({
      data: {
        storageKey,
        originalName: storageKey.split("/").pop() || "image.jpg",
        mimeType: "image/jpeg",
        size: 1024,
        status: "READY",
        uploadedByUserId: actorUserId || null,
      },
    });
    return created.id;
  }

  return null;
}

export async function getAdminReferences() {
  const prisma = getPrisma();
  const refs = await prisma.projectReference.findMany({
    where: { deletedAt: null },
    orderBy: { sortOrder: "asc" },
    include: { image: true },
  });

  return refs.map((r) => ({
    id: r.id,
    title: r.title,
    slug: r.slug,
    city: r.city,
    year: r.year,
    category: r.category,
    description: r.description,
    imageAssetId: r.imageAssetId,
    coverImage: formatAssetUrl(r.image?.storageKey),
    sortOrder: r.sortOrder,
    status: r.status,
    seoTitle: r.seoTitle,
    seoDescription: r.seoDescription,
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  }));
}

export async function createAdminReference(input: CreateReferenceInput, actorUserId: string, requestId: string) {
  const prisma = getPrisma();

  const existing = await prisma.projectReference.findUnique({ where: { slug: input.slug } });
  if (existing) {
    throw new AppError("Bu slug zaten kullanılıyor.", { code: "CONFLICT", status: 409 });
  }

  const created = await prisma.$transaction(async (tx) => {
    const assetId = await resolveAssetId(tx, input.imageAssetId, input.imageUrl, actorUserId);

    const res = await tx.projectReference.create({
      data: {
        title: input.title,
        slug: input.slug,
        city: input.city,
        year: input.year,
        category: input.category,
        description: input.description,
        imageAssetId: assetId,
        sortOrder: input.sortOrder,
        status: input.status,
        seoTitle: input.seoTitle || null,
        seoDescription: input.seoDescription || null,
      },
    });

    await tx.auditLog.create({
      data: {
        actorUserId,
        action: "REFERENCE_CREATE",
        entityType: "ProjectReference",
        entityId: res.id,
        afterJson: JSON.parse(JSON.stringify(res)),
        requestId,
      },
    });

    return res;
  });

  return created;
}

export async function updateAdminReference(id: string, input: UpdateReferenceInput, actorUserId: string, requestId: string) {
  const prisma = getPrisma();
  const existing = await prisma.projectReference.findFirst({ where: { id, deletedAt: null } });

  if (!existing) {
    throw new AppError("Referans bulunamadı.", { code: "NOT_FOUND", status: 404 });
  }

  if (input.slug && input.slug !== existing.slug) {
    const conflicting = await prisma.projectReference.findUnique({ where: { slug: input.slug } });
    if (conflicting) {
      throw new AppError("Bu slug zaten kullanılıyor.", { code: "CONFLICT", status: 409 });
    }
  }

  const updated = await prisma.$transaction(async (tx) => {
    let resolvedImageId: string | null | undefined = undefined;
    if (input.imageAssetId !== undefined || input.imageUrl !== undefined) {
      resolvedImageId = await resolveAssetId(tx, input.imageAssetId, input.imageUrl, actorUserId);
    }

    const res = await tx.projectReference.update({
      where: { id },
      data: {
        ...(input.title !== undefined && { title: input.title }),
        ...(input.slug !== undefined && { slug: input.slug }),
        ...(input.city !== undefined && { city: input.city }),
        ...(input.year !== undefined && { year: input.year }),
        ...(input.category !== undefined && { category: input.category }),
        ...(input.description !== undefined && { description: input.description }),
        ...(resolvedImageId !== undefined && { imageAssetId: resolvedImageId }),
        ...(input.sortOrder !== undefined && { sortOrder: input.sortOrder }),
        ...(input.status !== undefined && { status: input.status }),
        ...(input.seoTitle !== undefined && { seoTitle: input.seoTitle }),
        ...(input.seoDescription !== undefined && { seoDescription: input.seoDescription }),
      },
    });

    await tx.auditLog.create({
      data: {
        actorUserId,
        action: "REFERENCE_UPDATE",
        entityType: "ProjectReference",
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

export async function deleteAdminReference(id: string, actorUserId: string, requestId: string) {
  const prisma = getPrisma();
  const existing = await prisma.projectReference.findFirst({ where: { id, deletedAt: null } });

  if (!existing) {
    throw new AppError("Referans bulunamadı.", { code: "NOT_FOUND", status: 404 });
  }

  await prisma.$transaction(async (tx) => {
    await tx.projectReference.update({
      where: { id },
      data: { deletedAt: new Date(), status: "ARCHIVED" },
    });

    await tx.auditLog.create({
      data: {
        actorUserId,
        action: "REFERENCE_DELETE",
        entityType: "ProjectReference",
        entityId: id,
        beforeJson: JSON.parse(JSON.stringify(existing)),
        requestId,
      },
    });
  });
}
