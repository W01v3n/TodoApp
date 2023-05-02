import FeatureSection from "./Sections/FeatureSection";
import HeroSection from "./Sections/HeroSection";

function HomePage() {
  return (
    <div className="home-page grid grid-cols-1 md:grid-cols-12">
      <HeroSection />
      <FeatureSection />
    </div>
  );
}

export default HomePage;
