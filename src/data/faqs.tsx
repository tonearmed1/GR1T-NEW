"use client";

import React from "react";
import Link from "next/link";
import LicenseTableModal from "@/components/reusable/LicenseTableModal";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Centralised FAQ data.
 *
 * Each entry is tagged with a category and is rendered via the FAQBrowser
 * component (search + category pills + accordion). Answers can be rich JSX
 * (links, lists, modals) — text content comes from LanguageContext so EN/IT
 * stay in sync with the rest of the site.
 *
 * Adding a new question:
 *   1. Add its question + answer strings to LanguageContext (both en + it)
 *   2. Append an entry below with the right category
 *
 * Adding a new category:
 *   1. Add the slug to FAQCategory union below
 *   2. Add a label in CATEGORY_LABELS
 *   3. Tag entries with the new category
 */

export type FAQCategory =
  | "about"
  | "motorcycles"
  | "battery"
  | "licence"
  | "buying"
  | "warranty"
  | "customisation";

export const CATEGORY_LABELS: Record<FAQCategory, { en: string; it: string }> = {
  about: { en: "About GR1T", it: "Su GR1T" },
  // "motorcycles" slug retained for backward-compat URLs; visible label renamed to "Bike Specs"
  // per the May 2026 FAQ expansion (full G1S + G1X spec listings live in this category).
  motorcycles: { en: "Bike Specs", it: "Specifiche" },
  battery: { en: "Battery & Charging", it: "Batteria & Ricarica" },
  licence: { en: "Licence & Legal", it: "Patente & Normative" },
  buying: { en: "Reservations & Delivery", it: "Prenotazioni & Consegna" },
  warranty: { en: "Warranty & Support", it: "Garanzia & Assistenza" },
  customisation: { en: "Customisation", it: "Personalizzazione" },
};

export interface FAQEntry {
  id: string; // stable slug, used in URLs and for keys
  category: FAQCategory;
  question: string;
  answer: React.ReactNode;
  /** Plain-text answer for search index (used to also generate FAQPage schema) */
  searchText: string;
}

/**
 * Hook that returns the full FAQ list with localised text.
 * Use inside any client component that needs the FAQs.
 */
export function useFAQs(): FAQEntry[] {
  const { t } = useLanguage();

  return [
    /* ── ABOUT GR1T ──
       Original content drawn from the GR1T brand book + copy package. No external
       sources reproduced; topic structure inspired by Maeving/DAB help-centre patterns. */
    {
      id: "who-is-gr1t",
      category: "about",
      question: "Who is GR1T?",
      searchText:
        "GR1T Motorcycles premium urban brand designed engineered Italy Motor Valley electric Berlin Milan Cyprus",
      answer: (
        <p>
          GR1T Motorcycles is a premium urban electric motorcycle brand, designed and engineered
          in Italy&rsquo;s Motor Valley. We build motorcycles for the cities of tomorrow:
          confident, refined, technical, and unapologetically real &mdash; without the futuristic
          clichés that dominate the EV space.
        </p>
      ),
    },
    {
      id: "where-is-gr1t-based",
      category: "about",
      question: "Where is GR1T based?",
      searchText:
        "GR1T headquarters Berlin Germany Milan Italy Limassol Cyprus office locations company",
      answer: (
        <div className="space-y-2">
          <p>We operate across three offices:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>GR1T Motorcycles GmbH</strong> &mdash; Berlin, Germany (operations)</li>
            <li><strong>GR1T Motorcycles GmbH</strong> &mdash; Milan, Italy (design &amp; engineering)</li>
            <li><strong>GR1T Motorcycles (Holdings) Ltd</strong> &mdash; Limassol, Cyprus (corporate)</li>
          </ul>
        </div>
      ),
    },
    {
      id: "where-are-bikes-made",
      category: "about",
      question: "Where are GR1T motorcycles made?",
      searchText: "designed engineered Italy Motor Valley assembled Europe manufacturing factory",
      answer: (
        <p>
          GR1T motorcycles are designed and engineered in Italy&rsquo;s Motor Valley &mdash; the
          historic home of Ducati, Ferrari, Lamborghini and Maserati &mdash; and assembled in
          Europe. Final assembly and supplier details will be confirmed as we approach the
          start of production in 2026.
        </p>
      ),
    },
    {
      id: "what-does-gr1t-stand-for",
      category: "about",
      question: "What does GR1T stand for?",
      searchText: "GR1T name meaning brand voice grit pronunciation",
      answer: (
        <p>
          GR1T is pronounced &ldquo;grit&rdquo;. The name captures our brand voice &mdash;
          grounded, direct, unapologetic &mdash; and the &ldquo;1&rdquo; references the G1
          platform, our first family of electric motorcycles (G1S Street and G1X Scrambler).
        </p>
      ),
    },
    {
      id: "environmental-impact",
      category: "about",
      question: "Are GR1T motorcycles environmentally friendly?",
      searchText:
        "zero emission electric environmental impact sustainability ISO 14001 battery passport recycling",
      answer: (
        <div className="space-y-3">
          <p>
            GR1T motorcycles produce zero tailpipe emissions. Total environmental impact also
            depends on where your electricity comes from &mdash; charging on renewable power is
            significantly cleaner than fossil-fuel grid mixes.
          </p>
          <p>
            Beyond use, we&rsquo;re committed to circularity by design:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Batteries comply with EU Regulation 2023/1542 (Digital Battery Passport, full life-cycle)</li>
            <li>We operate to ISO 14001 environmental management standards</li>
            <li>Chargers, cabling and electronics are recoverable under the EU WEEE Directive</li>
            <li>Right-to-Repair compliant &mdash; every part can be reordered and replaced</li>
          </ul>
        </div>
      ),
    },
    {
      id: "founders",
      category: "about",
      question: "Who founded GR1T?",
      searchText: "founders team leadership Philip Ammerman Omar Abukhlal background",
      answer: (
        <p>
          GR1T was founded by an experienced team drawing on backgrounds in mobility strategy,
          industrial design, and venture-building. Meet the team on our{" "}
          <Link href="/about-us" className="text-orange-500 underline hover:text-orange-600">
            About page
          </Link>.
        </p>
      ),
    },
    {
      id: "contact-gr1t",
      category: "about",
      question: "How can I contact GR1T?",
      searchText: "contact email support phone get in touch help",
      answer: (
        <p>
          The fastest way is email: <a className="text-orange-500 underline" href="mailto:grit@gritmotorcycles.com">grit@gritmotorcycles.com</a>.
          Phone numbers for our Berlin and Milan offices are in the footer. For specific
          enquiries, use the form on our{" "}
          <Link href="/contact" className="text-orange-500 underline hover:text-orange-600">
            contact page
          </Link>.
        </p>
      ),
    },
    {
      id: "stay-updated",
      category: "about",
      question: "How can I stay updated on GR1T?",
      searchText: "newsletter subscribe instagram social media follow updates news",
      answer: (
        <p>
          Subscribe to the newsletter in the footer for production updates and ride stories, or
          follow{" "}
          <a
            className="text-orange-500 underline"
            href="https://www.instagram.com/grit.motorcycles"
            target="_blank"
            rel="noopener noreferrer"
          >
            @grit.motorcycles
          </a>{" "}
          on Instagram.
        </p>
      ),
    },

    /* ── BIKE SPECS (formerly "Motorcycles") ──
       Full G1S + G1X spec listings added per May 2026 user request — answers to
       these two questions are the complete spec sheet so visitors don't need to
       click through to the dedicated /G1S/specs or /G1X/specs pages. */
    {
      id: "full-g1s-specs",
      category: "motorcycles",
      question: "What are the full G1S Street specs?",
      searchText:
        "G1S Street full complete specifications range top speed power batteries chassis dimensions weight Pirelli",
      answer: (
        <div className="space-y-3">
          <p><strong>Range</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>City: 150 km (WMTC)</li>
            <li>City/highway combined: 120 km</li>
          </ul>
          <p><strong>Performance</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Continuous power: 11 kW (56 Nm @ 3,200 RPM)</li>
            <li>Peak power: 26.6 kW (36 hp)</li>
            <li>Top speed: 130 km/h sustained, 135 km/h peak</li>
            <li>Peak torque: 85 Nm</li>
            <li>Riding modes: ECO, Street, Sport, Walk, Reverse</li>
          </ul>
          <p><strong>Batteries &amp; Charging</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>2 × 3.0 kWh removable NMC packs (6 kWh total)</li>
            <li>Chemistry: 8P20S, 10C (74V 40Ah)</li>
            <li>Full charge: ~3.2 hours at 220V (on-board charger)</li>
          </ul>
          <p><strong>Chassis</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Front fork: Ø41 mm inverted cartridge</li>
            <li>Rear suspension: pull-out shock, Ø40 mm piston, adjustable preload</li>
            <li>Brakes: J.Juan 4-piston front (320 × 5 mm), dual-piston rear (240 × 4.5 mm)</li>
            <li>Tyres: Pirelli Angel City 110/70-17&rdquo; front, 140/70-17&rdquo; rear</li>
            <li>Wheels: 3.00&rdquo; × 17&rdquo; front, 4.00&rdquo; × 17&rdquo; rear</li>
          </ul>
          <p><strong>Dimensions &amp; Weight</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Wheelbase: 1,345 mm</li>
            <li>Seat height: 810 mm</li>
            <li>Rake: 23°, Trail: 87.2 mm</li>
            <li>Curb weight: 127 kg (with battery pack)</li>
            <li>Max carrying capacity (two-up): 190 kg &mdash; best in class</li>
          </ul>
          <p><strong>Licence &amp; Price</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Licence: A1, or B in some EU countries (see country table)</li>
            <li>MSRP: €7,000 + VAT</li>
            <li>Warranty: 2 years unlimited km, 3 years / 36,000 km on powertrain + battery (≥70% SOH)</li>
          </ul>
          <p className="pt-2">
            <Link href="/G1S/specs" className="text-orange-500 underline hover:text-orange-600">
              Open the detailed G1S specs page →
            </Link>
          </p>
        </div>
      ),
    },
    {
      id: "full-g1x-specs",
      category: "motorcycles",
      question: "What are the full G1X Scrambler specs?",
      searchText:
        "G1X Scrambler full complete specifications range top speed power batteries chassis dimensions weight Metzeler Karoo",
      answer: (
        <div className="space-y-3">
          <p><strong>Range</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>City: 150 km (WMTC)</li>
            <li>City/highway combined: 120 km</li>
          </ul>
          <p><strong>Performance</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Continuous power: 11 kW</li>
            <li>Peak power: 26.6 kW (36 hp)</li>
            <li>Top speed: 130 km/h sustained, 135 km/h peak</li>
            <li>Peak torque: 85 Nm</li>
            <li>Riding modes: ECO, Street, Sport, Walk, Reverse</li>
          </ul>
          <p><strong>Batteries &amp; Charging</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>2 × 3.0 kWh removable NMC packs (6 kWh total)</li>
            <li>Full charge: ~3.2 hours at 220V</li>
          </ul>
          <p><strong>Chassis &mdash; built for city + trail</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Front fork: Ø41 mm inverted cartridge, longer travel for off-road compliance</li>
            <li>Tyres: Metzeler Karoo Street 110/70-17&rdquo; front, 140/70-17&rdquo; rear</li>
            <li>Wheels: 17&rdquo; front + rear</li>
          </ul>
          <p><strong>Dimensions &amp; Weight</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Curb weight: 127 kg (with battery pack)</li>
            <li>Max carrying capacity (two-up): 190 kg &mdash; best in class</li>
          </ul>
          <p><strong>Licence &amp; Price</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Licence: A1, or B in some EU countries (see country table)</li>
            <li>MSRP: €8,000 + VAT</li>
            <li>Warranty: 2 years unlimited km, 3 years / 36,000 km on powertrain + battery (≥70% SOH)</li>
          </ul>
          <p className="pt-2">
            <Link href="/G1X/specs" className="text-orange-500 underline hover:text-orange-600">
              Open the detailed G1X specs page →
            </Link>
          </p>
        </div>
      ),
    },

    /* ── Existing motorcycles entries follow ── */
    {
      id: "key-specs",
      category: "motorcycles",
      question: t("home.faq.q.keySpecs"),
      searchText: [
        t("home.faq.a.keySpecs.list.topSpeed"),
        t("home.faq.a.keySpecs.list.range"),
        t("home.faq.a.keySpecs.list.battery"),
        t("home.faq.a.keySpecs.list.charging"),
        t("home.faq.a.keySpecs.list.power"),
        t("home.faq.a.keySpecs.list.weight"),
        t("home.faq.a.keySpecs.list.payload"),
        t("home.faq.a.keySpecs.list.license"),
      ].join(" "),
      answer: (
        <div className="space-y-2">
          <ul className="list-disc pl-5 space-y-1">
            <li>{t("home.faq.a.keySpecs.list.topSpeed")}</li>
            <li>{t("home.faq.a.keySpecs.list.range")}</li>
            <li>{t("home.faq.a.keySpecs.list.battery")}</li>
            <li>{t("home.faq.a.keySpecs.list.charging")}</li>
            <li>{t("home.faq.a.keySpecs.list.power")}</li>
            <li>{t("home.faq.a.keySpecs.list.weight")}</li>
            <li>{t("home.faq.a.keySpecs.list.payload")}</li>
            <li>{t("home.faq.a.keySpecs.list.license")}</li>
          </ul>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/G1S#g1s-specs" className="text-orange-500 underline hover:text-orange-600">
              {t("home.faq.visitG1S")}
            </Link>
            <Link href="/G1X#g1x-specs" className="text-orange-500 underline hover:text-orange-600">
              {t("home.faq.visitG1X")}
            </Link>
          </div>
        </div>
      ),
    },
    {
      id: "range",
      category: "motorcycles",
      question: t("home.faq.q.range"),
      searchText: t("home.faq.a.range.p1"),
      answer: <p>{t("home.faq.a.range.p1")}</p>,
    },
    {
      id: "motorway",
      category: "motorcycles",
      question: t("home.faq.q.motorway"),
      searchText: t("home.faq.a.motorway.p1"),
      answer: <p>{t("home.faq.a.motorway.p1")}</p>,
    },
    {
      id: "two-riders",
      category: "motorcycles",
      question: t("home.faq.q.twoRiders"),
      searchText: t("home.faq.a.twoRiders.p1"),
      answer: <p>{t("home.faq.a.twoRiders.p1")}</p>,
    },
    {
      id: "difference",
      category: "motorcycles",
      question: t("home.faq.q.difference"),
      searchText: [
        t("home.faq.a.difference.list.1"),
        t("home.faq.a.difference.list.2"),
        t("home.faq.a.difference.list.3"),
        t("home.faq.a.difference.list.4"),
        t("home.faq.a.difference.list.5"),
        t("home.faq.a.difference.list.6"),
        t("home.faq.a.difference.list.7"),
      ].join(" "),
      answer: (
        <ul className="list-disc pl-5 space-y-1">
          <li>{t("home.faq.a.difference.list.1")}</li>
          <li>{t("home.faq.a.difference.list.2")}</li>
          <li>{t("home.faq.a.difference.list.3")}</li>
          <li>{t("home.faq.a.difference.list.4")}</li>
          <li>{t("home.faq.a.difference.list.5")}</li>
          <li>{t("home.faq.a.difference.list.6")}</li>
          <li>{t("home.faq.a.difference.list.7")}</li>
        </ul>
      ),
    },
    {
      id: "tyres-wheels",
      category: "motorcycles",
      question: t("home.faq.q.tyresWheels"),
      searchText: [
        t("home.faq.a.tyresWheels.intro"),
        t("home.faq.a.tyresWheels.g1x"),
        "Pirelli Angel City Metzeler Karoo Street 17",
      ].join(" "),
      answer: (
        <div className="space-y-3">
          <p>{t("home.faq.a.tyresWheels.intro")}</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              {t("home.faq.a.tyres.frontLabel")}: Pirelli Angel City 110/70-17”
            </li>
            <li>
              {t("home.faq.a.tyres.rearLabel")}: Pirelli Angel City 150/60-17”
            </li>
          </ul>
          <p>{t("home.faq.a.tyresWheels.g1x")}</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              {t("home.faq.a.tyres.frontLabel")}: Metzeler Karoo Street 110/70-17”
            </li>
            <li>
              {t("home.faq.a.tyres.rearLabel")}: Metzeler Karoo Street 140/70-17”
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "versions",
      category: "motorcycles",
      question: t("home.faq.q.versions"),
      searchText: t("home.faq.a.versions.p1"),
      answer: <p>{t("home.faq.a.versions.p1")}</p>,
    },
    {
      id: "colours-configs",
      category: "motorcycles",
      question: t("home.faq.q.colorsConfigs"),
      searchText: t("home.faq.a.colorsConfigs.p1"),
      answer: <p>{t("home.faq.a.colorsConfigs.p1")}</p>,
    },

    /* ── BATTERY & CHARGING ── */
    {
      id: "removable-batteries",
      category: "battery",
      question: t("home.faq.q.removableBatteries"),
      searchText: [
        t("home.faq.a.removableBatteries.p1"),
        t("home.faq.a.removableBatteries.list.6kwh"),
      ].join(" "),
      answer: (
        <div className="space-y-2">
          <p>{t("home.faq.a.removableBatteries.p1")}</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>{t("home.faq.a.removableBatteries.list.6kwh")}</li>
          </ul>
        </div>
      ),
    },
    {
      id: "charge-time",
      category: "battery",
      question: t("home.faq.q.chargeTime"),
      searchText: [
        t("home.faq.a.chargeTime.p1"),
        t("home.faq.a.chargeTime.fastTopUp"),
      ].join(" "),
      answer: (
        <div className="space-y-2">
          <p>{t("home.faq.a.chargeTime.p1")}</p>
          <p>{t("home.faq.a.chargeTime.fastTopUp")}</p>
        </div>
      ),
    },
    {
      id: "car-charging",
      category: "battery",
      question: t("home.faq.q.carCharging"),
      searchText: t("home.faq.a.carCharging.p1"),
      answer: <p>{t("home.faq.a.carCharging.p1")}</p>,
    },

    /* ── LICENCE & LEGAL ── */
    {
      id: "licence",
      category: "licence",
      question: t("home.faq.q.license"),
      searchText: t("home.faq.a.license.p1"),
      answer: (
        <div className="space-y-3">
          <p>{t("home.faq.a.license.p1")}</p>
          <LicenseTableModal />
        </div>
      ),
    },
    {
      id: "eu-homologation",
      category: "licence",
      question: t("home.faq.q.euHomologation"),
      searchText: t("home.faq.a.euHomologation.p1"),
      answer: <p>{t("home.faq.a.euHomologation.p1")}</p>,
    },

    /* ── RESERVATIONS, BUYING & DELIVERY ── */
    {
      id: "cost",
      category: "buying",
      question: t("home.faq.q.cost"),
      searchText: [t("home.faq.cost.g1s.list"), t("home.faq.cost.g1x.list")].join(" "),
      answer: (
        <ul className="list-disc pl-5 space-y-2">
          <li>{t("home.faq.cost.g1s.list")}</li>
          <li>{t("home.faq.cost.g1x.list")}</li>
        </ul>
      ),
    },
    {
      id: "order",
      category: "buying",
      question: t("home.faq.q.order"),
      searchText: t("home.faq.a.order.p1"),
      answer: (
        <p>
          <Link href="/reserve" className="text-orange-500 underline hover:text-orange-600">
            {t("home.faq.a.order.p1")}
          </Link>
        </p>
      ),
    },
    {
      id: "reservation-process",
      category: "buying",
      question: t("home.faq.q.reservationProcess"),
      searchText: t("home.faq.a.reservationProcess.p1"),
      answer: <p>{t("home.faq.a.reservationProcess.p1")}</p>,
    },
    {
      id: "deliveries-start",
      category: "buying",
      question: t("home.faq.q.deliveriesStart"),
      searchText: t("home.faq.a.deliveriesStart.p1"),
      answer: <p>{t("home.faq.a.deliveriesStart.p1")}</p>,
    },
    {
      id: "outside-eu",
      category: "buying",
      question: t("home.faq.q.outsideEU"),
      searchText: t("home.faq.a.outsideEU.p1"),
      answer: <p>{t("home.faq.a.outsideEU.p1")}</p>,
    },
    {
      id: "financing",
      category: "buying",
      question: t("home.faq.q.financing"),
      searchText: t("home.faq.a.financing.p1"),
      answer: <p>{t("home.faq.a.financing.p1")}</p>,
    },
    {
      id: "see-or-test",
      category: "buying",
      question: t("home.faq.q.seeOrTest"),
      searchText: [t("home.faq.a.seeOrTest.p1"), t("home.faq.a.seeOrTest.p2")].join(" "),
      answer: (
        <div className="space-y-2">
          <p>{t("home.faq.a.seeOrTest.p2")}</p>
        </div>
      ),
    },

    /* ── WARRANTY & SUPPORT ── */
    {
      id: "warranty",
      category: "warranty",
      question: t("home.faq.q.warranty"),
      searchText: [
        t("home.faq.a.warranty.list.1"),
        t("home.faq.a.warranty.list.2"),
        t("home.faq.a.warranty.list.3"),
      ].join(" "),
      answer: (
        <div className="space-y-2">
          <ul className="list-disc pl-5 space-y-1">
            <li>{t("home.faq.a.warranty.list.1")}</li>
            <li>{t("home.faq.a.warranty.list.2")}</li>
            <li>{t("home.faq.a.warranty.list.3")}</li>
          </ul>
          <p>
            <Link
              href="/quality/warranty"
              className="text-orange-500 underline hover:text-orange-600"
            >
              See full warranty terms →
            </Link>
          </p>
        </div>
      ),
    },
    {
      id: "app-launch",
      category: "warranty",
      question: t("home.faq.q.appLaunch"),
      searchText: t("home.faq.a.appLaunch.p1"),
      answer: <p>{t("home.faq.a.appLaunch.p1")}</p>,
    },
    {
      id: "theft-resistant",
      category: "warranty",
      question: t("home.faq.q.theftResistant"),
      searchText: t("home.faq.a.theftResistant.p1"),
      answer: <p>{t("home.faq.a.theftResistant.p1")}</p>,
    },

    /* ── CUSTOMISATION ──
       Reflects the Phase 2 configurator scope defined in the EoI and copy package. */
    {
      id: "what-can-customise",
      category: "customisation",
      question: "What can I customise on my GR1T?",
      searchText:
        "customise customisation configurator options colours tyres motor side panel handlebar mudflap seat wheels",
      answer: (
        <div className="space-y-3">
          <p>
            The G1 platform is built for personalisation. When our configurator launches with
            production in early 2027, you&rsquo;ll be able to choose:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Tyres &mdash; street (G1S) or scrambler (G1X)</li>
            <li>Motor &mdash; two power options</li>
            <li>Side-panel colour, plus the option to upload your own logo or pattern</li>
            <li>Handlebar, mudflap and seat colours</li>
            <li>Front and rear wheel rim colour</li>
            <li>Light cover colour</li>
            <li>Seat design (GR1T-branded or plain)</li>
            <li>Rear licence-plate holder style</li>
          </ul>
        </div>
      ),
    },
    {
      id: "when-can-customise",
      category: "customisation",
      question: "When can I customise my bike?",
      searchText: "when configurator launch early 2027 reservation priority customisation",
      answer: (
        <p>
          The full configurator launches alongside production in early 2027. If you&rsquo;ve
          placed a €100 reservation, you&rsquo;ll get priority access &mdash; configure your
          bike before public release, and ship in the first production batch.
        </p>
      ),
    },
    {
      id: "wraps-after-delivery",
      category: "customisation",
      question: "Can I add custom decals or a wrap after delivery?",
      searchText: "custom wrap decal vinyl after delivery sensors cameras",
      answer: (
        <p>
          Yes. The G1 bodywork accepts standard vinyl wraps from any professional installer.
          Just avoid covering sensors, cameras, lighting, or the dashboard area &mdash; doing
          so may affect functionality and warranty.
        </p>
      ),
    },
    {
      id: "limits-on-customisation",
      category: "customisation",
      question: "Are there limits on what I can change?",
      searchText:
        "limits restrictions customisation safety handling components what cannot change wheel size brake",
      answer: (
        <p>
          The configurator covers visual and finish options. Components that affect safety or
          handling &mdash; wheel size, brake system, frame geometry, sensor placement &mdash;
          can&rsquo;t be modified. For one-off or special-edition requests beyond the
          configurator, contact us directly at{" "}
          <a className="text-orange-500 underline" href="mailto:grit@gritmotorcycles.com">
            grit@gritmotorcycles.com
          </a>.
        </p>
      ),
    },
    {
      id: "accessories-warranty",
      category: "customisation",
      question: "Are accessories covered by warranty?",
      searchText: "accessories warranty third party parts modifications coverage",
      answer: (
        <p>
          GR1T-approved accessories carry a 1-year warranty. Third-party parts or modifications
          may affect your main motorcycle warranty &mdash; check the warranty terms before
          installing anything that isn&rsquo;t GR1T-certified.
        </p>
      ),
    },
    {
      id: "customisation-cost",
      category: "customisation",
      question: "How much does customising my bike cost?",
      searchText: "customisation cost price configurator pricing options",
      answer: (
        <p>
          Pricing for each option will be visible in the configurator when it launches. Basic
          colour selections add little or nothing to the MSRP; specialised finishes,
          higher-spec components, and accessory bundles are priced individually. Final
          configured price is confirmed before you pay the balance.
        </p>
      ),
    },
  ];
}
