import type { Metadata } from "next";
import { Clock3, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
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
        eyebrow="İletişim"
        title="Projenizi birlikte planlayalım"
        description="Alanınız ve ihtiyacınız hakkında kısa bilgi paylaşın. Uygun zemin, ekipman veya saha sistemi için ekibimiz sizinle iletişime geçsin."
        breadcrumbs={[{ label: "İletişim" }]}
      />

      <section className="section-padding bg-brand-soft">
        <div className="container-page grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="mb-5 text-xs font-black uppercase tracking-[0.16em] text-brand-red">Teklif Formu</p>
            <ContactForm initialSubject={initialSubject} />
          </div>

          <aside className="grid gap-5">
            <div className="rounded-xl bg-brand-navy p-7 text-white shadow-brand sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-red-300">Firma Bilgileri</p>
              <h2 className="mt-3 text-2xl font-black">Reha Spor ile iletişime geçin</h2>
              <div className="mt-7 grid gap-5 text-sm text-slate-300">
                <a href={phoneHref} className="flex items-start gap-4 transition hover:text-white">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/10 text-red-300"><Phone size={18} aria-hidden="true" /></span>
                  <span><strong className="block text-xs uppercase tracking-[0.1em] text-slate-400">Telefon</strong><span className="mt-1 block font-semibold">{settings.phone}</span></span>
                </a>
                <a href={`mailto:${settings.email}`} className="flex items-start gap-4 transition hover:text-white">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/10 text-red-300"><Mail size={18} aria-hidden="true" /></span>
                  <span className="min-w-0"><strong className="block text-xs uppercase tracking-[0.1em] text-slate-400">E-posta</strong><span className="mt-1 block break-all font-semibold">{settings.email}</span></span>
                </a>
                <div className="flex items-start gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/10 text-red-300"><MapPin size={18} aria-hidden="true" /></span>
                  <span><strong className="block text-xs uppercase tracking-[0.1em] text-slate-400">Adres</strong><span className="mt-1 block font-semibold">{settings.address}</span></span>
                </div>
                <div className="flex items-start gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/10 text-red-300"><Clock3 size={18} aria-hidden="true" /></span>
                  <span><strong className="block text-xs uppercase tracking-[0.1em] text-slate-400">Çalışma Saatleri</strong><span className="mt-1 block font-semibold">{settings.workingHours}</span></span>
                </div>
              </div>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex w-full items-center justify-center rounded-md bg-brand-red px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                <MessageCircle size={18} className="mr-2" aria-hidden="true" /> WhatsApp ile Yazın
              </a>
            </div>

            <a
              href={settings.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="group grid min-h-56 place-items-center rounded-xl border border-dashed border-slate-300 bg-white p-7 text-center transition hover:border-brand-red"
            >
              <span>
                <Navigation className="mx-auto text-brand-red" size={29} aria-hidden="true" />
                <strong className="mt-4 block text-lg font-black text-brand-navy">Haritada görüntüleyin</strong>
                <span className="mt-2 block text-sm leading-6 text-slate-500">Konum bağlantısı yeni sekmede açılır.</span>
              </span>
            </a>
          </aside>
        </div>
      </section>
    </>
  );
}
