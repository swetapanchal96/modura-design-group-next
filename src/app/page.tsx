import Image from "next/image";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import ProjectsSection from "./components/ProjectsSection";
import CounterSection from "./components/CounterSection";

export default function Home() {
  return (
    <>
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <ProjectsSection />
    <CounterSection />
    </>
  );
}
