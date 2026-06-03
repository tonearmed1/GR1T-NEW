"use client";

const CARDS = [
  { title: "The Long Way Home", desc: "Choosing the road you normally ignore. Urban shortcuts redefined.", img: "/grit-g1x/GR1T_off-road.1.png" },
  { title: "Beyond The Pavement", desc: "Gravel roads and forgotten routes. Silence is the new soundtrack.", img: "/grit-g1x/orange01.jpg" },
  { title: "Weekend Explorer", desc: "Leaving the city behind. Fast-charging your curiosity.", img: "/grit-g1x/orange02.jpg" },
  { title: "City Then Country", desc: "Built for commuting. Ready for more. The ultimate dual-purpose tool.", img: "/grit-g1x/hero.jpg" },
];

export default function SpontaneityGrid() {
  return (
    <section className="py-40 bg-black">
      <div className="max-w-[1440px] mx-auto px-5 md:px-20">
        <h2 className="font-britti font-bold text-4xl md:text-5xl text-white mb-20 text-center">
          Designed For Spontaneity.
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="relative group h-[600px] overflow-hidden"
            >
              {/* bg image */}
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-1000"
                style={{ backgroundImage: `url('${card.img}')` }}
              />
              {/* overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500 z-10" />
              {/* content */}
              <div className="absolute bottom-0 left-0 p-8 z-20 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl font-semibold text-white mb-2">{card.title}</h3>
                <p className="text-white/70 text-base opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
