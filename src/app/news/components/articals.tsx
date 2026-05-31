"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { articles } from "../data/articles";

// using imported temporary articles data

import { Article } from "@/types/article";

const Articles = ({ articles }: { articles: Article[] }) => {
  const { t } = useLanguage();
  const formatDayMonth = (dateString: string) => {
    const date = new Date(dateString);

    const [day, month] = date
      .toLocaleDateString("en-GB", {
        month: "short", // abbreviated month like Jan, Feb, Mar
        day: "2-digit",
      })
      .split(" ");

    return `${month} ${day}`;
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-0 max-w-7xl ">
        {articles.length === 0 ? (
          <p className="text-center text-xl">{t("news.notFound")}</p>
        ) : (
          <div>
            {articles.map((article, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 mb-12 sm:mb-16 last:mb-0 border-b border-gray-200 pb-8 sm:pb-12 last:border-0"
              >
                {/* Date - full width on mobile, left column on desktop */}
                <div className="sm:col-span-2 mb-2 sm:mb-0">
                  <h3 className="text-2xl sm:text-3xl font-medium text-black">
                    {article.publicationDate ? article.publicationDate : formatDayMonth(article.createdAt)}
                  </h3>
                  {/* <p className="text-sm text-black">{article.readTime}</p> */}
                </div>

                {/* Image - full width on mobile, middle column on desktop */}
                <div className="sm:col-span-4 mb-4 sm:mb-0">
                  {/* <Link href={`/news/${index}`} className="block"> */}
                  <Link key={article.id} href={`/news/${article.slug}`} className="block">
                    <div className="w-full h-48 sm:h-64 relative rounded-lg overflow-hidden">
                      <Image
                        src={article.cover || ""}
                        alt={article.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 33vw"
                        priority={index < 2}
                      />
                    </div>
                  </Link>
                </div>

                {/* Content - full width on mobile, right column on desktop */}
                <div className="sm:col-span-6">
                  <Link href={`/news/${article.slug}`} className="block">
                    <h2 className="text-2xl sm:text-3xl font-medium mb-3 sm:mb-4 hover:text-gray-500 text-black">
                      {article.title}
                    </h2>
                  </Link>

                  <p className="text-black mb-4 sm:mb-6">{article.description}</p>
                  <div className="flex text-black text-sm border-t border-gray-200 pt-3 sm:pt-4">
                    {/* <span>By {article.author}</span> */}
                    {/* <span className="mx-2">•</span> */}
                    {/* <span>{article.readTime}</span> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Articles;
