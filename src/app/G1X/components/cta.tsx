"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

const CTASectionG1X = () => {
  const router = useRouter();
  const { t } = useLanguage();
  return (
    <section className="py-12 sm:py-16" style={{ backgroundColor: "#F8831E" }}>
      <div className="container mx-auto px-4 md:px-0 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 items-start">
          {/* Left: Image */}
          <div className="w-full">
            <div className="relative w-full aspect-[2/3] md:aspect-[5/4] rounded-xl overflow-hidden ">
              <Image
                src="/grit-g1x/02_g1x.png"
                alt="GR1T G1X on the road"
                fill
                className="object-contain"
                quality={100}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 700px shadow-lg"
                priority
              />
            </div>
          </div>

          {/* Right: Copy and price card */}
          <div className="text-black  ">
            <h2 className="text-4xl sm:text-5xl font-britti font-bold">{t("g1x.cta.title")}</h2>
            <p className="mt-6 text-gray-900/90 text-lg">
              {t("g1x.cta.copy1.prefix")} <span className="font-britti font-bold">€ 1,500</span> {t("g1x.cta.copy1.suffix")}{" "}
              <span className="font-britti font-bold">€ 8,000</span>.
            </p>
            <p className="mt-4 text-gray-900/90">
              <span className=" font-black text-lg">{t("g1x.cta.joinFounders")}</span>
            </p>

            {/* Price Card */}
            <div className="mt-8 ">
              <div className="bg-black text-white rounded-xl p-5 sm:p-6 shadow-lg grid grid-cols-12 items-stretch gap-8 sm:gap-10">
                {/* Badge */}
                <div className="col-span-3 sm:col-span-2 self-stretch">
                  <div className="bg-white text-black rounded-lg h-full w-24 sm:w-28 flex items-center justify-center shadow">
                    <span className="text-3xl font-semibold">#1</span>
                  </div>
                </div>

                {/* Pricing copy */}
                <div className="md:ml-8 col-span-9 sm:col-span-10 leading-snug pl-2 sm:pl-4">
                  <div className="text-lg text-gray-100">{t("g1x.cta.price.regularLabel")}</div>
                  <div className="relative inline-block mt-1">
                    <span className="text-lg text-white">€8,000</span>
                    <span
                      aria-hidden
                      className="absolute left-0 right-0 top-1/2 -translate-y-1/2 block h-[2px] bg-red-500 -rotate-[14deg] scale-x-100 rounded"
                    />
                  </div>
                  <div className="text-lg text-gray-100 mt-3">{t("g1x.cta.price.untilLabel")}</div>
                  <div className="text-4xl sm:text-5xl font-bold mt-1">€6,500</div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <button
                onClick={() => router.push("/checkout?model=G1X")}
                className="inline-flex items-center bg-white text-black px-2 py-1 rounded-full shadow hover:cursor-pointer "
              >
                {t("common.reserveNow")}
                <span className="ml-3 inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-black text-white">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASectionG1X;
