"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const GalleryTwoSection = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(sectionRef, { once: false, amount: 0.2 });

  return (
    <section ref={sectionRef} className="py-6 md:py-16 px-6 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Grid layout matching the reference */}
        <div className="grid grid-cols-1 md:gap-6 gap-2">
          {/* Top: large feature image */}
          {/* <motion.div
            className="relative w-full rounded-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.97, filter: "blur(8px)" }}
            transition={{ opacity: { duration: 1.4 }, scale: { duration: 0.8 }, filter: { duration: 1.2 } }}
          >
            <div className="relative w-full aspect-[4/3] md:aspect-[3/2] lg:aspect-[4/3]">
              <Image
                src="/Home/gallery2/1.png"
                alt="Gallery 2 feature"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 90vw"
                className="object-cover"
                priority
              />
            </div>
          </motion.div> */}

          {/* Middle row: 1/3 + 2/3 widths, equal height */}
          <div className="grid grid-cols-3 gap-2 md:gap-6 h-[18rem] md:h-[24rem] lg:h-[28rem]">
            <motion.div
              className="relative w-full rounded-2xl overflow-hidden col-span-1 md:col-span-1 h-full"
              initial={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
              animate={inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.97, filter: "blur(8px)" }}
              transition={{
                opacity: { duration: 1.4, delay: 0.15 },
                scale: { duration: 0.8, delay: 0.15 },
                filter: { duration: 1.2, delay: 0.15 },
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src="/Home/gallery2/2.png"
                  alt="Gallery close-up"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            </motion.div>
            <motion.div
              className="relative w-full rounded-2xl overflow-hidden col-span-2 md:col-span-2 h-full"
              initial={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
              animate={inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.97, filter: "blur(8px)" }}
              transition={{
                opacity: { duration: 1.4, delay: 0.2 },
                scale: { duration: 0.8, delay: 0.2 },
                filter: { duration: 1.2, delay: 0.2 },
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src="/Home/gallery2/3.png"
                  alt="Top view"
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
          {/* <div className="grid grid-cols-4 gap-1 md:gap-6">
            <motion.div
              className="relative w-full rounded-2xl overflow-hidden col-span-1 md:col-span-1"
              initial={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
              animate={inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.97, filter: "blur(8px)" }}
              transition={{
                opacity: { duration: 1.4, delay: 0.25 },
                scale: { duration: 0.8, delay: 0.25 },
                filter: { duration: 1.2, delay: 0.25 },
              }}
            >
              <div className="relative w-full aspect-[2/3] md:aspect-[2/3]">
                <Image
                  src="/Home/gallery2/4.png"
                  alt="Portrait"
                  fill
                  sizes="(max-width: 768px) 100vw, 35vw "
                  className="object-cover object-center rounded-b-2xl"
                />
              </div>
            </motion.div>
            <motion.div
              className="relative w-full rounded-2xl overflow-hidden col-span-3 md:col-span-3"
              initial={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
              animate={inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.97, filter: "blur(8px)" }}
              transition={{
                opacity: { duration: 1.4, delay: 0.3 },
                scale: { duration: 0.8, delay: 0.3 },
                filter: { duration: 1.2, delay: 0.3 },
              }}
            >
              <div className="relative w-full aspect-[16/10] md:aspect-[16/8] max-h-[80%] md:max-h-[95%]">
                <Image
                  src="/mirageG1x/orange01.jpg"
                  alt="Wide shot"
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="object-cover rounded-b-2xl"
                />
              </div>
            </motion.div>
          </div> */}
          {/* Bottom row: 1/4 + 3/4 widths */}
          <div className="grid grid-cols-4 gap-1 md:gap-6">
            <motion.div
              className="relative w-full rounded-2xl overflow-hidden col-span-3 md:col-span-3"
              initial={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
              animate={inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.97, filter: "blur(8px)" }}
              transition={{
                opacity: { duration: 1.4, delay: 0.3 },
                scale: { duration: 0.8, delay: 0.3 },
                filter: { duration: 1.2, delay: 0.3 },
              }}
            >
              <div className="relative w-full aspect-[16/10] md:aspect-[16/8] max-h-[80%] md:max-h-[95%]">
                <Image
                  src="/Home/gallery2/7.jpg"
                  alt="Wide shot"
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className="object-cover rounded-b-2xl"
                />
              </div>
            </motion.div>
            <motion.div
              className="relative w-full rounded-2xl overflow-hidden col-span-1 md:col-span-1"
              initial={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
              animate={inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.97, filter: "blur(8px)" }}
              transition={{
                opacity: { duration: 1.4, delay: 0.25 },
                scale: { duration: 0.8, delay: 0.25 },
                filter: { duration: 1.2, delay: 0.25 },
              }}
            >
              <div className="relative w-full aspect-[2/3] md:aspect-[2/3]">
                <Image
                  src="/Home/gallery2/4.png"
                  alt="Portrait"
                  fill
                  sizes="(max-width: 768px) 100vw, 35vw "
                  className="object-cover object-center rounded-b-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryTwoSection;
