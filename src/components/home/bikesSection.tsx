"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const BikesSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(sectionRef, { once: false, amount: 0.2 });

  return (
    <section ref={sectionRef} className="py-8  sm:py-12 md:pt-24 bg-white ">
      <div className="mx-auto max-w-6xl lg:max-w-7xl px-4 md:px-0">
        {/* Header */}
        <motion.div
          className="px-0 sm:px-2 flex flex-col sm:flex-row  items-center mb-8 sm:mb-12 text-center sm:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ opacity: { duration: 1.2 }, y: { duration: 0.8 } }}
        >
          <h2 className="text-4xl md:text-6xl xl:text-4xl sm:text-3xl text-black font-bold">{t("home.bikes.title")}</h2>
        </motion.div>

        {/* Models grid */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 items-stretch">
          {/* GT1S */}
          <div className="mb-8 md:mb-0 h-full">
            <Link
              href="/G1S"
              className="pt-4 rounded-xl border border-gray-200 hover:border-orange-500 bg-gray-50 hover:bg-gray-100 block group cursor-pointer flex flex-col h-full md:min-h-[52rem]"
              aria-label="View GR1T G1S details"
            >
              <motion.div
                className="md:p-0 transition-colors duration-300 ease-out"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{
                  opacity: { duration: 1.2, ease: "easeOut", delay: 0.12 },
                  y: { duration: 0.8, ease: "easeOut", delay: 0.12 },
                }}
              >
                <div className="flex items-center gap-3 px-3">
                  <h3 className="text-3xl sm:text-5xl text-black font-bold leading-tight "> G1S Street</h3>
                </div>

                <p className="mt-2 text-lg sm:text-2xl text-gray-700 mb-5 px-3">{t("home.bikes.description1")}</p>

                <span className="text-bold text-3xl text-black px-3">{t("home.bikes.g1s.startingPrice")}</span>
                <br />
                {/* <span className="text-bold text-3xl text-black px-3 line-through">
                  {t("home.bikes.g1s.originalStartingPrice")}
                </span> */}

                {/* <div className="mt-3 flex items-center gap-2 text-3xl px-3">
                  <span className=" py-1 font-normal text-black">
                    <span className=" py-1 font-black text-orange-600 mr-2 ">{t("home.bikes.discountInline.prefix")}</span>
                    {t("home.bikes.discountInline.suffix")}
                  </span>
                </div> */}
              </motion.div>
              <motion.div
                className=" relative h-72 sm:h-96 md:h-[32rem]   overflow-hidden transition-all duration-300 ease-out  "
                initial={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
                animate={
                  inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.97, filter: "blur(8px)" }
                }
                transition={{
                  opacity: { duration: 1.4, ease: "easeOut", delay: 0.18 },
                  scale: { duration: 0.8, ease: "easeOut", delay: 0.18 },
                  filter: { duration: 1.2, ease: "easeOut", delay: 0.18 },
                }}
              >
                <Image
                  src="/Home/bikes/G1S.png"
                  alt="GR1T G1S"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                  className="p-10 pb-0 object-contain transition-transform duration-300 ease-out group-hover:scale-[1.05] "
                  priority
                />
              </motion.div>
              <button
                aria-label="Open GR1T G1S details in a new tab"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  window.open("/G1S", "_self");
                }}
                className="mt-auto w-full group inline-flex items-center justify-center rounded-b-xl gap-2 bg-black text-white px-4 sm:px-5 text-xl hover:bg-black/90 transition-colors h-[2.25rem] sm:h-[3rem] hover:cursor-pointer"
              >
                {t("common.explore")}
              </button>
            </Link>
          </div>
          {/* GT1x */}

          <div className="h-full">
            <Link
              href="/G1X"
              className="pt-4 rounded-xl border border-gray-200 hover:border-orange-500 bg-gray-50 hover:bg-gray-100 block group cursor-pointer flex flex-col h-full md:min-h-[52rem]"
              aria-label="View GR1T G1X details"
            >
              <motion.div
                className="md:p-0 transition-colors duration-300 ease-out"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{
                  opacity: { duration: 1.2, ease: "easeOut", delay: 0.22 },
                  y: { duration: 0.8, ease: "easeOut", delay: 0.22 },
                }}
              >
                <div className="flex items-center gap-3  px-3">
                  <h3 className="text-3xl sm:text-5xl text-black font-bold leading-tight">G1X Scrambler</h3>
                </div>
                <p className="mt-2 text-lg sm:text-2xl text-gray-700 mb-4 px-3">{t("home.bikes.description2")}</p>
                {/* Subtle promo pill */}
                <span className="text-bold text-3xl text-black px-3">{t("home.bikes.g1x.startingPrice")}</span>
                <br />
                {/* <span className="text-bold text-3xl text-black px-3 line-through">
                  {t("home.bikes.g1x.originalStartingPrice")}
                </span> */}

                {/* <div className="mt-3 flex items-center gap-2 text-3xl px-3">
                  <span className=" py-1 font-normal text-black">
                    <span className=" py-1 font-black text-orange-600 mr-2 ">{t("home.bikes.discountInline.prefix")}</span>
                    {t("home.bikes.discountInline.suffix")}
                  </span>
                </div> */}
              </motion.div>
              <motion.div
                className="relative h-72 sm:h-96 md:h-[32rem]  overflow-hidden transition-all duration-300 ease-out"
                initial={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
                animate={
                  inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.97, filter: "blur(8px)" }
                }
                transition={{
                  opacity: { duration: 1.4, ease: "easeOut", delay: 0.28 },
                  scale: { duration: 0.8, ease: "easeOut", delay: 0.28 },
                  filter: { duration: 1.2, ease: "easeOut", delay: 0.28 },
                }}
              >
                <Image
                  src="/Home/bikes/G1X.png"
                  alt="GR1T G1X"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                  className="p-10 pb-0 object-contain transition-transform duration-300 ease-out group-hover:scale-[1.05]"
                  priority
                />
              </motion.div>
              <button
                aria-label="Open GR1T G1S details in a new tab"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  window.open("/G1X", "_blank");
                }}
                className="mt-auto w-full group inline-flex items-center justify-center rounded-b-xl gap-2 bg-black text-white px-4 sm:px-5 text-xl hover:bg-black/90 transition-colors h-[2.25rem] sm:h-[3rem] hover:cursor-pointer"
              >
                {t("common.explore")}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BikesSection;
