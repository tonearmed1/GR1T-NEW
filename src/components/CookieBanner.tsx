"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * Slim edge-to-edge cookie consent bar.
 * - White background, max ~50px tall
 * - Fixed to bottom of viewport
 * - Accept / Reject buttons + Cookie Policy link
 * - Persists choice in localStorage so the banner doesn't return
 * - Updates GA4 consent via gtag (preserves the consent-default-denied pattern in layout.tsx)
 * - EN / IT copy
 *
 * Replaces the previous Silktide modal-style banner.
 */

type ConsentState = "granted" | "denied" | null;
const STORAGE_KEY = "gr1t.cookie-consent.v1";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function getLocale(): "en" | "it" {
  if (typeof document === "undefined") return "en";
  const m = document.cookie.match(/(?:^|;\s*)locale=(en|it)/);
  if (m && (m[1] === "en" || m[1] === "it")) return m[1] as "en" | "it";
  const htmlLang = document.documentElement?.lang;
  if (htmlLang === "it") return "it";
  return "en";
}

const COPY = {
  en: {
    body:
      "We use cookies to enhance your experience, personalise content and analyse traffic.",
    policy: "Cookie Policy",
    reject: "Reject",
    accept: "Accept all",
  },
  it: {
    body:
      "Utilizziamo i cookie per migliorare la tua esperienza, personalizzare i contenuti e analizzare il traffico.",
    policy: "Cookie Policy",
    reject: "Rifiuta",
    accept: "Accetta tutti",
  },
};

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [lang, setLang] = useState<"en" | "it">("en");

  useEffect(() => {
    setLang(getLocale());
    try {
      const saved = (typeof window !== "undefined" && window.localStorage.getItem(STORAGE_KEY)) as ConsentState;
      if (!saved) {
        // No choice made yet — show the banner.
        setVisible(true);
      } else if (saved === "granted") {
        // Re-apply previous "granted" consent on every page load so analytics stay on.
        window.gtag?.("consent", "update", { analytics_storage: "granted" });
      }
    } catch {
      // localStorage blocked (private mode etc.) — show the banner; defaults stay denied.
      setVisible(true);
    }
  }, []);

  const setConsent = (state: Exclude<ConsentState, null>) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, state);
    } catch {}
    if (state === "granted") {
      window.gtag?.("consent", "update", { analytics_storage: "granted" });
      try {
        window.dataLayer?.push({ event: "consent_accepted_analytics" });
      } catch {}
    } else {
      window.gtag?.("consent", "update", { analytics_storage: "denied" });
    }
    setVisible(false);
  };

  if (!visible) return null;
  const c = COPY[lang];

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={c.body}
      className="fixed bottom-0 left-0 right-0 z-[1000] bg-white border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]"
    >
      <div className="mx-auto max-w-[1400px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 px-4 py-2 min-h-[44px]">
        <p className="text-xs sm:text-sm text-gray-800 leading-snug flex-1">
          {c.body}{" "}
          <Link
            href={lang === "it" ? "/it/cookie-policy" : "/cookie-policy"}
            className="underline hover:text-orange-500 transition-colors"
          >
            {c.policy}
          </Link>
          .
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setConsent("denied")}
            className="text-xs sm:text-sm font-medium text-gray-700 hover:text-black px-3 py-1.5 transition-colors"
          >
            {c.reject}
          </button>
          <button
            type="button"
            onClick={() => setConsent("granted")}
            className="text-xs sm:text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 px-4 py-1.5 rounded-full transition-colors"
          >
            {c.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
