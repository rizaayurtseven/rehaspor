import { CalendarDays, MapPin } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ImageFallback } from "@/components/ui/ImageFallback";
import type { ProjectReference } from "@/types/reference";

const referenceLayouts = [
  "lg:col-span-7 lg:row-span-2 lg:min-h-[36rem]",
  "lg:col-span-5 lg:min-h-[18rem]",
  "lg:col-span-5 lg:min-h-[18rem]"
];

export function ReferencesSection({ references }: { references: ProjectReference[] }) {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28" aria-labelledby="references-title">
      <div className="container-page">
        <Reveal>
          <div className="flex flex-col gap-7 border-b border-brand-line pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-kicker text-brand-red">Seçili referanslar</p>
              <h2
                id="references-title"
                className="display-heading mt-4 text-[clamp(2.7rem,5vw,5.2rem)] text-brand-navy"
              >
                Sahada tamamlanan işler.
              </h2>
            </div>
            <Link href="/references" className="rule-link min-h-11 self-start py-3 text-sm font-bold text-brand-navy md:self-end">
              Tüm referanslar
            </Link>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 lg:grid-cols-12">
          {references.slice(0, 3).map((reference, index) => (
            <article
              key={reference.id}
              className={`group relative isolate min-h-72 overflow-hidden rounded-[6px] bg-brand-navy ${referenceLayouts[index] ?? "lg:col-span-4"}`}
            >
              <div className="absolute inset-0">
                <ImageFallback
                  src={reference.image}
                  alt={`${reference.title} proje görseli`}
                  eyebrow={reference.category}
                  label={reference.city}
                  className="h-full w-full"
                  imageClassName="object-cover transition-transform duration-[400ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  sizes={index === 0 ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 42vw, 100vw"}
                />
              </div>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,13,24,.04)_20%,rgba(7,13,24,.94)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 z-10 p-6 text-white sm:p-8">
                <p className="technical-label text-red-300">{reference.category}</p>
                <h3 className="mt-3 max-w-2xl text-2xl font-bold leading-[1.02] tracking-[-0.035em]">{reference.title}</h3>
                <div className="mt-4 flex flex-wrap gap-5 text-xs font-semibold text-slate-200">
                  <span className="inline-flex items-center gap-2">
                    <MapPin size={15} className="text-red-300" aria-hidden="true" /> {reference.city}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays size={15} className="text-red-300" aria-hidden="true" /> {reference.year}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
