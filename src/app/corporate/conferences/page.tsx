"use client";

import React from "react";
import CorporateHero from "../components/hero";
import Events from "./components/events";
import EICMASection from "@/components/reusable/EICMA";

const Conferences = () => {
  return (
    <>
      <CorporateHero titleKey="corporate.conferences.title" descriptionKey="corporate.conferences.description" />
      <Events />
      {/* <EICMASection /> */}
    </>
  );
};

export default Conferences;
