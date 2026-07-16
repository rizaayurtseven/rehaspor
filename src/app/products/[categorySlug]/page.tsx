import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Filter, PackageSearch, SlidersHorizontal } from "lucide-react";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/cards/ProductCard";
import { getCategories, getCategoryBySlug, getProductsByCategory } from "@/lib/api";

type CategoryPageProps = {
  params: { categorySlug: string };
  searchParams: { sort?: string; featured?: string };
};

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ categorySlug: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = await getCategoryBySlug(params.categorySlug);
  return category
    ? { title: category.title, description: category.description }
    : { title: "Kategori Bulunamadı", robots: { index: false, follow: true } };
}

export default async function CategoryDetailPage({ params, searchParams }: CategoryPageProps) {
  const [category, allProducts] = await Promise.all([
    getCategoryBySlug(params.categorySlug),
    getProductsByCategory(params.categorySlug)
  ]);

  if (!category) notFound();

  const filtered = searchParams.featured === "true" ? allProducts.filter((product) => product.isFeatured) : allProducts;
  const products = [...filtered].sort((a, b) => searchParams.sort === "code" ? a.code.localeCompare(b.code, "tr") : a.title.localeCompare(b.title, "tr"));

  return (
    <>
      <header className="border-b border-brand-line bg-brand-cream py-10 sm:py-14">
        <div className="container-page">
          <nav aria-label="Sayfa yolu" className="flex flex-wrap items-center gap-2 text-sm text-brand-muted">
            <Link href="/" className="hover:text-brand-red">Ana sayfa</Link><ChevronRight size={14} />
            <Link href="/products" className="hover:text-brand-red">Ürünler</Link><ChevronRight size={14} />
            <span aria-current="page">{category.title}</span>
          </nav>
          <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="technical-label text-brand-red">Ürün kategorisi / {String(allProducts.length).padStart(2, "0")}</p>
              <h1 className="mt-4 text-5xl font-bold tracking-[-0.045em] text-brand-navy sm:text-6xl">{category.title}</h1>
            </div>
            <p className="max-w-xl text-lg leading-8 text-brand-muted lg:col-span-4">{category.description}</p>
          </div>
        </div>
      </header>

      <section className="bg-brand-panel py-10 sm:py-14">
        <div className="container-page">
          <details className="mb-5 border border-brand-line bg-white lg:hidden">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-4 font-bold text-brand-navy"><span className="flex items-center gap-2"><Filter size={17} /> Filtre ve sıralama</span><SlidersHorizontal size={17} /></summary>
            <FilterForm featured={searchParams.featured} sort={searchParams.sort} mobile />
          </details>

          <div className="grid items-start gap-8 lg:grid-cols-12">
            <aside className="hidden border border-brand-line bg-white lg:sticky lg:top-28 lg:col-span-3 lg:block">
              <FilterForm featured={searchParams.featured} sort={searchParams.sort} />
            </aside>

            <div className="lg:col-span-9">
              <div className="mb-6 flex items-center justify-between border-b border-brand-line pb-4">
                <p className="text-sm text-brand-muted"><strong className="text-brand-navy">{products.length}</strong> sistem gösteriliyor</p>
                <Link href="/products" className="inline-flex min-h-11 items-center text-sm font-bold text-brand-navy hover:text-brand-red"><ArrowLeft size={16} className="mr-2" /> Kategoriler</Link>
              </div>

              {products.length ? (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {products.map((product) => <ProductCard key={product.id} product={product} />)}
                </div>
              ) : (
                <div className="grid min-h-72 place-items-center border border-dashed border-brand-line bg-white p-8 text-center">
                  <div><PackageSearch className="mx-auto text-brand-red" size={38} /><h2 className="mt-4 text-xl font-bold text-brand-navy">Bu filtreyle eşleşen ürün yok</h2><Link href={`/products/${category.slug}`} className="rule-link mt-3 inline-block font-semibold">Filtreyi temizle</Link></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FilterForm({ featured, sort, mobile = false }: { featured?: string; sort?: string; mobile?: boolean }) {
  return (
    <form method="get" className={`p-5 ${mobile ? "border-t border-brand-line" : "p-6"}`}>
      <span className="technical-label text-brand-red">Liste görünümü</span>
      <label className="mt-5 grid gap-2 text-sm font-bold text-brand-navy">Sıralama
        <select name="sort" defaultValue={sort ?? "name"} className="min-h-12 border border-brand-line bg-white px-3 font-normal outline-none focus:border-brand-red">
          <option value="name">Ürün adına göre</option><option value="code">Ürün koduna göre</option>
        </select>
      </label>
      <label className="mt-5 flex min-h-12 cursor-pointer items-center gap-3 border-y border-brand-line text-sm font-semibold text-brand-navy">
        <input type="checkbox" name="featured" value="true" defaultChecked={featured === "true"} className="h-5 w-5 accent-brand-red" /> Yalnızca öne çıkanlar
      </label>
      <button type="submit" className="mt-5 min-h-12 w-full bg-brand-navy px-5 py-3 text-sm font-bold text-white hover:bg-brand-red">Listeyi güncelle</button>
    </form>
  );
}
