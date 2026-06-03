"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { G1Variant, G1_VARIANTS } from "@/data/g1-variants";

/**
 * VariantSelector — three large tiles for picking the active variant.
 *
 * Desktop: horizontal row of 3 tiles, each ~33% of the row.
 * Mobile: sticky bottom tab bar so the selector is always reachable while scrolling.
 *
 * Active tile: thicker border, orange accent underline, slightly elevated.
 * Unavailable variant (G1R right now): grayed slightly, "Coming 2027" badge,
 * still selectable so the user can read the lifestyle teaser + reservation prompt.
 */
export default function VariantSelector({
  active,
  onChange,
}: {
  active: G1Variant;
  onChange: (next: G1Variant) => void;
}) {
  const { language } = useLanguage();
  const lang: "en" | "it" = language === "it" ? "it" : "en";

  const sectionLabel = lang === "it" ? "TRE CARATTERI" : "THREE CHARACTERS";
  const sectionTitle = lang === "it"
    ? "Una piattaforma. Tre carattere."
    : "One platform. Three characters.";

  return (
    <section id="variants" className="bg-black text-white py-12 sm:py-16 lg:py-20 border-y border-white/5">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-white/50 mb-3">
          {sectionLabel}
        </p>
        <h2 className="font-britti font-bold text-3xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.01em] mb-10 sm:mb-14">
          {sectionTitle}
        </h2>

        <div
          role="tablist"
          aria-label={sectionLabel}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
        >
          {G1_VARIANTS.map((v) => {
            const isActive = active === v.slug;
            return (
              <button
                key={v.slug}
                role="tab"
                aria-selected={isActive}
                aria-controls="variant-content"
                onClick={() => onChange(v.slug)}
                className={`group relative text-left rounded-2xl overflow-hidden border transition-all duration-300 ${
                  isActive
                    ? "border-orange-500 bg-white/[0.06] shadow-[0_0_0_1px_rgba(245,116,35,0.4)]"
                    : "border-white/10 hover:border-white/30 bg-transparent"
                }`}
              >
                {/* Bike image */}
                <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-zinc-900 to-black">
                  <Image
                    src={v.selectorImage}
                    alt={v.name[lang]}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className={`object-contain p-6 transition-transform duration-500 ${
                      isActive ? "scale-100" : "scale-95 group-hover:scale-100"
                    } ${!v.available ? "opacity-50" : ""}`}
                  />
                  {!v.available && (
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/80">
                      {lang === "it" ? "In arrivo" : "Coming"}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-britti font-bold text-lg sm:text-xl text-white">
                      {v.name[lang]}
                    </h3>
                    {v.startingPrice && (
                      <span className="text-xs text-white/60 whitespace-nowrap">
                        {lang === "it" ? "Da " : "From "}
                        {v.startingPrice}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-white/70 leading-snug">
                    {v.character[lang]}
                  </p>
                </div>

                {/* Active underline */}
                {isActive && (
                  <motion.div
                    layoutId="variant-active-underline"
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-orange-500"
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
