"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";
import { Button } from "@/components/ui/Button";
import { publicNavItems, siteName } from "@/lib/constants";

function isRouteActive(pathname: string, href: string) {
  return href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-brand-line bg-brand-panel/95">
      <div className="container-page flex h-20 items-center justify-between gap-5">
        <Link href="/" className="group flex shrink-0 items-center gap-3" aria-label={`${siteName} ana sayfa`}>
          <span className="grid h-11 w-11 place-items-center rounded bg-brand-red text-lg font-black text-white transition group-hover:bg-brand-navy">
            RS
          </span>
          <span className="leading-none">
            <span className="block text-lg font-black text-brand-navy">{siteName}</span>
            <span className="label-caps mt-1 block text-[10px] text-slate-500">Spor sistemleri</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Ana menü">
          {publicNavItems.map((item) => {
            const active = isRouteActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "label-caps border-b-2 border-brand-red px-3 py-2.5 text-brand-red"
                    : "label-caps px-3 py-2.5 text-slate-700 transition hover:text-brand-red"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <ThemeSwitcher />
          <Button href="/contact" variant="secondary">Teklif Al</Button>
        </div>

        <button
          type="button"
          aria-label="Menüyü aç"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen(true)}
          className="rounded border border-brand-line p-2.5 text-brand-navy transition hover:border-brand-red hover:text-brand-red lg:hidden"
        >
          <Menu size={22} aria-hidden="true" />
        </button>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
