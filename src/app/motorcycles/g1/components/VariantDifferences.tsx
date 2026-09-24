"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { G1Variant, G1_VARIANTS } from "@/data/g1-variants";

/**
 * VariantDifferences — comparison table showing only what differs between variants.
 * The active variant's column is highlighted with the brand accent.
 *
 * Mobile: horizontally scrolls so the visitor can compare without losing the active
 * column anchored on the left.
 */
export default function VariantDifferences({ active }: { active: G1Variant }) {
  const { language } = useLanguage();
  const lang: "en" | "it" = language === "it" ? "it" : "en";

  const rows: Array<{ label: { en: string; it: string }; get: (v: typeof G1_VARIANTS[number]) => string }> = [
    {
      label: { en: "Tyres", it: "Pneumatici" },
      get: (v) => v.differences.tyres,
    },
    {
      label: { en: "Wheels", it: "Cerchi" },
      get: (v) => v.differences.wheels,
    },
    {
      label: { en: "Suspension travel", it: "Escursione sospensioni" },
      get: (v) => v.differences.suspensionTravel[lang],
    },
    {
      label: { en: "Front design", it: "Front design" },
      get: (v) => v.differences.frontDesign[lang],
    },
    {
      label: { en: "Racks", it: "Portapacchi" },
      get: (v) => v.differences.racks[lang],
    },
    {
      label: { en: "Hand protectors", it: "Paramani" },
      get: (v) => (v.differences.handProtectors ? (lang === "it" ? "Sì" : "Yes") : "—"),
    },
    {
      label: { en: "Character", it: "Carattere" },
      get: (v) => v.differences.character[lang],
    },
    {
      label: { en: "Starting price", it: "Prezzo di partenza" },
      get: (v) => v.startingPrice ?? (lang === "it" ? "Da definire" : "TBD"),
    },
  ];

  return (
    <section className="bg-[#0a0a0a] text-white py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="max-w-3xl mb-10 sm:mb-14">
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-orange-400 mb-3">
            {lang === "it" ? "DIFFERENZE" : "WHAT DIFFERS"}
          </p>
          <h2 className="font-britti font-bold text-3xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.01em]">
            {lang === "it" ? "Stesso DNA. Tre carattere." : "Same DNA. Three characters."}
          </h2>
        </div>

        {/* Comparison table — horizontal scroll on mobile, full grid on desktop */}
        <div className="overflow-x-auto -mx-4 md:mx-0">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="border-b border-white/15">
                <th className="px-4 md:px-0 py-4 text-left text-xs font-semibold uppercase tracking-wider text-white/40 w-[28%]">
                  &nbsp;
                </th>
                {G1_VARIANTS.map((v) => {
                  const isActive = active === v.slug;
                  return (
                    <th
                      key={v.slug}
                      className={`px-4 py-4 text-left ${
                        isActive ? "bg-orange-500/5 border-x border-orange-500/30" : ""
                      }`}
                    >
                      <div className="flex flex-col gap-1">
                        <span
                          className={`text-[10px] uppercase tracking-[0.2em] ${
                            isActive ? "text-orange-400" : "text-white/40"
                          }`}
                        >
                          {v.code}
                        </span>
                        <span className="font-britti font-bold text-base sm:text-lg text-white">
                          {v.name[lang]}
                        </span>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="border-b border-white/5"
                >
                  <td className="px-4 md:px-0 py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/50">
                    {row.label[lang]}
                  </td>
                  {G1_VARIANTS.map((v) => {
                    const isActive = active === v.slug;
                    return (
                      <td
                        key={v.slug}
                        className={`px-4 py-4 text-sm sm:text-base align-top ${
                          isActive
                            ? "bg-orange-500/5 border-x border-orange-500/30 text-white"
                            : "text-white/70"
                        }`}
                      >
                        {row.get(v)}
                      </td>
                    );
                  })}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
