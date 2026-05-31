"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";

export default function ConditionalHeader() {
  const pathname = usePathname();
  if (pathname.startsWith("/it/checkout") || pathname.startsWith("/en/checkout") || pathname.startsWith("/cta")) return null;
  return <Header />;
}
