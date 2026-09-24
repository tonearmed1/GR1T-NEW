import Image from "next/image";
import Link from "next/link";

interface Model {
  name: string;
  href: string;
  img: string;
  eyebrow: string;
  title: string;
  desc: string;
  price: string;
}

const MODELS: Model[] = [
  {
    name: "G1S Street",
    href: "/G1S",
    img: "/grit-g1/hero.jpg",
    eyebrow: "G1S Street",
    title: "Urban. Refined.",
    desc: "Built for everyday riding with agility, style and practicality.",
    price: "€7,000",
  },
  {
    name: "G1X Scrambler",
    href: "/G1X",
    img: "/grit-g1x/hero.jpg",
    eyebrow: "G1X Scrambler",
    title: "Versatile. Explorative.",
    desc: "Designed for riders who want freedom beyond the city limits.",
    price: "€8,000",
  },
  {
    name: "G1XR Raider",
    href: "/G1XR",
    img: "/grit-g1x/main_g1x.png",
    eyebrow: "G1XR Raider",
    title: "Purposeful. Capable.",
    desc: "Built for riders carrying more, travelling further, doing more.",
    price: "€9,000",
  },
  {
    name: "Coming Soon",
    href: "/motorcycles/g1",
    img: "/grit-g1x/GR1T_off-road.1.png",
    eyebrow: "G1 Series",
    title: "New Model",
    desc: "Placeholder card — fourth model, copy and imagery to follow.",
    price: "TBD",
  },
];

export default function DifferentJourneys() {
  return (
    <section className="py-24 md:py-32 px-5 md:px-20" id="models">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-16">
          <span className="text-grit-orange text-xs font-bold uppercase tracking-[0.2em]">The G1 Series</span>
          <h2 className="font-britti font-bold text-4xl md:text-[56px] leading-tight tracking-tight mt-4">
            Different journeys. Same DNA.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {MODELS.map((model) => (
            <Link href={model.href} key={model.name} className="group block">
              <div className="relative overflow-hidden rounded-lg bg-surface-container aspect-[4/3] mb-6">
                <Image
                  src={model.img}
                  alt={model.name}
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <span className="text-grit-orange text-xs font-bold uppercase tracking-[0.15em]">{model.eyebrow}</span>
              <h3 className="font-britti font-bold text-2xl mt-2 mb-2">{model.title}</h3>
              <p className="text-on-surface-variant leading-relaxed mb-5">{model.desc}</p>
              <div className="flex items-center justify-between border-t border-surface-container pt-4">
                <span className="font-britti font-bold text-lg">
                  {model.price}
                  {model.price !== "TBD" && <span className="text-xs font-inter font-normal text-on-surface-variant"> + VAT</span>}
                </span>
                <span className="text-grit-orange text-xs font-bold uppercase tracking-[0.1em]">Explore →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
