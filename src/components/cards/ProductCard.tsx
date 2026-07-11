import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { ImageFallback } from "@/components/ui/ImageFallback";
import { categories } from "@/data/categories";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  const categoryTitle = categories.find((category) => category.slug === product.categorySlug)?.title ?? "Ürün";

  return (
    <Link
      href={`/products/${product.categorySlug}/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden border border-brand-line bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:border-brand-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
    >
      <ImageFallback
        src={product.image}
        alt={`${product.title} ürün görseli`}
        eyebrow={product.code}
        label={categoryTitle}
        className="h-56"
        imageClassName="transition duration-700 group-hover:scale-105"
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
      />

      <div className="flex flex-1 flex-col p-7">
        <span className="label-caps text-brand-red">{product.code}</span>
        <h3 className="mt-3 text-xl font-black uppercase leading-tight text-brand-navy">{product.title}</h3>
        <p className="mt-4 text-sm leading-6 text-slate-600">{product.shortDescription}</p>

        <ul className="mt-6 grid gap-3 border-t border-brand-line pt-5" aria-label="Öne çıkan özellikler">
          {product.technicalDetails.slice(0, 2).map((detail) => (
            <li key={detail} className="flex gap-2 text-xs leading-5 text-slate-600">
              <Check size={14} className="mt-0.5 shrink-0 text-brand-red" aria-hidden="true" />
              <span className="line-clamp-2">{detail}</span>
            </li>
          ))}
        </ul>

        <span className="label-caps mt-auto inline-flex items-center gap-2 pt-6 text-brand-navy transition group-hover:text-brand-red">
          Ürün detayı
          <ArrowRight size={16} className="transition group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
