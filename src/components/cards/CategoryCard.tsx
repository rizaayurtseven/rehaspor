import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImageFallback } from "@/components/ui/ImageFallback";
import type { Category } from "@/types/category";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/products/${category.slug}`}
      className="group relative flex min-h-[380px] flex-col justify-end overflow-hidden rounded-md bg-brand-navy text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
    >
      <div className="absolute inset-0">
        <ImageFallback
          src={category.image}
          alt={`${category.title} kategori görseli`}
          eyebrow="Reha Spor"
          label={category.title}
          className="h-full w-full"
          imageClassName="opacity-80 transition-transform duration-[400ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      <div className="relative z-10 p-7">
        <h3 className="text-2xl font-bold leading-tight">{category.title}</h3>
        <p className="mt-3 line-clamp-2 text-base leading-7 text-white/80">{category.description}</p>
        <div className="mt-5 flex items-center justify-between border-t border-white/20 pt-4">
          <span className="text-sm text-white/65">{category.productCount} ürün</span>
          <span className="inline-flex items-center gap-2 text-sm font-semibold">
            İncele <ArrowRight size={17} className="transition-transform duration-[400ms] group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}
