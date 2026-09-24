"use client";

import Image from "next/image";

const FEATURES = [
  {
    title: "127 kg Lightweight Chassis",
    desc: "Experience urban confidence like never before. The ultra-lightweight trellis frame delivers precision handling that makes filtering through tight city traffic feel intuitive and effortless.",
    img: "/grit-g1/01_g1s.png",
    imgLeft: true,
  },
  {
    title: "Dual Removable Batteries",
    desc: "True independence from public infrastructure. Carry your power with you and charge at any standard outlet—at home, at work, or at your favorite cafe.",
    img: "/grit-g1/02_g1s.png",
    imgLeft: false,
  },
  {
    title: "Connected Cockpit",
    desc: "Your digital life, seamlessly integrated. With full Apple CarPlay and Android Auto support, your navigation, music, and communications are always within reach on a stunning high-def interface.",
    img: "/grit-g1/01_g1s.png",
    imgLeft: true,
  },
];

export default function AboutG1S() {
  return (
    <section className="py-40 bg-white">
      <div className="px-5 md:px-20 max-w-[1440px] mx-auto">
        <h2 className="font-britti font-bold text-4xl md:text-5xl mb-24">Why Riders Choose The G1S</h2>
        <div className="space-y-40">
          {FEATURES.map((feat) => (
            <div key={feat.title} className="grid md:grid-cols-12 gap-6 items-center">
              {feat.imgLeft ? (
                <>
                  <div className="md:col-span-7 aspect-[16/9] overflow-hidden relative">
                    <Image src={feat.img} alt={feat.title} fill className="object-cover" />
                  </div>
                  <div className="md:col-span-4 md:col-start-9 space-y-6">
                    <h3 className="font-britti font-bold text-4xl md:text-5xl">{feat.title}</h3>
                    <p className="text-lg text-on-surface-variant">{feat.desc}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="md:col-span-4 space-y-6 order-2 md:order-1">
                    <h3 className="font-britti font-bold text-4xl md:text-5xl">{feat.title}</h3>
                    <p className="text-lg text-on-surface-variant">{feat.desc}</p>
                  </div>
                  <div className="md:col-span-7 md:col-start-6 aspect-[16/9] overflow-hidden order-1 md:order-2 relative">
                    <Image src={feat.img} alt={feat.title} fill className="object-cover" />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
