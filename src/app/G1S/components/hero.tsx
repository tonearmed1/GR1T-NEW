"use client";

import Image from "next/image";
import Link from "next/link";

const HIGHLIGHTS = [
  { label: "Power", value: "11 kW" },
  { label: "Top Speed", value: "130 km/h" },
  { label: "Range", value: "150 km" },
  { label: "Weight", value: "127 kg" },
  { label: "Payload", value: "190 kg" },
  { label: "Battery", value: "Dual" },
];

export default function G1SHero() {
  return (
    <header className="relative w-full h-screen overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/grit-g1/hero.webp"
          alt="GR1T G1S Street Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end px-5 md:px-20 pb-16 max-w-[1440px] mx-auto">
        <div className="max-w-4xl space-y-4">
          <h1 className="font-britti font-bold text-[40px] md:text-[72px] leading-none uppercase text-white">
            G1S Street.
          </h1>
          <p className="text-2xl font-semibold text-white">Designed for the city. Built for everywhere else.</p>
          <p className="text-2xl font-semibold text-white/80">€7,000</p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/checkout" className="btn btn-secondary-light">
              Reserve Yours
            </Link>
            <button className="btn btn-secondary-light">
              Download Specifications
            </button>
          </div>
        </div>

        {/* Key highlights row */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 mt-12 border-t border-white/20 pt-8">
          {HIGHLIGHTS.map((h) => (
            <div key={h.label} className="text-white">
              <p className="text-xs uppercase text-white/60">{h.label}</p>
              <p className="text-2xl font-semibold mt-1">{h.value}</p>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
