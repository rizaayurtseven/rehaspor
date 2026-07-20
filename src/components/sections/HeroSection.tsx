import Image from "next/image";
import { ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section
      aria-labelledby="home-hero-title"
      className="relative isolate min-h-[640px] overflow-hidden bg-brand-navy text-white sm:min-h-[700px] lg:min-h-[760px]"
    >
      <Image
        src="/images/hero/reha-spor-ana-saha.webp"
        alt="Reha Spor tarafından tamamlanan çok amaçlı açık spor sahası"
        fill
        priority
        className="hero-media object-cover object-[58%_center]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,12,22,.96)_0%,rgba(6,12,22,.78)_42%,rgba(6,12,22,.24)_72%,rgba(6,12,22,.48)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgba(6,12,22,.84)_100%)]" />
      <div className="court-line-pattern absolute inset-y-0 right-0 hidden w-[42%] opacity-35 lg:block" />

      <div className="container-page relative z-10 flex min-h-[640px] flex-col justify-between py-14 sm:min-h-[700px] sm:py-16 lg:min-h-[760px] lg:py-20">
        <div className="hero-sequence max-w-4xl pt-4 sm:pt-8 lg:pt-10">
          <p className="hero-accent-line technical-label relative inline-flex items-center gap-3 pl-4 text-white/80">
            Zemin · ekipman · uygulama
          </p>
          <h1
            id="home-hero-title"
            className="mt-6 max-w-[12ch] text-[clamp(3rem,7.1vw,6.7rem)] font-bold leading-[0.9] tracking-[-0.058em]"
          >
            Sahanın tamamı,
            <span className="block text-red-400">tek sorumluluk.</span>
          </h1>
          <p className="mt-7 max-w-xl border-l border-white/35 pl-5 text-base leading-7 text-slate-100 sm:text-lg sm:leading-8">
            Spor zemininden ekipman montajına kadar keşif, üretim ve uygulamayı tek teknik ekip altında yönetiyoruz.
          </p>
          <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <Button href="/products" className="sm:min-w-48">
              Çözümleri incele <ArrowRight size={18} className="ml-2" aria-hidden="true" />
            </Button>
            <Button
              href="/e-catalog"
              variant="ghost"
              className="border-white/65 text-white hover:border-white hover:bg-white hover:text-brand-navy sm:min-w-44"
            >
              <BookOpen size={17} className="mr-2" aria-hidden="true" /> E-katalog
            </Button>
          </div>
        </div>

        <div className="hero-footer mt-14 flex flex-col gap-5 border-t border-white/25 pt-5 text-sm text-slate-200 sm:flex-row sm:items-center sm:justify-between">
          <p className="inline-flex items-center gap-2">
            <CheckCircle2 size={17} className="text-red-400" aria-hidden="true" />
            Keşiften teslimata tek muhatap
          </p>
          <p className="technical-label text-white/55">Ankara merkezli · Türkiye geneli</p>
        </div>
      </div>
    </section>
  );
}
