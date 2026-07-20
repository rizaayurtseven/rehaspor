import type { ReactNode } from "react";

export function Table({ headers, children }: { headers: string[]; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-[8px] border border-brand-line bg-white shadow-[0_12px_38px_rgba(7,17,31,0.05)]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-brand-soft text-[11px] uppercase tracking-wider text-slate-500">
            <tr>{headers.map((header) => <th key={header} scope="col" className="px-5 py-4 font-extrabold">{header}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-brand-line">{children}</tbody>
        </table>
      </div>
    </div>
  );
}
