import React from "react";
import PageHero from "../components/PageHero";
import Services from "../components/Services";

const ServicesPage = () => {
  return (
    <>
      <PageHero
        badge="What We Offer"
        title="Our Core IT"
        highlight="Services"
        subtitle="Scalable, secure, and high-performance digital solutions — custom-built for your business needs in Ahmedabad, Gujarat, and beyond."
        page="Services"
      />
      <Services />
    </>
  );
};

export default ServicesPage;
