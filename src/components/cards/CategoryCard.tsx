import Link from "next/link";
import { ArrowUpRight, Boxes } from "lucide-react";
import { ImageFallback } from "@/components/ui/ImageFallback";
import type { Category } from "@/types/category";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/products/${category.slug}`}
      className="group relative flex min-h-[420px] flex-col justify-end overflow-hidden bg-brand-navy text-white transition duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
    >
      <ImageFallback
        src={category.image}
        alt={`${category.title} kategori görseli`}
        eyebrow="Reha Spor"
        label={category.title}
        className="absolute inset-0 h-full"
        imageClassName="opacity-70 transition duration-700 group-hover:scale-110"
        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/40 to-transparent" />
      <div className="relative z-10 p-7">
        <span className="label-caps text-white/55">Çözüm grubu</span>
        <h3 className="mt-3 text-2xl font-black uppercase leading-tight">{category.title}</h3>
        <p className="mt-4 text-sm leading-6 text-slate-200">{category.description}</p>
        <div className="mt-6 flex items-center justify-between border-t border-white/15 pt-5">
          <span className="label-caps inline-flex items-center gap-2 text-slate-300">
            <Boxes size={15} className="text-red-300" aria-hidden="true" />
            {category.productCount} ürün
          </span>
          <span className="grid h-10 w-10 place-items-center bg-white text-brand-navy transition group-hover:bg-brand-red group-hover:text-white">
            <ArrowUpRight size={18} aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
}
