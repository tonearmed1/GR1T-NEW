const TESTIMONIALS = [
  { quote: "The design stopped me in my tracks.", author: "EICMA Visitor" },
  { quote: "Exactly what urban electric motorcycles should be.", author: "Industry Journalist" },
  { quote: "The removable batteries solve a real problem.", author: "Test Rider" },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32 px-5 md:px-20 bg-surface-alt">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="font-britti font-bold text-3xl md:text-5xl leading-tight tracking-tight text-center mb-14">
          What Real Riders Are Saying
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {TESTIMONIALS.map((t) => (
            <div key={t.author}>
              <p className="font-britti font-bold italic text-2xl md:text-3xl leading-snug mb-6">&ldquo;{t.quote}&rdquo;</p>
              <p className="text-grit-orange text-xs font-bold uppercase tracking-[0.15em]">— {t.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
