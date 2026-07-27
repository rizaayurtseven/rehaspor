import type { Metadata } from "next";
import { Check, ClipboardCheck, Download, FileText, Layers3, MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/cards/ProductCard";
import { ContactCTASection } from "@/components/sections/ContactCTASection";
import { PublicPageHero } from "@/components/sections/PublicPageHero";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ImageFallback } from "@/components/ui/ImageFallback";
import { getCategoryBySlug, getProductBySlug, getProducts, getProductsByCategory } from "@/lib/api";

type ProductPageProps = {
  params: Promise<{ categorySlug: string; productSlug: string }>;
};

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ categorySlug: product.categorySlug, productSlug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { categorySlug, productSlug } = await params;
  const product = await getProductBySlug(productSlug);

  return product && product.categorySlug === categorySlug
    ? { title: product.title, description: product.shortDescription }
    : { title: "Ürün Bulunamadı" };
}

function buildSpecCards(product: NonNullable<Awaited<ReturnType<typeof getProductBySlug>>>) {
  return [
    { label: "Ürün Kodu", value: product.code },
    { label: "Sistem", value: product.title.split(" ").slice(0, 2).join(" ") },
    { label: "Detay", value: `${product.technicalDetails.length} başlık` },
    { label: "Kullanım", value: `${product.usageAreas.length} alan` }
  ];
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { categorySlug, productSlug } = await params;
  const product = await getProductBySlug(productSlug);
  if (!product || product.categorySlug !== categorySlug) notFound();

  const [category, sameCategoryProducts] = await Promise.all([
    getCategoryBySlug(product.categorySlug),
    getProductsByCategory(product.categorySlug)
  ]);

  if (!category) notFound();

  const relatedProducts = sameCategoryProducts.filter((item) => item.id !== product.id).slice(0, 3);
  const catalogUrl = product.catalogPdfUrl ?? "/catalog/Katalog.pdf";
  const quoteUrl = `/contact?subject=${encodeURIComponent(`${product.code} - ${product.title}`)}`;
  const specCards = buildSpecCards(product);

  return (
    <>
      <PublicPageHero
        eyebrow={product.code}
        title={product.title}
        description={product.shortDescription}
        breadcrumbs={[
          { label: "Ürünler", href: "/products" },
          { label: category.title, href: `/products/${category.slug}` },
          { label: product.title }
        ]}
      >
        <Badge>{category.title}</Badge>
      </PublicPageHero>

      <section className="bg-brand-cream py-16 sm:py-20">
        <div className="container-page">
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <div className="relative">
                <div className="absolute -left-4 -top-4 h-24 w-24 bg-brand-red/10" />
                <div className="relative border border-brand-line bg-brand-panel p-3">
                  <ImageFallback
                    src={product.image}
                    alt={`${product.title} ana ürün görseli`}
                    eyebrow={product.code}
                    label={category.title}
                    className="aspect-[4/3] sm:h-[520px] sm:aspect-auto"
                    imageClassName="bg-brand-soft p-2 sm:p-4"
                    fit="contain"
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    priority
                  />
                </div>
              </div>

              {product.gallery?.length ? (
                <div className="mt-4 grid grid-cols-4 gap-4" aria-label="Ürün galerisi">
                  {product.gallery.slice(0, 3).map((image, index) => (
                    <ImageFallback
                      key={image}
                      src={image}
                      alt={`${product.title} galeri görseli ${index + 1}`}
                      eyebrow={product.code}
                      label={`${index + 1}. görsel`}
                      className="h-24 border border-brand-line"
                      sizes="(min-width: 1024px) 18vw, 33vw"
                    />
                  ))}
                  <div className="grid h-24 place-items-center bg-brand-navy text-white">
                    <Layers3 size={28} aria-hidden="true" />
                  </div>
                </div>
              ) : null}
            </div>

            <aside className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="bg-brand-navy px-4 py-2 text-white">
                <span className="label-caps">Code: {product.code}</span>
              </div>
              <div className="border border-brand-line bg-white p-7">
                <h2 className="text-3xl font-black uppercase leading-tight text-brand-navy">
                  Projeniz için güvenilir sistem çözümü
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-600">{product.description}</p>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  {specCards.map((spec) => (
                    <div key={spec.label} className="border border-brand-line bg-brand-soft p-5">
                      <span className="label-caps block text-slate-500">{spec.label}</span>
                      <strong className="mt-2 block text-lg font-black text-brand-navy">{spec.value}</strong>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-4">
                  <Button href={quoteUrl} className="w-full">
                    Teklif Al
                  </Button>
                  <a
                    href={catalogUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="label-caps inline-flex w-full items-center justify-center border-2 border-brand-navy px-5 py-4 text-brand-navy transition hover:bg-brand-navy hover:text-white"
                  >
                    <FileText size={17} className="mr-2" aria-hidden="true" /> Katalog PDF&apos;inde Gör
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-page grid gap-8 lg:grid-cols-2">
          <article className="border border-brand-line bg-white p-8 shadow-card sm:p-10">
            <span className="grid h-12 w-12 place-items-center bg-brand-navy text-white">
              <Layers3 size={22} aria-hidden="true" />
            </span>
            <p className="label-caps mt-7 text-brand-red">Teknik Özellikler</p>
            <h2 className="mt-3 text-3xl font-black uppercase text-brand-navy">Sistem detayları</h2>
            <ul className="mt-7 grid gap-4">
              {product.technicalDetails.map((detail) => (
                <li key={detail} className="flex gap-3 border-b border-brand-line pb-4 text-sm leading-6 text-slate-600 last:border-0 last:pb-0">
                  <Check size={17} className="mt-1 shrink-0 text-brand-red" aria-hidden="true" /> {detail}
                </li>
              ))}
            </ul>
          </article>

          <article className="border border-brand-navy bg-brand-navy p-8 text-white shadow-card sm:p-10">
            <span className="grid h-12 w-12 place-items-center bg-brand-red text-white">
              <MapPin size={22} aria-hidden="true" />
            </span>
            <p className="label-caps mt-7 text-red-300">Kullanım Alanları</p>
            <h2 className="mt-3 text-3xl font-black uppercase">Uygulama sahaları</h2>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {product.usageAreas.map((area) => (
                <li key={area} className="flex items-center gap-3 border border-white/10 bg-white/[0.06] p-4 text-sm font-semibold text-slate-200">
                  <Check size={16} className="shrink-0 text-red-300" aria-hidden="true" /> {area}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      {product.applicationSteps?.length ? (
        <section className="section-padding technical-grid bg-brand-soft">
          <div className="container-page">
            <div className="max-w-3xl">
              <p className="label-caps text-brand-red">Uygulama Süreci</p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-tight text-brand-navy">
                Kontrollü ve planlı uygulama aşamaları
              </h2>
              <p className="mt-4 leading-7 text-slate-600">Saha koşullarına göre detaylandırılan temel uygulama akışı.</p>
            </div>
            <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {product.applicationSteps.map((step, index) => (
                <li key={step} className="border border-brand-line bg-white p-6 shadow-card">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black text-slate-200">{String(index + 1).padStart(2, "0")}</span>
                    <ClipboardCheck size={21} className="text-brand-red" aria-hidden="true" />
                  </div>
                  <p className="mt-5 text-sm font-semibold leading-6 text-brand-navy">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {product.catalogPageImage ? (
        <section className="bg-white pb-20 sm:pb-24">
          <div className="container-page grid items-center gap-8 bg-brand-navy p-6 text-white sm:p-9 lg:grid-cols-[0.45fr_0.55fr]">
            <ImageFallback
              src={product.catalogPageImage}
              alt={`${product.title} katalog sayfası`}
              eyebrow="Reha Spor Katalog"
              label={product.code}
              className="h-72"
              fit="contain"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
            <div>
              <p className="label-caps text-red-300">Katalog Kaynağı</p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-tight">Ürünü katalog sayfasıyla birlikte inceleyin</h2>
              <p className="mt-4 leading-7 text-slate-300">Katalog dosyası eklendiğinde ürünün özgün katalog görünümüne ve PDF içeriğine bu bağlantıdan ulaşabilirsiniz.</p>
              <a
                href={catalogUrl}
                download
                className="label-caps mt-7 inline-flex items-center justify-center bg-brand-red px-5 py-3 text-white transition hover:bg-red-700"
              >
                <Download size={17} className="mr-2" aria-hidden="true" /> PDF Kataloğu İndir
              </a>
            </div>
          </div>
        </section>
      ) : null}

      {relatedProducts.length ? (
        <section className="section-padding bg-brand-soft">
          <div className="container-page">
            <div className="max-w-3xl">
              <p className="label-caps text-brand-red">Benzer Çözümler</p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-tight text-brand-navy">Aynı kategoriden diğer ürünler</h2>
            </div>
            <div className="mt-9 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <ContactCTASection />
    </>
  );
}
