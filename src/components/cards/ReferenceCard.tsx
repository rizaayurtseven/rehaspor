import { CalendarDays, MapPin } from "lucide-react";
import { ImageFallback } from "@/components/ui/ImageFallback";
import type { ProjectReference } from "@/types/reference";

export function ReferenceCard({ reference }: { reference: ProjectReference }) {
  return (
    <article className="kinetic-card group flex h-full flex-col overflow-hidden border border-brand-line bg-white">
      <ImageFallback
        src={reference.image}
        alt={`${reference.title} proje görseli`}
        eyebrow={reference.category}
        label={reference.city}
        className="h-52"
        imageClassName="transition-[transform,filter] duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035] group-hover:rotate-[0.35deg]"
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
      />
      <div className="flex flex-1 flex-col p-6">
        <span className="technical-label text-brand-red">{reference.category}</span>
        <h3 className="mt-3 text-2xl font-bold leading-[1.02] tracking-[-0.035em] text-brand-navy">{reference.title}</h3>
        <p className="mt-4 flex-1 text-[0.76rem] leading-[1.7] tracking-[0.015em] text-slate-600">{reference.description}</p>
        <div className="mt-5 flex flex-wrap gap-4 border-t border-brand-line pt-4 text-xs font-semibold text-slate-500">
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
