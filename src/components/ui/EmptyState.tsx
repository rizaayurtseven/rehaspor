import { PackageSearch } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
  icon?: ReactNode;
  className?: string;
};

export function EmptyState({ title, description, action, icon, className }: EmptyStateProps) {
  return (
    <div className={cn("rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center", className)}>
      <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-red-50 text-brand-red">
        {icon ?? <PackageSearch aria-hidden="true" size={22} />}
      </div>
      <h2 className="mt-5 text-xl font-extrabold tracking-tight text-brand-navy">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
