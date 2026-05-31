import React from "react";
import type { Metadata } from "next";
import Hero from "./components/hero";
import FAQBrowser from "@/components/FAQBrowser";
import FAQPageSchema from "./FAQPageSchema";

const BASE = "https://www.gritmotorcycles.com";

export const metadata: Metadata = {
  title: "FAQ | GR1T Motorcycles",
  description:
    "Answers about the GR1T G1S Street and G1X Scrambler — specs, battery, charging, licence requirements, reservations, delivery, warranty and more. Search or browse by category.",
  alternates: {
    canonical: `${BASE}/faqs`,
    languages: {
      en: `${BASE}/faqs`,
      it: `${BASE}/it/faqs`,
      "x-default": `${BASE}/faqs`,
    },
  },
  openGraph: {
    title: "FAQ | GR1T Motorcycles",
    description: "Everything you need to know before you reserve a GR1T G1.",
    url: `${BASE}/faqs`,
  },
};

export default function FaqsPage() {
  return (
    <>
      {/* JSON-LD FAQPage schema for SEO — emits all questions + plain-text answers */}
      <FAQPageSchema />
      <Hero />
      <section id="faqs">
        <FAQBrowser />
      </section>
    </>
  );
}
