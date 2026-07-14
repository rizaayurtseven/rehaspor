import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { siteSettings } from "@/data/siteSettings";

export function ContactCTASection() {
  return (
    <section className="bg-[#101214] py-16 text-white sm:py-20">
      <div className="container-page grid items-end gap-10 lg:grid-cols-[1fr_auto]">
        <div>
          <p className="text-sm font-semibold text-red-400">Teklif ve danışmanlık</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">Spor tesisiniz için profesyonel bir çözüm mü arıyorsunuz?</h2>
          <p className="mt-5 max-w-2xl leading-7 text-slate-300">Alan ölçüsü, kullanım amacı ve uygulama takviminizi paylaşın. Ekibimiz projeniz için uygun sistemi birlikte belirlesin.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <Button href="/contact" className="bg-brand-red text-white hover:bg-white hover:text-brand-navy">Teklif alın <ArrowRight size={17} className="ml-2" /></Button>
          <a href={`tel:${siteSettings.phone.replace(/[^+\d]/g, "")}`} className="inline-flex items-center justify-center gap-2 rounded border border-white/25 px-5 py-3 text-sm font-semibold hover:bg-white hover:text-brand-navy"><Phone size={16} /> {siteSettings.phone}</a>
        </div>
      </div>
    </section>
  );
}
