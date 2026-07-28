import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { defaultSiteSettings as siteSettings } from "@/lib/constants";

export function ContactCTASection() {
  return (
    <section className="industrial-grid bg-white py-16 text-brand-navy sm:py-24">
      <div className="container-page grid items-end gap-10 border-y border-brand-line py-12 lg:grid-cols-[1fr_auto]">
        <div>
          <p className="label-caps text-brand-red">Teklif ve danışmanlık</p>
          <h2 className="industrial-heading mt-4 max-w-3xl text-3xl sm:text-5xl">
            Spor tesisiniz için profesyonel bir çözüm mü arıyorsunuz?
          </h2>
          <p className="mt-5 max-w-2xl leading-7 text-brand-muted">
            Alan ölçüsü, kullanım amacı ve uygulama takviminizi paylaşın. Ekibimiz projeniz için uygun sistemi birlikte belirlesin.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <Button href="/contact">
            Teklif alın <ArrowRight size={17} className="ml-2" aria-hidden="true" />
          </Button>
          <a
            href={`tel:${siteSettings.phone.replace(/[^+\d]/g, "")}`}
            className="label-caps inline-flex min-h-11 items-center justify-center gap-2 rounded border-2 border-brand-navy px-5 py-3 transition hover:bg-brand-navy hover:text-white"
          >
            <Phone size={16} aria-hidden="true" /> {siteSettings.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
