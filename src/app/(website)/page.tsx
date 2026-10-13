'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl } from '@/app/(website)/config';

import Image from 'next/image';
import HeroSection from '../../components/HeroSection';
import AboutSection from '../../components/AboutSection';
import ServicesSection from '../../components/ServicesSection';
import type { HomeService } from '../../components/ServicesSection';
import ProjectsSection from '../../components/ProjectsSection';
import CounterSection from '../../components/CounterSection';
import Clients from '../../components/Clients';
import GlobalPresence from '../../components/GlobalPresence';
import TestimonialSection from '../../components/TestimonialSection';
import RelatedBlogs from '../../components/RelatedBlogs';
import ProjectsNew from '../../components/ProjectsNew';
import IndustriesServe from '../../components/IndustriesServe';
import TestimonialSectionNew from '../../components/TestimonialSectionNew';

interface HomeCounters {
    projectCompleted: number;
    happyClient: number;
    qualifiedEngineers: number;
    yearsExperience: number;
    countriesServed: number;
}

interface HomeClient {
    id: number;
    name: string;
    websiteUrl: string | null;
    imageUrl: string | null;
}

interface HomeTestimonial {
    id: number;
    clientName: string;
    designation: string | null;
    company: string | null;
    rating: number;
    testimonial: string;
    photoUrl: string | null;
    videoUrl: string | null;
    status: boolean;
}

interface HomeBlog {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    imageUrl: string | null;
    publishedAt: string;
}

interface HomePortfolio {
    id: number;
    title: string;
    slug: string;
    type: string;
    imageType: string;
    clientName: string | null;
    isFeatured: boolean;
    coverUrl: string | null;
}

export default function Home() {

    const [homeData, setHomeData] = useState<{
        services: HomeService[];
        counters: HomeCounters | null;
        clients: HomeClient[];
        testimonials: HomeTestimonial[];
        blogs: HomeBlog[];
        portfolios: HomePortfolio[];
    }>({
        services: [],
        counters: null,
        clients: [],
        testimonials: [],
        blogs: [],
        portfolios: [],
    });

    const [homeLoading, setHomeLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        const fetchHomeData = async () => {
            try {
                const response = await axios.post(
                    `${apiUrl}/home`,
                    {},
                    {
                        signal: controller.signal,
                    }
                );

                if (controller.signal.aborted) return;

                if (
                    response.data?.success === true &&
                    response.data?.data
                ) {
                    setHomeData({
                        services: Array.isArray(response.data.data.services)
                            ? response.data.data.services
                            : [],

                        counters: response.data.data.counters ?? null,

                        clients: Array.isArray(response.data.data.clients)
                            ? response.data.data.clients
                            : [],

                        testimonials: Array.isArray(response.data.data.testimonials)
                            ? response.data.data.testimonials
                            : [],

                        blogs: Array.isArray(response.data.data.blogs)
                            ? response.data.data.blogs
                            : [],

                        portfolios: Array.isArray(response.data.data.portfolios)
                            ? response.data.data.portfolios
                            : [],
                    });
                }
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error('Home API Error:', error);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setHomeLoading(false);
                }
            }
        };

        fetchHomeData();

        return () => controller.abort();
    }, []);

    return (
        <>
            <HeroSection />
            <ServicesSection
                services={homeData.services}
                loading={homeLoading}
            />
            <AboutSection />
            {/* <ProjectsSection /> */}
            <ProjectsNew portfolios={homeData.portfolios} />
            <CounterSection counters={homeData.counters} />
            <Clients clients={homeData.clients} />
            {/* <GlobalPresence /> */}
            <IndustriesServe />
            {/* <TestimonialSection /> */}
            <TestimonialSectionNew testimonials={homeData.testimonials} />
            <RelatedBlogs
                blogs={[...homeData.blogs]
                    .sort(
                        (a, b) =>
                            new Date(b.publishedAt).getTime() -
                            new Date(a.publishedAt).getTime()
                    )
                    .slice(0, 3)}
            />
        </>
    );
}
