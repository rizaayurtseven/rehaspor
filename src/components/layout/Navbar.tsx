"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Mail, Menu, Phone, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { siteSettings } from "@/data/siteSettings";
import { productMenuGroups, publicNavItems, siteName } from "@/lib/constants";

function isRouteActive(pathname: string, href: string) {
  return href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateScrolledState = () => setScrolled(window.scrollY > 20);
    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolledState);
  }, []);

  return (
    <header className={`sticky top-0 z-40 border-b bg-white transition-[border-color,box-shadow] duration-300 ${scrolled ? "border-brand-line shadow-[0_6px_20px_rgba(15,23,42,0.06)]" : "border-transparent"}`}>
      <div className="hidden bg-brand-red text-white lg:block">
        <div className="container-page flex h-9 items-center justify-end gap-7 text-[0.68rem] tracking-[0.035em]">
          <a href={`tel:${siteSettings.phone.replace(/[^+\d]/g, "")}`} className="inline-flex min-h-9 items-center gap-2 transition-colors duration-300 hover:text-white/75">
            <Phone size={13} /> {siteSettings.phone}
          </a>
          <a href={`mailto:${siteSettings.email}`} className="inline-flex min-h-9 items-center gap-2 transition-colors duration-300 hover:text-white/75">
            <Mail size={13} /> {siteSettings.email}
          </a>
        </div>
      </div>

      <div className="container-page flex h-[72px] items-center justify-between gap-5">
        <Link href="/" className="group flex shrink-0 items-center gap-3" aria-label={`${siteName} ana sayfa`}>
          <span className="grid h-10 w-10 place-items-center border-l-4 border-brand-navy bg-brand-red text-sm font-black text-white transition-colors group-hover:bg-[rgb(var(--accent-hover))]">RS</span>
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
                  <Link href={item.href} aria-current={active ? "page" : undefined} className={`inline-flex items-center gap-1 border-b-2 px-3 py-6 text-sm font-semibold transition-colors ${active ? "border-brand-red text-brand-red" : "border-transparent text-slate-700 hover:border-brand-line hover:text-brand-red"}`}>
                    {item.label} <ChevronDown size={15} />
                  </Link>
                  <div className="invisible absolute left-1/2 top-full w-[760px] -translate-x-1/2 translate-y-2 rounded-[8px] border border-brand-line border-l-4 border-l-brand-red bg-white p-7 opacity-0 shadow-[0_14px_35px_rgba(15,23,42,0.08)] transition duration-300 group-hover/menu:visible group-hover/menu:translate-y-0 group-hover/menu:opacity-100">
                    <div className="grid grid-cols-4 gap-7">
                      {productMenuGroups.map((group) => (
                        <div key={group.title}>
                          <p className="border-b border-brand-line pb-3 text-sm font-bold text-brand-navy">{group.title}</p>
                          <div className="mt-3 grid gap-2.5">
                            {group.links.map((link) => (
                              <Link key={link.href} href={link.href} className="text-sm leading-5 text-slate-600 transition-colors duration-300 hover:text-brand-red">{link.label}</Link>
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
              <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={`border-b-2 px-3 py-6 text-sm font-medium transition-colors ${active ? "border-brand-red text-brand-red" : "border-transparent text-slate-700 hover:border-brand-line hover:text-brand-red"}`}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <Link href="/cart" aria-label="Teklif sepeti" className="grid h-11 w-11 place-items-center border border-brand-line text-brand-navy transition-colors hover:border-brand-red hover:text-brand-red"><ShoppingBag size={18} /></Link>
          <Link href="/contact" className="rounded-[5px] bg-brand-red px-5 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[rgb(var(--accent-hover))] active:bg-[rgb(var(--accent-active))]">Teklif Al</Link>
        </div>

        <button type="button" aria-label="Menüyü aç" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)} className="border border-brand-line p-2.5 text-brand-navy transition-colors hover:border-brand-red lg:hidden">
          <Menu size={22} />
        </button>
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
