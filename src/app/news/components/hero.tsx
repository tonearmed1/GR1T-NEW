"use client";
import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const NewsHero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Hero Image Background */}
      <div className="absolute inset-0 -z-10">
        <Image src="/news/hero.jpg" alt="Contact Hero" fill className="object-cover" sizes="100vw" priority />
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black opacity-20"></div>
      </div>

      <div className="absolute bottom-1/8 z-10 w-full flex justify-center">
        <div className="max-w-7xl w-full px-4 md:px-0 mx-auto">
          <div className="mb-4">
            <h2 className="text-white font-britti text-5xl font-semibold">{t("news.title")}</h2>
          </div>

          <div className="flex flex-row justify-between text-white mt-2 border-t border-white pt-6 w-full">
            <div>
              <p className="text-xl text-white mb-2">{t("news.description")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsHero;
