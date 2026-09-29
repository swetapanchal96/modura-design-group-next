'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';

import { FiArrowLeft, FiArrowRight, FiArrowUpRight, FiPlay } from 'react-icons/fi';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import hero1 from '@/app/assets/images/hero-1.jpg';
import hero2 from '@/app/assets/images/hero-2.jpg';
import hero3 from '@/app/assets/images/hero-3.jpg';

const heroSlides = [
    {
        id: 'architecture',
        image: hero1,
        eyebrow: 'Built On Precision',
        title: 'Architecture,',
        titleSecond: 'Engineering & BIM',
        highlight: 'Solutions',
        description: 'Trusted design and drafting partner for global clients.',
    },
    {
        id: 'integrated-design',
        image: hero2,
        eyebrow: 'Engineering Better Outcomes',
        title: 'Integrated Design.',
        titleSecond: 'Smarter Project',
        highlight: 'Delivery.',
        description: 'Transforming complex ideas into coordinated, practical and buildable engineering solutions.',
    },
    {
        id: 'global-engineering',
        image: hero3,
        eyebrow: 'Global Engineering Expertise',
        title: 'Precision In Every',
        titleSecond: 'Detail. Confidence In',
        highlight: 'Every Project.',
        description: 'Reliable architecture, BIM, structural and engineering outsourcing support for global projects.',
    },
];

const HeroSection = () => {
    return (
        <section className="bg-modura-primary relative overflow-hidden">
            <Swiper
                modules={[Autoplay, EffectFade, Navigation, Pagination]}
                slidesPerView={1}
                loop={true}
                speed={1000}
                effect="fade"
                fadeEffect={{
                    crossFade: true,
                }}
                autoplay={{
                    delay: 5500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: false,
                }}
                navigation={{
                    prevEl: '.modura-hero-prev',
                    nextEl: '.modura-hero-next',
                }}
                pagination={{
                    el: '.modura-hero-pagination',
                    clickable: true,
                }}
                className="relative h-[650px] w-full sm:h-[680px] lg:h-[calc(100vh-170px)] lg:max-h-[820px] lg:min-h-[650px]"
            >
                {/* ========================================
                    SLIDES
                ======================================== */}

                {heroSlides.map((slide, index) => (
                    <SwiperSlide key={slide.id}>
                        <div className="relative h-full w-full overflow-hidden">
                            {/* IMAGE */}

                            <Image
                                src={slide.image}
                                alt={`${slide.title} ${slide.titleSecond} ${slide.highlight}`}
                                fill
                                priority={index === 0}
                                sizes="100vw"
                                className="object-cover object-center transition-transform duration-[7000ms] ease-out [.swiper-slide-active_&]:scale-[1.04]"
                            />

                            {/* ========================================
                                IMAGE OVERLAY
                            ======================================== */}

                            <div className="from-modura-primary via-modura-primary/50 absolute inset-0 bg-gradient-to-r to-transparent" />

                            <div className="from-modura-primary/30 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />

                            {/* ========================================
                                LEFT ARCHITECTURAL PANEL
                            ======================================== */}

                            <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] hidden w-[48%] lg:block">
                                {/* MAIN POLYGON */}

                                <div className="bg-modura-primary/90 absolute inset-0 [clip-path:polygon(0_0,68%_0,100%_100%,18%_100%,0_77%)]" />

                                {/* SECOND LAYER */}

                                <div className="bg-modura-primary-light/60 absolute bottom-0 left-0 h-[46%] w-[88%] [clip-path:polygon(0_0,100%_100%,0_100%)]" />

                                {/* ACCENT DIAGONAL */}

                                <span className="bg-modura-secondary-light absolute top-[12%] -left-[80px] h-[2px] w-[560px] origin-left rotate-[51deg]" />

                                {/* SECOND DIAGONAL */}

                                <span className="bg-modura-secondary absolute top-[20%] -left-[130px] h-px w-[600px] origin-left rotate-[51deg] opacity-50" />

                                {/* ========================================
                                    BLUEPRINT DETAILS
                                ======================================== */}

                                <div className="absolute bottom-0 left-0 h-[44%] w-[80%] opacity-30">
                                    <span className="bg-modura-secondary-light/50 absolute bottom-0 left-[5%] h-full w-px" />

                                    <span className="bg-modura-secondary-light/40 absolute bottom-0 left-[12%] h-[85%] w-px" />

                                    <span className="bg-modura-secondary-light/35 absolute bottom-0 left-[19%] h-[70%] w-px" />

                                    <span className="bg-modura-secondary-light/30 absolute bottom-0 left-[26%] h-[58%] w-px" />

                                    <span className="bg-modura-secondary-light/40 absolute bottom-[12%] left-0 h-px w-[88%]" />

                                    <span className="bg-modura-secondary-light/35 absolute bottom-[27%] left-0 h-px w-[76%]" />

                                    <span className="bg-modura-secondary-light/30 absolute bottom-[42%] left-0 h-px w-[64%]" />

                                    <span className="border-modura-secondary-light/50 absolute bottom-[10%] left-[16%] h-[43%] w-[32%] [transform:skewY(-18deg)] border-t border-l" />
                                </div>
                            </div>

                            {/* MOBILE OVERLAY */}

                            <div className="bg-modura-primary/70 absolute inset-0 z-[3] lg:hidden" />

                            {/* ========================================
                                CONTENT
                            ======================================== */}

                            <div className="relative z-20 mx-auto flex h-full max-w-[1440px] items-center px-6 sm:px-8 lg:px-[120px] xl:px-[130px]">
                                <div className="max-w-[720px]">
                                    {/* EYEBROW */}

                                    <div className="mb-7 flex items-center gap-5">
                                        {/* <span
                                            className="
                                                h-[2px]
                                                w-[85px]
                                                bg-modura-secondary-light
                                            "
                                        /> */}

                                        <span className="text-modura-white text-[10px] font-bold tracking-[0.3em] uppercase lg:text-[12px]">
                                            {slide.eyebrow}
                                        </span>
                                    </div>

                                    {/* TITLE */}

                                    <h1 className="text-modura-white text-[42px] leading-[1.06] font-bold tracking-[-0.035em] sm:text-[52px] lg:text-[60px] xl:text-[68px]">
                                        <span className="block">{slide.title}</span>

                                        <span className="block">{slide.titleSecond}</span>

                                        <span className="text-modura-secondary-light block">{slide.highlight}</span>
                                    </h1>

                                    {/* DESCRIPTION */}

                                    <p className="text-modura-gray-100 mt-6 max-w-[510px] text-[15px] leading-[1.7] lg:text-[18px]">
                                        {slide.description}
                                    </p>

                                    {/* ========================================
                                        BUTTONS
                                    ======================================== */}

                                    <div className="mt-8 flex flex-wrap items-center gap-6">
                                        {/* EXPLORE */}

                                        <Link
                                            href="#"
                                            className="group/hero-cta border-modura-white bg-modura-white text-modura-primary relative flex h-[56px] items-center overflow-hidden border pr-[66px] pl-6"
                                        >
                                            {/* NAVY HOVER FILL */}
                                            <span className="bg-modura-primary absolute inset-y-0 left-0 w-0 transition-all duration-500 group-hover/hero-cta:w-full" />

                                            {/* TOP ARCHITECTURAL LINE */}
                                            <span className="bg-modura-secondary absolute top-0 left-0 z-10 h-[3px] w-9 transition-all duration-500 group-hover/hero-cta:w-full" />

                                            {/* TECHNICAL MARK */}
                                            <span className="relative z-10 mr-3 flex items-center">
                                                <span className="bg-modura-secondary group-hover/hero-cta:bg-modura-white h-[5px] w-[5px] rotate-45 transition-colors duration-300" />
                                            </span>

                                            {/* TEXT */}
                                            <span className="group-hover/hero-cta:text-modura-white relative z-10 text-[11px] font-bold tracking-[0.08em] whitespace-nowrap uppercase transition-colors duration-300 sm:text-[12px]">
                                                Explore Our Services
                                            </span>

                                            {/* RIGHT ARROW BOX */}
                                            <span className="bg-modura-primary text-modura-white group-hover/hero-cta:bg-modura-secondary absolute top-0 right-0 z-10 flex h-full w-[52px] items-center justify-center transition-colors duration-300">
                                                <FiArrowUpRight className="text-[18px] transition-transform duration-300 group-hover/hero-cta:rotate-45" />
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

                {/* ==================================================
                    IMPORTANT:
                    NAVIGATION MUST BE OUTSIDE SwiperSlide
                ================================================== */}

                <button
                    type="button"
                    aria-label="Previous slide"
                    className="modura-hero-prev border-modura-white bg-modura-primary/60 text-modura-white hover:border-modura-secondary-light hover:bg-modura-secondary-light absolute top-1/2 left-5 z-40 hidden h-[58px] w-[58px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-2 backdrop-blur-sm transition-all duration-300 lg:flex"
                >
                    <FiArrowLeft className="text-[24px]" />
                </button>

                <button
                    type="button"
                    aria-label="Next slide"
                    className="modura-hero-next border-modura-white bg-modura-primary/60 text-modura-white hover:border-modura-secondary-light hover:bg-modura-secondary-light absolute top-1/2 right-5 z-40 hidden h-[58px] w-[58px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-2 backdrop-blur-sm transition-all duration-300 lg:flex"
                >
                    <FiArrowRight className="text-[24px]" />
                </button>

                {/* ==================================================
                    PAGINATION
                    ALSO ONLY ONCE
                ================================================== */}

                <div className="absolute bottom-10 left-[120px] z-40 hidden items-center gap-5 lg:flex">
                    <span className="bg-modura-secondary-light h-[3px] w-[18px]" />

                    <div className="modura-hero-pagination !relative !bottom-auto !left-auto !flex !w-auto !translate-x-0 !items-center !gap-3" />

                    <span className="bg-modura-secondary-light/60 h-px w-[90px]" />
                </div>
            </Swiper>
        </section>
    );
};

export default HeroSection;
