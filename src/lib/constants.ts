export const siteName = "Reha Spor";

export const catalogPdfUrl = "/catalog/Katalog.pdf";

export const publicNavItems = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/about", label: "Kurumsal" },
  { href: "/products", label: "Ürünler" },
  { href: "/references", label: "Referanslar" },
  { href: "/e-catalog", label: "E-Katalog" },
  { href: "/contact", label: "İletişim" }
];

export const productMenuGroups = [
  {
    title: "Spor zeminleri",
    links: [
      { label: "Zemin kaplamaları", href: "/products/zemin-kaplamalari" },
      { label: "Tel örgü ve aydınlatma", href: "/products/saha-cizgileri" }
    ]
  },
  {
    title: "Branş ekipmanları",
    links: [
      { label: "Basketbol ekipmanları", href: "/products/spor-ekipmanlari/basketbol-potasi" },
      { label: "Voleybol ekipmanları", href: "/products/spor-ekipmanlari/voleybol-diregi" },
      { label: "Futbol ekipmanları", href: "/products/spor-ekipmanlari/futbol-kale-diregi" },
      { label: "Tenis ekipmanları", href: "/products/spor-ekipmanlari/tenis-diregi" }
    ]
  },
  {
    title: "Salon ekipmanları",
    links: [
      { label: "Duvar koruyucu panozut", href: "/products/gym-ekipmanlari/koruyucu-duvar-paneli" },
      { label: "Skorboard", href: "/products/gym-ekipmanlari/skorboard" },
      { label: "Tribün koltukları", href: "/products/gym-ekipmanlari/tribun-koltugu" },
      { label: "Tüm salon ekipmanları", href: "/products/gym-ekipmanlari" }
    ]
  },
  {
    title: "Padel kort",
    links: [
      { label: "Panoramik padel kort", href: "/products/padel-court/panoramik-padel-kort" },
      { label: "Standart padel kort", href: "/products/padel-court/standart-padel-kort" },
      { label: "Kort aydınlatma", href: "/products/padel-court/padel-kort-aydinlatma-sistemi" }
    ]
  }
];

export const adminNavItems = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/categories", label: "Kategoriler" },
  { href: "/admin/products", label: "Ürünler" },
  { href: "/admin/references", label: "Referanslar" },
  { href: "/admin/catalog", label: "Katalog" },
  { href: "/admin/messages", label: "Mesajlar" },
  { href: "/admin/settings", label: "Ayarlar" }
];
