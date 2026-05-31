import React from "react";
import type { Metadata } from "next";
import G1XHero from "./components/hero";
import AboutG1X from "./components/aboutG1X";
import ThreesixtyG1X from "./components/threesixty";
import G1XGallery from "./components/g1xGallery";
import {
  ProductKeyStats,
  ProductVideoStrip,
  ProductTwoUp,
  ProductTestimonials,
  ProductSimplifiedSpecs,
  ProductReserveCTA,
} from "@/components/product/ProductSections";

const BASE = "https://www.gritmotorcycles.com";

export const metadata: Metadata = {
  title: "GR1T G1X Scrambler | Electric Motorcycle | 150 km Range, 130 km/h",
  description:
    "The GR1T G1X Scrambler is an Italian-designed electric motorcycle for city and trail — 150 km range, 130 km/h top speed, 36 hp peak power, two removable batteries, and a best-in-class 190 kg two-up payload.",
  alternates: {
    canonical: `${BASE}/G1X`,
    languages: {
      en: `${BASE}/G1X`,
      it: `${BASE}/it/G1X`,
      "x-default": `${BASE}/G1X`,
    },
  },
  openGraph: {
    title: "GR1T G1X Scrambler | Electric Motorcycle",
    description:
      "Italian-designed scrambler for city + trail: 150 km range, 130 km/h, 36 hp peak power, two removable batteries, 190 kg two-up payload.",
    url: `${BASE}/G1X`,
    images: [{ url: `${BASE}/grit-g1x/hero.jpg`, width: 1200, height: 630, alt: "GR1T G1X Scrambler motorcycle" }],
  },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "GR1T G1X Scrambler",
  brand: { "@type": "Brand", name: "GR1T Motorcycles" },
  image: `${BASE}/grit-g1x/hero.jpg`,
  description:
    "The GR1T G1X Scrambler is an Italian-designed electric motorcycle for city and trail with 150 km range, 130 km/h top speed, 36 hp peak power, two removable batteries, and a 190 kg two-up payload.",
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    url: `${BASE}/G1X`,
  },
};

const G1X_MODEL = {
  modelCode: "G1X" as const,
  modelName: "G1X Scrambler",
  specsHref: "/G1X/specs",
};

const G1XPage = () => {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      {/* Mirrors the G1S product page structure — same shared sections, G1X-specific data. */}
      <G1XHero />
      <ProductKeyStats model={G1X_MODEL} />
      <ProductVideoStrip model={G1X_MODEL} />
      <AboutG1X />
      <ProductTwoUp model={G1X_MODEL} />
      <ThreesixtyG1X />
      <G1XGallery />
      <ProductTestimonials model={G1X_MODEL} />
      <ProductSimplifiedSpecs model={G1X_MODEL} />
      <ProductReserveCTA model={G1X_MODEL} />
    </>
  );
};

export default G1XPage;
