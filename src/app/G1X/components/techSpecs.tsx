"use client";

import Image from "next/image";

const FEATURES = [
  { title: "Mixed Surface Tyres", desc: "Confidence when the road stops being perfect." },
  { title: "Scrambler Ergonomics", desc: "Relaxed in traffic. Ready for detours." },
  { title: "Hand Guards", desc: "Protection when the route gets rough." },
  { title: "Rear Rack", desc: "Carry what matters. Leave the rest." },
];

export default function TechSpecs() {
  return (
    <section className="py-40 bg-surface-alt">
      <div className="max-w-[1440px] mx-auto px-5 md:px-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <h2 className="font-britti font-bold text-4xl md:text-5xl max-w-xl leading-tight">
            Precision Engineering For Mixed Terrain.
          </h2>
          <p className="text-xs text-on-surface-variant uppercase tracking-widest border-l-2 border-grit-orange pl-6">
            Technical Architecture v1.4
          </p>
        </div>
        <div className="grid md:grid-cols-12 gap-10 items-start">
          {/* Large image */}
          <div className="md:col-span-7 relative aspect-[16/10]">
            <Image
              src="/grit-g1x/hero.jpg"
              alt="Technical Close-up"
              fill
              className="object-cover border border-outline-variant/30"
            />
          </div>
          {/* Feature list */}
          <div className="md:col-span-5 space-y-4">
            {FEATURES.map((feat) => (
              <div
                key={feat.title}
                className="bg-white p-8 border border-outline-variant/20 hover:border-grit-orange transition-colors duration-300"
              >
                <h3 className="text-sm font-bold mb-2 uppercase tracking-wider">{feat.title}</h3>
                <p className="text-on-surface-variant text-base">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
