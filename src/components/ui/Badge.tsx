import type { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return <span className="label-caps inline-flex rounded border border-brand-red/25 bg-red-50 px-3 py-1.5 text-brand-red">{children}</span>;
}
