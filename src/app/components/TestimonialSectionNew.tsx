'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
    FiArrowLeft,
    FiArrowRight,
} from 'react-icons/fi';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

import test1 from '@/app/assets/images/client-3.jpg';
import test2 from '@/app/assets/images/client-4.jpg';
import test3 from '@/app/assets/images/client-5.jpg';
import test4 from '@/app/assets/images/client-6.jpg';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        name: 'David Roberts',
        role: 'Construction Manager',
        image: test1.src,
        review:
            'A professional and reliable team with strong technical knowledge. Their design support and understanding helped deliver our project successfully.',
    },
    {
        name: 'Michael Anderson',
        role: 'Project Architect',
        image: test2.src,
        review:
            'Modura provided excellent BIM coordination and engineering solutions with great attention to detail throughout the project.',
    },
    {
        name: 'Sarah Williams',
        role: 'Project Director',
        image: test3.src,
        review:
            'Their commitment, communication and technical expertise helped us achieve outstanding project results.',
    },
    {
        name: 'James Wilson',
        role: 'Engineering Consultant',
        image: test4.src,
        review:
            'The team delivered exceptional technical support and maintained excellent coordination from concept to completion.',
    },
];

export default function TestimonialSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const swiperRef = useRef<any>(null);

    const progressRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 78%',
                    once: true,
                },
            });

            tl.from('.testimonial-kicker', {
                y: 20,
                opacity: 0,
                duration: 0.6,
                ease: 'power3.out',
            })
                .from(
                    '.testimonial-main-title',
                    {
                        y: 45,
                        opacity: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                    },
                    '-=0.3',
                )
                .from(
                    '.testimonial-side-label',
                    {
                        x: 30,
                        opacity: 0,
                        duration: 0.6,
                        ease: 'power3.out',
                    },
                    '-=0.5',
                )
                .from(
                    '.testimonial-slider-wrap',
                    {
                        y: 60,
                        opacity: 0,
                        duration: 0.9,
                        ease: 'power3.out',
                    },
                    '-=0.3',
                )
                .from(
                    '.testimonial-bottom',
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

    const animateSlides = () => {
        const activeSlides = document.querySelectorAll(
            '.testimonial-slide-active .testimonial-inner',
        );

        gsap.killTweensOf(activeSlides);

        gsap.fromTo(
            activeSlides,
            {
                opacity: 0,
                y: 35,
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.75,
                stagger: 0.12,
                ease: 'power3.out',
            },
        );

        if (progressRef.current) {
            gsap.killTweensOf(progressRef.current);

            gsap.fromTo(
                progressRef.current,
                {
                    width: '0%',
                },
                {
                    width: '100%',
                    duration: 4,
                    ease: 'none',
                },
            );
        }
    };

    const handleSwiper = (swiper: any) => {
        swiperRef.current = swiper;

        setTimeout(() => {
            animateSlides();
        }, 250);
    };

    const handleSlideChange = () => {
        requestAnimationFrame(() => {
            animateSlides();
        });
    };

    return (
        <section
            ref={sectionRef}
            className="
                relative
                overflow-hidden
                bg-[#f7f8f8]
                py-16
                md:py-14
            "
        >
            {/* =====================================================
                MAIN CONTAINER
            ===================================================== */}

            <div
                className="
                    relative
                    mx-auto
                    w-full
                    max-w-[1380px]
                    overflow-hidden
                    px-6
                    md:px-10
                    lg:px-12
                "
            >
                {/* =====================================================
                    HEADER
                ===================================================== */}

                <div
                    className="
                        mb-10
                        flex
                        items-end
                        justify-between
                        gap-8
                        md:mb-14
                    "
                >
                    <div>
                        {/* KICKER */}

                        <div
                            className="
                                testimonial-kicker
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
                                    text-[#596a79]
                                "
                            >
                                TESTIMONIALS
                            </span>
                        </div>

                        {/* TITLE */}

                        <h2
                            className="
                                testimonial-main-title
                                text-[38px]
                                leading-[0.95]
                                font-bold
                                tracking-[-0.03em]
                                text-[#0b1d33]
                                uppercase
                                sm:text-[46px]
                                md:text-[54px]
                                lg:text-[60px]
                            "
                        >
                            Voices{' '}
                            <span className="text-[#596a79]">
                                Of Our Clients
                            </span>
                        </h2>
                    </div>

                    
                </div>

                {/* =====================================================
                    SLIDER WRAPPER

                    overflow-hidden is important.
                    Nothing can visually escape this container.
                ===================================================== */}

                <div
                    className="
                        testimonial-slider-wrap
                        relative
                        w-full
                        overflow-hidden
                    "
                >
                    <Swiper
                        modules={[Autoplay]}
                        loop={true}
                        slidesPerView={1}
                        spaceBetween={20}
                        speed={1000}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        breakpoints={{
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 24,
                            },
                            1200: {
                                slidesPerView: 2,
                                spaceBetween: 30,
                            },
                        }}
                        onSwiper={handleSwiper}
                        onSlideChange={handleSlideChange}
                        className="
                            !w-full
                            !overflow-hidden
                        "
                    >
                        {testimonials.map((item, index) => (
                            <SwiperSlide
                                key={index}
                                className="
                                    !h-auto
                                "
                            >
                                <div
                                    className="
                                        testimonial-slide-active
                                        relative
                                        h-full
                                        min-h-[340px]
                                        overflow-hidden
                                        bg-white
                                    "
                                >
                                    {/* =================================================
                                        STRUCTURAL LEFT LINE
                                    ================================================= */}

                                    <div
                                        className="
                                            absolute
                                            bottom-0
                                            left-0
                                            top-0
                                            w-[3px]
                                            bg-[#0b1d33]
                                        "
                                    />

                                    

                                    {/* =================================================
                                        LARGE QUOTE
                                    ================================================= */}

                                    <div
                                        className="
                                            pointer-events-none
                                            absolute
                                            right-4
                                            top-5
                                            font-serif
                                            text-[150px]
                                            leading-none
                                            text-[#0b1d33]/[0.045]
                                        "
                                    >
                                        “
                                    </div>

                                    {/* =================================================
                                        INNER CONTENT
                                    ================================================= */}

                                    <div
                                        className="
                                            testimonial-inner
                                            relative
                                            z-10
                                            flex
                                            h-full
                                            flex-col
                                            justify-start
                                            p-7
                                            pt-10
                                            md:p-9
                                            md:pt-11
                                        "
                                    >
                                        {/* =================================================
                                            CLIENT
                                        ================================================= */}

                                        <div
                                            className="
                                                flex
                                                items-center
                                                gap-5
                                            "
                                        >
                                            {/* IMAGE */}

                                            <div
                                                className="
                                                    relative
                                                    h-[96px]
                                                    w-[96px]
                                                    shrink-0
                                                "
                                            >
                                                {/* OFFSET FRAME */}

                                                <div
                                                    className="
                                                        absolute
                                                        -bottom-2
                                                        -left-2
                                                        h-full
                                                        w-full
                                                        border
                                                        border-[#84919c]/30
                                                    "
                                                />

                                                <div
                                                    className="
                                                        relative
                                                        h-full
                                                        w-full
                                                        overflow-hidden
                                                        bg-[#eef1f3]
                                                    "
                                                >
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fill
                                                        sizes="86px"
                                                        className="
                                                            object-cover
                                                        "
                                                    />
                                                </div>
                                            </div>

                                            {/* NAME */}

                                            <div>
                                                <h3
                                                    className="
                                                        text-[18px]
                                                        font-bold
                                                        tracking-wide
                                                        text-[#0b1d33]
                                                        uppercase
                                                    "
                                                >
                                                    {item.name}
                                                </h3>

                                                <p
                                                    className="
                                                        mt-1
                                                        font-bold
                                                        text-[14px]
                                                        text-[#596a79]
                                                    "
                                                >
                                                    {item.role}
                                                </p>

                                                <div
                                                    className="
                                                        mt-1
                                                        flex
                                                        items-center
                                                        gap-2
                                                    "
                                                >
                                                   

                                                    
                                                </div>
                                            </div>
                                        </div>

                                        {/* =================================================
                                            DIVIDER
                                        ================================================= */}

                                        <div
                                            className="
                                                my-7
                                                flex
                                                items-center
                                                gap-4
                                            "
                                        >
                                            <span
                                                className="
                                                    h-[2px]
                                                    flex-1
                                                    bg-[#e4e7e9]
                                                "
                                            />

                                            <span
                                                className="
                                                    h-2
                                                    w-2
                                                    rotate-45
                                                    border-2
                                                    border-[#84919c]
                                                "
                                            />

                                            <span
                                                className="
                                                    h-[2px]
                                                    w-10
                                                    bg-[#e4e7e9]
                                                "
                                            />
                                        </div>

                                        {/* =================================================
                                            REVIEW
                                        ================================================= */}

                                        <div>
                                            <p
                                                className="
                                                    max-w-[570px]
                                                    text-[17px]
                                                    leading-[1.65]
                                                    text-[#596a79]
                                                    md:text-[18px]
                                                "
                                            >
                                                "{item.review}"
                                            </p>

                                            
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* =====================================================
                    BOTTOM CONTROLS
                ===================================================== */}

                <div
                    className="
                        testimonial-bottom
                        mt-7
                        flex
                        items-center
                        justify-end
                        border-t
                        border-[#e4e7e9]
                        pt-5
                    "
                >
                   
                    

                    {/* =================================================
                        ARROWS
                    ================================================= */}

                    {/* <div
                        className="
                            flex
                            items-center
                            gap-2
                        "
                    >
                        <button
                            type="button"
                            aria-label="Previous testimonial"
                            onClick={() =>
                                swiperRef.current?.slidePrev()
                            }
                            className="
                                group
                                relative
                                flex
                                h-11
                                w-14
                                items-center
                                justify-center
                                overflow-hidden
                                border
                                border-[#cdd2d6]
                                bg-white
                                text-[#0b1d33]
                                transition-all
                                duration-500
                                hover:bg-[#0b1d33]
                                hover:text-white
                            "
                        >
                            <span
                                className="
                                    absolute
                                    bottom-0
                                    left-0
                                    h-[2px]
                                    w-0
                                    bg-[#84919c]
                                    transition-all
                                    duration-500
                                    group-hover:w-full
                                "
                            />

                            <FiArrowLeft
                                size={17}
                                className="
                                    transition-transform
                                    duration-500
                                    group-hover:-translate-x-1
                                "
                            />
                        </button>

                        <button
                            type="button"
                            aria-label="Next testimonial"
                            onClick={() =>
                                swiperRef.current?.slideNext()
                            }
                            className="
                                group
                                relative
                                flex
                                h-11
                                w-14
                                items-center
                                justify-center
                                overflow-hidden
                                bg-[#0b1d33]
                                text-white
                                transition-all
                                duration-500
                                hover:bg-[#061322]
                            "
                        >
                            <span
                                className="
                                    absolute
                                    bottom-0
                                    right-0
                                    h-[2px]
                                    w-0
                                    bg-[#84919c]
                                    transition-all
                                    duration-500
                                    group-hover:w-full
                                "
                            />

                            <FiArrowRight
                                size={17}
                                className="
                                    transition-transform
                                    duration-500
                                    group-hover:translate-x-1
                                "
                            />
                        </button>
                    </div> */}
                </div>
            </div>
        </section>
    );
}   