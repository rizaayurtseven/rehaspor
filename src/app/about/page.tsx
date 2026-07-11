import type { Metadata } from "next";
import { Focus, RefreshCw, ShieldCheck, UsersRound } from "lucide-react";
import { ContactCTASection } from "@/components/sections/ContactCTASection";
import { PublicPageHero } from "@/components/sections/PublicPageHero";
import { SectionTitle } from "@/components/ui/SectionTitle";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "Reha Spor’un spor zeminleri, ekipman, imalat, montaj ve saha uygulamalarındaki deneyimini keşfedin."
};

const values = [
  {
    icon: Focus,
    title: "Deneyim",
    description: "2000’li yıllara dayanan sektör bilgimizi her projenin teknik ve operasyonel ihtiyacına yansıtırız."
  },
  {
    icon: ShieldCheck,
    title: "Kaliteli Uygulama",
    description: "İmalat, montaj ve saha uygulamasında detayları kontrol ederek projeleri minimum hata hedefiyle tamamlarız."
  },
  {
    icon: UsersRound,
    title: "Müşteri Odaklılık",
    description: "Doğru ürünü seçmekten teslim sonrasına kadar açık iletişim kurar, ihtiyaca uygun çözümler geliştiririz."
  },
  {
    icon: RefreshCw,
    title: "Sürekli Gelişim",
    description: "Dünya standartlarına yaklaşan ekipman ve uygulamalar için araştırır, süreçlerimizi ve ürün bilgimizi yenileriz."
  }
];

export default function AboutPage() {
  return (
    <>
      <PublicPageHero
        eyebrow="Kurumsal"
        title="Sahadaki deneyimi güvenilir çözümlere dönüştürüyoruz"
        description="Reha Spor; spor alanlarının planlanması, doğru sistemin seçilmesi ve nitelikli biçimde uygulanması için müşterileriyle uzun soluklu iş birlikleri kurar."
        breadcrumbs={[{ label: "Hakkımızda" }]}
      />

      <section className="section-padding bg-white">
        <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionTitle eyebrow="Reha Spor" title="Tecrübe, araştırma ve uygulama disiplini" />
          </div>
          <div className="space-y-5 text-base leading-8 text-slate-600">
            <p>
              2000’li yıllara uzanan sektör deneyimimizle spor zemin kaplamaları, saha ekipmanları ve tesis uygulamalarında imalat ile montaj süreçlerini bir bütün olarak ele alıyoruz. Her projeye hazır bir kalıp yerine alanın kullanım amacı, altyapısı ve işletme koşullarına göre yaklaşıyoruz.
            </p>
            <p>
              Müşteri beklentisini doğru anlamayı, süreci açık biçimde planlamayı ve projeyi minimum hata anlayışıyla teslim etmeyi önemsiyoruz. Amacımız yalnızca ürünü sahaya ulaştırmak değil; güvenli, dayanıklı ve uzun süre verim alınabilecek bir sistem kurmak.
            </p>
            <p>
              Dünya standartlarına yaklaşan ekipman ve uygulama kalitesi için yeni malzemeleri, yöntemleri ve spor tesisi ihtiyaçlarını sürekli araştırıyoruz. Gelişim, kalite ve sorumluluk yaklaşımımızı her ölçekte projeye aynı özenle yansıtıyoruz.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-soft">
        <div className="container-page">
          <SectionTitle
            eyebrow="Çalışma İlkelerimiz"
            title="Her projede aynı kalite standardı"
            description="Kararlarımızı ve saha uygulamalarımızı dört temel değer yönlendirir."
            align="center"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, description }) => (
              <article key={title} className="rounded-lg border border-brand-line bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-card">
                <span className="grid h-12 w-12 place-items-center rounded-lg bg-red-50 text-brand-red">
                  <Icon size={23} aria-hidden="true" />
                </span>
                <h2 className="mt-6 text-xl font-black text-brand-navy">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactCTASection />
    </>
  );
}
