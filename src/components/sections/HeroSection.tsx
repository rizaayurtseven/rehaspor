import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

const projectFacts = ["Zemin kaplama", "Saha ekipmanları", "Anahtar teslim uygulama"];

export function HeroSection() {
  return (
    <section className="relative min-h-[720px] overflow-hidden bg-brand-navy text-white">
      <Image
        src="/images/site/reha-spor-court-hero.png"
        alt=""
        fill
        priority
        className="object-cover object-[62%_center] sm:object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,17,31,.94)_0%,rgba(7,17,31,.82)_42%,rgba(7,17,31,.28)_76%,rgba(7,17,31,.12)_100%)]" />
      <div className="absolute -right-[12%] top-0 h-full w-[38%] skew-x-12 bg-brand-red/10" aria-hidden="true" />
      <div className="absolute -bottom-[18%] -left-[12%] h-[58%] w-[30%] -skew-x-12 bg-brand-red/20" aria-hidden="true" />

      <div className="container-page relative flex min-h-[720px] items-end pb-14 pt-28 sm:items-center sm:pb-20 sm:pt-24">
        <div className="max-w-3xl">
          <div className="label-caps mb-6 inline-flex items-center gap-2 bg-brand-red px-3 py-2 text-white">
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-white opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-white" />
            </span>
            Endüstriyel kalite
          </div>
          <h1 className="industrial-heading max-w-3xl text-4xl sm:text-5xl lg:text-[58px] xl:text-[68px]">
            <span className="block">Doğru zemin.</span>
            <span className="block">Sağlam ekipman.</span>
            <span className="block">Temiz işçilik.</span>
          </h1>
          <p className="mt-7 max-w-2xl border-l-4 border-brand-red pl-5 text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
            Açık ve kapalı spor alanlarını projelendiriyor; zemin kaplamasından ekipman montajına kadar tüm uygulamayı tek ekip olarak yönetiyoruz.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact" className="bg-brand-red text-white hover:bg-white hover:text-brand-navy">
              Projenizi konuşalım <ArrowRight size={18} className="ml-2" aria-hidden="true" />
            </Button>
            <Button href="/references" variant="ghost" className="border-white/60 text-white hover:bg-white hover:text-brand-navy">
              Uygulamalarımız
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/20 pt-6">
            {projectFacts.map((fact) => (
              <span key={fact} className="inline-flex items-center gap-2 text-sm text-white/80">
                <CheckCircle2 size={16} className="text-red-300" aria-hidden="true" />
                {fact}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
