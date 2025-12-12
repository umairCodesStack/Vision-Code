import CallToAction from "../components/CallToAction";
import Features from "../components/Features";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import LearningJourney from "../components/LearningJourney";
import NavBar from "../components/NavBar";
import SkillsSection from "../components/SkillsSection";
import Stats from "../components/Stats";
const APP_NAME = "Vision-Code";

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar appName={APP_NAME}></NavBar>
      <HeroSection />
      <Stats />
      <Features />
      <SkillsSection />
      <LearningJourney />
      <CallToAction />
      <Footer />
    </div>
  );
}

export default HomePage;
