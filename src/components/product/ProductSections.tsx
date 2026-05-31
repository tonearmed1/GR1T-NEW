"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Shared product-page sections used by both G1S and G1X pages.
 * Each section is exported individually so each page composes its own order.
 *
 * Copy is held locally for English + Italian. Model-specific data (name, model
 * code, image paths, gallery, specs) is passed in via props from each page.
 */

type Locale = "en" | "it";

interface ModelData {
  modelCode: "G1S" | "G1X";
  modelName: string;        // "G1S Street" | "G1X Scrambler"
  specsHref: string;        // /G1S/specs or /G1X/specs (existing routes)
}

/* ───── KEY STATS strip below hero ───── */
// model param accepted for API consistency with other sections (data is shared platform-wide today)
export function ProductKeyStats({ model: _model }: { model: ModelData }) {
  const { language } = useLanguage();
  const lang: Locale = language === "it" ? "it" : "en";

  // Same stats for both models — they share the platform
  const labels = {
    range: { en: "Range", it: "Autonomia" },
    top: { en: "Top speed", it: "Velocità max" },
    payload: { en: "Two-up payload", it: "Portata in due" },
    charge: { en: "Full charge", it: "Ricarica completa" },
    batteries: { en: "Removable batteries", it: "Batterie rimovibili" },
    warranty: { en: "Warranty", it: "Garanzia" },
  };

  const stats = [
    { value: "150 km", label: labels.range[lang] },
    { value: "130 km/h", label: labels.top[lang] },
    { value: "190 kg", label: labels.payload[lang], highlight: true },
    { value: "3.2 h", label: labels.charge[lang] },
    { value: "2", label: labels.batteries[lang] },
    { value: "2+3 yr", label: labels.warranty[lang] },
  ];

  return (
    <section className="bg-white border-b border-gray-100">
      <div className="mx-auto max-w-6xl lg:max-w-7xl px-4 md:px-0">
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 divide-x divide-gray-100">
          {stats.map((s) => (
            <li
              key={s.value}
              className={`px-3 py-6 text-center first:pl-0 last:pr-0 ${
                s.highlight ? "bg-orange-50/40" : ""
              }`}
            >
              <div className="text-2xl sm:text-3xl font-britti font-bold text-black leading-none">
                {s.value}
              </div>
              <div className="mt-2 text-[11px] sm:text-xs uppercase tracking-wider text-gray-500">
                {s.label}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───── VIDEO STRIP ───── */
export function ProductVideoStrip({ model }: { model: ModelData }) {
  const { language } = useLanguage();
  const lang: Locale = language === "it" ? "it" : "en";

  // Video paths — you upload files to public/<model>/video.mp4 and video-poster.jpg
  const videoSrc = `/${model.modelCode}/video.mp4`;
  const posterSrc = `/${model.modelCode}/video-poster.jpg`;

  const caption = lang === "it"
    ? `La ${model.modelName} in azione.`
    : `The ${model.modelName} in motion.`;

  return (
    <section className="bg-black">
      <div className="relative w-full aspect-video">
        <video
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          aria-label={caption}
        />
        {/* Caption overlay — kept small + at bottom-left so it doesn't compete with the imagery */}
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white/80 text-xs sm:text-sm font-britti tracking-wider uppercase">
          {caption}
        </div>
      </div>
    </section>
  );
}

/* ───── TWO-UP / 190 KG PAYLOAD spotlight ───── */
export function ProductTwoUp({ model }: { model: ModelData }) {
  const { language } = useLanguage();
  const lang: Locale = language === "it" ? "it" : "en";

  const c = {
    en: {
      eyebrow: "BEST-IN-CLASS PAYLOAD",
      title: "Built for two. 190 kg of carrying capacity.",
      body: `The ${model.modelName} is a standard two-seater with enough power and structural strength to carry two adults plus gear — up to 190 kg total. That's best-in-class for an electric 125 cm³-equivalent motorcycle.`,
      detail1: "Frame tested for sustained two-up riding at full payload",
      detail2: "Optional panniers + top-box rated to 10 kg each",
      detail3: "Suspension tuned for the full 190 kg loaded weight",
    },
    it: {
      eyebrow: "PORTATA BEST-IN-CLASS",
      title: "Costruita per due. 190 kg di capacità di carico.",
      body: `La ${model.modelName} è una vera due posti, con potenza e struttura sufficienti per due adulti più bagagli — fino a 190 kg totali. Una portata best-in-class per una moto elettrica equivalente 125 cm³.`,
      detail1: "Telaio testato per uso continuo in due al carico massimo",
      detail2: "Borse laterali + topcase opzionali fino a 10 kg ciascuno",
      detail3: "Sospensioni calibrate per il pieno carico di 190 kg",
    },
  }[lang];

  return (
    <section className="bg-[#1a1a1a] text-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl lg:max-w-7xl px-4 md:px-0 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
            {c.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl sm:text-5xl font-britti font-bold leading-tight">
            {c.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-300 leading-relaxed">{c.body}</p>
          <ul className="mt-6 space-y-2 text-sm sm:text-base text-gray-300">
            <li className="flex gap-3"><span className="text-orange-400 shrink-0">→</span><span>{c.detail1}</span></li>
            <li className="flex gap-3"><span className="text-orange-400 shrink-0">→</span><span>{c.detail2}</span></li>
            <li className="flex gap-3"><span className="text-orange-400 shrink-0">→</span><span>{c.detail3}</span></li>
          </ul>
        </div>
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-900">
          {/* Placeholder image — replace with a real "two riders + cargo" photo when available */}
          <Image
            src={`/Home/bikes/${model.modelCode}.png`}
            alt={`${model.modelName} two-up payload demonstration`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-8"
          />
        </div>
      </div>
    </section>
  );
}

/* ───── TESTIMONIALS strip (placeholder slots) ───── */
export function ProductTestimonials({ model }: { model: ModelData }) {
  const { language } = useLanguage();
  const lang: Locale = language === "it" ? "it" : "en";

  const c = {
    en: {
      eyebrow: "TESTIMONIALS",
      title: `What people are saying about the ${model.modelName}.`,
      placeholderQuote: "[Add quote text — short, direct, and specific. 1–2 sentences max.]",
      placeholderName: "[Reviewer name]",
      placeholderRole: "[Role / Publication / City]",
    },
    it: {
      eyebrow: "TESTIMONIANZE",
      title: `Cosa dicono della ${model.modelName}.`,
      placeholderQuote: "[Aggiungere testo della citazione — breve, diretta, specifica. Max 1-2 frasi.]",
      placeholderName: "[Nome del recensore]",
      placeholderRole: "[Ruolo / Testata / Città]",
    },
  }[lang];

  // Three placeholder slots — replace via CMS or directly in this file when real
  // testimonials come in. Designed as a real testimonial UI (not generic) so they
  // feel like content waiting for content, not an unbuilt feature.
  const slots = [
    { quote: c.placeholderQuote, name: c.placeholderName, role: c.placeholderRole },
    { quote: c.placeholderQuote, name: c.placeholderName, role: c.placeholderRole },
    { quote: c.placeholderQuote, name: c.placeholderName, role: c.placeholderRole },
  ];

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl lg:max-w-7xl px-4 md:px-0">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500 mb-3">
          {c.eyebrow}
        </p>
        <h2 className="text-3xl sm:text-4xl font-britti font-bold text-black leading-tight max-w-2xl">
          {c.title}
        </h2>
        <ul className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {slots.map((s, i) => (
            <li
              key={i}
              className="rounded-2xl border border-dashed border-gray-300 bg-gray-50/60 p-6 sm:p-7 flex flex-col gap-5"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-orange-500 shrink-0">
                <path
                  d="M9.5 6c-3 0-5.5 2.5-5.5 5.5V18h6v-6H6c0-1.7 1.3-3 3-3V6zm9 0c-3 0-5.5 2.5-5.5 5.5V18h6v-6h-4c0-1.7 1.3-3 3-3V6z"
                  fill="currentColor"
                />
              </svg>
              <blockquote className="text-base sm:text-lg text-gray-500 italic leading-relaxed flex-1">
                {s.quote}
              </blockquote>
              <div className="text-sm">
                <div className="font-britti font-semibold text-gray-700">{s.name}</div>
                <div className="text-gray-400">{s.role}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───── SIMPLIFIED SPECS with "Explore full specs" button ───── */
export function ProductSimplifiedSpecs({ model }: { model: ModelData }) {
  const { language } = useLanguage();
  const lang: Locale = language === "it" ? "it" : "en";

  const c = {
    en: {
      eyebrow: "SPECIFICATIONS",
      title: "The numbers that matter.",
      explore: "Explore full specs",
    },
    it: {
      eyebrow: "SPECIFICHE",
      title: "I numeri che contano.",
      explore: "Tutte le specifiche",
    },
  }[lang];

  // 6 most-important specs — model-agnostic since both share the platform
  // (Tyre-specific differences are noted on the full spec page)
  const specs = [
    {
      label: lang === "it" ? "Autonomia (città)" : "City range",
      value: "150 km",
      sub: "WMTC",
    },
    {
      label: lang === "it" ? "Potenza" : "Power",
      value: lang === "it" ? "11 kW nominale / 27 kW di picco" : "11 kW nominal / 27 kW peak",
      sub: lang === "it" ? "36 CV di picco" : "36 hp peak",
    },
    {
      label: lang === "it" ? "Velocità massima" : "Top speed",
      value: "130 km/h",
      sub: lang === "it" ? "120 km/h sostenuta" : "120 km/h sustained",
    },
    {
      label: lang === "it" ? "Batterie" : "Batteries",
      value: lang === "it" ? "2 × 3,0 kWh rimovibili" : "2 × 3.0 kWh removable",
      sub: "NMC",
    },
    {
      label: lang === "it" ? "Peso" : "Weight",
      value: "127 kg",
      sub: lang === "it" ? "con batterie" : "with batteries",
    },
    {
      label: lang === "it" ? "Patente" : "Licence",
      value: "A1 / B",
      sub: lang === "it" ? "vedi tabella per Paese" : "see country table",
    },
  ];

  return (
    <section className="bg-[#FAF8F5] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl lg:max-w-7xl px-4 md:px-0">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500 mb-3">
              {c.eyebrow}
            </p>
            <h2 className="text-3xl sm:text-4xl font-britti font-bold text-black leading-tight">
              {c.title}
            </h2>
          </div>
          <Link
            href={model.specsHref}
            className="inline-flex items-center gap-2 rounded-full bg-black text-white hover:bg-orange-500 px-6 py-3 text-sm font-semibold transition-colors self-start"
          >
            {c.explore}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {specs.map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-5 border border-gray-100">
              <dt className="text-xs uppercase tracking-wider text-gray-500">{s.label}</dt>
              <dd className="mt-2 text-lg sm:text-xl font-britti font-semibold text-black leading-tight">
                {s.value}
              </dd>
              <dd className="mt-1 text-xs text-gray-400">{s.sub}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ───── RESERVE CTA (final band) ───── */
export function ProductReserveCTA({ model }: { model: ModelData }) {
  const { language } = useLanguage();
  const lang: Locale = language === "it" ? "it" : "en";

  const c = {
    en: {
      eyebrow: "RESERVE NOW",
      title: `Reserve your ${model.modelName}.`,
      sub: "€100 refundable. Held separately. No questions on refunds.",
      cta: "Reserve for €100 →",
    },
    it: {
      eyebrow: "PRENOTA ORA",
      title: `Prenota la tua ${model.modelName}.`,
      sub: "€100 rimborsabili. Custoditi separatamente. Nessuna domanda sui rimborsi.",
      cta: "Prenota per €100 →",
    },
  }[lang];

  return (
    <section className="relative bg-black text-white py-20 sm:py-28 overflow-hidden">
      <div
        className="absolute inset-0 opacity-40 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: "url(/Home/cta-2-bg.png)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-3xl px-4 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-400">{c.eyebrow}</p>
        <h2 className="mt-3 text-3xl sm:text-5xl font-britti font-bold leading-tight">{c.title}</h2>
        <p className="mt-4 text-base sm:text-lg text-white/80">{c.sub}</p>
        <Link
          href="/reserve"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange-500 hover:bg-orange-600 px-7 py-4 text-base md:text-lg font-semibold text-white shadow-sm transition-colors"
        >
          {c.cta}
        </Link>
      </div>
    </section>
  );
}
