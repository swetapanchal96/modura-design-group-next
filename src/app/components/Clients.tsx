'use client';

import { useEffect, useRef } from 'react';

import gsap from 'gsap';

import skanska from '@/app/assets/images/skanska.jpg';
import aecom from '@/app/assets/images/aecom.jpg';
import turner from '@/app/assets/images/turner.jpg';
import jll from '@/app/assets/images/JLL_logo.webp';
import genster from '@/app/assets/images/Gensler-Logo.jpg';
import stantec from '@/app/assets/images/stantec-logo.png';

const clients = [
    {
        name: 'Skanska',
        logo: skanska.src,
    },

    {
        name: 'AECOM',
        logo: aecom.src,
    },

    {
        name: 'Turner',
        logo: turner.src,
    },

    {
        name: 'JLL',
        logo: jll.src,
    },

    {
        name: 'Gensler',
        logo: genster.src,
    },

    {
        name: 'Stantec',
        logo: stantec.src,
    },
];

const Clients = () => {
    const sliderRef = useRef<HTMLDivElement | null>(null);

    const animationRef = useRef<gsap.core.Tween | null>(null);

    useEffect(() => {
        const slider = sliderRef.current;

        if (!slider) return;

        const width = slider.scrollWidth / 2;

        animationRef.current = gsap.to(slider, {
            x: -width,

            duration: 25,

            ease: 'none',

            repeat: -1,
        });

        const pause = () => {
            animationRef.current?.pause();
        };

        const play = () => {
            animationRef.current?.resume();
        };

        slider.addEventListener('mouseenter', pause);

        slider.addEventListener('mouseleave', play);

        return () => {
            animationRef.current?.kill();
        };
    }, []);

    return (
        <section className="bg-modura-white relative overflow-hidden py-14">
            {/* TOP TECH LINE */}

            <div className="bg-modura-primary/10 absolute top-0 left-0 h-px w-full" />

            <div className="mx-auto max-w-360 px-5 md:px-10">
                {/* HEADER */}

                <div className="mb-10 flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <span className="text-modura-secondary text-[14px] font-bold tracking-[0.25em] uppercase">
                                Our Clients
                            </span>
                        </div>

                        <h2 className="text-modura-primary text-[32px] font-semibold tracking-tight uppercase lg:text-[43px] xl:text-[46px]">
                            Trusted by <span className="text-[#596a79]"> Global Brands </span>
                        </h2>
                    </div>
                </div>

                {/* LOGO SLIDER */}

                <div className="relative overflow-hidden">
                    {/* LEFT FADE */}

                    <div className="absolute top-0 left-0 z-10 h-full w-20 bg-linear-to-r from-white to-transparent" />

                    {/* RIGHT FADE */}

                    <div className="absolute top-0 right-0 z-10 h-full w-20 bg-linear-to-l from-white to-transparent" />

                    <div
                        ref={sliderRef}

                        className="flex w-max items-center gap-16"
                    >
                        {[...clients, ...clients].map((client, index) => (
                            <div
                                key={index}

                                className="client-logo flex h-20 w-40 items-center justify-center"
                            >
                                <img
                                    src={client.logo}

                                    alt={client.name}

                                    className="max-h-15 max-w-35 opacity-100 grayscale-0 transition-all duration-500 hover:scale-110 hover:opacity-60 hover:grayscale"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* BOTTOM LINE */}

                <div className="bg-modura-primary/10 mt-10 h-px w-full" />
            </div>
        </section>
    );
};

export default Clients;
