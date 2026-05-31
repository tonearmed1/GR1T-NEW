"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

/**
 * GR1Tstagram — full-width Instagram feed strip on the homepage.
 * Title: "What's happening on GR1Tstagram"  ·  CTA: "Follow us"
 *
 * Two modes:
 *   1. LIVE — fetches the latest 6-8 posts from Instagram Basic Display API or
 *      Instagram Graph API. Requires a Meta access token in env:
 *         NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN
 *      When this var is set, the component fetches https://graph.instagram.com/me/media
 *      and renders the real posts. Set the token in your Vercel project env vars.
 *
 *   2. PLACEHOLDER — when the token is missing (current state), renders 6 placeholder
 *      tiles that match the layout so the page still looks intentional. Same dimensions,
 *      same hover treatment, same "Follow us" CTA — just no real images yet.
 *
 * Wire-up checklist when you're ready to go live:
 *   1. In your Meta Business Suite, create an Instagram App + Long-Lived Access Token
 *      (https://developers.facebook.com/docs/instagram-basic-display-api/getting-started)
 *   2. Add NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN to your Vercel env vars
 *   3. Redeploy. The component will switch to LIVE mode automatically.
 *
 * If you'd prefer a 3rd-party widget (Curator.io, EmbedSocial, etc.) instead of
 * the API approach, replace fetchInstagramPosts() with their embed script.
 */

interface InstagramPost {
  id: string;
  media_url: string;
  permalink: string;
  caption?: string;
}

const INSTA_HANDLE = "grit.motorcycles";
const INSTA_URL = `https://www.instagram.com/${INSTA_HANDLE}`;

async function fetchInstagramPosts(token: string): Promise<InstagramPost[]> {
  try {
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=id,media_url,permalink,caption,media_type&limit=8&access_token=${token}`,
      { next: { revalidate: 1800 } }, // cache for 30 min
    );
    if (!res.ok) return [];
    const data = (await res.json()) as { data?: Array<InstagramPost & { media_type?: string }> };
    // Filter out video posts — only show images and carousels (carousel returns first image)
    return (data.data ?? []).filter((p) => p.media_type !== "VIDEO").slice(0, 8);
  } catch {
    return [];
  }
}

export default function GR1Tstagram() {
  const { language } = useLanguage();
  const lang: "en" | "it" = language === "it" ? "it" : "en";
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN;
    if (!token) {
      setLoaded(true);
      return;
    }
    fetchInstagramPosts(token).then((p) => {
      setPosts(p);
      setLoaded(true);
    });
  }, []);

  const heading = "What's happening on GR1Tstagram";
  const follow = lang === "it" ? "Seguici" : "Follow us";
  const handle = `@${INSTA_HANDLE}`;

  // Placeholder tiles when no token is set OR fetch returned nothing
  const showPlaceholder = loaded && posts.length === 0;
  const tilesToRender = showPlaceholder
    ? Array.from({ length: 8 }, (_, i) => ({
        id: `placeholder-${i}`,
        media_url: "",
        permalink: INSTA_URL,
        caption: "",
      }))
    : posts;

  return (
    <section className="w-full bg-black">
      {/* Heading + CTA row */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h2 className="font-britti font-bold text-white text-2xl sm:text-4xl leading-tight">
            {heading}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-white/60">{handle}</p>
        </div>
        <Link
          href={INSTA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 self-start sm:self-auto rounded-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 text-sm font-semibold transition-colors"
        >
          {follow}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      {/* Edge-to-edge grid — no max-width container, true full-width. 2 cols on mobile,
          4 cols on tablet, 8 cols on widescreen so the row matches the heading bar above. */}
      <ul className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-px bg-white/5">
        {tilesToRender.map((post) => (
          <li key={post.id} className="relative aspect-square overflow-hidden bg-zinc-800 group">
            <Link
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={post.caption?.slice(0, 80) || `${INSTA_HANDLE} on Instagram`}
              className="absolute inset-0"
            >
              {post.media_url ? (
                <Image
                  src={post.media_url}
                  alt={post.caption?.slice(0, 80) || `${INSTA_HANDLE} on Instagram`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 12.5vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
              ) : (
                /* Placeholder tile when no token / no posts yet — empty dark cell with subtle IG logo */
                <div className="absolute inset-0 flex items-center justify-center text-white/15">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zM12 6.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 1.802a3.333 3.333 0 110 6.666 3.333 3.333 0 010-6.666z" />
                  </svg>
                </div>
              )}
              {/* Hover overlay (always present, transparent until hover) */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
            </Link>
          </li>
        ))}
      </ul>

      {/* Placeholder helper note — only visible if no token set + dev mode (won't show in prod) */}
      {showPlaceholder && process.env.NODE_ENV === "development" && (
        <p className="mx-auto max-w-7xl px-4 sm:px-6 py-3 text-xs text-white/40">
          Instagram feed placeholder shown. Set <code>NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN</code> in your env to load real posts.
        </p>
      )}
    </section>
  );
}
