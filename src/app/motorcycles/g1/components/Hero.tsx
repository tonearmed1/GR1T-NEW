"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { G1VariantData } from "@/data/g1-variants";

/**
 * Hero — cinematic full-bleed background imagery + huge variant name + tagline.
 * On variant switch:
 *   - background image cross-fades (AnimatePresence with mode="popLayout")
 *   - text fades up letter-by-letter via stagger (Polestar-style)
 *
 * No CTA in the hero. The visitor scrolls to learn; the VariantSelector below is
 * the next interaction. Premium product pages don't shout in the hero.
 */
export default function Hero({ variant }: { variant: G1VariantData }) {
  const { language } = useLanguage();
  const lang: "en" | "it" = language === "it" ? "it" : "en";
  const platformEyebrow = lang === "it" ? "PIATTAFORMA G1" : "G1 PLATFORM";

  return (
    <section className="relative w-full h-[70vh] sm:h-[80vh] lg:h-[88vh] overflow-hidden mt-16">
      {/* Background imagery — cross-fades between variants */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={variant.slug}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={variant.heroImage}
            alt={`${variant.name[lang]} — ${variant.tagline[lang]}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
        </motion.div>
      </AnimatePresence>

      {/* Hero content — left aligned at bottom (matches Porsche/Polestar) */}
      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8 pb-12 sm:pb-16 lg:pb-24">
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-white/70 mb-3">
            {platformEyebrow}
          </p>
          <AnimatePresence mode="popLayout">
            <motion.h1
              key={variant.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="font-britti font-bold text-white text-5xl sm:text-7xl lg:text-[120px] leading-[0.95] tracking-[-0.02em]"
            >
              {variant.name[lang]}
            </motion.h1>
          </AnimatePresence>
          <AnimatePresence mode="popLayout">
            <motion.p
              key={`${variant.slug}-tagline`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
              className="mt-4 sm:mt-6 text-xl sm:text-2xl lg:text-3xl text-white/85 max-w-3xl"
            >
              {variant.tagline[lang]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Scroll indicator — small, subtle, Apple-style */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center text-white/40 text-[10px] uppercase tracking-[0.25em]">
        <span>{lang === "it" ? "Scorri" : "Scroll"}</span>
        <span className="mt-2 w-px h-8 bg-white/40 origin-top animate-pulse" />
      </div>
    </section>
  );
}
