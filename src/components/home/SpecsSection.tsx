import PillButton from "@/components/PillButton";

const SPECS: [string, string][] = [
  ["Nominal Power", "11 kW"],
  ["Peak Power", "25 kW"],
  ["Top Speed", "130 km/h"],
  ["WMTC Range", "150 km"],
  ["Battery Capacity", "6 kWh (Dual)"],
  ["Battery Type", "Removable × 2"],
  ["Kerb Weight", "127 kg"],
  ["Maximum Payload", "190 kg"],
  ["Drive System", "Belt Drive"],
  ["Connectivity", "CarPlay / Android Auto"],
];

export default function SpecsSection() {
  return (
    <section className="py-24 md:py-32 px-5 md:px-20 bg-white" id="specs">
      <div className="max-w-3xl mx-auto">
        <span className="text-grit-orange text-xs font-bold uppercase tracking-[0.2em] block text-center">
          Platform Specifications
        </span>
        <h2 className="font-britti font-bold text-3xl md:text-5xl leading-tight tracking-tight text-center mt-4 mb-12">
          Shared across the G1 Series
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 border-t border-surface-container">
          {SPECS.map(([label, value]) => (
            <div key={label} className="flex justify-between items-center py-5 border-b border-surface-container">
              <span className="text-xs font-bold uppercase tracking-[0.1em] text-on-surface-variant/60">{label}</span>
              <span className="text-lg font-semibold">{value}</span>
            </div>
          ))}
          <div className="flex justify-between items-center py-5 border-b border-surface-container md:col-span-2">
            <span className="text-xs font-bold uppercase tracking-[0.1em] text-on-surface-variant/60">Homologation</span>
            <span className="text-lg font-semibold">L3e-A2 (EU / UK)</span>
          </div>
        </div>

        <div className="text-center mt-10">
          <PillButton href="/G1S/specs" variant="orange">
            See Full Specs
          </PillButton>
        </div>
      </div>
    </section>
  );
}
