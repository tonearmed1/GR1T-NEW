"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const G1XRHero = () => {
  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden mt-16">
      {/* Hero Image Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/grit-g1xr/hero.webp"
          alt="GR1T G1XR Raider Hero"
          fill
          className="object-cover grayscale"
          sizes="100vw"
          priority
        />
        {/* Gradient overlay bottom-to-top */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </div>

      {/* Price tag top-right */}
      <div className="absolute top-8 right-4 sm:right-8 z-10 text-right">
        <p className="text-white/60 text-xs uppercase tracking-[0.2em]">Starting At</p>
        <p className="text-white font-britti font-bold text-2xl sm:text-3xl">€9,000</p>
      </div>

      {/* Main content bottom */}
      <div className="absolute bottom-0 z-10 w-full pb-20 sm:pb-24">
        <div className="max-w-7xl w-full px-4 md:px-0 mx-auto">
          {/* Headline */}
          <h1 className="font-britti font-bold uppercase text-white text-4xl sm:text-6xl lg:text-7xl leading-tight mb-2">
            G1XR Raider.
          </h1>
          <h2 className="font-britti font-bold uppercase text-white/80 text-2xl sm:text-4xl lg:text-5xl leading-tight mb-6">
            For those who like it rough.
          </h2>

          {/* Subheadline */}
          <p className="text-white/70 text-base sm:text-lg max-w-xl mb-8 leading-relaxed">
            Originally developed for demanding professional applications. Refined for riders who appreciate utility,
            durability and unmistakable presence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/reserve?model=G1XR" className="btn btn-secondary-light">
              Reserve Yours
            </Link>
            <a href="/G1XR/specs" className="btn btn-secondary-light">
              Download Specifications
            </a>
          </div>

          {/* Bottom key stats bar */}
          <div className="mt-10 pt-4 border-t border-white/30 grid grid-cols-3 gap-4 max-w-lg">
            <div>
              <p className="text-white/50 text-[10px] uppercase tracking-wider">Power</p>
              <p className="text-white font-britti font-semibold text-lg">11 kW</p>
            </div>
            <div>
              <p className="text-white/50 text-[10px] uppercase tracking-wider">Top Speed</p>
              <p className="text-white font-britti font-semibold text-lg">130 km/h</p>
            </div>
            <div>
              <p className="text-white/50 text-[10px] uppercase tracking-wider">Range</p>
              <p className="text-white font-britti font-semibold text-lg">150 km</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default G1XRHero;
