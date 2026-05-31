"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const UseOfFunds = () => {
  const { t } = useLanguage();
  const TERMS = [
    {
      title: t("investors.items.raise.title"),
      description: <p>{t("investors.useOfFunds.amount")}</p>,
    },
    {
      title: t("investors.useOfFunds.factoryRenovation"),
      description: <p>500&apos;000</p>,
    },
    {
      title: t("investors.useOfFunds.factoryEquipment"),
      description: <p>1&apos;300&apos;000</p>,
    },
    {
      title: t("investors.useOfFunds.moulds"),
      description: <p>1&apos;000&apos;000</p>,
    },
    {
      title: t("investors.useOfFunds.additionalRD"),
      description: <p>1&apos;250&apos;000</p>,
    },
    {
      title: t("investors.useOfFunds.market1"),
      description: <p>350&apos;000</p>,
    },
    {
      title: t("investors.useOfFunds.market2"),
      description: <p>500&apos;000</p>,
    },
    {
      title: t("investors.useOfFunds.productionCapital"),
      description: <p>1&apos;200&apos;000</p>,
    },
    {
      title: t("investors.useOfFunds.productionStaff"),
      description: <p>500&apos;000</p>,
    },
    {
      title: t("investors.useOfFunds.utilities"),
      description: <p>400&apos;000</p>,
    },
    {
      title: t("investors.useOfFunds.total"),
      description: <p>€ 7&apos;000&apos;000</p>,
    },
  ];
  return (
    <section className=" bg-white text-black">
      {/* <div className="container mx-auto px-4 max-w-6xl"> */}
      <div className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 md:px-0 bg-white border-y p-10 border-gray-300 ">
          <h2 className="text-2xl sm:text-3xl font-bold text-black">{t("investors.useOfFunds.title")}</h2>
        </div>
      </div>
      <div className="bg-white py-8 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8 mb-8">
          {TERMS.map((item, index) => (
            <div
              key={index}
              className=" flex flex-col md:flex-row gap-6 sm:gap-12 last:mb-0 border-b border-gray-900 pb-6 sm:pb-8 mb-6 sm:mb-8"
            >
              <div className="w-full md:w-1/3">
                <h2 className="text-2xl sm:text-3xl font-medium mb-2 sm:mb-4">{item.title}</h2>
              </div>

              <div className="w-full md:w-4/6 text-xl sm:text-2xl font-medium text-gray-600 ">{item.description}</div>
            </div>
          ))}
        </div>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <p>
            {t("investors.contact")}
            <br />
            <br />
            {t("investors.contact.email")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default UseOfFunds;
