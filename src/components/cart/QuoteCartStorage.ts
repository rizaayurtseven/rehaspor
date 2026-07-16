export type QuoteCartItem = {
  id: string;
  code: string;
  title: string;
  image: string;
  categorySlug: string;
  slug: string;
  quantity: number;
};

export const quoteCartKey = "reha-spor-quote-cart";

export function readQuoteCart(): QuoteCartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const value = window.localStorage.getItem(quoteCartKey);
    return value ? (JSON.parse(value) as QuoteCartItem[]) : [];
  } catch {
    return [];
  }
}

export function writeQuoteCart(items: QuoteCartItem[]) {
  window.localStorage.setItem(quoteCartKey, JSON.stringify(items));
  window.dispatchEvent(new Event("quote-cart-change"));
}
