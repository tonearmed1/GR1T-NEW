"use client";
import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const CorporateInfo = () => {
  const { t } = useLanguage();

  return (
    <section className="py-8 sm:py-16 bg-white">
      <div className="container mx-auto px-4 md:px-0 max-w-7xl">
        <div className="flex flex-col gap-8 sm:gap-16">
          {/* Corporate Overview */}
          <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-start">
            <div className="w-full md:w-1/2 order-2 md:order-1 text-black flex flex-col justify-center">
              <h1 className="text-3xl sm:text-5xl font-normal mb-3 sm:mb-4 font-britti text-black">{t("corporate.info")} </h1>
              <div className="overflow-y-auto pr-2 sm:pr-4">
                <p className="text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed text-justify">
                  {t("corporate.overview.part1")}
                  <br />
                  <br />
                  {t("corporate.overview.part2")}
                </p>
              </div>
            </div>

            <div className="w-full md:w-1/2 order-1 md:order-2 relative h-[250px] sm:h-[400px] mt-4 sm:mt-0">
              <Image
                src="/corporate/corporate.JPG"
                alt="GR1T Electric Motorcycle"
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CorporateInfo;
