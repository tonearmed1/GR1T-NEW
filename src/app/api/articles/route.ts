import { NextResponse } from "next/server";
import type { StrapiResponse, Article } from "@/types/article";

export async function GET() {
  const STRAPI_URL = process.env.STRAPI_API_URL;
  if (!STRAPI_URL) {
    return NextResponse.json({ error: "STRAPI_API_URL not set" }, { status: 500 });
  }

  try {
    const res = await fetch(STRAPI_URL + "?populate=*", {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Strapi request failed: ${res.statusText}`);
    }

    const json = (await res.json()) as StrapiResponse<Article>;

    // Keep only useful data for frontend

    if (!json.data) {
      return NextResponse.json({ error: "no articles found" }, { status: 404 });
    }

    const simplified = json.data
      .map((a) => ({
        id: a.id,
        documentId: a.documentId,
        title: a.title,
        slug: a.slug,
        description: a.description,
        createdAt: a.createdAt,
        //   @ts-expect-error: cover is a string or null
        cover: a.cover?.formats?.medium?.url || a.cover?.url || null, // <-- string only
        publicationDate: a.publicationDate,
      }))
      .sort((a, b) => {
        const toDate = (str: string) => {
          // str example: "15 June, 2024"
          const [dayMonth, year] = str.split(",").map((v) => v.trim());
          const [day, month] = dayMonth.split(" ").map((v) => v.trim());

          return new Date(`${month} ${day}, ${year}`); // "June 15, 2024"
        };

        return toDate(b.publicationDate).getTime() - toDate(a.publicationDate).getTime();
      });

    return NextResponse.json({ data: simplified });
  } catch (error: unknown) {
    console.error("GET /api/articles error:", error);
    return NextResponse.json({ error: "something went wrong..." }, { status: 500 });
  }
}
