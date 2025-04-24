import CallToAction from "@/components/home/call-to-action";
import FAQ from "@/components/home/faq";
import Featured from "@/components/home/featured";
import HeroSlider from "@/components/home/hero-slider";
import HowItWorks from "@/components/home/how-works";
import Stats from "@/components/home/stats";
import Testimonials from "@/components/home/testimonials";
import WhyChooseUs from "@/components/home/why-choose-us";

export default function Home() {
  return (
    <div className="">
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

      {/* Featured In Section */}
      <Featured />

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <CallToAction />
    </div>
  );
}
