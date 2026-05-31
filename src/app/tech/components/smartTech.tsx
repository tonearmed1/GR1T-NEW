"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
// Removed unused imports

// Types
type TechItem = {
  img: string;
  title: string;
  description: string;
};

// Smart Tech
const buildTechs = (t: (key: string) => string): TechItem[] => [
  {
    img: "/tech/hero.png",
    title: t("tech.smart.display.title"),
    description: t("tech.smart.display.description"),
  },
  {
    img: "/tech/02_SMART-TECH.png",
    title: t("tech.smart.charger.title"),
    description: t("tech.smart.charger.description"),
  },
  {
    img: "/tech/03_SMART-TECH.png",
    title: t("tech.smart.keyless.title"),
    description: t("tech.smart.keyless.description"),
  },
  {
    img: "/tech/04_SMART-TECH.png",
    title: t("tech.smart.app.title"),
    description: t("tech.smart.app.description"),
  },
];

// Cameras
const buildCameras = (t: (key: string) => string): TechItem[] => [
  {
    img: "/tech/05_CAMERAS.png",
    title: t("tech.cameras.frontRear.title"),
    description: t("tech.cameras.frontRear.description"),
  },
  {
    img: "/tech/06_CAMERAS.png",
    title: t("tech.cameras.security.title"),
    description: t("tech.cameras.security.description"),
  },
];

// Everyday Convenience
const buildEverydayConvenience = (t: (key: string) => string): TechItem[] => [
  {
    img: "/tech/07_EVERYDAY.png",
    title: t("tech.everyday.storage.title"),
    description: t("tech.everyday.storage.description"),
  },
  {
    img: "/tech/08_EVERYDAY.png",
    title: t("tech.everyday.racks.title"),
    description: t("tech.everyday.racks.description"),
  },
  {
    img: "/tech/10_EVERYDAY.png",
    title: t("tech.everyday.batteries.title"),
    description: t("tech.everyday.batteries.description"),
  },
  {
    img: "/tech/09_EVERYDAY.png",
    title: t("tech.everyday.onboardCharger.title"),
    description: t("tech.everyday.onboardCharger.description"),
  },
  {
    img: "/tech/11_EVERYDAY.png",
    title: t("tech.everyday.chargeAnywhere.title"),
    description: t("tech.everyday.chargeAnywhere.description"),
  },
];

// Crafted Performance
const buildCraftedPerformance = (t: (key: string) => string): TechItem[] => [
  {
    img: "/tech/12_CRAFTED.png",
    title: t("tech.crafted.materials.title"),
    description: t("tech.crafted.materials.description"),
  },
  {
    img: "/tech/13_CRAFTED.png",
    title: t("tech.crafted.belt.title"),
    description: t("tech.crafted.belt.description"),
  },
  {
    img: "/tech/14_CRAFTED.png",
    title: t("tech.crafted.wheels.title"),
    description: t("tech.crafted.wheels.description"),
  },
  {
    img: "/tech/15_CRAFTED.jpeg",
    title: t("tech.crafted.regenerative.title"),
    description: t("tech.crafted.regenerative.description"),
  },
];

const SmartTechs = () => {
  const { t } = useLanguage();
  const techs = buildTechs(t);
  const cameras = buildCameras(t);
  const everydayConvenince = buildEverydayConvenience(t);
  const craftedPerformance = buildCraftedPerformance(t);
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4 md:px-0 max-w-7xl">
        {/* Page Heading */}
        {/* <div className="mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-black">The Power Behind the Silence.</h1>
          <p className="mt-2 text-gray-700 text-xl">
            Innovative design and smart technology working together to deliver performance without compromise.
          </p>
        </div> */}

        {/* Smart Tech */}
        <div className="mt-6 mb-2 sm:mb-4">
          <h2 id="smart-tech" className="text-2xl sm:text-4xl font-bold text-black">
            {t("tech.sections.smartTech")}
          </h2>
          <div className="mt-3 border-t-2 border-gray-400" />
        </div>

        <div>
          {techs.map((item: TechItem, index: number) => (
            <motion.div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 py-2 sm:py-4 border-b border-gray-200 last:border-0"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ opacity: { duration: 1.2 }, y: { duration: 0.8 } }}
            >
              {/* Image - left on desktop, full width on mobile */}
              <div className="sm:col-span-5">
                <div className="relative w-full h-56 sm:h-64 rounded-md overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={index < 2}
                  />
                </div>
              </div>

              {/* Content - right on desktop, full width on mobile */}
              <div className="sm:col-span-7">
                <h3 className="text-2xl sm:text-3xl font-bold text-black mb-2">{item.title}</h3>
                <p className="text-gray-800 leading-relaxed text-xl text-justify">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cameras */}
        <div className="mt-6 mb-2 sm:mb-4">
          <h2 id="cameras" className="text-2xl sm:text-4xl font-bold text-black">
            {t("tech.sections.cameras")}
          </h2>
          <div className="mt-3 border-t-2 border-gray-400" />
        </div>
        <div>
          {cameras.map((item: TechItem, index: number) => (
            <motion.div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 py-2 sm:py-4 border-b border-gray-200 last:border-0"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ opacity: { duration: 1.2 }, y: { duration: 0.8 } }}
            >
              <div className="sm:col-span-5">
                <div className="relative w-full h-56 sm:h-64 rounded-md overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={index < 2}
                  />
                </div>
              </div>
              <div className="sm:col-span-7">
                <h3 className="text-2xl sm:text-3xl font-bold text-black mb-2">{item.title}</h3>
                <p className="text-gray-800 leading-relaxed text-xl text-justify">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Everyday Convenience */}
        <div className="mt-6 mb-2 sm:mb-4">
          <h2 id="everyday-convenience" className="text-2xl sm:text-4xl font-bold text-black">
            {t("tech.sections.everyday")}
          </h2>
          <div className="mt-3 border-t-2 border-gray-400" />
        </div>
        <div>
          {everydayConvenince.map((item: TechItem, index: number) => (
            <motion.div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 py-2 sm:py-4 border-b border-gray-200 last:border-0"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ opacity: { duration: 1.2 }, y: { duration: 0.8 } }}
            >
              <div className="sm:col-span-5">
                <div className="relative w-full h-56 sm:h-64 rounded-md overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={index < 2}
                  />
                </div>
              </div>
              <div className="sm:col-span-7">
                <h3 className="text-2xl sm:text-3xl font-bold text-black mb-2">{item.title}</h3>

                <p className="text-gray-800 leading-relaxed text-xl text-justify">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Crafted Performance */}
        <div className="mt-6 mb-2 sm:mb-4">
          <h2 id="crafted-performance" className="text-2xl sm:text-4xl font-bold text-black">
            {t("tech.sections.crafted")}
          </h2>
          <div className="mt-3 border-t-2 border-gray-400" />
        </div>
        <div>
          {craftedPerformance.map((item: TechItem, index: number) => (
            <motion.div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 py-2 sm:py-4 border-b border-gray-200 last:border-0"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ opacity: { duration: 1.2 }, y: { duration: 0.8 } }}
            >
              <div className="sm:col-span-5">
                <div className="relative w-full h-56 sm:h-64 rounded-md overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={index < 2}
                  />
                </div>
              </div>
              <div className="sm:col-span-7">
                <h3 className="text-2xl sm:text-3xl font-bold text-black mb-2">{item.title}</h3>

                <p className="text-gray-800 leading-relaxed text-xl text-justify">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SmartTechs;
