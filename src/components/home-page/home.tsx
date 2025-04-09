import React from "react";
import HeroSlider from "./hero-slider";
import WhyChooseUs from "./why-choose-us";
import HowItWorks from "./how-works";
import Stats from "./stats";

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
    </div>
  );
};

export default HomePage;
