import type { Metadata } from "next";
import { AboutPreviewSection } from "@/components/sections/AboutPreviewSection";
import { CatalogCTASection } from "@/components/sections/CatalogCTASection";
import { CategorySection } from "@/components/sections/CategorySection";
import { ContactCTASection } from "@/components/sections/ContactCTASection";
import { FeaturedProductsSection } from "@/components/sections/FeaturedProductsSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ReferencesSection } from "@/components/sections/ReferencesSection";
import { getCategories, getFeaturedProducts, getReferences } from "@/lib/api";

export const metadata: Metadata = {
  title: "Reha Spor | Spor Zeminleri ve Ekipman Çözümleri",
  description: "Spor zemin kaplamaları, profesyonel saha ekipmanları, padel kort ve uygulama çözümleri."
};

export default async function HomePage() {
  const [categories, featuredProducts, references] = await Promise.all([
    getCategories(),
    getFeaturedProducts(),
    getReferences()
  ]);

  return (
    <>
      <HeroSection />
      <CategorySection categories={categories} />
      <FeaturedProductsSection products={featuredProducts} />
      <AboutPreviewSection />
      <ReferencesSection references={references} />
      <CatalogCTASection />
      <ContactCTASection />
    </>
  );
}
