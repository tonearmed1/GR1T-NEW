import type { Metadata } from "next";
import G1Platform from "./G1Platform";
import { getVariant } from "@/data/g1-variants";

const BASE = "https://www.gritmotorcycles.com";

/**
 * /motorcycles/g1 — default landing for the G1 platform.
 * Pre-selects the G1S Street variant (the entry-level / most-asked-about variant).
 * Deep-links to specific variants (/motorcycles/g1/street, /scrambler, /race)
 * are handled by /motorcycles/g1/[variant]/page.tsx.
 */

const defaultVariant = getVariant("street");

export const metadata: Metadata = {
  title: "GR1T G1 Platform | Three characters, one platform | Electric motorcycle",
  description:
    "The GR1T G1 platform — G1S Street, G1X Scrambler and G1R Race. Same DNA, same Italian engineering, three distinct characters. 150 km range, 130 km/h, 190 kg payload, two removable batteries.",
  alternates: {
    canonical: `${BASE}/motorcycles/g1`,
    languages: {
      en: `${BASE}/motorcycles/g1`,
      it: `${BASE}/it/motorcycles/g1`,
      "x-default": `${BASE}/motorcycles/g1`,
    },
  },
  openGraph: {
    title: "GR1T G1 Platform | Three characters, one platform",
    description:
      "G1S Street, G1X Scrambler, G1R Race — three characters, one Italian-engineered electric platform.",
    url: `${BASE}/motorcycles/g1`,
    images: [{ url: `${BASE}${defaultVariant.heroImage}`, width: 1200, height: 630, alt: "GR1T G1 Platform" }],
  },
};

export default function G1PlatformPage() {
  return <G1Platform initialVariant="street" />;
}
