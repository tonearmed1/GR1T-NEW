"use client";

export default function Hero() {
  return (
    <section className="pt-40 pb-20 px-5 md:px-20 max-w-[1440px] mx-auto">
      <div className="flex flex-col gap-8">
        <h1 className="font-britti font-bold text-5xl md:text-7xl lg:text-[72px] leading-tight tracking-tight text-black max-w-3xl">
          The G1 Series. Different journeys, same DNA.
        </h1>
        <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed">
          Designed and engineered in Italy&apos;s Motor Valley. Three motorcycles built on the same platform, each created for a different way of riding.
        </p>
      </div>
      <div className="mt-16 relative aspect-[21/9] w-full overflow-hidden rounded-xl bg-surface-alt">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="/grit-g1/hero.jpg"
        >
          <source src="/Home/GR1T Website HERO Video.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
