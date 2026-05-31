"use client";
import { useLanguage } from "@/context/LanguageContext";
import Hero from "@/components/home/hero";
import BikesSection from "@/components/home/bikesSection";
import GallerySection from "@/components/home/gallery";
import GalleryTwoSection from "@/components/reusable/gallery2";
import CTASection from "@/components/reusable/cta";

import CTATwoSection from "@/components/home/cta2";

import FAQSection from "@/components/home/FAQ";
import PromoPopup from "@/components/reusable/promoPopup";
import { useEffect } from "react";

export default function Home() {
  const { t } = useLanguage();

  // Smooth scroll to #faqs when arriving on the homepage with a hash
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#faqs") {
      const el = document.getElementById("faqs");
      if (el) {
        // Slight delay to ensure layout is settled
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
      }
    }
  }, []);

  return (
    <div className="w-full">
      <Hero />
      <BikesSection />
      <GallerySection />
      {/* <CTASection /> */}
      <GalleryTwoSection />
      {/* <InstagramSection /> */}
      <CTATwoSection />
      {/* <Insta /> */}
      <FAQSection />
      {/* <EICMASection /> */}
      {/* <PromoPopup /> */}
    </div>
  );
}
