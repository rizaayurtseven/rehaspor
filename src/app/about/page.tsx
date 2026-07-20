import type { Metadata } from "next";
import { ContactCTASection } from "@/components/sections/ContactCTASection";
import { PublicPageHero } from "@/components/sections/PublicPageHero";
import { SectionTitle } from "@/components/ui/SectionTitle";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "Reha Spor’un spor zeminleri, ekipman, imalat, montaj ve saha uygulamalarındaki deneyimini keşfedin."
};

const values = [
  {
    title: "Deneyim",
    description: "2000’li yıllara dayanan sektör bilgimizi her projenin teknik ve operasyonel ihtiyacına yansıtırız."
  },
  {
    title: "Kaliteli Uygulama",
    description: "İmalat, montaj ve saha uygulamasında detayları kontrol ederek projeleri minimum hata hedefiyle tamamlarız."
  },
  {
    title: "Müşteri Odaklılık",
    description: "Doğru ürünü seçmekten teslim sonrasına kadar açık iletişim kurar, ihtiyaca uygun çözümler geliştiririz."
  },
  {
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
          <div className="mt-10 grid border-y border-brand-line md:grid-cols-2">
            {values.map(({ title, description }, index) => (
              <article key={title} className="grid grid-cols-[3.25rem_1fr] gap-4 border-b border-brand-line py-7 md:px-7 md:odd:border-r md:[&:nth-last-child(-n+2)]:border-b-0">
                <span className="technical-label pt-1 text-brand-red">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="text-xl font-black text-brand-navy">{title}</h2>
                  <p className="mt-3 text-base leading-7 text-brand-muted">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactCTASection />
    </>
  );
}
