import { ArrowRight } from "lucide-react";
import { ReferenceCard } from "@/components/cards/ReferenceCard";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { ProjectReference } from "@/types/reference";

export function ReferencesSection({ references }: { references: ProjectReference[] }) {
  return (
    <section className="section-padding bg-white">
      <div className="container-page">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle
            eyebrow="Referanslar"
            title="Farklı ihtiyaçlar, sahada tamamlanan çözümler"
            description="Zemin yenilemeden anahtar teslim kort kurulumuna uzanan seçili proje çalışmalarımız."
          />
          <Button href="/references" variant="ghost" className="self-start lg:self-auto">
            Tüm referanslar <ArrowRight size={17} className="ml-2" aria-hidden="true" />
          </Button>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {references.slice(0, 3).map((reference) => (
            <ReferenceCard key={reference.id} reference={reference} />
          ))}
        </div>
      </div>
    </section>
  );
}
