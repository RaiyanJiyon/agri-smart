import About from "@/components/about-page/about"
import OurTeam from "@/components/about-page/our-team"
import OurPartners from "@/components/about-page/our-partners"
import ContactUs from "@/components/about-page/contact-us"

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
