import type { ReactNode } from "react";

type AdminFormFieldProps = {
  label: string;
  children: ReactNode;
  htmlFor?: string;
  hint?: string;
  required?: boolean;
  error?: string;
};

export function AdminFormField({ label, children, htmlFor, hint, required = false, error }: AdminFormFieldProps) {
  return (
    <label className="grid gap-2" htmlFor={htmlFor}>
      <span className="flex items-center gap-1 text-sm font-bold text-brand-navy">
        {label}
        {required ? <span className="text-brand-red">*</span> : null}
      </span>
      {children}
      {error ? <span className="text-xs font-semibold text-rose-700">{error}</span> : hint ? <span className="text-xs leading-5 text-brand-muted">{hint}</span> : null}
    </label>
  );
}
