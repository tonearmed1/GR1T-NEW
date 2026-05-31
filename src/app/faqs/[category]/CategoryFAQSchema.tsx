"use client";

import { useFAQs, FAQCategory } from "@/data/faqs";

/**
 * FAQPage schema.org markup for a single category page.
 * Same purpose as the schema on /faqs root — lets Google render Q&A snippets
 * directly in search results for category-specific queries.
 */
export default function CategoryFAQSchema({ category }: { category: FAQCategory }) {
  const faqs = useFAQs().filter((f) => f.category === category);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.searchText.trim() },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
