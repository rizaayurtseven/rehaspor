"use client";

import type { ReactNode } from "react";
import { useInViewOnce } from "@/components/motion/useInViewOnce";
import { cn } from "@/lib/utils";

export function ImageReveal({ children, className }: { children: ReactNode; className?: string }) {
  const { ref, isInView } = useInViewOnce<HTMLDivElement>({ threshold: 0.18 });

  return (
    <div ref={ref} className={cn("image-reveal relative", className)} data-visible={isInView}>
      <div className="image-reveal-frame absolute inset-0">
        {children}
      </div>
    </div>
  );
}
