"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { G1VariantData } from "@/data/g1-variants";

/**
 * PlatformReserveCTA — variant-aware reserve band at the end of the page.
 *
 * For available variants: orange CTA to /reserve with model param.
 * For unavailable (G1R): newsletter capture instead — convert curiosity into a list.
 */
export default function PlatformReserveCTA({ variant }: { variant: G1VariantData }) {
  const { language } = useLanguage();
  const lang: "en" | "it" = language === "it" ? "it" : "en";

  if (!variant.available) {
    return (
      <section className="relative bg-black text-white py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-black to-zinc-900 opacity-60 pointer-events-none" />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-orange-400">
            {variant.code} · {lang === "it" ? "IN ARRIVO 2027" : "COMING 2027"}
          </p>
          <h2 className="mt-3 font-britti font-bold text-3xl sm:text-5xl leading-tight">
            {lang === "it" ? "Sii il primo a saperlo." : "Be the first to know."}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/70 max-w-xl mx-auto">
            {lang === "it"
              ? "Iscriviti per ricevere aggiornamenti sulla G1R appena saranno disponibili."
              : "Join the list to get G1R updates as soon as they're available."}
          </p>
          <Link
            href="/#newsletter"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange-500 hover:bg-orange-600 px-7 py-4 text-base font-semibold text-white shadow-sm transition-colors"
          >
            {lang === "it" ? "Iscrivimi" : "Join the list"}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>
    );
  }

  const reserveHref = variant.reserveModelParam
    ? `/reserve?model=${variant.reserveModelParam}`
    : "/reserve";

  return (
    <section className="relative bg-black text-white py-20 sm:py-28 overflow-hidden">
      {/* Background image of the current variant */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <Image
          src={variant.heroImage}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 text-center">
        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-orange-400">
          {lang === "it" ? "PRENOTA ORA" : "RESERVE NOW"}
        </p>
        <h2 className="mt-3 font-britti font-bold text-3xl sm:text-5xl lg:text-6xl leading-[1.05]">
          {lang === "it" ? `Prenota la tua ${variant.name[lang]}.` : `Reserve your ${variant.name[lang]}.`}
        </h2>
        <p className="mt-4 text-base sm:text-lg text-white/80">
          {lang === "it"
            ? "€100 rimborsabili. Custoditi separatamente. Nessuna domanda sul rimborso."
            : "€100 refundable. Held separately. No questions on refunds."}
        </p>
        <Link
          href={reserveHref}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange-500 hover:bg-orange-600 px-7 py-4 text-base md:text-lg font-semibold text-white shadow-sm transition-colors"
        >
          {lang === "it" ? "Prenota per €100" : "Reserve for €100"}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
