"use client";

import Image from "next/image";
import Link from "next/link";

const COLORS = [
  { name: "Stealth Black", img: "/grit-g1/hero.jpg" },
  { name: "Technical Grey", img: "/grit-g1x/hero.jpg" },
  { name: "Forest Green", img: "/grit-g1/01_g1s.png" },
];

export default function ColorScroll() {
  return (
    <section className="py-40 bg-[#1D1D1F] text-white overflow-hidden">
      <div className="px-5 md:px-20 max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div className="max-w-2xl">
            <h2 className="font-britti font-bold text-4xl md:text-5xl">Uniquely Yours.</h2>
            <p className="text-lg opacity-70 mt-4">
              Every rider is different. Choose from curated finishes or work with us to create a motorcycle that is uniquely yours.
            </p>
          </div>
          <Link
            href="/contact"
            className="border border-white text-white text-sm font-medium px-10 py-4 uppercase tracking-widest hover:bg-grit-orange hover:border-grit-orange transition-all duration-300 flex-shrink-0"
          >
            Start Configuring
          </Link>
        </div>
      </div>
      <div className="flex gap-4 px-5 md:px-20 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {COLORS.map((color) => (
          <div key={color.name} className="flex-none w-[400px] md:w-[600px] group">
            <div className="aspect-[16/10] bg-surface-container overflow-hidden mb-4 relative">
              <Image
                src={color.img}
                alt={color.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <h4 className="text-2xl font-semibold">{color.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
