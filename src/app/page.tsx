export const dynamic = "force-static";

import CallToAction from "@/components/home/call-to-action";
import FAQ from "@/components/home/faq";
import Featured from "@/components/home/featured";
import HeroSlider from "@/components/home/hero-slider";
import HowItWorks from "@/components/home/how-works";
import Stats from "@/components/home/stats";
import Testimonials from "@/components/home/testimonials";
import WhyChooseUs from "@/components/home/why-choose-us";
import WelcomeSection from "@/components/home/welcome-section";
import FeaturesComparison from "@/components/home/features-comparison";

export default function Home() {
  return (
    <div className="">
      {/* Hero Slider Section */}
      <HeroSlider />

      {/* Welcome Section (Image + CTAs) */}
      <WelcomeSection />

      {/* Benefits Section */}
      <WhyChooseUs />

      {/* Featured In Section */}
      <Featured />

      {/* Testimonials Section */}
      <Testimonials />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Comparison Section */}
      <FeaturesComparison />

      {/* Stats Section */}
      <Stats />

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <CallToAction />
    </div>
  );
}
