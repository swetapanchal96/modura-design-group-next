'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';

import cadDrafting from '@/app/assets/images/cad-drafting.jpg';
import architecturalEngineering from '@/app/assets/images/architectural-engineering.jpg';
import structuralEngineering from '@/app/assets/images/structural-engineering.jpg';
import bimServices from '@/app/assets/images/bim-services.jpg';
import mepEngineering from '@/app/assets/images/mep-engineering.jpg';
import shopDrawing from '@/app/assets/images/shop-drawing.jpg';

const services = [
    {
        title: 'CAD Drafting',
        image: cadDrafting,
        href: '#',
    },
    {
        title: 'Architectural Engineering',
        image: architecturalEngineering,
        href: '#',
    },
    {
        title: 'Structural Engineering',
        image: structuralEngineering,
        href: '#',
    },
    {
        title: 'BIM Services',
        image: bimServices,
        href: '#',
    },
    {
        title: 'MEP Engineering',
        image: mepEngineering,
        href: '#',
    },
    {
        title: 'Shop Drawing',
        image: shopDrawing,
        href: '#',
    },
];

const ServicesSection = () => {
    const sectionRef = useRef<HTMLElement | null>(null);

    const [isVisible, setIsVisible] = useState(false);

    /* =========================================================
        SCROLL REVEAL ANIMATION
    ========================================================== */

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);

                    // Animate only once
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.18,
            },
        );

        observer.observe(section);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="bg-modura-off-white relative overflow-hidden py-14 lg:py-16 xl:pt-20 xl:pb-10"
        >
            {/* =====================================================
                BACKGROUND TECHNICAL DETAIL
            ====================================================== */}

            <div className="pointer-events-none absolute top-0 right-0 hidden h-[170px] w-[260px] opacity-50 lg:block">
                <span className="bg-modura-gray-200 absolute top-0 right-[50px] h-full w-px" />

                <span className="bg-modura-gray-200 absolute top-0 right-[100px] h-full w-px" />

                <span className="bg-modura-gray-200 absolute top-[50px] right-0 h-px w-full" />

                <span className="bg-modura-gray-200 absolute top-[100px] right-0 h-px w-full" />
            </div>

            {/* =====================================================
                MAIN CONTAINER
            ====================================================== */}

            <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-8 xl:px-10 2xl:px-12">
                {/* =================================================
                    SECTION HEADER
                ================================================== */}

                <div className="mb-7 flex flex-col gap-7 md:flex-row md:items-end md:justify-between lg:mb-8">
                    {/* =============================================
                        LEFT TITLE
                    ============================================== */}

                    <div
                        className={`transition-all duration-1000 ease-out ${
                            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
                        } `}
                    >
                        {/* EYEBROW */}

                        <div className="mb-3 flex items-center gap-3">
                            <span
                                className={`bg-modura-secondary h-[2px] transition-all delay-300 duration-700 ${
                                    isVisible ? 'w-8' : 'w-0'
                                } `}
                            />

                            <span className="text-modura-secondary text-[10px] font-bold tracking-[0.25em] uppercase sm:text-[11px]">
                                Our Services
                            </span>
                        </div>

                        {/* TITLE */}

                        <h2 className="text-modura-primary max-w-[1000px] text-[32px] leading-[1.08] font-bold tracking-[-0.035em] sm:text-[38px] lg:text-[43px] xl:text-[46px]">
                            Comprehensive Design & Engineering Support
                            {/* <span className="block">
                                Support Services
                            </span> */}
                        </h2>
                    </div>

                    {/* =============================================
                        VIEW ALL SERVICES BUTTON
                    ============================================== */}

                    <div
                        className={`transition-all delay-200 duration-1000 ease-out ${
                            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                        } `}
                    >
                        <Link
                            href="#"
                            className="group/services-btn border-modura-primary bg-modura-white text-modura-primary relative inline-flex h-[52px] w-fit items-center overflow-hidden border pr-[62px] pl-5"
                        >
                            {/* NAVY HOVER FILL */}

                            <span className="bg-modura-primary absolute inset-y-0 left-0 w-0 transition-all duration-500 group-hover/services-btn:w-full" />

                            {/* TOP LINE */}

                            <span className="bg-modura-secondary absolute top-0 left-0 z-10 h-[3px] w-8 transition-all duration-500 group-hover/services-btn:w-full" />

                            {/* TECHNICAL PLUS */}

                            <span className="relative z-10 mr-3 flex h-[9px] w-[9px] items-center justify-center">
                                <span className="bg-modura-secondary group-hover/services-btn:bg-modura-white absolute h-full w-px transition-colors duration-300" />

                                <span className="bg-modura-secondary group-hover/services-btn:bg-modura-white absolute h-px w-full transition-colors duration-300" />
                            </span>

                            {/* TEXT */}

                            <span className="group-hover/services-btn:text-modura-white relative z-10 text-[10px] font-bold tracking-[0.08em] whitespace-nowrap uppercase transition-colors duration-300 sm:text-[11px]">
                                View All Services
                            </span>

                            {/* ARROW BOX */}

                            <span className="bg-modura-primary text-modura-white group-hover/services-btn:bg-modura-secondary absolute top-0 right-0 z-10 flex h-full w-[48px] items-center justify-center transition-colors duration-300">
                                <FiArrowUpRight className="text-[18px] transition-transform duration-300 group-hover/services-btn:rotate-45" />
                            </span>
                        </Link>
                    </div>
                </div>

                {/* =====================================================
                    SERVICE CARDS
                ====================================================== */}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                    {services.map((service, index) => (
                        <Link
                            key={service.title}
                            href={service.href}
                            style={{
                                transitionDelay: isVisible ? `${250 + index * 120}ms` : '0ms',
                            }}
                            className={`group/service-card border-modura-gray-200 bg-modura-primary relative block overflow-hidden border transition-all duration-700 ease-out xl:border-r-0 xl:last:border-r ${
                                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-14 opacity-0'
                            } `}
                        >
                            {/* =========================================
                                IMAGE
                            ========================================== */}

                            <div className="relative h-[280px] overflow-hidden sm:h-[300px] lg:h-[300px] xl:h-[270px] 2xl:h-[290px]">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill

                                    className="object-cover transition-transform duration-700 ease-out group-hover/service-card:scale-[1.07]"
                                />

                                {/* IMAGE DARK GRADIENT */}

                                <span className="from-modura-primary/80 via-modura-primary/5 pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent" />

                                {/* =====================================
                                    HOVER TOP LINE
                                ====================================== */}

                                <span className="bg-modura-secondary absolute top-0 left-0 z-10 h-[4px] w-0 transition-all duration-500 group-hover/service-card:w-full" />

                                {/* =====================================
                                    IMAGE HOVER SIDE DETAIL
                                ====================================== */}

                                <span className="bg-modura-white/70 absolute top-4 right-4 z-10 h-0 w-px transition-all delay-100 duration-500 group-hover/service-card:h-12" />

                                <span className="bg-modura-white/70 absolute top-4 right-4 z-10 h-px w-0 transition-all delay-100 duration-500 group-hover/service-card:w-12" />

                                {/* =====================================
                                    BOTTOM PANEL
                                ====================================== */}

                                <div className="bg-modura-primary text-modura-white absolute bottom-0 left-0 z-20 flex w-full items-stretch">
                                    {/* TITLE */}

                                    <div className="flex min-h-[72px] flex-1 items-center px-4 py-4 xl:px-3 2xl:px-4">
                                        <h3 className="text-modura-white text-[13px] leading-[1.35] font-semibold transition-transform duration-300 group-hover/service-card:translate-x-1 lg:text-[14px] xl:text-[13px] 2xl:text-[14px]">
                                            {service.title}
                                        </h3>
                                    </div>

                                    {/* ARROW */}

                                    <div className="border-modura-primary-light group-hover/service-card:bg-modura-secondary relative flex w-[48px] shrink-0 items-center justify-center overflow-hidden border-l transition-colors duration-300">
                                        <FiArrowRight className="text-modura-white relative z-10 text-[17px] transition-transform duration-300 group-hover/service-card:translate-x-1" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* =====================================================
                    BOTTOM LINE REVEAL
                ====================================================== */}

                <div className="mt-5 hidden items-center overflow-hidden lg:flex">
                    <span
                        className={`bg-modura-secondary h-[3px] transition-all delay-700 duration-700 ${
                            isVisible ? 'w-[45px]' : 'w-0'
                        } `}
                    />

                    <span
                        className={`bg-modura-gray-200 h-px transition-all delay-700 duration-1000 ${
                            isVisible ? 'flex-1 opacity-100' : 'w-0 opacity-0'
                        } `}
                    />
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
