import Image from "next/image";

interface Lifestyle {
  title: string;
  desc: string;
  img: string;
}

const LIFESTYLES: Lifestyle[] = [
  { title: "Urban Freedom", desc: "Daily commuting and city exploration.", img: "/grit-g1/01_g1s.png" },
  { title: "Weekend Escape", desc: "Light touring and spontaneous adventures.", img: "/grit-g1/02_g1s.png" },
  { title: "Passenger Ready", desc: "Comfortable two-up riding with extended seating.", img: "/grit-g1x/01_g1x.png" },
  { title: "Cargo & Utility", desc: "Practical everyday carrying capability.", img: "/grit-g1x/02_g1x.png" },
  { title: "Touring Setup", desc: "Long-distance capability with integrated luggage solutions.", img: "/grit-g1x/orange01.jpg" },
];

export default function LifestyleSection() {
  return (
    <section className="py-24 md:py-32 bg-surface-alt overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 md:px-20 mb-12">
        <h2 className="font-britti font-bold text-3xl md:text-5xl leading-tight tracking-tight">
          One Motorcycle. Multiple Lifestyles.
        </h2>
        <p className="text-lg text-on-surface-variant mt-4">Configure the G1S around the way you ride.</p>
      </div>

      <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-5 md:px-20 pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {LIFESTYLES.map((item) => (
          <div key={item.title} className="flex-none w-[85vw] md:w-[600px] snap-center">
            <div className="relative aspect-video bg-surface-container mb-6 overflow-hidden rounded-lg group">
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 85vw, 600px"
              />
            </div>
            <h4 className="font-britti font-bold text-xl mb-1">{item.title}</h4>
            <p className="text-on-surface-variant">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
