import type { ReactNode } from "react";

type AdminTableProps = {
  headers: string[];
  children: ReactNode;
  title?: string;
  description?: string;
  action?: ReactNode;
  minWidth?: string;
};

export function AdminTable({
  headers,
  children,
  title,
  description,
  action,
  minWidth = "760px",
}: AdminTableProps) {
  return (
    <section className="min-w-0 max-w-full overflow-hidden rounded border border-brand-line bg-white shadow-sm">
      {title || description || action ? (
        <div className="flex flex-col gap-3 border-b border-brand-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            {title ? <h2 className="font-black text-brand-navy">{title}</h2> : null}
            {description ? <p className="mt-0.5 text-xs leading-5 text-brand-muted">{description}</p> : null}
          </div>
          {action}
        </div>
      ) : null}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm" style={{ minWidth }}>
          <thead className="bg-brand-soft text-[11px] uppercase tracking-[0.08em] text-brand-muted">
            <tr>
              {headers.map((header) => (
                <th key={header} scope="col" className="px-5 py-3.5 font-black">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-line">{children}</tbody>
        </table>
      </div>
    </section>
  );
}
