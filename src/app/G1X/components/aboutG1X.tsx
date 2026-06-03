"use client";

import Image from "next/image";

export default function AboutG1X() {
  return (
    <section className="py-40 bg-surface">
      <div className="max-w-[1440px] mx-auto px-5 md:px-20 grid md:grid-cols-2 items-center gap-20">
        <div className="order-2 md:order-1">
          <Image
            src="/grit-g1x/hero.webp"
            alt="G1X Lifestyle"
            width={900}
            height={700}
            className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-1000"
          />
        </div>
        <div className="order-1 md:order-2">
          <span className="text-grit-orange text-xs font-bold uppercase tracking-[0.2em] mb-4 block">Manifesto</span>
          <h2 className="font-britti font-bold text-4xl md:text-5xl mb-8 leading-tight">
            Built For The Roads Between Destinations.
          </h2>
          <p className="text-lg text-on-surface-variant max-w-lg mb-8 leading-relaxed">
            Modern life is a sequence of endpoints. We engineered the G1X to reclaim the spaces in between, for the spontaneous escapes where asphalt ends and curiosity begins.
          </p>
          <p className="text-lg text-on-surface-variant max-w-lg leading-relaxed">
            Reclaim your freedom. Every trail is an invitation to leave the predictable behind and take the long way home.
          </p>
        </div>
      </div>
    </section>
  );
}
