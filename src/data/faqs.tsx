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
  | "motorcycles"
  | "battery"
  | "licence"
  | "buying"
  | "warranty";

export const CATEGORY_LABELS: Record<FAQCategory, { en: string; it: string }> = {
  motorcycles: { en: "Motorcycles", it: "Motociclette" },
  battery: { en: "Battery & Charging", it: "Batteria & Ricarica" },
  licence: { en: "Licence & Legal", it: "Patente & Normative" },
  buying: { en: "Reservations & Delivery", it: "Prenotazioni & Consegna" },
  warranty: { en: "Warranty & Support", it: "Garanzia & Assistenza" },
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
    /* ── MOTORCYCLES ── */
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
  ];
}
