"use client";
import Hero from "@/components/home/hero";
import MediaStrip from "@/components/home/MediaStrip";
import BikesSection from "@/components/home/bikesSection";
import TechFeatures from "@/components/home/TechFeatures";
import HeritageSection from "@/components/home/HeritageSection";
import CTATwoSection from "@/components/home/cta2";
import GalleryTwoSection from "@/components/reusable/gallery2";
import Insta from "@/components/home/insta";
import ContactEICMA from "@/components/home/ContactEICMA";
import NewsletterSignup from "@/components/home/NewsletterSignup";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <MediaStrip />
      <BikesSection />
      <TechFeatures />
      <HeritageSection />
      <CTATwoSection />
      <GalleryTwoSection />
      <Insta />
      <ContactEICMA />
      <NewsletterSignup />
    </div>
  );
}
