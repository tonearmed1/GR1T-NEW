import React from "react";
import CorporateHero from "./components/hero";
import CorporateInfo from "./components/CorporateInfo";
import DevelopmentSchedule from "./components/DevelopmentSchedule";
import OurMission from "./components/ourMission";
import OurVision from "./components/ourVision";
import CoreValues from "./components/coreValues";

const Corporate = () => {
  return (
    <>
      <CorporateHero />
      <CorporateInfo />
      <DevelopmentSchedule />
      <OurMission />
      <OurVision />
      <CoreValues />
    </>
  );
};

export default Corporate;
