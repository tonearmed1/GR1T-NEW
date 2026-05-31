"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const TERM_KEYS = [
  { title: "fleetSales.items.military.title", description: "fleetSales.items.military.description" },
  { title: "fleetSales.items.rentals.title", description: "fleetSales.items.rentals.description" },
  { title: "fleetSales.items.resorts.title", description: "fleetSales.items.resorts.description" },
  { title: "fleetSales.items.natureParks.title", description: "fleetSales.items.natureParks.description" },
  { title: "fleetSales.items.postCourier.title", description: "fleetSales.items.postCourier.description" },
  { title: "fleetSales.items.foodDelivery.title", description: "fleetSales.items.foodDelivery.description" },
];

const FleetSalesList = () => {
  const { t } = useLanguage();
  return (
    <section className=" bg-gray-200 text-black">
      <div className="bg-white py-4 sm:py-8">
        <div className="mx-auto max-w-7xl px-4 md:px-0 mb-8 bg-white">
          <h2 className="text-2xl sm:text-3xl font-bold text-black">{t("fleetSales.headerTitle")}</h2>
          <p>{t("fleetSales.headerDescription")}</p>
        </div>
      </div>
      <div className="bg-gray-100 py-4 sm:py-8 ">
        <div className="mx-auto max-w-7xl px-4 md:px-8 mb-8">
          {TERM_KEYS.map((item, index) => (
            <div
              key={index}
              className=" flex flex-col md:flex-row gap-6 sm:gap-12 last:mb-0 border-b border-gray-900 pb-6 sm:pb-8 mb-6 sm:mb-8"
            >
              <div className="w-full md:w-1/3">
                <h2 className="text-2xl sm:text-3xl font-medium mb-2 sm:mb-4">{t(item.title)}</h2>
              </div>

              <div className="w-full md:w-4/6">
                <p>{t(item.description)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FleetSalesList;
