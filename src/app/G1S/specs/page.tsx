"use client";
import React from "react";
import LicenseTableModal from "@/components/reusable/LicenseTableModal";
import Link from "next/link";

type KV = { label: string; value: string };
type Section = { title: string; rows?: (string | KV)[]; node?: React.ReactNode };

const leftSections: Section[] = [
  {
    title: "Performance",
    rows: [
      { label: "Continuous Power", value: "11kW – 56Nm @ 3,200 RPM" },
      { label: "Top Speed (max)", value: "130 km/h" },
      { label: "Top Speed (sustained)", value: "120 km/h" },
      { label: "Peak Torque", value: "85 Nm" },
      { label: "Peak Power", value: "26.6 kW" },
    ],
  },
  {
    title: "Range",
    rows: [
      { label: "City", value: "150 km" },
      { label: "Combined City/Highway Commuting", value: "120 km" },
    ],
  },
  {
    title: "Geometry",
    rows: [
      { label: "Wheelbase", value: "1,345 mm" },
      { label: "Seat Height", value: "810 mm" },
      { label: "Rake", value: "23°" },
      { label: "Trail", value: "87.2 mm" },
      { label: "Vehicle Weight", value: "127 kg incl. Battery (94 kg w/out battery)" },
      { label: "Max. Carrying Capacity", value: "190 kg" },
    ],
  },
  {
    title: "Riding Modes",
    rows: [
      "City: 11 kW Peak power",
      "Performance: 26.6 kW Peak / 11 kW Continuous power",
      "Walk: 3 km/h limitation",
      "Reverse: 3 km/h limitation",
    ],
  },
  {
    title: "Starting Price",
    rows: ["EUR 6,999 + VAT"],
  },
  {
    title: "License",
    node: (
      <p className="text-white/90">
        A1/B – <LicenseTableModal /> for information about license requirements in your country. Always consult local laws and/or
        local authorities.
      </p>
    ),
  },
];

const rightSections: Section[] = [
  {
    title: "Components",
    rows: [
      { label: "Motor", value: "Brushless IPM, radial flux, passively air-cooled" },
      { label: "Controller", value: "400A 3‑phase brushless, with regenerative deceleration" },
      { label: "Voltage", value: "74V" },
      { label: "Battery", value: "5.92 kWh total (2.96 kWh x2), 8P20S NMC – 10C (74V 40AH)" },
      { label: "Front Suspension", value: "ø 41 mm inverted cartridge forks" },
      { label: "Rear Suspension", value: "Pull-out shock ø 40 mm piston, adjustable preload" },
      { label: "Front Travel", value: "120 mm" },
      { label: "Rear Travel", value: "120 mm" },
      { label: "Front Wheel", value: "3.00” x 17”" },
      { label: "Rear Wheel", value: "4.00” x 17”" },
      { label: "Front Brake", value: "Four-piston caliper, 320 × 5 mm disc" },
      { label: "Rear Brake", value: "Dual-piston caliper, 240 × 4.5 mm disc" },
      { label: "Front Tyre", value: "Pirelli Angel City 110/70‑17”" },
      { label: "Rear Tyre", value: "Pirelli Angel City 150/60‑17”" },
    ],
  },
  {
    title: "Warranty",
    node: (
      <div className="space-y-2 text-white/90">
        <p>Your GR1T motorcycle is backed by a comprehensive warranty:</p>
        <ul className="list-none space-y-1">
          <li>– 2 years on the full motorcycle (unlimited km)</li>
          <li>– ⁠⁠3 years or 36,000 km on powertrain</li>
          <li>– ⁠⁠6 years on batteries (≥ 80% capacity guaranteed)</li>
        </ul>
        <p>
          We cover manufacturing defects on major systems, including the frame, electricals, thermal management, and charging
          equipment.
        </p>
        <p>Off-road use is covered (if configured for it) and the warranty transfers free of charge within EU/EEA.</p>
        <p>
          For full terms and exclusions, visit our{" "}
          <Link href="/quality/warranty" className="underline">
            Warranty Page
          </Link>
          .
        </p>
      </div>
    ),
  },
];

function SectionBlock({ section }: { section: Section }) {
  return (
    <div className="mb-10">
      <h3 className="font-britti tracking-widest uppercase text-white/90 text-xl font-bold">{section.title}</h3>
      <div className="mt-3 border-t border-white/20" />
      {section.node ? (
        <div className="mt-4 text-sm leading-relaxed">{section.node}</div>
      ) : section.rows ? (
        <ul className="mt-4 divide-y divide-white/15 rounded">
          {section.rows.map((it, idx) => {
            if (typeof it === "string") {
              return (
                <li key={idx} className="py-2 text-sm text-white/90">
                  • {it}
                </li>
              );
            }
            const kv = it as KV;
            return (
              <li key={idx} className="py-2 flex justify-between gap-6">
                <span className="text-sm text-white">{kv.label}</span>
                <span className="text-sm text-white/60">{kv.value}</span>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

const G1SSpecsPage = () => {
  return (
    <section className="py-10 sm:py-16 bg-black text-white">
      <div id="g1s-specs" className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl sm:text-5xl font-normal font-britti">G1S Technical Specifications</h2>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            {leftSections.map((s, idx) => (
              <SectionBlock key={idx} section={s} />
            ))}
          </div>
          <div>
            {rightSections.map((s, idx) => (
              <SectionBlock key={idx} section={s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default G1SSpecsPage;
