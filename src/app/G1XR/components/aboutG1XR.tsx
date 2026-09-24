"use client";

import React from "react";
import Image from "next/image";

const features = [
  {
    number: "01",
    label: "Utility",
    description: "Purpose-built storage, racks and mounts for real-world use.",
    image: "/grit-g1xr/feature-utility.webp",
    alt: "G1XR utility rack system",
  },
  {
    number: "02",
    label: "Presence",
    description: "An unmistakable silhouette that commands attention wherever it goes.",
    image: "/grit-g1xr/feature-presence.webp",
    alt: "G1XR commanding presence",
  },
  {
    number: "03",
    label: "Capability",
    description: "Mixed surface tyres and tuned suspension ready for any terrain.",
    image: "/grit-g1xr/feature-capability.webp",
    alt: "G1XR terrain capability",
  },
  {
    number: "04",
    label: "Durability",
    description: "Protective components and reinforced bodywork built to last.",
    image: "/grit-g1xr/feature-durability.webp",
    alt: "G1XR protective components",
  },
  {
    number: "05",
    label: "Simplicity",
    description: "Straightforward maintenance and user-serviceable parts.",
    image: "/grit-g1xr/feature-simplicity.webp",
    alt: "G1XR simplicity of design",
  },
];

const bentoFeatures = [
  {
    title: "Auxiliary Lighting",
    description: "High-output LED auxiliary lights for demanding low-light conditions. Integrated into the frame for a clean, functional look.",
    image: "/grit-g1xr/bento-lighting.webp",
    alt: "G1XR auxiliary lighting system",
    span: "col-span-1 row-span-1",
  },
  {
    title: "Utility Rack System",
    description: "Modular rear rack designed to carry cargo, luggage systems, or custom accessories.",
    image: "/grit-g1xr/bento-rack.webp",
    alt: "G1XR utility rack system",
    span: "col-span-1 row-span-2",
  },
  {
    title: "Mixed Surface Tyres",
    description: "Dual-compound tyres optimised for both road and light off-road surfaces.",
    image: "/grit-g1xr/bento-tyres.webp",
    alt: "G1XR mixed surface tyres",
    span: "col-span-1 row-span-1",
  },
  {
    title: "Protective Components",
    description: "Engine guard, frame sliders and reinforced panels that mean business.",
    image: "/grit-g1xr/bento-protection.webp",
    alt: "G1XR protective components",
    span: "col-span-1 row-span-1",
  },
  {
    title: "Extended Luggage",
    description: "Integrated side-bag mounts and top-box compatibility for long-haul utility.",
    image: "/grit-g1xr/bento-luggage.webp",
    alt: "G1XR extended luggage system",
    span: "col-span-1 row-span-1",
  },
];

const AboutG1XR = () => {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl lg:max-w-7xl px-4 md:px-0">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500 mb-4">PHILOSOPHY</p>
          <h2 className="text-3xl sm:text-5xl font-britti font-bold text-black leading-tight max-w-2xl mb-6">
            Built With Intent.
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-xl leading-relaxed">
            Some motorcycles are designed to blend in. The G1XR was designed to stand apart. Rugged details. Functional
            upgrades. A more purposeful presence.
          </p>
        </div>

        {/* 5-column feature bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-0 border border-gray-100 rounded-2xl overflow-hidden mb-16">
          {features.map((f) => (
            <div key={f.number} className="border-l border-gray-100 first:border-l-0 p-5 sm:p-6">
              <p className="text-xs text-orange-500 font-semibold mb-1">{f.number}</p>
              <p className="font-britti font-bold text-black text-lg mb-2">{f.label}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>

        {/* Bento grid features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bentoFeatures.map((f) => (
            <div key={f.title} className={`relative rounded-2xl overflow-hidden bg-gray-100 group ${f.span}`}>
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={f.image}
                  alt={f.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-britti font-bold text-white text-lg mb-1">{f.title}</h3>
                <p className="text-white/70 text-xs leading-relaxed">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutG1XR;
