import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  href?: string;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>;

export function Button({ children, variant = "primary", href, className, ...props }: ButtonProps) {
  const styles = cn(
    "inline-flex min-h-11 items-center justify-center px-5 py-3 text-[0.82rem] font-bold tracking-[0.015em] transition-[transform,background-color,color,border-color] duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:-rotate-[0.6deg] hover:skew-x-[-1deg] active:translate-y-px active:rotate-0 active:skew-x-0 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-red/20 disabled:pointer-events-none disabled:bg-[rgb(var(--accent-disabled))] disabled:text-white/70",
    variant === "primary" && "bg-brand-red text-white hover:bg-[rgb(var(--accent-hover))] active:bg-[rgb(var(--accent-active))]",
    variant === "secondary" && "bg-brand-navy text-white hover:bg-slate-800 active:bg-black",
    variant === "ghost" && "border border-brand-navy bg-transparent text-brand-navy hover:border-brand-red hover:bg-brand-red hover:text-white active:bg-[rgb(var(--accent-active))]",
    variant === "danger" && "bg-red-50 text-brand-red hover:bg-red-100 active:bg-red-200",
    className
  );

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
}
