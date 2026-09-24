"use client";
import Hero from "@/components/home/hero";
import DifferentJourneys from "@/components/home/DifferentJourneys";
import LifestyleSection from "@/components/home/LifestyleSection";
import UniquelyYours from "@/components/home/UniquelyYours";
import RealLifeSection from "@/components/home/RealLifeSection";
import MotorValleySection from "@/components/home/MotorValleySection";
import PressStrip from "@/components/home/PressStrip";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import SpecsSection from "@/components/home/SpecsSection";
import FAQPreview from "@/components/home/FAQPreview";
import FinalCTASection from "@/components/home/FinalCTASection";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <DifferentJourneys />
      <LifestyleSection />
      <UniquelyYours />
      <RealLifeSection />
      <MotorValleySection />
      <PressStrip />
      <TestimonialsSection />
      <SpecsSection />
      <FAQPreview />
      <FinalCTASection />
    </div>
  );
}
