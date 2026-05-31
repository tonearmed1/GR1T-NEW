"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import {
  CATEGORY_LABELS,
  FAQCategory,
  useFAQs,
} from "@/data/faqs";

/**
 * FAQBrowser — the accordion list at the bottom of the Help Center.
 *
 * State sources (no local search/category state — both come from URL):
 *   - search query: ?q=charging
 *   - category filter: #category-battery
 *
 * The standalone <SearchBar /> writes ?q=. The <TopicCards /> use href links
 * that include the #category- hash. This component just reads both and filters.
 *
 * Pills were removed (per design: the topic cards above already provide category
 * navigation, pills became redundant). A small "Filtering by …" pill with a clear
 * button is shown ONLY when a category is active, so the visitor knows the
 * current state and can reset.
 *
 * Light theme — no more dark strip. Matches the rest of the help center.
 */

const VALID_CATEGORIES: ReadonlyArray<FAQCategory> = [
  "about",
  "motorcycles",
  "battery",
  "licence",
  "buying",
  "warranty",
  "customisation",
];

type Tab = "all" | FAQCategory;

const COPY = {
  en: {
    noResults: "No questions matched your search.",
    clear: "Clear filters",
    questionsLabel: (n: number) => `${n} question${n === 1 ? "" : "s"}`,
    filteringBy: "Filtering by",
  },
  it: {
    noResults: "Nessuna domanda corrisponde alla tua ricerca.",
    clear: "Reimposta filtri",
    questionsLabel: (n: number) => `${n} domand${n === 1 ? "a" : "e"}`,
    filteringBy: "Filtro attivo",
  },
} as const;

export default function FAQBrowser() {
  const { language } = useLanguage();
  const lang: "en" | "it" = language === "it" ? "it" : "en";
  const c = COPY[lang];

  const faqs = useFAQs();
  const router = useRouter();
  const params = useSearchParams();
  const query = params.get("q") ?? "";

  const [tab, setTab] = useState<Tab>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  // Read URL hash on mount + when it changes (e.g., user clicks a topic card).
  useEffect(() => {
    if (typeof window === "undefined") return;

    const sync = () => {
      const hash = window.location.hash.replace(/^#/, "");
      const m = hash.match(/^category-(.+)$/);
      if (m && (VALID_CATEGORIES as readonly string[]).includes(m[1])) {
        setTab(m[1] as FAQCategory);
      } else if (!m) {
        setTab("all");
      }
    };

    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

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
    setTab("all");
    // Clear both ?q and #category- from URL without reloading
    const url = new URL(window.location.href);
    url.searchParams.delete("q");
    url.hash = "";
    router.replace(`${url.pathname}${url.search}`, { scroll: false });
  };

  const hasActiveFilter = tab !== "all" || query.length > 0;

  return (
    <section className="bg-white pb-12 sm:pb-16">
      <div className="container mx-auto px-4 md:px-0 max-w-5xl">
        {/* Active filter indicator + clear — only shown when something is filtered */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <p className="text-sm text-gray-500">
            {c.questionsLabel(filtered.length)}
            {tab !== "all" && (
              <>
                {" · "}
                <span className="text-gray-700">
                  {c.filteringBy}: <strong>{CATEGORY_LABELS[tab][lang]}</strong>
                </span>
              </>
            )}
          </p>
          {hasActiveFilter && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-sm text-orange-500 hover:text-orange-600 underline underline-offset-2"
            >
              {c.clear}
            </button>
          )}
        </div>

        {/* Accordion list */}
        {filtered.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
            <p className="text-gray-600 mb-3">{c.noResults}</p>
            <button
              type="button"
              onClick={resetFilters}
              className="text-orange-500 hover:text-orange-600 underline text-sm"
            >
              {c.clear}
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200 border-y border-gray-200">
            {filtered.map((f) => {
              const isOpen = openId === f.id;
              return (
                <li key={f.id} id={`faq-${f.id}`} className="scroll-mt-24">
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : f.id)}
                    className="w-full text-left flex items-start justify-between gap-4 py-5 hover:text-orange-500 transition-colors"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${f.id}-panel`}
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
                        id={`faq-${f.id}-panel`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 pr-10 text-sm sm:text-base text-gray-700 leading-relaxed prose prose-sm sm:prose-base max-w-none prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline">
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
