"use client";

import { ExternalLink, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMenuOpen]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="admin-shell flex min-h-screen bg-brand-soft">
      <AdminSidebar />

      <div className="min-w-0 flex-1">
        <div className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-brand-line bg-white/95 px-4 backdrop-blur lg:hidden">
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-brand-line text-brand-navy transition hover:border-brand-red hover:text-brand-red"
            aria-label="Admin menüsünü aç"
            aria-expanded={isMenuOpen}
          >
            <Menu size={20} />
          </button>
          <Link href="/admin/dashboard" onClick={() => setIsMenuOpen(false)} className="text-sm font-black tracking-wide text-brand-navy">
            REHA SPOR <span className="text-brand-red">ADMIN</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            className="grid h-10 w-10 place-items-center rounded-xl border border-brand-line text-brand-navy transition hover:border-brand-red hover:text-brand-red"
            aria-label="Siteyi yeni sekmede aç"
          >
            <ExternalLink size={18} />
          </Link>
        </div>
        {children}
      </div>

      {isMenuOpen ? (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Admin menüsü"
        >
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Menüyü kapat"
          />
          <div className="relative h-full">
            <AdminSidebar mobile onClose={() => setIsMenuOpen(false)} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
