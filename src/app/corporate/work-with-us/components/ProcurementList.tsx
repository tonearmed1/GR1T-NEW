"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const TERMS = [
  {
    title: "Corporate Website Development",
    description: (
      <div className="space-y-2">
        <ul className="list-disc pl-5 space-y-1">
          <li>
            STATUS: <span className="text-red-600">Closed</span>
          </li>
          <li>DEADLINE: 31 July 2025</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Corporate Branding Consultancy Support",
    description: (
      <div className="space-y-2">
        <ul className="list-disc pl-5 space-y-1">
          <li>
            STATUS: <span className="text-red-600">Closed</span>
          </li>
          <li>DEADLINE: 31 July 2025</li>
        </ul>
      </div>
    ),
  },
];

const ProcurementList = () => {
  const { t } = useLanguage();
  const TERMS = [
    {
      title: t("work.procurement.website"),
      description: (
        <div className="space-y-2">
          <ul className="list-disc pl-5 space-y-1">
            <li>{t("work.status.closed")}</li>
            <li>
              {t("work.deadline")} {t("work.procurement.website.deadline")}
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: t("work.procurement.branding"),
      description: (
        <div className="space-y-2">
          <ul className="list-disc pl-5 space-y-1">
            <li>{t("work.status.closed")}</li>
            <li>
              {t("work.deadline")} {t("work.procurement.branding.deadline")}
            </li>
          </ul>
        </div>
      ),
    },
  ];
  return (
    <section className=" bg-white text-black">
      <div className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 md:px-0 bg-white border-y p-10 border-gray-300 ">
          <h2 className="text-3xl sm:text-4xl font-bold text-black">{t("work.procurement.title")}</h2>
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

              <div className="w-full md:w-4/6 text-xl sm:text-2xl font-medium text-gray-600">{item.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcurementList;
