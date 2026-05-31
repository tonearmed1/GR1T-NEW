"use client";

import Image from "next/image";

export default function G1XGallery() {
  return (
    <section className="relative w-full bg-[#FAF9F7] overflow-hidden flex flex-col items-center justify-center py-10 sm:py-16 lg:py-24">
      {/* Heading / Logo text */}
      <h1 className="text-5xl sm:text-6xl lg:text-7xl font-[700] italic text-black tracking-tight -mb-6 md:-mb-10  text-center z-20">
        The G1X Scrambler
      </h1>

      {/* Bike image */}
      <div className="relative w-full max-w-5xl h-[320px] sm:h-[480px] lg:h-[600px]">
        <Image
          src="/grit-g1x/GR1T_off-road.1.png" // change this to your image path
          alt="Hightail bike"
          fill
          priority
          className="object-contain bg-[#d2d2d2]"
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 80vw, 1000px"
        />
      </div>

      {/* Optional subtitle or CTA */}
      <p className="mt-8 text-base sm:text-lg text-black/70 text-center max-w-lg">
        Aggressive, fearless, and built to go beyond.
      </p>
    </section>
  );
}
