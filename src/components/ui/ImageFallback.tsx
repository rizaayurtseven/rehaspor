"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type ImageFallbackProps = {
  src?: string | null;
  alt: string;
  label: string;
  eyebrow?: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  fit?: "cover" | "contain";
};

export function ImageFallback({
  src,
  alt,
  label,
  eyebrow = "REHA SPOR",
  className,
  imageClassName,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  fit = "cover"
}: ImageFallbackProps) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const hasError = failedSource === src;

  return (
    <div className={cn("relative isolate overflow-hidden bg-brand-navy", className)}>
      {src && !hasError ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(fit === "cover" ? "object-cover" : "object-contain", "transition duration-700", imageClassName)}
          onError={() => setFailedSource(src)}
        />
      ) : (
        <div
          className="absolute inset-0 flex flex-col justify-end bg-gradient-to-br from-[#152c46] via-brand-navy to-[#03070d] p-6 text-white"
          role={alt ? "img" : undefined}
          aria-label={alt || undefined}
          aria-hidden={alt ? undefined : true}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.16]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.25) 1px, transparent 1px)",
              backgroundSize: "36px 36px"
            }}
          />
          <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full border-[26px] border-brand-red/45" />
          <div className="relative z-10">
            <div className="mb-5 flex size-11 items-center justify-center border border-white/15 bg-white/10">
              <ImageIcon aria-hidden="true" size={20} />
            </div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-brand-red">{eyebrow}</p>
            <p className="mt-2 max-w-[24rem] text-lg font-bold leading-tight">{label}</p>
          </div>
        </div>
      )}
    </div>
  );
}
