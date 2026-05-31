"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { CATEGORY_LABELS, FAQCategory, useFAQs } from "@/data/faqs";

/**
 * Renders the Q&A accordion for a single category, with a hero header showing
 * the category name + breadcrumb back to Help Center, and a footer "Other topics"
 * row so visitors can jump between categories without going back to /faqs.
 */

type CategorySlug = Extract<FAQCategory, FAQCategory>;

const OTHER_TOPICS: ReadonlyArray<FAQCategory> = [
  "motorcycles",
  "battery",
  "buying",
  "licence",
  "warranty",
];

export default function CategoryFAQs({ category }: { category: CategorySlug }) {
  const { language } = useLanguage();
  const lang: "en" | "it" = language === "it" ? "it" : "en";
  const allFaqs = useFAQs();
  const [openId, setOpenId] = useState<string | null>(null);

  const faqs = useMemo(() => allFaqs.filter((f) => f.category === category), [allFaqs, category]);

  const helpCenterHref = lang === "it" ? "/it/faqs" : "/faqs";
  const helpCenterLabel = lang === "it" ? "Centro assistenza" : "Help Center";
  const otherTopicsLabel = lang === "it" ? "Altri argomenti" : "Other topics";

  return (
    <>
      {/* Hero — breadcrumb + category title + intro */}
      <section className="bg-white pt-24 pb-10 sm:pt-28 sm:pb-12">
        <div className="container mx-auto max-w-5xl px-4 md:px-0">
          <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-4">
            <Link href={helpCenterHref} className="hover:text-black underline-offset-2 hover:underline">
              ← {helpCenterLabel}
            </Link>
          </nav>
          <h1 className="text-3xl sm:text-5xl font-britti font-semibold text-black">
            {CATEGORY_LABELS[category][lang]}
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            {faqs.length}{" "}
            {lang === "it"
              ? `domand${faqs.length === 1 ? "a" : "e"}`
              : `question${faqs.length === 1 ? "" : "s"}`}
          </p>
        </div>
      </section>

      {/* Accordion list */}
      <section className="bg-white pb-12 sm:pb-16">
        <div className="container mx-auto max-w-5xl px-4 md:px-0">
          <ul className="divide-y divide-gray-200 border-y border-gray-200">
            {faqs.map((f) => {
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
                    <h3 className="text-base sm:text-lg font-medium text-black leading-snug flex-1">
                      {f.question}
                    </h3>
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
        </div>
      </section>

      {/* Cross-navigation: other categories so visitors don't have to return to /faqs */}
      <section className="bg-white pb-12 sm:pb-16">
        <div className="container mx-auto max-w-5xl px-4 md:px-0">
          <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-4">{otherTopicsLabel}</h2>
          <ul className="flex flex-wrap gap-2">
            {OTHER_TOPICS.filter((t) => t !== category).map((t) => (
              <li key={t}>
                <Link
                  href={`${helpCenterHref.replace(/\/faqs$/, "/faqs")}/${t}`}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-300 hover:border-black hover:bg-black hover:text-white text-black px-4 py-2 text-sm font-medium transition-colors"
                >
                  {CATEGORY_LABELS[t][lang]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
