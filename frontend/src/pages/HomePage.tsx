import FeatureSection from "./Home/Sections/FeatureSection";
import HeroSection from "./Home/Sections/HeroSection";

function HomePage() {
  return (
    <div className="home-page">
      <HeroSection />
      <FeatureSection />
    </div>
  );
}

export default HomePage;
