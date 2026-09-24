const OUTLETS = ["CYCLE WORLD", "TOP GEAR", "MCN", "EICMA", "VISORDOWN", "MOTORRAD"];

export default function MediaStrip() {
  return (
    <section className="py-16 border-y border-surface-container bg-white">
      <div className="max-w-[1440px] mx-auto px-5 md:px-20 flex flex-wrap justify-between items-center gap-8 opacity-40 grayscale">
        {OUTLETS.map((outlet) => (
          <span key={outlet} className="font-britti font-black text-xl md:text-2xl tracking-tight text-black">
            {outlet}
          </span>
        ))}
      </div>
    </section>
  );
}
