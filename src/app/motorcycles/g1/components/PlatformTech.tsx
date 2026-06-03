"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { PLATFORM_STATS, PLATFORM_CAPABILITIES } from "@/data/g1-platform";

/**
 * PlatformTech — the shared platform story. This section never changes between
 * variants. It's the entire point of the "one platform" positioning: visitors see
 * the technology ONCE, then learn how the variants express it differently below.
 */
export default function PlatformTech() {
  const { language } = useLanguage();
  const lang: "en" | "it" = language === "it" ? "it" : "en";

  return (
    <section className="bg-black text-white py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Section heading */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-orange-400 mb-3">
            {lang === "it" ? "PIATTAFORMA" : "THE PLATFORM"}
          </p>
          <h2 className="font-britti font-bold text-3xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.01em]">
            {lang === "it"
              ? "Una piattaforma. Tutto quello che ti serve."
              : "One platform. Everything you need."}
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-white/70 max-w-2xl">
            {lang === "it"
              ? "Le tre G1 condividono lo stesso telaio, lo stesso powertrain, le stesse batterie e la stessa tecnologia. Quello che cambia è il carattere."
              : "All three G1s share the same frame, powertrain, batteries and technology. What changes is character."}
          </p>
        </div>

        {/* Platform stats — 6 big numbers in a strip */}
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-y border-white/10 divide-x divide-white/10 mb-16 sm:mb-24">
          {PLATFORM_STATS.map((s) => (
            <li key={s.value} className="px-4 py-6 sm:py-8 text-center first:pl-0 last:pr-0">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-britti font-bold text-white leading-none">
                {s.value}
              </div>
              <div className="mt-2 text-[10px] sm:text-xs uppercase tracking-wider text-white/50">
                {s.label[lang]}
              </div>
              {s.sub && (
                <div className="mt-1 text-[10px] text-white/30">{s.sub[lang]}</div>
              )}
            </li>
          ))}
        </ul>

        {/* Platform capability cards — 2x3 grid, image + title + description */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {PLATFORM_CAPABILITIES.map((cap, i) => (
            <motion.article
              key={cap.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-900"
            >
              {cap.image && (
                <Image
                  src={cap.image}
                  alt={cap.title[lang]}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
              )}
              <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-10">
                <h3 className="text-lg sm:text-xl font-britti font-bold text-white leading-snug">
                  {cap.title[lang]}
                </h3>
                <p className="mt-2 text-sm text-white/80 leading-relaxed max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-out group-hover:max-h-40 group-hover:opacity-100">
                  {cap.description[lang]}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Mobile-touch fallback: descriptions visible without hover */}
        <style jsx>{`
          @media (hover: none) {
            .group p {
              max-height: 10rem !important;
              opacity: 1 !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
