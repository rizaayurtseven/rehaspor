"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Mail, Menu, Phone } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";
import { defaultSiteSettings as siteSettings, productMenuGroups, publicNavItems, siteName } from "@/lib/constants";

function isRouteActive(pathname: string, href: string) {
  return href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header className="sticky top-0 z-40 border-b border-brand-line bg-brand-panel/95 backdrop-blur-md">
      <div className="hidden border-b border-brand-line/70 lg:block">
        <div className="container-page flex h-9 items-center justify-end gap-6 text-xs text-slate-600">
          <a href={`tel:${siteSettings.phone.replace(/[^+\d]/g, "")}`} className="inline-flex items-center gap-2 hover:text-brand-red">
            <Phone size={13} /> {siteSettings.phone}
          </a>
          <a href={`mailto:${siteSettings.email}`} className="inline-flex items-center gap-2 hover:text-brand-red">
            <Mail size={13} /> {siteSettings.email}
          </a>
        </div>
      </div>

      <div className="container-page flex h-[76px] items-center justify-between gap-5">
        <Link href="/" className="group flex shrink-0 items-center gap-3" aria-label={`${siteName} ana sayfa`}>
          <span className="grid h-10 w-10 place-items-center rounded bg-brand-red text-base font-bold text-white">RS</span>
          <span className="leading-none">
            <span className="block text-lg font-bold text-brand-navy">{siteName}</span>
            <span className="mt-1 block text-[11px] text-slate-500">Spor zeminleri ve ekipmanları</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Ana menü">
          {publicNavItems.map((item) => {
            const active = isRouteActive(pathname, item.href);
            if (item.href === "/products") {
              return (
                <div key={item.href} className="group/menu relative">
                  <Link href={item.href} className={`inline-flex items-center gap-1 px-3 py-7 text-sm font-semibold ${active ? "text-brand-red" : "text-slate-700 hover:text-brand-red"}`}>
                    {item.label} <ChevronDown size={15} />
                  </Link>
                  <div className="invisible absolute left-1/2 top-full w-[760px] -translate-x-1/2 translate-y-2 border border-brand-line bg-white p-7 opacity-0 shadow-2xl transition group-hover/menu:visible group-hover/menu:translate-y-0 group-hover/menu:opacity-100">
                    <div className="grid grid-cols-4 gap-7">
                      {productMenuGroups.map((group) => (
                        <div key={group.title}>
                          <p className="border-b border-brand-line pb-3 text-sm font-bold text-brand-navy">{group.title}</p>
                          <div className="mt-3 grid gap-2.5">
                            {group.links.map((link) => (
                              <Link key={link.href} href={link.href} className="text-sm leading-5 text-slate-600 hover:text-brand-red">{link.label}</Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={`px-3 py-7 text-sm font-medium ${active ? "text-brand-red" : "text-slate-700 hover:text-brand-red"}`}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <ThemeSwitcher />
          <Link href="/contact" className="rounded bg-brand-red px-4 py-3 text-sm font-semibold text-white hover:bg-brand-navy">Teklif Al</Link>
        </div>

        <button ref={menuButtonRef} type="button" aria-label="Menüyü aç" aria-controls="mobile-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)} className="grid min-h-11 min-w-11 place-items-center rounded border border-brand-line text-brand-navy lg:hidden">
          <Menu size={22} />
        </button>
      </div>
      <MobileMenu open={menuOpen} onClose={closeMenu} returnFocusRef={menuButtonRef} />
    </header>
  );
}
