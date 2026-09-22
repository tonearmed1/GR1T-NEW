"use client";

import Link from "next/link";

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
        <h1 className="font-britti font-bold text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tight max-w-3xl">
          The G1 Series. Different journeys, same DNA.
        </h1>
        <p className="text-lg text-white/85 max-w-2xl leading-relaxed">
          Designed and engineered in Italy&apos;s Motor Valley. Three motorcycles built on the same platform, each created for a different way of riding.
        </p>
        <Link href="/reserve" className="btn btn-accent w-fit">
          Reserve Now
        </Link>
      </div>
    </section>
  );
}
