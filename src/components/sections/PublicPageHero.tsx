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
    <section className="border-b border-white/10 bg-[#101214] py-14 text-white sm:py-20">
      <div className="container-page">
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

        <div className="border-l-4 border-brand-red pl-6 sm:pl-8">
          <p className="text-sm font-semibold text-red-300">{eyebrow}</p>
          <h1 className="mt-3 max-w-4xl text-balance text-4xl font-bold leading-tight sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">{description}</p>
        </div>
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
