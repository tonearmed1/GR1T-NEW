"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Press logos strip — sits below the hero, above the bikes section.
 *
 * Each logo lives in /public/press/ with the filename listed below. Mix of SVG and PNG
 * is fine; SVGs scale to any size without quality loss.
 *
 * Visual treatment: grayscale + reduced opacity by default, full colour on hover
 * (desktop only — mobile stays grayscale for visual harmony).
 *
 * Sizing: each logo is height-constrained (so all logos appear at roughly the same
 * vertical weight), with width auto-derived from the SVG/PNG aspect ratio. Square
 * marks (e.g., Buck City Biker) get a slightly larger height since they're visually
 * less dense than wordmarks.
 *
 * Using plain <img> rather than next/image because:
 *  - SVGs don't benefit from Next's raster optimisation pipeline
 *  - We need height-only sizing (Next/Image requires explicit width unless using `fill`)
 *  - File sizes are already tiny
 */

interface PressOutlet {
  /** Full filename inside /public/press/, including extension. */
  file: string;
  /** Brand name, used for alt text + aria labels. */
  name: string;
  /** Optional article URL — when present, the logo becomes clickable. */
  href?: string;
  /** Square/round marks get a bit more height to read as the same visual weight as wordmarks. */
  shape?: "wordmark" | "mark";
}

const PRESS_OUTLETS: PressOutlet[] = [
  { file: "gazzetta-motori.svg", name: "Gazzetta Motori", shape: "wordmark" },
  { file: "barrons.svg", name: "Barron's", shape: "wordmark" },
  { file: "motorrad-reisen.png", name: "Motorrad & Reisen", shape: "wordmark" },
  { file: "red-live.svg", name: "RED", shape: "wordmark" },
  { file: "visor-down.svg", name: "Visor Down", shape: "wordmark" },
  { file: "the-pack.svg", name: "The Pack", shape: "mark" },
  { file: "buck-city-biker.svg", name: "Buck City Biker", shape: "mark" },
];

export default function PressStrip() {
  const { language } = useLanguage();
  const heading = language === "it" ? "Stampa" : "As seen in";

  return (
    <section
      aria-label={heading}
      className="bg-white border-y border-gray-100 py-8 sm:py-10"
    >
      <div className="mx-auto max-w-6xl lg:max-w-7xl px-4 md:px-0">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400 text-center mb-6">
          {heading}
        </p>

        <ul className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-12">
          {PRESS_OUTLETS.map((outlet) => {
            // Wordmarks: shorter; marks (circular/square): a bit taller so they balance visually.
            const heightClass = outlet.shape === "mark"
              ? "h-12 sm:h-14"
              : "h-8 sm:h-10";

            const img = (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={`/press/${outlet.file}`}
                alt={`${outlet.name} — press coverage of GR1T Motorcycles`}
                className={`${heightClass} w-auto max-w-[160px] object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300`}
                loading="lazy"
                decoding="async"
              />
            );

            return (
              <li key={outlet.file} className="shrink-0 flex items-center">
                {outlet.href ? (
                  <Link
                    href={outlet.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${outlet.name} article about GR1T`}
                    className="inline-flex items-center"
                  >
                    {img}
                  </Link>
                ) : (
                  img
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
