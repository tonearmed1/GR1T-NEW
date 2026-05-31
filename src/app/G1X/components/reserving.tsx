"use client";
import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const Reserving = () => {
  const { t } = useLanguage();
  return (
    <section className="bg-black text-white py-12 sm:py-16">
      <div className="mx-auto px-4 md:px-0 max-w-7xl">
        {/* Header row */}
        <div className=" md:gap-10 items-start">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">{t("g1x.reserving.title")}</h2>
          <p className="text-xl sm:text-2xl md:text-lg text-white/80 ">{t("g1x.reserving.subtitle")}</p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {/* Card 1 */}
          <div className="rounded-xl bg-white/95 text-black p-8 sm:p-9 flex flex-col items-center justify-between shadow-sm">
            <div className="flex flex-col items-center">
              <Image src="/ICONS/01_reserve.svg" alt="Reserve icon" width={64} height={64} priority />
              <div className="mt-6 text-center">
                <p className="text-lg sm:text-xl font-medium">{t("g1x.reserving.card1")}</p>
              </div>
            </div>
            <div className="mt-8">
              {/* <a href="#" className="text-sm text-gray-700 hover:underline">
                Learn More
              </a> */}
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl bg-white/95 text-black p-8 sm:p-9 flex flex-col items-center justify-between shadow-sm">
            <div className="flex flex-col items-center">
              <Image src="/ICONS/02_customize.svg" alt="Customize icon" width={64} height={64} priority />
              <div className="mt-6 text-center">
                <p className="text-lg sm:text-xl font-medium">{t("g1x.reserving.card2")}</p>
              </div>
            </div>
            <div className="mt-8">
              {/* <a href="#" className="text-sm text-gray-700 hover:underline">
                Learn More
              </a> */}
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl bg-white/95 text-black p-8 sm:p-9 flex flex-col items-center justify-between shadow-sm">
            <div className="flex flex-col items-center">
              <Image src="/ICONS/03_order.svg" alt="Order icon" width={64} height={64} priority />
              <div className="mt-6 text-center">
                <p className="text-lg sm:text-xl font-medium">{t("g1x.reserving.card3")}</p>
              </div>
            </div>
            <div className="mt-8">
              {/* <a href="#" className="text-sm text-gray-700 hover:underline">
                Learn More
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reserving;
