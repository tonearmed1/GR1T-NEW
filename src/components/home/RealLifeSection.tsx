"use client";

import { useState } from "react";
import Image from "next/image";

type BenefitKey = "battery" | "payload" | "connected" | "belt" | "storage" | "lightweight";

interface Benefit {
  number: string;
  label: string;
  title: string;
  desc: string;
  spec: string;
  hotspot: { top: string; left: string };
}

const BENEFITS: Record<BenefitKey, Benefit> = {
  battery: {
    number: "01",
    label: "Charge Anywhere",
    title: "Two batteries. Any socket.",
    desc: "No need to find a charging station. Both batteries slide out in seconds and plug into any standard household socket — at your desk, in your kitchen, or anywhere you stop.",
    spec: "6 kWh total · Dual removable · Standard socket",
    hotspot: { top: "62%", left: "50%" },
  },
  payload: {
    number: "02",
    label: "Carry More",
    title: "190 kg payload. Built for real life.",
    desc: "190 kg payload capacity. Carry a passenger, luggage and daily essentials without asking the bike to compromise.",
    spec: "190 kg payload · Reinforced subframe · Two-up standard",
    hotspot: { top: "52%", left: "28%" },
  },
  connected: {
    number: "03",
    label: "Stay Connected",
    title: "Your phone, on the screen.",
    desc: "Native Apple CarPlay and Android Auto. Navigation, music and calls — integrated from the moment you start riding.",
    spec: "CarPlay · Android Auto · 4G connected · OTA updates",
    hotspot: { top: "26%", left: "72%" },
  },
  belt: {
    number: "04",
    label: "Less Maintenance",
    title: "No chain. No oil. No mess.",
    desc: "A carbon belt drive replaces the chain entirely. No oil. No adjustments. No mess. Ownership just got simpler.",
    spec: "Belt drive · No lubrication · Maintenance-free",
    hotspot: { top: "76%", left: "16%" },
  },
  storage: {
    number: "05",
    label: "Built For Everyday Use",
    title: "9 litres of storage. Always there.",
    desc: "9-litre under-seat storage and an integrated utility rack. Designed for riders who expect their motorcycle to work.",
    spec: "9L under-seat · Utility rack · Weather-proof",
    hotspot: { top: "45%", left: "54%" },
  },
  lightweight: {
    number: "06",
    label: "Easy To Live With",
    title: "127 kg. Manageable by design.",
    desc: "At 127 kg, the G1 manoeuvres with confidence. Manageable in traffic, reassuring to park, easy to push. Built for daily life.",
    spec: "127 kg kerb · A2 licence · Narrow urban profile",
    hotspot: { top: "20%", left: "46%" },
  },
};

const ORDER: BenefitKey[] = ["battery", "payload", "connected", "belt", "storage", "lightweight"];

export default function RealLifeSection() {
  const [active, setActive] = useState<BenefitKey>("battery");
  const benefit = BENEFITS[active];

  return (
    <section className="bg-white" id="features">
      <div className="max-w-[1440px] mx-auto px-5 md:px-20 pt-20 pb-10">
        <span className="text-grit-orange text-xs font-bold uppercase tracking-[0.2em] block mb-6">
          Real Life. Thought Through.
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
          <h2 className="font-britti font-bold text-3xl md:text-5xl leading-tight tracking-tight">
            Six reasons the G1 is built different.
          </h2>
          <p className="text-lg text-on-surface-variant leading-relaxed">
            Every decision on the G1 started with a rider problem. Select any hotspot to understand the engineering.
            Every card below shows the real-world benefit first.
          </p>
        </div>
      </div>

      {/* Hotspot experience */}
      <div className="hidden md:flex border-t border-surface-container max-w-[1440px] mx-auto h-[520px] border-b border-surface-container overflow-hidden">
        <div className="relative overflow-hidden border-r border-surface-container bg-surface-alt flex-[2]">
          <Image
            src="/grit-g1/hero.jpg"
            alt="GR1T G1 Series — interactive feature hotspots"
            fill
            className="object-cover brightness-90"
          />
          {ORDER.map((key) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              aria-label={`${BENEFITS[key].label} hotspot`}
              style={{ top: BENEFITS[key].hotspot.top, left: BENEFITS[key].hotspot.left }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 w-[18px] h-[18px] rounded-full border-[2.5px] border-white/90 shadow-[0_0_0_5px_rgba(245,116,35,0.22)] transition-transform hover:scale-125 ${
                active === key ? "bg-black border-grit-orange scale-125" : "bg-grit-orange"
              }`}
            />
          ))}
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex-[0_0_52%] relative bg-surface-container overflow-hidden">
            <Image src="/grit-g1/hero.jpg" alt={benefit.label} fill className="object-cover" />
          </div>
          <div className="flex-1 p-9 flex flex-col justify-center">
            <span className="text-grit-orange text-xs font-bold uppercase tracking-[0.15em] mb-2">{benefit.label}</span>
            <h3 className="font-britti font-bold text-2xl md:text-3xl leading-tight mb-3">{benefit.title}</h3>
            <p className="text-on-surface-variant leading-relaxed mb-4">{benefit.desc}</p>
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-on-surface-variant/60">{benefit.spec}</p>
          </div>
        </div>
      </div>

      {/* Benefit grid — always visible */}
      <div className="hidden md:grid grid-cols-3 max-w-[1440px] mx-auto border-b border-surface-container">
        {ORDER.map((key) => {
          const b = BENEFITS[key];
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`text-left p-8 border-r border-b border-surface-container relative transition-colors ${
                isActive ? "bg-orange-50" : "hover:bg-surface-alt"
              }`}
            >
              {isActive && <span className="absolute top-0 left-0 w-[3px] h-full bg-grit-orange" />}
              <p className="text-grit-orange text-xs font-bold uppercase tracking-[0.15em] mb-2">{b.number}</p>
              <h4 className="font-britti font-bold text-xl mb-2">{b.label}</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">{b.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Mobile: swipeable cards */}
      <div className="md:hidden border-t border-surface-container">
        <div className="relative h-[45vw] min-h-[220px] max-h-[340px] bg-surface-alt">
          <Image src="/grit-g1/hero.jpg" alt="GR1T G1 Series" fill className="object-cover brightness-90" />
        </div>
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory px-5 pt-5 pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {ORDER.map((key) => {
            const b = BENEFITS[key];
            return (
              <div key={key} className="flex-none min-w-[85vw] max-w-[320px] snap-start border border-surface-container p-6">
                <p className="text-grit-orange text-xs font-bold uppercase tracking-[0.15em] mb-2">{b.number} of 06</p>
                <h4 className="font-britti font-bold text-xl mb-2">{b.label}</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-3">{b.desc}</p>
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-on-surface-variant/60">{b.spec}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
