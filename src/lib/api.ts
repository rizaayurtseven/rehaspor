import "server-only";
import {
  getPublicCategories,
  getPublicCategoryBySlug,
  getPublicProducts,
  getPublicProductsByCategory,
  getPublicProductBySlug,
  getPublicFeaturedProducts,
  getPublicReferences,
  getPublicSiteSettings,
  getPublicCatalogs,
} from "@/server/modules/public-data/service";
import type { Catalog } from "@/types/catalog";
import type { Category } from "@/types/category";
import type { Product } from "@/types/product";
import type { ProjectReference } from "@/types/reference";
import type { SiteSettings } from "@/types/siteSettings";

/**
 * Public Server Components için veri erişim katmanı.
 * Gerçek PostgreSQL veritabanından Prisma ORM vasıtasıyla PUBLISHED içerikleri okur.
 */

export async function getCategories(): Promise<Category[]> {
  return getPublicCategories();
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  return getPublicCategoryBySlug(slug);
}

export async function getProducts(): Promise<Product[]> {
  return getPublicProducts();
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  return getPublicProductsByCategory(categorySlug);
}

export async function getProductBySlug(productSlug: string): Promise<Product | undefined> {
  return getPublicProductBySlug(productSlug);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return getPublicFeaturedProducts();
}

export async function getReferences(): Promise<ProjectReference[]> {
  return getPublicReferences();
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return getPublicSiteSettings();
}

export async function getCatalogs(): Promise<Catalog[]> {
  return getPublicCatalogs();
}
