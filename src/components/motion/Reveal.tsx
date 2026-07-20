"use client";

import type { CSSProperties, ReactNode } from "react";
import { useInViewOnce } from "@/components/motion/useInViewOnce";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "content" | "scale";
};

type RevealStyle = CSSProperties & { "--reveal-delay": string };

export function Reveal({ children, className, delay = 0, variant = "content" }: RevealProps) {
  const { ref, isInView } = useInViewOnce<HTMLDivElement>();
  const style: RevealStyle = { "--reveal-delay": `${delay}ms` };

  return (
    <div
      ref={ref}
      className={cn("reveal-motion", variant === "scale" && "reveal-motion--scale", className)}
      data-visible={isInView}
      style={style}
    >
      {children}
    </div>
  );
}
