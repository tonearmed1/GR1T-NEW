"use client";
import React from "react";
import Image from "next/image";

const FAQsHero = () => {
  return (
    <section className="relative min-h-[23vh] md:min-h-[25vh]  bg-white w-full overflow-hidden">
      {/* Hero Image Background */}
      <div className="absolute inset-0 -z-10">
        {/* <Image src="/HERO_FAQ.jpg" alt="Contact Hero" fill className="object-cover" sizes="100vw" priority /> */}
        {/* Dark overlay for better text visibility */}
        {/* <div className="absolute inset-0 bg-black opacity-40"></div> */}
      </div>

      <div className="absolute bottom-1/8 z-10 w-full flex justify-center">
        <div className="max-w-7xl w-full px-4 md:px-8 mx-auto">
          <div className="mb-4">
            <h2 className="text-black font-britti text-3xl sm:text-5xl font-semibold">Frequently Asked Questions</h2>
          </div>

          {/* <div className="flex flex-col sm:flex-row justify-between text-white mt-2 border-t border-white pt-4 sm:pt-6 w-full">
            <div>
              <p className="text-2xl sm:text-3xl text-white mb-2">
                Welcome to the GR1T Founder’s Circle — a limited-time opportunity for early supporters of our mission to transform
                electric mobility.
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default FAQsHero;
