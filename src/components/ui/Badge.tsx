import type { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return <span className="inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-brand-red">{children}</span>;
}
