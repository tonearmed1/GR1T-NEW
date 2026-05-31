"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import {
  CATEGORY_LABELS,
  FAQCategory,
  useFAQs,
} from "@/data/faqs";

/**
 * FAQBrowser — the full FAQ experience: search + category pills + accordion.
 * Used on /faqs. Self-contained, dark-theme to match the rest of the site.
 *
 * Behaviour:
 *  - Live search filters as you type (matches question + answer text)
 *  - Category pills filter to one section; "All" shows everything
 *  - Search + category combine (e.g. "Battery" pill + "charge" search)
 *  - "No results" state with reset link
 *  - Question count per category shown on each pill
 *  - One accordion open at a time (cleaner reading)
 */

type Tab = "all" | FAQCategory;

const COPY = {
  en: {
    searchPlaceholder: "Search questions…",
    all: "All",
    noResults: "No questions matched your search.",
    clear: "Clear filters",
    questionsLabel: (n: number) => `${n} question${n === 1 ? "" : "s"}`,
  },
  it: {
    searchPlaceholder: "Cerca domande…",
    all: "Tutte",
    noResults: "Nessuna domanda corrisponde alla tua ricerca.",
    clear: "Reimposta filtri",
    questionsLabel: (n: number) => `${n} domand${n === 1 ? "a" : "e"}`,
  },
} as const;

export default function FAQBrowser() {
  const { language } = useLanguage();
  const lang: "en" | "it" = language === "it" ? "it" : "en";
  const c = COPY[lang];

  const faqs = useFAQs();
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<Tab>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  // Per-category counts (always shows full totals, independent of search)
  const counts = useMemo(() => {
    const c: Record<Tab, number> = {
      all: faqs.length,
      motorcycles: 0,
      battery: 0,
      licence: 0,
      buying: 0,
      warranty: 0,
    };
    faqs.forEach((f) => {
      c[f.category] += 1;
    });
    return c;
  }, [faqs]);

  // Filtered list: category, then search
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs.filter((f) => {
      if (tab !== "all" && f.category !== tab) return false;
      if (!q) return true;
      return (
        f.question.toLowerCase().includes(q) ||
        f.searchText.toLowerCase().includes(q)
      );
    });
  }, [faqs, query, tab]);

  const resetFilters = () => {
    setQuery("");
    setTab("all");
  };

  const tabs: Tab[] = ["all", "motorcycles", "battery", "licence", "buying", "warranty"];

  return (
    <section className="bg-[#1a1a1a] text-white py-12 sm:py-20">
      <div className="container mx-auto px-4 md:px-0 max-w-5xl">
        {/* Search bar */}
        <div className="relative mb-6">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={c.searchPlaceholder}
            aria-label={c.searchPlaceholder}
            className="w-full rounded-full bg-white/5 border border-white/15 focus:border-orange-500 focus:bg-white/10 transition-colors text-white placeholder:text-gray-500 pl-12 pr-4 py-3 text-base outline-none"
          />
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-8" role="tablist">
          {tabs.map((t) => {
            const label = t === "all" ? c.all : CATEGORY_LABELS[t][lang];
            const active = tab === t;
            return (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setTab(t)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium border transition-colors ${
                  active
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-transparent text-white border-white/20 hover:border-white/50"
                }`}
              >
                <span>{label}</span>
                <span
                  className={`text-xs rounded-full px-2 py-0.5 ${
                    active ? "bg-white/20" : "bg-white/10 text-gray-300"
                  }`}
                  aria-hidden="true"
                >
                  {counts[t]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-400 mb-4">
          {c.questionsLabel(filtered.length)}
          {(query || tab !== "all") && filtered.length !== counts.all && (
            <>
              {" · "}
              <button
                type="button"
                onClick={resetFilters}
                className="underline hover:text-white"
              >
                {c.clear}
              </button>
            </>
          )}
        </p>

        {/* Accordion list */}
        {filtered.length === 0 ? (
          <div className="rounded-lg border border-white/10 bg-white/5 p-8 text-center">
            <p className="text-gray-300 mb-3">{c.noResults}</p>
            <button
              type="button"
              onClick={resetFilters}
              className="text-orange-400 hover:text-orange-300 underline text-sm"
            >
              {c.clear}
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {filtered.map((f) => {
              const isOpen = openId === f.id;
              return (
                <li key={f.id} id={`faq-${f.id}`} className="scroll-mt-24">
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : f.id)}
                    className="w-full text-left flex items-start justify-between gap-4 py-5 hover:text-orange-400 transition-colors"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${f.id}-panel`}
                  >
                    <div className="flex-1">
                      <span className="inline-block text-[11px] uppercase tracking-wider text-gray-500 mb-1">
                        {CATEGORY_LABELS[f.category][lang]}
                      </span>
                      <h3 className="text-base sm:text-lg font-medium leading-snug">
                        {f.question}
                      </h3>
                    </div>
                    <motion.span
                      className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/30 text-white"
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
                        id={`faq-${f.id}-panel`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 pr-10 text-sm sm:text-base text-gray-300 leading-relaxed prose prose-invert prose-sm sm:prose-base max-w-none prose-a:text-orange-400 prose-a:no-underline hover:prose-a:underline">
                          {f.answer}
                        </div>
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
