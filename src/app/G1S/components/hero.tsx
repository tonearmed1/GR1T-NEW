"use client";
import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const MirageHero = () => {
  const { t } = useLanguage();
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Hero Image Background */}
      <div className="absolute inset-0 -z-10">
        <Image src="/mirage/hero.jpg" alt="Contact Hero" fill className="object-cover" sizes="100vw" priority />
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      <div className="absolute bottom-1/8 z-10 w-full flex justify-center">
        <div className="max-w-7xl w-full px-4 md:px-0 mx-auto">
          <div className="mb-4">
            <h2 className="text-white font-britti text-3xl sm:text-5xl font-semibold">{t("g1s.hero.title")}</h2>
          </div>

          <div className="flex flex-col sm:flex-row justify-between text-white mt-2 border-t border-white pt-4 sm:pt-6 w-full">
            <div>
              <p className="text-2xl sm:text-3xl text-white mb-2">{t("g1s.hero.subtitle")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MirageHero;
