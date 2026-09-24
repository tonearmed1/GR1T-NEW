"use client";

import Link from "next/link";

type Variant = "orange" | "black" | "white" | "ghost";

const PILL_STYLES: Record<Variant, string> = {
  orange: "bg-grit-orange text-white hover:bg-black",
  black: "bg-black text-white hover:bg-grit-orange",
  white: "bg-white text-black border border-black/15 hover:bg-black hover:text-white hover:border-black",
  ghost: "bg-transparent text-white border border-white/40 hover:bg-white hover:text-black",
};

const CIRCLE_STYLES: Record<Variant, string> = {
  orange: "bg-black text-white",
  black: "bg-white text-black",
  white: "bg-black text-white",
  ghost: "bg-white/15 text-white",
};

export default function PillButton({
  href,
  variant = "orange",
  children,
  className = "",
}: {
  href: string;
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-3 rounded-full pl-6 pr-1.5 py-1.5 text-sm font-semibold transition-colors ${PILL_STYLES[variant]} ${className}`}
    >
      <span>{children}</span>
      <span className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${CIRCLE_STYLES[variant]}`}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M2.5 8H13.5M13.5 8L9.5 4M13.5 8L9.5 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}
