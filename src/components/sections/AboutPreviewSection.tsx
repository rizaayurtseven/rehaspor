import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

const principles = [
  "Sahada görülen probleme göre sistem seçimi",
  "Uygulama öncesi altyapı ve detay kontrolü",
  "Zemin, ekipman ve montajın birlikte planlanması"
];

export function AboutPreviewSection() {
  return (
    <section className="overflow-hidden bg-brand-navy text-white" aria-labelledby="experience-title">
      <div className="grid lg:grid-cols-12">
        <ImageReveal className="relative min-h-[26rem] lg:col-span-7 lg:min-h-[44rem]">
          <Image
            src="/images/about/santiyeden-uygulama.webp"
            alt="Spor zemini uygulaması sırasında yüzey kontrolü yapan teknik ekip"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 58vw, 100vw"
          />
          <div className="absolute inset-0 bg-brand-navy/18" />
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-white/30 bg-brand-navy/90 px-5 py-4 sm:px-8">
            <p className="technical-label text-white/75">Uygulama disiplini</p>
            <span className="h-px w-20 bg-brand-red sm:w-36" aria-hidden="true" />
          </div>
        </ImageReveal>

        <div className="relative flex items-center px-5 py-16 sm:px-8 lg:col-span-5 lg:px-12 lg:py-20 xl:px-16">
          <div className="absolute left-0 top-0 hidden h-24 w-1 bg-brand-red lg:block" />
          <Reveal>
            <p className="section-kicker text-red-300">Şantiyeden gelen tecrübe</p>
            <h2
              id="experience-title"
              className="display-heading display-heading--hero mt-5 max-w-xl text-[clamp(2.7rem,5vw,5.3rem)]"
            >
              Çizimde doğru.
              <span className="block text-red-400">Sahada çalışır.</span>
            </h2>
            <p className="mt-7 max-w-lg text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
              Reha Spor; yalnızca malzeme tedarik etmez. Zeminin hazırlanmasından son çizgi ve ekipman montajına kadar uygulamanın bütününü birlikte ele alır.
            </p>
            <ul className="mt-8 grid gap-4">
              {principles.map((principle, index) => (
                <li key={principle} className="grid grid-cols-[2.5rem_1fr] gap-3 border-t border-white/15 pt-4 text-base leading-7 text-slate-200">
                  <span className="technical-label pt-1 text-red-300">{String(index + 1).padStart(2, "0")}</span>
                  <span>{principle}</span>
                </li>
              ))}
            </ul>
            <Button href="/about" className="mt-9">
              Reha Spor&apos;u tanıyın <ArrowRight size={18} className="ml-2" aria-hidden="true" />
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
