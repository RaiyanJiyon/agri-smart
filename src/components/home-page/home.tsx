import React from 'react';
import HeroSlider from './hero-slider';
import WhyChooseUs from './why-choose-us';
import HowItWorks from './how-works';

const HomePage = () => {
    return (
        <div>
            <HeroSlider />
            <WhyChooseUs />
            <HowItWorks />
        </div>
    );
};

export default HomePage;