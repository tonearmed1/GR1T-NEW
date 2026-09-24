"use client";

import Image from "next/image";
import PillButton from "@/components/PillButton";

export default function Hero() {
  return (
    <section className="relative h-[85vh] min-h-[560px] w-full overflow-hidden text-white">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10"
        poster="/grit-g1/hero.jpg"
      >
        <source src="/Home/GR1T%20Website%20HERO%20Video.mp4" type="video/mp4" />
      </video>

      {/* Readability gradient — darkest where the headline sits */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/5" />

      <div className="relative h-full max-w-[1440px] mx-auto px-5 md:px-20 flex flex-col justify-end pb-16 md:pb-20 gap-6">
        <Image src="/LOGO_big_WHITE.svg" alt="GR1T Motorcycles" width={220} height={44} className="h-10 md:h-11 w-auto" priority />
        <p className="font-britti font-bold text-2xl md:text-3xl tracking-[0.15em] uppercase text-white/85 -mt-3">
          G1 Series
        </p>
        <p className="text-lg text-white/70 max-w-md">Urban. Refined. Everyday freedom.</p>
        <div className="flex gap-3 flex-wrap">
          <PillButton href="#models" variant="white">
            Explore
          </PillButton>
          <PillButton href="/reserve" variant="orange">
            Reserve
          </PillButton>
        </div>
      </div>
    </section>
  );
}
