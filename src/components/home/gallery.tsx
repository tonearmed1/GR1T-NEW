"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const GallerySection = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(sectionRef, { once: false, amount: 0.2 });
  const { t } = useLanguage();

  return (
    <section ref={sectionRef} className="pt-10 pb-10 sm:pb-16 sm:pt-16 px-6 md:px-16 bg-white">
      <div className="max-w-6xl lg:max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-4 md:mb-12 flex flex-col justify-center max-w-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ opacity: { duration: 1.2 }, y: { duration: 0.8 } }}
        >
          <h2 className="text-3xl md:text-5xl text-black font-semibold">{t("home.gallery.title")}</h2>
          <p className="mt-3 md:mt-4 text-lg sm:text-2xl text-gray-700 ">{t("home.gallery.description")}</p>
        </motion.div>

        {/* Gallery layout */}
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Left: feature image with overlay copy */}
          <div className="md:col-span-1">
            <Link href="/tech" aria-label="Explore Smart Tech" className="group block">
              <motion.div
                className="relative h-72 md:h-[36rem] lg:h-[42rem] rounded-xl overflow-hidden cursor-pointer transition-transform duration-300 group-hover:scale-[1.01] group-hover:shadow-lg"
                initial={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
                animate={
                  inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.97, filter: "blur(8px)" }
                }
                transition={{
                  opacity: { duration: 1.4, delay: 0.1 },
                  scale: { duration: 0.8, delay: 0.1 },
                  filter: { duration: 1.2, delay: 0.1 },
                }}
              >
                <Image
                  src="/Home/gallery/main.png"
                  alt="GR1T G1S feature"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/15" />

                  <motion.div
                    className="relative h-full p-6 md:p-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ opacity: { duration: 1.2, delay: 0.2 }, y: { duration: 0.8, delay: 0.2 } }}
                  >
                    <h3 className="absolute left-6 md:left-8 top-[40%] md:top-1/2 -translate-y-1/2 text-white text-3xl md:text-5xl font-bold leading-tight">
                      {t("home.gallery.overlay.line1")}
                      <br className=" md:block" /> {t("home.gallery.overlay.line2")}
                      <br className=" md:block" /> {t("home.gallery.overlay.line3")}
                    </h3>
                    <p className="absolute left-6 md:left-8 bottom-6 md:bottom-8 text-white/90 text-lg md:text-xl leading-tight md:leading-normal max-w-md">
                      {t("home.gallery.overlay.text")}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          </div>

          {/* Right: four cards with images and captions */}
          <div className="md:col-span-1 grid grid-cols-2 gap-4 md:gap-6">
            {/* Smart Tech */}
            <div>
              <Link href="/tech#smart-tech" aria-label="Jump to Smart Tech" className="group block cursor-pointer">
                <motion.div
                  className="relative h-24 md:h-[12rem] lg:h-[14rem] rounded-xl overflow-hidden"
                  initial={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
                  animate={
                    inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.97, filter: "blur(8px)" }
                  }
                  transition={{
                    opacity: { duration: 1.4, delay: 0.2 },
                    scale: { duration: 0.8, delay: 0.2 },
                    filter: { duration: 1.2, delay: 0.2 },
                  }}
                >
                  <Image
                    src="/Home/gallery/1.png"
                    alt="Smart Tech"
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-black/35 z-10 transition-colors group-hover:bg-black/25" />
                  <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    <span className="text-white text-lg md:text-xl font-semibold tracking-wide uppercase">{t("common.explore")}</span>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ opacity: { duration: 1.2, delay: 0.28 }, y: { duration: 0.8, delay: 0.28 } }}
                >
                  <h4 className="mt-2 text-black font-semibold text-xl md:text-2xl transition-colors group-hover:text-gray-900">
                    {t("home.gallery.card.smartTech.title")}
                  </h4>
                  <p className="mt-1 text-gray-700 text-base md:text-lg transition-colors group-hover:text-gray-800">
                    {t("home.gallery.card.smartTech.description")}
                  </p>
                </motion.div>
              </Link>
            </div>

            {/* Utility */}
            <div>
              <Link
                href="/tech#everyday-convenience"
                aria-label="Jump to Everyday Convenience"
                className="group block cursor-pointer"
              >
                <motion.div
                  className="relative h-24 md:h-[12rem] lg:h-[14rem] rounded-xl overflow-hidden"
                  initial={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
                  animate={
                    inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.97, filter: "blur(8px)" }
                  }
                  transition={{
                    opacity: { duration: 1.4, delay: 0.25 },
                    scale: { duration: 0.8, delay: 0.25 },
                    filter: { duration: 1.2, delay: 0.25 },
                  }}
                >
                  <Image
                    src="/Home/gallery/2.png"
                    alt="Utility"
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-black/35 z-10 transition-colors group-hover:bg-black/25" />
                  <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    <span className="text-white text-lg md:text-xl font-semibold tracking-wide uppercase">{t("common.explore")}</span>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ opacity: { duration: 1.2, delay: 0.33 }, y: { duration: 0.8, delay: 0.33 } }}
                >
                  <h4 className="mt-2 text-black font-semibold text-xl md:text-2xl transition-transform group-hover:text-gray-900">
                    {t("home.gallery.card.utility.title")}
                  </h4>
                  <p className="mt-1 text-gray-700 text-base md:text-lg transition-colors group-hover:text-gray-800">
                    {t("home.gallery.card.utility.description")}
                  </p>
                </motion.div>
              </Link>
            </div>

            {/* Premium Materials */}
            <div>
              <Link
                href="/tech#crafted-performance"
                aria-label="Jump to Crafted Performance"
                className="group block cursor-pointer"
              >
                <motion.div
                  className="relative h-24 md:h-[12rem] lg:h-[14rem] rounded-xl overflow-hidden"
                  initial={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
                  animate={
                    inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.97, filter: "blur(8px)" }
                  }
                  transition={{
                    opacity: { duration: 1.4, delay: 0.3 },
                    scale: { duration: 0.8, delay: 0.3 },
                    filter: { duration: 1.2, delay: 0.3 },
                  }}
                >
                  <Image
                    src="/Home/gallery/3.png"
                    alt="Premium Materials"
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-black/35 z-10 transition-colors group-hover:bg-black/25" />
                  <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    <span className="text-white text-lg md:text-xl font-semibold tracking-wide uppercase">{t("common.explore")}</span>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ opacity: { duration: 1.2, delay: 0.38 }, y: { duration: 0.8, delay: 0.38 } }}
                >
                  <h4 className="mt-2 text-black font-semibold text-xl md:text-2xl transition-colors group-hover:text-gray-900">
                    {t("home.gallery.card.materials.title")}
                  </h4>
                  <p className="mt-1 text-gray-700 text-base md:text-lg transition-colors group-hover:text-gray-800">
                    {t("home.gallery.card.materials.description")}
                  </p>
                </motion.div>
              </Link>
            </div>

            {/* Security */}
            <div>
              <Link href="/tech#cameras" aria-label="Jump to Cameras/Security" className="group block cursor-pointer">
                <motion.div
                  className="relative h-24 md:h-[12rem] lg:h-[14rem] rounded-xl overflow-hidden"
                  initial={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
                  animate={
                    inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.97, filter: "blur(8px)" }
                  }
                  transition={{
                    opacity: { duration: 1.4, delay: 0.35 },
                    scale: { duration: 0.8, delay: 0.35 },
                    filter: { duration: 1.2, delay: 0.35 },
                  }}
                >
                  <Image
                    src="/Home/gallery/4.png"
                    alt="Security"
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-black/35 z-10 transition-colors group-hover:bg-black/25" />
                  <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    <span className="text-white text-lg md:text-xl font-semibold tracking-wide uppercase">{t("common.explore")}</span>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ opacity: { duration: 1.2, delay: 0.43 }, y: { duration: 0.8, delay: 0.43 } }}
                >
                  <h4 className="mt-2 text-black font-semibold text-xl md:text-2xl transition-colors group-hover:text-gray-900">
                    {t("home.gallery.card.security.title")}
                  </h4>
                  <p className="mt-1 text-gray-700 text-base md:text-lg transition-colors group-hover:text-gray-800">
                    {t("home.gallery.card.security.description")}
                  </p>
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
