import Image from "next/image";

const FINISHES = [
  { name: "Imola Orange", img: "/grit-g1/01_g1s.png" },
  { name: "Stealth Black", img: "/grit-g1/02_g1s.png" },
  { name: "Dakar Orange", img: "/grit-g1x/01_g1x.png" },
  { name: "Mojave Bronze", img: "/grit-g1x/02_g1x.png" },
  { name: "Racing Orange", img: "/grit-g1x/orange01.jpg" },
  { name: "Red X", img: "/grit-g1x/orange02.jpg" },
];

export default function UniquelyYours() {
  return (
    <section className="py-16 md:py-24" id="personalisation">
      <div className="max-w-[1440px] mx-auto px-5 md:px-20">
        <span className="text-grit-orange text-xs font-bold uppercase tracking-[0.2em]">Personalisation</span>
        <h2 className="font-britti font-bold text-4xl md:text-[56px] leading-tight tracking-tight mt-4 mb-4">
          Uniquely Yours.
        </h2>
        <p className="text-lg text-on-surface-variant max-w-2xl mb-12">
          Choose from curated finishes, accessory packages and bespoke commissions.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
          {FINISHES.map((finish) => (
            <div key={finish.name} className="relative aspect-[3/2] bg-surface-container overflow-hidden group cursor-pointer">
              <Image
                src={finish.img}
                alt={`${finish.name} customisation render`}
                fill
                className="object-cover grayscale brightness-[0.6] transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
