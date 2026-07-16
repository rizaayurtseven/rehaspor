import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImageFallback } from "@/components/ui/ImageFallback";
import { categories } from "@/data/categories";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  const categoryTitle = categories.find((category) => category.slug === product.categorySlug)?.title ?? "Ürün";

  return (
    <article className="kinetic-card group flex h-full flex-col border border-brand-line bg-white hover:border-brand-red">
      <Link href={`/products/${product.categorySlug}/${product.slug}`} className="block focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-red/20">
        <ImageFallback
          src={product.image}
          alt={`${product.title} ürün görseli`}
          eyebrow={product.code}
          label={categoryTitle}
          className="aspect-[4/3] w-full border-b border-brand-line"
          imageClassName="transition-[transform,filter] duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035] group-hover:-rotate-[0.35deg]"
          sizes="(min-width: 1200px) 25vw, (min-width: 768px) 50vw, 100vw"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="technical-label text-brand-red">{product.code}</span>
          <span className="text-xs font-semibold text-emerald-700">Proje siparişine uygun</span>
        </div>
        <h3 className="mt-3 text-2xl font-bold leading-[1.02] tracking-[-0.04em] text-brand-navy">
          <Link href={`/products/${product.categorySlug}/${product.slug}`} className="hover:text-brand-red">{product.title}</Link>
        </h3>
        <p className="mt-3 line-clamp-2 text-[0.75rem] leading-[1.7] tracking-[0.015em] text-brand-muted">{product.shortDescription}</p>

        <div className="mt-6 border-t border-brand-line pt-5">
          <span className="technical-label block text-brand-steel">Fiyatlandırma</span>
          <strong className="mt-1 block text-lg font-bold text-brand-navy">Proje bazlı teklif</strong>
          <span className="mt-1 block text-xs text-brand-muted">Termin ve montaj kapsamı ayrıca planlanır.</span>
        </div>

        <Link href={`/products/${product.categorySlug}/${product.slug}`} className="mt-5 inline-flex min-h-11 items-center justify-between border-t border-brand-line pt-4 text-sm font-bold text-brand-navy transition duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:text-brand-red">
          Teknik detayı incele <ArrowRight size={17} className="transition duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-rotate-12" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
