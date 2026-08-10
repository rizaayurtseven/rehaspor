import type { LucideIcon } from "lucide-react";

type StatTone = "navy" | "red" | "blue" | "green";

const toneStyles: Record<StatTone, string> = {
  navy: "bg-brand-navy text-white",
  red: "bg-red-50 text-brand-red",
  blue: "bg-blue-50 text-blue-700",
  green: "bg-emerald-50 text-emerald-700"
};

type AdminStatCardProps = {
  label: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  tone?: StatTone;
};

export function AdminStatCard({ label, value, description, icon: Icon, tone = "navy" }: AdminStatCardProps) {
  return (
    <article className="group rounded border border-brand-line bg-white p-5 shadow-card transition hover:border-brand-steel sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="label-caps text-brand-muted">{label}</p>
          <p className="mt-3 text-3xl font-black tracking-[-0.04em] text-brand-navy">{value}</p>
        </div>
        <span className={`grid h-11 w-11 place-items-center rounded ${toneStyles[tone]}`}>
          <Icon size={21} />
        </span>
      </div>
      <p className="mt-5 border-t border-brand-line pt-4 text-xs font-medium text-brand-muted">{description}</p>
    </article>
  );
}
