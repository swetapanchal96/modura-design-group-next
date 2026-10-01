'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef, useState } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
    FiArrowLeft,
    FiArrowRight,
    FiArrowUpRight,
} from 'react-icons/fi';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import oil from '@/app/assets/images/oil&gas.jpg';
import infrastructure from '@/app/assets/images/infrastructure.jpg';
import steel from '@/app/assets/images/steel-metal.jpg';
import water from '@/app/assets/images/water-treatment.jpg';
import transportation from '@/app/assets/images/transportation.jpg';

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   INDUSTRIES DATA
============================================================ */

const industries = [
    {
        name: 'Oil & Gas',
        image: oil,
    },

    {
        name: 'Infrastructure',
        image: infrastructure,
    },

    {
        name: 'Steel & Metal',
        image: steel,
    },

    {
        name: 'Water Treatment',
        image: water,
    },

    {
        name: 'Transportation',
        image: transportation,
    },

    {
        name: 'Paint & Plastics',
        image: '/images/industries/paint-plastics.jpg',
    },

    {
        name: 'Institution',
        image: '/images/industries/institution.jpg',
    },

    {
        name: 'Food & Agro',
        image: '/images/industries/food-agro.jpg',
    },

    {
        name: 'Cement',
        image: '/images/industries/cement.jpg',
    },

    {
        name: 'Textile',
        image: '/images/industries/textile.jpg',
    },

    {
        name: 'Fertilizers',
        image: '/images/industries/fertilizers.jpg',
    },

    {
        name: 'Paper',
        image: '/images/industries/paper.jpg',
    },

    {
        name: 'Water Network',
        image: '/images/industries/water-network.jpg',
    },
];

/* ============================================================
   COMPONENT
============================================================ */

export default function IndustriesServe() {
    const sectionRef = useRef<HTMLDivElement>(null);

    const swiperRef = useRef<any>(null);

    const [activeIndex, setActiveIndex] = useState(0);

    /* ==========================================================
       GET POSITION OF EACH CARD
       
       0 = outer left
       1 = inner left
       2 = CENTER
       3 = inner right
       4 = outer right
    ========================================================== */

    const getCardPosition = (index: number) => {
        const total = industries.length;

        let difference =
            (index - activeIndex + total) % total;

        /*
         * Convert circular index to nearest position.
         *
         * Example:
         * active = 3
         *
         * index 1 -> -2
         * index 2 -> -1
         * index 3 ->  0
         * index 4 ->  1
         * index 5 ->  2
         */

        if (difference > total / 2) {
            difference -= total;
        }

        return difference;
    };

    /* ==========================================================
       CARD STYLE
    ========================================================== */

    const getCardClasses = (index: number) => {
        const position = getCardPosition(index);

        if (position === 0) {
            return {
                opacity: 'opacity-100',
                zIndex: 'z-[50]',
                scale: 'scale-100',
                y: 'translate-y-0',
            };
        }

        if (position === -1 || position === 1) {
            return {
                opacity: 'opacity-50',
                zIndex: 'z-[30]',
                scale: 'scale-[0.90]',
                y: 'translate-y-8',
            };
        }

        if (position === -2 || position === 2) {
            return {
                opacity: 'opacity-25',
                zIndex: 'z-[10]',
                scale: 'scale-[0.82]',
                y: 'translate-y-16',
            };
        }

        return {
            opacity: 'opacity-0',
            zIndex: 'z-0',
            scale: 'scale-[0.75]',
            y: 'translate-y-20',
        };
    };

    /* ==========================================================
       INITIAL SECTION ANIMATION
    ========================================================== */

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 78%',
                    once: true,
                },
            });

            timeline
                .from('.industry-kicker', {
                    y: 20,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power3.out',
                })

                .from(
                    '.industry-title',
                    {
                        y: 40,
                        opacity: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                    },
                    '-=0.3',
                )

                .from(
                    '.industry-slider-wrapper',
                    {
                        y: 50,
                        opacity: 0,
                        duration: 0.9,
                        ease: 'power3.out',
                    },
                    '-=0.4',
                )

                .from(
                    '.industry-controls',
                    {
                        y: 20,
                        opacity: 0,
                        duration: 0.5,
                        ease: 'power3.out',
                    },
                    '-=0.4',
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    /* ==========================================================
       SLIDE CHANGE
    ========================================================== */

    const handleSlideChange = (swiper: any) => {
        const nextIndex = swiper.realIndex;

        const oldIndex = activeIndex;

        setActiveIndex(nextIndex);

        /*
         * Animate cards after React updates them.
         */

        requestAnimationFrame(() => {
            const direction =
                nextIndex > oldIndex ? 1 : -1;

            gsap.fromTo(
                '.industry-card',
                {
                    x: direction * 35,
                },
                {
                    x: 0,
                    duration: 0.75,
                    ease: 'power3.out',
                    overwrite: true,
                },
            );
        });
    };

    /* ==========================================================
       RENDER
    ========================================================== */

    return (
        <section
            ref={sectionRef}
            className="
                relative
                overflow-hidden
                bg-modura-white
                py-16
                md:py-20
            "
        >
            {/* ==================================================
                BACKGROUND GRID
            ================================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-[0.035]
                "
                style={{
                    backgroundImage: `
                        linear-gradient(
                            rgba(11,29,51,0.55) 1px,
                            transparent 1px
                        ),
                        linear-gradient(
                            90deg,
                            rgba(11,29,51,0.55) 1px,
                            transparent 1px
                        )
                    `,
                    backgroundSize: '72px 72px',
                }}
            />

            {/* ==================================================
                HEADER
            ================================================== */}

            <div
                className="
                    relative
                    mx-auto
                    max-w-[1380px]
                    px-6
                    md:px-10
                "
            >
                <div
                    className="
                        flex
                        items-end
                        justify-between
                    "
                >
                    <div>
                        {/* KICKER */}

                        <div
                            className="
                                industry-kicker
                                mb-4
                                flex
                                items-center
                                gap-3
                            "
                        >
                            <span
                                className="
                                    h-[2px]
                                    w-12
                                    bg-modura-secondary
                                "
                            />

                            <span
                                className="
                                    text-[10px]
                                    font-bold
                                    tracking-[0.35em]
                                    text-modura-secondary
                                "
                            >
                                OUR EXPERTISE
                            </span>
                        </div>

                        {/* TITLE */}

                        <h2
                            className="
                                industry-title
                                text-[40px]
                                font-bold
                                leading-[0.95]
                                tracking-tight
                                text-modura-primary
                                uppercase
                                md:text-[52px]
                            "
                        >
                            Industries{' '}
                            <span className="text-modura-secondary">
                                We Serve
                            </span>
                        </h2>
                    </div>

                    {/* RIGHT LABEL */}

                    <div
                        className="
                            hidden
                            items-center
                            gap-3
                            pb-2
                            md:flex
                        "
                    >
                        <span
                            className="
                                h-px
                                w-16
                                bg-modura-secondary/30
                            "
                        />

                        <span
                            className="
                                text-[9px]
                                font-bold
                                tracking-[0.3em]
                                text-modura-secondary-light
                            "
                        >
                            INDUSTRIES WE SERVE
                        </span>
                    </div>
                </div>
            </div>

            {/* ==================================================
                SLIDER
            ================================================== */}

            <div
                className="
                    industry-slider-wrapper
                    relative
                    mt-10
                    w-full
                    overflow-hidden
                    md:mt-12
                "
            >
                <Swiper
                    loop={true}
                    centeredSlides={true}
                    slidesPerView={5}
                    spaceBetween={-35}
                    speed={1000}
                    grabCursor={true}
                    watchSlidesProgress={true}
                    allowTouchMove={true}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;

                        /*
                         * First slide should be the center.
                         */
                        setTimeout(() => {
                            setActiveIndex(
                                swiper.realIndex,
                            );
                        }, 50);
                    }}
                    onSlideChange={handleSlideChange}
                    breakpoints={{
                        0: {
                            slidesPerView: 1.35,
                            spaceBetween: 0,
                        },

                        480: {
                            slidesPerView: 2.15,
                            spaceBetween: -10,
                        },

                        640: {
                            slidesPerView: 3,
                            spaceBetween: -20,
                        },

                        768: {
                            slidesPerView: 4,
                            spaceBetween: -25,
                        },

                        1024: {
                            slidesPerView: 5,
                            spaceBetween: -35,
                        },

                        1280: {
                            slidesPerView: 5,
                            spaceBetween: -45,
                        },

                        1440: {
                            slidesPerView: 5,
                            spaceBetween: -55,
                        },
                    }}
                    className="
                        !overflow-visible
                    "
                >
                    {industries.map(
                        (industry, index) => {
                            const position =
                                getCardPosition(index);

                            const cardStyle =
                                getCardClasses(index);

                            return (
                                <SwiperSlide
                                    key={index}
                                    className="
                                        !h-auto
                                    "
                                >
                                    <div
                                        className={`
                                            industry-card
                                            group
                                            relative
                                            mx-auto
                                            h-[350px]
                                            w-full
                                            max-w-[350px]
                                            transform
                                            transition-all
                                            duration-700
                                            ease-[cubic-bezier(0.22,1,0.36,1)]
                                            ${cardStyle.opacity}
                                            ${cardStyle.zIndex}
                                            ${cardStyle.scale}
                                            ${cardStyle.y}
                                        `}
                                        data-position={
                                            position
                                        }
                                    >
                                        {/* ==================================================
                                            IMAGE
                                        ================================================== */}

                                        <div
                                            className="
                                                relative
                                                h-[285px]
                                                w-full
                                                overflow-hidden
                                                bg-modura-light
                                                md:h-[320px]
                                            "
                                        >
                                            <Image
                                                src={
                                                    industry.image
                                                }
                                                alt={
                                                    industry.name
                                                }
                                                fill
                                                sizes="
                                                    (max-width: 640px) 70vw,
                                                    (max-width: 1024px) 25vw,
                                                    20vw
                                                "
                                                className="
                                                    object-cover
                                                    transition-transform
                                                    duration-[1200ms]
                                                    ease-out
                                                    group-hover:scale-105
                                                "
                                            />

                                            {/* DARK GRADIENT */}

                                            <div
                                                className="
                                                    absolute
                                                    inset-0
                                                    bg-gradient-to-t
                                                    from-modura-primary/70
                                                    via-modura-primary/10
                                                    to-transparent
                                                "
                                            />

                                            {/* NUMBER */}

                                            <span
                                                className="
                                                    absolute
                                                    left-5
                                                    top-5
                                                    text-[10px]
                                                    font-semibold
                                                    tracking-[0.25em]
                                                    text-white/80
                                                "
                                            >
                                                {String(
                                                    index + 1,
                                                ).padStart(
                                                    2,
                                                    '0',
                                                )}
                                            </span>

                                            {/* CORNER FRAME */}

                                            <span
                                                className="
                                                    absolute
                                                    right-5
                                                    top-5
                                                    h-9
                                                    w-9
                                                    border
                                                    border-white/50
                                                    transition-all
                                                    duration-500
                                                    group-hover:border-white
                                                "
                                            />

                                            <FiArrowUpRight
                                                size={14}
                                                className="
                                                    absolute
                                                    right-[30px]
                                                    top-[30px]
                                                    text-white
                                                    opacity-0
                                                    transition-all
                                                    duration-500
                                                    group-hover:translate-x-1
                                                    group-hover:-translate-y-1
                                                    group-hover:opacity-100
                                                "
                                            />
                                        </div>

                                        {/* ==================================================
                                            WHITE NAME PANEL
                                        ================================================== */}

                                        <div
                                            className="
                                                absolute
                                                bottom-0
                                                left-[15px]
                                                right-0
                                                z-20
                                                flex
                                                h-[82px]
                                                items-center
                                                bg-modura-white
                                                px-5
                                                shadow-[0_12px_35px_rgba(11,29,51,0.12)]
                                                md:h-[90px]
                                                md:px-6
                                            "
                                        >
                                            {/* TOP LINE */}

                                            <span
                                                className="
                                                    absolute
                                                    left-5
                                                    top-5
                                                    h-[2px]
                                                    w-8
                                                    bg-modura-secondary
                                                    transition-all
                                                    duration-500
                                                    group-hover:w-12
                                                "
                                            />

                                            <h3
                                                className="
                                                    mt-3
                                                    text-[17px]
                                                    font-semibold
                                                    tracking-tight
                                                    text-modura-primary
                                                    uppercase
                                                    md:text-[21px]
                                                "
                                            >
                                                {
                                                    industry.name
                                                }
                                            </h3>

                                            {/* RIGHT LINE */}

                                            <span
                                                className="
                                                    absolute
                                                    right-5
                                                    top-5
                                                    h-[2px]
                                                    w-7
                                                    bg-modura-secondary-light
                                                    transition-all
                                                    duration-500
                                                    group-hover:w-11
                                                "
                                            />
                                        </div>

                                        {/* ==================================================
                                            ACTIVE BOTTOM LINE
                                        ================================================== */}

                                        {position === 0 && (
                                            <div
                                                className="
                                                    absolute
                                                    bottom-0
                                                    left-[15px]
                                                    right-0
                                                    z-30
                                                    h-[3px]
                                                    bg-modura-secondary
                                                "
                                            />
                                        )}
                                    </div>
                                </SwiperSlide>
                            );
                        },
                    )}
                </Swiper>
            </div>

            {/* ==================================================
                BOTTOM NAVIGATION
            ================================================== */}

            <div
                className="
                    industry-controls
                    relative
                    mx-auto
                    mt-7
                    flex
                    max-w-[1380px]
                    items-center
                    justify-between
                    px-6
                    md:px-10
                "
            >
                {/* LEFT LABEL */}

                <div
                    className="
                        flex
                        items-center
                        gap-3
                    "
                >
                    <span
                        className="
                            h-[2px]
                            w-10
                            bg-modura-secondary
                        "
                    />

                    <span
                        className="
                            text-[9px]
                            font-bold
                            tracking-[0.3em]
                            text-modura-secondary
                        "
                    >
                        EXPLORE INDUSTRIES
                    </span>
                </div>

                {/* BUTTONS */}

                <div className="flex gap-2">
                    {/* PREVIOUS */}

                    <button
                        type="button"
                        onClick={() =>
                            swiperRef.current?.slidePrev()
                        }
                        aria-label="Previous industry"
                        className="
                            group
                            relative
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            overflow-hidden
                            border
                            border-modura-primary/20
                            bg-modura-white
                            text-modura-primary
                            transition-all
                            duration-500
                            hover:border-modura-primary
                            hover:bg-modura-primary
                            hover:text-modura-white
                        "
                    >
                        <span
                            className="
                                absolute
                                left-0
                                top-0
                                h-[2px]
                                w-0
                                bg-modura-secondary-light
                                transition-all
                                duration-500
                                group-hover:w-full
                            "
                        />

                        <FiArrowLeft
                            size={16}
                            className="
                                transition-transform
                                duration-500
                                group-hover:-translate-x-1
                            "
                        />
                    </button>

                    {/* NEXT */}

                    <button
                        type="button"
                        onClick={() =>
                            swiperRef.current?.slideNext()
                        }
                        aria-label="Next industry"
                        className="
                            group
                            relative
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            overflow-hidden
                            border
                            border-modura-primary
                            bg-modura-primary
                            text-modura-white
                            transition-all
                            duration-500
                            hover:bg-modura-primary-dark
                        "
                    >
                        <span
                            className="
                                absolute
                                right-0
                                top-0
                                h-[2px]
                                w-0
                                bg-modura-secondary-light
                                transition-all
                                duration-500
                                group-hover:w-full
                            "
                        />

                        <FiArrowRight
                            size={16}
                            className="
                                transition-transform
                                duration-500
                                group-hover:translate-x-1
                            "
                        />
                    </button>
                </div>
            </div>
        </section>
    );
}