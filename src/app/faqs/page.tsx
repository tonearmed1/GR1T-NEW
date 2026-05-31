import React, { Suspense } from "react";
import type { Metadata } from "next";
import Hero from "./components/hero";
import SearchBar from "./components/SearchBar";
import HelpCenterContent from "./components/HelpCenterContent";
import StillStuckCTA from "./components/StillStuckCTA";
import FAQPageSchema from "./FAQPageSchema";

const BASE = "https://www.gritmotorcycles.com";

export const metadata: Metadata = {
  title: "Help Center | GR1T Motorcycles",
  description:
    "Browse answers about the GR1T G1S Street and G1X Scrambler — specs, battery, charging, licence requirements, reservations, delivery, warranty. Search or pick a topic.",
  alternates: {
    canonical: `${BASE}/faqs`,
    languages: {
      en: `${BASE}/faqs`,
      it: `${BASE}/it/faqs`,
      "x-default": `${BASE}/faqs`,
    },
  },
  openGraph: {
    title: "Help Center | GR1T Motorcycles",
    description: "Everything you need to know before you reserve a GR1T G1.",
    url: `${BASE}/faqs`,
  },
};

export default function FaqsPage() {
  return (
    <>
      {/* Full FAQPage schema lives on the root — covers all 23 questions across categories.
          Each category page also emits its own schema for that subset. */}
      <FAQPageSchema />

      {/* Help Center landing structure (DAB / Maeving pattern):
            Hero            → page title (left-aligned)
            SearchBar       → above content, writes URL ?q= for cross-category search
            HelpCenterContent → topic cards by default; search results when ?q= is active
            StillStuckCTA   → dark contact fallback band
          Long category Q&A lists now live at /faqs/[category] (motorcycles, battery, etc.) */}
      <Hero />
      <Suspense fallback={null}>
        <SearchBar />
      </Suspense>
      <Suspense fallback={null}>
        <HelpCenterContent />
      </Suspense>
      <StillStuckCTA />
    </>
  );
}
