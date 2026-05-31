import type { MetadataRoute } from "next";

const BASE = "https://www.gritmotorcycles.com";

const paths = [
  "",
  "/G1S",
  "/G1S/specs",
  "/G1X",
  "/G1X/specs",
  "/about-us",
  "/contact",
  "/corporate",
  "/corporate/conferences",
  "/corporate/distributors",
  "/corporate/fleet-sales",
  "/corporate/investors",
  "/corporate/work-with-us",
  "/faqs",
  "/news",
  "/quality",
  "/quality/sustainablity",
  "/quality/warranty",
  "/tech",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((p) => [
    { url: `${BASE}${p}`, changeFrequency: "monthly", priority: p === "" ? 1.0 : 0.8, lastModified: new Date() },
    { url: `${BASE}/it${p}`, changeFrequency: "monthly", priority: p === "" ? 0.9 : 0.7, lastModified: new Date() },
  ]);
}
