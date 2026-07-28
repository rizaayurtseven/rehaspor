import Link from "next/link";
import { ArrowUpRight, BookOpen, Mail } from "lucide-react";

export function CatalogCTASection() {
  return (
    <section className="relative overflow-hidden bg-brand-navy py-16 text-white sm:py-20">
      <div className="absolute -left-24 top-0 h-full w-1/3 -skew-x-12 bg-brand-red/15" aria-hidden="true" />
      <div className="absolute -right-24 top-0 h-full w-1/3 skew-x-12 bg-brand-red/20" aria-hidden="true" />
      <div className="container-page relative grid gap-px overflow-hidden border border-white/15 bg-white/15 md:grid-cols-2">
        <Link href="/e-catalog" className="group flex min-h-52 items-center justify-between bg-black/35 p-7 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-red sm:p-9">
          <div>
            <BookOpen size={25} className="text-red-300" aria-hidden="true" />
            <p className="label-caps mt-8 text-red-300">Dokümanlar</p>
            <h2 className="mt-2 text-2xl font-black uppercase">E-Katalog</h2>
          </div>
          <ArrowUpRight size={24} className="transition group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
        </Link>
        <Link href="/contact" className="group flex min-h-52 items-center justify-between bg-brand-red/15 p-7 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white sm:p-9">
          <div>
            <Mail size={25} className="text-red-300" aria-hidden="true" />
            <p className="label-caps mt-8 text-red-300">Bize ulaşın</p>
            <h2 className="mt-2 text-2xl font-black uppercase">Hızlı iletişim</h2>
          </div>
          <ArrowUpRight size={24} className="transition group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
