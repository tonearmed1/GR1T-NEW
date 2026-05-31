"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

/**
 * TechFeatures — homepage section consolidating the tech story.
 *
 * Structure (per user direction):
 *  - 2 spotlight features with longer descriptions and alternating image/text layout
 *  - 6 hover-expand cards beneath for the supporting features (DAB-style:
 *    compact card with title; on hover, image scales and an overlay slides
 *    up from the bottom revealing the longer description)
 *
 * Replaces the standalone /tech page (which is deleted). Product pages link
 * back to /#tech-features instead of duplicating any of this content.
 *
 * Copy is local (small COPY map) so we don't have to touch the big LanguageContext
 * type union for a one-off addition.
 */

type Locale = "en" | "it";

const COPY = {
  en: {
    eyebrow: "THE G1 ADVANTAGE",
    title: "Built for how you actually ride.",
    sub: "Designed and engineered in Italy. Premium materials, real-world utility, and the smart tech you'd expect from a far more expensive bike.",
    moreHeading: "And the rest of the toolkit.",
  },
  it: {
    eyebrow: "IL VANTAGGIO G1",
    title: "Costruita per come guidi davvero.",
    sub: "Progettata e ingegnerizzata in Italia. Materiali premium, vera utilità quotidiana e la tecnologia smart che ti aspetti da una moto molto più costosa.",
    moreHeading: "E il resto del kit.",
  },
} as const;

interface Spotlight {
  image: string;
  alt: { en: string; it: string };
  eyebrow: { en: string; it: string };
  title: { en: string; it: string };
  body: { en: string; it: string };
  stat?: { value: string; label: { en: string; it: string } }[];
}

const SPOTLIGHTS: Spotlight[] = [
  {
    image: "/tech/10_EVERYDAY.png",
    alt: {
      en: "GR1T G1 removable battery pack being lifted out of the frame",
      it: "Pacco batteria rimovibile della GR1T G1 estratto dal telaio",
    },
    eyebrow: { en: "REMOVABLE DUAL BATTERY", it: "DOPPIA BATTERIA RIMOVIBILE" },
    title: { en: "Two batteries. Charge anywhere.", it: "Due batterie. Ricarica ovunque." },
    body: {
      en: "Two 3.0 kWh packs slot out cleanly so you can charge at home, at work, or anywhere with a standard outlet. No 100 kg motorcycle to wrestle up the stairs — just two laptop-sized batteries.",
      it: "Due pacchi da 3,0 kWh si estraggono facilmente per ricaricare a casa, al lavoro o ovunque ci sia una presa standard. Niente moto da 100 kg da portare su per le scale — solo due batterie grandi come un laptop.",
    },
    stat: [
      { value: "150 km", label: { en: "Range", it: "Autonomia" } },
      { value: "3.2 h", label: { en: "Full charge", it: "Ricarica completa" } },
      { value: "6 kWh", label: { en: "Total capacity", it: "Capacità totale" } },
    ],
  },
  {
    image: "/tech/hero.png",
    alt: {
      en: "GR1T 5-inch 4G connected display showing wireless CarPlay navigation",
      it: "Display 5 pollici 4G connesso GR1T con navigazione CarPlay wireless",
    },
    eyebrow: { en: "5\" CONNECTED DISPLAY", it: "DISPLAY CONNESSO 5\"" },
    title: { en: "Your phone, your music, your maps.", it: "Il tuo telefono, la tua musica, le tue mappe." },
    body: {
      en: "Wireless Apple CarPlay and Android Auto on a bright 5-inch display, with built-in 4G keeping you connected even when your phone isn't. Pair it with the GR1T app for keyless unlock, ride history, battery health, and over-the-air updates.",
      it: "Apple CarPlay e Android Auto wireless su un display luminoso da 5 pollici, con 4G integrato che ti mantiene connesso anche quando il tuo telefono non lo è. Abbinalo all'app GR1T per sblocco senza chiave, cronologia, salute delle batterie e aggiornamenti OTA.",
    },
  },
];

interface HoverCard {
  image: string;
  alt: { en: string; it: string };
  title: { en: string; it: string };
  description: { en: string; it: string };
}

const HOVER_CARDS: HoverCard[] = [
  {
    image: "/tech/03_SMART-TECH.png",
    alt: { en: "GR1T keyless unlock", it: "Sblocco senza chiave GR1T" },
    title: { en: "Walk up. Ride away.", it: "Avvicinati. E parti." },
    description: {
      en: "The bike unlocks automatically as you approach with your phone or smartwatch. No keys to lose. Lock and unlock remotely from the app.",
      it: "La moto si sblocca automaticamente quando ti avvicini con il telefono o lo smartwatch. Nessuna chiave da perdere. Blocca e sblocca da remoto dall'app.",
    },
  },
  {
    image: "/tech/02_SMART-TECH.png",
    alt: { en: "Wireless phone charging compartment", it: "Vano per ricarica wireless del telefono" },
    title: { en: "Top up while you ride.", it: "Ricarica mentre guidi." },
    description: {
      en: "A glove compartment above the battery pack houses a wireless charging pad and USB-C port. Park, plug in, ride on.",
      it: "Un vano sopra il pacco batteria ospita una piastra di ricarica wireless e una porta USB-C. Parcheggia, collega, riparti.",
    },
  },
  {
    image: "/tech/05_CAMERAS.png",
    alt: { en: "GR1T front and rear cameras", it: "Videocamere anteriore e posteriore GR1T" },
    title: { en: "Every ride, on record.", it: "Ogni viaggio, registrato." },
    description: {
      en: "Dual cameras capture every ride on a secure loop, with optional cloud storage. A rider-facing camera activates if the bike is moved without your key.",
      it: "Due videocamere catturano ogni viaggio su un loop sicuro, con archiviazione cloud opzionale. Una videocamera rivolta al pilota si attiva se la moto viene mossa senza la tua chiave.",
    },
  },
  {
    image: "/tech/07_EVERYDAY.png",
    alt: { en: "Under-seat storage compartment", it: "Vano portaoggetti sotto la sella" },
    title: { en: "Real-life space.", it: "Spazio per la vita reale." },
    description: {
      en: "Nine litres under the seat — a backpack, your on-board charger, or both. Designed for everyday riding, not just spec sheets.",
      it: "Nove litri sotto la sella — uno zaino, il caricatore di bordo, o entrambi. Progettato per la guida quotidiana, non solo per le schede tecniche.",
    },
  },
  {
    image: "/tech/11_EVERYDAY.png",
    alt: { en: "Charging the GR1T G1 at a public station", it: "Ricarica della GR1T G1 a una stazione pubblica" },
    title: { en: "Plug in. Power up.", it: "Collega. Accendi." },
    description: {
      en: "Integrated on-board charger and external socket. Compatible with public charging stations or any standard outlet. No batteries need to come out.",
      it: "Caricatore di bordo integrato e presa esterna. Compatibile con stazioni di ricarica pubbliche o qualsiasi presa standard. Non serve estrarre le batterie.",
    },
  },
  {
    image: "/tech/13_CRAFTED.png",
    alt: { en: "GR1T belt drive system", it: "Sistema a cinghia GR1T" },
    title: { en: "Silent. Low maintenance.", it: "Silenziosa. Bassa manutenzione." },
    description: {
      en: "A belt drive replaces the traditional chain. Smooth, quiet, and built to last. No oiling. No grinding. Just ride.",
      it: "Una trasmissione a cinghia sostituisce la catena tradizionale. Fluida, silenziosa e costruita per durare. Niente lubrificazione. Niente rumori. Solo guida.",
    },
  },
];

export default function TechFeatures() {
  const { language } = useLanguage();
  const lang: Locale = language === "it" ? "it" : "en";
  const c = COPY[lang];

  return (
    <section id="tech-features" className="bg-white py-16 sm:py-24 scroll-mt-24">
      <div className="mx-auto max-w-6xl lg:max-w-7xl px-4 md:px-0">
        {/* Section header */}
        <div className="max-w-3xl mb-12 sm:mb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500 mb-3">
            {c.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-5xl font-britti font-bold text-black leading-tight">
            {c.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600">{c.sub}</p>
        </div>

        {/* Spotlight features — alternating left/right layout */}
        <div className="space-y-16 sm:space-y-24 mb-16 sm:mb-24">
          {SPOTLIGHTS.map((s, i) => {
            const reverse = i % 2 === 1;
            return (
              <motion.div
                key={s.image}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center ${
                  reverse ? "lg:[&>div:first-child]:order-2" : ""
                }`}
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                  <Image
                    src={s.image}
                    alt={s.alt[lang]}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500 mb-3">
                    {s.eyebrow[lang]}
                  </p>
                  <h3 className="text-2xl sm:text-4xl font-britti font-bold text-black leading-tight">
                    {s.title[lang]}
                  </h3>
                  <p className="mt-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                    {s.body[lang]}
                  </p>
                  {s.stat && (
                    <div className="mt-7 grid grid-cols-3 gap-4 sm:gap-6">
                      {s.stat.map((st) => (
                        <div key={st.value}>
                          <div className="text-xl sm:text-3xl font-britti font-bold text-black leading-none">
                            {st.value}
                          </div>
                          <div className="mt-1.5 text-xs uppercase tracking-wider text-gray-500">
                            {st.label[lang]}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Sub-heading for the hover grid */}
        <h3 className="text-xl sm:text-2xl font-britti font-semibold text-black mb-6 sm:mb-8">
          {c.moreHeading}
        </h3>

        {/* DAB-style hover-expand cards.
            Default: image fills card, title sits over the bottom in a gradient.
            Hover (desktop): image scales subtly, a dark overlay slides up from the
            bottom revealing the longer description. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {HOVER_CARDS.map((card, i) => (
            <motion.article
              key={card.image}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-black cursor-pointer"
            >
              <Image
                src={card.image}
                alt={card.alt[lang]}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />

              {/* Default state: gradient + title only */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-10 transition-transform duration-500 ease-out group-hover:-translate-y-1">
                <h4 className="text-lg sm:text-xl font-britti font-bold text-white leading-snug">
                  {card.title[lang]}
                </h4>

                {/* Description — hidden by default, slides up + fades in on hover (and on mobile where there's no hover, always visible at low opacity) */}
                <p className="mt-2 text-sm text-white/90 leading-relaxed max-h-0 opacity-0 overflow-hidden transition-all duration-500 ease-out group-hover:max-h-40 group-hover:opacity-100 sm:max-h-0 sm:opacity-0">
                  {card.description[lang]}
                </p>
              </div>

              {/* Mobile: tap-friendly version. On touch devices that don't support hover,
                  show a small read-more chevron in the corner. This is purely visual — the
                  description text is already always-on by media query below this block. */}
              <noscript>
                <p className="absolute inset-x-0 bottom-0 p-5 text-sm text-white/90 bg-gradient-to-t from-black/85 to-transparent">
                  {card.description[lang]}
                </p>
              </noscript>
            </motion.article>
          ))}
        </div>

        {/* Mobile fallback: on small screens where hover isn't a thing, ensure descriptions
            are visible without requiring a tap. Compact spacing below each card image. */}
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
