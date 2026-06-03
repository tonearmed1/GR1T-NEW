"use client";
import Hero from "@/components/home/hero";
import PressStrip from "@/components/home/PressStrip";
import BikesSection from "@/components/home/bikesSection";
import TechFeatures from "@/components/home/TechFeatures";
import HeritageSection from "@/components/home/HeritageSection";
import GR1Tstagram from "@/components/home/GR1Tstagram";
import CTATwoSection from "@/components/home/cta2";
import FAQSection from "@/components/home/FAQ";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#faqs") {
      const el = document.getElementById("faqs");
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
      }
    }
  }, []);

  return (
    <div className="w-full">
      <Hero />
      <PressStrip />
      <BikesSection />
      <TechFeatures />
      <HeritageSection />
      <CTATwoSection />
      <GR1Tstagram />
      <FAQSection />
    </div>
  );
}
