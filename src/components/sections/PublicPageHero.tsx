import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type PublicPageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbs?: BreadcrumbItem[];
  children?: ReactNode;
};

export function PublicPageHero({ eyebrow, title, description, breadcrumbs, children }: PublicPageHeroProps) {
  return (
    <section className="surface-grid relative overflow-hidden bg-brand-navy py-16 text-white sm:py-24">
      <div className="absolute right-0 top-0 h-full w-1/3 translate-x-1/3 skew-x-12 bg-brand-red/15" aria-hidden="true" />
      <div className="absolute -bottom-1/2 -left-24 h-full w-1/4 -skew-x-12 bg-brand-red/10" aria-hidden="true" />
      <div className="container-page relative">
        {breadcrumbs?.length ? (
          <nav aria-label="Sayfa yolu" className="mb-7">
            <ol className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
              <li>
                <Link href="/" className="transition hover:text-white">Ana Sayfa</Link>
              </li>
              {breadcrumbs.map((item) => (
                <li key={`${item.label}-${item.href ?? "current"}`} className="flex items-center gap-2">
                  <ChevronRight size={14} aria-hidden="true" />
                  {item.href ? (
                    <Link href={item.href} className="transition hover:text-white">{item.label}</Link>
                  ) : (
                    <span className="text-slate-200" aria-current="page">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <p className="label-caps text-red-300">{eyebrow}</p>
        <h1 className="industrial-heading mt-4 max-w-4xl text-balance text-4xl sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">{description}</p>
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
