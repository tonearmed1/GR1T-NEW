import React from "react";
import CorporateHero from "../components/hero";
import RecruitmentList from "./components/RecruitmentList";
import ProcurementList from "./components/ProcurementList";
import EICMASection from "@/components/reusable/EICMA";

const WorkWithUs = () => {
  return (
    <React.Fragment>
      <CorporateHero titleKey="corporate.work.title" descriptionKey="corporate.work.description" />
      <ProcurementList />
      <RecruitmentList />
      {/* <EICMASection /> */}
    </React.Fragment>
  );
};

export default WorkWithUs;
