import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const featured = [
  { code: "RH-Z-001", title: "Akrilik zemin sistemi", subtitle: "Açık saha ve tenis kortları", image: "/images/site/reha-spor-court-hero.png", href: "/products/zemin-kaplamalari/standart-sistem-akrilik-zemin-kaplamasi", className: "md:col-span-7 md:row-span-2 md:min-h-[650px]" },
  { code: "RH-Z-004", title: "Poliüretan sistem", subtitle: "Çok amaçlı kapalı salonlar", image: "/images/site/polyurethane-sports-hall.png", href: "/products/zemin-kaplamalari/poliuretan-zemin-kaplamasi", className: "md:col-span-5 md:mt-16 md:min-h-[320px]" },
  { code: "RH-Z-007", title: "Granüllü sentetik çim", subtitle: "Futbol ve antrenman sahaları", image: "/images/products/rh-z-007/main.jpg", href: "/products/zemin-kaplamalari/sentetik-cim-zemin-kaplamasi-granullu-sistem", className: "md:col-span-4 md:-mt-10 md:ml-10 md:min-h-[300px]" }
];

export function FeaturedProductsSection() {
  return (
    <section className="border-y border-brand-line bg-white py-24 sm:py-32">
      <div className="container-page">
        <div className="grid gap-8 sm:grid-cols-12 sm:items-end">
          <div className="sm:col-span-9">
            <p className="technical-label text-brand-red">Profesyonel seçki</p>
            <h2 className="mt-5 max-w-4xl text-[3.2rem] font-bold leading-[0.9] tracking-[-0.058em] text-brand-navy sm:text-[5.4rem]">Sahada kanıtlanan<br /><span className="text-brand-red">sistemler</span></h2>
          </div>
          <Link href="/products" className="rule-link inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-navy sm:col-span-3 sm:col-start-10">Tüm ürünler <ArrowRight size={17} /></Link>
        </div>

        <div className="stagger-in mt-14 grid gap-5 md:grid-cols-12 md:items-start">
          {featured.map((item) => (
            <Link key={item.code} href={item.href} className={`kinetic-card group flex min-h-[330px] flex-col border border-brand-line bg-white ${item.className}`}>
              <div className="relative min-h-56 flex-1 overflow-hidden">
                <Image src={item.image} alt={`${item.title} uygulaması`} fill className="object-cover transition-[transform,filter] duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035] group-hover:rotate-[0.3deg]" sizes="(min-width: 768px) 60vw, 100vw" />
              </div>
              <div className="flex items-end justify-between gap-5 border-t border-brand-line p-6">
                <div>
                  <span className="technical-label text-brand-red">{item.code}</span>
                  <h3 className="mt-2 text-2xl font-bold leading-[1] tracking-[-0.04em] text-brand-navy">{item.title}</h3>
                  <p className="mt-2 text-[0.68rem] uppercase tracking-[0.08em] text-brand-muted">{item.subtitle}</p>
                </div>
                <ArrowRight className="shrink-0 text-brand-red transition duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-rotate-12" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
