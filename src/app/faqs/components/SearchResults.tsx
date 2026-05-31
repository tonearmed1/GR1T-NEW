"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { CATEGORY_LABELS, useFAQs } from "@/data/faqs";

/**
 * Cross-category search results — replaces the topic cards on /faqs whenever
 * a search query is active (?q=...). Shows matching FAQs from every category,
 * each tagged with its category in a small eyebrow label, with a deep-link to
 * the category page if the visitor wants to keep browsing related answers.
 */

const COPY = {
  en: {
    title: (n: number, q: string) =>
      `${n} ${n === 1 ? "result" : "results"} for "${q}"`,
    noResults: (q: string) => `No questions matched "${q}".`,
    clear: "Clear search",
    seeAllInCategory: "See all in",
  },
  it: {
    title: (n: number, q: string) =>
      `${n} ${n === 1 ? "risultato" : "risultati"} per "${q}"`,
    noResults: (q: string) => `Nessuna domanda corrisponde a "${q}".`,
    clear: "Cancella ricerca",
    seeAllInCategory: "Vedi tutte in",
  },
} as const;

export default function SearchResults({ query }: { query: string }) {
  const { language } = useLanguage();
  const lang: "en" | "it" = language === "it" ? "it" : "en";
  const c = COPY[lang];
  const allFaqs = useFAQs();
  const router = useRouter();
  const [openId, setOpenId] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allFaqs.filter(
      (f) => f.question.toLowerCase().includes(q) || f.searchText.toLowerCase().includes(q),
    );
  }, [allFaqs, query]);

  const clearSearch = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("q");
    router.replace(`${url.pathname}${url.search || ""}${url.hash || ""}`, { scroll: false });
  };

  return (
    <section className="bg-white py-10 sm:py-12">
      <div className="container mx-auto max-w-5xl px-4 md:px-0">
        <div className="flex items-baseline justify-between gap-4 mb-6">
          <h2 className="text-lg sm:text-xl font-britti font-semibold text-black">
            {c.title(results.length, query)}
          </h2>
          <button
            type="button"
            onClick={clearSearch}
            className="text-sm text-orange-500 hover:text-orange-600 underline underline-offset-2 shrink-0"
          >
            {c.clear}
          </button>
        </div>

        {results.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center text-gray-600">
            {c.noResults(query)}
          </div>
        ) : (
          <ul className="divide-y divide-gray-200 border-y border-gray-200">
            {results.map((f) => {
              const isOpen = openId === f.id;
              return (
                <li key={f.id} className="scroll-mt-24">
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : f.id)}
                    className="w-full text-left flex items-start justify-between gap-4 py-5 hover:text-orange-500 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <div className="flex-1">
                      <span className="inline-block text-[11px] uppercase tracking-wider text-gray-500 mb-1">
                        {CATEGORY_LABELS[f.category][lang]}
                      </span>
                      <h3 className="text-base sm:text-lg font-medium text-black leading-snug">
                        {f.question}
                      </h3>
                    </div>
                    <motion.span
                      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-700"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      aria-hidden="true"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-4 pr-10 text-sm sm:text-base text-gray-700 leading-relaxed prose prose-sm sm:prose-base max-w-none prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline">
                          {f.answer}
                        </div>
                        <Link
                          href={`/faqs/${f.category}`}
                          className="inline-block mb-5 text-xs uppercase tracking-wider text-orange-500 hover:text-orange-600 font-semibold"
                        >
                          {c.seeAllInCategory} {CATEGORY_LABELS[f.category][lang]} →
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
