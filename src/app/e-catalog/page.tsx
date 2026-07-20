import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileCheck2 } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { PublicPageHero } from "@/components/sections/PublicPageHero";
import { getCatalogs } from "@/lib/api";

export const metadata: Metadata = {
  title: "E-Katalog",
  description: "Reha Spor ürün ve uygulama gruplarını dijital katalog düzeninde inceleyin."
};

const contents = [
  { title: "Zemin Kaplamaları", text: "Akrilik, poliüretan, EPDM ve sentetik çim sistemleri." },
  { title: "Spor Ekipmanları", text: "Saha, salon ve farklı spor branşları için profesyonel ekipmanlar." },
  { title: "Saha Uygulamaları", text: "Padel kort, çizgilendirme, montaj ve tamamlayıcı çözümler." }
];

export default async function CatalogPage() {
  const catalogs = await getCatalogs();
  const primaryCatalog = catalogs[0];

  return (
    <>
      <PublicPageHero
        eyebrow="E-Katalog"
        title="Ürün ve uygulama çözümlerimiz tek dosyada"
        description="Zemin kaplamalarından spor ekipmanlarına, padel kortlardan saha uygulamalarına kadar Reha Spor ürün portföyünü dijital katalog üzerinden inceleyin."
        breadcrumbs={[{ label: "E-Katalog" }]}
      >
        <Link
          href="/products"
          className="inline-flex min-h-12 items-center justify-center bg-brand-red px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          Ürünleri incele <ArrowRight size={18} className="ml-2" aria-hidden="true" />
        </Link>
      </PublicPageHero>

      <section className="section-padding bg-white">
        <div className="container-page grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal className="relative mx-auto w-full max-w-md" variant="scale">
            <div className="absolute -inset-4 rounded-[8px] bg-brand-soft" aria-hidden="true" />
            <div className="surface-grid relative aspect-[3/4] overflow-hidden rounded-[8px] bg-brand-navy p-7 text-white shadow-brand sm:p-9">
              <div className="flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-md bg-brand-red text-sm font-black">RS</span>
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Ürün Kataloğu</span>
              </div>
              <div className="absolute inset-x-7 bottom-8 sm:inset-x-9">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-red-300">Reha Spor</p>
                <h2 className="mt-3 text-4xl font-black leading-tight tracking-tight">Spor zeminleri ve ekipman çözümleri</h2>
                <div className="mt-6 h-1 w-16 bg-brand-red" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-brand-red">Dijital Katalog</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy sm:text-4xl">Teknik ürün seçimine hızlı bir başlangıç</h2>
            <p className="mt-5 text-base leading-8 text-brand-muted sm:text-lg">
              {primaryCatalog?.description ?? "Reha Spor ürün ve uygulama portföyünü özetleyen dijital katalog."} Ürün gruplarına ve teknik sistem detaylarına bu sayfa üzerinden ulaşabilirsiniz.
            </p>
            <div className="mt-8 grid gap-4">
              {contents.map(({ title, text }, index) => (
                <div key={title} className="grid grid-cols-[2.75rem_1fr] gap-4 border-t border-brand-line py-5">
                  <span className="technical-label pt-1 text-brand-red">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-black text-brand-navy">{title}</h3>
                    <p className="mt-1 text-base leading-7 text-brand-muted">{text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-7 flex items-start gap-3 rounded-[8px] bg-brand-soft p-4 text-base leading-7 text-brand-muted">
              <FileCheck2 className="mt-0.5 shrink-0 text-brand-red" size={19} aria-hidden="true" />
              İndirilebilir PDF dosyası henüz sağlanmadığı için kırık bir indirme bağlantısı gösterilmez. Mevcut dijital ürün sayfaları kullanılmaya devam eder.
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
