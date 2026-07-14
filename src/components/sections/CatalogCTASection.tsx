import Link from "next/link";
import { ArrowUpRight, BookOpen, Mail } from "lucide-react";

export function CatalogCTASection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-page grid gap-px overflow-hidden border border-brand-line bg-brand-line md:grid-cols-2">
        <Link href="/e-catalog" className="group flex min-h-52 items-center justify-between bg-brand-soft p-7 sm:p-9">
          <div>
            <BookOpen size={25} className="text-brand-red" />
            <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-slate-500">Dokümanlar</p>
            <h2 className="mt-2 text-2xl font-bold text-brand-navy">E-Katalog</h2>
          </div>
          <ArrowUpRight size={24} className="text-brand-navy transition group-hover:-translate-y-1 group-hover:translate-x-1" />
        </Link>
        <Link href="/contact" className="group flex min-h-52 items-center justify-between bg-white p-7 sm:p-9">
          <div>
            <Mail size={25} className="text-brand-red" />
            <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-slate-500">Bize ulaşın</p>
            <h2 className="mt-2 text-2xl font-bold text-brand-navy">Hızlı iletişim</h2>
          </div>
          <ArrowUpRight size={24} className="text-brand-navy transition group-hover:-translate-y-1 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
