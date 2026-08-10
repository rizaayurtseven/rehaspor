import type { Metadata } from "next";
import { ReferenceCard } from "@/components/cards/ReferenceCard";
import { ContactCTASection } from "@/components/sections/ContactCTASection";
import { PublicPageHero } from "@/components/sections/PublicPageHero";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { getReferences } from "@/lib/api";

export const metadata: Metadata = {
  title: "Referanslar",
  description: "Reha Spor’un zemin uygulaması, ekipman kurulumu ve padel kort projelerinden seçili referanslar."
};

export default async function ReferencesPage() {
  const references = await getReferences();
  const categories = Array.from(new Set(references.map((reference) => reference.category)));

  return (
    <>
      <PublicPageHero
        eyebrow="Referanslar"
        title="Sahada tamamlanan projeler, kalıcı çözümler"
        description="Farklı şehir, ölçek ve kullanım senaryolarında hayata geçirdiğimiz zemin, ekipman ve kort uygulamalarından seçili çalışmalar."
        breadcrumbs={[{ label: "Referanslar" }]}
      />

      <TrustedBy />

      <section className="section-padding bg-brand-soft">
        <div className="container-page">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <SectionTitle
              eyebrow="Proje Portföyü"
              title="Seçili uygulamalarımız"
              description="Her proje, bulunduğu alanın teknik ihtiyacına ve kullanım yoğunluğuna göre planlanmıştır."
            />
            <div className="flex flex-wrap gap-2" aria-label="Referans kategorileri">
              <span className="label-caps rounded bg-brand-red px-4 py-2 text-white">Tümü</span>
              {categories.map((category) => (
                <span key={category} className="label-caps rounded border border-brand-line bg-white px-4 py-2 text-slate-600">
                  {category}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {references.map((reference) => (
              <ReferenceCard key={reference.id} reference={reference} />
            ))}
          </div>
        </div>
      </section>

      <ContactCTASection />
    </>
  );
}
