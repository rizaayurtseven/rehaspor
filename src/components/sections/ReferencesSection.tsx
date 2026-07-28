import { ArrowRight } from "lucide-react";
import { ReferenceCard } from "@/components/cards/ReferenceCard";
import { Button } from "@/components/ui/Button";
import type { ProjectReference } from "@/types/reference";

export function ReferencesSection({ references }: { references: ProjectReference[] }) {
  return (
    <section className="section-padding relative overflow-hidden bg-brand-navy text-white">
      <div className="absolute -right-28 bottom-0 h-1/2 w-1/3 skew-x-12 bg-brand-red/10" aria-hidden="true" />
      <div className="container-page relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="label-caps text-red-300">Referanslar</p>
            <h2 className="industrial-heading mt-4 text-3xl md:text-[42px]">Sahada tamamlanan çözümler</h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-300">
              Zemin yenilemeden anahtar teslim kort kurulumuna uzanan seçili proje çalışmalarımız.
            </p>
          </div>
          <Button href="/references" variant="ghost" className="self-start border-white/60 text-white hover:bg-white hover:text-brand-navy lg:self-auto">
            Tüm referanslar <ArrowRight size={17} className="ml-2" aria-hidden="true" />
          </Button>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {references.slice(0, 3).map((reference) => (
            <ReferenceCard key={reference.id} reference={reference} />
          ))}
        </div>
      </div>
    </section>
  );
}
