"use client";

import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/types/product";
import { readQuoteCart, writeQuoteCart } from "@/components/cart/QuoteCartStorage";

type Props = {
  product: Pick<Product, "id" | "code" | "title" | "image" | "categorySlug" | "slug">;
  className?: string;
  compact?: boolean;
};

export function AddToQuoteButton({ product, className = "", compact = false }: Props) {
  const router = useRouter();

  function addToCart() {
    const items = readQuoteCart();
    const existing = items.find((item) => item.id === product.id);
    const next = existing
      ? items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...items, { ...product, quantity: 1 }];
    writeQuoteCart(next);
    router.push("/cart");
  }

  return (
    <button
      type="button"
      onClick={addToCart}
      className={`inline-flex min-h-12 items-center justify-center bg-brand-red px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-navy focus-visible:ring-4 focus-visible:ring-brand-red/20 ${className}`}
    >
      <ShoppingBag size={18} className="mr-2" aria-hidden="true" />
      {compact ? "Teklif sepetine ekle" : "Projeye ekle ve teklif al"}
    </button>
  );
}
