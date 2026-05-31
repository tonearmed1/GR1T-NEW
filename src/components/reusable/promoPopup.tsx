"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

import Link from "next/link";

const PromoPopup = () => {
  const { t } = useLanguage();
  // Controls animated visibility
  const [open, setOpen] = useState(false);

  // Delay showing by 15s with animated entrance
  useEffect(() => {
    const showTimer = setTimeout(() => setOpen(true), 2_500);
    return () => clearTimeout(showTimer);
  }, []);

  // // Auto-close 90s after it becomes visible, with animated exit
  // useEffect(() => {
  //   if (!open) return;
  //   const hideTimer = setTimeout(() => setOpen(false), 20_000);
  //   return () => clearTimeout(hideTimer);
  // }, [open]);

  return (
    <div
      className={`fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] inset-x-4 sm:inset-auto sm:bottom-6 sm:right-6 z-50 transition-all duration-300 ease-out ${
        open ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" : "opacity-0 translate-y-3 scale-95 pointer-events-none"
      }`}
      aria-live="polite"
      aria-atomic="true"
      aria-hidden={!open}
    >
      <div className="relative w-full sm:w-[450px] max-w-[500px] rounded-2xl bg-white text-black shadow-2xl border border-blue-200/60  overflow-hidden">
        {/* Close button */}
        <button
          aria-label={t("promo.popup.closeAriaLabel")}
          onClick={() => setOpen(false)}
          className="text-3xl absolute top-2 right-2 h-7 w-7 flex items-center justify-center rounded-full bg-white text-black  shadow-md hover:bg-white hover:text-black hover:cursor-pointer"
        >
          ×
        </button>

        <div className="px-5 sm:px-6 py-4 sm:py-5 mb-4 bg-black text-white text-center">
          <div className="text-xl sm:text-2xl font-extrabold tracking-wide">{t("promo.popup.title")}</div>
          {/* <div className="text-2xl sm:text-3xl font-extrabold tracking-wide"></div> */}
          <div className="mt-1 text-lg sm:text-xl text-white font-bold">{t("promo.popup.discount")}</div>
        </div>

        {/* Content rows (glassy white, slightly transparent with blur) */}
        <div className="px-5 sm:px-6 pb-5 space-y-3 bg-white/60 backdrop-blur-sm text-black text-center flex flex-col items-center justify-center ">
          <div className="flex items-center justify-center gap-1 text-center">
            <span className="inline-flex items-center justify-center rounded-lg bg-white/90  py-1 text-xl sm:text-2xl font-semibold"></span>
            <span className="text-base sm:text-lg text-nowrap">{t("promo.popup.depositLine")}</span>
          </div>
          <div className="flex items-center justify-center gap-1 text-center">
            {/* <span className="inline-flex items-center justify-center rounded-lg bg-white/90 px-3 py-1 text-xl sm:text-2xl font-semibold">
              €1,500
            </span> */}
            <span className="text-base sm:text-lg text-nowrap">{t("promo.popup.refundableLine")}</span>
          </div>

          <div className="pt-2 flex flex-row items-center ">
            <Link
              href="/checkout?model=G1S"
              className="text-nowrap inline-flex items-center justify-center gap-2  w-full sm:w-auto rounded-full bg-orange-500 text-white px-2 py-1 text-base sm:text-base hover:bg-black/90"
            >
              {t("common.reserveNow")}
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-black">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
            <Link
              href="/founders-circle"
              target="_blank"
              className=" ml-2 inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-full  text-orange-600   px-2 py-1 text-base sm:text-lg "
            >
              {t("common.details")}
            </Link>
          </div>
          {/* <p className="mt-3  text-black/80 text-base md:text-xl"> */}
          {/* </p> */}
        </div>
      </div>
    </div>
  );
};

export default PromoPopup;
