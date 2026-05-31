"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import LicenseTableModal from "@/components/reusable/LicenseTableModal";
import SpecsModal from "@/components/reusable/SpecsModal";

const getFAQS = (openSpecs: () => void, t: (key: string) => string) => [
  {
    question: t("home.faq.q.keySpecs"),
    answer: (
      <div className="space-y-2">
        <ul className="list-disc pl-5 space-y-1">
          <li>{t("home.faq.a.keySpecs.list.topSpeed")}</li>
          <li>{t("home.faq.a.keySpecs.list.range")}</li>
          <li>{t("home.faq.a.keySpecs.list.battery")}</li>
          <li>{t("home.faq.a.keySpecs.list.charging")}</li>
          <li>{t("home.faq.a.keySpecs.list.power")}</li>
          <li>{t("home.faq.a.keySpecs.list.weight")}</li>
          <li>{t("home.faq.a.keySpecs.list.payload")}</li>
          <li>{t("home.faq.a.keySpecs.list.license")}</li>
        </ul>
        <div className="flex gap-4">
          <Link
            type="button"
            href="/G1S#g1s-specs"
            aria-label="g1s-specs"
            className="text-blue-600 underline hover:text-blue-800"
          >
            {t("home.faq.visitG1S")}
          </Link>
          <Link
            type="button"
            href="/G1X#g1x-specs"
            aria-label="g1x-specs"
            className="text-blue-600 underline hover:text-blue-800"
          >
            {t("home.faq.visitG1X")}
          </Link>
        </div>
      </div>
    ),
  },
  {
    question: t("home.faq.q.range"),
    answer: t("home.faq.a.range.p1"),
  },
  {
    question: t("home.faq.q.cost"),
    answer: (
      <div className="space-y-4">
        <ul className="list-disc pl-5 space-y-2">
          {/* <li>{t("home.faq.cost.g1s")}</li> */}
          <li className="ml-5">{t("home.faq.cost.g1s.list")}</li>
        </ul>
        <ul className="list-disc pl-5 space-y-2">
          {/* <li>{t("home.faq.cost.g1x")}</li> */}
          <li className="ml-5">{t("home.faq.cost.g1x.list")}</li>
        </ul>
        {/* <p>
          <Link href="/founders-circle" className="text-blue-600 underline hover:text-blue-800">
            {t("home.faq.a.cost.linkText")}
          </Link>
        </p> */}
      </div>
    ),
  },
  {
    question: t("home.faq.q.license"),
    answer: (
      <div className="space-y-2">
        <p>{t("home.faq.a.license.p1")}</p>
        <LicenseTableModal />
      </div>
    ),
  },
  {
    question: t("home.faq.q.removableBatteries"),
    answer: (
      <div className="space-y-2">
        <p>{t("home.faq.a.removableBatteries.p1")}</p>
        <ul className="list-disc pl-5 space-y-1">
          {/* <li>2 × 2.1 kWh packs for a total of 4.2 kWh</li> */}
          <li>{t("home.faq.a.removableBatteries.list.6kwh")}</li>
        </ul>
      </div>
    ),
  },
  {
    question: t("home.faq.q.chargeTime"),
    answer: (
      <div className="space-y-2">
        <p>{t("home.faq.a.chargeTime.p1")}</p>
        <ul className="list-disc pl-5 space-y-1">
          {/* <li>4.2 kWh pack (2×2.1 kWh): ~2.5 hours at 220V</li> */}
          <li>{t("home.faq.a.chargeTime.p1")}</li>
          <li>{t("home.faq.a.chargeTime.fastTopUp")}</li>
        </ul>
      </div>
    ),
  },
  {
    question: t("home.faq.q.carCharging"),
    answer: t("home.faq.a.carCharging.p1"),
  },
  {
    question: t("home.faq.q.motorway"),
    answer: t("home.faq.a.motorway.p1"),
  },
  {
    question: t("home.faq.q.twoRiders"),
    answer: t("home.faq.a.twoRiders.p1"),
  },
  {
    question: t("home.faq.q.difference"),
    answer: (
      <div className="space-y-2">
        <ul className="list-disc pl-5 space-y-1">
          <li>{t("home.faq.a.difference.list.1")}</li>
          <li>{t("home.faq.a.difference.list.2")}</li>
          <li>{t("home.faq.a.difference.list.3")}</li>
          <li>{t("home.faq.a.difference.list.4")}</li>
          <li>{t("home.faq.a.difference.list.5")}</li>
          <li>{t("home.faq.a.difference.list.6")}</li>
          <li>{t("home.faq.a.difference.list.7")}</li>
        </ul>
      </div>
    ),
  },
  {
    question: t("home.faq.q.theftResistant"),
    answer: t("home.faq.a.theftResistant.p1"),
  },
  {
    question: t("home.faq.q.tyresWheels"),
    answer: (
      <div className="space-y-2">
        <p>{t("home.faq.a.tyresWheels.intro")}</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>{t("home.faq.a.tyres.frontLabel")}: Pirelli Angel City 110/70-17”</li>
          <li>{t("home.faq.a.tyres.rearLabel")}: Pirelli Angel City 150/60-17”</li>
        </ul>
        <p>{t("home.faq.a.tyresWheels.g1x")}</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>{t("home.faq.a.tyres.frontLabel")}: Metzeler Karoo Street 110/70-17”</li>
          <li>{t("home.faq.a.tyres.rearLabel")}: Metzeler Karoo Street 140/70-17”</li>
        </ul>
      </div>
    ),
  },
  {
    question: t("home.faq.q.seeOrTest"),
    answer: (
      <div className="space-y-2">
        {/* <p>{t("home.faq.a.seeOrTest.p1")}</p> */}
        <p>{t("home.faq.a.seeOrTest.p2")}</p>
      </div>
    ),
  },
  {
    question: t("home.faq.q.appLaunch"),
    answer: t("home.faq.a.appLaunch.p1"),
  },
  {
    question: t("home.faq.q.warranty"),
    answer: (
      <div className="space-y-2">
        <ul className="list-disc pl-5 space-y-1">
          <li>{t("home.faq.a.warranty.list.1")}</li>
          <li>{t("home.faq.a.warranty.list.2")}</li>
          <li>{t("home.faq.a.warranty.list.3")}</li>
        </ul>
        <p>
          See full terms on our{" "}
          <Link href="/warranty" className="text-blue-400 underline hover:text-blue-300">
            Warranty Page
          </Link>
          .
        </p>
      </div>
    ),
  },
  {
    question: t("home.faq.q.euHomologation"),
    answer: t("home.faq.a.euHomologation.p1"),
  },
  {
    question: t("home.faq.q.versions"),
    answer: t("home.faq.a.versions.p1"),
  },
  {
    question: t("home.faq.q.colorsConfigs"),
    answer: t("home.faq.a.colorsConfigs.p1"),
  },
  {
    question: t("home.faq.q.order"),
    answer: (
      <Link type="button" href="/G1X#g1x-specs" aria-label="g1x-specs" className="text-blue-600 underline hover:text-blue-800">
        {t("home.faq.a.order.p1")}
      </Link>
    ),
  },
  {
    question: t("home.faq.q.reservationProcess"),
    answer: t("home.faq.a.reservationProcess.p1"),
  },
  {
    question: t("home.faq.q.deliveriesStart"),
    answer: t("home.faq.a.deliveriesStart.p1"),
  },
  {
    question: t("home.faq.q.outsideEU"),
    answer: t("home.faq.a.outsideEU.p1"),
  },
  {
    question: t("home.faq.q.financing"),
    answer: t("home.faq.a.financing.p1"),
  },
];

const FAQSection = () => {
  const { t } = useLanguage();
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [showSpecsModal, setShowSpecsModal] = useState(false);

  const toggleItem = (key: string) => {
    setOpenKey((prev) => (prev === key ? null : key));
  };

  return (
    <>
      {showSpecsModal && <SpecsModal onClose={() => setShowSpecsModal(false)} />}
      <section id="faqs" className="py-8 sm:py-16 bg-[#1a1a1a]">
        <div className="container mx-auto px-4 md:px-0 max-w-7xl">
          <div className="mb-6 sm:mb-12">
            <h2 className="text-2xl sm:text-5xl font-normal  font-britti text-white">{t("home.faq.title")}</h2>
            <p className="text-gray-200 text-base sm:text-xl font-britti font-medium">{t("home.faq.subtitle")}</p>
          </div>

          <div className="space-y-1">
            {getFAQS(() => setShowSpecsModal(true), t).map((item) => (
              <div key={item.question} className="border-b border-white">
                <div className="grid grid-cols-3 items-center py-2 cursor-pointer" onClick={() => toggleItem(item.question)}>
                  <h3 className="text-lg sm:text-2xl font-britti font-medium text-white col-span-2 sm:col-span-2">
                    {item.question}
                  </h3>
                  <div className="flex items-center justify-end col-span-1">
                    <button type="button" onClick={() => toggleItem(item.question)} className="text-white flex items-center">
                      <span
                        className="mr-2 text-xs sm:text-base font-semibold hover:cursor-pointer"
                        onClick={() => toggleItem(item.question)}
                      >
                        {t("common.readMore")}
                      </span>
                      <motion.svg
                        className="hover:cursor-pointer"
                        onClick={() => toggleItem(item.question)}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        animate={{ rotate: openKey === item.question ? 180 : 0 }}
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
                  </div>
                </div>
                <AnimatePresence>
                  {openKey === item.question && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="py-4 bg-[#1a1a1a] rounded-b-lg mb-4 ">
                        <div className="prose prose-sm sm:prose text-gray-400  max-w-6xl">{item.answer}</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQSection;
