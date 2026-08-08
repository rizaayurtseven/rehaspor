import "server-only";
import { getPrisma } from "@/server/db/prisma";
import type { Category } from "@/types/category";
import type { Product } from "@/types/product";
import type { ProjectReference } from "@/types/reference";
import type { Catalog } from "@/types/catalog";
import type { SiteSettings } from "@/types/siteSettings";

function formatAssetUrl(storageKey: string | null | undefined, fallback: string = "/images/products/rh-z-001/main.jpg"): string {
  if (!storageKey) return fallback;
  if (storageKey.startsWith("http://") || storageKey.startsWith("https://")) return storageKey;

  let cleaned = storageKey;
  if (cleaned.startsWith("public/")) {
    cleaned = cleaned.slice(7);
  }
  if (!cleaned.startsWith("/")) {
    cleaned = "/" + cleaned;
  }
  return cleaned;
}

export async function getPublicCategories(): Promise<Category[]> {
  const prisma = getPrisma();
  const categories = await prisma.category.findMany({
    where: {
      status: "PUBLISHED",
      deletedAt: null,
    },
    orderBy: { sortOrder: "asc" },
    include: {
      image: true,
      products: {
        where: {
          status: "PUBLISHED",
          deletedAt: null,
        },
        select: { id: true },
      },
    },
  });

  return categories.map((cat) => ({
    id: cat.id,
    title: cat.title,
    slug: cat.slug,
    description: cat.description,
    image: formatAssetUrl(cat.image?.storageKey, `/images/categories/${cat.slug}/main.jpg`),
    productCount: cat.products.length,
  }));
}

export async function getPublicCategoryBySlug(slug: string): Promise<Category | undefined> {
  const categories = await getPublicCategories();
  return categories.find((cat) => cat.slug === slug);
}

export async function getPublicProducts(): Promise<Product[]> {
  const prisma = getPrisma();
  const products = await prisma.product.findMany({
    where: {
      status: "PUBLISHED",
      deletedAt: null,
    },
    orderBy: { sortOrder: "asc" },
    include: {
      category: { select: { slug: true } },
      catalogPageAsset: true,
      catalogPdfAsset: true,
      technicalDetails: { orderBy: { sortOrder: "asc" } },
      usageAreas: { orderBy: { sortOrder: "asc" } },
      applicationSteps: { orderBy: { sortOrder: "asc" } },
      media: {
        orderBy: { sortOrder: "asc" },
        include: { asset: true },
      },
    },
  });

  return products.map((prod) => {
    const mainMedia = prod.media.find((m) => m.kind === "MAIN") || prod.media[0];
    const galleryMedia = prod.media.filter((m) => m.kind === "GALLERY");

    const techDetails = prod.technicalDetails.map((td) => td.text);

    return {
      id: prod.id,
      code: prod.code,
      title: prod.title,
      slug: prod.slug,
      categorySlug: prod.category.slug,
      shortDescription: prod.shortDescription,
      description: prod.description,
      technicalDetails: techDetails,
      usageAreas: prod.usageAreas.map((ua) => ua.text),
      applicationSteps: prod.applicationSteps.map((as) => as.text),
      image: formatAssetUrl(mainMedia?.asset.storageKey, `/images/products/${prod.slug}/main.jpg`),
      gallery: galleryMedia.length > 0 ? galleryMedia.map((m) => formatAssetUrl(m.asset.storageKey)) : undefined,
      catalogPageImage: prod.catalogPageAsset ? formatAssetUrl(prod.catalogPageAsset.storageKey) : undefined,
      catalogPdfUrl: prod.catalogPdfAsset ? formatAssetUrl(prod.catalogPdfAsset.storageKey) : "/catalog/Katalog.pdf",
      isFeatured: prod.isFeatured,
      features: techDetails,
    };
  });
}

export async function getPublicProductsByCategory(categorySlug: string): Promise<Product[]> {
  const allProducts = await getPublicProducts();
  return allProducts.filter((p) => p.categorySlug === categorySlug);
}

export async function getPublicProductBySlug(productSlug: string): Promise<Product | undefined> {
  const allProducts = await getPublicProducts();
  return allProducts.find((p) => p.slug === productSlug);
}

export async function getPublicFeaturedProducts(): Promise<Product[]> {
  const allProducts = await getPublicProducts();
  return allProducts.filter((p) => p.isFeatured);
}

export async function getPublicReferences(): Promise<ProjectReference[]> {
  const prisma = getPrisma();
  const refs = await prisma.projectReference.findMany({
    where: {
      status: "PUBLISHED",
      deletedAt: null,
    },
    orderBy: { sortOrder: "asc" },
    include: { image: true },
  });

  return refs.map((ref) => ({
    id: ref.id,
    title: ref.title,
    city: ref.city,
    year: ref.year,
    description: ref.description,
    category: ref.category,
    image: formatAssetUrl(ref.image?.storageKey, `/images/references/${ref.slug}/main.jpg`),
  }));
}

export async function getPublicSiteSettings(): Promise<SiteSettings> {
  const prisma = getPrisma();
  const settings = await prisma.siteSettings.findFirst();

  if (settings) {
    return {
      phone: settings.phone,
      email: settings.email,
      address: settings.address,
      whatsapp: settings.whatsapp,
      instagram: settings.instagram,
      mapUrl: settings.mapUrl,
      workingHours: settings.workingHours,
    };
  }

  // Default fallback if database table has not been initialized yet
  return {
    phone: "+90 212 500 00 00",
    email: "info@rehaspor.com.tr",
    address: "İkitelli OSB Mah. Hürriyet Bulvarı No: 12, Başakşehir / İstanbul",
    whatsapp: "+90 532 000 00 00",
    instagram: "https://instagram.com/rehaspor",
    mapUrl: "https://maps.google.com",
    workingHours: "Hafta içi: 08:30 - 18:00",
  };
}

export async function getPublicCatalogs(): Promise<Catalog[]> {
  const prisma = getPrisma();
  const catalogs = await prisma.catalog.findMany({
    where: { status: "PUBLISHED" },
    include: { fileAsset: true },
    orderBy: { createdAt: "desc" },
  });

  return catalogs.map((cat) => ({
    id: cat.id,
    title: cat.title,
    language: cat.language,
    fileUrl: formatAssetUrl(cat.fileAsset?.storageKey, "/catalog/Katalog.pdf"),
    description: cat.description,
  }));
}
