import { ExternalLink } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

type AdminHeaderProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  action?: ReactNode;
};

export function AdminHeader({ title, description, eyebrow = "Yönetim paneli", action }: AdminHeaderProps) {
  return (
    <header className="border-b border-brand-line bg-brand-cream">
      <div className="flex flex-col gap-5 px-4 py-6 sm:px-6 md:flex-row md:items-center md:justify-between xl:px-8">
        <div>
          <p className="label-caps text-brand-red">{eyebrow}</p>
          <h1 className="mt-2 text-2xl font-black uppercase text-brand-navy sm:text-3xl">{title}</h1>
          {description ? <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">{description}</p> : null}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {action}
          <Link
            href="/"
            target="_blank"
            className="label-caps hidden items-center gap-2 border border-brand-navy bg-brand-navy px-4 py-3 text-white transition hover:bg-black sm:inline-flex"
          >
            Siteyi görüntüle
            <ExternalLink size={16} />
          </Link>
        </div>
      </div>
    </header>
  );
}
