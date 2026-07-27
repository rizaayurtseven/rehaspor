import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn("min-h-12 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-brand-ink outline-none transition hover:border-slate-300 focus:border-brand-red focus:ring-2 focus:ring-brand-red focus:ring-offset-2 disabled:bg-slate-100", className)} {...props}>
      {children}
    </select>
  );
}
