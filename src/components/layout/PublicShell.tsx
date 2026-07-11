"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export function PublicShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-[60] -translate-y-20 rounded-md bg-brand-red px-4 py-3 text-sm font-bold text-white transition focus:translate-y-0"
      >
        İçeriğe geç
      </a>
      <Navbar />
      <main id="main-content" className="min-h-[60vh]" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  );
}
