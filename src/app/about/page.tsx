import About from "./components/about";
import ContactUs from "./components/contact-us";
import OurPartners from "./components/our-partners";
import OurTeam from "./components/our-team";


export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* About Section */}
      <About />

      {/* Team Section */}
      <OurTeam />

      {/* Partners Section */}
      <OurPartners />

      {/* Contact Section */}
      <ContactUs />
    </div>
  )
}
