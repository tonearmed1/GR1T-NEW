"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const WarrantyTerms = () => {
  const { t } = useLanguage();

  const TERMS = [
    {
      title: t("quality.warranty.terms.cover.title"),
      description: (
        <div className="space-y-2">
          <p>{t("quality.warranty.terms.cover.p1")}</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>{t("quality.warranty.terms.cover.list.1")}</li>
            <li>{t("quality.warranty.terms.cover.list.2")}</li>
            <li>{t("quality.warranty.terms.cover.list.3")}</li>
            <li>{t("quality.warranty.terms.cover.list.4")}</li>
          </ul>
        </div>
      ),
    },
    {
      title: t("quality.warranty.terms.exclusions.title"),
      description: (
        <div className="space-y-2">
          <ul className="list-disc pl-5 space-y-1">
            <li>{t("quality.warranty.terms.exclusions.list.1")}</li>
            <li>{t("quality.warranty.terms.exclusions.list.2")}</li>
            <li>{t("quality.warranty.terms.exclusions.list.3")}</li>
            <li>{t("quality.warranty.terms.exclusions.list.4")}</li>
            <li>{t("quality.warranty.terms.exclusions.list.5")}</li>
          </ul>
        </div>
      ),
    },
    {
      title: t("quality.warranty.terms.offroad.title"),
      description: <p>{t("quality.warranty.terms.offroad.p1")}</p>,
    },
    {
      title: t("quality.warranty.terms.responsibilities.title"),
      description: (
        <div className="space-y-2">
          <ul className="list-disc pl-5 space-y-1">
            <li>{t("quality.warranty.terms.responsibilities.list.1")}</li>
            <li>{t("quality.warranty.terms.responsibilities.list.2")}</li>
            <li>{t("quality.warranty.terms.responsibilities.list.3")}</li>
            <li>{t("quality.warranty.terms.responsibilities.list.4")}</li>
          </ul>
        </div>
      ),
    },
    {
      title: t("quality.warranty.terms.data.title"),
      description: (
        <div className="space-y-2">
          <p>{t("quality.warranty.terms.data.p1")}</p>
          <p>{t("quality.warranty.terms.data.p2")}</p>
        </div>
      ),
    },
    {
      title: t("quality.warranty.terms.transferable.title"),
      description: <p>{t("quality.warranty.terms.transferable.p1")}</p>,
    },
    {
      title: t("quality.warranty.terms.law.title"),
      description: <p>{t("quality.warranty.terms.law.p1")}</p>,
    },
  ];

  return (
    <section className=" bg-gray-200 text-black">
      {/* <div className="container mx-auto px-4 max-w-6xl"> */}

      <div className="bg-gray-100 py-8 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-0 mb-8">
          {TERMS.map((item, index) => (
            <div
              key={index}
              className=" flex flex-col md:flex-row gap-6 sm:gap-12 last:mb-0 border-b border-gray-900 pb-6 sm:pb-8 mb-6 sm:mb-8"
            >
              <div className="w-full md:w-1/3">
                <h2 className="text-2xl sm:text-3xl font-medium mb-2 sm:mb-4">{item.title}</h2>
              </div>

              <div className="w-full md:w-4/6">{item.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WarrantyTerms;
