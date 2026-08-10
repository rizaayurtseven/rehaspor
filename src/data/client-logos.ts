export type ClientLogo = {
  id: string;
  name: string;
  logo?: string;
  href?: string;
  abbreviation?: string;
};

export const clientLogos: readonly ClientLogo[] = [
  { id: "ankara-buyuksehir", name: "T.C. Ankara Büyükşehir Belediyesi", logo: "/logos/ankara-buyuksehir-belediyesi.jpg", abbreviation: "ABB" },
  { id: "cankaya-belediyesi", name: "Çankaya Belediyesi", logo: "/logos/cankaya-belediyesi.jpg", abbreviation: "ÇB" },
  { id: "ankara-universitesi", name: "Ankara Üniversitesi", logo: "/logos/ankara-universitesi.jpg", abbreviation: "AÜ" },
  { id: "gazi-universitesi", name: "Gazi Üniversitesi", logo: "/logos/gazi-universitesi.jpg", abbreviation: "GÜ" },
  { id: "ankara-tenis", name: "Ankara Tenis Spor Kulübü", logo: "/logos/ankara-tenis-spor-kulubu.jpg", abbreviation: "ATSK" },
  { id: "bahcesehir-koleji", name: "Bahçeşehir Koleji", logo: "/logos/bahcesehir-koleji.jpg", abbreviation: "BK" },
  { id: "bati-koleji", name: "Batı Koleji", logo: "/logos/bati-koleji.jpg", abbreviation: "BK" },
  { id: "bilnet-okullari", name: "Bilnet Okulları", logo: "/logos/bilnet-okullari.jpg", abbreviation: "BO" },
  { id: "cankaya-universitesi", name: "Çankaya Üniversitesi", logo: "/logos/cankaya-universitesi.jpg", abbreviation: "ÇÜ" },
  { id: "cozum-akademi", name: "Çözüm Akademi Okulları", logo: "/logos/cozum-akademi-okullari.jpg", abbreviation: "ÇA" },
  { id: "doga-koleji", name: "Doğa Koleji", logo: "/logos/doga-koleji.jpg", abbreviation: "DK" },
  { id: "etimesgut-belediyesi", name: "Etimesgut Belediyesi", logo: "/logos/etimesgut-belediyesi.jpg", abbreviation: "EB" },
  { id: "final-okullari", name: "Final Okulları", logo: "/logos/final-okullari.jpg", abbreviation: "FO" },
  { id: "sinav-koleji", name: "Sınav Koleji", logo: "/logos/sinav-koleji.jpg", abbreviation: "SK" },
  { id: "hicri-ercili", name: "Hicri Ercili", logo: "/logos/hicri-ercili.jpg", abbreviation: "HE" }
];
