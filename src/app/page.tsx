"use client";
import Hero from "@/components/home/hero";
import MediaStrip from "@/components/home/MediaStrip";
import BikesSection from "@/components/home/bikesSection";
import TechFeatures from "@/components/home/TechFeatures";
import HeritageSection from "@/components/home/HeritageSection";
import CTATwoSection from "@/components/home/cta2";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <MediaStrip />
      <BikesSection />
      <TechFeatures />
      <HeritageSection />
      <CTATwoSection />
    </div>
  );
}
