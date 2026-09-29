'use client';

import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useLayoutEffect, useRef, useState } from 'react';

import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from 'react-icons/fi';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import 'swiper/css';

// ============================================================
// GSAP
// ============================================================

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// PROJECT IMAGES
// Using your existing image imports
// ============================================================

import residentialProject from '@/app/assets/images/bim-services.jpg';
import commercialProject from '@/app/assets/images/architectural-engineering.jpg';
import industrialProject from '@/app/assets/images/about-3.jpg';
import structuralProject from '@/app/assets/images/about-2.jpg';
import bimProject from '@/app/assets/images/about-1.jpg';

// ============================================================
// TYPE
// ============================================================

type Project = {
    category: string;
    title: string;
    description: string;
    image: StaticImageData;
    href: string;
};

// ============================================================
// PROJECT DATA
// ============================================================

const projects: Project[] = [
    {
        category: 'Residential',
        title: 'Residential Design & Engineering',
        description:
            'Integrated architectural, structural and BIM support developed to deliver coordinated, accurate and buildable residential environments.',
        image: residentialProject,
        href: '/projects/residential-projects',
    },

    {
        category: 'Commercial',
        title: 'Commercial Building Solutions',
        description:
            'Coordinated design and engineering solutions supporting commercial developments from design documentation through BIM coordination.',
        image: commercialProject,
        href: '/projects/commercial-projects',
    },

    {
        category: 'Industrial',
        title: 'Industrial Engineering Project',
        description:
            'Engineering-focused project support combining structural systems, MEP coordination and digital modelling for complex industrial facilities.',
        image: industrialProject,
        href: '/projects/industrial-projects',
    },

    {
        category: 'Structural',
        title: 'Structural Engineering Samples',
        description:
            'Detailed structural engineering and documentation focused on constructability, coordination and accurate project delivery.',
        image: structuralProject,
        href: '/projects/structural-samples',
    },

    {
        category: 'BIM',
        title: 'Integrated BIM Coordination',
        description:
            'Multidisciplinary BIM modelling and coordination supporting efficient collaboration between architectural and engineering teams.',
        image: bimProject,
        href: '/projects/bim-projects',
    },
];

// ============================================================
// COMPONENT
// ============================================================

const ProjectsSection = () => {
    // ========================================================
    // REFS
    // ========================================================

    const sectionRef = useRef<HTMLElement | null>(null);

    const headingRef = useRef<HTMLDivElement | null>(null);

    const buttonRef = useRef<HTMLDivElement | null>(null);

    const sliderRef = useRef<HTMLDivElement | null>(null);

    const controlsRef = useRef<HTMLDivElement | null>(null);

    // ========================================================
    // STATE
    // ========================================================

    const [activeIndex, setActiveIndex] = useState(0);

    const [swiper, setSwiper] = useState<SwiperType | null>(null);

    // ========================================================
    // SECTION GSAP ANIMATION
    // ========================================================

    useLayoutEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,

                    start: 'top 78%',

                    once: true,
                },
            });

            // ================================================
            // HEADING
            // ================================================

            timeline.fromTo(
                headingRef.current,

                {
                    y: 45,
                    opacity: 0,
                },

                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                },
            );

            // ================================================
            // VIEW ALL BUTTON
            // ================================================

            timeline.fromTo(
                buttonRef.current,

                {
                    x: 45,
                    opacity: 0,
                },

                {
                    x: 0,
                    opacity: 1,
                    duration: 0.7,
                    ease: 'power3.out',
                },

                '-=0.55',
            );

            // ================================================
            // PROJECT SHOWCASE
            // ================================================

            timeline.fromTo(
                sliderRef.current,

                {
                    y: 60,
                    opacity: 0,
                },

                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                },

                '-=0.35',
            );

            // ================================================
            // CONTROLS
            // ================================================

            timeline.fromTo(
                controlsRef.current,

                {
                    y: 25,
                    opacity: 0,
                },

                {
                    y: 0,
                    opacity: 1,
                    duration: 0.65,
                    ease: 'power2.out',
                },

                '-=0.45',
            );
        }, sectionRef);

        return () => {
            ctx.revert();
        };
    }, []);

    // ========================================================
    // ACTIVE SLIDE GSAP ANIMATION
    // ========================================================

    const animateActiveSlide = (instance: SwiperType) => {
        const activeSlide = instance.slides[instance.activeIndex];

        if (!activeSlide) return;

        // ====================================================
        // ELEMENTS
        // ====================================================

        const image = activeSlide.querySelector('.project-image');

        const panel = activeSlide.querySelector('.project-panel');

        const label = activeSlide.querySelector('.project-label');

        const category = activeSlide.querySelector('.project-category');

        const title = activeSlide.querySelector('.project-title');

        const description = activeSlide.querySelector('.project-description');

        const link = activeSlide.querySelector('.project-link');

        const topLine = activeSlide.querySelector('.project-top-line');

        const technicalFrame = activeSlide.querySelector('.project-technical-frame');

        // ====================================================
        // IMAGE ANIMATION
        // ====================================================

        if (image) {
            gsap.killTweensOf(image);

            gsap.fromTo(
                image,

                {
                    scale: 1.1,
                },

                {
                    scale: 1,
                    duration: 1.5,
                    ease: 'power3.out',
                },
            );
        }

        // ====================================================
        // TOP LINE ANIMATION
        // ====================================================

        if (topLine) {
            gsap.killTweensOf(topLine);

            gsap.fromTo(
                topLine,

                {
                    width: 0,
                },

                {
                    width: 90,
                    duration: 0.8,
                    delay: 0.15,
                    ease: 'power3.out',
                },
            );
        }

        // ====================================================
        // TECHNICAL FRAME
        // ====================================================

        if (technicalFrame) {
            gsap.killTweensOf(technicalFrame);

            gsap.fromTo(
                technicalFrame,

                {
                    opacity: 0,
                    x: -20,
                    y: 20,
                },

                {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    duration: 0.8,
                    delay: 0.35,
                    ease: 'power3.out',
                },
            );
        }

        // ====================================================
        // INFORMATION PANEL
        // ====================================================

        if (panel) {
            gsap.killTweensOf(panel);

            gsap.fromTo(
                panel,

                {
                    x: 65,
                    opacity: 0,
                },

                {
                    x: 0,
                    opacity: 1,
                    duration: 0.85,
                    delay: 0.1,
                    ease: 'power3.out',
                },
            );
        }

        // ====================================================
        // PANEL CONTENT STAGGER
        // ====================================================

        const content = [label, category, title, description, link].filter(Boolean);

        if (content.length > 0) {
            gsap.killTweensOf(content);

            gsap.fromTo(
                content,

                {
                    y: 25,
                    opacity: 0,
                },

                {
                    y: 0,
                    opacity: 1,
                    duration: 0.55,
                    stagger: 0.08,
                    delay: 0.28,
                    ease: 'power3.out',
                },
            );
        }
    };

    // ========================================================
    // JSX
    // ========================================================

    return (
        <section
            ref={sectionRef}
            className="bg-modura-off-white relative overflow-hidden py-16 lg:py-20 xl:pt-10 xl:pb-20"
        >
            {/* ==================================================
                BACKGROUND ARCHITECTURAL GRID
            ================================================== */}

            <div className="pointer-events-none absolute top-0 right-0 hidden h-[260px] w-[360px] opacity-60 lg:block">
                <span className="bg-modura-gray-200 absolute top-0 right-[60px] h-full w-px" />

                <span className="bg-modura-gray-200 absolute top-0 right-[120px] h-full w-px" />

                <span className="bg-modura-gray-200 absolute top-0 right-[180px] h-full w-px" />

                <span className="bg-modura-gray-200 absolute top-[60px] right-0 h-px w-full" />

                <span className="bg-modura-gray-200 absolute top-[120px] right-0 h-px w-full" />
            </div>

            {/* ==================================================
                CONTAINER
            ================================================== */}

            <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-8 xl:px-10 2xl:px-12">
                {/* ==================================================
                    SECTION HEADER
                ================================================== */}

                <div className="mb-9 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
                    {/* ==============================================
                        HEADING
                    ============================================== */}

                    <div ref={headingRef}>
                        <div className="mb-3 flex items-center gap-3">
                            <span className="text-modura-secondary !text-[14px] font-bold tracking-[0.25em] uppercase">
                                Our Work
                            </span>
                        </div>

                        <h2 className="text-modura-primary max-w-[650px] text-[32px] leading-[1.08] font-bold tracking-[-0.035em] sm:text-[38px] lg:text-[43px] xl:text-[46px]">
                            Featured Project Samples
                        </h2>
                    </div>

                    {/* ==============================================
                        VIEW ALL PROJECTS
                    ============================================== */}

                    <div ref={buttonRef}>
                        <Link
                            href="/projects"
                            className="group/project-btn border-modura-primary bg-modura-white text-modura-primary relative inline-flex h-[52px] items-center overflow-hidden border pr-[62px] pl-5"
                        >
                            {/* HOVER BACKGROUND */}

                            <span className="bg-modura-primary absolute inset-y-0 left-0 w-0 transition-all duration-500 group-hover/project-btn:w-full" />

                            {/* TOP LINE */}

                            <span className="bg-modura-secondary absolute top-0 left-0 z-10 h-[3px] w-8 transition-all duration-500 group-hover/project-btn:w-full" />

                            {/* TECHNICAL PLUS */}

                            <span className="relative z-10 mr-3 h-[9px] w-[9px]">
                                <span className="bg-modura-secondary group-hover/project-btn:bg-modura-white absolute top-0 left-1/2 h-full w-px -translate-x-1/2 transition-colors duration-300" />

                                <span className="bg-modura-secondary group-hover/project-btn:bg-modura-white absolute top-1/2 left-0 h-px w-full -translate-y-1/2 transition-colors duration-300" />
                            </span>

                            {/* BUTTON TEXT */}

                            <span className="group-hover/project-btn:text-modura-white relative z-10 text-[10px] font-bold tracking-[0.08em] whitespace-nowrap uppercase transition-colors duration-300 sm:text-[11px]">
                                View All Projects
                            </span>

                            {/* ARROW */}

                            <span className="bg-modura-primary text-modura-white group-hover/project-btn:bg-modura-secondary absolute top-0 right-0 z-10 flex h-full w-[48px] items-center justify-center transition-colors duration-300">
                                <FiArrowUpRight className="text-[18px] transition-transform duration-300 group-hover/project-btn:rotate-45" />
                            </span>
                        </Link>
                    </div>
                </div>

                {/* ==================================================
                    PROJECT SLIDER
                ================================================== */}

                <div ref={sliderRef} className="relative">
                    <Swiper
                        modules={[Navigation, Autoplay]}

                        slidesPerView={1}

                        speed={900}

                        loop={true}

                        allowTouchMove={true}

                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}

                        onSwiper={(instance) => {
                            setSwiper(instance);

                            requestAnimationFrame(() => {
                                animateActiveSlide(instance);
                            });
                        }}

                        onSlideChangeTransitionStart={(instance) => {
                            setActiveIndex(instance.realIndex);

                            animateActiveSlide(instance);
                        }}

                        className="overflow-visible"
                    >
                        {projects.map((project) => (
                            <SwiperSlide key={project.title}>
                                <div className="relative pb-[330px] md:pb-[260px] lg:pr-[270px] lg:pb-0 xl:pr-[330px]">
                                    {/* ======================================
                                        PROJECT IMAGE
                                    ====================================== */}

                                    <div className="bg-modura-gray-200 relative h-[360px] overflow-hidden sm:h-[430px] lg:h-[500px]">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            priority={activeIndex === 0}
                                            sizes="
                                                (max-width: 1024px) 100vw,
                                                75vw
                                            "
                                            className="project-image object-cover"
                                        />

                                        {/* IMAGE OVERLAY */}

                                        <div className="from-modura-primary/20 absolute inset-0 bg-gradient-to-r via-transparent to-transparent" />

                                        {/* TOP TECHNICAL LINE */}

                                        <span className="project-top-line bg-modura-secondary absolute top-0 left-0 h-[4px]" />

                                        {/* ==================================
                                            TECHNICAL FRAME
                                        ================================== */}

                                        <div className="project-technical-frame absolute bottom-7 left-7 hidden h-[90px] w-[90px] md:block">
                                            <span className="bg-modura-white/60 absolute bottom-0 left-0 h-full w-px" />

                                            <span className="bg-modura-white/60 absolute bottom-0 left-0 h-px w-full" />

                                            <span className="bg-modura-secondary absolute bottom-[20px] left-[-4px] h-[7px] w-[7px]" />
                                        </div>
                                    </div>

                                    {/* ======================================
                                        PROJECT INFORMATION PANEL
                                    ====================================== */}

                                    <div className="project-panel bg-modura-primary text-modura-white absolute right-5 bottom-0 left-5 z-20 px-6 py-7 md:right-8 md:left-auto md:w-[460px] lg:right-0 lg:bottom-1/2 lg:w-[420px] lg:translate-y-1/2 lg:px-8 lg:py-9 xl:w-[480px] xl:px-10 xl:py-10">
                                        {/* PANEL TOP LINE */}

                                        <span className="bg-modura-secondary absolute top-0 left-0 h-[4px] w-[60px]" />

                                        {/* CATEGORY */}

                                        <p className="project-category text-modura-secondary-light mb-2 text-[14px] font-bold tracking-[0.18em] uppercase">
                                            {project.category}
                                        </p>

                                        {/* TITLE */}

                                        <h3 className="project-title text-modura-white max-w-[380px] text-[26px] leading-[1.12] font-bold tracking-[-0.025em] sm:text-[30px] xl:text-[34px]">
                                            {project.title}
                                        </h3>

                                        {/* DESCRIPTION */}

                                        <p className="project-description text-modura-gray-300 mt-5 text-[12px] leading-6 sm:text-[13px]">
                                            {project.description}
                                        </p>

                                        {/* PROJECT LINK */}

                                        <Link
                                            href={project.href}
                                            className="project-link group/explore text-modura-white mt-6 inline-flex items-center gap-4 text-[10px] font-bold tracking-[0.1em] uppercase"
                                        >
                                            Explore Project
                                            <span className="bg-modura-white text-modura-primary group-hover/explore:bg-modura-secondary group-hover/explore:text-modura-white flex h-9 w-9 items-center justify-center transition-all duration-300">
                                                <FiArrowUpRight className="text-[16px] transition-transform duration-300 group-hover/explore:rotate-45" />
                                            </span>
                                        </Link>

                                        {/* ==================================
                                            PANEL TECHNICAL DETAILS
                                        ================================== */}

                                        <div className="pointer-events-none absolute right-0 bottom-0 h-[90px] w-[90px] overflow-hidden opacity-20">
                                            <span className="bg-modura-white absolute right-0 bottom-[25px] h-px w-full" />

                                            <span className="bg-modura-white absolute right-[25px] bottom-0 h-full w-px" />

                                            <span className="border-modura-white absolute -right-10 -bottom-10 h-[80px] w-[80px] rotate-45 border" />
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* ==================================================
                        SLIDER CONTROLS
                    ================================================== */}

                    <div ref={controlsRef} className="mt-7 flex items-center justify-between gap-5">
                        {/* PREVIOUS */}

                        <button
                            type="button"
                            aria-label="Previous project"
                            onClick={() => swiper?.slidePrev()}
                            className="group/prev text-modura-primary flex items-center gap-3"
                        >
                            <span className="border-modura-gray-300 group-hover/prev:border-modura-primary group-hover/prev:bg-modura-primary group-hover/prev:text-modura-white flex h-10 w-10 items-center justify-center border transition-all duration-300">
                                <FiArrowLeft />
                            </span>

                            <span className="hidden text-[13px] font-bold tracking-[0.14em] uppercase sm:block">
                                Previous
                            </span>
                        </button>

                        {/* NEXT */}

                        <button
                            type="button"
                            aria-label="Next project"
                            onClick={() => swiper?.slideNext()}
                            className="group/next text-modura-primary flex items-center justify-end gap-3"
                        >
                            <span className="hidden text-[13px] font-bold tracking-[0.14em] uppercase sm:block">
                                Next
                            </span>

                            <span className="border-modura-gray-300 group-hover/next:border-modura-primary group-hover/next:bg-modura-primary group-hover/next:text-modura-white flex h-10 w-10 items-center justify-center border transition-all duration-300">
                                <FiArrowRight />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;
