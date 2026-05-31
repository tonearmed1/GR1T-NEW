"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LicenseTableModal from "@/components/reusable/LicenseTableModal";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

interface SpecItem {
  id: string;
  title: string;
  summary: string;
  details: string | string[] | React.ReactNode;
}
// specs will be localized within the component using t()
const SpecsSections = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  const { t } = useLanguage();
  const localizedSpecs: SpecItem[] = [
    {
      id: "01",
      title: t("g1s.specs.range.title"),
      summary: t("g1s.specs.range.summary"),
      details: (
        <div className="space-y-2 text-gray-700 text-left max-w-3xl mx-auto">
          <ul className="list-none list-inside pl-0 space-y-1">
            <li>{t("g1s.specs.range.combined")}</li>
          </ul>
        </div>
      ),
    },
    {
      id: "02",
      title: t("g1s.specs.powertrain.title"),
      summary: t("g1s.specs.powertrain.summary"),
      details: (
        <div className="space-y-2 text-gray-700 text-left max-w-3xl mx-auto">
          <ul className="list-none list-inside pl-0 space-y-1">
            <li>{t("g1s.specs.powertrain.motorDescription")}</li>
            <br />
            <li>{t("g1s.specs.powertrain.controller")}</li>
            <li>{t("g1s.specs.powertrain.voltage")}</li>
          </ul>
        </div>
      ),
    },
    {
      id: "03",
      title: t("g1s.specs.license.title"),
      summary: t("g1s.specs.license.summary"),
      details: (
        <div className="space-y-2 text-gray-700 text-left max-w-3xl mx-auto">
          <p>
            {t("g1s.specs.license.details")} <LicenseTableModal />
          </p>
        </div>
      ),
    },
    {
      id: "04",
      title: t("g1s.specs.batteries.title"),
      summary: t("g1s.specs.batteries.summary"),
      details: (
        <div className="space-y-2 text-gray-700 text-left max-w-3xl mx-auto">
          <ul className="list-none list-inside pl-0 space-y-1">
            <li>{t("g1s.specs.batteries.weight")}</li>
            <li>{t("g1s.specs.batteries.chemistry")}</li>
          </ul>
        </div>
      ),
    },
    {
      id: "05",
      title: t("g1s.specs.chassis.title"),
      summary: t("g1s.specs.chassis.summary"),
      details: (
        <div className="space-y-2 text-gray-700 text-left max-w-3xl mx-auto">
          <ul className="list-none list-inside pl-0 space-y-1">
            <li>{t("g1s.specs.chassis.frontSuspension")}</li>
            <li>{t("g1s.specs.chassis.rearSuspension")}</li>
            <li>{t("g1s.specs.chassis.frontWheelTravel")}</li>
            <li>{t("g1s.specs.chassis.rearWheelTravel")}</li>
            <li>{t("g1s.specs.chassis.frontBrakes")}</li>
            <li>{t("g1s.specs.chassis.rearBrakes")}</li>
            <li>{t("g1s.specs.chassis.frontTyre")}</li>
            <li>{t("g1s.specs.chassis.rearTyre")}</li>
            <li>{t("g1s.specs.chassis.frontWheel")}</li>
            <li>{t("g1s.specs.chassis.rearWheel")}</li>
          </ul>
        </div>
      ),
    },
    {
      id: "06",
      title: t("g1s.specs.dimensions.title"),
      summary: t("g1s.specs.dimensions.summary"),
      details: (
        <div className="space-y-2 text-gray-700 text-left max-w-3xl mx-auto">
          <ul className="list-none list-inside pl-0 space-y-1">
            <li>{t("g1s.specs.dimensions.seatHeight")}</li>
            <li>{t("g1s.specs.dimensions.rake")}</li>
            <li>{t("g1s.specs.dimensions.trail")}</li>
          </ul>
        </div>
      ),
    },
    {
      id: "07",
      title: t("g1s.specs.weight.title"),
      summary: t("g1s.specs.weight.summary"),
      details: (
        <div className="space-y-2 text-gray-700 text-left max-w-3xl mx-auto">
          <ul className="list-none list-inside pl-0 space-y-1">
            <li>{t("g1s.specs.weight.totalWithBattery")}</li>
            <li>{t("g1s.specs.weight.withoutBattery")}</li>
            <li>{t("g1s.specs.weight.maxCarryingCapacity")}</li>
          </ul>
        </div>
      ),
    },
    {
      id: "08",
      title: t("g1s.specs.ridingModes.title"),
      summary: t("g1s.specs.ridingModes.summary"),
      details: (
        <div className="space-y-2 text-gray-700 text-left max-w-3xl mx-auto">
          <ul className="list-none list-inside pl-0 space-y-1">
            <li>{t("g1s.specs.ridingModes.city")}</li>
            <li>{t("g1s.specs.ridingModes.performance")}</li>
            <li>{t("g1s.specs.ridingModes.walk")}</li>
            <li>{t("g1s.specs.ridingModes.reverse")}</li>
          </ul>
        </div>
      ),
    },
    {
      id: "09",
      title: t("g1s.specs.performance.title"),
      summary: t("g1s.specs.performance.summary"),
      details: (
        <div className="space-y-2 text-gray-700 text-left max-w-3xl mx-auto">
          <ul className="list-none list-inside pl-0 space-y-1">
            <li>{t("g1s.specs.performance.continuousPower")}</li>
            <li>{t("g1s.specs.performance.topSpeedMax")}</li>
            <li>{t("g1s.specs.performance.topSpeedSustained")}</li>
            <li>{t("g1s.specs.performance.peakTorque")}</li>
            <li>{t("g1s.specs.performance.peakPower")}</li>
          </ul>
        </div>
      ),
    },
    {
      id: "10",
      title: t("g1s.specs.startingPrice.title"),
      summary: t("g1s.specs.startingPrice.summary"),
      details: (
        <div className="space-y-2 text-gray-700 text-left max-w-3xl mx-auto">
          <p>{t("g1s.specs.startingPrice.summary")}</p>
        </div>
      ),
    },
    {
      id: "11",
      title: t("g1s.specs.warranty.title"),
      summary: t("g1s.specs.warranty.summary"),
      details: (
        <div className="space-y-2 text-gray-700 text-left max-w-3xl mx-auto">
          <p>{t("g1s.specs.warranty.intro")}</p>
          <ul className="list-none list-inside pl-0 space-y-1">
            <li>{t("g1s.specs.warranty.motorcycleYears")}</li>
            <li>{t("g1s.specs.warranty.batteryYears")}</li>
          </ul>
          <p>{t("g1s.specs.warranty.coverage")}</p>
          <p>{t("g1s.specs.warranty.offroad")}</p>
          <p>
            {t("g1s.specs.warranty.linkText")}{" "}
            <Link href="/quality/warranty" className="text-black underline font-black hover:text-blue-800">
              Warranty Page
            </Link>
            .
          </p>
        </div>
      ),
    },
  ];
  return (
    <section className="py-10 sm:py-16 bg-white">
      <div id="g1s-specs" className="container mx-auto px-4 md:px-0 max-w-7xl">
        <h2 className="text-3xl sm:text-5xl font-normal font-britti text-black">{t("g1s.specs.technicalTitle")}</h2>

        <div className="mt-8 divide-y divide-black/20">
          {localizedSpecs.map((item) => (
            <div key={item.id} className="">
              <button
                type="button"
                onClick={() => toggle(item.id)}
                className="w-full grid sm:grid-cols-12 items-start sm:items-center gap-2 sm:gap-3 py-4 text-left"
              >
                <span className="sm:col-span-1 text-gray-600 font-bold text-base sm:text-lg">{item.id}</span>
                <span className="sm:col-span-3 text-lg sm:text-2xl text-black font-bold">{item.title}</span>
                <span className="sm:col-span-7 font-semibold text-gray-600 text-sm sm:text-base leading-snug">
                  {item.summary}
                </span>
                <motion.span
                  className="sm:col-span-1 justify-self-end text-black"
                  animate={{ rotate: openId === item.id ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {openId === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-4 sm:grid sm:grid-cols-12">
                      <div className="sm:col-start-5 sm:col-span-7">
                        {React.isValidElement(item.details) ? (
                          item.details
                        ) : Array.isArray(item.details) ? (
                          <ul className="list-disc pl-5 text-gray-700 space-y-1">
                            {item.details.map((line, idx) => (
                              <li key={idx}>{line}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-700">{item.details}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecsSections;
