import Link from "next/link";
import { ArrowUpRight, Dumbbell, Grid2X2, PanelsTopLeft, Trophy } from "lucide-react";

const solutionGroups = [
  { title: "Spor Zeminleri", text: "Akrilik, poliüretan, EPDM ve sentetik çim sistemleri", href: "/products/zemin-kaplamalari", icon: Grid2X2 },
  { title: "Branş Ekipmanları", text: "Basketbol, voleybol, futbol, tenis ve hentbol ekipmanları", href: "/products/spor-ekipmanlari", icon: Trophy },
  { title: "Salon Ekipmanları", text: "Panozut, skorboard, tribün koltuğu ve tatami çözümleri", href: "/products/gym-ekipmanlari", icon: Dumbbell },
  { title: "Padel Kort", text: "Konstrüksiyon, cam, çim ve aydınlatma dahil anahtar teslim", href: "/products/padel-court", icon: PanelsTopLeft }
];

export function CategorySection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-brand-red">Çözümlerimiz</p>
          <h2 className="mt-3 text-3xl font-bold text-brand-navy md:text-[42px]">Ürün grupları</h2>
          <p className="mt-4 leading-7 text-slate-600">Spor alanınız için gerekli zemin, ekipman ve uygulama hizmetlerini tek noktadan sunuyoruz.</p>
        </div>

        <div className="mt-10 grid border-l border-t border-brand-line sm:grid-cols-2 lg:grid-cols-4">
          {solutionGroups.map(({ title, text, href, icon: Icon }) => (
            <Link key={title} href={href} className="group min-h-64 border-b border-r border-brand-line p-7 transition hover:bg-brand-navy hover:text-white">
              <div className="flex items-start justify-between">
                <Icon size={29} className="text-brand-red" strokeWidth={1.6} />
                <ArrowUpRight size={19} className="text-slate-400 transition group-hover:text-white" />
              </div>
              <h3 className="mt-16 text-xl font-bold text-brand-navy group-hover:text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 group-hover:text-white/70">{text}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
