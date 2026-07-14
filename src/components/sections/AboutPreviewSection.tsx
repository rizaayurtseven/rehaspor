import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";

const strengths = [
  "Keşiften teslimata tek ekip",
  "İmalat ve montaj deneyimi",
  "Projeye özel teknik çözüm",
  "Kontrollü uygulama ve temiz teslim"
];

export function AboutPreviewSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative min-h-[470px] overflow-hidden rounded-md">
          <Image src="/images/site/reha-spor-court-hero.png" alt="Reha Spor saha uygulaması" fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
          <div className="absolute bottom-0 left-0 bg-brand-red px-7 py-6 text-white">
            <strong className="block text-2xl font-bold">2000’li yıllardan beri</strong>
            <span className="mt-1 block text-sm text-white/80">sahada üretim ve uygulama deneyimi</span>
          </div>
        </div>

        <div>
          <SectionTitle
            eyebrow="Reha Spor hakkında"
            title="En iyi bildiğimiz işi yapıyoruz"
            description="Spor zeminleri ve ekipmanlarıyla başlayan saha deneyimimizi; araştırma, imalat ve uygulama gücüyle geliştiriyoruz. Her projeyi, gelecekte göstereceğimiz bir referans olarak görüyoruz."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {strengths.map((item) => (
              <div key={item} className="flex items-center gap-3 border-t border-brand-line pt-4 text-sm font-semibold text-brand-navy">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-red text-white"><Check size={15} /></span>
                {item}
              </div>
            ))}
          </div>
          <Button href="/about" variant="secondary" className="mt-8">
            Bizi yakından tanıyın <ArrowRight size={17} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
