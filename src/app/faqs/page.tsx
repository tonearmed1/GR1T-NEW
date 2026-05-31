import React from "react";
import Hero from "./components/hero";
import FAQsAccordian from "./components/accordiant";

const Faqs = () => (
  <>
    <Hero />
    {/* <section className="bg-white py-8 sm:py-12">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl text-gray-800">
        <div className="space-y-4 sm:space-y-6">
          <p className="text-base sm:text-lg">
            By joining, you’ll secure an exclusive €1,500 discount on our first electric motorcycle, a premium lightweight model
            designed and engineered in Italy’s Motor Valley. Built for urban freedom, it combines cutting-edge performance with
            unmistakable design.
          </p>
        </div>
      </div>
    </section> */}
    <section id="faqs">
      <FAQsAccordian />
    </section>
  </>
);

export default Faqs;
