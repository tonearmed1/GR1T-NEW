"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const CoreValues = () => {
  const { t } = useLanguage();

  const values = [
    {
      title: t("values.emotion"),
      desc: t("values.emotion.description"),
    },
    {
      title: t("values.innovation"),
      desc: t("values.innovation.description"),
    },
    {
      title: t("values.sustainability"),
      desc: t("values.sustainability.description"),
    },
    {
      title: t("values.integrity"),
      desc: t("values.integrity.description"),
    },
    {
      title: t("values.independence"),
      desc: t("values.independence.description"),
    },
  ];

  return (
    <section className="py-8 sm:py-16 bg-white text-black">
      <div className="container mx-auto px-4 md:px-0 max-w-7xl">
        <h1 className="text-3xl sm:text-5xl font-medium mb-6 sm:mb-8 font-britti border-b border-gray-900 pb-8">
          {t("corporate.values")}
        </h1>

        {values.map((value, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row gap-6 sm:gap-12 last:mb-0 border-b border-gray-900 pb-6 sm:pb-8 mb-6 sm:mb-8"
          >
            <div className="w-full md:w-1/3">
              <h2 className="text-2xl sm:text-3xl font-medium mb-2 sm:mb-4">{value.title}</h2>
            </div>

            <div className="w-full md:w-4/6">
              <p className="text-base sm:text-lg">{value.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoreValues;
