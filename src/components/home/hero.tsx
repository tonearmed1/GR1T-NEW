"use client";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative h-screen w-full overflow-hidden text-white">
      {/* Background video */}
      <video
        src="/Home/GR1T%20Website%20HERO%20Video.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />
      {/* Readability overlay (removed empty overlay; content container below handles layout) */}

      {/* Centered container (parent) */}

      <div className=" mx-auto max-w-6xl lg:max-w-7xl  h-screen z-20  flex items-end md:items-end pb-[4rem] lg:pb-[6rem] ">
        {/* Centered content */}
        <div className="w-full mx-auto">
          {/* GR1T wordmark */}
          <div className="select-none flex justify-start px-4 md:px-0">
            <Image
              src="/Home/GRIT_G1-SERIES.svg"
              alt="GR1T"
              width={256}
              height={78}
              priority
              className="w-36 sm:w-40 md:w-[256px] h-auto"
            />
          </div>

          {/* Divider */}
          {/* <div className="mt-6 h-px w-full bg-white/50" /> */}

          {/* Tagline + Metrics row */}
          <div className="mt-6 md:flex md:flex-row md:items-start md:justify-between md:gap-6">
            <div className="px-4 md:px-0">
              <p className="text-lg md:text-2xl text-white/90 text-nowrap">{t("home.tagline")}</p>
              <div className="mt-6">
                <Link
                  href="/reserve"
                  className="inline-flex items-center gap-2 rounded-full bg-white/90 text-2xl text-black px-7 py-4  md:text-base hover:bg-white transition-colors"
                >
                  {t("common.reserveNow")}
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-black text-white">
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
              </div>
            </div>

            {/* Metrics horizontally, hidden on small screens */}
            {/* <div className="hidden md:flex flex-row items-start gap-6 xl:gap-8 text-nowrap">
              {[
                { value: "150 km", label: t("home.specs.range") },
                { value: "130 km/h", label: t("home.specs.topSpeed") },
                { value: "190 kg", label: t("home.specs.capacity") },
                { value: "36 Hp", label: t("home.specs.power") },
                { value: "2", label: t("home.specs.batteries") },
              ].map((m) => (
                <div key={m.value} className="min-w-[120px]">
                  <div className="text-3xl md:text-4xl font-semibold leading-tight tracking-tight">{m.value}</div>
                  <div className="mt-1 text-base md:text-lg text-white/80 leading-4 ">{m.label}</div>
                </div>
              ))}
            </div> */}
          </div>

          {/* CTA */}
        </div>
      </div>
    </section>
  );
}
