import Link from "next/link";
import { ArrowUpRight, BookOpen, Mail } from "lucide-react";

export function CatalogCTASection() {
  return (
    <section className="overflow-hidden bg-white py-20 sm:py-28">
      <div className="container-page grid gap-5 md:grid-cols-12 md:items-start">
        <Link href="/e-catalog" className="kinetic-card group flex min-h-64 items-center justify-between border-l-4 border-brand-red bg-brand-soft p-7 md:col-span-7 sm:p-10">
          <div>
            <BookOpen size={25} className="text-brand-red" />
            <p className="technical-label mt-10 text-slate-500">Dokümanlar / 01</p>
            <h2 className="mt-3 text-4xl font-bold leading-none tracking-[-0.05em] text-brand-navy">E-Katalog</h2>
          </div>
          <ArrowUpRight size={27} className="text-brand-navy transition duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:rotate-12" />
        </Link>
        <Link href="/contact" className="kinetic-card group flex min-h-56 translate-y-10 items-center justify-between border border-brand-line bg-white p-7 md:col-span-5 sm:p-9">
          <div>
            <Mail size={25} className="text-brand-red" />
            <p className="technical-label mt-8 text-slate-500">Bize ulaşın / 02</p>
            <h2 className="mt-3 text-3xl font-bold leading-none tracking-[-0.045em] text-brand-navy">Hızlı iletişim</h2>
          </div>
          <ArrowUpRight size={24} className="text-brand-navy transition duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:-rotate-12" />
        </Link>
      </div>
    </section>
  );
}
