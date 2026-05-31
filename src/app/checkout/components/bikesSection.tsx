"use client";
import React, { SetStateAction, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const BikesSection = ({
  selectedModal,
  setSelectedModal,
}: {
  selectedModal: string;
  setSelectedModal: React.Dispatch<SetStateAction<string>>;
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(sectionRef, { once: false, amount: 0.2 });
  // router removed: not used

  // const rawModel = (searchParams.get("model") || "").toUpperCase();
  const isG1SSelected = selectedModal.toUpperCase() === "G1S Street".toUpperCase();
  const isG1XSelected = selectedModal.toUpperCase() === "G1X Scrambler".toUpperCase();

  const cardBase = "pt-4 rounded-xl border block group cursor-pointer  transition-transform duration-200 ease-out";
  const unselected = "border-gray-200 bg-gray-50 hover:border-orange-500 hover:bg-gray-100";
  const selected = "border-orange-500 ring-2 ring-orange-500 bg-white lg:scale-[1.02]";

  return (
    <section ref={sectionRef} className="py-6 sm:py-8 bg-white px-4 md:px-8">
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* GT1S */}
          {/* <div className="mb-4 md-mb-0 px-4 md-px-0"> */}
          <div className="mb-4 md:mb-0 md:px-0">
            <div
              onClick={() => {
                setSelectedModal("G1S Street");
                // router.push("/checkout?model=G1S")}
              }}
              role="button"
              tabIndex={0}
              // onKeyDown={(e) => {
              //   if (e.key === "Enter" || e.key === " ") router.push("/checkout?model=G1S");
              // }}
              className={`${cardBase} ${isG1SSelected ? selected : unselected}`}
              aria-label="Choose GR1T G1S Street"
            >
              <motion.div
                className="p-6 md:p-0 transition-colors duration-300 ease-out"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{
                  opacity: { duration: 1.2, ease: "easeOut", delay: 0.12 },
                  y: { duration: 0.8, ease: "easeOut", delay: 0.12 },
                }}
              >
                <div className="flex items-center gap-3  px-3">
                  <h3
                    className={`${
                      isG1SSelected ? " text-orange-500" : " text-black"
                    }  font-bold leading-tight text-2xl sm:text-3xl`}
                  >
                    G1S Street
                  </h3>
                </div>
              </motion.div>
              <motion.div
                className={` relative h-32 sm:h-80 ${
                  isG1SSelected ? "md:h-[30rem]" : "md:h-[28rem]"
                }   overflow-hidden transition-all duration-300 ease-out  `}
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
                  className="p-2 sm:p-4 object-contain transition-transform duration-300 ease-out group-hover:scale-[1.08]"
                  priority
                />
              </motion.div>
              <button
                aria-label="Proceed to checkout for G1X"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();

                  setSelectedModal("G1S Street");

                  // router.push("/checkout?model=G1S");
                }}
                className={`w-full  group inline-flex items-center justify-center rounded-b-xl gap-2  ${
                  isG1SSelected ? "bg-orange-500" : "bg-black"
                } text-white px-4 sm:px-5 text-xl hover:bg-black/90 transition-colors h-[2.25rem] sm:h-[3rem] hover:cursor-pointer`}
              >
                {isG1SSelected ? "Selected" : "Select"}
              </button>
            </div>
          </div>
          {/* GT1x */}

          <div className="mb-4 md:mb-0 md:px-0">
            <div
              onClick={() => {
                setSelectedModal("G1X Scrambler");
                // router.push("/checkout?model=G1X")
              }}
              role="button"
              tabIndex={0}
              // onKeyDown={(e) => {
              //   if (e.key === "Enter" || e.key === " ") router.push("/checkout?model=G1X");
              // }}
              className={`${cardBase} ${isG1XSelected ? selected : unselected}`}
              aria-label="Choose GR1T G1X"
            >
              <motion.div
                className="p-6 md:p-0 transition-colors duration-300 ease-out"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{
                  opacity: { duration: 1.2, ease: "easeOut", delay: 0.22 },
                  y: { duration: 0.8, ease: "easeOut", delay: 0.22 },
                }}
              >
                <div className="flex items-center gap-3 px-3">
                  <h3
                    className={`${
                      isG1XSelected ? " text-orange-500" : " text-black"
                    }  font-bold leading-tight text-2xl sm:text-3xl`}
                  >
                    G1X Scrambler
                  </h3>
                </div>

                {/* Subtle promo pill */}
              </motion.div>
              <motion.div
                className={`relative h-32 sm:h-80 ${
                  isG1XSelected ? "md:h-[30rem]" : "md:h-[28rem]"
                }  overflow-hidden transition-all duration-300 ease-out`}
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
                  className="p-2 sm:p-4 object-contain transition-transform duration-300 ease-out group-hover:scale-[1.08]"
                  priority
                />
              </motion.div>
              <button
                aria-label="Proceed to checkout for G1X"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();

                  setSelectedModal("G1X Scrambler");

                  // router.push("/checkout?model=G1X");
                }}
                className={`w-full  group inline-flex items-center justify-center rounded-b-xl gap-2  ${
                  isG1XSelected ? "bg-orange-500" : "bg-black"
                } text-white px-4 sm:px-5 text-xl hover:bg-black/90 transition-colors h-[2.25rem] sm:h-[3rem] hover:cursor-pointer`}
              >
                {isG1XSelected ? "Selected" : "Select"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BikesSection;
