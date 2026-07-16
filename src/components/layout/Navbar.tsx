"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Mail, Menu, Phone, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { siteSettings } from "@/data/siteSettings";
import { productMenuGroups, publicNavItems, siteName } from "@/lib/constants";

function isRouteActive(pathname: string, href: string) {
  return href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-brand-line bg-white/95 backdrop-blur-md">
      <div className="hidden bg-brand-red text-white lg:block">
        <div className="container-page flex h-9 items-center justify-end gap-7 text-[0.68rem] tracking-[0.035em]">
          <a href={`tel:${siteSettings.phone.replace(/[^+\d]/g, "")}`} className="inline-flex items-center gap-2 transition duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:-skew-x-3 hover:text-white/75">
            <Phone size={13} /> {siteSettings.phone}
          </a>
          <a href={`mailto:${siteSettings.email}`} className="inline-flex items-center gap-2 transition duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:skew-x-3 hover:text-white/75">
            <Mail size={13} /> {siteSettings.email}
          </a>
        </div>
      </div>

      <div className="container-page flex h-[72px] items-center justify-between gap-5">
        <Link href="/" className="group flex shrink-0 items-center gap-3" aria-label={`${siteName} ana sayfa`}>
          <span className="grid h-10 w-10 -skew-x-6 place-items-center bg-brand-red text-sm font-black text-white transition duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:skew-x-0 group-hover:bg-[rgb(var(--accent-hover))]"><span className="skew-x-6 group-hover:skew-x-0">RS</span></span>
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
                  <Link href={item.href} className={`inline-flex items-center gap-1 px-3 py-6 text-sm font-semibold transition duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:-skew-x-3 ${active ? "text-brand-red" : "text-slate-700 hover:text-brand-red"}`}>
                    {item.label} <ChevronDown size={15} />
                  </Link>
                  <div className="invisible absolute left-1/2 top-full w-[760px] -translate-x-1/2 translate-y-4 border-l-4 border-brand-red bg-white p-7 opacity-0 [box-shadow:18px_22px_0_rgba(15,23,42,0.10)] transition duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover/menu:visible group-hover/menu:translate-y-0 group-hover/menu:opacity-100">
                    <div className="grid grid-cols-4 gap-7">
                      {productMenuGroups.map((group) => (
                        <div key={group.title}>
                          <p className="border-b border-brand-line pb-3 text-sm font-bold text-brand-navy">{group.title}</p>
                          <div className="mt-3 grid gap-2.5">
                            {group.links.map((link) => (
                              <Link key={link.href} href={link.href} className="text-sm leading-5 text-slate-600 transition duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:translate-x-1 hover:text-brand-red">{link.label}</Link>
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
              <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={`px-3 py-6 text-sm font-medium transition duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:-skew-x-3 ${active ? "text-brand-red" : "text-slate-700 hover:text-brand-red"}`}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <Link href="/cart" aria-label="Teklif sepeti" className="grid h-11 w-11 place-items-center border border-brand-line text-brand-navy transition duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:-rotate-3 hover:border-brand-red hover:text-brand-red"><ShoppingBag size={18} /></Link>
          <Link href="/contact" className="bg-brand-red px-5 py-3 text-sm font-semibold text-white transition duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:-rotate-1 hover:skew-x-[-2deg] hover:bg-[rgb(var(--accent-hover))] active:bg-[rgb(var(--accent-active))]">Teklif Al</Link>
        </div>

        <button type="button" aria-label="Menüyü aç" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)} className="border border-brand-line p-2.5 text-brand-navy transition duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:-rotate-2 hover:border-brand-red lg:hidden">
          <Menu size={22} />
        </button>
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
