import { catalogs } from "@/data/catalogs";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { references } from "@/data/references";
import { siteSettings } from "@/data/siteSettings";
import type { Catalog } from "@/types/catalog";
import type { Category } from "@/types/category";
import type { Product } from "@/types/product";
import type { ProjectReference } from "@/types/reference";
import type { SiteSettings } from "@/types/siteSettings";

/**
 * Frontend veri erişim sınırı.
 *
 * Backend hazır olduğunda sayfaları veya bileşenleri değiştirmek yerine yalnızca
 * bu fonksiyonların içi gerçek API istekleriyle güncellenmelidir. O geçişte:
 * - temel URL `NEXT_PUBLIC_API_URL` benzeri bir ortam değişkeninden okunmalı,
 * - ortak bir istek yardımcı fonksiyonu ile HTTP hataları ele alınmalı,
 * - API cevapları çalışma zamanında doğrulanmalı ve bu dosyadaki tiplere dönüştürülmeli,
 * - Next.js `cache` / `revalidate` tercihleri endpoint bazında belirlenmeli,
 * - yönetim isteklerine kimlik doğrulama başlıkları eklenmelidir.
 *
 * Mock aşamasında bilinçli olarak `fetch` kullanılmaz; eksik backend proje
 * geliştirmesini ve build sürecini etkilemez.
 */

export async function getCategories(): Promise<Category[]> {
  return categories;
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  return categories.find((category) => category.slug === slug);
}

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  return products.filter((product) => product.categorySlug === categorySlug);
}

export async function getProductBySlug(productSlug: string): Promise<Product | undefined> {
  return products.find((product) => product.slug === productSlug);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return products.filter((product) => product.isFeatured);
}

export async function getReferences(): Promise<ProjectReference[]> {
  return references;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return siteSettings;
}

export async function getCatalogs(): Promise<Catalog[]> {
  return catalogs;
}
