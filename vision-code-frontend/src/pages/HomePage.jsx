import CodePanelDesign from "../components/CodePanelDesign";
import Features from "../components/Features";
import HeroSection from "../components/HeroSection";
import NavBar from "../components/NavBar";
import Stats from "../components/Stats";
const APP_NAME = "Vision-Code";

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar appName={APP_NAME}></NavBar>
      <HeroSection />
      <Stats />
      <Features />
    </div>
  );
}

export default HomePage;
