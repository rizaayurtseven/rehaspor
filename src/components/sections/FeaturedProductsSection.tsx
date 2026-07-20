import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ImageFallback } from "@/components/ui/ImageFallback";
import type { Product } from "@/types/product";

const productLayouts = [
  "lg:col-span-6 lg:min-h-[34rem]",
  "lg:col-span-6 lg:min-h-[34rem]",
  "lg:col-span-6 lg:min-h-[34rem]",
  "lg:col-span-6 lg:min-h-[34rem]"
];

export function FeaturedProductsSection({ products }: { products: Product[] }) {
  return (
    <section className="bg-white py-20 sm:py-28 lg:py-32" aria-labelledby="featured-products-title">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-col gap-7 border-b border-brand-line pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="technical-label text-brand-red">Öne çıkan sistemler</p>
              <h2
                id="featured-products-title"
                className="mt-4 text-[clamp(2.6rem,5vw,5rem)] font-bold leading-[0.94] tracking-[-0.055em] text-brand-navy"
              >
                Sahaya göre seçilen,
                <span className="block text-brand-red">teknik olarak tarifli.</span>
              </h2>
            </div>
            <Link href="/products" className="rule-link min-h-11 self-start py-3 text-sm font-bold text-brand-navy md:self-end">
              Tüm ürünleri incele
            </Link>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 lg:grid-cols-12">
          {products.map((product, index) => (
            <article
              key={product.id}
              className={`group relative isolate min-h-80 overflow-hidden rounded-[6px] bg-brand-navy ${productLayouts[index] ?? "lg:col-span-6"}`}
            >
              <div className="absolute inset-0">
                <ImageFallback
                  src={product.image}
                  alt={`${product.title} uygulama görseli`}
                  eyebrow={product.code}
                  label={product.title}
                  className="h-full w-full"
                  imageClassName="object-cover transition-transform duration-[400ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  sizes={index === 0 ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 50vw, 100vw"}
                />
              </div>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,12,22,.06)_24%,rgba(6,12,22,.94)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 z-10 p-6 text-white sm:p-8">
                <p className="technical-label text-red-300">{product.code}</p>
                <h3 className="mt-3 max-w-2xl text-2xl font-bold leading-[1.02] tracking-[-0.035em] sm:text-3xl">
                  {product.title}
                </h3>
                <p className="mt-3 max-w-xl text-base leading-7 text-slate-100">{product.shortDescription}</p>
                <Link
                  href={`/products/${product.categorySlug}/${product.slug}`}
                  className="mt-5 inline-flex min-h-11 items-center gap-2 border-b border-white/45 py-2 text-sm font-bold transition-colors duration-300 hover:border-red-300 hover:text-red-300"
                >
                  Teknik detayı incele <ArrowRight size={17} className="transition-transform duration-[400ms] group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
