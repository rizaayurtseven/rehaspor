import { CalendarDays, MapPin } from "lucide-react";
import { ImageFallback } from "@/components/ui/ImageFallback";
import type { ProjectReference } from "@/types/reference";

export function ReferenceCard({ reference }: { reference: ProjectReference }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-brand-line bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-card">
      <ImageFallback
        src={reference.image}
        alt={`${reference.title} proje görseli`}
        eyebrow={reference.category}
        label={reference.city}
        className="h-52"
        imageClassName="transition duration-500 group-hover:scale-105"
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
      />
      <div className="flex flex-1 flex-col p-6">
        <span className="text-xs font-black uppercase tracking-[0.12em] text-brand-red">{reference.category}</span>
        <h3 className="mt-2 text-lg font-black leading-snug text-brand-navy">{reference.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{reference.description}</p>
        <div className="mt-5 flex flex-wrap gap-4 border-t border-brand-line pt-4 text-xs font-bold text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={15} className="text-brand-red" aria-hidden="true" /> {reference.city}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays size={15} className="text-brand-red" aria-hidden="true" /> {reference.year}
          </span>
        </div>
      </div>
    </article>
  );
}
