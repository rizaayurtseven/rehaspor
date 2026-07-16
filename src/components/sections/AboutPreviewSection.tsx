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
    <section className="overflow-hidden bg-white py-24 sm:py-36">
      <div className="container-page grid items-center gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="relative min-h-[520px] lg:col-span-7 lg:-ml-16">
          <Image src="/images/site/reha-spor-court-hero.png" alt="Reha Spor saha uygulaması" fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
          <div className="absolute -bottom-8 right-[-1.5rem] bg-brand-red px-8 py-7 text-white lg:right-[-4.5rem]">
            <strong className="block text-4xl font-bold leading-none tracking-[-0.055em]">2000’li yıllardan beri</strong>
            <span className="mt-3 block max-w-56 text-[0.65rem] uppercase leading-[1.6] tracking-[0.12em] text-white/80">sahada üretim ve uygulama deneyimi</span>
          </div>
          <span className="absolute -left-2 top-10 bg-white px-3 py-8 font-mono text-[0.64rem] font-bold uppercase tracking-[0.2em] text-brand-red [writing-mode:vertical-rl]">İmalat / Uygulama</span>
        </div>

        <div className="stagger-in lg:col-span-5 lg:pl-12 lg:pt-24">
          <SectionTitle
            eyebrow="Reha Spor hakkında"
            title="En iyi bildiğimiz işi yapıyoruz"
            description="Spor zeminleri ve ekipmanlarıyla başlayan saha deneyimimizi; araştırma, imalat ve uygulama gücüyle geliştiriyoruz. Her projeyi, gelecekte göstereceğimiz bir referans olarak görüyoruz."
          />
          <div className="mt-10 grid gap-x-8 gap-y-1 sm:grid-cols-2">
            {strengths.map((item, index) => (
              <div key={item} className={`flex items-center gap-3 border-t border-brand-line py-5 text-[0.78rem] font-semibold leading-5 text-brand-navy ${index % 2 ? "sm:translate-y-5" : ""}`}>
                <span className="grid h-7 w-7 shrink-0 place-items-center bg-brand-red text-white transition duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:rotate-12 hover:bg-[rgb(var(--accent-hover))]"><Check size={15} /></span>
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
