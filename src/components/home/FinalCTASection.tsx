import Image from "next/image";
import PillButton from "@/components/PillButton";

export default function FinalCTASection() {
  return (
    <section className="relative py-24 md:py-32 px-5 md:px-20 overflow-hidden" id="reserve">
      <Image src="/grit-g1x/orange02.jpg" alt="Reserve your GR1T G1" fill className="object-cover" />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative max-w-[1440px] mx-auto flex flex-col items-center text-center text-white">
        <h2 className="font-britti font-bold text-3xl md:text-5xl leading-tight tracking-tight mb-4 max-w-2xl">
          Reserve Your Place Among The First Owners.
        </h2>
        <p className="text-white/70 max-w-md mb-8">
          Join a small group of founding owners. Fully refundable. No commitment until you confirm your specification.
        </p>
        <div className="flex gap-3 flex-wrap justify-center">
          <PillButton href="/reserve" variant="orange">
            Reserve Now
          </PillButton>
          <PillButton href="/faqs#reservations" variant="ghost">
            Reservation FAQ
          </PillButton>
        </div>
      </div>
    </section>
  );
}
