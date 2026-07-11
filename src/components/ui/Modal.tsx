import type { ReactNode } from "react";

export function Modal({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-dashed border-brand-line bg-white p-6">
      <h3 className="text-lg font-bold text-brand-navy">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}
