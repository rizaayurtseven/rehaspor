import "server-only";
import type { CreateCategoryInput, UpdateCategoryInput } from "@/contracts/category";
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

export async function getAdminCategories() {
  const prisma = getPrisma();
  const categories = await prisma.category.findMany({
    where: { deletedAt: null },
    orderBy: { sortOrder: "asc" },
    include: {
      image: true,
      _count: {
        select: { products: { where: { deletedAt: null } } },
      },
    },
  });

  return categories.map((cat) => ({
    id: cat.id,
    title: cat.title,
    slug: cat.slug,
    description: cat.description,
    imageAssetId: cat.imageAssetId,
    coverImage: formatAssetUrl(cat.image?.storageKey),
    sortOrder: cat.sortOrder,
    status: cat.status,
    seoTitle: cat.seoTitle,
    seoDescription: cat.seoDescription,
    productCount: cat._count.products,
    createdAt: cat.createdAt.toISOString(),
    updatedAt: cat.updatedAt.toISOString(),
  }));
}

export async function getAdminCategoryById(id: string) {
  const prisma = getPrisma();
  const cat = await prisma.category.findFirst({
    where: { id, deletedAt: null },
    include: { image: true },
  });

  if (!cat) {
    throw new AppError("Kategori bulunamadı.", { code: "NOT_FOUND", status: 404 });
  }

  return {
    id: cat.id,
    title: cat.title,
    slug: cat.slug,
    description: cat.description,
    imageAssetId: cat.imageAssetId,
    coverImage: formatAssetUrl(cat.image?.storageKey),
    sortOrder: cat.sortOrder,
    status: cat.status,
    seoTitle: cat.seoTitle,
    seoDescription: cat.seoDescription,
    createdAt: cat.createdAt.toISOString(),
    updatedAt: cat.updatedAt.toISOString(),
  };
}

export async function createAdminCategory(input: CreateCategoryInput, actorUserId: string, requestId: string) {
  const prisma = getPrisma();

  const existingSlug = await prisma.category.findUnique({ where: { slug: input.slug } });
  if (existingSlug) {
    throw new AppError("Bu slug zaten kullanılıyor.", {
      code: "CONFLICT",
      status: 409,
      details: { fields: { slug: ["Bu slug ile kayıtlı başka bir kategori var."] } },
    });
  }

  const category = await prisma.$transaction(async (tx) => {
    const assetId = await resolveAssetId(tx, input.imageAssetId, input.imageUrl, actorUserId);

    const created = await tx.category.create({
      data: {
        title: input.title,
        slug: input.slug,
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
        action: "CATEGORY_CREATE",
        entityType: "Category",
        entityId: created.id,
        afterJson: JSON.parse(JSON.stringify(created)),
        requestId,
      },
    });

    return created;
  });

  return category;
}

export async function updateAdminCategory(id: string, input: UpdateCategoryInput, actorUserId: string, requestId: string) {
  const prisma = getPrisma();
  const existing = await prisma.category.findFirst({ where: { id, deletedAt: null } });

  if (!existing) {
    throw new AppError("Kategori bulunamadı.", { code: "NOT_FOUND", status: 404 });
  }

  if (input.slug && input.slug !== existing.slug) {
    const conflicting = await prisma.category.findUnique({ where: { slug: input.slug } });
    if (conflicting) {
      throw new AppError("Bu slug zaten kullanılıyor.", {
        code: "CONFLICT",
        status: 409,
        details: { fields: { slug: ["Bu slug ile kayıtlı başka bir kategori var."] } },
      });
    }
  }

  const updated = await prisma.$transaction(async (tx) => {
    let resolvedImageId: string | null | undefined = undefined;
    if (input.imageAssetId !== undefined || input.imageUrl !== undefined) {
      resolvedImageId = await resolveAssetId(tx, input.imageAssetId, input.imageUrl, actorUserId);
    }

    const res = await tx.category.update({
      where: { id },
      data: {
        ...(input.title !== undefined && { title: input.title }),
        ...(input.slug !== undefined && { slug: input.slug }),
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
        action: "CATEGORY_UPDATE",
        entityType: "Category",
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

export async function deleteAdminCategory(id: string, actorUserId: string, requestId: string) {
  const prisma = getPrisma();
  const existing = await prisma.category.findFirst({
    where: { id, deletedAt: null },
    include: { _count: { select: { products: { where: { deletedAt: null } } } } },
  });

  if (!existing) {
    throw new AppError("Kategori bulunamadı.", { code: "NOT_FOUND", status: 404 });
  }

  if (existing._count.products > 0) {
    throw new AppError("Bu kategoriye bağlı aktif ürünler var. Önce ürünleri taşıyın veya silin.", {
      code: "CATEGORY_NOT_EMPTY",
      status: 400,
    });
  }

  await prisma.$transaction(async (tx) => {
    await tx.category.update({
      where: { id },
      data: { deletedAt: new Date(), status: "ARCHIVED" },
    });

    await tx.auditLog.create({
      data: {
        actorUserId,
        action: "CATEGORY_DELETE",
        entityType: "Category",
        entityId: id,
        beforeJson: JSON.parse(JSON.stringify(existing)),
        requestId,
      },
    });
  });
}
