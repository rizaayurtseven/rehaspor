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

      <section className="industrial-grid section-padding bg-white">
        <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionTitle eyebrow="Reha Spor" title="Tecrübe, araştırma ve uygulama disiplini" />
          </div>
          <div className="space-y-5 border-l-2 border-brand-line pl-6 text-base leading-8 text-brand-muted sm:pl-8">
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
            {values.map(({ icon: Icon, title, description }, index) => (
              <article
                key={title}
                className={index === 0 ? "border border-brand-navy bg-brand-navy p-7 text-white" : index === 3 ? "border border-brand-red bg-brand-red p-7 text-white" : "border border-brand-line bg-white p-7"}
              >
                <span className={index === 0 || index === 3 ? "grid h-12 w-12 place-items-center text-white" : "grid h-12 w-12 place-items-center text-brand-red"}>
                  <Icon size={23} aria-hidden="true" />
                </span>
                <p className={index === 0 || index === 3 ? "label-caps mt-6 text-white/60" : "label-caps mt-6 text-brand-red"}>
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className={index === 0 || index === 3 ? "mt-3 text-xl font-black uppercase" : "mt-3 text-xl font-black uppercase text-brand-navy"}>{title}</h2>
                <p className={index === 0 || index === 3 ? "mt-3 text-sm leading-6 text-white/70" : "mt-3 text-sm leading-6 text-brand-muted"}>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactCTASection />
    </>
  );
}
