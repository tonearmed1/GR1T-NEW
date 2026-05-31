import React from "react";
import CorporateHero from "../components/hero";
import InvestorsItems from "./components/investors";
import UseOfFunds from "./components/useOfFunds";
import EICMASection from "@/components/reusable/EICMA";

const Investors = () => {
  return (
    <>
      <CorporateHero titleKey="corporate.investors.title" descriptionKey="corporate.investors.description" />
      <InvestorsItems />
      <UseOfFunds />
      {/* <EICMASection /> */}
    </>
  );
};

export default Investors;
