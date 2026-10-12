'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

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
        company: 'Australia',
        image: test1.src,
        review: 'A professional and reliable team with strong technical knowledge. Their design support and understanding helped deliver our project successfully.',
    },

    {
        name: 'Michael Anderson',
        role: 'Project Architect',
        company: 'USA',
        image: test2.src,
        review: 'Modura provided excellent BIM coordination and engineering solutions with great attention to detail throughout the project.',
    },

    {
        name: 'Sarah Williams',
        role: 'Project Director',
        company: 'UK',
        image: test3.src,
        review: 'Their commitment, communication and technical expertise helped us achieve outstanding project results.',
    },

    {
        name: 'James Wilson',
        role: 'Engineering Consultant',
        company: 'Canada',
        image: test4.src,
        review: 'The team delivered exceptional technical support and maintained excellent coordination from concept to completion.',
    },
];

export default function TestimonialSection() {
    const sectionRef = useRef(null);

    const swiperRef = useRef<any>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.testimonial-heading', {
                y: 50,
                opacity: 0,
                duration: 1,

                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
            });

            gsap.from('.testimonial-card', {
                y: 70,
                opacity: 0,
                duration: 1,

                ease: 'power3.out',

                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const slideAnimation = () => {
        gsap.fromTo(
            '.testimonial-card',

            {
                opacity: 0,
                x: 60,
                scale: 0.97,
            },

            {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 0.8,
                ease: 'power3.out',
            },
        );
    };

    return (
        <section
            ref={sectionRef}

            className="relative overflow-hidden bg-[#f7f8f8] py-20"
        >
            {/* BACKGROUND */}

            <div className="absolute inset-0 bg-[url('/images/blueprint-bg.png')] bg-cover opacity-[0.08]" />

            <div className="relative mx-auto max-w-[1300px] px-8">
                {/* HEADER */}

                <div className="testimonial-heading mb-14 flex items-center justify-between">
                    <div>
                        <div className="mb-4 flex items-center gap-3">
                            <p className="text-[14px] font-bold tracking-[0.35em] text-[#596a79]">TESTIMONIALS</p>
                        </div>

                        <h2 className="text-[32px] leading-none font-bold text-[#0b1d33] uppercase lg:text-[43px] xl:text-[46px]">
                            Voices
                            <span className="text-modura-secondary ml-2">Of Our Clients</span>
                        </h2>
                    </div>

                    <div className="flex gap-5">
                        <button
                            onClick={() => swiperRef.current?.slidePrev()}

                            className="text-[#0b1d33] transition hover:text-[#a27025]"
                        >
                            <FiArrowLeft size={26} />
                        </button>

                        <button
                            onClick={() => swiperRef.current?.slideNext()}

                            className="text-[#0b1d33] transition hover:text-[#a27025]"
                        >
                            <FiArrowRight size={26} />
                        </button>
                    </div>
                </div>

                {/* SLIDER */}

                <Swiper
                    modules={[Autoplay]}

                    loop={true}

                    slidesPerView={1}

                    speed={1000}

                    autoplay={{
                        delay: 4000,

                        disableOnInteraction: false,
                    }}

                    onSwiper={(swiper) => (swiperRef.current = swiper)}

                    onSlideChange={slideAnimation}

                    className="overflow-hidden"
                >
                    {testimonials.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="testimonial-card relative mx-auto grid max-w-[1100px] grid-cols-[280px_1fr] items-center gap-14 bg-white px-14 py-12 shadow-[0_20px_60px_rgba(11,29,51,0.08)]">
                                {/* QUOTE */}

                                <div className="text-modura-secondary/20 absolute top-0 right-10 font-serif text-[140px] leading-none">
                                    "
                                </div>

                                {/* IMAGE */}

                                <div className="flex flex-col items-center">
                                    <div className="relative h-[150px] w-[150px] overflow-hidden rounded-full border-[6px] border-[#f7f8f8] shadow-xl">
                                        <Image
                                            src={item.image}

                                            fill

                                            alt={item.name}

                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="mt-6 text-center">
                                        <h4 className="text-sm font-bold text-[#0b1d33] uppercase">{item.name}</h4>

                                        <p className="mt-1 text-sm text-[#596a79]">{item.role}</p>

                                        <p className="text-xs text-[#a27025]">{item.company}</p>
                                    </div>
                                </div>

                                {/* REVIEW */}

                                <div className="relative border-l border-[#d5dbe0] pl-12">
                                    {/* <FiQuote className="absolute top-0 left-0 -translate-x-1/2 text-5xl text-[#a27025]" /> */}

                                    <p className="relative z-10 max-w-3xl text-xl leading-6 text-[#596a79]">
                                        "{item.review}"
                                    </p>

                                    <div className="bg-modura-secondary mt-8 h-[2px] w-20" />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
