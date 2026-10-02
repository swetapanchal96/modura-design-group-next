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
import ProjectsNew from './components/ProjectsNew';
import IndustriesServe from './components/IndustriesServe';
import TestimonialSectionNew from './components/TestimonialSectionNew';

export default function Home() {
    return (
        <>
            <HeroSection />
            <AboutSection />
            <ServicesSection />
            {/* <ProjectsSection /> */}
            <ProjectsNew />
            <CounterSection />
            <Clients />
            {/* <GlobalPresence /> */}
            <IndustriesServe />
            {/* <TestimonialSection /> */}
            <TestimonialSectionNew />
            <RelatedBlogs />
        </>
    );
}
