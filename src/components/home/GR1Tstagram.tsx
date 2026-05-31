"use client";

import Link from "next/link";
import Script from "next/script";
import { useLanguage } from "@/context/LanguageContext";

/**
 * GR1Tstagram — full-width Instagram feed strip on the homepage.
 *
 * Powered by Elfsight (3rd-party widget service). Configuration of the feed
 * itself (which account, layout, post count, hover behaviour) is managed in
 * the Elfsight dashboard — not in this codebase. To change what's displayed,
 * log in to elfsight.com and edit the widget; changes propagate live.
 *
 * Replacing the Elfsight widget with another service or going back to a direct
 * Meta API integration: just swap the <Script> + <div> below for the new
 * provider's embed code, keep the section heading + CTA wrapper.
 */

const INSTA_HANDLE = "grit.motorcycles";
const INSTA_URL = `https://www.instagram.com/${INSTA_HANDLE}`;
const ELFSIGHT_WIDGET_CLASS = "elfsight-app-3385e58e-3143-4637-908b-d05c2073b11d";

export default function GR1Tstagram() {
  const { language } = useLanguage();
  const lang: "en" | "it" = language === "it" ? "it" : "en";
  const follow = lang === "it" ? "Seguici" : "Follow us";

  return (
    <section className="w-full bg-black">
      {/* Heading + CTA row */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h2 className="font-britti font-bold text-white text-2xl sm:text-4xl leading-tight">
            What&rsquo;s happening on GR1Tstagram
          </h2>
          <p className="mt-2 text-sm sm:text-base text-white/60">@{INSTA_HANDLE}</p>
        </div>
        <Link
          href={INSTA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 self-start sm:self-auto rounded-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 text-sm font-semibold transition-colors"
        >
          {follow}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      {/* Elfsight Instagram widget — loaded by platform.js below.
          Layout / post count / styling is configured in the Elfsight dashboard. */}
      <div className="w-full">
        <div className={ELFSIGHT_WIDGET_CLASS} data-elfsight-app-lazy />
      </div>

      {/* Elfsight platform script — loaded once, lazily, after the page is interactive.
          The id prop deduplicates if this component is mounted multiple times. */}
      <Script
        id="elfsight-platform"
        src="https://elfsightcdn.com/platform.js"
        strategy="lazyOnload"
      />
    </section>
  );
}
