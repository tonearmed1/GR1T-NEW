"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const WarrantyTermsEU = () => {
  const { t } = useLanguage();

  const TERMS = [
    {
      title: t("quality.warrantyEU.s1.title"),
      description: (
        <div className="space-y-2">
          <ul className="list-disc pl-5 space-y-1">
            <li>{t("quality.warrantyEU.s1.list.1")}</li>
            <li>{t("quality.warrantyEU.s1.list.2")}</li>
            <li>{t("quality.warrantyEU.s1.list.3")}</li>
          </ul>
        </div>
      ),
    },
    {
      title: t("quality.warrantyEU.s2.title"),
      description: <p>{t("quality.warrantyEU.s2.p1")}</p>,
    },
    {
      title: t("quality.warrantyEU.s3.title"),
      description: (
        <ul className="list-disc pl-5 space-y-1">
          <li>{t("quality.warrantyEU.s3.list.1")}</li>
          <li>{t("quality.warrantyEU.s3.list.2")}</li>
          <li>{t("quality.warrantyEU.s3.list.3")}</li>
        </ul>
      ),
    },
    {
      title: t("quality.warrantyEU.s4.title"),
      description: (
        <ul className="list-disc pl-5 space-y-1">
          <li>{t("quality.warrantyEU.s4.list.1")}</li>
          <li>{t("quality.warrantyEU.s4.list.2")}</li>
          <li>{t("quality.warrantyEU.s4.list.3")}</li>
          <li>{t("quality.warrantyEU.s4.list.4")}</li>
        </ul>
      ),
    },
    {
      title: t("quality.warrantyEU.s5.title"),
      description: (
        <ul className="list-disc pl-5 space-y-1">
          <li>{t("quality.warrantyEU.s5.list.1")}</li>
          <li>{t("quality.warrantyEU.s5.list.2")}</li>
          <li>{t("quality.warrantyEU.s5.list.3")}</li>
          <li>{t("quality.warrantyEU.s5.list.4")}</li>
        </ul>
      ),
    },
    {
      title: t("quality.warrantyEU.s6.title"),
      description: (
        <ul className="list-disc pl-5 space-y-1">
          <li>{t("quality.warrantyEU.s6.list.1")}</li>
          <li>{t("quality.warrantyEU.s6.list.2")}</li>
        </ul>
      ),
    },
    {
      title: t("quality.warrantyEU.s7.title"),
      description: <p>{t("quality.warrantyEU.s7.p1")}</p>,
    },
    {
      title: t("quality.warrantyEU.s8.title"),
      description: (
        <ul className="list-disc pl-5 space-y-1">
          <li>{t("quality.warrantyEU.s8.list.1")}</li>
          <li>{t("quality.warrantyEU.s8.list.2")}</li>
          <li>{t("quality.warrantyEU.s8.list.3")}</li>
          <li>{t("quality.warrantyEU.s8.list.4")}</li>
        </ul>
      ),
    },
    {
      title: t("quality.warrantyEU.s9.title"),
      description: (
        <ul className="list-disc pl-5 space-y-1">
          <li>{t("quality.warrantyEU.s9.list.1")}</li>
          <li>{t("quality.warrantyEU.s9.list.2")}</li>
          <li>{t("quality.warrantyEU.s9.list.3")}</li>
          <li>{t("quality.warrantyEU.s9.list.4")}</li>
        </ul>
      ),
    },
    {
      title: t("quality.warrantyEU.s10.title"),
      description: (
        <div className="space-y-2">
          <p>{t("quality.warrantyEU.s10.p1")}</p>
          <p>{t("quality.warrantyEU.s10.p2")}</p>
        </div>
      ),
    },
    {
      title: t("quality.warrantyEU.s11.title"),
      description: <p>{t("quality.warrantyEU.s11.p1")}</p>,
    },
    {
      title: t("quality.warrantyEU.s12.title"),
      description: <p>{t("quality.warrantyEU.s12.p1")}</p>,
    },
  ];
  return (
    <section className=" bg-gray-200 text-black">
      <div className="bg-white py-8 sm:py-10">
        <div className="mx-auto max-w-7xl px-4 md:px-0 mb-8 bg-white">
          <h2 className="text-2xl sm:text-3xl font-bold text-black">{t("quality.warrantyEU.title")}</h2>
        </div>
      </div>
      <div className="bg-white py-8 sm:py-10">
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

export default WarrantyTermsEU;
