import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImageFallback } from "@/components/ui/ImageFallback";
import type { Category } from "@/types/category";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/products/${category.slug}`}
      className="group relative flex min-h-[380px] flex-col justify-end overflow-hidden border border-brand-line bg-brand-navy text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
    >
      <ImageFallback
        src={category.image}
        alt=""
        eyebrow="Reha Spor"
        label={category.title}
        className="absolute inset-0 h-full"
        imageClassName="opacity-80 transition duration-700 group-hover:scale-110 group-focus-visible:scale-110"
        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      <div className="relative z-10 p-7">
        <span className="label-caps text-red-300">{category.productCount} ürün / sistem</span>
        <h3 className="mt-3 text-2xl font-black uppercase leading-tight">{category.title}</h3>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/75">{category.description}</p>
        <div className="mt-5 flex items-center justify-between border-t border-white/20 pt-4">
          <span className="h-1 w-10 bg-brand-red transition-[width] duration-300 group-hover:w-24" aria-hidden="true" />
          <span className="inline-flex items-center gap-2 text-sm font-semibold">
            İncele <ArrowRight size={17} className="transition group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}
