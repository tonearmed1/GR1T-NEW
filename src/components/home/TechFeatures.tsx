"use client";

import React, { useState } from "react";
import Image from "next/image";

type PlatformKey = "street" | "scrambler" | "raider";

interface PlatformStory {
  label: string;
  title: string;
  desc: string;
  img: string;
}

const PLATFORM_STORIES: Record<PlatformKey, PlatformStory> = {
  street: {
    label: "G1S STREET",
    title: "Urban Refinement",
    desc: "Urban. Refined. Built for everyday riding with agility, style and practicality.",
    img: "/grit-g1/hero.jpg",
  },
  scrambler: {
    label: "G1X SCRAMBLER",
    title: "Versatile Exploration",
    desc: "Versatile. Explorative. Designed for riders who want freedom beyond the city.",
    img: "/grit-g1x/hero.jpg",
  },
  raider: {
    label: "G1XR RAIDER",
    title: "Purposeful Capability",
    desc: "Purposeful. Capable. Built for riders carrying more, travelling farther and doing more.",
    img: "/grit-g1/hero.jpg",
  },
};

const SPECS = [
  { value: "11 kW", label: "Nominal Power" },
  { value: "130 km/h", label: "Top Speed" },
  { value: "150 km", label: "Range" },
  { value: "130 kg", label: "Weight" },
  { value: "190 kg", label: "Payload" },
  { value: "6 kWh", label: "Removable Batteries" },
];

export default function TechFeatures() {
  const [active, setActive] = useState<PlatformKey>("street");
  const story = PLATFORM_STORIES[active];

  return (
    <>
      {/* Specs strip */}
      <section className="py-20 bg-white border-y border-surface-container">
        <div className="max-w-[1440px] mx-auto px-5 md:px-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12">
          {SPECS.map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center group">
              <span className="font-britti font-bold text-4xl lg:text-[40px] transition-transform group-hover:scale-110">
                {s.value}
              </span>
              <span className="text-xs text-on-surface-variant uppercase mt-3 tracking-[0.1em]">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Platform section */}
      <section className="py-32 px-5 md:px-20 max-w-[1440px] mx-auto overflow-hidden" id="overview">
        <div className="flex flex-col gap-12 items-center text-center mb-20">
          <span className="text-grit-orange text-xs font-bold uppercase tracking-[0.2em]">Engineering Core</span>
          <h2 className="font-britti font-bold text-4xl md:text-[72px] leading-tight tracking-tight">
            One Platform. Three Characters.
          </h2>
          <p className="text-lg text-on-surface-variant max-w-3xl leading-relaxed">
            A singular, high-performance modular architecture engineered for uncompromised quality across every model.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Image */}
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden bg-surface-alt aspect-[4/3]">
            <Image
              src={story.img}
              alt={story.title}
              fill
              className="object-cover transition-all duration-700"
            />
          </div>

          {/* Cards */}
          <div className="lg:col-span-5 flex flex-col gap-12">
            <div className="space-y-4">
              {(Object.keys(PLATFORM_STORIES) as PlatformKey[]).map((key) => {
                const s = PLATFORM_STORIES[key];
                const isActive = active === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActive(key)}
                    className={`text-left p-8 border rounded-xl w-full transition-all bg-white hover:border-grit-orange/30 group ${
                      isActive ? "border-b-2 border-grit-orange" : "border-surface-container"
                    }`}
                  >
                    <span className={`text-xs uppercase tracking-widest font-medium ${isActive ? "text-grit-orange" : "text-on-surface-variant group-hover:text-black"} transition-colors`}>
                      {s.label}
                    </span>
                    <h4 className={`text-2xl font-semibold mt-2 ${isActive ? "text-black" : "text-on-surface-variant"} transition-colors`}>
                      {s.title}
                    </h4>
                  </button>
                );
              })}
            </div>
            <p className="text-lg text-on-surface-variant min-h-[80px] leading-relaxed px-2 transition-all duration-300">
              {story.desc}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
