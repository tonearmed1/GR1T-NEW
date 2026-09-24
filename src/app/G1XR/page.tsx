import React from "react";
import type { Metadata } from "next";
import G1XRHero from "./components/hero";
import AboutG1XR from "./components/aboutG1XR";
import G1XRGallery from "./components/g1xrGallery";
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
  title: "GR1T G1XR Raider | Electric Motorcycle | 150 km Range, 130 km/h",
  description:
    "The GR1T G1XR Raider is the most purposeful motorcycle in the G1 family — rugged, utilitarian, built for riders who demand more from their machine. 150 km range, 130 km/h, two removable batteries.",
  alternates: {
    canonical: `${BASE}/G1XR`,
    languages: {
      en: `${BASE}/G1XR`,
      it: `${BASE}/it/G1XR`,
      "x-default": `${BASE}/G1XR`,
    },
  },
  openGraph: {
    title: "GR1T G1XR Raider | Electric Motorcycle",
    description:
      "The most purposeful motorcycle in the G1 family. 150 km range, 130 km/h, two removable batteries.",
    url: `${BASE}/G1XR`,
    images: [{ url: `${BASE}/grit-g1xr/hero.webp`, width: 1200, height: 630, alt: "GR1T G1XR Raider motorcycle" }],
  },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "GR1T G1XR Raider",
  brand: { "@type": "Brand", name: "GR1T Motorcycles" },
  image: `${BASE}/grit-g1xr/hero.webp`,
  description:
    "The GR1T G1XR Raider is the most purposeful motorcycle in the G1 family — rugged, utilitarian, built for riders who demand more from their machine. 150 km range, 130 km/h, two removable batteries.",
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    url: `${BASE}/G1XR`,
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

const G1XR_MODEL = {
  modelCode: "G1XR" as const,
  modelName: "G1XR Raider",
  specsHref: "/G1XR/specs",
};

const G1XRPage = () => {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <G1XRHero />
      <ProductKeyStats model={G1XR_MODEL} />
      <ProductVideoStrip model={G1XR_MODEL} />
      <AboutG1XR />
      <ProductTwoUp model={G1XR_MODEL} />
      <G1XRGallery />
      <ProductTestimonials model={G1XR_MODEL} />
      <ProductSimplifiedSpecs model={G1XR_MODEL} />
      <ProductReserveCTA model={G1XR_MODEL} />
    </>
  );
};

export default G1XRPage;
