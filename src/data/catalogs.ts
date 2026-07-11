import type { Catalog } from "@/types/catalog";

export const catalogs: Catalog[] = [
  {
    id: "catalog-tr",
    title: "Reha Spor Ürün Kataloğu",
    language: "TR",
    description:
      "Zemin kaplamaları, spor ekipmanları, padel kort ve saha uygulamalarını içeren Türkçe ürün kataloğu.",
    fileUrl: "/catalog/Katalog.pdf"
  },
  {
    id: "catalog-en",
    title: "Reha Spor Product Catalog",
    language: "EN",
    description:
      "Uluslararası projeler için ayrılan İngilizce ürün kataloğu alanı.",
    fileUrl: "/catalog/Reha-Spor-EN.pdf"
  }
];
