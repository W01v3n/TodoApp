import FeatureSection from "./Sections/FeatureSection";
import HeroSection from "./Sections/HeroSection";

function HomePage() {
  return (
    <div className="home-page">
      <HeroSection />
      <FeatureSection />
    </div>
  );
}

export default HomePage;
