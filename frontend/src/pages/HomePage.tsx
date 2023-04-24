import FeatureSection from "./Sections/Home/FeatureSection";
import HeroSection from "./Sections/Home/HeroSection";

function HomePage() {
  return (
    <div className="home-page">
      <HeroSection />
      <FeatureSection />
    </div>
  );
}

export default HomePage;
