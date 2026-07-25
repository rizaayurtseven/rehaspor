import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { adminMessages } from "../src/components/admin/adminMockData";
import { catalogs } from "../src/data/catalogs";
import { categories } from "../src/data/categories";
import { products } from "../src/data/products";
import { references } from "../src/data/references";
import { siteSettings } from "../src/data/siteSettings";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required to seed the database.");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: databaseUrl }),
});

function toStorageKey(path: string): string {
  return path.replace(/^\/+/, "");
}

function getOriginalName(path: string): string {
  return path.split("/").at(-1) ?? "asset";
}

function getMimeType(path: string): string {
  const extension = path.split(".").at(-1)?.toLowerCase();

  switch (extension) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "webp":
      return "image/webp";
    case "pdf":
      return "application/pdf";
    default:
      return "application/octet-stream";
  }
}

function createSlug(value: string): string {
  return value
    .toLocaleLowerCase("tr-TR")
    .replaceAll("ı", "i")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function upsertAsset(path: string) {
  const storageKey = toStorageKey(path);

  return prisma.asset.upsert({
    where: { storageKey },
    create: {
      storageKey,
      originalName: getOriginalName(path),
      mimeType: getMimeType(path),
      size: 0,
      status: "READY",
    },
    update: {
      originalName: getOriginalName(path),
      mimeType: getMimeType(path),
      status: "READY",
      deletedAt: null,
    },
  });
}

async function seedCategories() {
  const categoryRows = await Promise.all(
    categories.map(async (category, index) => {
      const image = await upsertAsset(category.image);

      return prisma.category.upsert({
        where: { slug: category.slug },
        create: {
          title: category.title,
          slug: category.slug,
          description: category.description,
          imageAssetId: image.id,
          sortOrder: index,
          status: "PUBLISHED",
        },
        update: {
          title: category.title,
          description: category.description,
          imageAssetId: image.id,
          sortOrder: index,
          status: "PUBLISHED",
          deletedAt: null,
        },
      });
    }),
  );

  return new Map(categoryRows.map((category) => [category.slug, category]));
}

async function seedProducts(categoryBySlug: Map<string, { id: string }>) {
  for (let index = 0; index < products.length; index += 1) {
    const product = products[index];
    const category = categoryBySlug.get(product.categorySlug);
    if (!category) {
      throw new Error(`Category not found for product ${product.code}.`);
    }

    const mainImage = await upsertAsset(product.image);
    const gallery = await Promise.all(
      (product.gallery ?? []).map(async (image: string, galleryIndex: number) => ({
        asset: await upsertAsset(image),
        sortOrder: galleryIndex,
      })),
    );
    const catalogPageAsset = product.catalogPageImage
      ? await upsertAsset(product.catalogPageImage)
      : null;
    const catalogPdfAsset = product.catalogPdfUrl
      ? await upsertAsset(product.catalogPdfUrl)
      : null;

    await prisma.product.upsert({
      where: { code: product.code },
      create: {
        code: product.code,
        title: product.title,
        slug: product.slug,
        categoryId: category.id,
        shortDescription: product.shortDescription,
        description: product.description,
        isFeatured: product.isFeatured,
        status: "PUBLISHED",
        sortOrder: index,
        catalogPageAssetId: catalogPageAsset?.id,
        catalogPdfAssetId: catalogPdfAsset?.id,
        publishedAt: new Date(),
        technicalDetails: {
          create: product.technicalDetails.map((text: string, sortOrder: number) => ({ text, sortOrder })),
        },
        usageAreas: {
          create: product.usageAreas.map((text: string, sortOrder: number) => ({ text, sortOrder })),
        },
        applicationSteps: {
          create: (product.applicationSteps ?? []).map((text: string, sortOrder: number) => ({ text, sortOrder })),
        },
        media: {
          create: [
            { assetId: mainImage.id, kind: "MAIN", sortOrder: 0 },
            ...gallery
              .filter(({ asset }) => asset.id !== mainImage.id)
              .map(({ asset, sortOrder }) => ({ assetId: asset.id, kind: "GALLERY" as const, sortOrder })),
          ],
        },
      },
      update: {
        title: product.title,
        slug: product.slug,
        categoryId: category.id,
        shortDescription: product.shortDescription,
        description: product.description,
        isFeatured: product.isFeatured,
        status: "PUBLISHED",
        sortOrder: index,
        catalogPageAssetId: catalogPageAsset?.id ?? null,
        catalogPdfAssetId: catalogPdfAsset?.id ?? null,
        publishedAt: new Date(),
        deletedAt: null,
        technicalDetails: {
          deleteMany: {},
          create: product.technicalDetails.map((text: string, sortOrder: number) => ({ text, sortOrder })),
        },
        usageAreas: {
          deleteMany: {},
          create: product.usageAreas.map((text: string, sortOrder: number) => ({ text, sortOrder })),
        },
        applicationSteps: {
          deleteMany: {},
          create: (product.applicationSteps ?? []).map((text: string, sortOrder: number) => ({ text, sortOrder })),
        },
        media: {
          deleteMany: {},
          create: [
            { assetId: mainImage.id, kind: "MAIN", sortOrder: 0 },
            ...gallery
              .filter(({ asset }) => asset.id !== mainImage.id)
              .map(({ asset, sortOrder }) => ({ assetId: asset.id, kind: "GALLERY" as const, sortOrder })),
          ],
        },
      },
    });
  }
}

async function seedReferences() {
  for (let index = 0; index < references.length; index += 1) {
    const reference = references[index];
    const image = await upsertAsset(reference.image);
    const slug = createSlug(reference.title);

    await prisma.projectReference.upsert({
      where: { slug },
      create: {
        title: reference.title,
        slug,
        city: reference.city,
        year: reference.year,
        category: reference.category,
        description: reference.description,
        imageAssetId: image.id,
        sortOrder: index,
        status: "PUBLISHED",
      },
      update: {
        title: reference.title,
        city: reference.city,
        year: reference.year,
        category: reference.category,
        description: reference.description,
        imageAssetId: image.id,
        sortOrder: index,
        status: "PUBLISHED",
        deletedAt: null,
      },
    });
  }
}

async function seedCatalogs() {
  for (const catalog of catalogs) {
    const fileAsset = await upsertAsset(catalog.fileUrl);
    const isPublished = catalog.language === "TR";

    await prisma.catalog.upsert({
      where: { id: catalog.id },
      create: {
        id: catalog.id,
        title: catalog.title,
        language: catalog.language,
        description: catalog.description,
        fileAssetId: fileAsset.id,
        status: isPublished ? "PUBLISHED" : "DRAFT",
        publishedAt: isPublished ? new Date() : null,
      },
      update: {
        title: catalog.title,
        language: catalog.language,
        description: catalog.description,
        fileAssetId: fileAsset.id,
        status: isPublished ? "PUBLISHED" : "DRAFT",
        publishedAt: isPublished ? new Date() : null,
      },
    });
  }
}

async function seedSiteSettings() {
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    create: {
      id: "default",
      siteName: "Reha Spor",
      ...siteSettings,
    },
    update: {
      siteName: "Reha Spor",
      ...siteSettings,
    },
  });
}

async function seedMessages() {
  for (let index = 0; index < adminMessages.length; index += 1) {
    const message = adminMessages[index];
    const createdAt = new Date(Date.UTC(2026, 6, 1 + index, 9, 0, 0));

    await prisma.contactMessage.upsert({
      where: { id: message.id },
      create: {
        id: message.id,
        fullName: message.name,
        email: message.email,
        phone: message.phone,
        subject: message.subject,
        message: message.body,
        status: message.isRead ? "READ" : "UNREAD",
        source: "DEMO_SEED",
        readAt: message.isRead ? createdAt : null,
        createdAt,
      },
      update: {
        fullName: message.name,
        email: message.email,
        phone: message.phone,
        subject: message.subject,
        message: message.body,
        status: message.isRead ? "READ" : "UNREAD",
        source: "DEMO_SEED",
        readAt: message.isRead ? createdAt : null,
        deletedAt: null,
      },
    });
  }
}

async function main() {
  const categoryBySlug = await seedCategories();
  await seedProducts(categoryBySlug);
  await seedReferences();
  await seedCatalogs();
  await seedSiteSettings();
  await seedMessages();

  console.log("Reha Spor mock data seeded successfully.");
}

main()
  .catch((error: unknown) => {
    console.error("Seeding failed.", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
