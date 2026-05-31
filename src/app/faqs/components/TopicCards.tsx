"use client";

import Link from "next/link";
import { CATEGORY_LABELS, FAQCategory, useFAQs } from "@/data/faqs";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Topic cards — 5 large clickable cards above the FAQBrowser on /faqs.
 * Each card links to the FAQBrowser below with a URL hash that pre-selects
 * the matching category. Inspired by Maeving's Help Center structure.
 */

const TOPICS: Array<{
  slug: FAQCategory;
  icon: string;
  description: { en: string; it: string };
}> = [
  {
    slug: "motorcycles",
    icon: "M",
    description: {
      en: "Specs, performance, models and tyres",
      it: "Specifiche, prestazioni, modelli e pneumatici",
    },
  },
  {
    slug: "battery",
    icon: "⚡",
    description: {
      en: "Charging times, removable packs, range",
      it: "Tempi di ricarica, batterie rimovibili, autonomia",
    },
  },
  {
    slug: "buying",
    icon: "€",
    description: {
      en: "Reservations, delivery, pricing, financing",
      it: "Prenotazioni, consegna, prezzi, finanziamento",
    },
  },
  {
    slug: "licence",
    icon: "★",
    description: {
      en: "Licence requirements, EU homologation",
      it: "Requisiti di patente, omologazione UE",
    },
  },
  {
    slug: "warranty",
    icon: "♦",
    description: {
      en: "Warranty terms, app, security, support",
      it: "Garanzia, app, sicurezza, assistenza",
    },
  },
];

export default function TopicCards() {
  const { language } = useLanguage();
  const lang: "en" | "it" = language === "it" ? "it" : "en";
  const faqs = useFAQs();

  const heading = lang === "it" ? "Sfoglia per argomento" : "Browse by topic";
  const questionsLabel = (n: number) =>
    lang === "it" ? `${n} domand${n === 1 ? "a" : "e"}` : `${n} question${n === 1 ? "" : "s"}`;

  // Count questions per category (matches the badges shown in FAQBrowser pills)
  const counts: Record<FAQCategory, number> = {
    motorcycles: 0,
    battery: 0,
    licence: 0,
    buying: 0,
    warranty: 0,
  };
  faqs.forEach((f) => {
    counts[f.category] += 1;
  });

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="container mx-auto px-4 md:px-0 max-w-7xl">
        <h2 className="text-xl sm:text-2xl font-britti font-semibold text-black mb-6 sm:mb-8">
          {heading}
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {TOPICS.map((topic) => (
            <li key={topic.slug}>
              <Link
                href={`/faqs#category-${topic.slug}`}
                scroll={false}
                className="group block h-full rounded-xl border border-gray-200 bg-white hover:border-orange-500 hover:shadow-md transition-all p-5"
              >
                <div
                  aria-hidden="true"
                  className="w-10 h-10 rounded-lg bg-black group-hover:bg-orange-500 transition-colors text-orange-500 group-hover:text-white flex items-center justify-center font-britti font-bold text-lg mb-4"
                >
                  {topic.icon}
                </div>
                <h3 className="text-base font-britti font-semibold text-black leading-tight">
                  {CATEGORY_LABELS[topic.slug][lang]}
                </h3>
                <p className="mt-1.5 text-sm text-gray-600 leading-snug">
                  {topic.description[lang]}
                </p>
                <p className="mt-3 text-xs uppercase tracking-wider text-orange-500 font-semibold">
                  {questionsLabel(counts[topic.slug])}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
