import type { Metadata } from "next";
import ReserveLanding from "./ReserveLanding";

const BASE = "https://www.gritmotorcycles.com";

export const metadata: Metadata = {
  title: "Reserve your GR1T G1 | €100 refundable. Be among the first to ride.",
  description:
    "Secure your build slot for the GR1T G1S Street or G1X Scrambler. €100 refundable deposit, priority access to configuration, founder's gift, delivered early 2027.",
  alternates: {
    canonical: `${BASE}/reserve`,
    languages: {
      en: `${BASE}/reserve`,
      it: `${BASE}/it/reserve`,
      "x-default": `${BASE}/reserve`,
    },
  },
  openGraph: {
    title: "Reserve your GR1T G1 | €100 refundable",
    description:
      "Be among the first to ride a GR1T. €100 secures your priority build slot. Fully refundable.",
    url: `${BASE}/reserve`,
    images: [{ url: `${BASE}/Home/hero.jpg`, width: 1200, height: 630, alt: "GR1T G1 — reserve your motorcycle" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reserve your GR1T G1 | €100 refundable",
    description: "Be among the first to ride a GR1T. €100 secures your priority build slot.",
    images: [`${BASE}/Home/hero.jpg`],
  },
};

const offerSchemaG1S = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "GR1T G1S Street — Reservation",
  brand: { "@type": "Brand", name: "GR1T Motorcycles" },
  image: `${BASE}/Home/bikes/G1S.png`,
  description:
    "Reserve the GR1T G1S Street electric motorcycle with a €100 fully refundable deposit. Priority build slot for early 2027 delivery.",
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    price: "100",
    availability: "https://schema.org/InStock",
    url: `${BASE}/reserve`,
  },
};

const offerSchemaG1X = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "GR1T G1X Scrambler — Reservation",
  brand: { "@type": "Brand", name: "GR1T Motorcycles" },
  image: `${BASE}/Home/bikes/G1X.png`,
  description:
    "Reserve the GR1T G1X Scrambler electric motorcycle with a €100 fully refundable deposit. Priority build slot for early 2027 delivery.",
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    price: "100",
    availability: "https://schema.org/InStock",
    url: `${BASE}/reserve`,
  },
};

export default function ReservePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchemaG1S) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchemaG1X) }} />
      <ReserveLanding />
    </>
  );
}
