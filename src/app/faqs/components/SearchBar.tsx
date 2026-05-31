"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Help-Center search bar.
 *
 * Sits above the TopicCards on /faqs. Writes the live query into the URL as ?q=...
 * so the FAQBrowser below can read it. URL-as-state has two nice side effects:
 *   - Shareable search URLs (/faqs?q=charging)
 *   - Browser back/forward Just Works
 *
 * Uses router.replace + scroll:false so typing doesn't add history entries
 * or scroll the page.
 */
export default function SearchBar() {
  const { language } = useLanguage();
  const lang: "en" | "it" = language === "it" ? "it" : "en";
  const router = useRouter();
  const params = useSearchParams();
  const initial = params.get("q") ?? "";
  const [value, setValue] = useState(initial);

  const placeholder = lang === "it" ? "Cerca domande…" : "Search questions…";
  const ariaLabel = placeholder;

  // Keep local state in sync if URL changes from elsewhere (e.g., topic card click clears search)
  useEffect(() => {
    setValue(params.get("q") ?? "");
  }, [params]);

  const onChange = (next: string) => {
    setValue(next);
    // Update URL with debounce-free immediate replace (Next handles this efficiently for short queries)
    const url = new URL(window.location.href);
    if (next) url.searchParams.set("q", next);
    else url.searchParams.delete("q");
    router.replace(`${url.pathname}${url.search}${url.hash}`, { scroll: false });
  };

  return (
    <section className="bg-white pt-6 sm:pt-8">
      <div className="container mx-auto max-w-7xl px-4 md:px-0">
        <div className="relative max-w-2xl">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <input
            type="search"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            aria-label={ariaLabel}
            className="w-full rounded-full bg-gray-50 border border-gray-200 focus:border-orange-500 focus:bg-white transition-colors text-black placeholder:text-gray-400 pl-12 pr-4 py-3 text-base outline-none"
          />
        </div>
      </div>
    </section>
  );
}
