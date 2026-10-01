'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

import loaderImage from '@/app/assets/images/modura-loader.jpg';

interface ModuraLoaderProps {
    onComplete?: () => void;
}

export default function ModuraLoader({
    onComplete,
}: ModuraLoaderProps) {
    const loaderRef = useRef<HTMLDivElement>(null);

    const imageRef = useRef<HTMLDivElement>(null);
    const imageGlowRef = useRef<HTMLDivElement>(null);

    const progressRef = useRef<HTMLDivElement>(null);
    const progressTextRef = useRef<HTMLSpanElement>(null);

    const conceptRef = useRef<HTMLDivElement>(null);
    const designRef = useRef<HTMLDivElement>(null);
    const engineeringRef = useRef<HTMLDivElement>(null);
    const realityRef = useRef<HTMLDivElement>(null);

    const activeLineRef = useRef<HTMLDivElement>(null);

    const statusRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const loader = loaderRef.current;
        const image = imageRef.current;
        const imageGlow = imageGlowRef.current;

        const progress = progressRef.current;
        const progressText = progressTextRef.current;

        const concept = conceptRef.current;
        const design = designRef.current;
        const engineering = engineeringRef.current;
        const reality = realityRef.current;

        const activeLine = activeLineRef.current;
        const status = statusRef.current;

        if (
            !loader ||
            !image ||
            !imageGlow ||
            !progress ||
            !progressText ||
            !concept ||
            !design ||
            !engineering ||
            !reality ||
            !activeLine ||
            !status
        ) {
            return;
        }

        const ctx = gsap.context(() => {
            /*
            ==================================================
            INITIAL STATE
            ==================================================
            IMPORTANT:
            The photographic image is COMPLETELY HIDDEN
            initially.

            This prevents the image from flashing before
            the animation starts.
            ==================================================
            */

            gsap.set(loader, {
                autoAlpha: 1,
                clipPath: 'inset(0 0 0 0)',
            });

            gsap.set(image, {
                clipPath: 'inset(0 100% 0 0)',
                scale: 1.04,
            });

            gsap.set(imageGlow, {
                opacity: 0,
            });

            gsap.set(progress, {
                scaleX: 0,
                transformOrigin: 'left center',
            });

            gsap.set(progressText, {
                textContent: '0%',
            });

            gsap.set(activeLine, {
                width: '0%',
            });

            /*
            Initial milestone state
            */

            gsap.set(concept, {
                opacity: 1,
                scale: 1,
            });

            gsap.set(design, {
                opacity: 0.28,
                scale: 0.88,
            });

            gsap.set(engineering, {
                opacity: 0.28,
                scale: 0.88,
            });

            gsap.set(reality, {
                opacity: 0.28,
                scale: 0.88,
            });

            gsap.set(status, {
                opacity: 1,
                y: 0,
            });

            /*
            ==================================================
            PROGRESS OBJECT
            ==================================================
            */

            const progressValue = {
                value: 0,
            };

            const updateProgress = () => {
                const value = Math.round(progressValue.value);

                progress.style.transform =
                    `scaleX(${value / 100})`;

                progressText.textContent =
                    `${value}%`;

                activeLine.style.width =
                    `${value}%`;
            };

            /*
            ==================================================
            MAIN TIMELINE
            ==================================================
            */

            const tl = gsap.timeline({
                defaults: {
                    ease: 'power3.inOut',
                },

                onComplete: () => {
                    /*
                    ==========================================
                    FINAL HOLD
                    ==========================================
                    */

                    gsap.delayedCall(0.00, () => {
                        const exit = gsap.timeline({
                            onComplete: () => {
                                onComplete?.();
                            },
                        });

                        /*
                        Fade status first
                        */

                        exit.to(
                            status,
                            {
                                opacity: 0,
                                y: -15,
                                duration: 0.25,
                                ease: 'power2.in',
                            },
                        );

                        /*
                        Slight cinematic zoom
                        */

                        exit.to(
                            image,
                            {
                                scale: 1.02,
                                duration: 0.55,
                                ease: 'power2.inOut',
                            },
                            '<',
                        );

                        /*
                        ======================================
                        LOADER WIPE
                        ======================================
                        */

                        exit.to(
                            loader,
                            {
                                clipPath:
                                    'polygon(0 0, 100% 0, 100% 0, 0 0)',
                                duration: 0.2,
                                ease: 'power4.inOut',
                            },
                            '-=0.05',
                        );

                        /*
                        Remove loader
                        */

                        exit.set(loader, {
                            display: 'none',
                        });
                    });
                },
            });

            /*
            ==================================================
            0% → 10%
            BLUEPRINT / CONCEPT
            ==================================================
            */

            tl.to(
                progressValue,
                {
                    value: 10,
                    duration: 0.65,
                    onUpdate: updateProgress,
                },
            );

            /*
            Blueprint scan
            */

            tl.fromTo(
                '.blueprint-scan',
                {
                    xPercent: -100,
                },
                {
                    xPercent: 100,
                    duration: 1.1,
                    ease: 'power2.inOut',
                },
                '-=0.5',
            );

            /*
            ==================================================
            10% → 25%
            CONCEPT → DESIGN
            ==================================================
            */

            tl.to(
                progressValue,
                {
                    value: 25,
                    duration: 0.9,
                    onUpdate: updateProgress,
                },
            );

            /*
            IMAGE STARTS REVEALING
            LEFT → RIGHT
            */

            tl.to(
                image,
                {
                    clipPath:
                        'inset(0 75% 0 0)',
                    duration: 0.9,
                    ease: 'power4.inOut',
                },
                '<',
            );

            /*
            Design becomes active
            */

            tl.to(
                design,
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.35,
                    ease: 'power3.out',
                },
                '-=0.25',
            );

            tl.to(
                concept,
                {
                    opacity: 0.45,
                    scale: 0.9,
                    duration: 0.3,
                },
                '<',
            );

            /*
            ==================================================
            25% → 50%
            DESIGN
            ==================================================
            */

            tl.to(
                progressValue,
                {
                    value: 50,
                    duration: 1.05,
                    onUpdate: updateProgress,
                },
            );

            /*
            Continue image reveal
            */

            tl.to(
                image,
                {
                    clipPath:
                        'inset(0 50% 0 0)',
                    duration: 1.05,
                    ease: 'power4.inOut',
                },
                '<',
            );

            /*
            Slight image zoom
            */

            tl.to(
                image,
                {
                    scale: 1.015,
                    duration: 1.05,
                    ease: 'power2.out',
                },
                '<',
            );

            /*
            ==================================================
            50% → 75%
            ENGINEERING
            ==================================================
            */

            tl.to(
                progressValue,
                {
                    value: 75,
                    duration: 1.05,
                    onUpdate: updateProgress,
                },
            );

            /*
            Image reveals more
            */

            tl.to(
                image,
                {
                    clipPath:
                        'inset(0 25% 0 0)',
                    duration: 1.05,
                    ease: 'power4.inOut',
                },
                '<',
            );

            /*
            Engineering becomes active
            */

            tl.to(
                engineering,
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.4,
                    ease: 'power3.out',
                },
                '-=0.3',
            );

            tl.to(
                design,
                {
                    opacity: 0.45,
                    scale: 0.9,
                    duration: 0.3,
                },
                '<',
            );

            /*
            Image glow begins
            */

            tl.to(
                imageGlow,
                {
                    opacity: 0.35,
                    duration: 0.7,
                },
                '-=0.4',
            );

            /*
            ==================================================
            75% → 100%
            REALITY
            ==================================================
            */

            tl.to(
                progressValue,
                {
                    value: 100,
                    duration: 1.1,
                    onUpdate: updateProgress,
                },
            );

            /*
            Complete image reveal
            */

            tl.to(
                image,
                {
                    clipPath:
                        'inset(0 0% 0 0)',
                    scale: 1,
                    duration: 1.1,
                    ease: 'power4.inOut',
                },
                '<',
            );

            /*
            Reality becomes active
            */

            tl.to(
                reality,
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.4,
                    ease: 'power3.out',
                },
                '-=0.3',
            );

            tl.to(
                engineering,
                {
                    opacity: 0.45,
                    scale: 0.9,
                    duration: 0.3,
                },
                '<',
            );

            /*
            Full image glow
            */

            tl.to(
                imageGlow,
                {
                    opacity: 0.08,
                    duration: 0.5,
                },
                '-=0.25',
            );

            /*
            Final scan
            */

            tl.fromTo(
                '.final-scan',
                {
                    xPercent: -100,
                    opacity: 0,
                },
                {
                    xPercent: 100,
                    opacity: 0.8,
                    duration: 0.8,
                    ease: 'power2.inOut',
                },
                '-=0.45',
            );

        }, loader);

        return () => {
            ctx.revert();
        };
    }, [onComplete]);

    return (
        <div
            ref={loaderRef}
            className="
                fixed
                inset-0
                z-[99999]
                overflow-hidden
                bg-[#061322]
                text-white
            "
        >
            {/* ==================================================
                BLUEPRINT GRID
            ================================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-[0.16]
                "
                style={{
                    backgroundImage: `
                        linear-gradient(
                            rgba(132,145,156,0.22) 1px,
                            transparent 1px
                        ),
                        linear-gradient(
                            90deg,
                            rgba(132,145,156,0.22) 1px,
                            transparent 1px
                        )
                    `,
                    backgroundSize: '80px 80px',
                }}
            />

            {/* Small secondary grid */}

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-[0.08]
                "
                style={{
                    backgroundImage: `
                        linear-gradient(
                            rgba(162,112,37,0.25) 1px,
                            transparent 1px
                        ),
                        linear-gradient(
                            90deg,
                            rgba(162,112,37,0.25) 1px,
                            transparent 1px
                        )
                    `,
                    backgroundSize: '20px 20px',
                }}
            />

            {/* ==================================================
                CENTER RADIAL LIGHT
            ================================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-1/2
                    h-[650px]
                    w-[650px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-[#1d3349]/20
                    blur-[120px]
                "
            />

            {/* ==================================================
                ARCHITECTURAL IMAGE
            ================================================== */}

            <div
                ref={imageRef}
                className="
                    absolute
                    inset-0
                    z-[2]
                    overflow-hidden
                "
                style={{
                    backgroundImage: `url(${loaderImage.src})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {/* Dark image overlay */}

                <div
                    className="
                        absolute
                        inset-0
                        bg-[#061322]/35
                    "
                />

                {/* Bottom dark gradient */}

                <div
                    className="
                        absolute
                        inset-x-0
                        bottom-0
                        h-[55%]
                        bg-gradient-to-t
                        from-[#061322]
                        via-[#061322]/55
                        to-transparent
                    "
                />

                {/* Top dark gradient */}

                <div
                    className="
                        absolute
                        inset-x-0
                        top-0
                        h-[30%]
                        bg-gradient-to-b
                        from-[#061322]/60
                        to-transparent
                    "
                />
            </div>

            {/* ==================================================
                IMAGE GLOW
            ================================================== */}

            <div
                ref={imageGlowRef}
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    z-[3]
                    bg-[#a27025]/10
                    mix-blend-screen
                "
            />

            {/* ==================================================
                TOP BRAND
            ================================================== */}

            <div
                className="
                    absolute
                    left-7
                    right-7
                    top-7
                    z-20
                    flex
                    items-start
                    justify-between
                    md:left-14
                    md:right-14
                    md:top-10
                "
            >
                {/* Logo */}

                <div>
                    <div
                        className="
                            text-[20px]
                            font-semibold
                            tracking-[0.28em]
                            text-white
                            md:text-[26px]
                        "
                    >
                        MODURA
                    </div>

                    <div
                        className="
                            mt-1
                            text-[7px] font-extralight
                            tracking-[0.55em]
                            text-white
                            md:text-[14px]
                        "
                    >
                        DESIGN GROUP
                    </div>
                </div>

                {/* Services */}

                <div
                    className="
                        text-right
                        text-[7px]
                        tracking-[0.35em]
                        text-white
                        md:text-[15px]
                        font-extrabold
                    "
                >
                    <div>
                        ARCHITECTURE
                    </div>

                    <div className="mt-1 text-[#a27025] font-extrabold">
                        ENGINEERING • BIM
                    </div>
                </div>
            </div>

            {/* ==================================================
                BLUEPRINT SCAN
            ================================================== */}

            <div
                className="
                    blueprint-scan
                    pointer-events-none
                    absolute
                    left-0
                    top-0
                    z-10
                    h-full
                    w-[2px]
                    bg-[#a27025]
                    opacity-60
                    shadow-[0_0_25px_#a27025]
                "
            />

            {/* ==================================================
    CENTER CONTENT
================================================== */}

            <div
                ref={statusRef}
                className="
        absolute
        bottom-[135px]
        left-1/2
        z-30
        w-[calc(100%-40px)]
        max-w-[900px]
        -translate-x-1/2
        md:bottom-[145px]
    "
            >
                {/* TITLE */}

                <div
                    className="
            mb-6
            flex
            items-end
            justify-between
            gap-6
        "
                >
                    <div>
                        <p
                            className="
                    mb-3
                    text-[9px]
                    font-bold
                    tracking-[0.45em]
                    text-[#aeb8c1]
                    md:text-[17px]
                "
                        >
                            MODURA DESIGN GROUP
                        </p>

                        <h1
                            className="
                    whitespace-nowrap
                    text-[26px]
                    font-extrabold
                    leading-none
                    tracking-[0.16em]
                    text-white
                    uppercase
                    sm:text-[30px]
                    md:text-[36px]
                    lg:text-[40px]
                "
                        >
                            Building Your Experience
                        </h1>
                    </div>

                    <span
                        ref={progressTextRef}
                        className="
                min-w-[58px]
                pb-1
                text-right
                text-[24px]
                font-normal
                tracking-wider
                text-[#c18b2c]
                sm:text-[27px]
                md:text-[30px]
                lg:text-[32px]
            "
                    >
                        0%
                    </span>
                </div>


                {/* PROGRESS TRACK */}

                <div
                    className="
            relative
            h-[3px]
            w-full
            overflow-visible
            bg-white/25
        "
                >
                    <div
                        ref={progressRef}
                        className="
                absolute
                inset-y-0
                left-0
                h-full
                w-full
                origin-left
                bg-[#c18b2c]
                shadow-[0_0_16px_rgba(193,139,44,0.9)]
            "
                    />

                    <div
                        ref={activeLineRef}
                        className="
                absolute
                left-0
                top-[-1px]
                h-[5px]
                w-0
                bg-[#e0b35c]
                opacity-80
                blur-[1px]
            "
                    />
                </div>


                {/* MILESTONES */}

                <div
                    className="
            relative
            mt-8
            grid
            grid-cols-4
        "
                >

                    {/* CONCEPT */}

                    <div
                        ref={conceptRef}
                        className="
                flex
                flex-col
                items-start
            "
                    >
                        <span
                            className="
                    mb-4
                    h-[9px]
                    w-[9px]
                    rounded-full
                    bg-[#c18b2c]
                    shadow-[0_0_14px_#c18b2c]
                "
                        />

                        <span
                            className="
                    text-[9px]
                    font-semibold
                    tracking-[0.35em]
                    text-[#aeb8c1]
                    md:text-[13px]
                "
                        >
                            CONCEPT
                        </span>
                    </div>


                    {/* DESIGN */}

                    <div
                        ref={designRef}
                        className="
                flex
                flex-col
                items-center
            "
                    >
                        <span
                            className="
                    mb-4
                    h-[9px]
                    w-[9px]
                    rounded-full
                    bg-[#c18b2c]
                "
                        />

                        <span
                            className="
                    text-[9px]
                    font-semibold
                    tracking-[0.35em]
                    text-[#aeb8c1]
                    md:text-[13px]
                "
                        >
                            DESIGN
                        </span>
                    </div>


                    {/* ENGINEERING */}

                    <div
                        ref={engineeringRef}
                        className="
                flex
                flex-col
                items-center
            "
                    >
                        <span
                            className="
                    mb-4
                    h-[9px]
                    w-[9px]
                    rounded-full
                    bg-[#c18b2c]
                "
                        />

                        <span
                            className="
                    text-[9px]
                    font-semibold
                    tracking-[0.35em]
                    text-[#aeb8c1]
                    md:text-[13px]
                "
                        >
                            ENGINEERING
                        </span>
                    </div>


                    {/* REALITY */}

                    <div
                        ref={realityRef}
                        className="
                flex
                flex-col
                items-end
            "
                    >
                        <span
                            className="
                    mb-4
                    h-[9px]
                    w-[9px]
                    rounded-full
                    bg-[#c18b2c]
                "
                        />

                        <span
                            className="
                    text-[9px]
                    font-semibold
                    tracking-[0.35em]
                    text-[#aeb8c1]
                    md:text-[13px]
                "
                        >
                            REALITY
                        </span>
                    </div>

                </div>

            </div>

            {/* ==================================================
                FINAL SCAN
            ================================================== */}

            <div
                className="
                    final-scan
                    pointer-events-none
                    absolute
                    left-0
                    top-0
                    z-40
                    h-full
                    w-[2px]
                    bg-white
                    shadow-[0_0_35px_white]
                "
            />

            {/* ==================================================
                BOTTOM LEFT
            ================================================== */}

            <div
                className="
                    absolute
                    bottom-7
                    left-7
                    z-30
                    text-[6px]
                    tracking-[0.32em]
                    text-white
                    md:left-14
                    md:text-[14px]
                "
            >
                IDEAS • ENGINEERING • REALITY
            </div>

            {/* ==================================================
                BOTTOM RIGHT
            ================================================== */}

            <div
                className="
                    absolute
                    bottom-7
                    right-7
                    z-30
                    font-extrabold
                    text-[6px]
                    tracking-[0.32em]
                    text-white
                    md:right-14
                    md:text-[14px]
                "
            >
                2026
            </div>
        </div>
    );
}