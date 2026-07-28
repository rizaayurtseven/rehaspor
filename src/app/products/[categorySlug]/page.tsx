import type { Metadata } from "next";
import { ArrowLeft, PackageSearch } from "lucide-react";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/cards/ProductCard";
import { ContactCTASection } from "@/components/sections/ContactCTASection";
import { PublicPageHero } from "@/components/sections/PublicPageHero";
import { Button } from "@/components/ui/Button";
import { getCategories, getCategoryBySlug, getProductsByCategory } from "@/lib/api";

type CategoryPageProps = {
  params: Promise<{ categorySlug: string }>;
};

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ categorySlug: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = await getCategoryBySlug(categorySlug);

  return category
    ? { title: category.title, description: category.description }
    : { title: "Kategori Bulunamadı" };
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { categorySlug } = await params;
  const [category, products] = await Promise.all([
    getCategoryBySlug(categorySlug),
    getProductsByCategory(categorySlug)
  ]);

  if (!category) notFound();

  return (
    <>
      <PublicPageHero
        eyebrow="Ürün Kategorisi"
        title={category.title}
        description={category.description}
        breadcrumbs={[{ label: "Ürünler", href: "/products" }, { label: category.title }]}
      >
        <span className="label-caps inline-flex rounded border border-white/15 bg-white/10 px-4 py-2 text-slate-200">
          {products.length} ürün ve sistem
        </span>
      </PublicPageHero>

      <section className="section-padding bg-brand-soft">
        <div className="container-page">
          <div className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="label-caps text-brand-red">Ürün listesi</p>
              <h2 className="industrial-heading mt-3 text-3xl text-brand-navy">{category.title} çözümleri</h2>
            </div>
            <Button href="/products" variant="ghost" className="self-start sm:self-auto">
              <ArrowLeft size={17} className="mr-2" aria-hidden="true" /> Kategorilere dön
            </Button>
          </div>

          {products.length ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="grid min-h-72 place-items-center rounded border border-dashed border-slate-300 bg-white p-8 text-center">
              <div>
                <PackageSearch className="mx-auto text-brand-red" size={38} aria-hidden="true" />
                <h2 className="mt-4 text-xl font-black text-brand-navy">Bu kategoride henüz ürün bulunmuyor</h2>
                <p className="mt-2 text-sm text-slate-600">Projenize özel seçenekler için ekibimizle iletişime geçebilirsiniz.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <ContactCTASection />
    </>
  );
}
