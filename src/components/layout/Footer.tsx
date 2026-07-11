import Link from "next/link";
import { Clock3, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { categories } from "@/data/categories";
import { siteSettings } from "@/data/siteSettings";
import { publicNavItems, siteName } from "@/lib/constants";

const phoneHref = `tel:${siteSettings.phone.replace(/[^+\d]/g, "")}`;

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_0.8fr_1.2fr] lg:py-16">
        <div>
          <Link href="/" className="inline-flex items-center gap-3" aria-label={`${siteName} ana sayfa`}>
            <span className="grid h-11 w-11 place-items-center rounded-md bg-brand-red text-sm font-black">RS</span>
            <span className="text-xl font-black tracking-tight">{siteName}</span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-6 text-slate-300">
            Spor tesisleri için zemin kaplaması, profesyonel ekipman ve anahtar teslim saha uygulama çözümleri.
          </p>
          <a
            href={siteSettings.instagram}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-white"
          >
            <Instagram size={18} aria-hidden="true" /> Instagram
          </a>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.14em] text-white">Ürün Grupları</h2>
          <div className="mt-5 grid gap-3 text-sm text-slate-300">
            {categories.map((category) => (
              <Link key={category.id} href={`/products/${category.slug}`} className="transition hover:text-white">
                {category.title}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.14em] text-white">Kurumsal</h2>
          <div className="mt-5 grid gap-3 text-sm text-slate-300">
            {publicNavItems.slice(1).map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.14em] text-white">İletişim</h2>
          <div className="mt-5 grid gap-4 text-sm text-slate-300">
            <a href={phoneHref} className="flex items-start gap-3 transition hover:text-white">
              <Phone className="mt-0.5 shrink-0 text-brand-red" size={17} aria-hidden="true" />
              {siteSettings.phone}
            </a>
            <a href={`mailto:${siteSettings.email}`} className="flex items-start gap-3 transition hover:text-white">
              <Mail className="mt-0.5 shrink-0 text-brand-red" size={17} aria-hidden="true" />
              <span className="break-all">{siteSettings.email}</span>
            </a>
            <span className="flex items-start gap-3">
              <MapPin className="mt-0.5 shrink-0 text-brand-red" size={17} aria-hidden="true" />
              {siteSettings.address}
            </span>
            <span className="flex items-start gap-3">
              <Clock3 className="mt-0.5 shrink-0 text-brand-red" size={17} aria-hidden="true" />
              {siteSettings.workingHours}
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-5 text-center text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <span>© {new Date().getFullYear()} Reha Spor. Tüm hakları saklıdır.</span>
          <span>Profesyonel spor tesisi çözümleri</span>
        </div>
      </div>
    </footer>
  );
}
