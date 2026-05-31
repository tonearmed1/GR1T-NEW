import React from "react";
import CorporateHero from "../components/hero";
import FleetSalesList from "./components/list";

const FleetSales = () => {
  return (
    <>
      <CorporateHero titleKey="corporate.fleetSales.title" descriptionKey="corporate.fleetSales.description" />
      <FleetSalesList />
    </>
  );
};

export default FleetSales;
