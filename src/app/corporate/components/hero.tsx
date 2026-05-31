"use client";
import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const CorporateHero = ({
  title: _title,
  description: _description,
  titleKey,
  descriptionKey,
}: { title?: string; description?: string; titleKey?: string; descriptionKey?: string } = {}) => {
  const { t } = useLanguage();

  const title = _title ?? t(titleKey ?? "corporate.title");
  const description = _description ?? t(descriptionKey ?? "corporate.description");

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Hero Image Background */}
      <div className="absolute inset-0 -z-10">
        <Image src="/corporate/hero.png" alt="Corporate Hero" fill className="object-cover" sizes="100vw" priority />
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black opacity-40">{title}</div>
      </div>

      <div className="absolute bottom-1/8 z-10 w-full flex justify-center">
        <div className="max-w-7xl w-full px-4 md:px-0  mx-auto">
          <div className="mb-4">
            <h2 className="text-white font-britti text-3xl sm:text-5xl font-semibold">{title}</h2>
          </div>

          <div className="flex flex-col sm:flex-row justify-between text-white mt-2 border-t border-white pt-4 sm:pt-6 w-full">
            <div>
              <p className="text-lg sm:text-2xl text-white mb-2">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CorporateHero;
