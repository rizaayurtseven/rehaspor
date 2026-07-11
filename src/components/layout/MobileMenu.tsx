"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { publicNavItems, siteName } from "@/lib/constants";
import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

function isRouteActive(pathname: string, href: string) {
  return href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button type="button" aria-label="Menüyü kapat" className="absolute inset-0 bg-brand-navy/70 backdrop-blur-sm" onClick={onClose} />
      <aside
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Mobil menü"
        className="absolute right-0 top-0 flex h-full w-[min(88vw,380px)] flex-col bg-white p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-brand-line pb-5">
          <span className="text-lg font-black tracking-tight text-brand-navy">{siteName}</span>
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Menüyü kapat"
            onClick={onClose}
            className="rounded-md border border-brand-line p-2 text-brand-navy transition hover:border-brand-red hover:text-brand-red"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <nav className="mt-6 grid gap-1" aria-label="Mobil ana menü">
          {publicNavItems.map((item) => {
            const active = isRouteActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "rounded-md bg-red-50 px-4 py-3.5 font-bold text-brand-red"
                    : "rounded-md px-4 py-3.5 font-semibold text-brand-ink transition hover:bg-brand-soft"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 border-t border-brand-line pt-5">
          <p className="label-caps mb-3 text-slate-500">Tema</p>
          <ThemeSwitcher />
        </div>

        <Link
          href="/contact"
          onClick={onClose}
          className="mt-auto inline-flex items-center justify-between rounded-md bg-brand-red px-5 py-4 font-bold text-white transition hover:bg-red-700"
        >
          Projeniz için teklif alın
          <ArrowRight size={19} aria-hidden="true" />
        </Link>
      </aside>
    </div>
  );
}
