"use client";

import React, { useState } from "react";
import Image from "next/image";

type BikeKey = "street" | "scrambler" | "raider";
type FeatureKey = "battery" | "display" | "belt" | "storage" | "cameras" | "suspension";

interface Hotspot {
  top: string;
  left: string;
  feature: FeatureKey;
}

interface BikeData {
  img: string;
  alt: string;
  hotspots: Hotspot[];
}

interface FeatureData {
  title: string;
  desc: string;
  tags?: string[];
}

const bikes: Record<BikeKey, BikeData> = {
  street: {
    img: "/grit-g1/hero.jpg",
    alt: "G1S Street",
    hotspots: [
      { top: "60%", left: "45%", feature: "battery" },
      { top: "35%", left: "65%", feature: "display" },
      { top: "75%", left: "40%", feature: "belt" },
    ],
  },
  scrambler: {
    img: "/grit-g1x/hero.jpg",
    alt: "G1X Scrambler",
    hotspots: [
      { top: "60%", left: "45%", feature: "battery" },
      { top: "35%", left: "30%", feature: "display" },
      { top: "45%", left: "80%", feature: "storage" },
    ],
  },
  raider: {
    img: "/grit-g1/hero.jpg",
    alt: "G1XR Raider",
    hotspots: [
      { top: "60%", left: "45%", feature: "battery" },
      { top: "40%", left: "75%", feature: "suspension" },
      { top: "25%", left: "65%", feature: "cameras" },
    ],
  },
};

const features: Record<FeatureKey, FeatureData> = {
  battery: {
    title: "Dual removable batteries (6 kWh capacity)",
    desc: "Our signature dual-removable battery architecture provides unmatched flexibility for urban charging and extended range.",
    tags: ["Engineering", "Performance"],
  },
  display: {
    title: "Connected Cockpit (Apple CarPlay & Android Auto)",
    desc: "Full integration with your ecosystem. The G1 series cockpit features an ultra-bright display with native smartphone mirroring.",
    tags: ["Technology", "Connectivity"],
  },
  belt: {
    title: "Belt drive",
    desc: "Maintenance-free carbon belt drive for a silent, smooth, and clean riding experience. No oil, no chain adjustments.",
    tags: ["Engineering"],
  },
  storage: {
    title: "9L under-seat storage",
    desc: "Smart utility built-in. Safely store your charger, tools, or daily essentials in the secure weather-protected compartment.",
    tags: ["Utility"],
  },
  cameras: {
    title: "Integrated cameras",
    desc: "Front, rear, and rider-facing HD cameras provide security recording and assisted riding features natively.",
    tags: ["Safety", "Technology"],
  },
  suspension: {
    title: "Horizontal suspension",
    desc: "Racing-inspired horizontal rear shock link optimizes space and provides superior damping characteristics for all terrains.",
    tags: ["Engineering", "Performance"],
  },
};

const BIKE_TABS: { key: BikeKey; label: string }[] = [
  { key: "street", label: "G1S Street" },
  { key: "scrambler", label: "G1X Scrambler" },
  { key: "raider", label: "G1XR Raider" },
];

export default function BikesSection() {
  const [activeBike, setActiveBike] = useState<BikeKey>("street");
  const [activeFeature, setActiveFeature] = useState<FeatureKey>("battery");

  const bike = bikes[activeBike];
  const feat = features[activeFeature];

  const handleBikeSwitch = (key: BikeKey) => {
    setActiveBike(key);
    setActiveFeature(bikes[key].hotspots[0].feature);
  };

  return (
    <section className="py-32 bg-white px-5 md:px-20" id="explore">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row gap-12 items-start">
        {/* Left: bike image + tabs */}
        <div className="w-full md:w-2/3">
          {/* Tabs */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {BIKE_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleBikeSwitch(tab.key)}
                className={`px-6 py-3 border text-sm font-medium tracking-wide transition-all rounded-sm ${
                  activeBike === tab.key
                    ? "bg-black text-white border-black"
                    : "border-surface-container text-black hover:border-black"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {/* Image container */}
          <div className="relative bg-surface-alt rounded-2xl overflow-hidden aspect-[4/3] md:h-[600px] flex items-center justify-center">
            <Image
              src={bike.img}
              alt={bike.alt}
              fill
              className="object-contain p-8 transition-opacity duration-500"
            />
            {/* Hotspots */}
            {bike.hotspots.map((hs, i) => (
              <button
                key={i}
                onClick={() => setActiveFeature(hs.feature)}
                style={{ top: hs.top, left: hs.left }}
                className="absolute w-3.5 h-3.5 rounded-full bg-grit-orange cursor-pointer z-20 transition-transform hover:scale-125 shadow-[0_0_0_4px_rgba(245,116,35,0.2)] hover:shadow-[0_0_0_8px_rgba(245,116,35,0.3)]"
              />
            ))}
          </div>
        </div>

        {/* Right: feature panel */}
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          <div className="p-10 border border-surface-container bg-surface-alt rounded-2xl transition-all duration-300">
            <div className="aspect-video overflow-hidden mb-8 rounded-lg bg-surface-dim relative">
              <Image
                src={bike.img}
                alt={feat.title}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-2xl font-semibold mb-4">{feat.title}</h3>
            <p className="text-on-surface-variant leading-relaxed">{feat.desc}</p>
            {feat.tags && feat.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t border-surface-container flex flex-wrap gap-3">
                {feat.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white text-on-surface-variant text-xs font-bold uppercase tracking-wider rounded border border-surface-container"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
