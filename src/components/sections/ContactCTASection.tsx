import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { siteSettings } from "@/data/siteSettings";

export function ContactCTASection() {
  return (
    <section className="relative overflow-hidden bg-[#101214] py-24 text-white sm:py-32">
      <div className="absolute right-[8%] top-0 h-24 w-3 -skew-x-12 bg-brand-red" />
      <div className="container-page grid items-end gap-14 lg:grid-cols-12">
        <div className="lg:col-span-9">
          <p className="technical-label text-red-400">Teklif ve danışmanlık / 07</p>
          <h2 className="mt-5 max-w-5xl text-[3.6rem] font-bold leading-[0.88] tracking-[-0.058em] sm:text-[6rem]">Spor tesisiniz için <span className="text-red-400">profesyonel</span> bir çözüm mü arıyorsunuz?</h2>
          <p className="mt-8 max-w-xl text-[0.78rem] leading-[1.8] tracking-[0.015em] text-slate-300 lg:ml-[18%]">Alan ölçüsü, kullanım amacı ve uygulama takviminizi paylaşın. Ekibimiz projeniz için uygun sistemi birlikte belirlesin.</p>
        </div>
        <div className="flex flex-col gap-3 lg:col-span-3 lg:translate-y-8">
          <Button href="/contact" className="bg-brand-red text-white hover:bg-white hover:text-brand-navy">Teklif alın <ArrowRight size={17} className="ml-2" /></Button>
          <a href={`tel:${siteSettings.phone.replace(/[^+\d]/g, "")}`} className="inline-flex items-center justify-center gap-2 border border-white/25 px-5 py-3 text-sm font-semibold transition duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:rotate-1 hover:border-white hover:bg-white hover:text-brand-navy"><Phone size={16} /> {siteSettings.phone}</a>
        </div>
      </div>
    </section>
  );
}
