import type { Metadata } from "next";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { ContactCTASection } from "@/components/sections/ContactCTASection";
import { PublicPageHero } from "@/components/sections/PublicPageHero";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getCategories } from "@/lib/api";

export const metadata: Metadata = {
  title: "Ürünler",
  description: "Zemin kaplamaları, spor ve gym ekipmanları, padel kort sistemleri ile saha uygulamalarını inceleyin."
};

export default async function ProductsPage() {
  const categories = await getCategories();
  const totalProducts = categories.reduce((total, category) => total + category.productCount, 0);

  return (
    <>
      <PublicPageHero
        eyebrow="Ürünler"
        title="Spor tesisleri için kapsamlı ürün ve uygulama portföyü"
        description="Açık ve kapalı spor alanlarında ihtiyaç duyulan zemin, ekipman, kort ve çizgi uygulamalarını kategori bazında keşfedin."
        breadcrumbs={[{ label: "Ürünler" }]}
      >
        <div className="flex flex-wrap gap-3 text-sm font-semibold text-slate-200">
          <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2">{categories.length} ana kategori</span>
          <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2">{totalProducts} ürün ve sistem</span>
        </div>
      </PublicPageHero>

      <section className="section-padding bg-brand-soft">
        <div className="container-page">
          <SectionTitle
            eyebrow="Kategoriler"
            title="Projeniz için doğru gruptan başlayın"
            description="Her kategoride ürün özellikleri, kullanım alanları ve uygulama detaylarını bulabilirsiniz."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      <ContactCTASection />
    </>
  );
}
