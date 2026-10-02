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
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

import oil from '@/app/assets/images/oil&gas.jpg';
import infrastructure from '@/app/assets/images/infrastructure.jpg';
import steel from '@/app/assets/images/steel-metal.jpg';
import water from '@/app/assets/images/water-treatment.jpg';
import transportation from '@/app/assets/images/transportation.jpg';
import paint from '@/app/assets/images/paint-plastics.jpg';
import agro from '@/app/assets/images/food-agro.jpg';
import textile from '@/app/assets/images/textile.jpg';
import paper from '@/app/assets/images/paper.jpg';
import cement from '@/app/assets/images/cement.jpg';

gsap.registerPlugin(ScrollTrigger);

const industries = [
    {
        name: 'Oil & Gas',
        image: oil.src,
    },
    {
        name: 'Infrastructure',
        image: infrastructure.src,
    },
    {
        name: 'Steel & Metal',
        image: steel.src,
    },
    {
        name: 'Water Treatment',
        image: water.src,
    },
    {
        name: 'Transportation',
        image: transportation.src,
    },
    {
        name: 'Paint & Plastics',
        image: paint.src,
    },
    {
        name: 'Food & Agro',
        image: agro.src,
    },
    {
        name: 'Cement',
        image: cement.src,
    },
    {
        name: 'Textile',
        image: textile.src,
    },
    {
        name: 'Paper',
        image: paper.src,
    },
];

export default function IndustriesServe() {
    const sectionRef = useRef<HTMLDivElement>(null);

    const swiperRef = useRef<any>(null);

    const [activeIndex, setActiveIndex] = useState(0);

    /* ==========================================================
       GET POSITION OF EACH CARD

       -2 = outer left
       -1 = inner left
        0 = center
        1 = inner right
        2 = outer right
    ========================================================== */

    const getCardPosition = (index: number) => {
        const total = industries.length;

        let difference =
            (index - activeIndex + total) % total;

        if (difference > total / 2) {
            difference -= total;
        }

        return difference;
    };

    /* ==========================================================
       CARD STYLE

       ONLY OPACITY CHANGED:

       OUTER  = 40%
       INNER  = 80%
       CENTER = 100%

       SCALE / POSITION KEPT SAME
       ========================================================== */

    const getCardClasses = (index: number) => {
        const position = getCardPosition(index);

        if (position === 0) {
            return {
                opacity: 'opacity-100',
                zIndex: 50,
                scale: 'scale-100',
                y: 'translate-y-0',
                height: 'h-[390px]',
            };
        }

        if (position === -1 || position === 1) {
            return {
                opacity: 'opacity-[80%]',
                zIndex: 30,
                scale: 'scale-[0.90]',
                y: 'translate-y-8',
                height: 'h-[350px]',
            };
        }

        if (position === -2 || position === 2) {
            return {
                opacity: 'opacity-[40%]',
                zIndex: 10,
                scale: 'scale-[0.82]',
                y: 'translate-y-16',
                height: 'h-[350px]',
            };
        }

        return {
            opacity: 'opacity-0',
            zIndex: 0,
            scale: 'scale-[0.75]',
            y: 'translate-y-20',
            height: 'h-[350px]',
        };
    };

    /* ==========================================================
       INITIAL GSAP ANIMATION
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

    return (
        <section
            ref={sectionRef}
            className="
                relative
                overflow-hidden
                bg-modura-white
                py-16
                md:py-12
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
                                mb-2
                                flex
                                items-center
                                gap-3
                            "
                        >

                            <span
                                className="
                                    text-[14px]
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
                        {/* RIGHT BUTTONS */}

                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() =>
                                    swiperRef.current?.slidePrev()
                                }
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
                            text-modura-primary
                            transition-all
                            duration-500
                            hover:border-modura-primary
                            hover:bg-modura-primary
                            hover:text-white
                        "
                                aria-label="Previous industry"
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

                            <button
                                type="button"
                                onClick={() =>
                                    swiperRef.current?.slideNext()
                                }
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
                            text-white
                            transition-all
                            duration-500
                            hover:bg-modura-primary-dark
                        "
                                aria-label="Next industry"
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
                </div>
            </div>

            {/* ==================================================
                SLIDER

                IMPORTANT:
                Same original negative spacing is preserved.

                The only changes are:
                - slider is inside max-width container
                - overflow-hidden
                - autoplay
                ================================================== */}

            <div
                className="
                    industry-slider-wrapper
                    relative
                    mx-auto
                    mt-10
                    w-full
                    max-w-[1380px]
                    overflow-hidden
                    px-6
                    md:mt-12
                    md:px-10
                "
            >
                <Swiper
                    modules={[Autoplay]}
                    loop={true}
                    centeredSlides={true}
                    slidesPerView={5}
                    spaceBetween={-35}
                    speed={1000}
                    grabCursor={true}
                    watchSlidesProgress={true}
                    allowTouchMove={true}
                    autoplay={{
                        delay: 2800,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;

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
                                        h-auto!
                                    "
                                    style={{
                                        zIndex: cardStyle.zIndex,
                                    }}
                                >
                                    <div
                                        className={`
        industry-card
        group
        relative
        mx-auto
        ${cardStyle.height}
        w-full
        max-w-[350px]
        transform
        transition-all
        duration-700
        ease-[cubic-bezier(0.22,1,0.36,1)]
        ${cardStyle.opacity}
        ${cardStyle.scale}
        ${cardStyle.y}
    `}
                                    >
                                        {/* ==================================================
                                            IMAGE
                                        ================================================== */}

                                        <div
    className={`
        relative
        w-full
        overflow-hidden
        bg-modura-light
        ${
            position === 0
                ? 'h-[325px] md:h-[350px]'
                : 'h-[285px] md:h-[320px]'
        }
    `}
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

                                        </div>

                                        {/* ==================================================
                                            WHITE TITLE PANEL

                                            SAME FORMAT
                                        ================================================== */}

                                        <div
    className={`
        absolute
        bottom-0
        left-[15px]
        right-0
        z-20
        flex
        items-center
        bg-modura-white
        px-5
        shadow-[0_12px_35px_rgba(11,29,51,0.12)]
        md:px-6
        ${
            position === 0
                ? 'h-[95px] md:h-[100px]'
                : 'h-[82px] md:h-[90px]'
        }
    `}
>
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
                                                    md:text-[20px]
                                                "
                                            >
                                                {
                                                    industry.name
                                                }
                                            </h3>

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

                                        {/* ACTIVE BOTTOM LINE */}

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
                FOOTER / CONTROLS
            ================================================== */}

            <div
                className="
                    industry-controls
                    relative
                    mx-auto
                    mt-7
                    flex
                    max-w-345
                    items-center
                    justify-end
                    border-t
                    border-modura-gray-200
                    px-6
                "
            >
            </div>
        </section>
    );
}