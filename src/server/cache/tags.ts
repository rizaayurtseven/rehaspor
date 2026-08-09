export const CACHE_TAGS = {
  categories: "categories",
  products: "products",
  references: "references",
  catalogs: "catalogs",
  settings: "settings",
  category: (id: string) => `category:${id}`,
  product: (id: string) => `product:${id}`,
  reference: (id: string) => `reference:${id}`,
} as const;
