import Image from 'next/image';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import CounterSection from './components/CounterSection';
import Clients from './components/Clients';
import GlobalPresence from './components/GlobalPresence';
import TestimonialSection from './components/TestimonialSection';
import RelatedBlogs from './components/RelatedBlogs';

export default function Home() {
    return (
        <>
            <HeroSection />
            <AboutSection />
            <ServicesSection />
            <ProjectsSection />
            <CounterSection />
            <Clients />
            <GlobalPresence />
            <TestimonialSection />
            <RelatedBlogs />
        </>
    );
}
