import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const solutionGroups = [
  {
    title: "Zemin Kaplamaları",
    text: "Akrilik, poliüretan, EPDM ve sentetik çim sistemleri",
    href: "/products/zemin-kaplamalari",
    image: "/images/categories/zemin-kaplamalari/main.jpg"
  },
  {
    title: "Spor Ekipmanları",
    text: "Basketbol, voleybol, futbol ve tenis ekipmanları",
    href: "/products/spor-ekipmanlari",
    image: "/images/categories/spor-ekipmanlari/main.jpg"
  },
  {
    title: "Gym Ekipmanları",
    text: "Skorboard, koruyucu panel ve tribün çözümleri",
    href: "/products/gym-ekipmanlari",
    image: "/images/categories/gym-ekipmanlari/main.jpg"
  },
  {
    title: "Padel Court",
    text: "Cam, çim, konstrüksiyon ve aydınlatma dahil",
    href: "/products/padel-court",
    image: "/images/categories/padel-court/main.jpg"
  }
];

export function CategorySection() {
  return (
    <section className="industrial-grid section-padding bg-white">
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.55fr] lg:items-end">
          <div>
            <p className="label-caps text-brand-red">Altyapı uzmanlığı</p>
            <h2 className="industrial-heading mt-4 text-4xl text-brand-navy md:text-5xl">Çözümlerimiz</h2>
          </div>
          <p className="border-l-2 border-brand-line pl-5 leading-7 text-brand-muted">
            Spor alanınız için gerekli zemin, ekipman ve uygulama hizmetlerini tek noktadan sunuyoruz.
          </p>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {solutionGroups.map((item, index) => (
            <Link
              key={item.title}
              href={item.href}
              className="group relative aspect-[4/5] min-h-80 overflow-hidden bg-brand-navy text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
            >
              <Image
                src={item.image}
                alt=""
                fill
                className="object-cover opacity-75 transition duration-700 group-hover:scale-110 group-focus-visible:scale-110"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/5" />
              <div className="absolute inset-x-0 bottom-0 z-10 p-6">
                <span className="label-caps text-white/60">{String(index + 1).padStart(2, "0")}</span>
                <div className="mt-3 flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-black uppercase leading-tight">{item.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-white/70">{item.text}</p>
                  </div>
                  <ArrowUpRight className="shrink-0 text-red-300" size={20} aria-hidden="true" />
                </div>
                <span className="mt-5 block h-1 w-10 bg-brand-red transition-[width] duration-300 group-hover:w-full group-focus-visible:w-full" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
