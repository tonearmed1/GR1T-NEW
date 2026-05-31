"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const InvestorsItems = () => {
  const { t } = useLanguage();
  const TERMS = [
    {
      title: t("investors.items.raise.title"),
      description: (
        <div className="space-y-2">
          <p>{t("investors.items.raise.value")}</p>
        </div>
      ),
    },
    {
      title: t("investors.items.representation.title"),
      description: <p>{t("investors.items.representation.value")}</p>,
    },
    {
      title: t("investors.items.return.title"),
      description: <p>{t("investors.items.return.value")}</p>,
    },
    {
      title: t("investors.items.closing.title"),
      description: <p>{t("investors.items.closing.value")}</p>,
    },
    {
      title: t("investors.items.capTable.title"),
      description: (
        <div className="space-y-2">
          <ul className="list-disc pl-5 space-y-1">
            <li>{t("investors.items.capTable.item1")}</li>
            <li>{t("investors.items.capTable.item2")}</li>
            <li>{t("investors.items.capTable.item3")}</li>
          </ul>
        </div>
      ),
    },
  ];
  return (
    <section className=" bg-white text-black">
      {/* <div className="container mx-auto px-4 max-w-6xl"> */}

      <div className="bg-white py-8 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-0 mb-8">
          {TERMS.map((item, index) => (
            <div
              key={index}
              className=" flex flex-col md:flex-row gap-6 sm:gap-12 last:mb-0 border-b border-gray-900 pb-6 sm:pb-8 mb-6 sm:mb-8"
            >
              <div className="w-full md:w-1/3">
                <h2 className="text-2xl sm:text-3xl font-medium mb-2 sm:mb-4">{item.title}</h2>
              </div>

              <div className="w-full md:w-4/6 text-xl sm:text-2xl font-medium text-gray-600">{item.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestorsItems;
