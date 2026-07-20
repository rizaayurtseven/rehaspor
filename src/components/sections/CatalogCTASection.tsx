import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

export function CatalogCTASection() {
  return (
    <section className="overflow-hidden bg-[#0b0d10] text-white" aria-labelledby="catalog-title">
      <div className="container-page relative grid min-h-[25rem] items-center gap-10 py-16 lg:grid-cols-12 lg:py-20">
        <div className="court-line-pattern absolute inset-y-0 right-0 hidden w-1/2 opacity-20 lg:block" />
        <Reveal className="relative z-10 lg:col-span-8">
          <p className="technical-label text-red-300">Teknik dokümanlar</p>
          <h2
            id="catalog-title"
            className="mt-5 max-w-3xl text-[clamp(2.8rem,5.5vw,5.8rem)] font-bold leading-[0.9] tracking-[-0.06em]"
          >
            Sistem detaylarına tek yerden ulaşın.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
            Ürün gruplarını ve mevcut teknik katalog içeriklerini e-katalog alanında birlikte inceleyin.
          </p>
        </Reveal>
        <Reveal className="relative z-10 lg:col-span-4 lg:justify-self-end" delay={120} variant="scale">
          <Link
            href="/e-catalog"
            className="group flex min-h-40 w-full min-w-64 items-end justify-between rounded-[6px] border border-white/15 border-l-4 border-l-brand-red bg-white p-6 text-brand-navy transition-colors duration-300 hover:bg-brand-red hover:text-white sm:min-w-80"
          >
            <span>
              <BookOpen size={25} aria-hidden="true" />
              <span className="mt-8 block text-xl font-bold">E-kataloğu aç</span>
            </span>
            <ArrowRight size={23} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
