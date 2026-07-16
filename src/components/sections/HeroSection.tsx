import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

const facts = [
  { value: "20+", label: "yıllık saha deneyimi" },
  { value: "250+", label: "tamamlanan uygulama" },
  { value: "81 il", label: "proje ve sevkiyat ağı" }
];

export function HeroSection() {
  return (
    <section className="relative border-b border-brand-line bg-white">
      <div className="pointer-events-none absolute left-0 top-24 hidden h-44 w-[3px] bg-brand-red lg:block" />
      <div className="container-page grid min-h-[720px] items-stretch lg:grid-cols-12">
        <div className="stagger-in relative z-10 flex flex-col justify-center py-20 lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:pb-32 lg:pr-8 xl:pr-12">
          <p className="technical-label flex items-center gap-3 text-brand-red">
            <span className="h-px w-11 origin-left -skew-x-12 bg-brand-red" /> Spor tesisi çözümleri / Ankara
          </p>
          <h1 className="mt-7 max-w-3xl text-[3.9rem] font-bold leading-[0.82] tracking-[-0.068em] text-brand-navy sm:text-[5.4rem] lg:text-[6.6rem]">
            Sahada çalışan <span className="text-brand-red">sistemler</span> <span className="inline-block bg-white pr-5">tasarlıyoruz.</span>
          </h1>
          <p className="mt-9 max-w-[21rem] bg-white/95 py-2 pr-4 text-[0.86rem] leading-[1.8] tracking-[0.01em] text-brand-muted lg:ml-16">
            Spor zemininden ekipman montajına kadar keşif, üretim ve uygulamayı tek teknik ekip altında yönetiyoruz.
          </p>
          <div className="mt-8 flex flex-col items-start gap-3 sm:ml-16 sm:flex-row">
            <Button href="/products">
              Ürünleri incele <ArrowRight size={18} className="ml-2" aria-hidden="true" />
            </Button>
            <Button href="/contact" variant="ghost">Projeniz için teklif alın</Button>
          </div>
          <p className="mt-10 flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-brand-muted lg:ml-16">
            <CheckCircle2 size={17} className="text-brand-red" aria-hidden="true" /> Keşiften teslimata tek muhatap
          </p>
        </div>

        <div className="relative min-h-[460px] overflow-visible border-x border-brand-line lg:col-span-8 lg:col-start-5 lg:row-start-1 lg:min-h-full">
          <Image
            src="/images/site/reha-spor-court-hero.png"
            alt="Reha Spor tarafından tamamlanan profesyonel açık spor sahası"
            fill
            priority
            className="object-cover object-center"
            sizes="(min-width: 1024px) 65vw, 100vw"
          />
          <div className="absolute inset-0 bg-brand-navy/20" />
          <div className="absolute right-0 top-[17%] hidden bg-brand-red px-4 py-8 text-white lg:block [writing-mode:vertical-rl]">
            <span className="technical-label tracking-[0.22em]">REHA / 2000</span>
          </div>
          <div className="stagger-in absolute -bottom-8 left-0 right-4 grid grid-cols-[1.05fr_.82fr_1.2fr] border-t border-white/30 bg-brand-navy text-white lg:left-14 lg:right-[-1.5rem]">
            {facts.map((fact, index) => (
              <div key={fact.value} className={`border-r border-white/15 px-4 py-5 last:border-r-0 sm:px-6 ${index === 1 ? "translate-y-4 bg-[#161d28]" : ""}`}>
                <strong className="block text-2xl font-bold leading-none tracking-[-0.05em] sm:text-4xl">{fact.value}</strong>
                <span className="mt-2 block max-w-28 text-[9px] uppercase leading-[1.45] tracking-[0.12em] text-slate-300 sm:text-[10px]">{fact.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
