"use client";
import React, { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

const CTASection = () => {
  const { t } = useLanguage();
  const [showSelector, setShowSelector] = useState(false);
  const router = useRouter();
  const openSelector = useCallback(() => setShowSelector(true), []);
  const closeSelector = useCallback(() => setShowSelector(false), []);
  return (
    <section className=" bg-white">
      <div className="w-full">
        <div className="relative w-full h-[20rem] md:h-[30rem] lg:h-[36rem] overflow-hidden">
          <Image
            src="/Home/cta-bg.png"
            alt="GR1T Founder's Club CTA background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            quality={90}
          />

          {/* Centered overlay panel */}
          <div className=" absolute inset-0 flex items-center justify-center p-4 md:p-6">
            <div className="bg-black/45 md:bg-black/40 backdrop-blur-sm rounded-2xl shadow-xl px-6 py-8 md:px-10 md:py-10 max-w-6xl w-full">
              <h3 className="text-white text-xl md:text-3xl lg:text-4xl font-semibold leading-tight text-center">
                {t("cta.promo.foundersTitle")}
              </h3>

              <div className="mt-6 md:mt-8 flex items-center justify-center gap-3">
                <button
                  onClick={openSelector}
                  className="inline-flex items-center gap-3 px-5 md:px-6 py-2.5 md:py-3 rounded-full bg-white text-black font-semibold shadow-sm hover:bg-gray-100 hover:cursor-pointer transition "
                >
                  {t("common.reserveNow")}
                  <span className="inline-flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-black text-white">
                    {/* arrow */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M5 12h12M12 5l7 7-7 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
              </div>

              <p className="mt-3 text-center text-white/90 text-xs md:text-sm">
                {t("cta.refundableLine")}
                <Link href="/founders-circle" target="_blank" className="underline underline-offset-2 hover:text-white mr-2">
                  <br />
                  {t("cta.faqLabel")}
                </Link>
                {` ${t("cta.andConnector")} `}
                <Link
                  href="/legal/reservation-terms"
                  target="_blank"
                  className="ml-2 underline underline-offset-2 hover:text-white"
                >
                  {t("cta.termsLabel")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {showSelector && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={closeSelector} />
          <div
            role="dialog"
            aria-modal="true"
            className="relative mx-4 w-full max-w-sm md:max-w-2xl lg:max-w-3xl rounded-2xl bg-white shadow-xl p-5 md:p-8 lg:p-10 max-h-[85vh] overflow-y-auto overscroll-contain"
          >
            <button
              aria-label="Close"
              onClick={closeSelector}
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <h4 className="text-xl md:text-2xl lg:text-3xl font-semibold text-black text-center">Choose your GR1T</h4>
            <p className="mt-2 text-sm md:text-base lg:text-lg text-gray-600 text-center">Select a model to continue.</p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              <button
                type="button"
                aria-label="Choose G1S"
                className="group rounded-xl border border-gray-200 hover:border-orange-500 bg-gray-50 hover:bg-gray-100 p-4 shadow-sm hover:shadow-md transition"
                onClick={() => router.push("/checkout?model=G1S")}
              >
                <div className="relative w-full h-40 md:h-64 lg:h-80">
                  <Image
                    src="/Home/bikes/G1S.png"
                    alt="G1S"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    className="object-contain"
                  />
                </div>
                <div className="mt-3 text-center">
                  <span className="text-base md:text-lg lg:text-xl font-semibold text-black">G1S</span>
                </div>
              </button>
              <button
                type="button"
                aria-label="Choose G1X"
                className="group rounded-xl border border-gray-200 hover:border-orange-500 bg-gray-50 hover:bg-gray-100 p-4 shadow-sm hover:shadow-md transition"
                onClick={() => router.push("/checkout?model=G1X")}
              >
                <div className="relative w-full h-40 md:h-64 lg:h-80">
                  <Image
                    src="/Home/bikes/G1X.png"
                    alt="G1X"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    className="object-contain"
                  />
                </div>
                <div className="mt-3 text-center">
                  <span className="text-base md:text-lg lg:text-xl font-semibold text-black">G1X</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CTASection;
