import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { QuoteCart } from "@/components/cart/QuoteCart";

export const metadata: Metadata = {
  title: "Teklif Sepeti",
  description: "Reha Spor ürünlerini teklif sepetinde bir araya getirin ve proje bilgilerinizi paylaşın.",
  robots: { index: false, follow: true }
};

export default function CartPage() {
  return (
    <>
      <header className="border-b border-brand-line bg-brand-cream py-10 sm:py-14">
        <div className="container-page">
          <nav aria-label="Sayfa yolu" className="flex items-center gap-2 text-sm text-brand-muted">
            <Link href="/" className="hover:text-brand-red">Ana sayfa</Link><ChevronRight size={14} /><span aria-current="page">Teklif sepeti</span>
          </nav>
          <div className="mt-7 grid gap-4 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="technical-label text-brand-red">01 / Seçiminiz</p>
              <h1 className="mt-3 text-4xl font-bold tracking-[-0.04em] text-brand-navy sm:text-5xl">Teklif sepeti ve proje bilgileri</h1>
            </div>
            <p className="leading-7 text-brand-muted lg:col-span-4">Bu ekran ödeme almaz. Seçiminiz teknik ekibimizin hazırlayacağı proje teklifine dönüşür.</p>
          </div>
        </div>
      </header>
      <section className="bg-brand-panel py-10 pb-28 sm:py-14 lg:pb-14"><div className="container-page"><QuoteCart /></div></section>
    </>
  );
}
