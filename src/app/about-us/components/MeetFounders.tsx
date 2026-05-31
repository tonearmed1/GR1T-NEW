"use client";
import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const founders = [
  {
    id: "omar",
    name: "Omar Abukhlal",
    background: "about.founders.omar.background",
    image: "/about-us/founder-1.jpg",
  },
  {
    id: "philip",
    name: "Philip Ammerman",
    background: "about.founders.philip.background",
    image: "/about-us/founder-2.jpg",
  },
  {
    id: "jamal",
    name: "Jamal Raghei",
    background: "about.founders.jamal.background",
    image: "/about-us/founder-3.jpg",
  },
];

const MeetFounders = () => {
  const { t } = useLanguage();

  return (
    <section className="py-8 sm:py-16 bg-black text-white">
      <div className="container mx-auto px-4 md:px-0 max-w-7xl">
        <h1 className="text-3xl sm:text-5xl font-bold mb-8 sm:mb-16 font-britti">{t("about.founders.title")}</h1>

        {founders.map((founder, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row gap-6 sm:gap-12 last:mb-0 border-b border-white pb-6 sm:pb-8 mb-6 sm:mb-8"
          >
            <div className="w-full md:w-1/4">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                {founder.name.split(" ")[0]}
                <br />
                {founder.name.split(" ")[1]}
              </h2>
            </div>

            <div className="w-full md:w-1/4 relative h-[220px] sm:h-[260px] rounded-lg overflow-hidden">
              <Image
                src={founder.image}
                alt={founder.name}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-contain md:object-cover object-center rounded-lg"
              />
            </div>

            <div className="w-full md:w-1/2">
              <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">{t("about.founders.background")}</h2>
              <p className="text-base sm:text-lg">{t(founder.background)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MeetFounders;
