import { Navbar } from "@/components/LandingPageComponents/Navbar.tsx";
import { Hero } from "@/components/LandingPageComponents/Hero.tsx";
import { About } from "@/components/LandingPageComponents/About";
import { SystemFlow } from "@/components/LandingPageComponents/SystemFlow";
import { Team } from "@/components/LandingPageComponents/Team";
import { Features } from "@/components/LandingPageComponents/Features";
import { Contact } from "@/components/LandingPageComponents/Contact";
import { Footer } from "@/components/LandingPageComponents/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <SystemFlow />
      <Team />
      <Features />
      <Contact />
      <Footer />
    </div>
  );
};

export default Landing;
