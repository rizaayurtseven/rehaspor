import { ArrowRight, CheckCircle2, Gauge, Hammer, SearchCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";

const process = [
  { icon: SearchCheck, title: "Doğru analiz", text: "Alanı, kullanım yoğunluğunu ve teknik ihtiyacı birlikte değerlendiririz." },
  { icon: Hammer, title: "Uzman uygulama", text: "Üretim ve montaj süreçlerini sahadaki deneyimimizle yönetiriz." },
  { icon: Gauge, title: "Kalite kontrol", text: "Teslim öncesinde sistem detaylarını ve uygulama bütünlüğünü kontrol ederiz." }
];

export function AboutPreviewSection() {
  return (
    <section className="section-padding overflow-hidden bg-white">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="relative">
          <div className="surface-grid min-h-[440px] overflow-hidden rounded-2xl bg-brand-navy p-7 text-white shadow-brand sm:p-9">
            <div className="flex h-full min-h-[370px] flex-col justify-between">
              <div>
                <span className="inline-flex rounded-full bg-brand-red px-3 py-1 text-xs font-black uppercase tracking-[0.12em]">Reha Spor</span>
                <p className="mt-7 max-w-md text-3xl font-black leading-tight tracking-tight">Projeyi yalnızca tamamlamıyor, uzun ömürlü bir sisteme dönüştürüyoruz.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {["İmalat ve montaj deneyimi", "Müşteri odaklı proje yönetimi"].map((item) => (
                  <div key={item} className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.06] p-4 text-sm font-semibold text-slate-200">
                    <CheckCircle2 className="shrink-0 text-red-300" size={18} aria-hidden="true" /> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute -bottom-5 -right-3 hidden rounded-lg bg-brand-red px-6 py-5 text-white shadow-xl sm:block">
            <strong className="block text-2xl font-black">2000’li yıllardan</strong>
            <span className="text-sm text-red-100">gelen saha deneyimi</span>
          </div>
        </div>

        <div>
          <SectionTitle
            eyebrow="Hakkımızda"
            title="Sahadan gelen deneyim, kurumsal uygulama disiplini"
            description="Reha Spor; spor zeminleri, ekipman ve tesis çözümlerinde doğru ürün seçimini, planlı uygulamayı ve temiz teslim anlayışını bir araya getirir."
          />
          <div className="mt-8 grid gap-5">
            {process.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-red-50 text-brand-red">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-black text-brand-navy">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
                </div>
              </div>
            ))}
          </div>
          <Button href="/about" variant="secondary" className="mt-8">
            Reha Spor’u Tanıyın <ArrowRight size={17} className="ml-2" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}
