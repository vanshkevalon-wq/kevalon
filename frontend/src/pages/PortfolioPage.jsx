import React from "react";
import PageHero from "../components/PageHero";
import Portfolio from "../components/Portfolio";

const PortfolioPage = () => {
  return (
    <>
      <PageHero
        badge="Our Work"
        title="Projects We're"
        highlight="Proud Of"
        subtitle="From web apps to mobile platforms and games — explore the digital products we've built for clients across industries."
        page="Portfolio"
      />
      <Portfolio />
    </>
  );
};

export default PortfolioPage;
