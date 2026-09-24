"use client";
import { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "secondary-light" | "accent";
  size?: "sm" | "md" | "lg";
  href?: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  ...props
}: ButtonProps) {
  const sizeClass =
    size === "sm" ? "px-6 py-3 text-[11px]"
    : size === "lg" ? "px-14 py-6 text-[13px]"
    : "px-10 py-4 text-[12px]";

  const cls = `btn btn-${variant} ${sizeClass} ${className}`;

  if (href) {
    return <Link href={href} className={cls}>{children}</Link>;
  }

  return <button className={cls} {...props}>{children}</button>;
}
