"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import LicenseTableModal from "@/components/reusable/LicenseTableModal";
import SpecsModal from "@/components/reusable/SpecsModal";

const getProductFaqs = (openSpecs: () => void) => [
  {
    question: "What are the key specifications?",
    answer: (
      <div className="space-y-2">
        <ul className="list-disc pl-5 space-y-1">
          <li>Top speed: 130 km/h</li>
          <li>Range: Up to 150 km</li>
          <li>Battery: removable system ( 6.0 kWh optional)</li>
          <li>Charging: 2.5 hrs to 80%, 3.2 hrs to 100%</li>
          <li>Power: 11 kW nominal (125cc), 27 kW peak (36 hp)</li>
          <li>Weight: 127 kg (incl. batteries)</li>
          <li>Payload: 190 kg</li>
          <li>License: A1 or B (in some countries)</li>
        </ul>
        <div className="flex gap-4">
          <Link
            type="button"
            href="/G1S#g1s-specs"
            aria-label="g1s-specs"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Visit G1S Street Specs
          </Link>
          <Link
            type="button"
            href="/G1X#g1x-specs"
            aria-label="g1x-specs"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Visit G1X Scrambler Specs
          </Link>
        </div>
      </div>
    ),
  },
  {
    question: "What is the range?",
    answer:
      "Depending on the battery configuration, riding style, and terrain, the G1 offers a practical 120–150 km of real-world range (WMTC standard). This makes it ideal for daily commuting, weekend trips, and everything in between.",
  },
  {
    question: "How much do the bikes cost?",
    answer: (
      <div className="space-y-2">
        <ul className="list-disc pl-5 space-y-1">
          <li>G1S “Street” expected MSRP is €7,000 + VAT.</li>
          <li>G1X “Scrambler” expected MSRP is €8,000 + VAT.</li>
        </ul>
        <p>
          Founder&apos;s Circle members get a €1,500 discount on either mode’s starting price for reservations made by 31.1.2026.
          See our dedicated Founder’s Circle page if you want to know more.
        </p>
      </div>
    ),
  },
  {
    question: "What license do I need to ride it?",
    answer: (
      <div className="space-y-2">
        <p>
          You’ll need an A1 license or B license in some countries. We’ve prepared a chart that outlines what license you need in
          each European country. However, we recommend you check local laws or consult local authorities.
        </p>
        <LicenseTableModal />
      </div>
    ),
  },
  {
    question: "Can I remove the batteries for charging?",
    answer: (
      <div className="space-y-2">
        <p>
          Yes. Removable batteries allow flexible charging at home, work, or anywhere with a standard outlet. Customers have a
          choice between:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          {/* <li>2 × 2.1 kWh packs for a total of 4.2 kWh</li> */}
          <li>2 × 3.0 kWh packs for a total of 6.0 kWh</li>
        </ul>
      </div>
    ),
  },
  {
    question: "How long does it take to charge?",
    answer: (
      <div className="space-y-2">
        <p>Charging times depend on the battery configuration and power source:</p>
        <ul className="list-disc pl-5 space-y-1">
          {/* <li>4.2 kWh pack (2×2.1 kWh): ~2.5 hours at 220V</li> */}
          <li>5.9 kWh pack (2×2.96 kWh): ~3.2 hours at 220V</li>
          {/* <li>A fast top‑up from 10–80% typically takes 1.5–2.5 hours depending on the pack size.</li> */}
        </ul>
      </div>
    ),
  },
  {
    question: "Can I charge it from a car charging point?",
    answer:
      "Yes absolutely. With the optional Type 2 adapter and on-board charger, you can plug the G1 into any standard car charging station. You’ll be able to purchase the charger and adapter from our website.",
  },
  {
    question: "Can I ride it on the motorway?",
    answer:
      "Yes. With a top speed of 130 km/h, the G1 models are fully motorway-capable and perfectly suited for urban and suburban roads.",
  },
  {
    question: "Is it suitable for two riders?",
    answer:
      "Yes. The G1 is a standard two-seater, with enough power and best-in-class payload capacity (up to 190kg) to comfortably carry two passengers.",
  },
  {
    question: "What makes this bike different from others?",
    answer: (
      <div className="space-y-2">
        <ul className="list-disc pl-5 space-y-1">
          <li>Designed and engineered in Italy’s Motor Valley</li>
          <li>Premium materials</li>
          <li>Removable dual-battery system</li>
          <li>190kg carrying capacity</li>
          <li>9L under-seat storage</li>
          <li>Smart tech (4G dashboard, standard wireless CarPlay/Android Auto, wireless charging, GPS, rider-facing camera)</li>
          <li>Modular racks</li>
          <li>Sleek, customizable design</li>
        </ul>
      </div>
    ),
  },
  {
    question: "Is it theft-resistant?",
    answer:
      "Yes — GPS tracking, rider-facing motion camera, remote lock, and removable batteries make theft extremely difficult.",
  },
  {
    question: "What tyres and wheels are used?",
    answer: (
      <div className="space-y-2">
        <p>Wheel size: 17&quot;</p>
        <p>The G1S “Street” comes with Pirelli Angel City tyres</p>
        <p>The G1X “Scrambler” comes with Metzeler Karoo Street tyres</p>
      </div>
    ),
  },
  {
    question: "Where can I see or test it?",
    answer: (
      <div className="space-y-2">
        <p>
          We’ll be exhibiting at the prestigious EICMA motorcycle fair in Italy. Come visit us if you plan to visit. We’ll be in
          Hall 9, Stand S57.
        </p>
        <p>
          Test rides will be organized through selected dealers and at motorcycle events and pop-up locations. Join our mailing
          list to be the first to know!
        </p>
      </div>
    ),
  },
  {
    question: "Will the GR1T App be available at launch?",
    answer: "Yes — digital key, GPS tracking, diagnostics, OTA updates, and more.",
  },
  {
    question: "What warranty does GR1T offer?",
    answer: (
      <div className="space-y-2">
        <ul className="list-disc pl-5 space-y-1">
          <li>2 years on the full motorcycle (unlimited km)</li>
          <li>3 years or 36,000 km on powertrain</li>
          <li>⁠⁠6 years on batteries (≥ 80% capacity guaranteed)</li>
        </ul>
        <p>
          See full terms on our{" "}
          <Link href="/quality/warranty" target="_blank" className="text-blue-600 underline hover:text-blue-800">
            Warranty Page
          </Link>
          .
        </p>
      </div>
    ),
  },
  {
    question: "Is the bike homologated for EU roads?",
    answer: "Yes, developed in full compliance with EU homologation standards.",
  },
  {
    question: "Is the bike available in different versions?",
    answer: (
      <p>
        Yes – a{" "}
        <Link href={"/G1S"} target="_blank" className="text-blue-500 underline hover:cursor-pointer">
          G1S Street
        </Link>{" "}
        model and a{" "}
        <Link href={"/G1X"} target="_blank" className="text-blue-500 underline hover:cursor-pointer">
          {" "}
          G1X Scrambler{" "}
        </Link>
        model with off-road styling.
      </p>
    ),
  },
  {
    question: "What colours and configurations are available?",
    answer: "Several customizable side panel options and accessory packs will be available.",
  },
  {
    question: "How can I order?",
    answer: (
      <p>
        You can{" "}
        <Link href={"/founders-circle"} target="_blank" className="text-blue-500 underline hover:cursor-pointer">
          reserve
        </Link>{" "}
        your bike risk-free for €100. If you reserve by 31.1.2026 you’ll become a Founder&apos;s Circle member and benefit from a
        €1,500 discount on the selected model’s starting MSRP.
      </p>
    ),
  },
  {
    question: "How does the reservation process work?",
    answer: (
      <p>
        Go to our{" "}
        <Link href={"/checkout?model=G1S"} target="_blank" className="text-blue-500 underline hover:cursor-pointer">
          reservation page
        </Link>{" "}
        , select your model and pay a €100 deposit. This refundable deposit secures your spot and discount.
      </p>
    ),
  },
  {
    question: "When will deliveries start?",
    answer: "We aim to begin production in 2026, with deliveries starting in early 2027 after production funding is confirmed.",
  },
];

const FAQsAccordian = () => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [showSpecsModal, setShowSpecsModal] = useState(false);

  const toggleItem = (period: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [period]: !prev[period],
    }));
  };

  return (
    <>
      {showSpecsModal && <SpecsModal onClose={() => setShowSpecsModal(false)} />}
      <section className=" py-8 sm:py-16 bg-gray-100">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          {/* <div className="mb-6 sm:mb-12">
            <h2 className="text-2xl sm:text-5xl font-normal  font-britti text-gray-800">Frequently Asked Questions</h2>
            <p className="text-gray-700 text-base sm:text-xl font-britti font-medium">Questions? We&apos;ve got answers!</p>
          </div> */}

          {/* Product FAQs only */}

          <div className="space-y-1">
            {getProductFaqs(() => setShowSpecsModal(true)).map((item) => (
              <div key={item.question} className="border-b border-gray-700">
                <div className="grid grid-cols-3 items-center py-2 cursor-pointer" onClick={() => toggleItem(item.question)}>
                  <h3 className="text-lg sm:text-2xl font-britti font-medium text-gray-800 col-span-2 sm:col-span-2">
                    {item.question}
                  </h3>
                  <div className="flex items-center justify-end col-span-1">
                    <button type="button" onClick={() => toggleItem(item.question)} className="text-gray-800 flex items-center">
                      <span
                        className="mr-2 text-xs sm:text-base font-semibold hover:cursor-pointer"
                        onClick={() => toggleItem(item.question)}
                      >
                        Read more
                      </span>
                      <motion.svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        onClick={() => toggleItem(item.question)}
                        xmlns="http://www.w3.org/2000/svg"
                        animate={{ rotate: expandedItems[item.question] ? 180 : 0 }}
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
                  {expandedItems[item.question] && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="py-4 bg-gray-100 rounded-b-lg mb-4 ">
                        <div className="prose prose-sm sm:prose text-gray-700  max-w-6xl">{item.answer}</div>
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

export default FAQsAccordian;
