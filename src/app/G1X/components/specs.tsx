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
  details: string[] | React.ReactNode;
}

const SpecsSectionsG1X = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));
  const { t } = useLanguage();

  const specs: SpecItem[] = [
    {
      id: "01",
      title: t("g1x.specs.range.title"),
      summary: t("g1x.specs.range.summary"),
      details: [t("g1x.specs.range.combined")],
    },
    {
      id: "02",
      title: t("g1x.specs.powertrain.title"),
      summary: t("g1x.specs.powertrain.summary"),
      details: (
        <div className="space-y-2 text-gray-700 text-left max-w-3xl mx-auto">
          <ul className="list-none list-inside pl-0 space-y-1">
            <li>{t("g1x.specs.powertrain.motorDescription")}</li>
            <br />
            <li>{t("g1x.specs.powertrain.controller")}</li>
            <li>{t("g1x.specs.powertrain.voltage")}</li>
          </ul>
        </div>
      ),
    },
    {
      id: "03",
      title: t("g1x.specs.license.title"),
      summary: t("g1x.specs.license.summary"),
      details: (
        <div className="space-y-2 text-gray-700 text-left max-w-3xl mx-auto">
          <p>
            {t("g1x.specs.license.details")} <LicenseTableModal />
          </p>
        </div>
      ),
    },
    {
      id: "04",
      title: t("g1x.specs.batteries.title"),
      summary: t("g1x.specs.batteries.summary"),
      details: [t("g1x.specs.batteries.weight"), t("g1x.specs.batteries.chemistry")],
    },
    {
      id: "05",
      title: t("g1x.specs.chassis.title"),
      summary: t("g1x.specs.chassis.summary"),
      details: [
        t("g1x.specs.chassis.rearSuspension"),
        t("g1x.specs.chassis.frontWheelTravel"),
        t("g1x.specs.chassis.rearWheelTravel"),
        t("g1x.specs.chassis.frontBrakes"),
        t("g1x.specs.chassis.rearBrakes"),
        t("g1x.specs.chassis.frontTyre"),
        t("g1x.specs.chassis.rearTyre"),
        t("g1x.specs.chassis.frontWheel"),
        t("g1x.specs.chassis.rearWheel"),
      ],
    },
    {
      id: "06",
      title: t("g1x.specs.dimensions.title"),
      summary: t("g1x.specs.dimensions.summary"),
      details: [t("g1x.specs.dimensions.seatHeight"), t("g1x.specs.dimensions.rake"), t("g1x.specs.dimensions.trail")],
    },
    {
      id: "07",
      title: t("g1x.specs.weight.title"),
      summary: t("g1x.specs.weight.summary"),
      details: [t("g1x.specs.weight.maxCarryingCapacity")],
    },
    {
      id: "08",
      title: t("g1x.specs.ridingModes.title"),
      summary: t("g1x.specs.ridingModes.summary"),
      details: [
        t("g1x.specs.ridingModes.city"),
        t("g1x.specs.ridingModes.performance"),
        t("g1x.specs.ridingModes.walk"),
        t("g1x.specs.ridingModes.reverse"),
      ],
    },
    {
      id: "09",
      title: t("g1x.specs.performance.title"),
      summary: t("g1x.specs.performance.summary"),
      details: [
        t("g1x.specs.performance.topSpeedMax"),
        t("g1x.specs.performance.topSpeedSustained"),
        t("g1x.specs.performance.peakTorque"),
        t("g1x.specs.performance.peakPower"),
      ],
    },
    {
      id: "10",
      title: t("g1x.specs.startingPrice.title"),
      summary: t("g1x.specs.startingPrice.summary"),
      details: (
        <div className="space-y-2 text-gray-700 text-left max-w-3xl mx-auto">
          <p>{t("g1x.specs.startingPrice.summary")}</p>
        </div>
      ),
    },
    {
      id: "11",
      title: t("g1x.specs.warranty.title"),
      summary: t("g1x.specs.warranty.summary"),
      details: (
        <div className="space-y-2 text-gray-700 text-left max-w-3xl mx-auto">
          <p>{t("g1x.specs.warranty.intro")}</p>
          <ul className="list-none list-inside pl-0 space-y-1">
            <li>{t("g1x.specs.warranty.motorcycleYears")}</li>
            <li>{t("g1x.specs.warranty.powertrainYears")}</li>
          </ul>
          <p>{t("g1x.specs.warranty.coverage")}</p>
          <p>{t("g1x.specs.warranty.offroad")}</p>
          <p>
            {t("g1x.specs.warranty.linkText")}{" "}
            <Link href="/quality/warranty" className="text-black underline font-black hover:text-blue-800">
              {t("g1x.specs.warranty.linkLabel")}
            </Link>
            .
          </p>
        </div>
      ),
    },
  ];

  return (
    <section className="py-10 sm:py-16 bg-white">
      <div id="g1x-specs" className="container mx-auto px-4 md:px-0 max-w-7xl">
        <h2 className="text-3xl sm:text-5xl font-normal font-britti text-black">{t("g1x.specs.technicalTitle")}</h2>
        {/* <p className="mt-3 text-gray-700">The GR1T is designed with city commuting in mind.</p> */}

        <div className="mt-8 divide-y divide-black/20">
          {specs.map((item) => (
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
                        {Array.isArray(item.details) ? (
                          <ul className="list-none list-inside pl-0 space-y-1 text-gray-700">
                            {item.details.map((line, idx) => (
                              <li key={idx}>{line}</li>
                            ))}
                          </ul>
                        ) : (
                          item.details
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

export default SpecsSectionsG1X;
