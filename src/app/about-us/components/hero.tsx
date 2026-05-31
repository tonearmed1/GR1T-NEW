"use client";
import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const AboutHero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Hero Image Background */}
      <div className="absolute inset-0 -z-10">
        <Image src="/about-us/hero.jpg" alt="Contact Hero" fill sizes="100vw" className="object-cover" priority />
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      <div className="absolute bottom-1/8 z-10 w-full flex justify-center">
        <div className="max-w-7xl w-full px-4 md:px-0 ">
          <div className="mb-4">
            <h2 className="text-white font-britti text-3xl sm:text-5xl font-semibold">{t("about.title")}</h2>
          </div>

          <div className="flex flex-col sm:flex-row justify-between text-white mt-2 border-t border-white pt-4 sm:pt-6 w-full">
            <div>
              <p className="text-base sm:text-xl text-white mb-2">{t("about.description")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
