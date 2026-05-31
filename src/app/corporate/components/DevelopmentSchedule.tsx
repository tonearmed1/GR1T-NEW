"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

interface ScheduleItem {
  period: string;
  activity: string;
}

const DevelopmentSchedule = () => {
  const { t } = useLanguage();

  const scheduleItems: ScheduleItem[] = [
    { period: t("schedule.summer2025"), activity: t("schedule.roadTesting") },
    { period: t("schedule.fall2025"), activity: t("schedule.investorPresentations") },
    { period: t("schedule.eicma2025"), activity: t("schedule.formalLaunch") },
    { period: t("schedule.winter2025"), activity: t("schedule.furtherTesting") },
    { period: t("schedule.spring2026"), activity: t("schedule.designFinalization") },
    { period: t("schedule.summer2026"), activity: t("schedule.factoryDevelopment") },
    { period: t("schedule.fall2026"), activity: t("schedule.preOrders") },
    { period: t("schedule.january2027"), activity: t("schedule.salesLaunch") },
  ];

  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (period: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [period]: !prev[period],
    }));
  };

  return (
    <section className="py-8 sm:py-16 bg-gray-100">
      <div className="container mx-auto px-4 md:px-0 max-w-7xl">
        <h2 className="text-3xl sm:text-5xl font-normal mb-6 sm:mb-12 font-britti text-black">{t("corporate.schedule.title")}</h2>

        <div className="space-y-1">
          {scheduleItems.map((item) => (
            <div key={item.period} className="border-b border-gray-800">
              <div
                className="grid grid-cols-1 sm:grid-cols-3 items-start sm:items-center py-2 cursor-pointer"
                onClick={() => toggleItem(item.period)}
              >
                <h3 className="text-xl sm:text-3xl font-britti font-medium text-black col-span-1">{item.period}</h3>
                <span className="text-gray-600 text-start col-span-1 mt-1 sm:mt-0">{item.activity}</span>
                {/* <div className="flex items-center justify-start sm:justify-end col-span-1 mt-2 sm:mt-0">
                  <button className="text-black flex items-center">
                    <span className="mr-2 text-sm sm:text-base font-semibold">{t("common.readMore")}</span>
                    <motion.svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      animate={{ rotate: expandedItems[item.period] ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <path
                        d="M12 5L12 19M12 19L5 12M12 19L19 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  </button>
                </div> */}
              </div>
              {/* <AnimatePresence>
                {expandedItems[item.period] && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-4 sm:grid sm:grid-cols-12">
                      <div className="sm:col-start-5 sm:col-span-7">{<p className="text-gray-700">{item.period}</p>}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence> */}
            </div>
          ))}
        </div>

        <div className="mt-8 text-gray-700">
          <p className="mb-8">{t("schedule.additionalPlans")}</p>

          <div className="flex justify-end">
            <Link href={"/contact"} target="_blank" className="bg-black text-white px-6 py-3 rounded-full flex items-center">
              {t("common.getInTouch")}
              <svg className="ml-2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DevelopmentSchedule;
