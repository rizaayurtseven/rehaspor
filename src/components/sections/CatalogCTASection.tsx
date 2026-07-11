import { ArrowRight, BookOpen, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CatalogCTASection() {
  return (
    <section className="surface-grid relative overflow-hidden bg-brand-navy py-16 text-white sm:py-20">
      <div className="absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-brand-red/20 blur-3xl" aria-hidden="true" />
      <div className="container-page relative grid items-center gap-10 lg:grid-cols-[1fr_auto]">
        <div className="flex gap-5">
          <span className="hidden h-14 w-14 shrink-0 place-items-center rounded-lg bg-white/10 text-red-300 sm:grid">
            <BookOpen size={26} aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-red-300">E-Katalog</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl">Ürün ve uygulama sistemlerini tek katalogda inceleyin</h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-300">Zemin kaplamaları, spor ekipmanları, padel kort sistemleri ve saha uygulamalarına ait özet bilgilere hızlıca ulaşın.</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <Button href="/e-catalog" className="w-full sm:w-auto">
            Kataloğu Görüntüle <ArrowRight size={17} className="ml-2" aria-hidden="true" />
          </Button>
          <a
            href="/catalog/Katalog.pdf"
            download
            className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-brand-navy"
          >
            <Download size={17} className="mr-2" aria-hidden="true" /> PDF İndir
          </a>
        </div>
      </div>
    </section>
  );
}
