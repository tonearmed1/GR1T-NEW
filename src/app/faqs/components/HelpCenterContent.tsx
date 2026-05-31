"use client";

import { useSearchParams } from "next/navigation";
import TopicCards from "./TopicCards";
import SearchResults from "./SearchResults";

/**
 * On the main /faqs page, swap the visible content based on URL state:
 *   - no ?q=  → show the 5 topic cards (default landing experience)
 *   - ?q=foo  → show cross-category search results inline
 *
 * Keeps the page short. Long Q&A lists live on /faqs/[category] pages now.
 */
export default function HelpCenterContent() {
  const params = useSearchParams();
  const query = params.get("q") ?? "";
  return query ? <SearchResults query={query} /> : <TopicCards />;
}
