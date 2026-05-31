"use client";
import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const OurStory = () => {
  const { t } = useLanguage();

  return (
    <section className="py-8 sm:py-16 bg-white">
      <div className="container mx-auto px-4 md:px-0 max-w-7xl">
        <div className="flex flex-col gap-8 sm:gap-16">
          {/* First section */}
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2 order-2 md:order-1 text-black flex flex-col justify-center">
              <h1 className="text-3xl sm:text-5xl font-normal mb-4 font-britti text-black">{t("about.story.title")}</h1>
              <div className="overflow-y-auto pr-2 sm:pr-4">
                <p className="text-base sm:text-lg mb-6  font-britti whitespace-pre-line">{t("about.story.part1")}</p>
              </div>
            </div>

            <div className="w-full md:w-1/2 order-1 md:order-2 relative h-[250px] sm:h-[400px]">
              <Image
                src="/about-us/our-story-1.jpg"
                alt="GR1T Motorcycles team with bike"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Second section */}
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2 relative h-[250px] sm:h-[400px]">
              <Image
                src="/about-us/our-story-2.jpg"
                alt="GR1T Motorcycle rider"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover rounded-lg"
              />
            </div>

            <div className="w-full md:w-1/2 text-black h-auto sm:h-[400px] flex flex-col justify-center">
              <div className="overflow-y-auto h-auto sm:h-[400px] pr-2 sm:pr-4">
                <p className="text-base sm:text-lg mb-6  font-britti whitespace-pre-line">{t("about.story.part2")}</p>
                <span className="font-bold">{t("about.story.tagline")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
