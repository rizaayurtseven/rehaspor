import { siteSettings } from "@/data/siteSettings";

export function WhatsAppButton() {
  const whatsappNumber = siteSettings.whatsapp.replace(/\D/g, "");
  const message = encodeURIComponent(
    "Merhaba, Reha Spor ürün ve uygulamaları hakkında bilgi almak istiyorum."
  );

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp üzerinden Reha Spor'a yazın"
      className="group fixed bottom-5 right-4 z-40 grid size-14 place-items-center rounded-full border border-white/70 bg-[#25745a] text-white shadow-[0_8px_24px_rgba(15,23,42,0.16)] transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-[#1f684f] hover:shadow-[0_10px_28px_rgba(15,23,42,0.2)] focus-visible:outline-[#25745a] sm:bottom-6 sm:right-6"
    >
      <span className="pointer-events-none absolute right-[calc(100%+0.65rem)] hidden whitespace-nowrap rounded-md border border-brand-line bg-white px-2.5 py-1.5 text-xs font-semibold text-brand-navy opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 sm:block">
        WhatsApp&apos;tan yazın
      </span>

      <svg
        aria-hidden="true"
        viewBox="0 0 32 32"
        className="size-7 fill-current"
      >
        <path d="M16.04 4.5A11.3 11.3 0 0 0 6.3 21.53L4.5 27.5l6.12-1.68a11.43 11.43 0 0 0 5.41 1.38h.01A11.35 11.35 0 0 0 16.04 4.5Zm0 20.78a9.45 9.45 0 0 1-4.81-1.32l-.35-.2-3.63 1 1-3.53-.23-.36a9.38 9.38 0 1 1 8.02 4.41Zm5.18-7.06c-.28-.14-1.67-.82-1.93-.92-.26-.09-.45-.14-.64.14-.19.28-.73.92-.9 1.11-.16.19-.33.21-.61.07-.28-.14-1.2-.44-2.28-1.41a8.58 8.58 0 0 1-1.58-1.97c-.16-.28-.02-.43.12-.57.13-.13.28-.33.43-.5.14-.16.19-.28.28-.47.1-.19.05-.35-.02-.5-.07-.14-.64-1.54-.88-2.11-.23-.56-.47-.48-.64-.49h-.55c-.19 0-.5.07-.76.35-.26.28-1 1-1 2.43s1.03 2.82 1.17 3.01c.14.19 2.04 3.11 4.94 4.36.69.3 1.23.48 1.65.61.69.22 1.32.19 1.82.12.55-.08 1.67-.69 1.91-1.35.24-.66.24-1.23.17-1.35-.07-.12-.26-.19-.54-.33Z" />
      </svg>
    </a>
  );
}
