import FeatureSection from "./Sections/FeatureSection";
import HeroSection from "./Sections/HeroSection";
import CallToActionSection from "./Sections/CallToActionSection";
import Footer from "../GeneralSections/Footer";

function HomePage() {
  return (
    <div className="home-page grid grid-cols-1 md:grid-cols-12">
      <HeroSection />
      <FeatureSection />
      <CallToActionSection />
      <Footer />
    </div>
  );
}

export default HomePage;
