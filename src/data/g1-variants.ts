/**
 * G1 variant data — the things that differ between G1S, G1X, and G1R.
 *
 * Single source of truth. To add a future variant (e.g. G1A, G1T), append an
 * entry to G1_VARIANTS below and drop matching imagery into /public/g1-platform/<slug>/.
 * No component code changes required.
 */

export type G1Variant = "street" | "scrambler" | "race";

export interface G1VariantData {
  slug: G1Variant;
  code: "G1S" | "G1X" | "G1R";
  name: { en: string; it: string };
  /** One-line character — appears under the variant name in the hero */
  tagline: { en: string; it: string };
  /** Short emotional positioning — appears on the variant selector tile */
  character: { en: string; it: string };
  /** false = "Coming soon" treatment, no reserve link, no full lifestyle section */
  available: boolean;
  /** Hero background image (full-bleed) */
  heroImage: string;
  /** Profile shot for variant selector tile */
  selectorImage: string;
  /** MSRP — null while unannounced */
  startingPrice: string | null;
  /** Reserve URL passes this as ?model= param to the existing checkout */
  reserveModelParam: "G1S" | "G1X" | "G1R" | null;
  /** Specs that actually differ between variants */
  differences: {
    tyres: string;
    wheels: string;
    suspensionTravel: { en: string; it: string };
    frontDesign: { en: string; it: string };
    racks: { en: string; it: string };
    handProtectors: boolean;
    character: { en: string; it: string };
  };
  /** Variant-specific lifestyle section */
  lifestyle: {
    sectionTitle: { en: string; it: string };
    story: { en: string; it: string };
    images: string[];
  };
}

/* ─────────────────────────────────────────────────────────────────────────── */

export const G1_VARIANTS: G1VariantData[] = [
  /* ─── G1S STREET ────────────────────────────────────────────────────────── */
  {
    slug: "street",
    code: "G1S",
    name: { en: "G1S Street", it: "G1S Street" },
    tagline: {
      en: "Urban freedom.",
      it: "Libertà urbana.",
    },
    character: {
      en: "Engineered for the pulse of the city. A1 / B-licence ready.",
      it: "Progettata per il ritmo della città. Patenti A1 / B.",
    },
    available: true,
    // Using existing assets from /public/grit-g1 and /Home/gallery* as placeholders
    // so the preview deployment renders. Replace with real shots once /public/g1-platform/street/*.jpg exists.
    heroImage: "/grit-g1/hero.jpg",
    selectorImage: "/Home/bikes/G1S.png",
    startingPrice: "€7,000 + VAT",
    reserveModelParam: "G1S",
    differences: {
      tyres: "Pirelli Angel City 110/70-17″ front · 140/70-17″ rear",
      wheels: '17" street alloy',
      suspensionTravel: { en: "120 mm front + rear", it: "120 mm ant. + post." },
      frontDesign: {
        en: "Café-racer headlight, low profile",
        it: "Faro café-racer, profilo basso",
      },
      racks: { en: "Optional rear rack", it: "Portapacchi posteriore opzionale" },
      handProtectors: false,
      character: { en: "Lightweight urban", it: "Urbana leggera" },
    },
    lifestyle: {
      sectionTitle: { en: "Built for the city.", it: "Costruita per la città." },
      story: {
        en: "The G1S is engineered around how you actually move through a city. Lightweight, agile, A1/B-licence ready in most of Europe. Filter traffic on the commute, charge in your apartment, escape on Saturday morning. The bike disappears under you — what's left is the ride.",
        it: "La G1S è costruita attorno al modo in cui ti muovi davvero in città. Leggera, agile, pronta per patenti A1/B nella maggior parte d'Europa. Filtra il traffico, ricarica in casa, scappa il sabato mattina. La moto sparisce sotto di te — resta solo la guida.",
      },
      images: [
        "/Home/gallery2/4.png",
        "/Home/gallery2/5.png",
        "/Home/gallery2/7.jpg",
      ],
    },
  },

  /* ─── G1X SCRAMBLER ─────────────────────────────────────────────────────── */
  {
    slug: "scrambler",
    code: "G1X",
    name: { en: "G1X Scrambler", it: "G1X Scrambler" },
    tagline: {
      en: "Adventure and exploration.",
      it: "Avventura ed esplorazione.",
    },
    character: {
      en: "For the rider who takes the long way home. City + trail.",
      it: "Per chi prende la strada lunga per casa. Città + sentiero.",
    },
    available: true,
    // Using existing assets from /public/grit-g1x as placeholders. Replace with real
    // /public/g1-platform/scrambler/*.jpg when the dedicated shoot lands.
    heroImage: "/grit-g1x/hero.jpg",
    selectorImage: "/Home/bikes/G1X.png",
    startingPrice: "€8,000 + VAT",
    reserveModelParam: "G1X",
    differences: {
      tyres: "Metzeler Karoo Street 110/70-17″ front · 140/70-17″ rear",
      wheels: '17" spoked, scrambler',
      suspensionTravel: { en: "140 mm front + rear", it: "140 mm ant. + post." },
      frontDesign: {
        en: "High-mount headlight + windscreen, hand protectors",
        it: "Faro alto + parabrezza, paramani",
      },
      racks: {
        en: "Full pannier + rear top-box ready (10 kg each)",
        it: "Predisposto per borse laterali + topcase (10 kg ciascuno)",
      },
      handProtectors: true,
      character: { en: "City + trail capable", it: "Città + sentiero" },
    },
    lifestyle: {
      sectionTitle: {
        en: "Leave the asphalt behind.",
        it: "Lascia l'asfalto alle spalle.",
      },
      story: {
        en: "The G1X is the same platform with a different attitude. More suspension travel, dual-purpose tyres, racks ready for proper luggage, hand protectors for cold mornings. Commute on Monday. Disappear into the Apennines on Friday. The bike doesn't ask which.",
        it: "La G1X è la stessa piattaforma con un'attitudine diversa. Più escursione, pneumatici dual-purpose, predisposta per bagagli veri, paramani per le mattine fredde. Pendola il lunedì. Sparisci sull'Appennino il venerdì. La moto non fa domande.",
      },
      images: [
        "/grit-g1x/GR1T_off-road.1.png",
        "/grit-g1x/orange01.jpg",
        "/grit-g1x/orange02.jpg",
      ],
    },
  },

  /* ─── G1R RACE — placeholder until launched ─────────────────────────────── */
  {
    slug: "race",
    code: "G1R",
    name: { en: "G1R Race", it: "G1R Race" },
    tagline: {
      en: "Performance and attitude.",
      it: "Prestazioni e attitudine.",
    },
    character: {
      en: "Coming 2027. The G1 platform, sharpened.",
      it: "In arrivo nel 2027. La piattaforma G1, affilata.",
    },
    available: false,
    // No G1R imagery exists yet — reuse a generic platform shot. The component
    // detects available=false and shows a "Coming 2027" treatment instead of full imagery.
    heroImage: "/grit-g1/hero.jpg",
    selectorImage: "/Home/bikes/G1S.png", // placeholder until G1R imagery exists
    startingPrice: null,
    reserveModelParam: null,
    differences: {
      tyres: "TBD",
      wheels: "TBD",
      suspensionTravel: { en: "TBD", it: "TBD" },
      frontDesign: { en: "TBD", it: "TBD" },
      racks: { en: "Minimal / none", it: "Minimi / nessuno" },
      handProtectors: false,
      character: { en: "Performance", it: "Prestazioni" },
    },
    lifestyle: {
      sectionTitle: {
        en: "Sharper. Stripped back. Coming 2027.",
        it: "Più affilata. Essenziale. In arrivo nel 2027.",
      },
      story: {
        en: "The G1R takes the G1 platform in a sharper direction. We'll share more closer to launch. Join the list to be first.",
        it: "La G1R porta la piattaforma G1 in una direzione più decisa. Condivideremo di più verso il lancio. Iscriviti per essere tra i primi a saperlo.",
      },
      images: [],
    },
  },
];

/* ─── Helpers ────────────────────────────────────────────────────────────── */

export function getVariant(slug: G1Variant): G1VariantData {
  const v = G1_VARIANTS.find((x) => x.slug === slug);
  if (!v) throw new Error(`Unknown G1 variant: ${slug}`);
  return v;
}

export function isValidVariant(slug: string): slug is G1Variant {
  return G1_VARIANTS.some((v) => v.slug === slug);
}

export const VARIANT_SLUGS: G1Variant[] = G1_VARIANTS.map((v) => v.slug);
