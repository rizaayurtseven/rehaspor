"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { productMenuGroups, publicNavItems, siteName } from "@/lib/constants";

type MobileMenuProps = { open: boolean; onClose: () => void };

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const previouslyFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusableElements?.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedElement?.focus();
    };
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 h-[100dvh] lg:hidden">
      <div aria-hidden="true" className="absolute inset-0 bg-brand-navy/70" onClick={onClose} />
      <aside ref={dialogRef} role="dialog" aria-modal="true" aria-label="Mobil menü" className="absolute right-0 top-0 flex h-[100dvh] w-[min(92vw,420px)] flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-brand-line px-6 py-5">
          <span className="text-lg font-bold text-brand-navy">{siteName}</span>
          <button ref={closeButtonRef} type="button" aria-label="Menüyü kapat" onClick={onClose} className="border border-brand-line p-2 text-brand-navy"><X size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <nav className="grid grid-cols-2 gap-x-4 gap-y-1" aria-label="Mobil ana menü">
            {publicNavItems.filter((item) => item.href !== "/products").map((item) => (
              <Link key={item.href} href={item.href} onClick={onClose} className="border-b border-brand-line py-3 text-sm font-semibold text-brand-ink">{item.label}</Link>
            ))}
          </nav>

          <p className="mt-7 text-sm font-bold text-brand-navy">Ürünler</p>
          <div className="mt-4 grid gap-6">
            {productMenuGroups.map((group) => (
              <div key={group.title}>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-red">{group.title}</p>
                <div className="mt-2 grid gap-2">
                  {group.links.map((link) => (
                    <Link key={link.href} href={link.href} onClick={onClose} className="text-sm text-slate-600">{link.label}</Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Link href="/cart" onClick={onClose} className="mt-7 flex min-h-12 items-center gap-3 border-t border-brand-line pt-5 font-semibold text-brand-navy"><ShoppingBag size={18} className="text-brand-red" /> Teklif sepeti</Link>
        </div>

        <div className="border-t border-brand-line p-5">
          <Link href="/contact" onClick={onClose} className="flex items-center justify-between bg-brand-red px-5 py-4 font-semibold text-white">
            Projeniz için teklif alın <ArrowRight size={19} />
          </Link>
        </div>
      </aside>
    </div>
  );
}
