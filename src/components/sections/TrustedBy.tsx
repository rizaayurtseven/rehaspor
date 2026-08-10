import Image from "next/image";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { clientLogos, type ClientLogo } from "@/data/client-logos";
import { cn } from "@/lib/utils";

type TrustedByProps = {
  compact?: boolean;
  logos?: readonly ClientLogo[];
  className?: string;
};

function LogoMark({ logo }: { logo: ClientLogo }) {
  const content = (
    <div className="flex min-h-32 w-full flex-col items-center justify-center px-3 py-5 sm:min-h-36 sm:px-5">
      <div className="relative h-14 w-full sm:h-16 lg:h-20">
        {logo.logo ? (
          <Image
            src={logo.logo}
            alt={`${logo.name} referansı`}
            fill
            sizes="(min-width: 1280px) 180px, (min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
            className="object-contain grayscale opacity-70 transition-[filter,opacity,transform] duration-300 group-hover:scale-[1.03] group-hover:grayscale-0 group-hover:opacity-100 group-focus-visible:grayscale-0 group-focus-visible:opacity-100"
          />
        ) : (
          <span
            role="img"
            aria-label={`${logo.name} logo alanı`}
            className="grid h-full place-items-center border border-dashed border-brand-line bg-brand-soft font-mono text-lg font-black text-brand-muted"
          >
            {logo.abbreviation ?? logo.name.slice(0, 2).toLocaleUpperCase("tr-TR")}
          </span>
        )}
      </div>
      <span aria-hidden="true" className="mt-3 line-clamp-2 text-center text-[11px] font-bold leading-4 text-brand-muted">
        {logo.name}
      </span>
    </div>
  );

  return logo.href ? (
    <a
      href={logo.href}
      target="_blank"
      rel="noreferrer"
      className="group flex h-full min-h-11 items-center bg-white outline-none transition hover:bg-brand-soft focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-red"
    >
      {content}
    </a>
  ) : (
    <div className="group flex h-full items-center bg-white">{content}</div>
  );
}

export function TrustedBy({ compact = false, logos = clientLogos, className }: TrustedByProps) {
  return (
    <section
      aria-label="Bize güvenen kurumlar"
      className={cn(compact ? "border-y border-brand-line bg-brand-panel py-8" : "section-padding bg-brand-panel", className)}
    >
      <div className="container-page min-w-0">
        {compact ? (
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="label-caps text-brand-red">Referanslarımız</p>
              <h2 id="trusted-by-title" className="mt-2 text-xl font-black uppercase text-brand-navy sm:text-2xl">
                Bize güvenen kurumlar
              </h2>
            </div>
            <span className="hidden text-xs font-bold text-brand-muted sm:block">{logos.length} kurum</span>
          </div>
        ) : (
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <SectionTitle
              eyebrow="Referanslarımız"
              title="Bize güvenen kurumlar"
              description="Spor alanı, zemin ve ekipman projelerinde birlikte çalıştığımız seçili kurum ve eğitim kuruluşları."
            />
            <p className="label-caps text-brand-muted">{logos.length} seçili kurum</p>
          </div>
        )}

        <ul
          role="list"
          className={cn(
            "mt-8 grid min-w-0 grid-cols-2 gap-px overflow-hidden border border-brand-line bg-brand-line sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6",
            compact && "mt-5"
          )}
        >
          {logos.map((logo) => (
            <li key={logo.id} className="min-w-0 bg-white">
              <LogoMark logo={logo} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
