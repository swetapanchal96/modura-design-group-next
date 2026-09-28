"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

import {
    FaBuilding,
    FaUsers,
    FaEarthAmericas,
    FaAward,
} from "react-icons/fa6";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import counterBg from "@/app/assets/images/counter-bg.jpeg";


// ============================================================
// REGISTER GSAP
// ============================================================

gsap.registerPlugin(ScrollTrigger);


// ============================================================
// COUNTER DATA
// ============================================================

const counters = [
    {
        value: 500,
        suffix: "+",
        label: "Projects Delivered",
        icon: FaBuilding,
    },
    {
        value: 250,
        suffix: "+",
        label: "Global Clients",
        icon: FaUsers,
    },
    {
        value: 15,
        suffix: "+",
        label: "Countries Served",
        icon: FaEarthAmericas,
    },
    {
        value: 10,
        suffix: "+",
        label: "Years of Experience",
        icon: FaAward,
    },
];


// ============================================================
// COMPONENT
// ============================================================

const CounterSection = () => {

    const sectionRef = useRef<HTMLElement | null>(null);
    const backgroundRef = useRef<HTMLDivElement | null>(null);
    const accentLineRef = useRef<HTMLDivElement | null>(null);


    // ========================================================
    // GSAP
    // ========================================================

    useLayoutEffect(() => {

        if (!sectionRef.current) return;

        const section = sectionRef.current;


        const ctx = gsap.context(() => {

            // =================================================
            // SELECT ELEMENTS
            // =================================================

            const counterItems =
                gsap.utils.toArray<HTMLElement>(".counter-item");

            const iconWraps =
                gsap.utils.toArray<HTMLElement>(".counter-icon-wrap");

            const icons =
                gsap.utils.toArray<HTMLElement>(".counter-icon");

            const numberWraps =
                gsap.utils.toArray<HTMLElement>(".counter-number-wrap");

            const numbers =
                gsap.utils.toArray<HTMLElement>(".counter-number");

            const suffixes =
                gsap.utils.toArray<HTMLElement>(".counter-suffix");

            const labels =
                gsap.utils.toArray<HTMLElement>(".counter-label");

            const separators =
                gsap.utils.toArray<HTMLElement>(".counter-separator");

            const overlay =
                section.querySelector<HTMLElement>(".counter-overlay");

            const revealLine =
                section.querySelector<HTMLElement>(".counter-reveal-line");

            const revealDot =
                section.querySelector<HTMLElement>(".counter-reveal-dot");

            const bottomLine =
                section.querySelector<HTMLElement>(".counter-bottom-line");


            // =================================================
            // INITIAL STATES
            // =================================================

            gsap.set(counterItems, {
                opacity: 1,
            });

            gsap.set(iconWraps, {
                opacity: 1,
            });

            gsap.set(icons, {
                yPercent: 125,
                opacity: 0,
                rotate: -8,
            });

            gsap.set(numberWraps, {
                y: 32,
                opacity: 0,
            });

            gsap.set(labels, {
                y: 16,
                opacity: 0,
            });

            gsap.set(suffixes, {
                scale: 0,
                opacity: 0,
                transformOrigin: "center center",
            });

            gsap.set(separators, {
                scaleY: 0,
                transformOrigin: "center center",
            });

            gsap.set(revealLine, {
                scaleX: 0,
                transformOrigin: "left center",
            });

            gsap.set(revealDot, {
                left: "0%",
                opacity: 0,
            });

            gsap.set(bottomLine, {
                scaleX: 0,
                transformOrigin: "right center",
            });


            // =================================================
            // MAIN ENTRANCE TIMELINE
            // =================================================

            const tl = gsap.timeline({

                scrollTrigger: {

                    trigger: section,

                    start: "top 82%",

                    once: true,

                },

            });


            // =================================================
            // 1. BACKGROUND CINEMATIC ZOOM
            // =================================================

            tl.fromTo(

                backgroundRef.current,

                {
                    scale: 1.15,
                    xPercent: -2,
                },

                {
                    scale: 1,
                    xPercent: 0,
                    duration: 2.2,
                    ease: "power3.out",
                },

                0

            );


            // =================================================
            // 2. OVERLAY REVEAL
            // =================================================

            tl.fromTo(

                overlay,

                {
                    opacity: 1,
                },

                {
                    opacity: 0.82,
                    duration: 1.3,
                    ease: "power2.out",
                },

                0

            );


            // =================================================
            // 3. TOP ARCHITECTURAL LINE
            // =================================================

            tl.fromTo(

                accentLineRef.current,

                {
                    scaleX: 0,
                    transformOrigin: "left center",
                },

                {
                    scaleX: 1,
                    duration: 1.25,
                    ease: "power4.inOut",
                },

                0.15

            );


            // =================================================
            // 4. VERTICAL SEPARATORS CONSTRUCT
            // =================================================

            tl.to(

                separators,

                {
                    scaleY: 1,
                    duration: 0.9,
                    stagger: 0.12,
                    ease: "power3.inOut",
                },

                0.35

            );


            // =================================================
            // 5. ICONS REVEAL FROM MASK
            // =================================================

            tl.to(

                icons,

                {
                    yPercent: 0,
                    opacity: 1,
                    rotate: 0,
                    duration: 0.9,
                    stagger: 0.13,
                    ease: "power4.out",
                },

                0.42

            );


            // =================================================
            // 6. NUMBER BLOCKS REVEAL
            // =================================================

            tl.to(

                numberWraps,

                {
                    y: 0,
                    opacity: 1,
                    duration: 0.75,
                    stagger: 0.13,
                    ease: "power3.out",
                },

                0.58

            );


            // =================================================
            // 7. LABELS
            // =================================================

            tl.to(

                labels,

                {
                    y: 0,
                    opacity: 1,
                    duration: 0.65,
                    stagger: 0.13,
                    ease: "power2.out",
                },

                0.76

            );


            // =================================================
            // 8. PLUS SYMBOL SNAP
            // =================================================

            tl.to(

                suffixes,

                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.45,
                    stagger: 0.13,
                    ease: "back.out(2.2)",
                },

                0.95

            );


            // =================================================
            // 9. TECHNICAL LINE MOVES ACROSS SECTION
            // =================================================

            tl.to(

                revealLine,

                {
                    scaleX: 1,
                    duration: 1.5,
                    ease: "power3.inOut",
                },

                0.65

            );


            // =================================================
            // 10. MOVING POINT ON TECHNICAL LINE
            // =================================================

            tl.to(

                revealDot,

                {
                    opacity: 1,
                    duration: 0.1,
                },

                0.65

            );

            tl.to(

                revealDot,

                {
                    left: "100%",
                    duration: 1.5,
                    ease: "power3.inOut",
                },

                0.65

            );

            tl.to(

                revealDot,

                {
                    opacity: 0,
                    duration: 0.25,
                },

                2.05

            );


            // =================================================
            // 11. BOTTOM LINE
            // =================================================

            tl.to(

                bottomLine,

                {
                    scaleX: 1,
                    duration: 1.1,
                    ease: "power3.inOut",
                },

                0.9

            );


            // =================================================
            // NUMBER COUNT-UP
            // =================================================

            numbers.forEach((element, index) => {

                const target =
                    Number(element.dataset.value || 0);

                const counter = {
                    value: 0,
                };


                gsap.to(counter, {

                    value: target,

                    duration: 2,

                    delay: 0.6 + index * 0.12,

                    ease: "power3.out",

                    scrollTrigger: {

                        trigger: section,

                        start: "top 82%",

                        once: true,

                    },

                    onUpdate: () => {

                        element.textContent =
                            Math.floor(
                                counter.value
                            ).toLocaleString();

                    },

                });

            });


            // =================================================
            // SCROLL PARALLAX
            // =================================================

            gsap.fromTo(

                backgroundRef.current,

                {
                    yPercent: -5,
                },

                {
                    yPercent: 6,

                    ease: "none",

                    scrollTrigger: {

                        trigger: section,

                        start: "top bottom",

                        end: "bottom top",

                        scrub: 1.2,

                    },

                }

            );


            // =================================================
            // COUNTER HOVER ANIMATIONS
            // =================================================

            counterItems.forEach((item) => {

                const icon =
                    item.querySelector<HTMLElement>(".counter-icon");

                const number =
                    item.querySelector<HTMLElement>(".counter-number");

                const label =
                    item.querySelector<HTMLElement>(".counter-label");

                const hoverLine =
                    item.querySelector<HTMLElement>(".counter-hover-line");


                const handleMouseEnter = () => {

                    gsap.to(icon, {

                        y: -7,

                        scale: 1.1,

                        duration: 0.35,

                        ease: "power3.out",

                    });


                    gsap.to(number, {

                        y: -3,

                        duration: 0.35,

                        ease: "power3.out",

                    });


                    gsap.to(label, {

                        x: 5,

                        duration: 0.35,

                        ease: "power3.out",

                    });


                    gsap.to(hoverLine, {

                        scaleX: 1,

                        duration: 0.45,

                        ease: "power3.out",

                    });

                };


                const handleMouseLeave = () => {

                    gsap.to(icon, {

                        y: 0,

                        scale: 1,

                        duration: 0.55,

                        ease: "elastic.out(1, 0.55)",

                    });


                    gsap.to(number, {

                        y: 0,

                        duration: 0.4,

                        ease: "power3.out",

                    });


                    gsap.to(label, {

                        x: 0,

                        duration: 0.4,

                        ease: "power3.out",

                    });


                    gsap.to(hoverLine, {

                        scaleX: 0,

                        duration: 0.4,

                        ease: "power3.out",

                    });

                };


                item.addEventListener(
                    "mouseenter",
                    handleMouseEnter
                );

                item.addEventListener(
                    "mouseleave",
                    handleMouseLeave
                );


                // GSAP context cleanup
                return () => {

                    item.removeEventListener(
                        "mouseenter",
                        handleMouseEnter
                    );

                    item.removeEventListener(
                        "mouseleave",
                        handleMouseLeave
                    );

                };

            });


        }, sectionRef);


        return () => {

            ctx.revert();

        };

    }, []);


    // ========================================================
    // JSX
    // ========================================================

    return (

        <section
            ref={sectionRef}
            className="
                relative
                isolate
                overflow-hidden
            "
        >

            {/* ==================================================
                BACKGROUND IMAGE
            ================================================== */}

            <div
                ref={backgroundRef}
                className="
                    absolute
                    -inset-[8%]
                    z-0
                "
            >

                <Image
                    src={counterBg}
                    alt="Architecture and engineering projects"
                    fill
                    sizes="100vw"
                    className="
                        object-cover
                        object-center
                    "
                />

            </div>


            {/* ==================================================
                MAIN NAVY OVERLAY
            ================================================== */}

            <div
                className="
                    counter-overlay
                    absolute
                    inset-0
                    z-[1]
                    bg-modura-primary
                    opacity-[0.82]
                "
            />


            {/* ==================================================
                VERY SUBTLE DEPTH GRADIENT
            ================================================== */}

            <div
                className="
                    absolute
                    inset-0
                    z-[2]

                    bg-gradient-to-r

                    from-modura-primary/40
                    via-transparent
                    to-modura-primary/40
                "
            />


            {/* ==================================================
                LEFT ARCHITECTURAL SHADOW
            ================================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    left-0
                    top-0
                    z-[3]

                    h-full
                    w-[22%]

                    bg-gradient-to-r
                    from-modura-primary/45
                    to-transparent
                "
            />


            {/* ==================================================
                TOP ACCENT LINE
            ================================================== */}

            <div
                ref={accentLineRef}
                className="
                    absolute
                    left-0
                    top-0
                    z-30

                    h-[3px]
                    w-full

                    bg-modura-secondary
                "
            />


            {/* ==================================================
                TECHNICAL HORIZONTAL LINE

                This line passes behind all four counters.
            ================================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    left-0
                    top-1/2
                    z-[4]

                    w-full
                    -translate-y-1/2
                "
            >

                <div
                    className="
                        counter-reveal-line

                        h-px
                        w-full

                        bg-modura-white/10
                    "
                />


                {/* moving point */}

                <span
                    className="
                        counter-reveal-dot

                        absolute
                        left-0
                        top-1/2

                        h-[5px]
                        w-[5px]

                        -translate-x-1/2
                        -translate-y-1/2
                        rotate-45

                        bg-modura-secondary-light
                    "
                />

            </div>


            {/* ==================================================
                CONTENT
            ================================================== */}

            <div
                className="
                    relative
                    z-20

                    mx-auto
                    max-w-[1440px]

                    px-5
                    md:px-8
                    xl:px-10
                    2xl:px-12
                "
            >

                <div
                    className="
                        grid

                        grid-cols-1

                        sm:grid-cols-2

                        lg:grid-cols-4
                    "
                >

                    {counters.map((counter, index) => {

                        const Icon = counter.icon;


                        return (

                            <div
                                key={counter.label}
                                className="
                                    counter-item

                                    relative

                                    flex
                                    min-h-[150px]
                                    items-center
                                    justify-center

                                    px-5
                                    py-7

                                    sm:min-h-[170px]

                                    lg:min-h-[195px]
                                    lg:px-5
                                    lg:py-8

                                    xl:min-h-[205px]
                                    xl:px-7
                                "
                            >

                                {/* ==============================
                                    VERTICAL SEPARATOR
                                ============================== */}

                                {index !== 0 && (

                                    <span
                                        className="
                                            counter-separator

                                            absolute
                                            left-0
                                            top-[23%]

                                            hidden

                                            h-[54%]
                                            w-px

                                            bg-modura-white/25

                                            lg:block
                                        "
                                    />

                                )}


                                {/* ==============================
                                    MOBILE DIVIDER
                                ============================== */}

                                {index !== counters.length - 1 && (

                                    <span
                                        className="
                                            absolute
                                            bottom-0
                                            left-[8%]

                                            h-px
                                            w-[84%]

                                            bg-modura-white/15

                                            lg:hidden
                                        "
                                    />

                                )}


                                {/* ==============================
                                    HOVER UNDERLINE

                                    Not a box/card.
                                ============================== */}

                                <span
                                    className="
                                        counter-hover-line

                                        pointer-events-none

                                        absolute
                                        bottom-[20%]
                                        left-[18%]

                                        h-px
                                        w-[64%]

                                        origin-left
                                        scale-x-0

                                        bg-modura-secondary-light/70
                                    "
                                />


                                {/* ==============================
                                    CONTENT
                                ============================== */}

                                <div
                                    className="
                                        relative
                                        z-10

                                        flex
                                        items-center

                                        gap-5

                                        lg:gap-4

                                        xl:gap-6
                                    "
                                >

                                    {/* ==========================
                                        ICON MASK
                                    ========================== */}

                                    <div
                                        className="
                                            counter-icon-wrap

                                            shrink-0
                                            overflow-hidden

                                            py-3
                                        "
                                    >

                                        {/* ======================
                                            LARGE REACT ICON

                                            No square.
                                            No circle.
                                            No background.
                                        ====================== */}

                                        <div
                                            className="
                                                counter-icon

                                                text-modura-white

                                                will-change-transform
                                            "
                                        >

                                            <Icon
                                                className="
                                                    text-[46px]

                                                    sm:text-[50px]

                                                    lg:text-[48px]

                                                    xl:text-[58px]
                                                "
                                            />

                                        </div>

                                    </div>


                                    {/* ==========================
                                        NUMBER AREA
                                    ========================== */}

                                    <div>

                                        <div
                                            className="
                                                counter-number-wrap

                                                flex
                                                items-start

                                                will-change-transform
                                            "
                                        >

                                            <span
                                                data-value={counter.value}
                                                className="
                                                    counter-number

                                                    text-[38px]
                                                    font-bold
                                                    leading-none
                                                    tracking-[-0.045em]

                                                    text-modura-white

                                                    sm:text-[42px]

                                                    lg:text-[40px]

                                                    xl:text-[48px]
                                                "
                                            >
                                                0
                                            </span>


                                            {/* ==================
                                                PLUS SYMBOL
                                            ================== */}

                                            <span
                                                className="
                                                    counter-suffix

                                                    ml-1
                                                    mt-[1px]

                                                    inline-block

                                                    text-[19px]
                                                    font-bold
                                                    leading-none

                                                    text-modura-secondary-light

                                                    xl:text-[23px]
                                                "
                                            >
                                                {counter.suffix}
                                            </span>

                                        </div>


                                        {/* ======================
                                            LABEL
                                        ====================== */}

                                        <div
                                            className="
                                                mt-2
                                                overflow-hidden
                                            "
                                        >

                                            <p
                                                className="
                                                    counter-label

                                                    max-w-[150px]

                                                    text-[10px]
                                                    font-semibold
                                                    uppercase
                                                    leading-[1.55]
                                                    tracking-[0.09em]

                                                    text-modura-gray-200

                                                    sm:text-[11px]

                                                    xl:text-[12px]
                                                "
                                            >
                                                {counter.label}
                                            </p>

                                        </div>

                                    </div>

                                </div>


                                {/* ==============================
                                    SMALL TECHNICAL CORNER
                                ============================== */}

                                <span
                                    className="
                                        pointer-events-none

                                        absolute
                                        bottom-[18px]
                                        right-[18px]

                                        hidden

                                        h-[7px]
                                        w-[7px]

                                        border-b
                                        border-r
                                        border-modura-white/20

                                        xl:block
                                    "
                                />

                            </div>

                        );

                    })}

                </div>

            </div>


            {/* ==================================================
                BOTTOM BUILD LINE
            ================================================== */}

            <div
                className="
                    absolute
                    bottom-0
                    left-0
                    z-30

                    h-px
                    w-full

                    bg-modura-white/15
                "
            >

                <div
                    className="
                        counter-bottom-line

                        ml-auto
                        h-full
                        w-full

                        bg-modura-secondary
                    "
                />

            </div>

        </section>

    );

};


export default CounterSection;