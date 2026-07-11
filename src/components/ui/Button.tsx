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
    "label-caps inline-flex min-h-11 items-center justify-center rounded px-5 py-3 transition duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-red/20 disabled:pointer-events-none disabled:opacity-50",
    variant === "primary" && "bg-brand-red text-white hover:bg-[#b91c1c]",
    variant === "secondary" && "bg-brand-navy text-white hover:bg-black",
    variant === "ghost" && "border-2 border-brand-navy bg-transparent text-brand-navy hover:bg-brand-navy hover:text-white",
    variant === "danger" && "bg-red-50 text-brand-red hover:bg-red-100",
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
