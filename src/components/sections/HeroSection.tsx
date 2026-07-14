import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

const projectFacts = ["Zemin kaplama", "Saha ekipmanları", "Anahtar teslim uygulama"];

export function HeroSection() {
  return (
    <section className="relative min-h-[690px] overflow-hidden bg-brand-navy text-white">
      <Image
        src="/images/site/reha-spor-court-hero.png"
        alt="Reha Spor tarafından tamamlanan açık hava spor sahası"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,14,20,.92)_0%,rgba(8,14,20,.78)_38%,rgba(8,14,20,.20)_72%,rgba(8,14,20,.08)_100%)]" />

      <div className="container-page relative flex min-h-[690px] items-end pb-14 pt-28 sm:items-center sm:pb-20 sm:pt-24">
        <div className="max-w-2xl">
          <p className="mb-5 text-sm font-semibold text-white/75">Spor tesisi uygulama ve ekipman çözümleri</p>
          <h1 className="max-w-xl text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-[58px]">
            Doğru zemin, sağlam ekipman, temiz işçilik.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8">
            Açık ve kapalı spor alanlarını projelendiriyor; zemin kaplamasından ekipman montajına kadar tüm uygulamayı tek ekip olarak yönetiyoruz.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/contact" className="bg-brand-red text-white hover:bg-white hover:text-brand-navy">
              Projenizi konuşalım <ArrowRight size={18} className="ml-2" aria-hidden="true" />
            </Button>
            <Button href="/references" variant="ghost" className="border-white/50 text-white hover:bg-white hover:text-brand-navy">
              Uygulamalarımız
            </Button>
          </div>
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/20 pt-6">
            {projectFacts.map((fact) => (
              <span key={fact} className="inline-flex items-center gap-2 text-sm text-white/80">
                <CheckCircle2 size={16} className="text-brand-red" aria-hidden="true" />
                {fact}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
