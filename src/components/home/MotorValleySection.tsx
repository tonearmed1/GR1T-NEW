import Image from "next/image";
import PillButton from "@/components/PillButton";

export default function MotorValleySection() {
  return (
    <section className="py-24 md:py-40 px-5 md:px-20 bg-black text-white" id="heritage">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative aspect-[16/10] rounded-xl overflow-hidden">
          <Image
            src="/grit-g1x/GR1T_off-road.1.png"
            alt="GR1T in Italy's Motor Valley"
            fill
            className="object-cover"
          />
        </div>

        <div>
          <span className="text-grit-orange text-xs font-bold uppercase tracking-[0.2em]">Legacy &amp; Innovation</span>
          <h2 className="font-britti font-bold text-3xl md:text-5xl leading-tight tracking-tight mt-4 mb-6">
            Designed and engineered in Italy&apos;s Motor Valley.
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-4">
            Built in the heart of one of the world&apos;s most respected motorcycle regions, where design, engineering
            and riding culture converge.
          </p>
          <p className="text-lg text-white/70 leading-relaxed mb-9">
            A team with decades of experience across motorcycles, motorsport and product development. No theatre. No
            preaching. Just presence.
          </p>
          <PillButton href="/about-us" variant="ghost">
            Discover Our Story
          </PillButton>
        </div>
      </div>
    </section>
  );
}
