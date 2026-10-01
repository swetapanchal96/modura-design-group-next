'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef, useState } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
    FiArrowLeft,
    FiArrowRight,
    FiArrowUpRight,
    FiX,
} from 'react-icons/fi';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

import commercial from '@/app/assets/images/bim-services.jpg';
import campus from '@/app/assets/images/architectural-engineering.jpg';
import airport from '@/app/assets/images/about-3.jpg';
import residence from '@/app/assets/images/about-2.jpg';
import urban from '@/app/assets/images/about-1.jpg';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        name: 'Commercial Tower',
        image: commercial,
    },
    {
        name: 'Corporate Campus',
        image: campus,
    },
    {
        name: 'Airport Terminal',
        image: airport,
    },
    {
        name: 'Luxury Residence',
        image: residence,
    },
    {
        name: 'Urban Structure',
        image: urban,
    },
];

export default function ProjectsSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    const popupRef = useRef<HTMLDivElement>(null);
    const popupBoxRef = useRef<HTMLDivElement>(null);
    const popupImageRef = useRef<HTMLDivElement>(null);
    const popupNameRef = useRef<HTMLHeadingElement>(null);

    const swiperRef = useRef<any>(null);

    const [popupIndex, setPopupIndex] = useState<number | null>(null);

    /*
    |--------------------------------------------------------------------------
    | SECTION ANIMATION
    |--------------------------------------------------------------------------
    */

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 82%',
                    once: true,
                },
            });

            tl.from('.projects-kicker', {
                y: 20,
                opacity: 0,
                duration: 0.6,
                ease: 'power3.out',
            })
                .from(
                    '.projects-title',
                    {
                        y: 30,
                        opacity: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                    },
                    '-=0.3',
                )
                .from(
                    '.project-card',
                    {
                        y: 40,
                        opacity: 0,
                        scale: 0.97,
                        duration: 0.7,
                        stagger: 0.1,
                        ease: 'power3.out',
                    },
                    '-=0.4',
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    /*
    |--------------------------------------------------------------------------
    | OPEN POPUP
    |--------------------------------------------------------------------------
    */

    const openPopup = (index: number) => {
        setPopupIndex(index);

        document.body.style.overflow = 'hidden';

        requestAnimationFrame(() => {
            if (
                !popupRef.current ||
                !popupBoxRef.current ||
                !popupImageRef.current ||
                !popupNameRef.current
            ) {
                return;
            }

            // Reset every time popup opens.
            gsap.killTweensOf([
                popupRef.current,
                popupBoxRef.current,
                popupImageRef.current,
                popupNameRef.current,
            ]);

            gsap.set(popupRef.current, {
                display: 'flex',
                pointerEvents: 'auto',
                opacity: 0,
            });

            gsap.set(popupBoxRef.current, {
                opacity: 0,
                scale: 0.94,
                y: 30,
            });

            gsap.set(popupImageRef.current, {
                opacity: 0,
                scale: 0.96,
            });

            gsap.set(popupNameRef.current, {
                opacity: 0,
                y: 15,
            });

            const tl = gsap.timeline();

            tl.to(popupRef.current, {
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out',
            })
                .to(
                    popupBoxRef.current,
                    {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'power3.out',
                    },
                    '-=0.1',
                )
                .to(
                    popupImageRef.current,
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.65,
                        ease: 'power3.out',
                    },
                    '-=0.3',
                )
                .to(
                    popupNameRef.current,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        ease: 'power3.out',
                    },
                    '-=0.35',
                );
        });
    };

    /*
    |--------------------------------------------------------------------------
    | CLOSE POPUP
    |--------------------------------------------------------------------------
    */

    const closePopup = () => {
        if (!popupRef.current || !popupBoxRef.current) {
            return;
        }

        gsap.killTweensOf([
            popupRef.current,
            popupBoxRef.current,
            popupImageRef.current,
            popupNameRef.current,
        ]);

        gsap.to(popupBoxRef.current, {
            opacity: 0,
            scale: 0.95,
            y: 20,
            duration: 0.3,
            ease: 'power2.in',
        });

        gsap.to(popupRef.current, {
            opacity: 0,
            duration: 0.35,
            delay: 0.05,
            ease: 'power2.in',
            onComplete: () => {
                if (popupRef.current) {
                    gsap.set(popupRef.current, {
                        display: 'none',
                        pointerEvents: 'none',
                    });
                }

                setPopupIndex(null);

                document.body.style.overflow = '';
            },
        });
    };

    /*
    |--------------------------------------------------------------------------
    | CHANGE PROJECT INSIDE POPUP
    |--------------------------------------------------------------------------
    */

    const changePopupProject = (direction: number) => {
        if (popupIndex === null) return;

        const nextIndex =
            (popupIndex + direction + projects.length) %
            projects.length;

        if (
            !popupImageRef.current ||
            !popupNameRef.current
        ) {
            setPopupIndex(nextIndex);
            return;
        }

        gsap.killTweensOf([
            popupImageRef.current,
            popupNameRef.current,
        ]);

        const exitX = direction > 0 ? -35 : 35;
        const enterX = direction > 0 ? 35 : -35;

        const tl = gsap.timeline();

        tl.to(
            [popupImageRef.current, popupNameRef.current],
            {
                opacity: 0,
                x: exitX,
                duration: 0.25,
                ease: 'power2.in',
            },
        );

        tl.call(() => {
            setPopupIndex(nextIndex);
        });

        tl.set(
            [popupImageRef.current, popupNameRef.current],
            {
                x: enterX,
            },
        );

        tl.to(
            [popupImageRef.current, popupNameRef.current],
            {
                opacity: 1,
                x: 0,
                duration: 0.45,
                ease: 'power3.out',
            },
        );
    };

    /*
    |--------------------------------------------------------------------------
    | KEYBOARD
    |--------------------------------------------------------------------------
    */

    useLayoutEffect(() => {
        if (popupIndex === null) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closePopup();
            }

            if (event.key === 'ArrowLeft') {
                changePopupProject(-1);
            }

            if (event.key === 'ArrowRight') {
                changePopupProject(1);
            }
        };

        window.addEventListener(
            'keydown',
            handleKeyDown,
        );

        return () => {
            window.removeEventListener(
                'keydown',
                handleKeyDown,
            );
        };
    }, [popupIndex]);

    /*
    |--------------------------------------------------------------------------
    | CLEANUP BODY SCROLL
    |--------------------------------------------------------------------------
    */

    useLayoutEffect(() => {
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const selectedProject =
        popupIndex !== null
            ? projects[popupIndex]
            : projects[0];

    return (
        <>
            {/* =====================================================
                PROJECT SECTION
            ===================================================== */}

            <section
                ref={sectionRef}
                className="
                    relative
                    overflow-hidden
                    bg-[#f7f8f8]
                    py-14
                    md:py-12
                "
            >
                {/* Architectural Grid */}

                {/* <div
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        opacity-[0.035]
                    "
                    style={{
                        backgroundImage: `
                            linear-gradient(
                                rgba(11,29,51,0.5) 1px,
                                transparent 1px
                            ),
                            linear-gradient(
                                90deg,
                                rgba(11,29,51,0.5) 1px,
                                transparent 1px
                            )
                        `,
                        backgroundSize: '70px 70px',
                    }}
                /> */}

                {/* ================================================
                    HEADER
                ================================================= */}

                <div
                    className="
                        relative
                        mx-auto
                        mb-4
                        max-w-[1300px]
                        px-6
                        md:px-6
                    "
                >
                    <div
                        className="
                            projects-kicker
                            mb-2
                            flex
                            items-center
                            
                        "
                    >
                        {/* <span className="h-[2px] w-10 bg-modura-secondary-light" /> */}

                        <span
                            className="
                                text-[15px]
                                font-bold
                                tracking-[0.35em]
                                text-[#596a79]
                            "
                        >
                            OUR PROJECTS
                        </span>
                    </div>

                    <div className="flex items-end justify-between">
                        <h2
                            className="
                                projects-title
                                text-[38px]
                                font-bold
                                leading-none
                                tracking-tight
                                text-[#0b1d33]
                                uppercase
                                md:text-[46px]
                            "
                        >
                            Featured{' '}
                            <span className="text-[#596a79]">
                                Projects
                            </span>
                        </h2>

                        {/* <div
                            className="
                                hidden
                                items-center
                                gap-3
                                md:flex
                            "
                        >
                            <span className="h-px w-16 bg-[#0b1d33]/20" />

                            <span
                                className="
                                    text-[9px]
                                    font-bold
                                    tracking-[0.3em]
                                    text-[#84919c]
                                "
                            >
                                SELECTED WORK
                            </span>
                        </div> */}
                    </div>
                </div>

                {/* ================================================
                    SLIDER OUTER CONTAINER

                    IMPORTANT:
                    overflow-hidden keeps translated slides
                    INSIDE the left/right container gap.
                ================================================= */}

                <div
                    className="
                        relative
                        mx-auto
                        w-full
                        max-w-[1400px]
                        overflow-hidden
                        px-6
                        md:px-10
                        lg:px-12
                    "
                >
                    <Swiper
                        modules={[Autoplay]}
                        loop={true}
                        speed={900}
                        slidesPerView={1.1}
                        spaceBetween={16}
                        grabCursor={true}
                        autoplay={{
                            delay: 2800,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 18,
                            },

                            768: {
                                slidesPerView: 2.5,
                                spaceBetween: 20,
                            },

                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 22,
                            },

                            1280: {
                                slidesPerView: 4,
                                spaceBetween: 24,
                            },
                        }}
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        className="!overflow-hidden"
                    >
                        {projects.map(
                            (project, index) => (
                                <SwiperSlide
                                    key={index}
                                    className="project-card"
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            openPopup(index)
                                        }
                                        className="
                                            group
                                            relative
                                            block
                                            h-[350px]
                                            w-full
                                            overflow-hidden
                                            bg-[#0b1d33]
                                            text-left
                                            cursor-pointer
                                            md:h-[390px]
                                        "
                                    >
                                        {/* IMAGE */}

                                        <Image
                                            src={project.image}
                                            alt={project.name}
                                            fill
                                            sizes="
                                                (max-width: 640px) 90vw,
                                                (max-width: 768px) 50vw,
                                                (max-width: 1024px) 33vw,
                                                25vw
                                            "
                                            className="
                                                object-cover
                                                transition-transform
                                                duration-[1200ms]
                                                ease-out
                                                group-hover:scale-110
                                            "
                                        />

                                        {/* DARK GRADIENT */}

                                        <div
                                            className="
                                                absolute
                                                inset-0
                                                bg-gradient-to-t
                                                from-[#061322]
                                                via-[#061322]/15
                                                to-transparent
                                                opacity-90
                                            "
                                        />

                                        {/* NUMBER */}

                                        {/* <div
                                            className="
                                                absolute
                                                left-5
                                                top-5
                                                text-[10px]
                                                font-bold
                                                tracking-[0.3em]
                                                text-white/80
                                            "
                                        >
                                            {String(
                                                index + 1,
                                            ).padStart(2, '0')}
                                        </div> */}

                                        {/* OPEN ICON */}

                                        <div
                                            className="
                                                absolute
                                                right-5
                                                top-5
                                                flex
                                                h-9
                                                w-9
                                                items-center
                                                justify-center
                                                border
                                                border-white/40
                                                text-white
                                                transition-all
                                                duration-500
                                                group-hover:border-modura-primary-light
                                                group-hover:bg-modura-primary-light
                                            "
                                        >
                                            <FiArrowUpRight
                                                size={16}
                                            />
                                        </div>

                                        {/* NAME */}

                                        <div
                                            className="
                                                absolute
                                                bottom-0
                                                left-0
                                                w-full
                                                p-6
                                                md:p-7
                                            "
                                        >
                                            <div
                                                className="
                                                    mb-4
                                                    h-[2px]
                                                    w-10
                                                    bg-modura-secondary-light
                                                    transition-all
                                                    duration-500
                                                    group-hover:w-16
                                                "
                                            />

                                            <h3
                                                className="
                                                    text-xl
                                                    font-semibold
                                                    tracking-wide
                                                    text-white
                                                    uppercase
                                                    md:text-2xl
                                                "
                                            >
                                                {project.name}
                                            </h3>
                                        </div>

                                        {/* GOLD LINE */}

                                        <div
                                            className="
                                                absolute
                                                bottom-0
                                                left-0
                                                h-[3px]
                                                w-0
                                                bg-modura-secondary-light
                                                transition-all
                                                duration-700
                                                group-hover:w-full
                                            "
                                        />
                                    </button>
                                </SwiperSlide>
                            ),
                        )}
                    </Swiper>
                </div>

                {/* ================================================
                    BOTTOM CONTROLS
                ================================================= */}

                <div
                    className="
                        relative
                        mx-auto
                        mt-7
                        flex
                        max-w-[1400px]
                        items-center
                        justify-end
                        px-6
                        md:px-10
                        lg:px-12
                    "
                >
                    <div className="flex items-center gap-3">

                        {/* PREVIOUS */}
                        <button
                            type="button"
                            onClick={() => swiperRef.current?.slidePrev()}
                            aria-label="Previous project"
                            className="
            group
            relative
            flex
            h-12
            w-12
            items-center
            justify-center
            overflow-hidden
            border
            border-modura-primary/20
            bg-transparent
            text-modura-primary
            transition-all
            duration-500
            hover:border-modura-primary
            hover:bg-modura-primary
            hover:text-modura-white
        "
                        >
                            {/* Top animated line */}
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

                            {/* Bottom animated line */}
                            <span
                                className="
                absolute
                bottom-0
                right-0
                h-[2px]
                w-0
                bg-modura-secondary-light
                transition-all
                duration-500
                group-hover:w-full
            "
                            />

                            {/* Hover architectural circle */}
                            <span
                                className="
                pointer-events-none
                absolute
                h-0
                w-0
                rounded-full
                bg-modura-secondary/20
                transition-all
                duration-500
                group-hover:h-20
                group-hover:w-20
            "
                            />

                            {/* Arrow */}
                            <FiArrowLeft
                                size={17}
                                className="
                relative
                z-10
                transition-transform
                duration-500
                group-hover:-translate-x-1
            "
                            />
                        </button>


                        {/* NEXT */}
                        <button
                            type="button"
                            onClick={() => swiperRef.current?.slideNext()}
                            aria-label="Next project"
                            className="
            group
            relative
            flex
            h-12
            w-12
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
                            {/* Top animated line */}
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

                            {/* Bottom animated line */}
                            <span
                                className="
                absolute
                bottom-0
                left-0
                h-[2px]
                w-0
                bg-modura-secondary-light
                transition-all
                duration-500
                group-hover:w-full
            "
                            />

                            {/* Hover architectural circle */}
                            <span
                                className="
                pointer-events-none
                absolute
                h-0
                w-0
                rounded-full
                bg-modura-secondary/30
                transition-all
                duration-500
                group-hover:h-20
                group-hover:w-20
            "
                            />

                            {/* Arrow */}
                            <FiArrowRight
                                size={17}
                                className="
                relative
                z-10
                transition-transform
                duration-500
                group-hover:translate-x-1
            "
                            />
                        </button>

                    </div>
                </div>
            </section>

            {/* =====================================================
                PROJECT POPUP
            ===================================================== */}

            <div
                ref={popupRef}
                className="
                    fixed
                    inset-0
                    z-[9999]
                    hidden
                    items-center
                    justify-center
                    bg-[#061322]/85
                    p-5
                    backdrop-blur-md
                    md:p-8
                "
                onClick={(event) => {
                    if (
                        event.target ===
                        event.currentTarget
                    ) {
                        closePopup();
                    }
                }}
            >
                {/* POPUP BOX */}

                <div
                    ref={popupBoxRef}
                    className="
                        relative
                        flex
                        h-[82vh]
                        max-h-[760px]
                        w-full
                        max-w-[1100px]
                        flex-col
                        overflow-hidden
                        bg-[#f7f8f8]
                        shadow-2xl
                    "
                >
                    {/* CLOSE */}

                    <button
                        type="button"
                        onClick={closePopup}
                        className="
                            absolute
                            right-5
                            top-5
                            z-30
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            bg-[#0b1d33]/80
                            text-white
                            backdrop-blur-md
                            transition-all
                            duration-300
                            hover:bg-modura-secondary-light
                        "
                        aria-label="Close project"
                    >
                        <FiX size={19} />
                    </button>

                    {/* IMAGE AREA */}

                    <div
                        ref={popupImageRef}
                        className="
                            relative
                            min-h-0
                            flex-1
                            bg-[#eef1f3]
                        "
                    >
                        <Image
                            key={
                                selectedProject.image.src
                            }
                            src={selectedProject.image}
                            alt={selectedProject.name}
                            fill
                            sizes="100vw"
                            className="
                                object-contain
                                p-3
                                md:p-6
                            "
                        />

                        {/* PREVIOUS */}

                        <button
                            type="button"
                            onClick={() =>
                                changePopupProject(-1)
                            }
                            className="
                                absolute
                                left-5
                                top-1/2
                                flex
                                h-11
                                w-11
                                -translate-y-1/2
                                items-center
                                justify-center
                                bg-[#0b1d33]/80
                                text-white
                                transition-all
                                duration-300
                                hover:bg-modura-secondary-light
                            "
                            aria-label="Previous project"
                        >
                            <FiArrowLeft size={18} />
                        </button>

                        {/* NEXT */}

                        <button
                            type="button"
                            onClick={() =>
                                changePopupProject(1)
                            }
                            className="
                                absolute
                                right-5
                                top-1/2
                                flex
                                h-11
                                w-11
                                -translate-y-1/2
                                items-center
                                justify-center
                                bg-[#0b1d33]/80
                                text-white
                                transition-all
                                duration-300
                                hover:bg-modura-secondary-light
                            "
                            aria-label="Next project"
                        >
                            <FiArrowRight size={18} />
                        </button>
                    </div>

                    {/* PROJECT NAME ONLY */}

                    <div
                        className="
                            flex
                            h-[82px]
                            shrink-0
                            items-center
                            justify-between
                            bg-[#0b1d33]
                            px-6
                            md:h-[92px]
                            md:px-10
                        "
                    >
                        <div className="flex items-center gap-4">
                            {/* <span className="h-[2px] w-10 bg-modura-secondary-light" /> */}

                            <h3
                                ref={popupNameRef}
                                className="
                                    text-xl
                                    font-bold
                                    tracking-wide
                                    text-white
                                    uppercase
                                    md:text-2xl
                                "
                            >
                                {selectedProject.name}
                            </h3>
                        </div>

                        {/* COUNTER */}

                        <div
                            className="
                                text-[10px]
                                font-bold
                                tracking-[0.2em]
                                text-white/50
                            "
                        >
                            {String(
                                (popupIndex ?? 0) + 1,
                            ).padStart(2, '0')}
                            <span className="mx-1 text-modura-secondary-light">
                                /
                            </span>
                            {String(
                                projects.length,
                            ).padStart(2, '0')}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}