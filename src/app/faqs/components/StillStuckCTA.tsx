"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

/**
 * "Still stuck?" — sits at the bottom of /faqs.
 * Catches visitors who couldn't find their answer in the FAQ.
 * Two CTAs: Contact form + direct email.
 */

export default function StillStuckCTA() {
  const { language } = useLanguage();
  const lang: "en" | "it" = language === "it" ? "it" : "en";

  const c = {
    en: {
      heading: "Still have questions?",
      body: "Send us a message and we'll reply in EN or IT within 1 business day.",
      contact: "Contact us",
      email: "grit@gritmotorcycles.com",
    },
    it: {
      heading: "Hai ancora domande?",
      body: "Inviaci un messaggio e ti risponderemo in IT o EN entro 1 giorno lavorativo.",
      contact: "Contattaci",
      email: "grit@gritmotorcycles.com",
    },
  }[lang];

  const contactHref = lang === "it" ? "/it/contact" : "/contact";

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="container mx-auto px-4 md:px-0 max-w-3xl text-center">
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-britti font-bold text-black">{c.heading}</h2>
          <p className="mt-3 text-base text-gray-600">{c.body}</p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={contactHref}
              className="inline-flex items-center gap-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 text-sm font-semibold transition-colors"
            >
              {c.contact}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <a
              href={`mailto:${c.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-black text-black hover:bg-black hover:text-white px-6 py-3 text-sm font-semibold transition-colors"
            >
              {c.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
