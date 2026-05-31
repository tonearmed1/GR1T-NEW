"use client";
import Hero from "@/components/home/hero";
import PressStrip from "@/components/home/PressStrip";
import BikesSection from "@/components/home/bikesSection";
import TechFeatures from "@/components/home/TechFeatures";
import GR1Tstagram from "@/components/home/GR1Tstagram";

import CTATwoSection from "@/components/home/cta2";

import FAQSection from "@/components/home/FAQ";
import { useEffect } from "react";

export default function Home() {
  // Smooth scroll to #faqs when arriving on the homepage with a hash
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#faqs") {
      const el = document.getElementById("faqs");
      if (el) {
        // Slight delay to ensure layout is settled
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
      }
    }
  }, []);

  return (
    <div className="w-full">
      <Hero />
      <PressStrip />
      <BikesSection />
      {/* New consolidated tech story (replaces both the old 4-card GallerySection
          on the homepage AND the standalone /tech page). */}
      <TechFeatures />
      {/* GalleryTwoSection replaced with the full-width Instagram strip "GR1Tstagram".
          Falls back to a placeholder grid until NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN is set. */}
      <GR1Tstagram />
      <CTATwoSection />
      <FAQSection />
    </div>
  );
}
