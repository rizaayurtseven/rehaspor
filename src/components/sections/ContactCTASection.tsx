import { ArrowRight, CheckCircle2, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ContactCTASection() {
  return (
    <section className="section-padding bg-brand-soft">
      <div className="container-page overflow-hidden rounded-2xl bg-white shadow-card">
        <div className="grid lg:grid-cols-[1fr_0.38fr]">
          <div className="p-7 sm:p-10 lg:p-12">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-brand-red">Teklif ve danışmanlık</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight text-brand-navy sm:text-4xl">Projeniz için doğru sistemi birlikte belirleyelim</h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-600">Alan ölçüsü, kullanım amacı ve uygulama takviminizi paylaşın; ekibimiz ihtiyacınıza uygun çözüm için sizinle iletişime geçsin.</p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-slate-600">
              {["İhtiyaca uygun ürün seçimi", "Planlı uygulama süreci", "Tek noktadan proje yönetimi"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-brand-red" aria-hidden="true" /> {item}
                </span>
              ))}
            </div>
            <Button href="/contact" variant="secondary" className="mt-8 w-full sm:w-auto">
              Teklif Formuna Git <ArrowRight size={17} className="ml-2" aria-hidden="true" />
            </Button>
          </div>
          <div className="surface-grid grid min-h-64 place-items-center bg-brand-red p-8 text-center text-white lg:min-h-full">
            <div>
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white/15">
                <PhoneCall size={27} aria-hidden="true" />
              </span>
              <p className="mt-5 text-xl font-black">Projenizi konuşalım</p>
              <p className="mt-2 text-sm leading-6 text-red-100">Hızlı ön değerlendirme için iletişim bilgilerinizi bırakın.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
