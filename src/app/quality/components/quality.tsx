"use client";
import Link from "next/link";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

// Section ids to drive layout; titles resolved via translations
const sections = [
  { id: "homologation" },
  { id: "qualityStandards" },
  { id: "customerService" },
  { id: "batteryReplacement" },
  { id: "logistics" },
];

const QualityComponent = () => {
  const { t } = useLanguage();
  const content = [
    { id: "homologation", title: t("quality.homologation.title") },
    { id: "qualityStandards", title: t("quality.qualityStandards.title") },
    { id: "customerService", title: t("quality.customerService.title") },
    { id: "batteryReplacement", title: t("quality.batteryReplacement.title") },
    { id: "logistics", title: t("quality.logistics.title") },
  ];
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className=" w-full flex-col items-center justify-center">
        {/* <div className=" mx-auto max-w-6xl "> */}
        {content.map((item, idx) => (
          <section key={item.id} className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-100"} py-12 `}>
            <div className="max-w-7xl px-4 md:px-0 sm:px-8 mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-black">
                {item.id === "customerService" ? (
                  <Link className="underline" href="/contact" target="_blank">
                    {item.title}
                  </Link>
                ) : (
                  item.title
                )}
              </h2>

              {item.id === "homologation" && (
                <div className=" max-w-7xl text-lg ">
                  <p className="text-lg mt-6 text-gray-800">{t("quality.homologation.p1")}</p>
                </div>
              )}
            </div>
            {item.id === "qualityStandards" && (
              <div className="max-w-7xl px-4 md:px-0 sm:px-8 mx-auto text-lg">
                <p className="text-lg mt-6 text-gray-800">{t("quality.qualityStandards.p1")}</p>
                <p className="text-lg mt-6 text-gray-800">{t("quality.qualityStandards.p2")}</p>
                <ul className="mt-4 list-none pl-0 space-y-2 text-gray-800">
                  <li>{t("quality.qualityStandards.list.1")}</li>
                  <li>{t("quality.qualityStandards.list.2")}</li>
                  <li>{t("quality.qualityStandards.list.3")}</li>
                  <li>{t("quality.qualityStandards.list.4")}</li>
                  <li>{t("quality.qualityStandards.list.5")}</li>
                  <li>{t("quality.qualityStandards.list.6")}</li>
                </ul>
              </div>
            )}
            {item.id === "customerService" && (
              <div className="max-w-7xl px-4 md:px-0 sm:px-8 mx-auto text-lg">
                <p className="text-lg mt-6 text-gray-800">{t("quality.customerService.p1")}</p>
                <ol className="mt-4 list-decimal pl-6 space-y-2 text-gray-800">
                  <li>{t("quality.customerService.list.1")}</li>
                  <li>{t("quality.customerService.list.2")}</li>
                  <li>{t("quality.customerService.list.3")}</li>
                  <li>{t("quality.customerService.list.4")}</li>
                </ol>
                <p className="mt-6 text-gray-800">{t("quality.customerService.p2")}</p>
              </div>
            )}
            {item.id === "batteryReplacement" && (
              <div className=" max-w-7xl px-4 md:px-0 sm:px-8 mx-auto text-lg">
                <p className="mt-6 text-gray-800">{t("quality.batteryReplacement.p1")}</p>
                <p className="mt-4 text-gray-800">{t("quality.batteryReplacement.p2")}</p>
                <p className="mt-4 text-gray-800">{t("quality.batteryReplacement.p3")}</p>
                <ul className="mt-4 list-disc pl-6 space-y-2 text-gray-800">
                  <li>{t("quality.batteryReplacement.list.1")}</li>
                  <li>{t("quality.batteryReplacement.list.2")}</li>
                  <li>{t("quality.batteryReplacement.list.3")}</li>
                  <li>{t("quality.batteryReplacement.list.4")}</li>
                  <li>{t("quality.batteryReplacement.list.5")}</li>
                  <li>{t("quality.batteryReplacement.list.6")}</li>
                  <li>{t("quality.batteryReplacement.list.7")}</li>
                </ul>
                <p className="mt-4 text-gray-800">{t("quality.batteryReplacement.p4")}</p>
                <p className="mt-2 text-gray-800">{t("quality.batteryReplacement.p5")}</p>
              </div>
            )}

            {item.id === "logistics" && (
              <div className="mx-auto max-w-7xl px-4 md:px-0 text-lg">
                <p className="list-none  text-gray-800">{t("quality.logistics.p1")}</p>
                <p className="list-none  text-gray-800">{t("quality.logistics.p2")}</p>
                <ul className=" mt-6 list-disc pl-6 space-y-2 text-gray-800">
                  <li>{t("quality.logistics.list.1")}</li>
                  <li>{t("quality.logistics.list.2")}</li>
                  <li>{t("quality.logistics.list.3")}</li>
                  <li>{t("quality.logistics.list.4")}</li>
                </ul>
              </div>
            )}
          </section>
        ))}
      </div>
      {/* </div> */}
    </section>
  );
};

export default QualityComponent;
