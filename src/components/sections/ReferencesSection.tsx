import { ArrowRight } from "lucide-react";
import { ReferenceCard } from "@/components/cards/ReferenceCard";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { ProjectReference } from "@/types/reference";

export function ReferencesSection({ references }: { references: ProjectReference[] }) {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-9">
          <SectionTitle
            eyebrow="Referanslar"
            title="Farklı ihtiyaçlar, sahada tamamlanan çözümler"
            description="Zemin yenilemeden anahtar teslim kort kurulumuna uzanan seçili proje çalışmalarımız."
          />
          </div>
          <Button href="/references" variant="ghost" className="self-start lg:col-span-3 lg:justify-self-end">
            Tüm referanslar <ArrowRight size={17} className="ml-2" aria-hidden="true" />
          </Button>
        </div>
        <div className="stagger-in mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-12 lg:items-start lg:[&>*:nth-child(1)]:col-span-5 lg:[&>*:nth-child(2)]:col-span-4 lg:[&>*:nth-child(2)]:mt-16 lg:[&>*:nth-child(3)]:col-span-3 lg:[&>*:nth-child(3)]:mt-[-1.5rem]">
          {references.slice(0, 3).map((reference) => (
            <ReferenceCard key={reference.id} reference={reference} />
          ))}
        </div>
      </div>
    </section>
  );
}
