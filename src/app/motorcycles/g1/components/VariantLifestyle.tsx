"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { G1VariantData } from "@/data/g1-variants";

/**
 * VariantLifestyle — variant-specific emotional storytelling.
 * Full-bleed imagery + a short paragraph that captures the character of the
 * selected variant. Changes wholesale when the user switches variants — this is
 * where the "three characters" positioning gets to breathe.
 *
 * For unavailable variants (G1R right now), shows a teaser + "Join the list"
 * prompt instead of full imagery, since no real photography exists yet.
 */
export default function VariantLifestyle({ variant }: { variant: G1VariantData }) {
  const { language } = useLanguage();
  const lang: "en" | "it" = language === "it" ? "it" : "en";

  const hasImages = variant.lifestyle.images.length > 0;
  const [primary, ...rest] = variant.lifestyle.images;

  return (
    <section className="bg-black text-white relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={variant.slug}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          {/* Primary lifestyle image — full-bleed */}
          {hasImages ? (
            <div className="relative w-full aspect-[16/9] sm:aspect-[21/9]">
              <Image
                src={primary}
                alt={variant.lifestyle.sectionTitle[lang]}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-0 flex items-end">
                <div className="mx-auto w-full max-w-7xl px-4 md:px-8 pb-12 sm:pb-16 lg:pb-20">
                  <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-orange-400 mb-3">
                    {variant.code}
                  </p>
                  <h2 className="font-britti font-bold text-3xl sm:text-5xl lg:text-7xl leading-[1.05] tracking-[-0.01em] max-w-3xl">
                    {variant.lifestyle.sectionTitle[lang]}
                  </h2>
                </div>
              </div>
            </div>
          ) : (
            /* G1R placeholder — coming soon treatment */
            <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-gradient-to-br from-zinc-900 via-black to-zinc-900 flex items-center">
              <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-orange-400 mb-3">
                  {variant.code} · {lang === "it" ? "IN ARRIVO" : "COMING SOON"}
                </p>
                <h2 className="font-britti font-bold text-3xl sm:text-5xl lg:text-7xl leading-[1.05] tracking-[-0.01em] max-w-3xl">
                  {variant.lifestyle.sectionTitle[lang]}
                </h2>
              </div>
            </div>
          )}

          {/* Story copy + supporting images */}
          <div className="mx-auto max-w-7xl px-4 md:px-8 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <p className="text-base sm:text-lg lg:text-xl text-white/80 leading-relaxed max-w-2xl">
              {variant.lifestyle.story[lang]}
            </p>

            {rest.length > 0 && (
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {rest.slice(0, 2).map((img, i) => (
                  <div
                    key={img}
                    className={`relative rounded-xl overflow-hidden bg-zinc-900 ${
                      i === 0 ? "aspect-[3/4]" : "aspect-[3/4] mt-8"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${variant.name[lang]} ${i + 2}`}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
