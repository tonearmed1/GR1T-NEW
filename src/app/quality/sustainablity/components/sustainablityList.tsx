"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";

// Translated content keys; backgrounds will alternate using index
const content = [
  { title: "sustainability.list.iso14001.title", description: "sustainability.list.iso14001.p1" },
  { title: "sustainability.list.batterySustainability.title", description: "sustainability.list.batterySustainability.p1" },
  { title: "sustainability.list.digitalBatteryPassport.title", description: "sustainability.list.digitalBatteryPassport.p1" },
  { title: "sustainability.list.digitalDashboard.title", description: "sustainability.list.digitalDashboard.p1" },
  { title: "sustainability.list.digitalProductPassport.title", description: "sustainability.list.digitalProductPassport.p1" },
  { title: "sustainability.list.rightToRepair.title", description: "sustainability.list.rightToRepair.p1" },
  { title: "sustainability.list.elv.title", description: "sustainability.list.elv.p1" },
  { title: "sustainability.list.chemicals.title", description: "sustainability.list.chemicals.p1" },
  { title: "sustainability.list.packaging.title", description: "sustainability.list.packaging.p1" },
  { title: "sustainability.list.csddd.title", description: "sustainability.list.csddd.p1" },
  { title: "sustainability.list.energyEfficiency.title", description: "sustainability.list.energyEfficiency.p1" },
  { title: "sustainability.list.ghg.title", description: "sustainability.list.ghg.p1" },
] as const;

const SustainablityList = () => {
  const { t } = useLanguage();
  return (
    <section className="bg-white py-6 sm:py-12 ">
      <div className=" w-full flex-col items-center justify-center">
        <div className="mx-auto max-w-7xl px-4 md:px-0  text-lg">
          <p className="text-lg my-6 text-gray-800">
            {t("sustainability.intro.p1")}
            <br />
            <br />
            {t("sustainability.intro.p2")}
          </p>
        </div>
        {content.map((item, idx) => (
          <section key={item.title} className={`${idx % 2 === 0 ? "bg-gray-100" : "bg-white"} py-12 `}>
            <div className="mx-auto max-w-7xl px-4 md:px-0 ">
              <h2 className="text-2xl sm:text-3xl font-bold text-black">{t(item.title)}</h2>

              <div className="mx-auto max-w-7xl px-4 md:px-0  text-lg">
                <p className="text-lg mt-6 text-gray-800">{t(item.description)}</p>
              </div>
            </div>
          </section>
        ))}
      </div>
      {/* </div> */}
    </section>
  );
};

export default SustainablityList;
