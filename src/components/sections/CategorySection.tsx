import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ImageFallback } from "@/components/ui/ImageFallback";
import type { Category } from "@/types/category";

const categoryLayouts = [
  "lg:col-span-7 lg:row-span-2 lg:min-h-[38rem]",
  "lg:col-span-5 lg:min-h-[19rem]",
  "lg:col-span-5 lg:min-h-[19rem]",
  "lg:col-span-5 lg:min-h-[22rem]",
  "lg:col-span-7 lg:min-h-[22rem]"
];

export function CategorySection({ categories }: { categories: Category[] }) {
  return (
    <section className="bg-brand-cream py-20 sm:py-24 lg:py-28" aria-labelledby="solutions-title">
      <div className="container-page">
        <Reveal>
          <div className="grid gap-6 border-b border-brand-line pb-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="section-kicker text-brand-red">Ana çözüm alanları</p>
              <h2
                id="solutions-title"
                className="display-heading mt-4 max-w-4xl text-[clamp(2.7rem,6vw,5.8rem)] text-brand-navy"
              >
                Spor tesisinin bütün katmanları.
              </h2>
            </div>
            <p className="max-w-md text-base leading-7 text-brand-muted sm:text-lg sm:leading-8 lg:col-span-4 lg:justify-self-end">
              Doğru yüzey, doğru ekipman ve kontrollü uygulama aynı proje planında buluşur.
            </p>
          </div>
        </Reveal>

        <div className="mt-8 grid gap-4 lg:grid-cols-12">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/products/${category.slug}`}
              className={`group relative isolate min-h-80 overflow-hidden rounded-[6px] bg-brand-navy focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-red/30 ${categoryLayouts[index] ?? "lg:col-span-4"}`}
            >
              <div className="absolute inset-0">
                <ImageFallback
                  src={category.image}
                  alt={`${category.title} uygulama örneği`}
                  label={category.title}
                  className="h-full w-full"
                  imageClassName="object-cover transition-transform duration-[400ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                  sizes={index === 0 ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 42vw, 100vw"}
                />
              </div>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,15,27,.08)_25%,rgba(8,15,27,.92)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 z-10 p-6 text-white sm:p-8">
                <div className="flex items-end justify-between gap-5 border-t border-white/35 pt-5">
                  <div>
                    <h3 className="text-2xl font-bold leading-none tracking-[-0.035em] sm:text-3xl">{category.title}</h3>
                    <p className="mt-3 max-w-lg text-base leading-7 text-slate-100">{category.description}</p>
                  </div>
                  <ArrowUpRight
                    size={26}
                    className="shrink-0 transition-transform duration-[400ms] group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
