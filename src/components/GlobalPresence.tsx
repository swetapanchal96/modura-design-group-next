'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef, useState } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { FiActivity, FiDroplet, FiLayers, FiSettings, FiTruck, FiZap, FiArrowUpRight } from 'react-icons/fi';

import oil from '@/app/assets/images/oil&gas.jpg';
import infrastructure from '@/app/assets/images/infrastructure.jpg';
import steel from '@/app/assets/images/steel-metal.jpg';
import water from '@/app/assets/images/water-treatment.jpg';
import transport from '@/app/assets/images/transportation.jpg';

gsap.registerPlugin(ScrollTrigger);

const industries = [
    {
        name: 'Oil & Gas',
        desc: 'Engineering solutions for complex energy infrastructure.',
        image: oil.src,
        icon: FiActivity,
    },

    {
        name: 'Infrastructure',
        desc: 'Advanced design support for large scale developments.',
        image: infrastructure.src,
        icon: FiLayers,
    },

    {
        name: 'Steel & Metal',
        desc: 'Precision engineering for heavy industrial facilities.',
        image: steel.src,
        icon: FiSettings,
    },

    {
        name: 'Water Treatment',
        desc: 'Sustainable solutions for water infrastructure.',
        image: water.src,
        icon: FiDroplet,
    },

    {
        name: 'Transportation',
        desc: 'Infrastructure solutions for mobility sectors.',
        image: transport.src,
        icon: FiTruck,
    },
];

export default function IndustriesServe() {
    const sectionRef = useRef<HTMLDivElement>(null);

    const imageBoxRef = useRef<HTMLDivElement>(null);

    const [active, setActive] = useState(3);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.industry-content', {
                y: 50,
                opacity: 0,
                duration: 1,

                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
            });

            gsap.fromTo(
                '.industry-list-item',
                {
                    x: -40,
                    opacity: 0,
                },
                {
                    x: 0,
                    opacity: 1,
                    stagger: 0.12,
                    duration: 0.6,
                    clearProps: 'all',

                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                    },
                },
            );

            gsap.from('.industry-photo', {
                scale: 0.85,
                opacity: 0,
                duration: 1.2,
                ease: 'power3.out',

                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const changeIndustry = (index: number) => {
        if (index === active) return;

        gsap.to(imageBoxRef.current, {
            opacity: 0,
            scale: 0.96,

            duration: 0.35,

            onComplete: () => {
                setActive(index);

                gsap.to(imageBoxRef.current, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.7,
                    ease: 'power3.out',
                });
            },
        });
    };

    return (
        <section
            ref={sectionRef}

            className="relative overflow-hidden bg-[#f7f8f8] pt-10"
        >
            {/* background */}

            <div className="absolute inset-0 bg-[url('/images/blueprint-bg.png')] bg-cover opacity-[0.08]" />

            <div className="relative mx-auto grid h-full max-w-[1400px] grid-cols-[390px_1fr] gap-14 px-10">
                {/* LEFT SIDE */}

                <div className="industry-content flex flex-col justify-center">
                    <div>
                        <div className="mb-5 flex items-center gap-3">
                            <span className="text-modura-secondary text-[14px] font-bold tracking-[0.35em]">
                                OUR EXPERTISE
                            </span>
                        </div>

                        <h2 className="text-[32px] leading-[0.95] font-bold text-[#0b1d33] uppercase lg:text-[43px] xl:text-[46px]">
                            Industries
                            <br />
                            <span className="text-[#596a79]">We Serve</span>
                        </h2>

                        <p className="mt-6 text-sm leading-7 text-[#596a79]">
                            Engineering and BIM solutions supporting diverse industrial sectors worldwide.
                        </p>
                    </div>

                    <div className="mt-10 space-y-2">
                        {industries.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <button
                                    key={index}

                                    onMouseEnter={() => changeIndustry(index)}

                                    className={`industry-list-item relative z-10 flex h-[55px] w-full items-center gap-4 px-5 transition-all duration-500 ${
                                        active === index ? 'bg-[#0b1d33] text-white' : 'text-[#465568]'
                                    } `}
                                >
                                    <span
                                        className={`bg-modura-secondary absolute top-0 left-0 h-full w-[4px] transition-transform ${active === index ? 'scale-y-100' : 'scale-y-0'} `}
                                    />

                                    <Icon className="text-xl" />

                                    <span className="text-sm font-semibold uppercase">{item.name}</span>

                                    <FiArrowUpRight className="ml-auto" />
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* RIGHT SIDE */}

                <div className="flex items-center">
                    <div
                        ref={imageBoxRef}

                        className="industry-photo relative h-[560px] w-full overflow-hidden"

                        style={{
                            clipPath: 'polygon(7% 0,100% 0,100% 100%,0 100%,0 10%)',
                        }}
                    >
                        <Image
                            src={industries[active].image}

                            fill

                            alt="industry"

                            className="object-cover"
                        />

                        <div className="absolute inset-0 bg-linear-to-t from-[#0b1d33] via-transparent to-transparent" />

                        {/* bottom panel */}

                        <div
                            className="absolute bottom-0 left-0 w-[70%] bg-[#0b1d33]/90 px-10 py-8 text-white"

                            style={{
                                clipPath: 'polygon(0 0,90% 0,100% 100%,0 100%)',
                            }}
                        >
                            <div className="bg-modura-secondary mb-4 h-[2px] w-16" />

                            <h3 className="text-5xl font-bold uppercase">{industries[active].name}</h3>

                            <p className="mt-3 text-sm text-gray-300">{industries[active].desc}</p>
                        </div>

                        {/* right gold shape */}

                        <div
                            className="bg-modura-secondary absolute top-16 right-0 h-[260px] w-12"

                            style={{
                                clipPath: 'polygon(100% 0,100% 100%,0 80%,40% 0)',
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
