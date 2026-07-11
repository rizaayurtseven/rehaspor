import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn("min-h-32 w-full resize-y rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-brand-ink outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-brand-red focus:ring-4 focus:ring-brand-red/10 disabled:bg-slate-100", className)} {...props} />;
}
