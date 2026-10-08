import Image from 'next/image';
import Link from 'next/link';

import { FiArrowUpRight } from 'react-icons/fi';

import about1 from '@/app/assets/images/about-1.jpg';
import about2 from '@/app/assets/images/about-2.jpg';
import about3 from '@/app/assets/images/about-3.jpg';

const AboutSection = () => {
    return (
        <section className="bg-modura-white relative overflow-hidden py-16 lg:py-20">
            {/* =====================================================
                SMALL TECHNICAL BACKGROUND LINES
            ====================================================== */}

            <span className="bg-modura-gray-200 pointer-events-none absolute top-[13%] left-[7%] hidden h-px w-[90px] lg:block" />

            <span className="bg-modura-gray-200 pointer-events-none absolute top-[13%] left-[7%] hidden h-[90px] w-px lg:block" />

            <span className="bg-modura-gray-200 pointer-events-none absolute top-[18%] right-[8%] hidden h-px w-[70px] lg:block" />

            {/* =====================================================
                MAIN CONTAINER
            ====================================================== */}

            <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-8 xl:px-10 2xl:px-12">
                <div className="grid items-center gap-14 lg:grid-cols-[1.03fr_0.97fr] lg:gap-16 xl:gap-20">
                    {/* =================================================
                        LEFT SIDE — IMAGE COMPOSITION
                    ================================================== */}

                    <div className="relative mx-auto h-[430px] w-full max-w-[650px] sm:h-[490px] lg:mx-0 lg:h-[500px] xl:h-[530px]">
                        {/* =============================================
                            SUBTLE TECHNICAL GRID
                        ============================================== */}

                        <div className="pointer-events-none absolute bottom-[2%] left-[2%] h-[72%] w-[82%] opacity-70">
                            <span className="bg-modura-gray-200 absolute bottom-0 left-0 h-full w-px" />

                            <span className="bg-modura-gray-200 absolute bottom-0 left-[33%] h-full w-px" />

                            <span className="bg-modura-gray-200 absolute bottom-0 left-[66%] h-full w-px" />

                            <span className="bg-modura-gray-200 absolute bottom-0 left-0 h-px w-full" />

                            <span className="bg-modura-gray-200 absolute bottom-[33%] left-0 h-px w-full" />

                            <span className="bg-modura-gray-200 absolute bottom-[66%] left-0 h-px w-full" />
                        </div>

                        {/* =============================================
                            IMAGE 1
                            MAIN / LEFT IMAGE
                        ============================================== */}

                        <div className="group/about-one border-modura-white absolute top-[5%] left-[10%] z-20 h-[82%] w-[43%] overflow-hidden border-[4px] shadow-xl">
                            <Image
                                src={about1}
                                alt="Modern architecture project by Modura Design Group"
                                fill
                                sizes="(max-width: 1024px) 45vw, 320px"
                                className="object-cover transition-transform duration-700 group-hover/about-one:scale-[1.04]"
                            />

                            <div className="from-modura-primary/10 pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent" />
                        </div>

                        {/* =============================================
                            IMAGE 2
                            TOP CENTER IMAGE
                        ============================================== */}

                        <div className="group/about-two border-modura-white absolute top-[11%] left-[51%] z-30 h-[38%] w-[29%] overflow-hidden border-[4px] shadow-lg">
                            <Image
                                src={about2}
                                alt="Architectural landscape and exterior design"
                                fill
                                sizes="(max-width: 1024px) 30vw, 220px"
                                className="object-cover transition-transform duration-700 group-hover/about-two:scale-[1.05]"
                            />
                        </div>

                        {/* =============================================
                            IMAGE 3
                            BOTTOM RIGHT IMAGE
                        ============================================== */}

                        <div className="group/about-three border-modura-white absolute bottom-[5%] left-[48%] z-40 h-[47%] w-[45%] overflow-hidden border-[4px] shadow-xl">
                            <Image
                                src={about3}
                                alt="Modern commercial building and engineering project"
                                fill
                                sizes="(max-width: 1024px) 45vw, 340px"
                                className="object-cover transition-transform duration-700 group-hover/about-three:scale-[1.04]"
                            />

                            <div className="from-modura-primary/10 pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent" />
                        </div>

                        {/* =============================================
                            ACCENT BLOCK
                        ============================================== */}

                        <span className="bg-modura-secondary absolute top-[14%] left-[7%] z-10 h-[100px] w-[7px]" />

                        {/* =============================================
                            TECHNICAL CORNER
                        ============================================== */}

                        <div className="pointer-events-none absolute right-[3%] bottom-[2%] z-50 hidden h-[85px] w-[85px] lg:block">
                            <span className="bg-modura-secondary absolute right-0 bottom-0 h-full w-px" />

                            <span className="bg-modura-secondary absolute right-0 bottom-0 h-px w-full" />

                            <span className="border-modura-gray-300 absolute right-[14px] bottom-[14px] h-[45px] w-[45px] border-t border-l" />
                        </div>
                    </div>

                    {/* =================================================
                        RIGHT SIDE — CONTENT
                    ================================================== */}

                    <div className="relative max-w-[650px]">
                        {/* =============================================
                            SMALL LABEL
                        ============================================== */}

                        <div className="mb-3 flex items-center gap-4">
                            {/* <span
                                className="
                                    h-[2px]
                                    w-[45px]
                                    bg-modura-secondary
                                "
                            /> */}

                            <span className="text-modura-secondary !text-[14px] font-bold tracking-[0.26em] uppercase sm:text-[11px]">
                                About Modura
                            </span>
                        </div>

                        {/* =============================================
                            HEADING
                        ============================================== */}

                        <h2 className="text-modura-primary max-w-[620px] text-[36px] leading-[1.08] font-bold tracking-[-0.035em] sm:text-[42px] lg:text-[46px] xl:text-[45px]">
                            Turning Ideas Into
                            <span className="block">Buildable Solutions</span>
                        </h2>

                        {/* =============================================
                            HEADING LINE
                        ============================================== */}

                        <div className="my-6 flex items-center">
                            <span className="bg-modura-primary h-[3px] w-[44px]" />

                            <span className="bg-modura-gray-300 h-px w-[75px]" />
                        </div>

                        {/* =============================================
                            PARAGRAPH 1
                        ============================================== */}

                        <p className="text-modura-gray-600 max-w-[620px] text-[14px] leading-[1.8] sm:text-[15px] lg:text-[15px]">
                            Modura Design Group provides comprehensive architecture, engineering, BIM and outsourcing
                            solutions designed to support projects from initial concepts through detailed design and
                            construction documentation.
                        </p>

                        {/* =============================================
                            PARAGRAPH 2
                        ============================================== */}

                        <p className="text-modura-gray-600 mt-4 max-w-[620px] text-[14px] leading-[1.8] sm:text-[15px] lg:text-[15px]">
                            We collaborate with architects, engineers, contractors, developers and construction teams to
                            deliver coordinated, accurate and buildable solutions. By combining technical expertise with
                            efficient digital workflows, we help improve coordination, reduce project risks and support
                            smoother project delivery.
                        </p>

                        {/* =================================================
                            CTA
                            SAME DESIGN LANGUAGE AS HEADER + HERO
                        ================================================== */}

                        <div className="mt-7">
                            <Link
                                href="/company#about-us"
                                className="group/about-btn border-modura-primary bg-modura-white text-modura-primary relative inline-flex h-[54px] items-center overflow-hidden border pr-[64px] pl-5"
                            >
                                {/* HOVER BACKGROUND */}

                                <span className="bg-modura-primary absolute inset-y-0 left-0 w-0 transition-all duration-500 group-hover/about-btn:w-full" />

                                {/* TOP LINE */}

                                <span className="bg-modura-secondary absolute top-0 left-0 z-10 h-[3px] w-8 transition-all duration-500 group-hover/about-btn:w-full" />

                                {/* PLUS MARK */}

                                <span className="relative z-10 mr-3 flex h-[10px] w-[10px] items-center justify-center">
                                    <span className="bg-modura-secondary group-hover/about-btn:bg-modura-white absolute h-full w-px transition-colors duration-300" />

                                    <span className="bg-modura-secondary group-hover/about-btn:bg-modura-white absolute h-px w-full transition-colors duration-300" />
                                </span>

                                {/* TEXT */}

                                <span className="group-hover/about-btn:text-modura-white relative z-10 text-[11px] font-bold tracking-[0.08em] whitespace-nowrap uppercase transition-colors duration-300">
                                    Know More
                                </span>

                                {/* ARROW BOX */}

                                <span className="bg-modura-primary text-modura-white group-hover/about-btn:bg-modura-secondary absolute top-0 right-0 z-10 flex h-full w-[50px] items-center justify-center transition-colors duration-300">
                                    <FiArrowUpRight className="text-[18px] transition-transform duration-300 group-hover/about-btn:rotate-45" />
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
