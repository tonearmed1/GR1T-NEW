import React, { Suspense } from "react";
import type { Metadata } from "next";
import Hero from "./components/hero";
import SearchBar from "./components/SearchBar";
import TopicCards from "./components/TopicCards";
import StillStuckCTA from "./components/StillStuckCTA";
import FAQBrowser from "@/components/FAQBrowser";
import FAQPageSchema from "./FAQPageSchema";

const BASE = "https://www.gritmotorcycles.com";

export const metadata: Metadata = {
  title: "Help Center | GR1T Motorcycles",
  description:
    "Answers about the GR1T G1S Street and G1X Scrambler — specs, battery, charging, licence requirements, reservations, delivery, warranty and more. Search or browse by topic.",
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
      {/* JSON-LD FAQPage schema for SEO — emits all questions + plain-text answers */}
      <FAQPageSchema />

      {/* Help Center structure:
            Hero          → page title (left-aligned to match content)
            SearchBar     → above topic cards, writes URL ?q= to share state with FAQBrowser
            TopicCards    → 5 clickable cards, deep-link to FAQBrowser categories via URL hash
            FAQBrowser    → accordion only (pills removed; cards do the category job).
                            Reads ?q + #category- from URL. Light theme.
            StillStuckCTA → contact fallback for the visitor we didn't answer
          Suspense wrapper is required for useSearchParams in client children. */}
      <Hero />
      <Suspense fallback={null}>
        <SearchBar />
      </Suspense>
      <TopicCards />
      <section id="faqs">
        <Suspense fallback={null}>
          <FAQBrowser />
        </Suspense>
      </section>
      <StillStuckCTA />
    </>
  );
}
