import React from "react";
import HeroSlider from "./hero-slider";
import WhyChooseUs from "./why-choose-us";
import HowItWorks from "./how-works";
import Stats from "./stats";
import Testimonials from "./testimonials";

const HomePage = () => {
  return (
    <div>
      {/* Hero Slider Section */}
      <HeroSlider />
      {/* Benefits Section */}
      <WhyChooseUs />
      {/* How It Works Section */}
      <HowItWorks />
      {/* Stats Section */}
      <Stats />
      {/* Testimonials Section */}
      <Testimonials />
    </div>
  );
};

export default HomePage;
