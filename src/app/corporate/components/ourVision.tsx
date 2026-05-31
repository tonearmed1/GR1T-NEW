"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const OurVision = () => {
  const { t } = useLanguage();
  return (
    <section className="py-8 sm:py-16 bg-gray-100">
      <div className="container mx-auto px-4 md:px-0 max-w-7xl">
        <div className="flex flex-col gap-8 sm:gap-16">
          {/* Corporate Overview */}
          <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-start">
            <div className="w-full order-2 md:order-1 text-black flex flex-col justify-center">
              <h1 className="text-3xl sm:text-5xl font-normal mb-3 sm:mb-4 font-britti text-black">{t("corporate.vision")} </h1>
              <div className="overflow-y-auto pr-2 sm:pr-4">
                <div className="text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed text-justify">
                  {t("vision.description")
                    .split("\n\n")
                    .map((paragraph, index) => (
                      <p key={index} className="mb-4">
                        {paragraph}
                      </p>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurVision;
