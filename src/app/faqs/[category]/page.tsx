import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryFAQs from "./CategoryFAQs";
import StillStuckCTA from "../components/StillStuckCTA";
import CategoryFAQSchema from "./CategoryFAQSchema";

const BASE = "https://www.gritmotorcycles.com";

/**
 * Help Center category page — one URL per topic (Motorcycles, Battery & Charging, etc.).
 * Inspired by Maeving's and DAB's help-centre structure: each topic lives on its own page
 * so the main /faqs page stays short and each category gets its own SEO-friendly URL.
 *
 * Routing: this is /faqs/[category] — Next dynamic segment. Valid values are listed in
 * generateStaticParams; anything else returns 404.
 */

type CategorySlug =
  | "about"
  | "motorcycles"
  | "battery"
  | "buying"
  | "licence"
  | "warranty"
  | "customisation";

const VALID: ReadonlyArray<CategorySlug> = [
  "about",
  "motorcycles",
  "battery",
  "buying",
  "licence",
  "warranty",
  "customisation",
];

const META: Record<
  CategorySlug,
  { titleEN: string; titleIT: string; descEN: string; descIT: string }
> = {
  about: {
    titleEN: "About GR1T — Help Center",
    titleIT: "Su GR1T — Centro assistenza",
    descEN: "Who GR1T is, where we're based, where the motorcycles are made, and how to reach us.",
    descIT: "Chi è GR1T, dove abbiamo sede, dove sono costruite le motociclette e come contattarci.",
  },
  motorcycles: {
    titleEN: "Bike Specs — Help Center",
    titleIT: "Specifiche — Centro assistenza",
    descEN: "Full G1S and G1X specifications, performance, tyres, dimensions and licence requirements.",
    descIT: "Specifiche complete G1S e G1X, prestazioni, pneumatici, dimensioni e requisiti di patente.",
  },
  battery: {
    titleEN: "Battery & Charging — Help Center",
    titleIT: "Batteria & Ricarica — Centro assistenza",
    descEN: "How GR1T's removable batteries work, charging times, and where you can plug in.",
    descIT: "Come funzionano le batterie rimovibili GR1T, tempi di ricarica e dove ricaricare.",
  },
  buying: {
    titleEN: "Reservations & Delivery — Help Center",
    titleIT: "Prenotazioni & Consegna — Centro assistenza",
    descEN: "How to reserve a GR1T, refund policy, delivery timing, financing and availability.",
    descIT: "Come prenotare una GR1T, politica di rimborso, tempi di consegna, finanziamento e disponibilità.",
  },
  licence: {
    titleEN: "Licence & Legal — Help Center",
    titleIT: "Patente & Normative — Centro assistenza",
    descEN: "Licence requirements per country, motorway use, and EU homologation status.",
    descIT: "Requisiti di patente per Paese, uso in autostrada e stato di omologazione UE.",
  },
  warranty: {
    titleEN: "Warranty & Support — Help Center",
    titleIT: "Garanzia & Assistenza — Centro assistenza",
    descEN: "GR1T warranty terms, the GR1T App, theft protection, and how to get support.",
    descIT: "Termini di garanzia GR1T, l'app GR1T, protezione antifurto e come ricevere assistenza.",
  },
  customisation: {
    titleEN: "Customisation — Help Center",
    titleIT: "Personalizzazione — Centro assistenza",
    descEN: "Configurator options, colours, accessories, after-delivery wraps and warranty rules.",
    descIT: "Opzioni del configuratore, colori, accessori, wrap dopo la consegna e regole di garanzia.",
  },
};

export async function generateStaticParams() {
  return VALID.map((category) => ({ category }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ category: string }> }
): Promise<Metadata> {
  const { category } = await params;
  if (!VALID.includes(category as CategorySlug)) {
    return { title: "Help Center | GR1T Motorcycles" };
  }
  const m = META[category as CategorySlug];
  return {
    title: `${m.titleEN} | GR1T Motorcycles`,
    description: m.descEN,
    alternates: {
      canonical: `${BASE}/faqs/${category}`,
      languages: {
        en: `${BASE}/faqs/${category}`,
        it: `${BASE}/it/faqs/${category}`,
        "x-default": `${BASE}/faqs/${category}`,
      },
    },
    openGraph: {
      title: `${m.titleEN} | GR1T Motorcycles`,
      description: m.descEN,
      url: `${BASE}/faqs/${category}`,
    },
  };
}

export default async function CategoryPage(
  { params }: { params: Promise<{ category: string }> }
) {
  const { category } = await params;
  if (!VALID.includes(category as CategorySlug)) {
    notFound();
  }
  const slug = category as CategorySlug;

  return (
    <>
      {/* Schema.org FAQPage for this specific category — Google can render Q&A snippets */}
      <CategoryFAQSchema category={slug} />
      <CategoryFAQs category={slug} />
      <StillStuckCTA />
    </>
  );
}
