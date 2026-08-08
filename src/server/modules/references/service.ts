import "server-only";
import type { CreateReferenceInput, UpdateReferenceInput } from "@/contracts/reference";
import { getPrisma } from "@/server/db/prisma";
import { AppError } from "@/server/http/errors";

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
    imageUrl: r.image?.storageKey ? (r.image.storageKey.startsWith("/") ? r.image.storageKey : "/" + r.image.storageKey) : null,
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
    const res = await tx.projectReference.create({
      data: {
        title: input.title,
        slug: input.slug,
        city: input.city,
        year: input.year,
        category: input.category,
        description: input.description,
        imageAssetId: input.imageAssetId || null,
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
    const res = await tx.projectReference.update({
      where: { id },
      data: {
        ...(input.title !== undefined && { title: input.title }),
        ...(input.slug !== undefined && { slug: input.slug }),
        ...(input.city !== undefined && { city: input.city }),
        ...(input.year !== undefined && { year: input.year }),
        ...(input.category !== undefined && { category: input.category }),
        ...(input.description !== undefined && { description: input.description }),
        ...(input.imageAssetId !== undefined && { imageAssetId: input.imageAssetId }),
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
