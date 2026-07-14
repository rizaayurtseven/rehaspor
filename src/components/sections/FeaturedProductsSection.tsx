import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const featured = [
  {
    title: "Akrilik Zemin Kaplama",
    subtitle: "Açık saha ve tenis kortları",
    image: "/images/site/reha-spor-court-hero.png",
    href: "/products/zemin-kaplamalari/standart-sistem-akrilik-zemin-kaplamasi"
  },
  {
    title: "Poliüretan Sistemler",
    subtitle: "Çok amaçlı kapalı salonlar",
    image: "/images/site/polyurethane-sports-hall.png",
    href: "/products/zemin-kaplamalari/poliuretan-zemin-kaplamasi"
  },
  {
    title: "Panoramik Padel Kort",
    subtitle: "Anahtar teslim kort kurulumu",
    image: "/images/site/panoramic-padel-court.png",
    href: "/products/padel-court/panoramik-padel-kort"
  }
];

export function FeaturedProductsSection() {
  return (
    <section className="section-padding bg-brand-soft">
      <div className="container-page">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-brand-red">Profesyonel seçki</p>
            <h2 className="mt-3 text-3xl font-bold text-brand-navy md:text-[42px]">Öne çıkan ürünler</h2>
          </div>
          <Link href="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-red">Tüm ürünleri incele <ArrowRight size={17} /></Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {featured.map((item) => (
            <Link key={item.title} href={item.href} className="group bg-white">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={item.image} alt={item.title} fill className="object-cover transition duration-500 group-hover:scale-[1.03]" sizes="(min-width: 1024px) 33vw, 100vw" />
              </div>
              <div className="flex items-center justify-between border border-t-0 border-brand-line p-6">
                <div>
                  <h3 className="text-lg font-bold text-brand-navy">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{item.subtitle}</p>
                </div>
                <ArrowRight size={20} className="text-brand-red transition group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
