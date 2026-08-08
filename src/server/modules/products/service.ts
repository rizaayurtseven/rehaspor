import "server-only";
import type { CreateProductInput, UpdateProductInput } from "@/contracts/product";
import { getPrisma } from "@/server/db/prisma";
import { AppError } from "@/server/http/errors";

export async function getAdminProducts(params?: { categoryId?: string; status?: string; query?: string }) {
  const prisma = getPrisma();
  const where: any = { deletedAt: null };

  if (params?.categoryId) {
    where.categoryId = params.categoryId;
  }
  if (params?.status) {
    where.status = params.status;
  }
  if (params?.query) {
    where.OR = [
      { title: { contains: params.query, mode: "insensitive" } },
      { code: { contains: params.query, mode: "insensitive" } },
    ];
  }

  const products = await prisma.product.findMany({
    where,
    orderBy: { sortOrder: "asc" },
    include: {
      category: { select: { id: true, title: true, slug: true } },
      technicalDetails: { orderBy: { sortOrder: "asc" } },
      usageAreas: { orderBy: { sortOrder: "asc" } },
      applicationSteps: { orderBy: { sortOrder: "asc" } },
    },
  });

  return products.map((p) => ({
    id: p.id,
    code: p.code,
    title: p.title,
    slug: p.slug,
    categoryId: p.categoryId,
    categoryTitle: p.category.title,
    categorySlug: p.category.slug,
    shortDescription: p.shortDescription,
    description: p.description,
    isFeatured: p.isFeatured,
    status: p.status,
    sortOrder: p.sortOrder,
    technicalDetails: p.technicalDetails.map((td) => td.text),
    usageAreas: p.usageAreas.map((ua) => ua.text),
    applicationSteps: p.applicationSteps.map((as) => as.text),
    seoTitle: p.seoTitle,
    seoDescription: p.seoDescription,
    publishedAt: p.publishedAt ? p.publishedAt.toISOString() : null,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));
}

export async function getAdminProductById(id: string) {
  const prisma = getPrisma();
  const p = await prisma.product.findFirst({
    where: { id, deletedAt: null },
    include: {
      category: { select: { id: true, title: true, slug: true } },
      technicalDetails: { orderBy: { sortOrder: "asc" } },
      usageAreas: { orderBy: { sortOrder: "asc" } },
      applicationSteps: { orderBy: { sortOrder: "asc" } },
    },
  });

  if (!p) {
    throw new AppError("Ürün bulunamadı.", { code: "NOT_FOUND", status: 404 });
  }

  return {
    id: p.id,
    code: p.code,
    title: p.title,
    slug: p.slug,
    categoryId: p.categoryId,
    categoryTitle: p.category.title,
    categorySlug: p.category.slug,
    shortDescription: p.shortDescription,
    description: p.description,
    isFeatured: p.isFeatured,
    status: p.status,
    sortOrder: p.sortOrder,
    technicalDetails: p.technicalDetails.map((td) => td.text),
    usageAreas: p.usageAreas.map((ua) => ua.text),
    applicationSteps: p.applicationSteps.map((as) => as.text),
    catalogPageAssetId: p.catalogPageAssetId,
    catalogPdfAssetId: p.catalogPdfAssetId,
    seoTitle: p.seoTitle,
    seoDescription: p.seoDescription,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  };
}

export async function createAdminProduct(input: CreateProductInput, actorUserId: string, requestId: string) {
  const prisma = getPrisma();

  const existingCode = await prisma.product.findUnique({ where: { code: input.code } });
  if (existingCode) {
    throw new AppError("Bu ürün kodu zaten kullanılıyor.", {
      code: "CONFLICT",
      status: 409,
      details: { fields: { code: ["Bu ürün kodu ile kayıtlı bir ürün var."] } },
    });
  }

  const existingSlug = await prisma.product.findUnique({ where: { slug: input.slug } });
  if (existingSlug) {
    throw new AppError("Bu slug zaten kullanılıyor.", {
      code: "CONFLICT",
      status: 409,
      details: { fields: { slug: ["Bu slug ile kayıtlı bir ürün var."] } },
    });
  }

  const product = await prisma.$transaction(async (tx) => {
    const created = await tx.product.create({
      data: {
        code: input.code,
        title: input.title,
        slug: input.slug,
        categoryId: input.categoryId,
        shortDescription: input.shortDescription,
        description: input.description,
        isFeatured: input.isFeatured,
        status: input.status,
        sortOrder: input.sortOrder,
        catalogPageAssetId: input.catalogPageAssetId || null,
        catalogPdfAssetId: input.catalogPdfAssetId || null,
        seoTitle: input.seoTitle || null,
        seoDescription: input.seoDescription || null,
        publishedAt: input.status === "PUBLISHED" ? new Date() : null,
        technicalDetails: {
          create: input.technicalDetails.map((text, idx) => ({ text, sortOrder: idx })),
        },
        usageAreas: {
          create: input.usageAreas.map((text, idx) => ({ text, sortOrder: idx })),
        },
        applicationSteps: {
          create: input.applicationSteps.map((text, idx) => ({ text, sortOrder: idx })),
        },
      },
    });

    await tx.auditLog.create({
      data: {
        actorUserId,
        action: "PRODUCT_CREATE",
        entityType: "Product",
        entityId: created.id,
        afterJson: JSON.parse(JSON.stringify(created)),
        requestId,
      },
    });

    return created;
  });

  return product;
}

export async function updateAdminProduct(id: string, input: UpdateProductInput, actorUserId: string, requestId: string) {
  const prisma = getPrisma();
  const existing = await prisma.product.findFirst({ where: { id, deletedAt: null } });

  if (!existing) {
    throw new AppError("Ürün bulunamadı.", { code: "NOT_FOUND", status: 404 });
  }

  if (input.code && input.code !== existing.code) {
    const conflictingCode = await prisma.product.findUnique({ where: { code: input.code } });
    if (conflictingCode) {
      throw new AppError("Bu ürün kodu zaten kullanılıyor.", {
        code: "CONFLICT",
        status: 409,
        details: { fields: { code: ["Bu ürün kodu başka bir ürüne ait."] } },
      });
    }
  }

  if (input.slug && input.slug !== existing.slug) {
    const conflictingSlug = await prisma.product.findUnique({ where: { slug: input.slug } });
    if (conflictingSlug) {
      throw new AppError("Bu slug zaten kullanılıyor.", {
        code: "CONFLICT",
        status: 409,
        details: { fields: { slug: ["Bu slug başka bir ürüne ait."] } },
      });
    }
  }

  const updated = await prisma.$transaction(async (tx) => {
    // Delete old child records if updated array is passed
    if (input.technicalDetails) {
      await tx.productTechnicalDetail.deleteMany({ where: { productId: id } });
    }
    if (input.usageAreas) {
      await tx.productUsageArea.deleteMany({ where: { productId: id } });
    }
    if (input.applicationSteps) {
      await tx.productApplicationStep.deleteMany({ where: { productId: id } });
    }

    const res = await tx.product.update({
      where: { id },
      data: {
        ...(input.code !== undefined && { code: input.code }),
        ...(input.title !== undefined && { title: input.title }),
        ...(input.slug !== undefined && { slug: input.slug }),
        ...(input.categoryId !== undefined && { categoryId: input.categoryId }),
        ...(input.shortDescription !== undefined && { shortDescription: input.shortDescription }),
        ...(input.description !== undefined && { description: input.description }),
        ...(input.isFeatured !== undefined && { isFeatured: input.isFeatured }),
        ...(input.status !== undefined && {
          status: input.status,
          publishedAt: input.status === "PUBLISHED" ? existing.publishedAt || new Date() : null,
        }),
        ...(input.sortOrder !== undefined && { sortOrder: input.sortOrder }),
        ...(input.catalogPageAssetId !== undefined && { catalogPageAssetId: input.catalogPageAssetId }),
        ...(input.catalogPdfAssetId !== undefined && { catalogPdfAssetId: input.catalogPdfAssetId }),
        ...(input.seoTitle !== undefined && { seoTitle: input.seoTitle }),
        ...(input.seoDescription !== undefined && { seoDescription: input.seoDescription }),
        ...(input.technicalDetails && {
          technicalDetails: {
            create: input.technicalDetails.map((text, idx) => ({ text, sortOrder: idx })),
          },
        }),
        ...(input.usageAreas && {
          usageAreas: {
            create: input.usageAreas.map((text, idx) => ({ text, sortOrder: idx })),
          },
        }),
        ...(input.applicationSteps && {
          applicationSteps: {
            create: input.applicationSteps.map((text, idx) => ({ text, sortOrder: idx })),
          },
        }),
      },
    });

    await tx.auditLog.create({
      data: {
        actorUserId,
        action: "PRODUCT_UPDATE",
        entityType: "Product",
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

export async function deleteAdminProduct(id: string, actorUserId: string, requestId: string) {
  const prisma = getPrisma();
  const existing = await prisma.product.findFirst({ where: { id, deletedAt: null } });

  if (!existing) {
    throw new AppError("Ürün bulunamadı.", { code: "NOT_FOUND", status: 404 });
  }

  await prisma.$transaction(async (tx) => {
    await tx.product.update({
      where: { id },
      data: { deletedAt: new Date(), status: "ARCHIVED" },
    });

    await tx.auditLog.create({
      data: {
        actorUserId,
        action: "PRODUCT_DELETE",
        entityType: "Product",
        entityId: id,
        beforeJson: JSON.parse(JSON.stringify(existing)),
        requestId,
      },
    });
  });
}
