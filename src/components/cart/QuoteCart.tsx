"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Minus, Plus, ShieldCheck, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { readQuoteCart, writeQuoteCart, type QuoteCartItem } from "@/components/cart/QuoteCartStorage";

export function QuoteCart() {
  const [items, setItems] = useState<QuoteCartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setItems(readQuoteCart());
    setReady(true);
  }, []);

  function update(next: QuoteCartItem[]) {
    setItems(next);
    writeQuoteCart(next);
  }

  function changeQuantity(id: string, difference: number) {
    update(items.map((item) => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + difference) } : item));
  }

  if (!ready) return <div className="min-h-72 border border-brand-line bg-white" aria-busy="true" />;

  if (!items.length) {
    return (
      <div className="border border-brand-line bg-white px-6 py-20 text-center">
        <ShoppingBagIcon />
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-brand-navy">Teklif sepetiniz henüz boş</h2>
        <p className="mx-auto mt-3 max-w-lg leading-7 text-brand-muted">Ürün detay sayfasından ihtiyacınız olan sistemleri ekleyin; ekibimiz proje kapsamını birlikte netleştirsin.</p>
        <Link href="/products" className="mt-8 inline-flex min-h-12 items-center bg-brand-red px-6 py-3 font-bold text-white hover:bg-brand-navy">Ürünlere git <ArrowRight size={18} className="ml-2" /></Link>
      </div>
    );
  }

  return (
    <form action="/contact" method="get" className="grid items-start gap-8 lg:grid-cols-12">
      <div className="space-y-8 lg:col-span-8">
        <section className="border border-brand-line bg-white" aria-labelledby="cart-products">
          <div className="flex items-center justify-between border-b border-brand-line px-5 py-4 sm:px-7">
            <h2 id="cart-products" className="text-xl font-bold text-brand-navy">Seçilen sistemler</h2>
            <span className="technical-label text-brand-muted">{items.length} ürün</span>
          </div>
          <div className="divide-y divide-brand-line">
            {items.map((item) => (
              <article key={item.id} className="grid grid-cols-[88px_1fr] gap-4 p-5 sm:grid-cols-[120px_1fr_auto] sm:gap-6 sm:p-7">
                <div className="relative aspect-square overflow-hidden bg-brand-panel">
                  <Image src={item.image} alt="" fill className="object-cover" sizes="120px" />
                </div>
                <div>
                  <span className="technical-label text-brand-red">{item.code}</span>
                  <h3 className="mt-2 text-lg font-bold leading-tight text-brand-navy">{item.title}</h3>
                  <p className="mt-2 text-sm text-brand-muted">Proje bazlı fiyatlandırma</p>
                  <div className="mt-4 inline-flex h-11 items-center border border-brand-line">
                    <button type="button" onClick={() => changeQuantity(item.id, -1)} className="grid h-full w-11 place-items-center hover:bg-brand-panel" aria-label={`${item.title} miktarını azalt`}><Minus size={15} /></button>
                    <span className="grid h-full min-w-11 place-items-center border-x border-brand-line font-mono text-sm">{item.quantity}</span>
                    <button type="button" onClick={() => changeQuantity(item.id, 1)} className="grid h-full w-11 place-items-center hover:bg-brand-panel" aria-label={`${item.title} miktarını artır`}><Plus size={15} /></button>
                  </div>
                </div>
                <button type="button" onClick={() => update(items.filter((current) => current.id !== item.id))} className="col-start-2 inline-flex min-h-11 items-center self-start text-sm font-semibold text-brand-muted hover:text-brand-red sm:col-start-auto" aria-label={`${item.title} ürününü sepetten kaldır`}><Trash2 size={16} className="mr-2" /> Kaldır</button>
              </article>
            ))}
          </div>
        </section>

        <section className="border border-brand-line bg-white p-5 sm:p-7" aria-labelledby="project-details">
          <span className="technical-label text-brand-red">02 / Proje bilgileri</span>
          <h2 id="project-details" className="mt-3 text-2xl font-bold text-brand-navy">Teklifin hazırlanacağı bilgiler</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-brand-navy">Ad soyad<input name="name" required className="min-h-12 border border-brand-line bg-white px-4 font-normal outline-none focus:border-brand-red" /></label>
            <label className="grid gap-2 text-sm font-semibold text-brand-navy">Firma<input name="company" className="min-h-12 border border-brand-line bg-white px-4 font-normal outline-none focus:border-brand-red" /></label>
            <label className="grid gap-2 text-sm font-semibold text-brand-navy">Telefon<input name="phone" type="tel" required className="min-h-12 border border-brand-line bg-white px-4 font-normal outline-none focus:border-brand-red" /></label>
            <label className="grid gap-2 text-sm font-semibold text-brand-navy">E-posta<input name="email" type="email" required className="min-h-12 border border-brand-line bg-white px-4 font-normal outline-none focus:border-brand-red" /></label>
            <label className="grid gap-2 text-sm font-semibold text-brand-navy sm:col-span-2">Proje notu<textarea name="message" rows={4} className="border border-brand-line bg-white px-4 py-3 font-normal outline-none focus:border-brand-red" placeholder="Alan ölçüsü, şehir, hedef teslim tarihi ve varsa özel ihtiyaçlarınız" /></label>
          </div>
        </section>
      </div>

      <aside className="border border-brand-line bg-brand-navy p-6 text-white lg:sticky lg:top-28 lg:col-span-4 sm:p-7">
        <span className="technical-label text-red-300">03 / Talep özeti</span>
        <h2 className="mt-3 text-2xl font-bold">Proje teklifi</h2>
        <dl className="mt-7 divide-y divide-white/15 border-y border-white/15 text-sm">
          <div className="flex justify-between gap-4 py-4"><dt className="text-slate-300">Ürün grubu</dt><dd className="font-bold">{items.length}</dd></div>
          <div className="flex justify-between gap-4 py-4"><dt className="text-slate-300">Toplam adet</dt><dd className="font-bold">{items.reduce((sum, item) => sum + item.quantity, 0)}</dd></div>
          <div className="flex justify-between gap-4 py-4"><dt className="text-slate-300">Fiyat</dt><dd className="font-bold text-red-300">Keşif sonrası</dd></div>
        </dl>
        <p className="mt-5 flex gap-3 text-sm leading-6 text-slate-300"><ShieldCheck size={19} className="mt-0.5 shrink-0 text-red-300" /> Bilgileriniz yalnızca teklif hazırlığı için kullanılır.</p>
        <button type="submit" className="mt-7 hidden min-h-12 w-full items-center justify-center bg-brand-red px-5 py-3 font-bold text-white hover:bg-white hover:text-brand-navy lg:inline-flex">Teklif talebine devam et <ArrowRight size={18} className="ml-2" /></button>
        <p className="mt-4 flex items-center gap-2 text-xs text-slate-400"><CheckCircle2 size={15} /> Ekibimiz bir iş günü içinde dönüş yapar.</p>
      </aside>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-brand-line bg-white p-3 lg:hidden">
        <button type="submit" className="flex min-h-12 w-full items-center justify-center bg-brand-red px-5 py-3 font-bold text-white">Teklif talebine devam et <ArrowRight size={18} className="ml-2" /></button>
      </div>
    </form>
  );
}

function ShoppingBagIcon() {
  return <span className="mx-auto grid h-16 w-16 place-items-center border border-brand-line bg-brand-panel text-brand-red"><CheckCircle2 size={28} /></span>;
}
