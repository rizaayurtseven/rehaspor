import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("min-h-12 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-brand-ink outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-brand-red focus:ring-2 focus:ring-brand-red focus:ring-offset-2 disabled:bg-slate-100", className)} {...props} />;
}
