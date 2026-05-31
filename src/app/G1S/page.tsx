import React from "react";
import type { Metadata } from "next";
import MirageHero from "./components/hero";
import AboutMirage from "./components/aboutMirage";
import Threesixty from "./components/threesixty";
import SpecsSections from "./components/specs";
import CTASection from "./components/cta";
import EICMASection from "@/components/reusable/EICMA";

import Reserving from "./components/reserving";
import G1SGallery from "./components/g1sGallery";

const BASE = "https://www.gritmotorcycles.com";

export const metadata: Metadata = {
  title: "GR1T G1S Street | Electric Motorcycle | 150 km Range, 130 km/h",
  description:
    "The GR1T G1S Street is an Italian-designed electric motorcycle with 150 km range, 130 km/h top speed, 36 hp peak power and two removable batteries. Discover specs and reserve yours.",
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
      "Italian-designed electric motorcycle: 150 km range, 130 km/h, 36 hp peak power, two removable batteries.",
    url: `${BASE}/G1S`,
    images: [{ url: `${BASE}/mirage/hero.jpg`, width: 1200, height: 630, alt: "GR1T G1S Street motorcycle" }],
  },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "GR1T G1S Street",
  brand: { "@type": "Brand", name: "GR1T Motorcycles" },
  image: `${BASE}/mirage/hero.jpg`,
  description:
    "The GR1T G1S Street is an Italian-designed electric motorcycle with 150 km range, 130 km/h top speed, 36 hp peak power and two removable batteries.",
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
  sameAs: [
    "https://www.instagram.com/gr1tmotorcycles",
  ],
};

const Mirage = () => {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <MirageHero />
      <AboutMirage />
      <Threesixty />
      <SpecsSections />
      {/* <CTASection /> */}
      {/* <Reserving /> */}
      <G1SGallery />
      {/* <EICMASection /> */}
    </>
  );
};

export default Mirage;
