import React from "react";
import NewsHero from "./components/hero";
import Articles from "./components/articals";
import { Article } from "@/types/article";

async function getArticles(): Promise<Article[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/articles`, {
    cache: "no-store",
  });

  const json = await res.json();
  return json.data;
}

export default async function NewsPage() {
  const articles = await getArticles();

  if (!articles) {
    return <p>loading</p>;
  }
  return (
    <main className="min-h-screen">
      <NewsHero />
      <Articles articles={articles} />
    </main>
  );
}
