import React from "react";
import type { Metadata } from "next";
import G1XHero from "./components/hero";
import AboutG1X from "./components/aboutG1X";
import SpecsSectionsG1X from "./components/specs";
import ThreesixtyG1X from "./components/threesixty";

const BASE = "https://www.gritmotorcycles.com";

export const metadata: Metadata = {
  title: "GR1T G1X Off-Road | Electric Motorcycle | 150 km Range, 130 km/h",
  description:
    "The GR1T G1X is an Italian-designed off-road electric motorcycle with 150 km range, 130 km/h top speed, 36 hp peak power and two removable batteries. Built for adventure.",
  alternates: {
    canonical: `${BASE}/G1X`,
    languages: {
      en: `${BASE}/G1X`,
      it: `${BASE}/it/G1X`,
      "x-default": `${BASE}/G1X`,
    },
  },
  openGraph: {
    title: "GR1T G1X Off-Road | Electric Motorcycle",
    description:
      "Italian-designed off-road electric motorcycle: 150 km range, 130 km/h, 36 hp peak power, two removable batteries.",
    url: `${BASE}/G1X`,
    images: [{ url: `${BASE}/grit-g1x/hero.jpg`, width: 1200, height: 630, alt: "GR1T G1X off-road motorcycle" }],
  },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "GR1T G1X Off-Road",
  brand: { "@type": "Brand", name: "GR1T Motorcycles" },
  image: `${BASE}/grit-g1x/hero.jpg`,
  description:
    "The GR1T G1X is an Italian-designed off-road electric motorcycle with 150 km range, 130 km/h top speed, 36 hp peak power and two removable batteries.",
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    url: `${BASE}/G1X`,
  },
};

const G1XPage = () => {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <G1XHero />
      <AboutG1X />
      <ThreesixtyG1X />
      <SpecsSectionsG1X />
      {/* <CTASection /> */}
      {/* <Reserving /> */}

      {/* <G1XGallery /> */}
      {/* <GalleryTwoSection /> */}
      {/* <EICMASection /> */}
    </>
  );
};

export default G1XPage;
