import React from "react";
import type { Metadata } from "next";
import G1SHero from "./components/hero";
import AboutG1S from "./components/aboutG1S";
import Threesixty from "./components/threesixty";
import G1SGallery from "./components/g1sGallery";
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
  title: "GR1T G1S Street | Electric Motorcycle | 150 km Range, 130 km/h",
  description:
    "The GR1T G1S Street is an Italian-designed electric motorcycle with 150 km range, 130 km/h top speed, 36 hp peak power, two removable batteries, and a best-in-class 190 kg two-up payload.",
  alternates: {
    canonical: `${BASE}/G1S`,
    languages: {
      en: `${BASE}/G1S`,
      it: `${BASE}/it/G1S`,
      "x-default": `${BASE}/G1S`,
    },
  },
  openGraph: {
    title: "GR1T G1S Street | Electric Motorcycle",
    description:
      "Italian-designed electric motorcycle: 150 km range, 130 km/h, 36 hp peak power, two removable batteries, 190 kg two-up payload.",
    url: `${BASE}/G1S`,
    images: [{ url: `${BASE}/grit-g1/hero.jpg`, width: 1200, height: 630, alt: "GR1T G1S Street motorcycle" }],
  },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "GR1T G1S Street",
  brand: { "@type": "Brand", name: "GR1T Motorcycles" },
  image: `${BASE}/grit-g1/hero.jpg`,
  description:
    "The GR1T G1S Street is an Italian-designed electric motorcycle with 150 km range, 130 km/h top speed, 36 hp peak power, two removable batteries, and a 190 kg two-up payload.",
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    url: `${BASE}/G1S`,
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GR1T Motorcycles",
  url: BASE,
  logo: `${BASE}/LOGO_big_BLACK.svg`,
  sameAs: ["https://www.instagram.com/gr1tmotorcycles"],
};

const G1S_MODEL = {
  modelCode: "G1S" as const,
  modelName: "G1S Street",
  specsHref: "/G1S/specs",
};

const G1SPage = () => {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      {/* New product page structure (rebuild May 2026):
          hero (shorter) → key stats with 190 kg highlighted → video strip → description →
          two-up spotlight → 360 view → gallery → testimonials → simplified specs → reserve CTA.
          Full detailed specs page still lives at /G1S/specs (linked from ProductSimplifiedSpecs). */}
      <G1SHero />
      <ProductKeyStats model={G1S_MODEL} />
      <ProductVideoStrip model={G1S_MODEL} />
      <AboutG1S />
      <ProductTwoUp model={G1S_MODEL} />
      <Threesixty />
      <G1SGallery />
      <ProductTestimonials model={G1S_MODEL} />
      <ProductSimplifiedSpecs model={G1S_MODEL} />
      <ProductReserveCTA model={G1S_MODEL} />
    </>
  );
};

export default G1SPage;
