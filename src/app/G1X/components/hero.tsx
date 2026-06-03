"use client";

import Image from "next/image";
import Link from "next/link";

const HIGHLIGHTS = [
  { label: "Power", value: "11 kW" },
  { label: "Top Speed", value: "130 km/h" },
  { label: "Range", value: "150 km" },
  { label: "Weight", value: "127 kg" },
  { label: "Payload", value: "190 kg" },
  { label: "Batteries", value: "6 kWh Dual" },
];

export default function G1XHero() {
  return (
    <header className="relative h-screen min-h-[800px] flex items-center overflow-hidden">
      <Image
        src="/grit-g1x/hero.webp"
        alt="G1X Scrambler Hero"
        fill
        className="object-cover z-0 brightness-[0.75]"
        priority
      />

      {/* Main content */}
      <div className="relative z-10 px-5 md:px-20 w-full max-w-[1440px] mx-auto">
        <div className="max-w-3xl">
          <h1 className="font-britti font-bold text-[40px] md:text-[72px] text-white mb-6 uppercase tracking-tight leading-tight">
            FOR RIDERS WHO RARELY TAKE THE SHORTEST ROUTE.
          </h1>
          <p className="text-lg text-white/90 mb-10 max-w-xl leading-relaxed">
            An urban enduro designed for riders who see every detour as an opportunity. Equally at home in city traffic, gravel roads and weekend escapes.
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-2xl font-semibold text-white mr-4">€8,000</span>
            <Link href="/checkout" className="btn btn-secondary-light">
              Reserve Yours
            </Link>
            <button className="btn btn-secondary-light">
              Download Specifications
            </button>
          </div>
        </div>
      </div>

      {/* Highlights bar */}
      <div className="absolute bottom-0 left-0 w-full bg-black/40 backdrop-blur-md border-t border-white/10 z-20">
        <div className="max-w-[1440px] mx-auto px-5 md:px-20 py-8 grid grid-cols-2 md:grid-cols-6 gap-8 text-center md:text-left">
          {HIGHLIGHTS.map((h) => (
            <div key={h.label} className="text-white">
              <p className="text-xs text-white/60 uppercase mb-1">{h.label}</p>
              <p className="text-2xl font-semibold">{h.value}</p>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
