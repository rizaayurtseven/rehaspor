import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { siteSettings } from "@/data/siteSettings";

export function ContactCTASection() {
  const phoneHref = `tel:${siteSettings.phone.replace(/[^+\d]/g, "")}`;

  return (
    <section className="bg-brand-red py-16 text-white sm:py-20" aria-labelledby="contact-cta-title">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-8">
          <p className="technical-label text-white/70">Yeni proje · renovasyon · ekipman</p>
          <h2
            id="contact-cta-title"
            className="mt-4 max-w-4xl text-[clamp(2.7rem,5vw,5.4rem)] font-bold leading-[0.9] tracking-[-0.06em]"
          >
            Sahanız için doğru sistemi birlikte planlayalım.
          </h2>
        </div>
        <div className="flex flex-col gap-3 lg:col-span-4 lg:items-stretch">
          <Button href="/contact" className="bg-white text-brand-navy hover:bg-brand-navy hover:text-white">
            Projenizi paylaşın <ArrowRight size={18} className="ml-2" aria-hidden="true" />
          </Button>
          <a
            href={phoneHref}
            className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/55 px-5 py-3 text-sm font-bold transition hover:border-white hover:bg-white hover:text-brand-red"
          >
            <Phone size={17} aria-hidden="true" /> {siteSettings.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
