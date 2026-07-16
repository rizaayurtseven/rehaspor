import type { Metadata } from "next";
import Link from "next/link";
import { Check, ChevronRight, Download, FileText, Ruler, ShieldCheck, Truck } from "lucide-react";
import { notFound } from "next/navigation";
import { AddToQuoteButton } from "@/components/cart/AddToQuoteButton";
import { ProductCard } from "@/components/cards/ProductCard";
import { ImageFallback } from "@/components/ui/ImageFallback";
import { getCategoryBySlug, getProductBySlug, getProducts, getProductsByCategory } from "@/lib/api";

type ProductPageProps = { params: { categorySlug: string; productSlug: string } };

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ categorySlug: product.categorySlug, productSlug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.productSlug);
  return product && product.categorySlug === params.categorySlug
    ? { title: product.title, description: product.shortDescription }
    : { title: "Ürün Bulunamadı", robots: { index: false, follow: true } };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.productSlug);
  if (!product || product.categorySlug !== params.categorySlug) notFound();

  const [category, sameCategoryProducts] = await Promise.all([
    getCategoryBySlug(product.categorySlug),
    getProductsByCategory(product.categorySlug)
  ]);
  if (!category) notFound();

  const relatedProducts = sameCategoryProducts.filter((item) => item.id !== product.id).slice(0, 3);
  const gallery = Array.from(new Set([product.image, ...product.gallery])).slice(0, 3);

  return (
    <>
      <header className="border-b border-brand-line bg-brand-cream py-6">
        <div className="container-page">
          <nav aria-label="Sayfa yolu" className="flex flex-wrap items-center gap-2 text-sm text-brand-muted">
            <Link href="/" className="hover:text-brand-red">Ana sayfa</Link><ChevronRight size={14} />
            <Link href="/products" className="hover:text-brand-red">Ürünler</Link><ChevronRight size={14} />
            <Link href={`/products/${category.slug}`} className="hover:text-brand-red">{category.title}</Link><ChevronRight size={14} />
            <span aria-current="page" className="text-brand-navy">{product.title}</span>
          </nav>
        </div>
      </header>

      <section className="border-b border-brand-line bg-white py-10 sm:py-14">
        <div className="container-page grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <ImageFallback src={gallery[0]} alt={`${product.title} ana ürün görseli`} eyebrow={product.code} label={category.title} className="aspect-[4/3] border border-brand-line bg-brand-panel" sizes="(min-width: 1024px) 58vw, 100vw" priority />
            {gallery.length > 1 ? (
              <div className="mt-3 grid grid-cols-3 gap-3">
                {gallery.map((image, index) => <ImageFallback key={image} src={image} alt={`${product.title} görsel ${index + 1}`} label={product.title} className="aspect-[4/3] border border-brand-line bg-brand-panel" sizes="180px" />)}
              </div>
            ) : null}
          </div>

          <div className="lg:sticky lg:top-28 lg:col-span-5">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="technical-label text-brand-red">{product.code}</span>
              <span className="h-4 w-px bg-brand-line" />
              <span className="text-sm font-semibold text-brand-muted">{category.title}</span>
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-[1.02] tracking-[-0.04em] text-brand-navy sm:text-5xl">{product.title}</h1>
            <p className="mt-6 text-lg leading-8 text-brand-muted">{product.shortDescription}</p>

            <div className="mt-8 border border-brand-line bg-brand-panel p-5 sm:p-6">
              <span className="technical-label text-brand-steel">Fiyatlandırma</span>
              <div className="mt-2 flex items-end justify-between gap-4">
                <strong className="text-2xl font-bold text-brand-navy">Proje bazlı teklif</strong>
                <span className="text-xs font-semibold text-emerald-700">Siparişe uygun</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-brand-muted">Net fiyat ve termin; ölçü, adet, montaj yeri ve uygulama kapsamına göre hazırlanır.</p>
              <AddToQuoteButton product={product} className="mt-6 w-full" />
              <Link href={`/contact?subject=${encodeURIComponent(`${product.code} - ${product.title}`)}`} className="mt-3 flex min-h-12 items-center justify-center border border-brand-navy px-5 py-3 text-sm font-bold text-brand-navy hover:bg-brand-navy hover:text-white">Teknik ekibe danışın</Link>
            </div>

            <ul className="mt-6 grid gap-px border border-brand-line bg-brand-line sm:grid-cols-3" aria-label="Hizmet güvenceleri">
              <li className="bg-white p-4 text-sm text-brand-muted"><Ruler size={19} className="mb-3 text-brand-red" /><strong className="block text-brand-navy">Proje ölçüsü</strong>Özel üretim</li>
              <li className="bg-white p-4 text-sm text-brand-muted"><Truck size={19} className="mb-3 text-brand-red" /><strong className="block text-brand-navy">Termin</strong>Planlı sevkiyat</li>
              <li className="bg-white p-4 text-sm text-brand-muted"><ShieldCheck size={19} className="mb-3 text-brand-red" /><strong className="block text-brand-navy">Uygulama</strong>Teknik ekip</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-brand-navy py-16 text-white sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="technical-label text-red-300">Sistem açıklaması</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight">Proje için bilmeniz gerekenler</h2>
            <p className="mt-5 leading-7 text-slate-300">{product.description}</p>
          </div>
          <div className="lg:col-span-8">
            <h2 className="text-xl font-bold">Teknik özellikler</h2>
            <ol className="mt-5 border-t border-white/20">
              {product.technicalDetails.map((detail, index) => (
                <li key={detail} className="grid gap-3 border-b border-white/20 py-5 sm:grid-cols-[64px_1fr]">
                  <span className="technical-label text-red-300">{String(index + 1).padStart(2, "0")}</span>
                  <span className="leading-7 text-slate-200">{detail}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-b border-brand-line bg-brand-cream py-16 sm:py-20">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="technical-label text-brand-red">Kullanım alanları</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-navy">Doğru sahada, doğru sistem</h2>
            <ul className="mt-7 grid border-t border-brand-line sm:grid-cols-2 sm:gap-x-8">
              {product.usageAreas.map((area) => <li key={area} className="flex items-center gap-3 border-b border-brand-line py-4 font-semibold text-brand-navy"><Check size={17} className="text-brand-red" />{area}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-b border-brand-line bg-white py-16 sm:py-20">
        <div className="container-page">
          <p className="technical-label text-brand-red">Uygulama adımları</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-navy">Uygulama akışı</h2>
          <ol className="mt-7 grid gap-px border border-brand-line bg-brand-line sm:grid-cols-2">
            {product.applicationSteps.map((step, index) => <li key={step} className="bg-white p-6"><span className="technical-label text-brand-red">Aşama {String(index + 1).padStart(2, "0")}</span><p className="mt-3 font-bold leading-6 text-brand-navy">{step}</p></li>)}
          </ol>
        </div>
      </section>

      {product.catalogPageImage || product.catalogPdfUrl ? (
        <section className="border-b border-brand-line bg-brand-panel py-16 sm:py-20">
          <div className="container-page grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="technical-label text-brand-red">Katalogdan Görünüm</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-navy">Ürünün katalog sayfası</h2>
              <p className="mt-5 leading-7 text-brand-muted">Katalog sayfasını burada görüntüleyebilir veya ürün kataloğunu PDF olarak açabilirsiniz.</p>
              {product.catalogPdfUrl ? (
                <a href={product.catalogPdfUrl} target="_blank" rel="noreferrer" className="mt-7 inline-flex min-h-12 items-center justify-center bg-brand-navy px-5 py-3 text-sm font-bold text-white hover:bg-brand-red"><Download size={17} className="mr-2" /> Katalog PDF&apos;inde Gör</a>
              ) : null}
            </div>
            {product.catalogPageImage ? (
              <div className="lg:col-span-7">
                <ImageFallback src={product.catalogPageImage} alt={`${product.title} katalog sayfası`} eyebrow={product.code} label="Katalogdan Görünüm" className="aspect-[4/3] border border-brand-line bg-white" sizes="(min-width: 1024px) 58vw, 100vw" />
              </div>
            ) : (
              <div className="flex min-h-64 items-center justify-center border border-dashed border-brand-line bg-white p-8 text-center text-brand-muted lg:col-span-7"><FileText className="mr-3 text-brand-red" /> Katalog sayfası görseli henüz eklenmedi.</div>
            )}
          </div>
        </section>
      ) : null}

      {relatedProducts.length ? (
        <section className="bg-white py-16 pb-28 sm:py-20 lg:pb-20">
          <div className="container-page">
            <div className="flex items-end justify-between gap-5 border-b border-brand-line pb-6"><div><p className="technical-label text-brand-red">İlgili sistemler</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-brand-navy">Aynı kategoriden ürünler</h2></div><Link href={`/products/${category.slug}`} className="rule-link hidden font-bold sm:block">Tümünü gör</Link></div>
            <div className="mt-8 grid gap-5 md:grid-cols-3">{relatedProducts.map((item) => <ProductCard key={item.id} product={item} />)}</div>
          </div>
        </section>
      ) : null}

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-brand-line bg-white p-3 lg:hidden">
        <div className="mx-auto flex max-w-xl items-center gap-3"><div className="min-w-0 flex-1"><span className="technical-label block text-brand-red">{product.code}</span><span className="block truncate text-sm font-bold text-brand-navy">Proje bazlı teklif</span></div><AddToQuoteButton product={product} compact /></div>
      </div>
    </>
  );
}
