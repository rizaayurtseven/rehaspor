import { ArrowRight, DraftingCompass, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

const solutionAreas = ["Zemin kaplamaları", "Spor ekipmanları", "Padel kort sistemleri", "Saha uygulamaları"];

export function HeroSection() {
  return (
    <section className="relative isolate min-h-[760px] overflow-hidden bg-brand-navy text-white">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(15,23,42,.92),rgba(15,23,42,.76)),linear-gradient(135deg,#111827,#334155_52%,#dc2626)]" />
      <div className="surface-grid absolute inset-0 opacity-70" />
      <div className="absolute right-0 top-0 h-full w-1/3 translate-x-1/3 skew-x-12 bg-brand-red/15" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 h-1/2 w-1/4 -translate-x-1/3 -skew-x-12 bg-brand-red/20" aria-hidden="true" />

      <div className="container-page relative z-10 grid min-h-[760px] items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-3xl">
          <div className="label-caps mb-7 inline-flex items-center gap-2 bg-brand-red px-4 py-2 text-white">
            <span className="h-2 w-2 bg-white" />
            Industrial excellence
          </div>
          <h1 className="text-4xl font-black uppercase leading-[1.05] sm:text-5xl lg:text-6xl">
            Profesyonel spor zemin ve ekipman sistemleri
          </h1>
          <p className="mt-7 max-w-2xl border-l-4 border-brand-red pl-6 text-lg leading-8 text-slate-200">
            Reha Spor; belediye, okul, kulüp ve özel tesis projeleri için dayanıklı zemin, ekipman ve padel court çözümlerini teknik uygulama disipliniyle yönetir.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="/products" className="bg-white text-brand-navy hover:bg-brand-red hover:text-white">
              Ürünleri İncele <ArrowRight size={18} className="ml-2" aria-hidden="true" />
            </Button>
            <Button href="/e-catalog" variant="ghost" className="border-white text-white hover:bg-white hover:text-brand-navy">
              E-Katalog
            </Button>
          </div>
        </div>

        <div className="technical-grid border border-white/15 bg-white/[0.06] p-5">
          <div className="border border-white/10 bg-brand-navy/70 p-6">
            <div className="flex items-start justify-between border-b border-white/10 pb-6">
              <div>
                <p className="label-caps text-red-300">Proje kapsamı</p>
                <h2 className="mt-2 text-2xl font-black">Tesise özel sistem seçimi</h2>
              </div>
              <span className="grid h-12 w-12 place-items-center bg-brand-red">
                <DraftingCompass size={24} aria-hidden="true" />
              </span>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {solutionAreas.map((item, index) => (
                <div key={item} className="group border border-white/10 bg-white/[0.04] p-5 transition hover:border-brand-red hover:bg-brand-red/10">
                  <span className="label-caps text-white/45">0{index + 1}</span>
                  <p className="mt-4 font-black text-white">{item}</p>
                  <ShieldCheck className="mt-8 text-white/25 transition group-hover:text-red-300" size={20} aria-hidden="true" />
                </div>
              ))}
            </div>
            <div className="mt-6 bg-white p-5 text-brand-navy">
              <p className="label-caps text-slate-500">Planlama · Üretim · Montaj</p>
              <p className="mt-2 font-black">Sahaya uygun, sürdürülebilir çözüm</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
