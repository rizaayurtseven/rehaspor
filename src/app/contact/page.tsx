import type { Metadata } from "next";
import { BookOpen, Clock3, ExternalLink, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { ContactForm } from "@/components/sections/ContactForm";
import { PublicPageHero } from "@/components/sections/PublicPageHero";
import { getSiteSettings } from "@/lib/api";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Spor zemini, ekipman, padel kort ve saha uygulaması projeleriniz için Reha Spor’dan teklif alın."
};

type ContactPageProps = {
  searchParams?: Promise<{ subject?: string | string[] }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const [settings, resolvedSearchParams] = await Promise.all([
    getSiteSettings(),
    searchParams ?? Promise.resolve<{ subject?: string | string[] }>({})
  ]);
  const initialSubject = Array.isArray(resolvedSearchParams.subject)
    ? resolvedSearchParams.subject[0]
    : resolvedSearchParams.subject;
  const whatsappNumber = settings.whatsapp.replace(/\D/g, "");
  const phoneHref = `tel:${settings.phone.replace(/[^+\d]/g, "")}`;

  return (
    <>
      <PublicPageHero
        eyebrow="Teknik iletişim"
        title="Projenizi birlikte planlayalım"
        description="Alanınız ve ihtiyacınız hakkında kısa bilgi paylaşın. Uygun zemin, ekipman veya saha sistemi için teknik ekibimiz sizinle iletişime geçsin."
        breadcrumbs={[{ label: "İletişim" }]}
      />

      <section className="industrial-grid section-padding bg-brand-soft">
        <div className="container-page grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <ContactForm initialSubject={initialSubject} />

          <aside className="grid gap-5">
            <div className="bg-brand-navy p-7 text-white sm:p-9">
              <p className="label-caps text-red-300">Merkez ofis</p>
              <h2 className="mt-3 text-2xl font-black uppercase">Reha Spor ile iletişime geçin</h2>
              <div className="mt-8 grid gap-6 text-sm text-slate-300">
                <a href={phoneHref} className="flex items-start gap-4 transition hover:text-white">
                  <Phone size={19} className="mt-0.5 shrink-0 text-red-300" aria-hidden="true" />
                  <span><strong className="label-caps block text-slate-400">Telefon</strong><span className="mt-1 block font-semibold">{settings.phone}</span></span>
                </a>
                <a href={`mailto:${settings.email}`} className="flex items-start gap-4 transition hover:text-white">
                  <Mail size={19} className="mt-0.5 shrink-0 text-red-300" aria-hidden="true" />
                  <span className="min-w-0"><strong className="label-caps block text-slate-400">E-posta</strong><span className="mt-1 block break-all font-semibold">{settings.email}</span></span>
                </a>
                <div className="flex items-start gap-4">
                  <MapPin size={19} className="mt-0.5 shrink-0 text-red-300" aria-hidden="true" />
                  <span><strong className="label-caps block text-slate-400">Adres</strong><span className="mt-1 block font-semibold">{settings.address}</span></span>
                </div>
                <div className="flex items-start gap-4">
                  <Clock3 size={19} className="mt-0.5 shrink-0 text-red-300" aria-hidden="true" />
                  <span><strong className="label-caps block text-slate-400">Çalışma saatleri</strong><span className="mt-1 block font-semibold">{settings.workingHours}</span></span>
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between bg-brand-steel p-6 text-white transition hover:bg-brand-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
            >
              <span className="flex items-center gap-4">
                <MessageCircle size={25} aria-hidden="true" />
                <span><span className="label-caps block text-white/65">Canlı destek</span><strong className="mt-1 block text-lg">WhatsApp’tan yazın</strong></span>
              </span>
              <ExternalLink className="transition group-hover:translate-x-1" size={20} aria-hidden="true" />
            </a>

            <a
              href="/e-catalog"
              className="group flex min-h-44 items-center justify-between border border-brand-steel bg-white p-7 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
            >
              <span>
                <BookOpen className="text-brand-red" size={25} aria-hidden="true" />
                <span className="label-caps mt-5 block text-brand-red">Teknik doküman</span>
                <strong className="mt-2 block text-xl font-black uppercase text-brand-navy">E-Katalog</strong>
              </span>
              <ExternalLink className="text-brand-navy transition group-hover:translate-x-1" size={21} aria-hidden="true" />
            </a>
          </aside>
        </div>
      </section>

      <section className="bg-white pb-16 sm:pb-24">
        <div className="container-page">
          <div className="mb-8 flex flex-col gap-4 border-b border-brand-line pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="label-caps text-brand-red">Ulaşım</p>
              <h2 className="industrial-heading mt-3 text-3xl text-brand-navy">Operasyon merkezimiz</h2>
            </div>
            <span className="label-caps text-slate-500">{settings.address}</span>
          </div>
          <a
            href={settings.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="technical-grid group grid min-h-72 place-items-center border border-brand-line bg-brand-soft p-8 text-center transition hover:border-brand-red focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 sm:min-h-96"
          >
            <span>
              <Navigation className="mx-auto text-brand-red" size={32} aria-hidden="true" />
              <strong className="mt-4 block text-xl font-black uppercase text-brand-navy">Haritada görüntüleyin</strong>
              <span className="mt-2 block text-sm text-slate-500">Konum bağlantısı yeni sekmede açılır.</span>
            </span>
          </a>
        </div>
      </section>
    </>
  );
}
