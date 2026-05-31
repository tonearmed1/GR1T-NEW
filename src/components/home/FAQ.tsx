"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useFAQs } from "@/data/faqs";

/**
 * Homepage FAQ teaser — shows 5 hand-picked, highest-conversion-impact questions
 * with a "View all questions →" link to the full Help Center at /faqs.
 *
 * Single source of truth: pulls from src/data/faqs.tsx so questions stay in sync
 * with the /faqs page. To change which 5 questions feature here, edit
 * HOMEPAGE_FAQ_IDS below.
 */

const HOMEPAGE_FAQ_IDS = [
  "reservation-process", // the conversion question
  "deliveries-start",    // the "when will I get it?" anxiety
  "range",               // the #1 product question
  "licence",             // the #1 buying-barrier question
  "cost",                // the #1 commercial question
];

const FAQSection = () => {
  const { t, language } = useLanguage();
  const allFaqs = useFAQs();
  const [openId, setOpenId] = useState<string | null>(null);

  // Preserve the curated order from HOMEPAGE_FAQ_IDS
  const faqs = HOMEPAGE_FAQ_IDS
    .map((id) => allFaqs.find((f) => f.id === id))
    .filter((f): f is NonNullable<typeof f> => Boolean(f));

  const allQuestionsHref = language === "it" ? "/it/faqs" : "/faqs";
  const allQuestionsLabel = language === "it" ? "Tutte le domande" : "View all questions";

  return (
    <section id="faqs" className="py-12 sm:py-16 bg-[#1a1a1a]">
      <div className="container mx-auto px-4 md:px-0 max-w-7xl">
        <div className="mb-8 sm:mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-5xl font-normal font-britti text-white">{t("home.faq.title")}</h2>
            <p className="mt-1 text-gray-200 text-base sm:text-xl font-britti font-medium">{t("home.faq.subtitle")}</p>
          </div>
          {/* Inline link — replaces the standalone "View all" button so it's part of the section header */}
          <Link
            href={allQuestionsHref}
            className="self-start sm:self-auto inline-flex items-center gap-2 text-white border border-white/30 hover:border-white rounded-full px-5 py-2 text-sm font-medium transition-colors"
          >
            {allQuestionsLabel}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <ul className="divide-y divide-white/15 border-y border-white/15">
          {faqs.map((f) => {
            const isOpen = openId === f.id;
            return (
              <li key={f.id}>
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : f.id)}
                  className="w-full text-left flex items-start justify-between gap-4 py-5 hover:text-orange-400 transition-colors"
                  aria-expanded={isOpen}
                >
                  <h3 className="text-base sm:text-xl font-britti font-medium text-white leading-snug">
                    {f.question}
                  </h3>
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

        {/* Repeat the link at the bottom for visitors who scrolled the section */}
        <div className="mt-8 text-center">
          <Link
            href={allQuestionsHref}
            className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 text-sm font-semibold transition-colors"
          >
            {allQuestionsLabel}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
