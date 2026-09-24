export default function HeritageSection() {
  const stats = [
    { value: "100%", label: "Emission Free" },
    { value: "MODULAR", label: "Architecture" },
    { value: "PREMIUM", label: "Materials" },
    { value: "TESTED", label: "In Italy" },
  ];

  return (
    <section className="py-32 bg-black text-white px-5 md:px-20 overflow-hidden">
      <div className="max-w-[1440px] mx-auto flex flex-col items-center text-center">
        <span className="text-grit-orange text-xs font-bold uppercase tracking-[0.3em] mb-6">Italian Heritage</span>
        <h2 className="font-britti font-bold text-4xl md:text-[72px] leading-tight tracking-tight max-w-4xl">
          Designed and Engineered in Italy&apos;s Motor Valley.
        </h2>
        <p className="text-lg text-tertiary-fixed-dim max-w-2xl mt-8 leading-relaxed">
          Built by a team with decades of experience across motorcycles, motorsport and product development.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mt-24 w-full">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center">
              <span className="font-britti font-bold text-4xl md:text-5xl">{s.value}</span>
              <p className="text-xs uppercase text-tertiary-fixed-dim mt-4 tracking-[0.2em]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
