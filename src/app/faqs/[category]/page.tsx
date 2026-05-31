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

type CategorySlug = "motorcycles" | "battery" | "buying" | "licence" | "warranty";

const VALID: ReadonlyArray<CategorySlug> = [
  "motorcycles",
  "battery",
  "buying",
  "licence",
  "warranty",
];

const META: Record<
  CategorySlug,
  { titleEN: string; titleIT: string; descEN: string; descIT: string }
> = {
  motorcycles: {
    titleEN: "Motorcycles — Help Center",
    titleIT: "Motociclette — Centro assistenza",
    descEN: "Specs, performance, models, tyres, and customisation — answers about the GR1T G1 Series.",
    descIT: "Specifiche, prestazioni, modelli, pneumatici e personalizzazione — domande sulla GR1T G1 Series.",
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
