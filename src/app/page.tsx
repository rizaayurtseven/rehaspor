import type { Metadata } from "next";
import { AboutPreviewSection } from "@/components/sections/AboutPreviewSection";
import { CatalogCTASection } from "@/components/sections/CatalogCTASection";
import { CategorySection } from "@/components/sections/CategorySection";
import { ContactCTASection } from "@/components/sections/ContactCTASection";
import { FeaturedProductsSection } from "@/components/sections/FeaturedProductsSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ReferencesSection } from "@/components/sections/ReferencesSection";
import { TrustStripSection } from "@/components/sections/TrustStripSection";
import { getCategories, getFeaturedProducts, getReferences } from "@/lib/api";

const homeFeaturedProductCodes = new Set(["RH-Z-001", "RH-Z-004", "RH-Z-005", "RH-Z-007"]);

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
  const selectedProducts = featuredProducts.filter((product) => homeFeaturedProductCodes.has(product.code));

  return (
    <>
      <HeroSection />
      <TrustStripSection />
      <CategorySection categories={categories} />
      <FeaturedProductsSection products={selectedProducts} />
      <AboutPreviewSection />
      <ProcessSection />
      <ReferencesSection references={references} />
      <CatalogCTASection />
      <ContactCTASection />
    </>
  );
}
