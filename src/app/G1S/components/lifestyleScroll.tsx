"use client";

import Image from "next/image";

const LIFESTYLES = [
  { title: "Urban Freedom", desc: "Daily commuting and city exploration.", img: "/grit-g1/hero.webp" },
  { title: "Weekend Escape", desc: "Light touring and spontaneous adventures.", img: "/grit-g1x/hero.webp" },
  { title: "Passenger Ready", desc: "Comfortable two-up riding with extended seating.", img: "/grit-g1/01_g1s.png" },
  { title: "Cargo & Utility", desc: "Practical everyday carrying capability.", img: "/grit-g1/02_g1s.png" },
  { title: "Touring Setup", desc: "Long-distance capability with integrated luggage solutions.", img: "/grit-g1x/hero.webp" },
];

export default function LifestyleScroll() {
  return (
    <section className="py-40 bg-surface overflow-hidden">
      <div className="px-5 md:px-20 max-w-[1440px] mx-auto mb-16">
        <h2 className="font-britti font-bold text-4xl md:text-5xl">One Motorcycle. Multiple Lifestyles.</h2>
        <p className="text-lg text-on-surface-variant mt-4">Configure the G1S around the way you ride.</p>
      </div>
      <div
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-5 md:px-20 pb-10"
        style={{ scrollbarWidth: "none" }}
      >
        {LIFESTYLES.map((item) => (
          <div key={item.title} className="flex-none w-[85vw] md:w-[800px] snap-center">
            <div className="aspect-video bg-surface-container mb-8 overflow-hidden group relative">
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
              />
            </div>
            <div className="max-w-2xl">
              <h4 className="text-2xl font-semibold">{item.title}</h4>
              <p className="text-lg text-on-surface-variant mt-2">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
