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
        <section className="bg-modura-white relative overflow-hidden py-14 lg:pb-0!">
            {/* TOP TECH LINE */}

            <div className="bg-modura-primary/10 absolute top-0 left-0 h-px w-full" />

            <div className="mx-auto max-w-360 px-5 md:px-10">
                {/* HEADER */}

                <div className="mb-5 flex items-center justify-between">
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

                {/* =================================================
                        CLIENTS → INDUSTRIES
                        CREATIVE NETWORK TRANSITION
                    ================================================= */}

                    <div
                        className="
                            relative
                            h-[105px]
                            w-full
                            overflow-hidden
                        "
                    >
                        {/* =================================================
                            LEFT NETWORK
                        ================================================= */}

                        <span
                            className="
                                absolute
                                top-[38px]
                                left-0
                                h-px
                                w-[calc(50%-90px)]
                                bg-modura-primary/15
                            "
                        />

                        <span
                            className="
                                absolute
                                top-[50px]
                                left-[8%]
                                h-px
                                w-[calc(42%-90px)]
                                bg-modura-secondary/25
                            "
                        />

                        <span
                            className="
                                absolute
                                top-[62px]
                                left-[15%]
                                h-px
                                w-[calc(35%-90px)]
                                bg-modura-primary/10
                            "
                        />


                        {/* =================================================
                            LEFT CONNECTION POINTS
                        ================================================= */}

                        <span
                            className="
                                absolute
                                top-[34px]
                                left-[18%]
                                h-[9px]
                                w-[9px]
                                rounded-full
                                border
                                border-modura-primary
                                bg-modura-white
                            "
                        />

                        <span
                            className="
                                absolute
                                top-[46px]
                                left-[27%]
                                h-[7px]
                                w-[7px]
                                rounded-full
                                bg-modura-secondary
                            "
                        />

                        <span
                            className="
                                absolute
                                top-[58px]
                                left-[34%]
                                h-[6px]
                                w-[6px]
                                rounded-full
                                bg-modura-primary/50
                            "
                        />


                        {/* =================================================
                            LEFT DIAGONAL CONNECTIONS
                        ================================================= */}

                        <span
                            className="
                                absolute
                                top-[38px]
                                left-[18%]
                                h-[27px]
                                w-px
                                origin-top
                                rotate-[58deg]
                                bg-modura-primary/20
                            "
                        />

                        <span
                            className="
                                absolute
                                top-[50px]
                                left-[27%]
                                h-[20px]
                                w-px
                                origin-top
                                rotate-[55deg]
                                bg-modura-secondary/30
                            "
                        />


                        {/* =================================================
                            RIGHT NETWORK
                        ================================================= */}

                        <span
                            className="
                                absolute
                                top-[38px]
                                right-0
                                h-px
                                w-[calc(50%-90px)]
                                bg-modura-primary/15
                            "
                        />

                        <span
                            className="
                                absolute
                                top-[50px]
                                right-[8%]
                                h-px
                                w-[calc(42%-90px)]
                                bg-modura-secondary/25
                            "
                        />

                        <span
                            className="
                                absolute
                                top-[62px]
                                right-[15%]
                                h-px
                                w-[calc(35%-90px)]
                                bg-modura-primary/10
                            "
                        />


                        {/* =================================================
                            RIGHT CONNECTION POINTS
                        ================================================= */}

                        <span
                            className="
                                absolute
                                top-[34px]
                                right-[18%]
                                h-[9px]
                                w-[9px]
                                rounded-full
                                border
                                border-modura-primary
                                bg-modura-white
                            "
                        />

                        <span
                            className="
                                absolute
                                top-[46px]
                                right-[27%]
                                h-[7px]
                                w-[7px]
                                rounded-full
                                bg-modura-secondary
                            "
                        />

                        <span
                            className="
                                absolute
                                top-[58px]
                                right-[34%]
                                h-[6px]
                                w-[6px]
                                rounded-full
                                bg-modura-primary/50
                            "
                        />


                        {/* =================================================
                            RIGHT DIAGONAL CONNECTIONS
                        ================================================= */}

                        <span
                            className="
                                absolute
                                top-[38px]
                                right-[18%]
                                h-[27px]
                                w-px
                                origin-top
                                rotate-[-58deg]
                                bg-modura-primary/20
                            "
                        />

                        <span
                            className="
                                absolute
                                top-[50px]
                                right-[27%]
                                h-[20px]
                                w-px
                                origin-top
                                rotate-[-55deg]
                                bg-modura-secondary/30
                            "
                        />


                        {/* =================================================
                            CENTER WHITE AREA
                        ================================================= */}

                        <div
                            className="
                                absolute
                                top-1/2
                                left-1/2
                                z-10
                                flex
                                h-[72px]
                                w-[150px]
                                -translate-x-1/2
                                -translate-y-1/2
                                items-center
                                justify-center
                                bg-modura-white
                            "
                        >

                            {/* =================================================
                                OUTER DIAMOND
                            ================================================= */}

                            <span
                                className="
                                    absolute
                                    h-[42px]
                                    w-[42px]
                                    rotate-45
                                    border
                                    border-modura-primary
                                "
                            />


                            {/* =================================================
                                INNER DIAMOND
                            ================================================= */}

                            <span
                                className="
                                    absolute
                                    h-[22px]
                                    w-[22px]
                                    rotate-45
                                    border
                                    border-modura-secondary
                                "
                            />


                            {/* =================================================
                                CENTER NODE
                            ================================================= */}

                            <span
                                className="
                                    absolute
                                    h-[8px]
                                    w-[8px]
                                    rounded-full
                                    bg-modura-primary
                                "
                            />


                            {/* =================================================
                                CENTER HORIZONTAL AXIS
                            ================================================= */}

                            <span
                                className="
                                    absolute
                                    left-[20px]
                                    h-px
                                    w-[110px]
                                    bg-modura-primary/25
                                "
                            />

                            <span
                                className="
                                    absolute
                                    left-[20px]
                                    h-[2px]
                                    w-[32px]
                                    bg-modura-secondary
                                "
                            />

                        </div>


                        {/* =================================================
                            TOP CENTER NODE
                        ================================================= */}

                        <span
                            className="
                                absolute
                                top-[10px]
                                left-1/2
                                z-20
                                h-[6px]
                                w-[6px]
                                -translate-x-1/2
                                rounded-full
                                bg-modura-secondary
                            "
                        />


                        {/* =================================================
                            CENTER VERTICAL AXIS
                        ================================================= */}

                        <span
                            className="
                                absolute
                                top-0
                                left-1/2
                                z-0
                                h-[85px]
                                w-px
                                -translate-x-1/2
                                bg-modura-primary/10
                            "
                        />

                    </div>

            </div>
        </section>
    );
};

export default Clients;
