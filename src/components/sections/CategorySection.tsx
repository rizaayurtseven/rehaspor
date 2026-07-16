import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const groups = [
  { no: "01", title: "Spor zeminleri", text: "Akrilik, poliüretan, EPDM ve sentetik çim sistemleri", href: "/products/zemin-kaplamalari", image: "/images/site/polyurethane-sports-hall.png", className: "lg:col-span-7 lg:row-span-2 lg:min-h-[650px]" },
  { no: "02", title: "Branş ekipmanları", text: "Basketbol, voleybol, futbol ve tenis ekipmanları", href: "/products/spor-ekipmanlari", image: "/images/site/basketball-equipment-gemini.webp", className: "lg:col-span-5 lg:mt-14 lg:min-h-[310px]" },
  { no: "03", title: "Padel kort", text: "Konstrüksiyon, cam, çim ve aydınlatma dahil anahtar teslim", href: "/products/padel-court", image: "/images/site/panoramic-padel-court.png", className: "lg:col-span-5 lg:-mt-7 lg:translate-x-7 lg:min-h-[285px]" }
];

export function CategorySection() {
  return (
    <section className="bg-brand-cream py-24 sm:py-32">
      <div className="container-page">
        <div className="grid gap-10 border-b border-brand-line pb-9 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-9">
            <p className="technical-label text-brand-red">Çözüm alanları</p>
            <h2 className="mt-5 max-w-4xl text-[3.5rem] font-bold leading-[0.88] tracking-[-0.06em] text-brand-navy sm:text-[5.7rem]">Tek saha,<br /><span className="ml-[14%] text-brand-red">bütün disiplinler.</span></h2>
          </div>
          <p className="max-w-xs text-[0.78rem] leading-[1.75] tracking-[0.02em] text-brand-muted lg:col-span-3 lg:pb-2">Doğru yüzey, doğru ekipman ve kontrollü uygulama aynı proje planında buluşur.</p>
        </div>

        <div className="stagger-in mt-12 grid gap-5 lg:grid-cols-12 lg:items-start">
          {groups.map((group) => (
            <Link key={group.no} href={group.href} className={`kinetic-card group relative min-h-[340px] overflow-hidden bg-brand-navy ${group.className}`}>
              <Image src={group.image} alt="" fill className="object-cover opacity-70 transition-[transform,opacity] duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035] group-hover:-rotate-[0.25deg] group-hover:opacity-85" sizes="(min-width: 1024px) 58vw, 100vw" />
              <div className="absolute inset-0 bg-black/25" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between border-t border-white/25 bg-brand-navy/95 p-6 text-white sm:p-8">
                <div>
                  <span className="technical-label text-red-300">{group.no}</span>
                  <h3 className="mt-3 text-3xl font-bold leading-[0.95] tracking-[-0.04em]">{group.title}</h3>
                  <p className="mt-3 max-w-md text-[0.72rem] leading-[1.65] tracking-[0.02em] text-slate-300">{group.text}</p>
                </div>
                <ArrowUpRight className="shrink-0 text-white transition duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:rotate-12" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
