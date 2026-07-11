import type { Metadata } from "next";
import { Download, Eye, FileCheck2, Layers3, Trophy, Wrench } from "lucide-react";
import { PublicPageHero } from "@/components/sections/PublicPageHero";
import { getCatalogs } from "@/lib/api";

export const metadata: Metadata = {
  title: "E-Katalog",
  description: "Reha Spor ürün kataloğunu görüntüleyin veya PDF olarak indirin."
};

const catalogUrl = "/catalog/Katalog.pdf";

const contents = [
  { icon: Layers3, title: "Zemin Kaplamaları", text: "Akrilik, poliüretan, EPDM ve sentetik çim sistemleri." },
  { icon: Trophy, title: "Spor Ekipmanları", text: "Saha, salon ve farklı spor branşları için profesyonel ekipmanlar." },
  { icon: Wrench, title: "Saha Uygulamaları", text: "Padel kort, çizgilendirme, montaj ve tamamlayıcı çözümler." }
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
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={catalogUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-brand-red px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            <Eye size={18} className="mr-2" aria-hidden="true" /> Kataloğu Görüntüle
          </a>
          <a
            href={catalogUrl}
            download
            className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-brand-navy"
          >
            <Download size={18} className="mr-2" aria-hidden="true" /> PDF İndir
          </a>
        </div>
      </PublicPageHero>

      <section className="section-padding bg-white">
        <div className="container-page grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 rounded-2xl bg-brand-soft" aria-hidden="true" />
            <div className="surface-grid relative aspect-[3/4] overflow-hidden rounded-xl bg-brand-navy p-7 text-white shadow-brand sm:p-9">
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
          </div>

          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-brand-red">Dijital Katalog</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-brand-navy sm:text-4xl">Teknik ürün seçimine hızlı bir başlangıç</h2>
            <p className="mt-5 leading-8 text-slate-600">
              {primaryCatalog?.description ?? "Reha Spor ürün ve uygulama portföyünü özetleyen dijital katalog."} Katalog dosyası daha sonra <strong className="font-bold text-brand-navy">public/catalog/Katalog.pdf</strong> konumuna eklendiğinde mevcut bağlantılar otomatik olarak çalışır.
            </p>
            <div className="mt-8 grid gap-4">
              {contents.map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-4 rounded-lg border border-brand-line p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-red-50 text-brand-red">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-black text-brand-navy">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-7 flex items-start gap-3 rounded-lg bg-brand-soft p-4 text-sm leading-6 text-slate-600">
              <FileCheck2 className="mt-0.5 shrink-0 text-brand-red" size={19} aria-hidden="true" />
              PDF henüz eklenmemiş olsa da sayfa ve ürün bağlantıları çalışmaya devam eder; dosya eklendiğinde kod değişikliği gerekmez.
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
