"use client";
import React from "react";
import CorporateHero from "../components/hero";
import { useLanguage } from "@/context/LanguageContext";

const Distributors = () => {
  const { t } = useLanguage();
  return (
    <>
      <CorporateHero titleKey="corporate.distributors.title" descriptionKey="corporate.distributors.description" />

      <section className="py-10 sm:py-16 bg-white">
        <div className="container mx-auto px-4 md:px-0 max-w-7xl text-gray-800">
          <h3 className="text-2xl sm:text-3xl font-semibold text-black">{t("distributors.offer.title")}</h3>
          <ul className="mt-4 list-disc list-inside space-y-2">
            <li>{t("distributors.offer.item1")}</li>
            <li>{t("distributors.offer.item2")}</li>
            <li>{t("distributors.offer.item3")}</li>
            <li>{t("distributors.offer.item4")}</li>
            <li>{t("distributors.offer.item5")}</li>
            <li>{t("distributors.offer.item6")}</li>
          </ul>

          <h3 className="mt-10 text-2xl sm:text-3xl font-semibold text-black">{t("distributors.expect.title")}</h3>
          <ul className="mt-4 list-disc list-inside space-y-2">
            <li>{t("distributors.expect.item1")}</li>
            <li>{t("distributors.expect.item2")}</li>
            <li>{t("distributors.expect.item3")}</li>
            <li>{t("distributors.expect.item4")}</li>
          </ul>

          <p className="mt-10 text-gray-700">{t("distributors.countries.paragraph")}</p>

          <div className="mt-10 ">
            <div className="divide-y divide-gray-300">
              <div className="grid grid-cols-2 items-center justify-between py-6">
                <span className="text-2xl sm:text-4xl font-medium text-black">{t("distributors.priority1")}</span>
                <span className="text-2xl sm:text-3xl font-normal text-gray-600">{t("distributors.priority1.countries")}</span>
              </div>
              <div className="grid grid-cols-2 items-center justify-between py-6">
                <span className="text-2xl sm:text-4xl font-medium text-black">{t("distributors.priority2")}</span>
                <span className="text-2xl sm:text-3xl font-normal text-gray-600">{t("distributors.priority2.countries")}</span>
              </div>
              <div className="grid grid-cols-2 items-center justify-between py-6">
                <span className="text-2xl sm:text-4xl font-medium text-black">{t("distributors.priority3")}</span>
                <span className="text-2xl sm:text-3xl font-normal text-gray-600">{t("distributors.priority3.countries")}</span>
              </div>
              <div className="grid grid-cols-2 items-center justify-between py-6">
                <span className="text-2xl sm:text-4xl font-medium text-black">{t("distributors.priority4")}</span>
                <span className="text-2xl sm:text-3xl font-normal text-gray-600">{t("distributors.priority4.countries")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Distributors;
