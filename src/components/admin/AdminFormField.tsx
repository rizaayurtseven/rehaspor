import type { ReactNode } from "react";

type AdminFormFieldProps = {
  label: string;
  children: ReactNode;
  htmlFor?: string;
  hint?: string;
  required?: boolean;
};

export function AdminFormField({ label, children, htmlFor, hint, required = false }: AdminFormFieldProps) {
  return (
    <label className="grid gap-2" htmlFor={htmlFor}>
      <span className="flex items-center gap-1 text-sm font-bold text-brand-navy">
        {label}
        {required ? <span className="text-brand-red">*</span> : null}
      </span>
      {children}
      {hint ? <span className="text-xs leading-5 text-slate-500">{hint}</span> : null}
    </label>
  );
}
