import React from "react";
import MirageHero from "./components/hero";
import AboutMirage from "./components/aboutMirage";
import Threesixty from "./components/threesixty";
import SpecsSections from "./components/specs";
import CTASection from "./components/cta";
import EICMASection from "@/components/reusable/EICMA";

import Reserving from "./components/reserving";
import G1SGallery from "./components/g1sGallery";

const Mirage = () => {
  return (
    <>
      <MirageHero />
      <AboutMirage />
      <Threesixty />
      <SpecsSections />
      {/* <CTASection /> */}
      {/* <Reserving /> */}
      <G1SGallery />
      {/* <EICMASection /> */}
    </>
  );
};

export default Mirage;
