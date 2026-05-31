"use client";

import React from "react";
import Image from "next/image";
import heroImg from "../../../../public/grit-g1/01_g1s.png";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const AboutG1S = () => {
  const { t } = useLanguage();
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="container mx-auto px-4 md:px-0 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text Column */}
          <div className="lg:col-span-6">
            <h1 className="text-black font-bold leading-tight text-2xl sm:text-3xl lg:text-4xl">{t("g1s.about.title")}</h1>

            <p className="mt-6 text-gray-800 max-w-xl text-lg">{t("g1s.about.description")}</p>

            <div className="mt-6">
              <Link href="/checkout?model=G1S" className="inline-flex items-center rounded-full bg-black text-white px-5 py-3">
                <span className="mr-3">{t("common.reserveNow")}</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M13.172 12l-4.95 4.95 1.414 1.414L16 12l-6.364-6.364-1.414 1.414z" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          {/* Image Column */}
          <div className="lg:col-span-6">
            <div className="relative w-full h-72 sm:h-96 lg:h-[520px] rounded-xl overflow-hidden">
              <Image
                src={heroImg}
                alt="GR1T side panel close-up"
                fill
                className="object-cover"
                priority
                placeholder="blur"
                quality={30}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutG1S;
