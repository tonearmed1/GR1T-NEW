"use client";

import Image from "next/image";

const COLORS = [
  { name: "Stealth Black", subtitle: "Matte Finish", img: "/grit-g1x/hero.jpg" },
  { name: "Technical Grey", subtitle: "Satin Finish", img: "/grit-g1x/01_g1x.png" },
  { name: "Forest Green", subtitle: "Earth Edition", img: "/grit-g1x/02_g1x.png" },
];

export default function ColorScroll() {
  return (
    <section className="py-40 bg-surface overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 md:px-20 mb-20">
        <span className="text-grit-orange text-xs font-bold uppercase tracking-[0.2em] mb-4 block">Personalisation</span>
        <h2 className="font-britti font-bold text-4xl md:text-5xl mb-4">Uniquely Yours.</h2>
        <p className="text-lg text-on-surface-variant">Choose your personality. Every G1 can be a reflection of your own style.</p>
      </div>
      <div className="flex gap-12 px-5 md:px-20 overflow-x-auto pb-10" style={{ scrollbarWidth: "none" }}>
        {COLORS.map((color) => (
          <div key={color.name} className="min-w-[400px] md:min-w-[600px] group cursor-pointer flex-shrink-0">
            <div className="aspect-[16/10] bg-surface-container-low mb-6 relative overflow-hidden flex items-center justify-center p-8">
              <Image
                src={color.img}
                alt={color.name}
                fill
                className="object-contain transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <h3 className="text-2xl font-semibold">{color.name}</h3>
            <p className="text-sm text-on-surface-variant opacity-70 mt-1">{color.subtitle}</p>
          </div>
        ))}
        {/* Bespoke card */}
        <div className="min-w-[400px] md:min-w-[600px] group cursor-pointer flex-shrink-0">
          <div className="aspect-[16/10] bg-grit-orange/5 border border-grit-orange/20 mb-6 relative overflow-hidden flex items-center justify-center p-12 text-center">
            <div>
              <h3 className="text-2xl font-semibold text-black">Bespoke Commission</h3>
              <p className="text-base text-on-surface-variant mt-2">Custom liveries and component matching available on request.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
