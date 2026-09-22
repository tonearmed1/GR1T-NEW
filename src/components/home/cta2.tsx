"use client";

import Image from "next/image";

const FEATURES = [
  {
    category: "Energy",
    title: "Dual Removable Batteries",
    desc: "6 kWh total capacity. Charge at home, work or anywhere with a standard outlet. Effortless mobility without waiting for infrastructure.",
    img: "/grit-g1/hero.jpg",
    imgAlt: "Dual Removable Batteries",
    imgLeft: true,
  },
  {
    category: "Intelligence",
    title: "Connected Cockpit",
    desc: "Seamless integration with your digital life. Native Apple CarPlay and Android Auto. Stay updated with built-in 4G connectivity and over-the-air updates.",
    img: "/grit-g1x/hero.jpg",
    imgAlt: "Connected Cockpit",
    imgLeft: false,
  },
  {
    category: "Utility",
    title: "Built for Everyday Life",
    desc: "Robust 190 kg payload capacity. Two-seat standard configuration. Passenger and luggage ready from day one.",
    img: "/grit-g1/hero.jpg",
    imgAlt: "Built for Everyday Life",
    imgLeft: true,
  },
  {
    category: "Safety",
    title: "Connected Security",
    desc: "360° awareness with front, rear and rider-facing cameras. GPS tracking, motion alerts, and active theft protection keep your GR1T safe.",
    img: "/grit-g1x/hero.jpg",
    imgAlt: "Connected Security",
    imgLeft: false,
  },
];

export default function CTATwoSection() {
  return (
    <section className="py-32 px-5 md:px-20 max-w-[1440px] mx-auto" id="features">
      <h2 className="font-britti font-bold text-4xl md:text-[72px] leading-tight tracking-tight mb-32 text-center">
        Designed for Real Life
      </h2>
      <div className="space-y-40">
        {FEATURES.map((feat) => (
          <div key={feat.title} className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div className={`relative rounded-2xl overflow-hidden bg-surface-alt aspect-[4/3] ${feat.imgLeft ? "order-2 md:order-1" : "order-1 md:order-2"}`}>
              <Image src={feat.img} alt={feat.imgAlt} fill className="object-cover" />
            </div>
            <div className={`flex flex-col gap-6 ${feat.imgLeft ? "order-1 md:order-2" : "order-2 md:order-1"}`}>
              <span className="text-grit-orange text-xs font-bold uppercase tracking-widest">{feat.category}</span>
              <h3 className="font-britti font-bold text-4xl md:text-5xl leading-tight">{feat.title}</h3>
              <p className="text-lg text-on-surface-variant leading-relaxed">{feat.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
