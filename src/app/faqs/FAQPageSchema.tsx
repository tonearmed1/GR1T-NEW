"use client";

import { useFAQs } from "@/data/faqs";

/**
 * Emits schema.org FAQPage JSON-LD with all questions + plain-text answers.
 * Google uses this to render rich Q&A snippets in search results.
 * Client component because the FAQ data is locale-aware via useLanguage().
 */
export default function FAQPageSchema() {
  const faqs = useFAQs();

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        // Strip leading/trailing whitespace; Google wants plain prose.
        text: f.searchText.trim(),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
