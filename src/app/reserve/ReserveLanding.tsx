"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Reserve Landing — the persuasion surface that sits between every "Reserve" CTA
 * on the site and the Stripe checkout. Its only job is to earn the €100 deposit.
 *
 * Sections:
 *  1. Hero
 *  2. Trust strip
 *  3. Model selector  → /checkout?model=...
 *  4. What €100 buys
 *  5. How it works
 *  6. Spec summary
 *  7. Risk-reversal (refund mechanism)
 *  8. FAQ (reservation-specific)
 *  9. End CTA
 *  + sticky bottom CTA on mobile
 *
 * Copy is held in a local translations map (en/it) to keep this addition
 * self-contained without touching the 2,990-line LanguageContext type union.
 */

type Locale = "en" | "it";

const COPY: Record<Locale, Record<string, string>> = {
  en: {
    "hero.eyebrow": "GR1T G1 SERIES",
    "hero.title": "Reserve your G1.\nBe among the first to ride.",
    "hero.sub": "€100 secures your build slot. 100% refundable.",
    "hero.primary": "Reserve for €100",
    "hero.secondary": "Watch the bike",

    "trust.1": "Designed and engineered in Italy",
    "trust.2": "EU homologated — late 2026",
    "trust.3": "100% refundable · instant refund",

    "models.title": "Pick your G1.",
    "models.sub": "Same DNA. Different journeys.",
    "models.g1s.name": "G1S Street",
    "models.g1s.tag": "Engineered for the pulse of the city. A1 / B-license ready.",
    "models.g1s.price": "From €7,000 + VAT",
    "models.g1x.name": "G1X Scrambler",
    "models.g1x.tag": "For the rider who takes the long way home. City + trail.",
    "models.g1x.price": "From €8,000 + VAT",
    "models.cta": "Reserve for €100",
    "models.explore": "Explore the bike",

    "buys.title": "What your €100 actually buys.",
    "buys.sub": "Not a discount. Not a gimmick. Real benefits for early reservers.",
    "buys.1.title": "Priority build slot",
    "buys.1.body": "Early-2027 delivery, ahead of the public release window.",
    "buys.2.title": "First configurator access",
    "buys.2.body": "Configure your bike before public release — colour, motor, spec.",
    "buys.3.title": "Founder's gift",
    "buys.3.body": "A welcome gift, shipped within 7 days of your reservation.",
    "buys.4.title": "Full refund, anytime",
    "buys.4.body": "5 business days. No forms. Held in a separate account.",

    "how.title": "How it works.",
    "how.1.t": "Reserve today",
    "how.1.b": "€100 deposit. 100% refundable. No commitment.",
    "how.2.t": "Configure your bike",
    "how.2.b": "Production opens early 2027. Pick your spec, ahead of public.",
    "how.3.t": "Pay your balance",
    "how.3.b": "€6,900 or €7,900 — financing available in selected markets.",
    "how.4.t": "Ride",
    "how.4.b": "Delivered to you, your distributor, or a GR1T store.",

    "specs.title": "What you're actually buying.",
    "specs.range": "Range",
    "specs.range.v": "150 km",
    "specs.top": "Top speed",
    "specs.top.v": "130 km/h",
    "specs.payload": "Payload",
    "specs.payload.v": "190 kg",
    "specs.charge": "To full charge",
    "specs.charge.v": "3.2 h",
    "specs.batt": "Removable batteries",
    "specs.batt.v": "2",
    "specs.warr": "Warranty",
    "specs.warr.v": "2 + 3 yr",
    "specs.cta": "See full specs and tech",

    "risk.badge": "100% REFUND",
    "risk.title": "Change your mind, get your €100 back in 5 business days. No questions.",
    "risk.body":
      "Your deposit is held in a separate account that GR1T does not touch until your bike enters production. If we never enter production, you're refunded automatically. Your card details are not stored after the refund.",

    "faq.title": "Questions about reserving.",
    "faq.1.q": "Is the €100 really refundable?",
    "faq.1.a":
      "Yes. Fully refundable, anytime before production begins. Funds are held in a separate account, untouched. Refunds are processed within 5 business days, no forms required.",
    "faq.2.q": "Can I switch from G1S to G1X (or back) later?",
    "faq.2.a":
      "Yes. You can change your model up until production locks in early 2027. Your deposit and reservation transfer cleanly.",
    "faq.3.q": "Will the bike be available in my country?",
    "faq.3.a":
      "Launch markets are Italy and Greece (priority 1), with France, Spain, Germany and Portugal following in 2027. We'll keep you informed as we expand. Reservations from other countries are accepted; we'll confirm shipping options when production opens.",
    "faq.4.q": "Is financing available on the balance?",
    "faq.4.a":
      "We are working with finance partners to offer leasing and instalment plans in selected EU markets. Available options will be confirmed before production opens.",
    "faq.5.q": "When will deliveries start?",
    "faq.5.a":
      "First deliveries are planned for early 2027, subject to production confirmation. Founder's reservations ship in the first batch.",
    "faq.6.q": "What happens after I reserve?",
    "faq.6.a":
      "You receive an order confirmation, your welcome gift is dispatched within 7 days, and we add you to the production journal. When configuration opens, you'll get first access.",
    "faq.all": "All questions",

    "end.eyebrow": "RESERVE YOUR G1",
    "end.title": "Be among the first to ride.",
    "end.sub": "€100 refundable. Held separately. No questions on refunds.",
  },
  it: {
    "hero.eyebrow": "GR1T SERIE G1",
    "hero.title": "Prenota la tua G1.\nSii tra i primi a guidarla.",
    "hero.sub": "€100 garantiscono il tuo slot di produzione. 100% rimborsabili.",
    "hero.primary": "Prenota per €100",
    "hero.secondary": "Guarda la moto",

    "trust.1": "Progettata e ingegnerizzata in Italia",
    "trust.2": "Omologazione UE — fine 2026",
    "trust.3": "100% rimborsabile · rimborso immediato",

    "models.title": "Scegli la tua G1.",
    "models.sub": "Stesso DNA. Viaggi diversi.",
    "models.g1s.name": "G1S Street",
    "models.g1s.tag": "Progettata per il ritmo della città. Patenti A1 / B.",
    "models.g1s.price": "Da €7,000 + IVA",
    "models.g1x.name": "G1X Scrambler",
    "models.g1x.tag": "Per chi ama fare il giro lungo. Città + sentieri.",
    "models.g1x.price": "Da €8,000 + IVA",
    "models.cta": "Prenota per €100",
    "models.explore": "Esplora la moto",

    "buys.title": "Cosa ottieni davvero con i tuoi €100.",
    "buys.sub": "Niente sconti finti. Solo vantaggi reali per chi prenota in anticipo.",
    "buys.1.title": "Slot di produzione prioritario",
    "buys.1.body": "Consegna inizio 2027, prima del lancio pubblico.",
    "buys.2.title": "Accesso prioritario alla configurazione",
    "buys.2.body": "Personalizza la tua moto prima del lancio pubblico — colore, motore, allestimento.",
    "buys.3.title": "Regalo Founder",
    "buys.3.body": "Un regalo di benvenuto, spedito entro 7 giorni dalla prenotazione.",
    "buys.4.title": "Rimborso totale, in qualsiasi momento",
    "buys.4.body": "5 giorni lavorativi. Senza moduli. Custodito in un conto separato.",

    "how.title": "Come funziona.",
    "how.1.t": "Prenota oggi",
    "how.1.b": "Deposito €100. 100% rimborsabile. Nessun impegno.",
    "how.2.t": "Configura la tua moto",
    "how.2.b": "Produzione da inizio 2027. Scegli la tua configurazione prima del pubblico.",
    "how.3.t": "Salda il tuo conto",
    "how.3.b": "€6,900 o €7,900 — finanziamento disponibile nei mercati selezionati.",
    "how.4.t": "Guida",
    "how.4.b": "Consegnata a te, al tuo concessionario o presso un punto GR1T.",

    "specs.title": "Cosa stai acquistando davvero.",
    "specs.range": "Autonomia",
    "specs.range.v": "150 km",
    "specs.top": "Velocità massima",
    "specs.top.v": "130 km/h",
    "specs.payload": "Portata",
    "specs.payload.v": "190 kg",
    "specs.charge": "Ricarica completa",
    "specs.charge.v": "3,2 h",
    "specs.batt": "Batterie rimovibili",
    "specs.batt.v": "2",
    "specs.warr": "Garanzia",
    "specs.warr.v": "2 + 3 anni",
    "specs.cta": "Vedi tutte le specifiche e la tecnologia",

    "risk.badge": "RIMBORSO 100%",
    "risk.title": "Cambi idea? Ottieni indietro i tuoi €100 in 5 giorni lavorativi. Senza domande.",
    "risk.body":
      "Il tuo deposito è custodito in un conto separato che GR1T non utilizza fino all'avvio della produzione. Se non entriamo in produzione, vieni rimborsato automaticamente. I dati della carta non vengono conservati dopo il rimborso.",

    "faq.title": "Domande sulla prenotazione.",
    "faq.1.q": "I €100 sono davvero rimborsabili?",
    "faq.1.a":
      "Sì. Totalmente rimborsabili, in qualsiasi momento prima dell'avvio della produzione. I fondi sono custoditi in un conto separato, intatto. I rimborsi vengono elaborati entro 5 giorni lavorativi, senza moduli.",
    "faq.2.q": "Posso passare da G1S a G1X (o viceversa) in seguito?",
    "faq.2.a":
      "Sì. Puoi cambiare modello fino al blocco di produzione di inizio 2027. Il tuo deposito e la prenotazione si trasferiscono senza problemi.",
    "faq.3.q": "La moto sarà disponibile nel mio paese?",
    "faq.3.a":
      "I mercati di lancio sono Italia e Grecia (priorità 1), con Francia, Spagna, Germania e Portogallo a seguire nel 2027. Ti terremo informato durante l'espansione. Accettiamo prenotazioni da altri paesi; confermeremo le opzioni di spedizione all'apertura della produzione.",
    "faq.4.q": "È disponibile un finanziamento sul saldo?",
    "faq.4.a":
      "Stiamo lavorando con partner finanziari per offrire piani di leasing e rateizzazione in mercati UE selezionati. Le opzioni disponibili saranno confermate prima dell'apertura della produzione.",
    "faq.5.q": "Quando inizieranno le consegne?",
    "faq.5.a":
      "Le prime consegne sono previste per inizio 2027, subordinatamente alla conferma della produzione. Le prenotazioni Founder vengono spedite nel primo lotto.",
    "faq.6.q": "Cosa succede dopo la prenotazione?",
    "faq.6.a":
      "Ricevi una conferma d'ordine, il tuo regalo di benvenuto viene spedito entro 7 giorni e ti aggiungiamo al diario di produzione. All'apertura della configurazione, avrai accesso prioritario.",
    "faq.all": "Tutte le domande",

    "end.eyebrow": "PRENOTA LA TUA G1",
    "end.title": "Sii tra i primi a guidarla.",
    "end.sub": "€100 rimborsabili. Custoditi separatamente. Nessuna domanda sul rimborso.",
  },
};

function useC() {
  const { language } = useLanguage();
  const lang: Locale = language === "it" ? "it" : "en";
  return (key: string) => COPY[lang][key] ?? key;
}

export default function ReserveLanding() {
  const c = useC();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="w-full bg-white text-black">
      {/* ───── 1. HERO ───── */}
      <section className="relative min-h-[80vh] w-full overflow-hidden text-white flex items-end pt-24 pb-12 md:pb-20">
        <video
          src="/Home/GR1T%20Website%20HERO%20Video.mp4"
          poster="/Home/hero.jpg"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20 -z-10" />
        <div className="mx-auto max-w-6xl lg:max-w-7xl px-4 md:px-0 w-full">
          <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-orange-400">
            {c("hero.eyebrow")}
          </p>
          <h1 className="mt-3 whitespace-pre-line text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
            {c("hero.title")}
          </h1>
          <p className="mt-5 max-w-xl text-base md:text-xl text-white/90">{c("hero.sub")}</p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href="#models"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-7 py-4 text-base font-semibold text-white shadow-sm hover:bg-orange-600 transition-colors"
            >
              {c("hero.primary")}
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-orange-500">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
            <Link
              href="/G1S"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/80 px-7 py-4 text-base font-semibold text-white hover:bg-white/10 transition-colors"
            >
              {c("hero.secondary")}
            </Link>
          </div>
        </div>
      </section>

      {/* ───── 2. TRUST STRIP ───── */}
      <section className="bg-black text-white">
        <div className="mx-auto max-w-6xl lg:max-w-7xl grid grid-cols-1 md:grid-cols-3 text-center">
          <div className="py-5 px-4 border-b md:border-b-0 md:border-r border-white/10 text-sm md:text-base">
            <span className="text-orange-400 mr-2">★</span>
            {c("trust.1")}
          </div>
          <div className="py-5 px-4 border-b md:border-b-0 md:border-r border-white/10 text-sm md:text-base">
            <span className="text-orange-400 mr-2">★</span>
            {c("trust.2")}
          </div>
          <div className="py-5 px-4 text-sm md:text-base">
            <span className="text-orange-400 mr-2">★</span>
            {c("trust.3")}
          </div>
        </div>
      </section>

      {/* ───── 3. MODEL SELECTOR ───── */}
      <section id="models" className="py-16 md:py-24 bg-white scroll-mt-24">
        <div className="mx-auto max-w-6xl lg:max-w-7xl px-4 md:px-0">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold"
          >
            {c("models.title")}
          </motion.h2>
          <p className="mt-3 text-base md:text-lg text-gray-600">{c("models.sub")}</p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* G1S */}
            <div className="rounded-2xl border border-gray-200 bg-gray-50 hover:border-orange-500 transition-colors overflow-hidden flex flex-col group">
              <div className="relative h-64 md:h-80 bg-gray-100">
                <Image
                  src="/Home/bikes/G1S.png"
                  alt="GR1T G1S Street"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-6 transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <h3 className="text-2xl md:text-3xl font-bold">{c("models.g1s.name")}</h3>
                <p className="mt-2 text-base text-gray-700">{c("models.g1s.tag")}</p>
                <p className="mt-4 text-xl md:text-2xl font-semibold">{c("models.g1s.price")}</p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/checkout?model=G1S"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm md:text-base font-semibold text-white shadow-sm hover:bg-orange-600 transition-colors"
                  >
                    {c("models.cta")}
                  </Link>
                  <Link
                    href="/G1S"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-black px-5 py-3 text-sm md:text-base font-semibold text-black hover:bg-black hover:text-white transition-colors"
                  >
                    {c("models.explore")}
                  </Link>
                </div>
              </div>
            </div>

            {/* G1X */}
            <div className="rounded-2xl border border-gray-200 bg-gray-50 hover:border-orange-500 transition-colors overflow-hidden flex flex-col group">
              <div className="relative h-64 md:h-80 bg-gray-100">
                <Image
                  src="/Home/bikes/G1X.png"
                  alt="GR1T G1X Scrambler"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-6 transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <h3 className="text-2xl md:text-3xl font-bold">{c("models.g1x.name")}</h3>
                <p className="mt-2 text-base text-gray-700">{c("models.g1x.tag")}</p>
                <p className="mt-4 text-xl md:text-2xl font-semibold">{c("models.g1x.price")}</p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/checkout?model=G1X"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm md:text-base font-semibold text-white shadow-sm hover:bg-orange-600 transition-colors"
                  >
                    {c("models.cta")}
                  </Link>
                  <Link
                    href="/G1X"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-black px-5 py-3 text-sm md:text-base font-semibold text-black hover:bg-black hover:text-white transition-colors"
                  >
                    {c("models.explore")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── 4. WHAT €100 BUYS ───── */}
      <section className="py-16 md:py-24 bg-[#FAF8F5]">
        <div className="mx-auto max-w-6xl lg:max-w-7xl px-4 md:px-0">
          <h2 className="text-3xl md:text-5xl font-bold max-w-3xl">{c("buys.title")}</h2>
          <p className="mt-3 text-base md:text-lg text-gray-600 max-w-2xl">{c("buys.sub")}</p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {[
              { ico: "▲", title: c("buys.1.title"), body: c("buys.1.body"), color: "bg-orange-500 text-white" },
              { ico: "◆", title: c("buys.2.title"), body: c("buys.2.body"), color: "bg-black text-orange-400" },
              { ico: "★", title: c("buys.3.title"), body: c("buys.3.body"), color: "bg-yellow-400 text-black" },
              { ico: "↻", title: c("buys.4.title"), body: c("buys.4.body"), color: "bg-emerald-600 text-white" },
            ].map((tile, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="rounded-2xl bg-white border border-gray-200 p-6 md:p-7 flex flex-col"
              >
                <div className={`w-12 h-12 rounded-xl ${tile.color} flex items-center justify-center text-xl font-bold mb-4`}>
                  {tile.ico}
                </div>
                <h3 className="text-lg md:text-xl font-bold leading-tight">{tile.title}</h3>
                <p className="mt-2 text-sm md:text-base text-gray-600">{tile.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── 5. HOW IT WORKS ───── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-6xl lg:max-w-7xl px-4 md:px-0">
          <h2 className="text-3xl md:text-5xl font-bold">{c("how.title")}</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {[
              { n: "01", t: c("how.1.t"), b: c("how.1.b") },
              { n: "02", t: c("how.2.t"), b: c("how.2.b") },
              { n: "03", t: c("how.3.t"), b: c("how.3.b") },
              { n: "04", t: c("how.4.t"), b: c("how.4.b") },
            ].map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="rounded-2xl border border-gray-200 bg-gray-50 p-6 md:p-7 flex flex-col"
              >
                <div className="text-4xl md:text-5xl font-bold text-orange-500 leading-none">{s.n}</div>
                <h3 className="mt-4 text-lg md:text-xl font-bold leading-tight">{s.t}</h3>
                <p className="mt-2 text-sm md:text-base text-gray-600">{s.b}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── 6. SPEC SUMMARY ───── */}
      <section className="py-16 md:py-20 bg-[#FAF8F5]">
        <div className="mx-auto max-w-6xl lg:max-w-7xl px-4 md:px-0">
          <h2 className="text-2xl md:text-4xl font-bold">{c("specs.title")}</h2>
          <div className="mt-8 rounded-2xl bg-white border border-gray-200 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 overflow-hidden">
            {[
              { v: c("specs.range.v"), l: c("specs.range") },
              { v: c("specs.top.v"), l: c("specs.top") },
              { v: c("specs.payload.v"), l: c("specs.payload") },
              { v: c("specs.charge.v"), l: c("specs.charge") },
              { v: c("specs.batt.v"), l: c("specs.batt") },
              { v: c("specs.warr.v"), l: c("specs.warr") },
            ].map((s, i) => (
              <div
                key={i}
                className="px-5 py-6 text-center border-b sm:border-r border-gray-200 last:border-r-0 [&:nth-child(2n)]:border-r-0 md:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(3n)]:border-r md:[&:nth-child(2n)]:border-r lg:[&:nth-child(6n)]:border-r-0"
              >
                <div className="text-2xl md:text-3xl font-bold leading-none">{s.v}</div>
                <div className="mt-2 text-xs md:text-sm text-gray-500 uppercase tracking-wider">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex gap-3 flex-wrap">
            <Link
              href="/G1S"
              className="inline-flex items-center gap-2 rounded-full border border-black px-5 py-2.5 text-sm font-semibold text-black hover:bg-black hover:text-white transition-colors"
            >
              {c("specs.cta")} (G1S)
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/G1X"
              className="inline-flex items-center gap-2 rounded-full border border-black px-5 py-2.5 text-sm font-semibold text-black hover:bg-black hover:text-white transition-colors"
            >
              {c("specs.cta")} (G1X)
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ───── 7. RISK REVERSAL ───── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-6xl lg:max-w-7xl px-4 md:px-0">
          <div className="rounded-2xl bg-black text-white p-7 md:p-10 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-8 items-center">
            <div
              className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-orange-500 flex items-center justify-center text-orange-400 text-center font-bold text-sm md:text-base leading-tight mx-auto md:mx-0"
              aria-hidden="true"
            >
              {c("risk.badge").split(" ").map((w, i) => (
                <span key={i} className="block">{w}</span>
              ))}
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold leading-snug">{c("risk.title")}</h3>
              <p className="mt-3 text-sm md:text-base text-gray-300 leading-relaxed">{c("risk.body")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ───── 8. FAQ ───── */}
      <section className="py-16 md:py-20 bg-[#FAF8F5]">
        <div className="mx-auto max-w-4xl px-4 md:px-0">
          <h2 className="text-3xl md:text-4xl font-bold">{c("faq.title")}</h2>
          <div className="mt-8 divide-y divide-gray-200 border-y border-gray-200">
            {[1, 2, 3, 4, 5, 6].map((n, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={n}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full text-left py-5 flex items-start justify-between gap-4 hover:text-orange-500 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base md:text-lg font-semibold">{c(`faq.${n}.q`)}</span>
                    <span
                      className={`flex-shrink-0 mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full text-orange-500 transition-transform ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden="true"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                  {isOpen && (
                    <div className="pb-6 pr-10 text-sm md:text-base text-gray-700 leading-relaxed">{c(`faq.${n}.a`)}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───── 9. END CTA ───── */}
      <section
        className="relative py-20 md:py-28 text-white text-center overflow-hidden bg-black"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,.6), rgba(0,0,0,.85)), url(/Home/cta-2-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-3xl px-4">
          <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.22em] text-orange-400">{c("end.eyebrow")}</p>
          <h2 className="mt-3 text-3xl md:text-5xl font-bold leading-tight">{c("end.title")}</h2>
          <p className="mt-4 text-base md:text-lg text-white/80">{c("end.sub")}</p>
          <a
            href="#models"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange-500 px-7 py-4 text-base md:text-lg font-semibold text-white shadow-sm hover:bg-orange-600 transition-colors"
          >
            {c("hero.primary")}
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-orange-500">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>
      </section>

      {/* ───── STICKY MOBILE CTA ───── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-t border-white/10 px-4 py-3">
        <a
          href="#models"
          className="block w-full text-center rounded-full bg-orange-500 px-6 py-3 text-base font-semibold text-white shadow-sm"
        >
          {c("hero.primary")} →
        </a>
      </div>
    </div>
  );
}
