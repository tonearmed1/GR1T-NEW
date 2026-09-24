import Link from "next/link";
import PillButton from "@/components/PillButton";

const CATEGORIES = [
  { title: "Battery & Charging", desc: "Charging speeds, range and battery health over time.", href: "/faqs#battery" },
  { title: "Performance", desc: "Top speed, riding modes and power delivery explained.", href: "/faqs#performance" },
  { title: "Ownership & Maintenance", desc: "Servicing, the GR1T app and OTA software updates.", href: "/faqs#ownership" },
  { title: "Licensing", desc: "Which driver's licence categories apply to the G1 Series.", href: "/faqs#licensing" },
  { title: "Warranty", desc: "Coverage, transferability and extended warranty options.", href: "/faqs#warranty" },
  { title: "Deliveries", desc: "Timelines, regional availability and what's in the box.", href: "/faqs#deliveries" },
];

export default function FAQPreview() {
  return (
    <section className="py-24 md:py-32 px-5 md:px-20 bg-surface-alt" id="faq">
      <div className="max-w-[1440px] mx-auto">
        <div className="max-w-xl mb-14">
          <span className="text-grit-orange text-xs font-bold uppercase tracking-[0.2em]">FAQ</span>
          <h2 className="font-britti font-bold text-3xl md:text-5xl leading-tight tracking-tight mt-4">
            Common questions
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="block border border-surface-container p-8 transition-colors hover:border-grit-orange group"
            >
              <h3 className="text-xs font-bold uppercase tracking-[0.1em] mb-3 group-hover:text-grit-orange transition-colors">
                {cat.title}
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">{cat.desc}</p>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <PillButton href="/faqs" variant="white">
            View All FAQs
          </PillButton>
        </div>
      </div>
    </section>
  );
}
