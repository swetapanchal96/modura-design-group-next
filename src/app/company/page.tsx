"use client"

import Image from 'next/image';
import Link from 'next/link';

import { FiArrowUpRight, FiBox, FiLayers, FiPenTool, FiEye, FiTarget, FiMinus, FiPlus, FiX, FiCalendar } from 'react-icons/fi';
import gsap from 'gsap';
import about1 from '@/app/assets/images/about-1.jpg';
import about2 from '@/app/assets/images/about-2.jpg';
import about3 from '@/app/assets/images/about-3.jpg';
import blog1 from '@/app/assets/images/about-1.jpg';
import blog3 from '@/app/assets/images/about-3.jpg';
import Breadcrumb from '../components/Breadcrumb';
import breadcrumb from '@/app/assets/images/breadcrumb.jpg';
import raviPatel from '@/app/assets/images/client-4.jpg';
import pankajbhai from '@/app/assets/images/client-3.jpg';
import bimImage from '@/app/assets/images/client-5.jpg';
import architectImage from '@/app/assets/images/client-6.jpg';
import qualityImage from '@/app/assets/images/qualityImage.jpg'

import certificate1 from '@/app/assets/images/quality.jpg';
import certificate2 from '@/app/assets/images/Environmental.jpg';
import certificate3 from '@/app/assets/images/Safety .jpg';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FaCheckCircle, FaHandshake, FaLaptopCode, FaLayerGroup, FaLightbulb, FaUsers, FaCogs, FaGem, FaChartLine } from 'react-icons/fa';

const faqs = [
    {
        question: 'What services does Modura provide?',
        answer:
            'We provide integrated architecture, engineering, BIM and outsourcing solutions, including design development, construction documentation, coordination, and digital delivery support.',
    },
    {
        question: 'Which industries do you work with?',
        answer:
            'We work across architecture, infrastructure, oil and gas, steel and metal, water treatment, transportation and other construction-related industries.',
    },
    {
        question: 'How does the project process work?',
        answer:
            'Our process begins with understanding the project requirements and continues through planning, design, coordination, documentation and technical delivery.',
    },
    {
        question: 'Do you offer customized solutions?',
        answer:
            'Yes. Our solutions are tailored around the project scope, technical requirements, workflow and delivery objectives of each client.',
    },
    {
        question: 'How can we get started?',
        answer:
            'You can contact our team with your project requirements. We will review your needs and discuss the appropriate services and next steps.',
    },
    {
        question: 'Can Modura support ongoing projects?',
        answer:
            'Yes. We can support ongoing projects with architecture, engineering, BIM, drafting, coordination and construction documentation requirements.',
    },
    {
        question: 'What project information should we provide?',
        answer:
            'Project drawings, scope, requirements, timelines and available reference documents can help us understand the project and provide the right support.',
    },
];

const companyBlogs = [
    {
        title: 'How BIM Is Transforming Modern Construction',
        date: 'June 24, 2026',
        image: blog1,
        desc: 'Building Information Modeling (BIM) is revolutionizing the construction industry by improving project coordination, reducing errors.',
        slug: 'how-bim-is-transforming-modern-construction',
    },
    {
        title: 'Future Trends In Architectural Design',
        date: 'May 18, 2026',
        image: blog3,
        desc: 'Modern architectural design is evolving with sustainable materials, advanced technologies, and innovative planning approaches.',
        slug: 'future-trends-in-architectural-design',
    },
    {
        title: 'Key Trends In Structural Engineering',
        date: 'April 12, 2026',
        image: blog1,
        desc: 'Structural engineering is moving towards smarter solutions with advanced analysis tools, sustainable practices, and improved construction techniques.',
        slug: 'key-trends-in-structural-engineering',
    },
];

export default function CompanyPage() {
    const [activeFaq, setActiveFaq] = useState(0);
    const [selectedMember, setSelectedMember] = useState<any>(null);
    const blogSectionRef = useRef<HTMLElement | null>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            gsap.from('.company-blog-heading', {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',

                scrollTrigger: {
                    trigger: blogSectionRef.current,
                    start: 'top 80%',
                    once: true,
                },
            });


            gsap.from('.company-blog-card', {
                y: 70,
                opacity: 0,
                duration: 0.8,
                stagger: 0.18,
                ease: 'power3.out',

                scrollTrigger: {
                    trigger: blogSectionRef.current,
                    start: 'top 75%',
                    once: true,
                },
            });

        }, blogSectionRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setSelectedMember(null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow = selectedMember ? 'hidden' : '';

        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedMember]);

    return (
        <>
            {/* =================================================
                BREADCRUMB
            ================================================= */}

            <Breadcrumb
                title="Company"
                image={breadcrumb.src}
            />

            <section className="bg-modura-white relative overflow-hidden py-12 lg:py-14" id="about-us">
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
                                    CREATIVE CAPABILITY STRIP
                                ================================================= */}

                            <div
                                className="
                                mt-8
                                border-t
                                border-modura-gray-200
                                pt-6
                            "
                            >
                                <div
                                    className="
                                    grid
                                    grid-cols-1
                                    sm:grid-cols-3
                                "
                                >
                                    {/* ARCHITECTURE */}

                                    <div
                                        className="
                                        group
                                        relative
                                        border-b
                                        border-modura-gray-200
                                        pb-5
                                        sm:border-r
                                        sm:border-b-0
                                        sm:pr-6
                                    "
                                    >
                                        <div
                                            className="
                                            mb-4
                                            flex
                                            items-center
                                            gap-3
                                        "
                                        >
                                            <span
                                                className="
                                                flex
                                                h-9
                                                w-9
                                                items-center
                                                justify-center
                                                border
                                                border-modura-gray-300
                                                text-modura-secondary
                                                transition-all
                                                duration-300
                                                group-hover:border-modura-primary
                                                group-hover:bg-modura-primary
                                                group-hover:text-modura-white
                                            "
                                            >
                                                <FiPenTool size={16} />
                                            </span>


                                        </div>

                                        <h3
                                            className="
                                            text-[15px]
                                            font-bold
                                            tracking-[0.03em]
                                            text-modura-primary
                                        "
                                        >
                                            Architecture
                                        </h3>

                                        <p
                                            className="
                                            mt-1.5
                                            text-[12px]
                                            leading-5
                                            text-modura-gray-500
                                        "
                                        >
                                            Design-led planning and documentation
                                        </p>
                                    </div>


                                    {/* ENGINEERING */}

                                    <div
                                        className="
                                        group
                                        relative
                                        border-b
                                        border-modura-gray-200
                                        py-5
                                        sm:border-r
                                        sm:border-b-0
                                        sm:px-6
                                        sm:py-0
                                    "
                                    >
                                        <div
                                            className="
                                            mb-4
                                            flex
                                            items-center
                                            gap-3
                                        "
                                        >
                                            <span
                                                className="
                                                flex
                                                h-9
                                                w-9
                                                items-center
                                                justify-center
                                                border
                                                border-modura-gray-300
                                                text-modura-secondary
                                                transition-all
                                                duration-300
                                                group-hover:border-modura-primary
                                                group-hover:bg-modura-primary
                                                group-hover:text-modura-white
                                            "
                                            >
                                                <FiLayers size={16} />
                                            </span>


                                        </div>

                                        <h3
                                            className="
                                            text-[15px]
                                            font-bold
                                            tracking-[0.03em]
                                            text-modura-primary
                                        "
                                        >
                                            Engineering
                                        </h3>

                                        <p
                                            className="
                                            mt-1.5
                                            text-[12px]
                                            leading-5
                                            text-modura-gray-500
                                        "
                                        >
                                            Accurate and coordinated solutions
                                        </p>
                                    </div>


                                    {/* BIM */}

                                    <div
                                        className="
                                        group
                                        relative
                                        pt-5
                                        sm:pl-6
                                        sm:pt-0
                                    "
                                    >
                                        <div
                                            className="
                                            mb-4
                                            flex
                                            items-center
                                            gap-3
                                        "
                                        >
                                            <span
                                                className="
                                                flex
                                                h-9
                                                w-9
                                                items-center
                                                justify-center
                                                border
                                                border-modura-gray-300
                                                text-modura-secondary
                                                transition-all
                                                duration-300
                                                group-hover:border-modura-primary
                                                group-hover:bg-modura-primary
                                                group-hover:text-modura-white
                                            "
                                            >
                                                <FiBox size={16} />
                                            </span>


                                        </div>

                                        <h3
                                            className="
                                            text-[15px]
                                            font-bold
                                            tracking-[0.03em]
                                            text-modura-primary
                                        "
                                        >
                                            BIM & Digital
                                        </h3>

                                        <p
                                            className="
                                            mt-1.5
                                            text-[12px]
                                            leading-5
                                            text-modura-gray-500
                                        "
                                        >
                                            Connected workflows for better delivery
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =================================================
                VISION & MISSION
            ================================================= */}

            <section
                className="
                        relative
                        overflow-hidden
                        bg-modura-off-white
                        py-12
                        md:py-14
                       
                    "
            >
                {/* =================================================
                        BACKGROUND TECHNICAL LINE
                    ================================================= */}


                <span
                    className="
                            pointer-events-none
                            absolute
                            top-[12%]
                            right-[5%]
                            h-px
                            w-[120px]
                            bg-modura-gray-200
                        "
                />

                <div
                    className="
                            relative
                            z-10
                            mx-auto
                            max-w-[1300px]
                            px-5
                            md:px-8
                        "
                >

                    {/* =================================================
                            HEADER
                        ================================================= */}

                    <div
                        className="
                                mb-5
                                grid
                                gap-6
                                lg:mb-7
                                lg:grid-cols-[1fr_0.72fr]
                                lg:items-end
                                lg:gap-16
                            "
                    >

                        <div>
                            {/* EYEBROW */}

                            <div
                                className="
                                        mb-2
                                        flex
                                        items-center
                                        gap-3
                                    "
                            >


                                <span
                                    className="
                                            text-[13px]
                                            font-bold
                                            tracking-[0.32em]
                                            text-modura-secondary
                                            uppercase
                                        "
                                >
                                    OUR GUIDING PRINCIPLES
                                </span>
                            </div>

                            {/* HEADING */}

                            <h2
                                className="
                                        text-[38px]
                                        leading-none
                                        font-bold
                                        tracking-[-0.04em]
                                        text-modura-primary

                                        md:text-[48px]

                                        lg:text-[56px]
                                    "
                            >
                                Vision
                                <span
                                    className="
                                            text-modura-secondary
                                        "
                                >
                                    {' '}
                                    &amp; Mission
                                </span>
                            </h2>
                        </div>


                        {/* HEADER DESCRIPTION */}

                        <p
                            className="
                                    max-w-130
                                    text-[14px]
                                    leading-[1.8]
                                    text-modura-gray-600

                                    md:text-[15px]
                                "
                        >
                            Guided by a clear vision and a strong mission, we
                            continue to create value through innovative design,
                            technical excellence and a commitment to a better
                            built environment.
                        </p>

                    </div>


                    {/* =================================================
                            VISION + MISSION
                        ================================================= */}

                    <div
                        className="
                                grid
                                grid-cols-1
                                gap-6

                                lg:grid-cols-2
                            "
                    >

                        {/* =================================================
                                VISION CARD
                            ================================================= */}

                        <div
                            className="
                                    group
                                    relative
                                    min-h-[400px]
                                    overflow-hidden
                                    rounded-[10px]
                                    border
                                    border-modura-gray-300
                                    bg-modura-white
                                "
                        >

                            {/* =================================================
                                    ARCHITECTURAL BACKGROUND — RIGHT
                                ================================================= */}

                            <div
                                className="
                                        pointer-events-none
                                        absolute
                                        top-0
                                        right-0
                                        h-full
                                        w-[43%]
                                        overflow-hidden
                                    "
                            >

                                {/* LIGHT BLUE / GREY PANEL */}

                                <div
                                    className="
                                            absolute
                                            top-0
                                            right-0
                                            h-[62%]
                                            w-[68%]
                                            bg-modura-gray-100
                                        "
                                />

                                {/* DIAGONAL ARCHITECTURAL PANEL */}

                                <div
                                    className="
                                            absolute
                                            top-0
                                            right-[20%]
                                            h-[78%]
                                            w-[42%]
                                            border-l
                                            border-modura-gray-300
                                            bg-modura-light/50
                                            [clip-path:polygon(0_0,100%_0,100%_100%,0_72%)]
                                        "
                                />

                                {/* LARGE BUILDING BLOCK */}

                                <div
                                    className="
                                            absolute
                                            top-[8%]
                                            right-[-5%]
                                            h-[63%]
                                            w-[37%]
                                            border-l
                                            border-modura-gray-300
                                            bg-modura-gray-200/70
                                            [clip-path:polygon(0_17%,100%_0,100%_100%,0_82%)]
                                        "
                                />

                                {/* NAVY BUILDING */}

                                <div
                                    className="
                                            absolute
                                            right-0
                                            bottom-0
                                            h-[72%]
                                            w-[22%]
                                            bg-modura-primary
                                            [clip-path:polygon(28%_0,100%_0,100%_100%,0_100%,0_16%)]
                                        "
                                />

                                {/* SECOND NAVY PANEL */}

                                <div
                                    className="
                                            absolute
                                            right-[22%]
                                            bottom-0
                                            h-[48%]
                                            w-[17%]
                                            border-l
                                            border-modura-primary
                                            bg-modura-primary/10
                                        "
                                />

                                {/* VERTICAL TECHNICAL LINE */}

                                <span
                                    className="
                                            absolute
                                            top-0
                                            right-[22%]
                                            h-full
                                            w-px
                                            bg-modura-gray-300
                                        "
                                />

                                {/* SECOND VERTICAL LINE */}

                                <span
                                    className="
                                            absolute
                                            top-[12%]
                                            right-[42%]
                                            h-[68%]
                                            w-px
                                            bg-modura-gray-300
                                        "
                                />

                                {/* HORIZONTAL LINE */}

                                <span
                                    className="
                                            absolute
                                            top-[47%]
                                            right-0
                                            h-px
                                            w-[72%]
                                            bg-modura-gray-300
                                        "
                                />

                                {/* DIAGONAL TECHNICAL LINE */}

                                <span
                                    className="
                                            absolute
                                            top-[18%]
                                            right-[3%]
                                            h-px
                                            w-[115%]
                                            origin-right
                                            rotate-[38deg]
                                            bg-modura-gray-300
                                        "
                                />

                                {/* BOTTOM DIAGONAL */}

                                <span
                                    className="
                                            absolute
                                            bottom-[20%]
                                            right-[-5%]
                                            h-px
                                            w-[85%]
                                            origin-right
                                            rotate-[-35deg]
                                            bg-modura-gray-300
                                        "
                                />

                                {/* SMALL FRAME */}

                                <div
                                    className="
                                            absolute
                                            top-[16%]
                                            right-[18%]
                                            h-[105px]
                                            w-[90px]
                                            border
                                            border-modura-gray-300
                                        "
                                />

                                {/* INNER FRAME */}

                                <div
                                    className="
                                            absolute
                                            top-[22%]
                                            right-[23%]
                                            h-[65px]
                                            w-[55px]
                                            border
                                            border-modura-gray-300
                                        "
                                />

                            </div>


                            {/* =================================================
                                    CONTENT
                                ================================================= */}

                            <div
                                className="
                                        relative
                                        z-10
                                        w-[72%]
                                        p-7

                                        md:p-9

                                        lg:p-10
                                    "
                            >

                                {/* ICON */}

                                <div
                                    className="
                                            flex
                                            h-[60px]
                                            w-[60px]
                                            items-center
                                            justify-center
                                            rounded-[14px]
                                            bg-modura-light
                                            text-modura-primary
                                            transition-all
                                            duration-500

                                            group-hover:bg-modura-primary
                                            group-hover:text-modura-white
                                        "
                                >
                                    <FiEye
                                        size={28}
                                        strokeWidth={1.7}
                                    />
                                </div>


                                {/* LABEL */}

                                <div
                                    className="
                                            mt-7
                                            flex
                                            items-center
                                            gap-3
                                        "
                                >
                                    <span
                                        className="
                                                h-[3px]
                                                w-12
                                                bg-modura-primary
                                            "
                                    />

                                    <span
                                        className="
                                                text-[10px]
                                                font-bold
                                                tracking-[0.32em]
                                                text-modura-secondary
                                                uppercase
                                            "
                                    >
                                        OUR VISION
                                    </span>
                                </div>


                                {/* TITLE */}

                                <h3
                                    className="
                                            mt-4
                                            max-w-[500px]
                                            text-[30px]
                                            leading-[1.08]
                                            font-bold
                                            tracking-[-0.035em]
                                            text-modura-primary

                                            md:text-[36px]
                                        "
                                >
                                    Building better ideas
                                    <span
                                        className="
                                                block
                                                text-modura-secondary
                                            "
                                    >
                                        into better spaces.
                                    </span>
                                </h3>


                                {/* DIVIDER */}

                                <div
                                    className="
                                            my-6
                                            flex
                                            items-center
                                        "
                                >
                                    <span
                                        className="
                                                h-[3px]
                                                w-12
                                                bg-modura-primary
                                            "
                                    />

                                    <span
                                        className="
                                                h-px
                                                w-16
                                                bg-modura-gray-300
                                            "
                                    />
                                </div>


                                {/* DESCRIPTION */}

                                <p
                                    className="
                                            max-w-[520px]
                                            text-[14px]
                                            leading-[1.45]
                                            text-modura-gray-600

                                            md:text-[16px]
                                        "
                                >
                                    To be a globally trusted design and engineering
                                    partner, known for innovation, precision and a
                                    commitment to creating sustainable, buildable
                                    spaces that positively impact communities.
                                </p>

                            </div>


                            {/* BOTTOM ACCENT */}

                            <span
                                className="
                                        absolute
                                        bottom-0
                                        left-0
                                        z-20
                                        h-[3px]
                                        w-20
                                        bg-modura-secondary
                                        transition-all
                                        duration-500
                                        group-hover:w-32
                                    "
                            />

                        </div>


                        {/* =================================================
                                MISSION CARD
                            ================================================= */}

                        <div
                            className="
                                    group
                                    relative
                                    min-h-[400px]
                                    overflow-hidden
                                    rounded-[10px]
                                    border
                                    border-modura-gray-300
                                    bg-modura-white
                                "
                        >

                            {/* =================================================
                                    ARCHITECTURAL BACKGROUND — RIGHT
                                ================================================= */}

                            <div
                                className="
                                        pointer-events-none
                                        absolute
                                        top-0
                                        right-0
                                        h-full
                                        w-[43%]
                                        overflow-hidden
                                    "
                            >

                                {/* LIGHT PANEL */}

                                <div
                                    className="
                                            absolute
                                            top-0
                                            right-0
                                            h-full
                                            w-[70%]
                                            bg-modura-gray-100
                                        "
                                />

                                {/* LARGE LIGHT BUILDING */}

                                <div
                                    className="
                                            absolute
                                            top-[5%]
                                            right-[13%]
                                            h-[72%]
                                            w-[43%]
                                            border-l
                                            border-modura-gray-300
                                            bg-modura-light/60
                                            [clip-path:polygon(0_18%,100%_0,100%_100%,0_80%)]
                                        "
                                />

                                {/* NAVY ARCHITECTURAL BUILDING */}

                                <div
                                    className="
                                            absolute
                                            top-[10%]
                                            right-[-4%]
                                            h-[88%]
                                            w-[28%]
                                            bg-modura-primary
                                            [clip-path:polygon(35%_0,100%_12%,100%_100%,0_100%,0_13%)]
                                        "
                                />

                                {/* SECOND LIGHT STRUCTURE */}

                                <div
                                    className="
                                            absolute
                                            bottom-0
                                            right-[27%]
                                            h-[48%]
                                            w-[23%]
                                            border-l
                                            border-modura-gray-300
                                            bg-modura-white/60
                                        "
                                />

                                {/* VERTICAL TECHNICAL LINES */}

                                <span
                                    className="
                                            absolute
                                            top-0
                                            right-[28%]
                                            h-full
                                            w-px
                                            bg-modura-gray-300
                                        "
                                />

                                <span
                                    className="
                                            absolute
                                            top-0
                                            right-[48%]
                                            h-[72%]
                                            w-px
                                            bg-modura-gray-300
                                        "
                                />

                                {/* HORIZONTAL LINES */}

                                <span
                                    className="
                                            absolute
                                            top-[43%]
                                            right-0
                                            h-px
                                            w-full
                                            bg-modura-gray-300
                                        "
                                />

                                <span
                                    className="
                                            absolute
                                            bottom-[22%]
                                            right-0
                                            h-px
                                            w-[75%]
                                            bg-modura-gray-300
                                        "
                                />

                                {/* DIAGONAL LINE */}

                                <span
                                    className="
                                            absolute
                                            top-[10%]
                                            right-[-10%]
                                            h-px
                                            w-[115%]
                                            origin-right
                                            rotate-[40deg]
                                            bg-modura-gray-300
                                        "
                                />

                                {/* SECOND DIAGONAL */}

                                <span
                                    className="
                                            absolute
                                            bottom-[20%]
                                            right-[-10%]
                                            h-px
                                            w-[100%]
                                            origin-right
                                            rotate-[-36deg]
                                            bg-modura-gray-300
                                        "
                                />

                                {/* LARGE FRAME */}

                                <div
                                    className="
                                            absolute
                                            top-[12%]
                                            right-[30%]
                                            h-[145px]
                                            w-[125px]
                                            border
                                            border-modura-gray-300
                                        "
                                />

                                {/* INNER FRAME */}

                                <div
                                    className="
                                            absolute
                                            top-[27%]
                                            right-[36%]
                                            h-[75px]
                                            w-[65px]
                                            border
                                            border-modura-gray-300
                                        "
                                />

                            </div>


                            {/* =================================================
                                    CONTENT
                                ================================================= */}

                            <div
                                className="
                                        relative
                                        z-10
                                        w-[72%]
                                        p-7

                                        md:p-9

                                        lg:p-10
                                    "
                            >

                                {/* ICON */}

                                <div
                                    className="
                                            flex
                                            h-[60px]
                                            w-[60px]
                                            items-center
                                            justify-center
                                            rounded-[14px]
                                            bg-modura-light
                                            text-modura-primary
                                            transition-all
                                            duration-500

                                            group-hover:bg-modura-primary
                                            group-hover:text-modura-white
                                        "
                                >
                                    <FiTarget
                                        size={28}
                                        strokeWidth={1.7}
                                    />
                                </div>


                                {/* LABEL */}

                                <div
                                    className="
                                            mt-7
                                            flex
                                            items-center
                                            gap-3
                                        "
                                >
                                    <span
                                        className="
                                                h-[3px]
                                                w-12
                                                bg-modura-primary
                                            "
                                    />

                                    <span
                                        className="
                                                text-[10px]
                                                font-bold
                                                tracking-[0.32em]
                                                text-modura-secondary
                                                uppercase
                                            "
                                    >
                                        OUR MISSION
                                    </span>
                                </div>


                                {/* TITLE */}

                                <h3
                                    className="
                                            mt-4
                                            min-w-[520px]
                                            text-[30px]
                                            leading-[1.08]
                                            font-bold
                                            tracking-[-0.035em]
                                            text-modura-primary
                                            md:text-[36px]
                                        "
                                >
                                    Designing with precision.
                                    <span
                                        className="
                                                block
                                                text-modura-secondary
                                            "
                                    >
                                        Delivering with purpose.
                                    </span>
                                </h3>


                                {/* DIVIDER */}

                                <div
                                    className="
                                            my-6
                                            flex
                                            items-center
                                        "
                                >
                                    <span
                                        className="
                                                h-[3px]
                                                w-12
                                                bg-modura-primary
                                            "
                                    />

                                    <span
                                        className="
                                                h-px
                                                w-16
                                                bg-modura-gray-300
                                            "
                                    />
                                </div>


                                {/* DESCRIPTION */}

                                <p
                                    className="
                                            max-w-[520px]
                                            text-[14px]
                                            leading-[1.45]
                                            text-modura-gray-600

                                            md:text-[16px]
                                        "
                                >
                                    To provide integrated architecture, engineering,
                                    BIM and outsourcing solutions through collaboration,
                                    technology and technical excellence, helping our
                                    clients turn ideas into successful, real-world
                                    outcomes.
                                </p>

                            </div>


                            {/* BOTTOM ACCENT */}

                            <span
                                className="
                                        absolute
                                        right-0
                                        bottom-0
                                        z-20
                                        h-[3px]
                                        w-20
                                        bg-modura-secondary
                                        transition-all
                                        duration-500
                                        group-hover:w-32
                                    "
                            />

                        </div>

                    </div>
                </div>
            </section>

            {/* =================================================
                WHY MODURA
            ================================================= */}

            <section
                id="why-us"
                className="
                    relative
                    overflow-hidden
                    bg-modura-white
                    py-12
                    md:py-14
                "
            >
                <div
                    className="
                        mx-auto
                        max-w-[1300px]
                        px-5
                        md:px-8
                        xl:px-10
                    "
                >

                    {/* =================================================
                        HEADER
                    ================================================= */}

                    <div
                        className="
                            grid
                            items-start
                            gap-8
                            lg:grid-cols-[1fr_0.85fr]
                            lg:gap-20
                        "
                    >

                        {/* LEFT */}

                        <div>

                            <div
                                className="
                                    mb-2
                                    flex
                                    items-center
                                    gap-3
                                "
                            >
                                

                                <span
                                    className="
                                        text-[16px]
                                        font-bold
                                        tracking-[0.35em]
                                        text-modura-secondary
                                        uppercase
                                    "
                                >
                                    WHY US
                                </span>
                            </div>


                            <h2
                                className="
                                    max-w-[620px]
                                    text-[42px]
                                    leading-[0.98]
                                    font-bold
                                    tracking-[-0.045em]
                                    text-modura-primary
                                    uppercase

                                    sm:text-[48px]
                                    md:text-[56px]
                                    lg:text-[62px]
                                "
                            >
                                Why Choose
                                <span
                                    className="
                                        block
                                        text-modura-secondary
                                    "
                                >
                                    Modura?
                                </span>
                            </h2>

                        </div>


                        {/* RIGHT */}

                        <div
                            className="
                                relative
                                max-w-[560px]
                                border-l-[2px]
                                border-modura-secondary
                                pl-6
                                lg:mt-5
                                lg:pl-8
                            "
                        >

                            <p
                                className="
                                    text-[15px]
                                    leading-[1.8]
                                    text-modura-gray-600

                                    md:text-[16px]
                                "
                            >
                                We bring together design thinking, engineering
                                expertise and digital workflows to deliver solutions
                                that are efficient, coordinated and built for
                                long-term success.
                            </p>

                        </div>

                    </div>


                    {/* =================================================
                        WHY US POINTS
                    ================================================= */}

                    <div
                        className="
                            mt-8
                            max-h-[520px]
                            overflow-y-auto
                            pr-1

                            md:mt-14
                            lg:mt-10

                            [&::-webkit-scrollbar]:w-[3px]
                            [&::-webkit-scrollbar-track]:bg-modura-gray-100
                            [&::-webkit-scrollbar-thumb]:bg-modura-secondary
                        "
                    >

                        {/* =================================================
                            ITEM 1
                        ================================================= */}

                        <div
                            className="
                                group
                                grid
                                items-center
                                gap-6
                                border-t
                                border-modura-gray-200
                                py-7

                                md:grid-cols-[90px_0.9fr_1.4fr]
                                md:gap-8
                                md:py-8
                            "
                        >

                            {/* ICON */}

                            <div
                                className="
                                    flex
                                    h-14
                                    w-14
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-modura-primary
                                    text-modura-white
                                    transition-all
                                    duration-300
                                    group-hover:bg-modura-secondary
                                "
                            >
                                <FaUsers size={25} strokeWidth={1.7} />
                            </div>


                            {/* TITLE */}

                            <h3
                                className="
                                    text-[24px]
                                    leading-tight
                                    font-bold
                                    tracking-[-0.025em]
                                    text-modura-primary
                                    uppercase

                                    md:text-[28px]
                                    lg:text-[30px]
                                "
                            >
                                Collaborative Team
                            </h3>


                            {/* DESCRIPTION */}

                            <p
                                className="
                                    max-w-[560px]
                                    text-[14px]
                                    leading-7
                                    text-modura-gray-600

                                    md:text-[15px]
                                "
                            >
                                A dedicated team that works closely with your
                                project requirements, ensuring clear communication
                                and shared objectives.
                            </p>

                        </div>


                        {/* =================================================
                            ITEM 2
                        ================================================= */}

                        <div
                            className="
                                group
                                grid
                                items-center
                                gap-6
                                border-t
                                border-modura-gray-200
                                py-7

                                md:grid-cols-[90px_0.9fr_1.4fr]
                                md:gap-8
                                md:py-8
                            "
                        >

                            <div
                                className="
                                    flex
                                    h-14
                                    w-14
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-modura-primary
                                    text-modura-white
                                    transition-all
                                    duration-300
                                    group-hover:bg-modura-secondary
                                "
                            >
                                <FaLightbulb size={25} strokeWidth={1.7} />
                            </div>


                            <h3
                                className="
                                    text-[24px]
                                    leading-tight
                                    font-bold
                                    tracking-[-0.025em]
                                    text-modura-primary
                                    uppercase

                                    md:text-[28px]
                                    lg:text-[30px]
                                "
                            >
                                Innovative Solutions
                            </h3>


                            <p
                                className="
                                    max-w-[560px]
                                    text-[14px]
                                    leading-7
                                    text-modura-gray-600

                                    md:text-[15px]
                                "
                            >
                                Practical and thoughtful approaches developed
                                around the specific needs, challenges and goals
                                of every project.
                            </p>

                        </div>


                        {/* =================================================
                            ITEM 3
                        ================================================= */}

                        <div
                            className="
                                group
                                grid
                                items-center
                                gap-6
                                border-t
                                border-modura-gray-200
                                py-7

                                md:grid-cols-[90px_0.9fr_1.4fr]
                                md:gap-8
                                md:py-8
                            "
                        >

                            <div
                                className="
                                    flex
                                    h-14
                                    w-14
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-modura-primary
                                    text-modura-white
                                    transition-all
                                    duration-300
                                    group-hover:bg-modura-secondary
                                "
                            >
                                <FaLaptopCode size={25} strokeWidth={1.7} />
                            </div>


                            <h3
                                className="
                                    text-[24px]
                                    leading-tight
                                    font-bold
                                    tracking-[-0.025em]
                                    text-modura-primary
                                    uppercase

                                    md:text-[28px]
                                    lg:text-[30px]
                                "
                            >
                                Technology Driven
                            </h3>


                            <p
                                className="
                                    max-w-[560px]
                                    text-[14px]
                                    leading-7
                                    text-modura-gray-600

                                    md:text-[15px]
                                "
                            >
                                Modern tools, BIM-based processes and digital
                                workflows help us maintain accuracy, coordination
                                and efficiency throughout delivery.
                            </p>

                        </div>


                        {/* =================================================
                            ITEM 4
                        ================================================= */}

                        <div
                            className="
                                group
                                grid
                                items-center
                                gap-6
                                border-t
                                border-modura-gray-200
                                py-7

                                md:grid-cols-[90px_0.9fr_1.4fr]
                                md:gap-8
                                md:py-8
                            "
                        >

                            <div
                                className="
                                    flex
                                    h-14
                                    w-14
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-modura-primary
                                    text-modura-white
                                    transition-all
                                    duration-300
                                    group-hover:bg-modura-secondary
                                "
                            >
                                <FaLayerGroup size={25} strokeWidth={1.7} />
                            </div>


                            <h3
                                className="
                                    text-[24px]
                                    leading-tight
                                    font-bold
                                    tracking-[-0.025em]
                                    text-modura-primary
                                    uppercase

                                    md:text-[28px]
                                    lg:text-[30px]
                                "
                            >
                                Seamless Coordination
                            </h3>


                            <p
                                className="
                                    max-w-[560px]
                                    text-[14px]
                                    leading-7
                                    text-modura-gray-600

                                    md:text-[15px]
                                "
                            >
                                Architecture, engineering and BIM workflows are
                                coordinated to create consistent information and
                                smoother project execution.
                            </p>

                        </div>


                        {/* =================================================
                            ITEM 5
                        ================================================= */}

                        <div
                            className="
                                group
                                grid
                                items-center
                                gap-6
                                border-t
                                border-modura-gray-200
                                py-7

                                md:grid-cols-[90px_0.9fr_1.4fr]
                                md:gap-8
                                md:py-8
                            "
                        >

                            <div
                                className="
                                    flex
                                    h-14
                                    w-14
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-modura-primary
                                    text-modura-white
                                    transition-all
                                    duration-300
                                    group-hover:bg-modura-secondary
                                "
                            >
                                <FaCheckCircle size={25} strokeWidth={1.7} />
                            </div>


                            <h3
                                className="
                                    text-[24px]
                                    leading-tight
                                    font-bold
                                    tracking-[-0.025em]
                                    text-modura-primary
                                    uppercase

                                    md:text-[28px]
                                    lg:text-[30px]
                                "
                            >
                                Quality Focused
                            </h3>


                            <p
                                className="
                                    max-w-[560px]
                                    text-[14px]
                                    leading-7
                                    text-modura-gray-600

                                    md:text-[15px]
                                "
                            >
                                Every deliverable is developed with attention
                                to detail, technical accuracy and the standards
                                required for dependable results.
                            </p>

                        </div>


                        {/* =================================================
                            ITEM 6
                        ================================================= */}

                        <div
                            className="
                                group
                                grid
                                items-center
                                gap-6
                                border-t
                                border-b
                                border-modura-gray-200
                                py-7

                                md:grid-cols-[90px_0.9fr_1.4fr]
                                md:gap-8
                                md:py-8
                            "
                        >

                            <div
                                className="
                                    flex
                                    h-14
                                    w-14
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-modura-primary
                                    text-modura-white
                                    transition-all
                                    duration-300
                                    group-hover:bg-modura-secondary
                                "
                            >
                                <FaHandshake size={25} strokeWidth={1.7} />
                            </div>


                            <h3
                                className="
                                    text-[24px]
                                    leading-tight
                                    font-bold
                                    tracking-[-0.025em]
                                    text-modura-primary
                                    uppercase

                                    md:text-[28px]
                                    lg:text-[30px]
                                "
                            >
                                Long-Term Partnership
                            </h3>


                            <p
                                className="
                                    max-w-[560px]
                                    text-[14px]
                                    leading-7
                                    text-modura-gray-600

                                    md:text-[15px]
                                "
                            >
                                We work as an extension of your team, building
                                reliable relationships and supporting projects
                                beyond individual deliverables.
                            </p>

                        </div>

                    </div>

                </div>
            </section>

            {/* =================================================
                OUR TEAM
            ================================================= */}

            <section
                id="our-team"
                className="
                    relative
                    overflow-hidden
                    bg-modura-off-white
                    py-12
                    md:py-14
                "
            >
                {/* =================================================
                    TEAM DATA
                    Keep this inside your Company page
                ================================================= */}

                {(() => {
                    const teamMembers = [
                        {
                            id: 1,
                            name: 'Pankajbhai',
                            designation: 'Founder & CEO',
                            group: 'leadership',
                            groupTitle: 'Leadership',
                            image: pankajbhai,
                            description:
                                'Pankajbhai leads Modura Design Group with a focus on technical excellence, innovation and delivering reliable solutions across architecture, engineering and digital construction.',
                        },

                        {
                            id: 2,
                            name: 'Ravi Patel',
                            designation: 'PHP Laravel Developer',
                            group: 'hr',
                            groupTitle: 'Human Resources',
                            image: raviPatel,
                            description:
                                'Ravi contributes to Modura’s digital development initiatives and supports the organisation through reliable technology solutions and efficient digital workflows.',
                        },
                    ];

                    return (
                        <>
                            {/* =================================================
                                HEADER
                            ================================================= */}

                            <div
                                className="
                                    mx-auto
                                    max-w-[1300px]
                                    px-5
                                    md:px-8
                                "
                            >
                                <div
                                    className="
                                        grid
                                        gap-8
                                        lg:grid-cols-[1fr_0.7fr]
                                        lg:items-end
                                    "
                                >
                                    {/* LEFT */}

                                    <div>
                                        <div
                                            className="
                                                mb-3
                                                flex
                                                items-center
                                                gap-3
                                            "
                                        >

                                            <span
                                                className="
                                                    text-[13px]
                                                    font-bold
                                                    tracking-[0.32em]
                                                    text-modura-secondary
                                                    uppercase
                                                "
                                            >
                                               The Modura Team
                                            </span>
                                        </div>

                                        <h2
                                            className="
                                                max-w-[650px]
                                                text-[42px]
                                                leading-[0.95]
                                                font-bold
                                                tracking-[-0.04em]
                                                text-modura-primary
                                                uppercase
                                                md:text-[47px]
                                               
                                            "
                                        >
                                            Expertise That
                                            <span
                                                className="
                                        block
                                        text-modura-secondary
                                    "
                                            >
                                                Moves Projects Forward
                                            </span>
                                        </h2>
                                    </div>

                                    {/* RIGHT */}

                                    <div
                                        className="
                                            border-l
                                            border-modura-secondary
                                            pl-6
                                            lg:pl-7
                                        "
                                    >
                                        <p
                                            className="
                                                max-w-[500px]
                                                text-[14px]
                                                leading-7
                                                text-modura-gray-600
                                                md:text-[15px]
                                            "
                                        >
                                            Our multidisciplinary team brings together architectural,engineering, BIM and project expertise to deliver coordinatedsolutions for complex built environments.
                                        </p>
                                    </div>
                                </div>

                                {/* =================================================
                                    TEAM TITLE
                                ================================================= */}

                                <div
                                    className="
                                        mt-7
                                        
                                        flex
                                        items-center
                                        justify-between
                                        border-modura-gray-300
                                        
                                        md:mt-7
                                    "
                                >
                                   

                                    
                                </div>

                                {/* =================================================
                                        TEAM GROUPS
                                ================================================= */}

                                <div className="space-y-14 md:space-y-10">

                                    {Array.from(
                                        new Map(
                                            teamMembers.map((member) => [
                                                member.group,
                                                {
                                                    group: member.group,
                                                    title: member.groupTitle,
                                                },
                                            ]),
                                        ).values(),
                                    ).map((group) => {

                                        const members = teamMembers.filter(
                                            (member) => member.group === group.group,
                                        );

                                        return (
                                            <div
                                                key={group.group}
                                                className="team-group"
                                            >

                                                {/* =================================================
                                                        GROUP HEADER
                                                ================================================= */}

                                                <div
                                                    className="
                                                        mb-6
                                                        flex
                                                        items-center
                                                        justify-between
                                                        border-b
                                                        border-modura-gray-300
                                                        pb-3
                                                    "
                                                >

                                                    <div className="flex items-center gap-4">

                                                        

                                                        <h4
                                                            className="
                                                                text-[20px]
                                                                font-bold
                                                                tracking-[-0.02em]
                                                                text-modura-primary
                                                                uppercase
                                                                md:text-[24px]
                                                            "
                                                        >
                                                            {group.title}
                                                        </h4>

                                                    </div>

                                                    {/* <span
                                                        className="
                                                            text-[10px]
                                                            font-bold
                                                            tracking-[0.25em]
                                                            text-modura-gray-500
                                                            uppercase
                                                        "
                                                    >
                                                        {String(members.length).padStart(2, '0')} Members
                                                    </span> */}

                                                </div>


                                                {/* =================================================
                                                        SAME GRID FOR EVERY GROUP
                                                ================================================= */}

                                                <div
                                                    className="
                                                        grid
                                                        grid-cols-1
                                                        gap-5
                                                        sm:grid-cols-2
                                                        lg:grid-cols-3
                                                        xl:grid-cols-4
                                                    "
                                                >

                                                    {members.map((member) => (

                                                        <article
                                                            key={member.id}
                                                            className="
                                                                team-card
                                                                group
                                                                relative
                                                                cursor-pointer
                                                                overflow-hidden
                                                                bg-modura-white
                                                            "
                                                            onClick={() =>
                                                                setSelectedMember(member)
                                                            }
                                                            onKeyDown={(event) => {

                                                                if (
                                                                    event.key === 'Enter' ||
                                                                    event.key === ' '
                                                                ) {
                                                                    event.preventDefault();

                                                                    setSelectedMember(member);
                                                                }

                                                            }}
                                                            role="button"
                                                            tabIndex={0}
                                                            aria-label={`View profile of ${member.name}`}
                                                        >

                                                            {/* =================================================
                                                                    IMAGE
                                                            ================================================= */}

                                                            <div
                                                                className="
                                                                    relative
                                                                    aspect-[0.78]
                                                                    overflow-hidden
                                                                    bg-modura-gray-200
                                                                "
                                                            >

                                                                <Image
                                                                    src={member.image}
                                                                    alt={`${member.name} - ${member.designation}`}
                                                                    fill
                                                                    sizes="
                                                                        (max-width: 640px) 100vw,
                                                                        (max-width: 1024px) 50vw,
                                                                        25vw
                                                                    "
                                                                    className="
                                                                        object-cover
                                                                        transition-transform
                                                                        duration-700
                                                                        ease-out
                                                                        group-hover:scale-[1.04]
                                                                    "
                                                                />


                                                                {/* =================================================
                                                                        IMAGE OVERLAY
                                                                ================================================= */}

                                                                <div
                                                                    className="
                                                                        pointer-events-none
                                                                        absolute
                                                                        inset-x-0
                                                                        bottom-0
                                                                        h-[50%]
                                                                        bg-gradient-to-t
                                                                        from-modura-primary
                                                                        via-modura-primary/50
                                                                        to-transparent
                                                                    "
                                                                />


                                                                {/* =================================================
                                                                        TOP CORNER
                                                                ================================================= */}

                                                                <span
                                                                    className="
                                                                        absolute
                                                                        top-0
                                                                        right-0
                                                                        h-16
                                                                        w-16
                                                                        bg-modura-secondary
                                                                        transition-all
                                                                        duration-500
                                                                        group-hover:h-20
                                                                        group-hover:w-20
                                                                    "
                                                                    style={{
                                                                        clipPath:
                                                                            'polygon(100% 0, 100% 100%, 0 0)',
                                                                    }}
                                                                />


                                                                {/* =================================================
                                                                        MEMBER INFORMATION
                                                                ================================================= */}

                                                                <div
                                                                    className="
                                                                        absolute
                                                                        right-0
                                                                        bottom-0
                                                                        left-0
                                                                        z-10
                                                                        p-5
                                                                    "
                                                                >

                                                                    <div
                                                                        className="
                                                                            flex
                                                                            items-end
                                                                            justify-between
                                                                            gap-4
                                                                        "
                                                                    >

                                                                        {/* NAME + DESIGNATION */}

                                                                        <div>

                                                                            <h5
                                                                                className="
                                                                                    text-[19px]
                                                                                    font-bold
                                                                                    tracking-[-0.02em]
                                                                                    text-modura-white
                                                                                    uppercase
                                                                                "
                                                                            >
                                                                                {member.name}
                                                                            </h5>

                                                                            <p
                                                                                className="
                                                                                    mt-1
                                                                                    text-[10px]
                                                                                    font-bold
                                                                                    tracking-[0.15em]
                                                                                    text-modura-secondary
                                                                                    uppercase
                                                                                "
                                                                            >
                                                                                {member.designation}
                                                                            </p>

                                                                        </div>


                                                                        {/* =================================================
                                                                                OPEN BUTTON
                                                                        ================================================= */}

                                                                        <span
                                                                            className="
                                                                                flex
                                                                                h-11
                                                                                w-11
                                                                                shrink-0
                                                                                items-center
                                                                                justify-center
                                                                                bg-modura-white
                                                                                text-modura-primary
                                                                                transition-all
                                                                                duration-300
                                                                                group-hover:bg-modura-secondary
                                                                                group-hover:text-modura-white
                                                                            "
                                                                        >

                                                                            <FiArrowUpRight
                                                                                size={18}
                                                                                className="
                                                                                    transition-transform
                                                                                    duration-300
                                                                                    group-hover:rotate-45
                                                                                "
                                                                            />

                                                                        </span>

                                                                    </div>

                                                                </div>

                                                            </div>

                                                        </article>

                                                    ))}

                                                </div>

                                            </div>
                                        );
                                    })}

                                </div>
                            </div>

                            {/* =================================================
                    TEAM MEMBER POPUP
                ================================================= */}

                            {selectedMember && (
                                <div
                                    className="
                            fixed
                            inset-0
                            z-[9999]
                            flex
                            items-center
                            justify-center
                            bg-modura-primary/80
                            p-5
                            backdrop-blur-[3px]
                            md:p-8
                        "
                                    onClick={() => setSelectedMember(null)}
                                >
                                    <div
                                        className="
                                relative
                                flex
                                min-h-[90vh]
                                w-full
                                max-w-[1050px]
                                flex-col
                                overflow-hidden
                                bg-modura-white
                                shadow-2xl
                                md:flex-row
                            "
                                        onClick={(event) =>
                                            event.stopPropagation()
                                        }
                                    >
                                        {/* CLOSE */}

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setSelectedMember(null)
                                            }
                                            aria-label="Close team member profile"
                                            className="
                                    group
                                    absolute
                                    top-4
                                    right-4
                                    z-30
                                    flex
                                    h-11
                                    w-11
                                    items-center
                                    justify-center
                                    bg-modura-primary
                                    text-modura-white
                                    transition-colors
                                    duration-300
                                    hover:bg-modura-secondary
                                "
                                        >
                                            <FiX
                                                size={20}
                                                className="
                                        transition-transform
                                        duration-300
                                        group-hover:rotate-90
                                    "
                                            />
                                        </button>

                                        {/* POPUP IMAGE */}

                                        <div
                                            className="
                                    relative
                                    h-[320px]
                                    shrink-0
                                    bg-modura-gray-200
                                    md:h-auto
                                    md:w-[42%]
                                "
                                        >
                                            <Image
                                                src={selectedMember.image}
                                                alt={`${selectedMember.name} - ${selectedMember.designation}`}
                                                fill
                                                sizes="
                                        (max-width: 768px) 100vw,
                                        42vw
                                    "
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* POPUP CONTENT */}

                                        <div
                                            className="
                                    flex
                                    min-h-0
                                    flex-1
                                    flex-col
                                    overflow-y-auto
                                    p-7
                                    md:p-10
                                    lg:p-12
                                "
                                        >
                                            {/* LABEL */}

                                            <div
                                                className="
                                        mb-3
                                        flex
                                        items-center
                                        gap-3
                                    "
                                            >
                                                

                                                <span
                                                    className="
                                            text-[13px]
                                            font-bold
                                            tracking-[0.3em]
                                            text-modura-secondary
                                            uppercase
                                        "
                                                >
                                                    Our People
                                                </span>
                                            </div>

                                            {/* NAME */}

                                            <h2
                                                className="
                                        text-[34px]
                                        leading-[1]
                                        font-bold
                                        tracking-[-0.035em]
                                        text-modura-primary
                                        uppercase
                                        md:text-[44px]
                                    "
                                            >
                                                {selectedMember.name}
                                            </h2>

                                            {/* DESIGNATION */}

                                            <p
                                                className="
                                        mt-3
                                        text-[12px]
                                        font-bold
                                        tracking-[0.18em]
                                        text-modura-secondary
                                        uppercase
                                    "
                                            >
                                                {selectedMember.designation}
                                            </p>

                                            {/* DIVIDER */}

                                            <div className="my-4 flex items-center">
                                                <span
                                                    className="
                                            h-[3px]
                                            w-12
                                            bg-modura-primary
                                        "
                                                />

                                                <span
                                                    className="
                                            h-px
                                            w-20
                                            bg-modura-gray-300
                                        "
                                                />
                                            </div>

                                            {/* DESCRIPTION */}

                                            <p
                                                className="
                                        max-w-[650px]
                                        text-[14px]
                                        leading-7
                                        text-modura-gray-600
                                        md:text-[16px]
                                    "
                                            >
                                                {selectedMember.description}
                                            </p>

                                            {/* BOTTOM */}

                                            <div className="mt-auto pt-10">
                                                <div
                                                    className="
                                            flex
                                            items-center
                                            justify-between
                                            border-t
                                            border-modura-gray-200
                                            pt-4
                                        "
                                                >
                                                    <span
                                                        className="
                                                text-[12px]
                                                font-bold
                                                tracking-[0.3em]
                                                text-modura-gray-400
                                                uppercase
                                            "
                                                    >
                                                        Modura Design Group
                                                    </span>

                                                    <span
                                                        className="
                                                h-[7px]
                                                w-[7px]
                                                rotate-45
                                                bg-modura-secondary
                                            "
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    );
                })()}
            </section>

            {/* =================================================
                QUALITY POLICY
            ================================================= */}

            <section
                id="quality-policy"
                className="
                    relative
                    overflow-hidden
                    bg-modura-white
                    py-12
                    md:py-14
                   
                "
            >
                {/* =================================================
                    SUBTLE ARCHITECTURAL BACKGROUND
                ================================================= */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        bottom-[-80px]
                        left-[-40px]
                        hidden
                        h-[300px]
                        w-[560px]
                        opacity-50
                        lg:block
                    "
                >
                    <span
                        className="
                            absolute
                            bottom-0
                            left-[8%]
                            h-[220px]
                            w-px
                            rotate-[24deg]
                            bg-modura-gray-200
                        "
                    />

                    <span
                        className="
                            absolute
                            bottom-0
                            left-[20%]
                            h-[260px]
                            w-px
                            rotate-[24deg]
                            bg-modura-gray-200
                        "
                    />

                    <span
                        className="
                            absolute
                            bottom-0
                            left-[32%]
                            h-[190px]
                            w-px
                            rotate-[24deg]
                            bg-modura-gray-200
                        "
                    />

                    <span
                        className="
                            absolute
                            bottom-[65px]
                            left-0
                            h-px
                            w-[500px]
                            rotate-[-10deg]
                            bg-modura-gray-200
                        "
                    />

                    <span
                        className="
                            absolute
                            bottom-[115px]
                            left-[30px]
                            h-px
                            w-[450px]
                            rotate-[-10deg]
                            bg-modura-gray-200
                        "
                    />

                    <span
                        className="
                            absolute
                            bottom-[165px]
                            left-[80px]
                            h-px
                            w-[350px]
                            rotate-[-10deg]
                            bg-modura-gray-200
                        "
                    />
                </div>


                {/* =================================================
                    MAIN CONTAINER
                ================================================= */}

                <div
                    className="
                        relative
                        z-10
                        mx-auto
                        max-w-[1440px]
                        px-5
                        md:px-8
                        xl:px-10
                    "
                >

                    <div
                        className="
                            grid
                            items-center
                            gap-12

                            lg:grid-cols-[0.75fr_1.05fr_1.15fr]
                            lg:gap-8

                            xl:grid-cols-[0.78fr_1fr_1.2fr]
                            xl:gap-12
                        "
                    >

                        {/* =================================================
                            LEFT — QUALITY POLICY CONTENT
                        ================================================= */}

                        <div
                            className="
                                relative
                                z-20
                                max-w-[400px]
                            "
                        >

                            {/* LABEL */}

                            <div
                                className="
                                    mb-3
                                    flex
                                    items-center
                                    gap-3
                                "
                            >
                                

                                <span
                                    className="
                                        text-[10px]
                                        font-bold
                                        tracking-[0.38em]
                                        text-modura-secondary
                                        uppercase

                                        md:text-[13px]
                                    "
                                >
                                    Quality Policy
                                </span>
                            </div>


                            {/* MAIN HEADING */}

                            <h2
                                className="
                                    text-[48px]
                                    leading-[0.86]
                                    font-bold
                                    tracking-[-0.055em]
                                    text-modura-primary
                                    uppercase

                                    sm:text-[56px]
                                    md:text-[62px]
                                    lg:text-[66px]
                                    xl:text-[72px]
                                "
                            >
                                Our

                                <span
                                    className="
                                        block
                                        text-modura-secondary
                                    "
                                >
                                    Quality
                                </span>

                                <span className="block">
                                    Policy
                                </span>
                            </h2>


                            {/* HEADING LINE */}

                            <div
                                className="
                                    mt-7
                                    mb-6
                                    flex
                                    items-center
                                "
                            >
                                <span
                                    className="
                                        h-[3px]
                                        w-12
                                        bg-modura-primary
                                    "
                                />

                                <span
                                    className="
                                        h-px
                                        w-16
                                        bg-modura-gray-300
                                    "
                                />
                            </div>


                            {/* DESCRIPTION */}

                            <p
                                className="
                                    max-w-[370px]
                                    text-[14px]
                                    leading-[1.8]
                                    text-modura-gray-600

                                    md:text-[15px]
                                "
                            >
                                We are committed to delivering high-quality
                                design, engineering and documentation services
                                through established processes, skilled teams
                                and continuous improvement.
                            </p>

                        </div>


                        {/* =================================================
                            CENTER — CIRCULAR QUALITY VISUAL
                        ================================================= */}

                        <div
                            className="
                                relative
                                mx-auto
                                flex
                                h-[350px]
                                w-[350px]
                                items-center
                                justify-center

                                sm:h-[390px]
                                sm:w-[390px]

                                md:h-[430px]
                                md:w-[430px]

                                lg:h-[440px]
                                lg:w-[440px]
                            "
                        >

                            {/* =================================================
                                OUTER THIN CIRCLE
                            ================================================= */}

                            <span
                                className="
                                    absolute
                                    inset-[2%]
                                    rounded-full
                                    border
                                    border-modura-gray-300
                                "
                            />


                            {/* =================================================
                                SECOND CIRCLE
                            ================================================= */}

                            {/* <span
                                className="
                                    absolute
                                    inset-[7%]
                                    rounded-full
                                    border
                                    border-modura-gray-200
                                "
                            /> */}


                            {/* =================================================
                                THIRD CIRCLE
                            ================================================= */}

                            {/* <span
                                className="
                                    absolute
                                    inset-[13%]
                                    rounded-full
                                    border
                                    border-modura-gray-200
                                "
                            /> */}


                            {/* =================================================
                                ROTATED TECHNICAL LINES
                            ================================================= */}

                            <span
                                className="
                                    pointer-events-none
                                    absolute
                                    top-[2%]
                                    left-1/2
                                    h-[96%]
                                    w-px
                                    origin-center
                                    rotate-[42deg]
                                    bg-modura-gray-200
                                "
                            />

                            <span
                                className="
                                    pointer-events-none
                                    absolute
                                    top-[2%]
                                    left-1/2
                                    h-[96%]
                                    w-px
                                    origin-center
                                    -rotate-[42deg]
                                    bg-modura-gray-200
                                "
                            />


                            {/* =================================================
                                CIRCULAR ARCHITECTURAL IMAGE
                            ================================================= */}

                            <div
                                className="
                                    absolute
                                    inset-[9%]
                                    overflow-hidden
                                    rounded-full
                                    border-[8px]
                                    border-modura-white
                                    shadow-[0_20px_55px_rgba(11,29,51,0.12)]
                                "
                            >
                                <Image
                                    src={qualityImage}
                                    alt="Quality architecture and engineering"
                                    fill
                                    sizes="(max-width: 768px) 300px, 360px"
                                    className="
                                        object-cover
                                    "
                                />

                                <div
                                    className="
                                        absolute
                                        inset-0
                                        bg-modura-primary/10
                                    "
                                />
                            </div>


                            {/* =================================================
                                CENTER WHITE CIRCLE
                            ================================================= */}

                            <div
                                className="
                                    absolute
                                    left-[8%]
                                    z-20
                                    flex
                                    h-[145px]
                                    w-[145px]
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-modura-white
                                    shadow-[0_12px_35px_rgba(11,29,51,0.13)]

                                    sm:h-[160px]
                                    sm:w-[160px]

                                    md:h-[145px]
                                    md:w-[145px]
                                "
                            >

                                <div
                                    className="
                                        flex
                                        flex-col
                                    "
                                >
                                    <span
                                        className="
                                            text-[12px]
                                            font-bold
                                            leading-[1.5]
                                            tracking-[0.32em]
                                            text-modura-secondary
                                            uppercase
                                        "
                                    >
                                        Quality
                                        <br />
                                        Builds
                                    </span>

                                    <span
                                        className="
                                            text-[12px]
                                            font-bold
                                            leading-[1.8]
                                            tracking-[0.25em]
                                            text-modura-primary
                                            uppercase
                                        "
                                    >
                                        Confidence
                                    </span>
                                </div>
                            </div>

                            {/* =================================================
                                CONNECTION DOTS
                            ================================================= */}

                            <span
                                className="
                                    absolute
                                    top-[7%]
                                    right-[25%]
                                    z-40
                                    h-3
                                    w-3
                                    rounded-full
                                    bg-modura-primary
                                "
                            />

                            <span
                                className="
                                    absolute
                                    top-1/2
                                    right-[0%]
                                    z-40
                                    h-3
                                    w-3
                                    -translate-y-1/2
                                    rounded-full
                                    bg-modura-primary
                                "
                            />

                            <span
                                className="
                                    absolute
                                    bottom-[8%]
                                    right-[23%]
                                    z-40
                                    h-3
                                    w-3
                                    rounded-full
                                    bg-modura-primary
                                "
                            />

                        </div>


                        {/* =================================================
                            RIGHT — QUALITY PRINCIPLES
                        ================================================= */}

                        <div
                            className="
                                relative
                                z-20
                                max-h-[470px]
                                overflow-y-auto
                                pr-2

                                [&::-webkit-scrollbar]:w-[3px]
                                [&::-webkit-scrollbar-track]:bg-modura-gray-100
                                [&::-webkit-scrollbar-thumb]:bg-modura-secondary
                            "
                        >

                            {/* =================================================
                                STANDARDIZED PROCESSES
                            ================================================= */}

                            <div
                                className="
                                    group
                                    relative
                                    flex
                                    items-start
                                    gap-5
                                    py-4
                                "
                            >

                                <span
                                    className="
                                        absolute
                                        top-[31px]
                                        -left-10
                                        hidden
                                        h-px
                                        w-8
                                        bg-modura-gray-300
                                        lg:block
                                    "
                                />

                                <span
                                    className="
                                        absolute
                                        top-[27px]
                                        -left-10
                                        hidden
                                        h-2
                                        w-2
                                        rounded-full
                                        bg-modura-primary
                                        lg:block
                                    "
                                />

                                <div
                                    className="
                                        flex
                                        h-[62px]
                                        w-[62px]
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-modura-primary
                                        text-modura-white
                                        transition-all
                                        duration-300
                                        group-hover:bg-modura-secondary
                                    "
                                >
                                    <FaCogs size={24} />
                                </div>

                                <div className="pt-1">

                                    <h3
                                        className="
                                            text-[17px]
                                            font-bold
                                            tracking-[-0.02em]
                                            text-modura-primary
                                            uppercase

                                            md:text-[19px]
                                        "
                                    >
                                        Standardized Processes
                                    </h3>

                                    <p
                                        className="
                                            mt-1
                                            max-w-[440px]
                                            text-[13px]
                                            leading-6
                                            text-modura-gray-600

                                            md:text-[14px]
                                        "
                                    >
                                        Well-defined workflows that support
                                        consistent and reliable deliverables.
                                    </p>

                                </div>

                            </div>


                            {/* =================================================
                                SKILLED PEOPLE
                            ================================================= */}

                            <div
                                className="
                                    group
                                    relative
                                    flex
                                    items-start
                                    gap-5
                                    border-t
                                    border-modura-gray-200
                                    py-4
                                "
                            >

                                <span
                                    className="
                                        absolute
                                        top-[31px]
                                        -left-10
                                        hidden
                                        h-px
                                        w-8
                                        bg-modura-gray-300
                                        lg:block
                                    "
                                />

                                <span
                                    className="
                                        absolute
                                        top-[27px]
                                        -left-10
                                        hidden
                                        h-2
                                        w-2
                                        rounded-full
                                        bg-modura-primary
                                        lg:block
                                    "
                                />

                                <div
                                    className="
                                        flex
                                        h-[62px]
                                        w-[62px]
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-modura-secondary
                                        text-modura-white
                                        transition-all
                                        duration-300
                                        group-hover:bg-modura-primary
                                    "
                                >
                                    <FaUsers size={23} />
                                </div>

                                <div className="pt-1">

                                    <h3
                                        className="
                                            text-[17px]
                                            font-bold
                                            tracking-[-0.02em]
                                            text-modura-primary
                                            uppercase

                                            md:text-[19px]
                                        "
                                    >
                                        Skilled People
                                    </h3>

                                    <p
                                        className="
                                            mt-1
                                            max-w-[440px]
                                            text-[13px]
                                            leading-6
                                            text-modura-gray-600

                                            md:text-[14px]
                                        "
                                    >
                                        A capable team with technical expertise
                                        and a focus on continuous learning.
                                    </p>

                                </div>

                            </div>


                            {/* =================================================
                                ACCURACY & RELIABILITY
                            ================================================= */}

                            <div
                                className="
                                    group
                                    relative
                                    flex
                                    items-start
                                    gap-5
                                    border-t
                                    border-modura-gray-200
                                    py-4
                                "
                            >

                                <span
                                    className="
                                        absolute
                                        top-[31px]
                                        -left-10
                                        hidden
                                        h-px
                                        w-8
                                        bg-modura-gray-300
                                        lg:block
                                    "
                                />

                                <span
                                    className="
                                        absolute
                                        top-[27px]
                                        -left-10
                                        hidden
                                        h-2
                                        w-2
                                        rounded-full
                                        bg-modura-primary
                                        lg:block
                                    "
                                />

                                <div
                                    className="
                                        flex
                                        h-[62px]
                                        w-[62px]
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-modura-primary
                                        text-modura-white
                                        transition-all
                                        duration-300
                                        group-hover:bg-modura-secondary
                                    "
                                >
                                    <FaGem size={22} />
                                </div>

                                <div className="pt-1">

                                    <h3
                                        className="
                                            text-[17px]
                                            font-bold
                                            tracking-[-0.02em]
                                            text-modura-primary
                                            uppercase

                                            md:text-[19px]
                                        "
                                    >
                                        Accuracy & Reliability
                                    </h3>

                                    <p
                                        className="
                                            mt-1
                                            max-w-[440px]
                                            text-[13px]
                                            leading-6
                                            text-modura-gray-600

                                            md:text-[14px]
                                        "
                                    >
                                        Attention to detail that keeps every
                                        deliverable aligned with project
                                        requirements.
                                    </p>

                                </div>

                            </div>


                            {/* =================================================
                                CONTINUOUS IMPROVEMENT
                            ================================================= */}

                            <div
                                className="
                                    group
                                    relative
                                    flex
                                    items-start
                                    gap-5
                                    border-t
                                    border-modura-gray-200
                                    py-4
                                "
                            >

                                <span
                                    className="
                                        absolute
                                        top-[31px]
                                        -left-10
                                        hidden
                                        h-px
                                        w-8
                                        bg-modura-gray-300
                                        lg:block
                                    "
                                />

                                <span
                                    className="
                                        absolute
                                        top-[27px]
                                        -left-10
                                        hidden
                                        h-2
                                        w-2
                                        rounded-full
                                        bg-modura-primary
                                        lg:block
                                    "
                                />

                                <div
                                    className="
                                        flex
                                        h-[62px]
                                        w-[62px]
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-modura-secondary
                                        text-modura-white
                                        transition-all
                                        duration-300
                                        group-hover:bg-modura-primary
                                    "
                                >
                                    <FaChartLine size={22} />
                                </div>

                                <div className="pt-1">

                                    <h3
                                        className="
                                            text-[17px]
                                            font-bold
                                            tracking-[-0.02em]
                                            text-modura-primary
                                            uppercase

                                            md:text-[19px]
                                        "
                                    >
                                        Continuous Improvement
                                    </h3>

                                    <p
                                        className="
                                            mt-1
                                            max-w-[440px]
                                            text-[13px]
                                            leading-6
                                            text-modura-gray-600

                                            md:text-[14px]
                                        "
                                    >
                                        We continually refine our tools,
                                        processes and methods to improve
                                        efficiency and quality.
                                    </p>

                                </div>

                            </div>


                            {/* =================================================
                                CLIENT SATISFACTION
                            ================================================= */}

                            <div
                                className="
                                    group
                                    relative
                                    flex
                                    items-start
                                    gap-5
                                    border-t
                                    border-modura-gray-200
                                    py-4
                                "
                            >

                                <span
                                    className="
                                        absolute
                                        top-[31px]
                                        -left-10
                                        hidden
                                        h-px
                                        w-8
                                        bg-modura-gray-300
                                        lg:block
                                    "
                                />

                                <span
                                    className="
                                        absolute
                                        top-[27px]
                                        -left-10
                                        hidden
                                        h-2
                                        w-2
                                        rounded-full
                                        bg-modura-primary
                                        lg:block
                                    "
                                />

                                <div
                                    className="
                                        flex
                                        h-[62px]
                                        w-[62px]
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        bg-modura-primary
                                        text-modura-white
                                        transition-all
                                        duration-300
                                        group-hover:bg-modura-secondary
                                    "
                                >
                                    <FaHandshake size={22} />
                                </div>

                                <div className="pt-1">

                                    <h3
                                        className="
                                            text-[17px]
                                            font-bold
                                            tracking-[-0.02em]
                                            text-modura-primary
                                            uppercase

                                            md:text-[19px]
                                        "
                                    >
                                        Client Satisfaction
                                    </h3>

                                    <p
                                        className="
                                            mt-1
                                            max-w-[440px]
                                            text-[13px]
                                            leading-6
                                            text-modura-gray-600

                                            md:text-[14px]
                                        "
                                    >
                                        Delivering dependable services that
                                        create trust and support long-term
                                        client relationships.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </section>

            {/* =================================================
                CERTIFICATIONS
            ================================================= */}

            <section
                    id="certifications"
                    className="
                        relative
                        overflow-hidden
                        bg-modura-off-white
                        py-12
                        md:py-14
                        
                    "
                >
                    {/* =================================================
                        SUBTLE ARCHITECTURAL BACKGROUND
                    ================================================= */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            inset-0
                            overflow-hidden
                        "
                    >
                        

                        

                        <span
                            className="
                                absolute
                                bottom-[-120px]
                                left-[-100px]
                                h-[250px]
                                w-[420px]
                                rotate-[25deg]
                                border-t
                                border-modura-gray-200
                            "
                        />

                        <span
                            className="
                                absolute
                                bottom-[-80px]
                                left-[40px]
                                h-[220px]
                                w-px
                                rotate-[25deg]
                                bg-modura-gray-200
                            "
                        />

                        {/* RIGHT ARCHITECTURAL LINES */}

                        <span
                            className="
                                absolute
                                top-[4%]
                                right-[-40px]
                                h-[260px]
                                w-[420px]
                                rotate-[-28deg]
                                border-t
                                border-modura-gray-200
                            "
                        />

                        <span
                            className="
                                absolute
                                top-[12%]
                                right-[5%]
                                h-[210px]
                                w-px
                                rotate-[35deg]
                                bg-modura-gray-200
                            "
                        />

                    

                    
                    </div>


                    {/* =================================================
                        MAIN CONTAINER
                    ================================================= */}

                    <div
                        className="
                            relative
                            z-10
                            mx-auto
                            max-w-[1380px]
                            px-5
                            md:px-8
                            xl:px-10
                        "
                    >

                        {/* =================================================
                            HEADER
                        ================================================= */}

                        <div
                            className="
                                mx-auto
                                mb-10
                                max-w-[850px]
                                text-center
                                md:mb-12
                            "
                        >

                            {/* LABEL */}

                            <div
                                className="
                                    mb-2
                                    flex
                                    items-center
                                    justify-center
                                    gap-4
                                "
                            >

                                <span
                                    className="
                                        h-[2px]
                                        w-12
                                        bg-modura-primary
                                    "
                                />

                                <span
                                    className="
                                        text-[13px]
                                        font-bold
                                        tracking-[0.35em]
                                        text-modura-secondary
                                        uppercase
                                    "
                                >
                                    Our Certifications
                                </span>

                                <span
                                    className="
                                        h-[2px]
                                        w-12
                                        bg-modura-primary
                                    "
                                />

                            </div>


                            {/* HEADING */}

                            <h2
                                className="
                                    text-[40px]
                                    leading-[0.95]
                                    font-bold
                                    tracking-[-0.045em]
                                    text-modura-primary
                                    uppercase

                                    sm:text-[48px]
                                    md:text-[52px]
                                    
                                "
                            >
                                Recognized For

                                <span
                                    className="
                                        block
                                        text-modura-secondary
                                    "
                                >
                                    Our Standards
                                </span>
                            </h2>


                            {/* DESCRIPTION */}

                            <p
                                className="
                                    mx-auto
                                    mt-2
                                    max-w-[680px]
                                    text-[14px]
                                    leading-5
                                    text-modura-gray-600

                                    md:text-[15px]
                                "
                            >
                                Our commitment to quality and excellence is
                                supported by recognized standards, structured
                                processes and continuous improvement.
                            </p>

                        </div>


                        {/* =================================================
                            CERTIFICATION GRID
                        ================================================= */}

                        <div
                            className="
                                grid
                                gap-6

                                md:grid-cols-2

                                lg:grid-cols-3
                                lg:gap-7
                            "
                        >

                            {/* =================================================
                                CERTIFICATE 01
                            ================================================= */}

                            <article
                                className="
                                    group
                                    relative
                                    overflow-hidden
                                    border
                                    border-modura-gray-200
                                    bg-modura-white
                                    shadow-[0_15px_45px_rgba(11,29,51,0.06)]
                                    transition-all
                                    duration-500
                                    hover:-translate-y-1
                                    hover:shadow-[0_20px_55px_rgba(11,29,51,0.10)]
                                "
                            >

                                {/* IMAGE */}

                                <div
                                    className="
                                        relative
                                        h-[245px]
                                        overflow-hidden
                                        bg-modura-light
                                    "
                                >

                                    <Image
                                        src={certificate1}
                                        alt="ISO 9001:2015 Certificate"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="
                                            object-contain
                                            transition-transform
                                            duration-700
                                            group-hover:scale-[1.04]
                                        "
                                    />

                                    {/* IMAGE OVERLAY */}

                                    <div
                                        className="
                                            absolute
                                            inset-0
                                            bg-gradient-to-t
                                            from-modura-primary/20
                                            to-transparent
                                        "
                                    />

                                    {/* TOP ACCENT */}

                                    <span
                                        className="
                                            absolute
                                            top-0
                                            left-0
                                            h-[4px]
                                            w-20
                                            bg-modura-primary
                                            transition-all
                                            duration-500
                                            group-hover:w-full
                                        "
                                    />

                                </div>


                                {/* CONTENT */}

                                <div
                                    className="
                                        p-7
                                        md:p-8
                                    "
                                >

                                    {/* LABEL */}

                                    <div
                                        className="
                                            mb-4
                                            flex
                                            items-center
                                            gap-3
                                        "
                                    >

                                        <span
                                            className="
                                                h-[2px]
                                                w-8
                                                bg-modura-primary
                                            "
                                        />

                                        <span
                                            className="
                                                text-[10px]
                                                font-bold
                                                tracking-[0.25em]
                                                text-modura-secondary
                                                uppercase
                                            "
                                        >
                                            Certification
                                        </span>

                                    </div>


                                    {/* TITLE */}

                                    <h3
                                        className="
                                            text-[24px]
                                            leading-tight
                                            font-bold
                                            tracking-[-0.025em]
                                            text-modura-primary
                                        "
                                    >
                                        ISO 9001:2015
                                    </h3>


                                    {/* SUBTITLE */}

                                    <p
                                        className="
                                            mt-2
                                            text-[11px]
                                            font-bold
                                            tracking-[0.18em]
                                            text-modura-secondary
                                            uppercase
                                        "
                                    >
                                        Quality Management System
                                    </p>


                                    {/* DESCRIPTION */}

                                    <p
                                        className="
                                            mt-4
                                            text-[14px]
                                            leading-6
                                            text-modura-gray-600
                                        "
                                    >
                                        Our quality management practices support
                                        consistent processes, accurate deliverables
                                        and dependable project outcomes.
                                    </p>


                                    {/* YEAR */}

                                    <div
                                        className="
                                            mt-6
                                            flex
                                            items-center
                                            gap-3
                                            border-t
                                            border-modura-gray-200
                                            pt-5
                                        "
                                    >

                                        <FiCalendar
                                            className="
                                                text-modura-secondary
                                            "
                                            size={20}
                                        />

                                        <div>

                                            <span
                                                className="
                                                    block
                                                    text-[10px]
                                                    tracking-[0.2em]
                                                    text-modura-gray-500
                                                    uppercase
                                                "
                                            >
                                                Certified Since
                                            </span>

                                            <span
                                                className="
                                                    text-[16px]
                                                    font-bold
                                                    text-modura-primary
                                                "
                                            >
                                                2018
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            </article>


                            {/* =================================================
                                CERTIFICATE 02
                            ================================================= */}

                            <article
                                className="
                                    group
                                    relative
                                    overflow-hidden
                                    border
                                    border-modura-gray-200
                                    bg-modura-white
                                    shadow-[0_15px_45px_rgba(11,29,51,0.06)]
                                    transition-all
                                    duration-500
                                    hover:-translate-y-1
                                    hover:shadow-[0_20px_55px_rgba(11,29,51,0.10)]
                                "
                            >

                                {/* IMAGE */}

                                <div
                                    className="
                                        relative
                                        h-[245px]
                                        overflow-hidden
                                        bg-modura-light
                                    "
                                >

                                    <Image
                                        src={certificate2}
                                        alt="ISO 14001:2015 Certificate"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="
                                            object-contain
                                            transition-transform
                                            duration-700
                                            group-hover:scale-[1.04]
                                        "
                                    />

                                    <div
                                        className="
                                            absolute
                                            inset-0
                                            bg-gradient-to-t
                                            from-modura-primary/20
                                            to-transparent
                                        "
                                    />

                                    <span
                                        className="
                                            absolute
                                            top-0
                                            left-0
                                            h-[4px]
                                            w-20
                                            bg-modura-secondary
                                            transition-all
                                            duration-500
                                            group-hover:w-full
                                        "
                                    />

                                </div>


                                {/* CONTENT */}

                                <div
                                    className="
                                        p-7
                                        md:p-8
                                    "
                                >

                                    <div
                                        className="
                                            mb-4
                                            flex
                                            items-center
                                            gap-3
                                        "
                                    >

                                        <span
                                            className="
                                                h-[2px]
                                                w-8
                                                bg-modura-secondary
                                            "
                                        />

                                        <span
                                            className="
                                                text-[10px]
                                                font-bold
                                                tracking-[0.25em]
                                                text-modura-secondary
                                                uppercase
                                            "
                                        >
                                            Certification
                                        </span>

                                    </div>


                                    <h3
                                        className="
                                            text-[24px]
                                            leading-tight
                                            font-bold
                                            tracking-[-0.025em]
                                            text-modura-primary
                                        "
                                    >
                                        ISO 14001:2015
                                    </h3>


                                    <p
                                        className="
                                            mt-2
                                            text-[11px]
                                            font-bold
                                            tracking-[0.18em]
                                            text-modura-secondary
                                            uppercase
                                        "
                                    >
                                        Environmental Management System
                                    </p>


                                    <p
                                        className="
                                            mt-4
                                            text-[14px]
                                            leading-6
                                            text-modura-gray-600
                                        "
                                    >
                                        Our environmental management approach
                                        promotes responsible practices and supports
                                        sustainable project delivery.
                                    </p>


                                    <div
                                        className="
                                            mt-6
                                            flex
                                            items-center
                                            gap-3
                                            border-t
                                            border-modura-gray-200
                                            pt-5
                                        "
                                    >

                                        <FiCalendar
                                            className="
                                                text-modura-secondary
                                            "
                                            size={20}
                                        />

                                        <div>

                                            <span
                                                className="
                                                    block
                                                    text-[10px]
                                                    tracking-[0.2em]
                                                    text-modura-gray-500
                                                    uppercase
                                                "
                                            >
                                                Certified Since
                                            </span>

                                            <span
                                                className="
                                                    text-[16px]
                                                    font-bold
                                                    text-modura-primary
                                                "
                                            >
                                                2019
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            </article>


                            {/* =================================================
                                CERTIFICATE 03
                            ================================================= */}

                            <article
                                className="
                                    group
                                    relative
                                    overflow-hidden
                                    border
                                    border-modura-gray-200
                                    bg-modura-white
                                    shadow-[0_15px_45px_rgba(11,29,51,0.06)]
                                    transition-all
                                    duration-500
                                    hover:-translate-y-1
                                    hover:shadow-[0_20px_55px_rgba(11,29,51,0.10)]
                                "
                            >

                                {/* IMAGE */}

                                <div
                                    className="
                                        relative
                                        h-[245px]
                                        overflow-hidden
                                        bg-modura-light
                                    "
                                >

                                    <Image
                                        src={certificate3}
                                        alt="ISO 45001:2018 Certificate"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="
                                            object-contain
                                            transition-transform
                                            duration-700
                                            group-hover:scale-[1.04]
                                        "
                                    />

                                    <div
                                        className="
                                            absolute
                                            inset-0
                                            bg-gradient-to-t
                                            from-modura-primary/20
                                            to-transparent
                                        "
                                    />

                                    <span
                                        className="
                                            absolute
                                            top-0
                                            left-0
                                            h-[4px]
                                            w-20
                                            bg-modura-primary
                                            transition-all
                                            duration-500
                                            group-hover:w-full
                                        "
                                    />

                                </div>


                                {/* CONTENT */}

                                <div
                                    className="
                                        p-7
                                        md:p-8
                                    "
                                >

                                    <div
                                        className="
                                            mb-4
                                            flex
                                            items-center
                                            gap-3
                                        "
                                    >

                                        <span
                                            className="
                                                h-[2px]
                                                w-8
                                                bg-modura-primary
                                            "
                                        />

                                        <span
                                            className="
                                                text-[10px]
                                                font-bold
                                                tracking-[0.25em]
                                                text-modura-secondary
                                                uppercase
                                            "
                                        >
                                            Certification
                                        </span>

                                    </div>


                                    <h3
                                        className="
                                            text-[24px]
                                            leading-tight
                                            font-bold
                                            tracking-[-0.025em]
                                            text-modura-primary
                                        "
                                    >
                                        ISO 45001:2018
                                    </h3>


                                    <p
                                        className="
                                            mt-2
                                            text-[11px]
                                            font-bold
                                            tracking-[0.18em]
                                            text-modura-secondary
                                            uppercase
                                        "
                                    >
                                        Occupational Health & Safety
                                    </p>


                                    <p
                                        className="
                                            mt-4
                                            text-[14px]
                                            leading-6
                                            text-modura-gray-600
                                        "
                                    >
                                        Our safety-focused systems help maintain
                                        responsible working practices and a safer
                                        environment for our teams and partners.
                                    </p>


                                    <div
                                        className="
                                            mt-6
                                            flex
                                            items-center
                                            gap-3
                                            border-t
                                            border-modura-gray-200
                                            pt-5
                                        "
                                    >

                                        <FiCalendar
                                            className="
                                                text-modura-secondary
                                            "
                                            size={20}
                                        />

                                        <div>

                                            <span
                                                className="
                                                    block
                                                    text-[10px]
                                                    tracking-[0.2em]
                                                    text-modura-gray-500
                                                    uppercase
                                                "
                                            >
                                                Certified Since
                                            </span>

                                            <span
                                                className="
                                                    text-[16px]
                                                    font-bold
                                                    text-modura-primary
                                                "
                                            >
                                                2020
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            </article>

                        </div>

                    </div>
            </section>

            {/* =================================================
                    FAQS
            ================================================= */}

            <section
                className="
                    relative
                    overflow-hidden
                    bg-modura-white
                    py-12
                    md:py-14
                "
                id="faqs"
            >
                {/* =================================================
                    TECHNICAL BACKGROUND
                ================================================= */}

                <span
                    className="
                        pointer-events-none
                        absolute
                        top-0
                        right-[7%]
                        h-[150px]
                        w-px
                        bg-modura-gray-200
                    "
                />

                <span
                    className="
                        pointer-events-none
                        absolute
                        top-[20%]
                        right-[7%]
                        h-px
                        w-[180px]
                        bg-modura-gray-200
                    "
                />

                <span
                    className="
                        pointer-events-none
                        absolute
                        bottom-0
                        left-[4%]
                        h-[180px]
                        w-px
                        bg-modura-gray-200
                    "
                />

                <span
                    className="
                        pointer-events-none
                        absolute
                        bottom-[18%]
                        left-0
                        h-px
                        w-[220px]
                        bg-modura-gray-200
                    "
                />

                <div
                    className="
                        relative
                        z-10
                        mx-auto
                        max-w-[1300px]
                        px-5
                        md:px-8
                    "
                >
                    <div
                        className="
                            grid
                            items-start
                            gap-12
                            lg:grid-cols-[0.72fr_1.28fr]
                            lg:gap-16
                        "
                    >

                        {/* =================================================
                                    LEFT CONTENT
                        ================================================= */}

                        <div
                            className="
                                relative
                                flex
                                min-h-[520px]
                                flex-col
                                justify-between
                                lg:min-h-[560px]
                            "
                        >
                            <div>

                                {/* LABEL */}

                                <div
                                    className="
                                        mb-2
                                        flex
                                        items-center
                                        gap-3
                                    "
                                >

                                    <span
                                        className="
                                            text-[13px]
                                            font-bold
                                            tracking-[0.35em]
                                            text-modura-secondary
                                            uppercase
                                        "
                                    >
                                        FAQS
                                    </span>
                                </div>


                                {/* HEADING */}

                                <h2
                                    className="
                                        max-w-[500px]
                                        text-[42px]
                                        leading-[0.98]
                                        font-bold
                                        tracking-[-0.04em]
                                        text-modura-primary
                                        md:text-[52px]
                                        lg:text-[58px]
                                    "
                                >
                                    Common
                                    <span
                                        className="
                                            block
                                            text-modura-secondary
                                        "
                                    >
                                        Questions.
                                    </span>
                                </h2>


                                {/* DESCRIPTION */}

                                <p
                                    className="
                                        mt-7
                                        max-w-[390px]
                                        text-[14px]
                                        leading-[1.55]
                                        text-modura-gray-600
                                        md:text-[15px]
                                    "
                                >
                                    Quick answers to help you understand
                                    our services, process and how we work.
                                </p>

                            </div>


                            {/* =================================================
                                        ARCHITECTURAL DETAIL
                            ================================================= */}

                            <div
                                className="
                                    pointer-events-none
                                    relative
                                    mt-12
                                    hidden
                                    h-[190px]
                                    w-full
                                    overflow-hidden
                                    lg:block
                                "
                            >

                                <span
                                    className="
                                        absolute
                                        bottom-0
                                        left-[5%]
                                        h-[115px]
                                        w-[100px]
                                        border-t
                                        border-l
                                        border-modura-gray-300
                                        bg-modura-gray-100/60
                                    "
                                />

                                <span
                                    className="
                                        absolute
                                        bottom-0
                                        left-[28%]
                                        h-[155px]
                                        w-[125px]
                                        border-t
                                        border-l
                                        border-modura-gray-300
                                        bg-modura-light/60
                                        [clip-path:polygon(50%_0,100%_28%,100%_100%,0_100%,0_28%)]
                                    "
                                />

                                <span
                                    className="
                                        absolute
                                        bottom-0
                                        left-[28%]
                                        h-[75px]
                                        w-[125px]
                                        bg-modura-primary/90
                                        [clip-path:polygon(50%_0,100%_28%,100%_100%,0_100%,0_28%)]
                                    "
                                />

                                <span
                                    className="
                                        absolute
                                        right-[15%]
                                        bottom-0
                                        h-[120px]
                                        w-[70px]
                                        border-l
                                        border-modura-gray-300
                                        bg-modura-gray-100
                                    "
                                />

                                <span
                                    className="
                                        absolute
                                        bottom-0
                                        left-[15%]
                                        h-[165px]
                                        w-px
                                        bg-modura-gray-300
                                    "
                                />

                                <span
                                    className="
                                        absolute
                                        bottom-0
                                        left-[52%]
                                        h-[175px]
                                        w-px
                                        bg-modura-gray-300
                                    "
                                />

                                <span
                                    className="
                                        absolute
                                        bottom-[45px]
                                        left-0
                                        h-px
                                        w-full
                                        bg-modura-gray-300
                                    "
                                />

                                <span
                                    className="
                                        absolute
                                        bottom-[75px]
                                        left-[-5%]
                                        h-px
                                        w-[80%]
                                        rotate-[35deg]
                                        bg-modura-gray-300
                                    "
                                />

                            </div>

                        </div>


                        {/* =================================================
                                    RIGHT FAQ AREA
                        ================================================= */}

                        <div
                            className="
                                h-[520px]
                                overflow-hidden
                                lg:h-[560px]
                            "
                        >

                            {/* =================================================
                                        SCROLLABLE FAQ LIST
                            ================================================= */}

                            <div
                                className="
                                    h-full
                                    overflow-y-auto
                                    pr-1

                                    [scrollbar-width:none]
                                    [&::-webkit-scrollbar]:hidden
                                "
                            >

                                <div className="space-y-2 pb-1">

                                    {faqs.map((faq, index) => {
                                        const isOpen =
                                            activeFaq === index;

                                        return (
                                            <div
                                                key={faq.question}
                                                className="
                                                    group
                                                    relative
                                                    overflow-hidden
                                                    border
                                                    border-modura-gray-200
                                                    bg-modura-white
                                                    transition-all
                                                    duration-300
                                                "
                                            >

                                                {/* ACTIVE LINE */}

                                                <span
                                                    className={`
                                                        absolute
                                                        top-0
                                                        bottom-0
                                                        left-0
                                                        w-[3px]
                                                        bg-modura-primary
                                                        transition-transform
                                                        duration-300
                                                        ${isOpen
                                                            ? 'translate-x-0'
                                                            : '-translate-x-full'
                                                        }
                                                    `}
                                                />


                                                {/* QUESTION */}

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setActiveFaq(
                                                            isOpen
                                                                ? -1
                                                                : index,
                                                        )
                                                    }
                                                    className="
                                                        flex
                                                        min-h-[76px]
                                                        w-full
                                                        items-center
                                                        gap-5
                                                        px-5
                                                        text-left
                                                        md:px-6
                                                    "
                                                >

                                                    {/* NUMBER */}

                                                    <span
                                                        className={`
                                                            flex
                                                            h-9
                                                            w-9
                                                            shrink-0
                                                            items-center
                                                            justify-center
                                                            rounded-[7px]
                                                            text-[12px]
                                                            font-bold
                                                            transition-all
                                                            duration-300
                                                            ${isOpen
                                                                ? 'bg-modura-primary text-modura-white'
                                                                : 'bg-modura-light text-modura-primary'
                                                            }
                                                        `}
                                                    >
                                                        {String(index + 1).padStart(
                                                            2,
                                                            '0',
                                                        )}
                                                    </span>


                                                    {/* QUESTION */}

                                                    <span
                                                        className="
                                                            flex-1
                                                            pr-3
                                                            text-[15px]
                                                            leading-6
                                                            font-semibold
                                                            text-modura-primary
                                                            md:text-[16px]
                                                        "
                                                    >
                                                        {faq.question}
                                                    </span>


                                                    {/* ICON */}

                                                    <span
                                                        className="
                                                            flex
                                                            h-8
                                                            w-8
                                                            shrink-0
                                                            items-center
                                                            justify-center
                                                            text-modura-primary
                                                        "
                                                    >
                                                        {isOpen ? (
                                                            <FiMinus size={19} />
                                                        ) : (
                                                            <FiPlus size={19} />
                                                        )}
                                                    </span>

                                                </button>


                                                {/* =================================================
                                                    ANSWER
                                                ================================================= */}

                                                <div
                                                    className={`
                                                        grid
                                                        transition-[grid-template-rows]
                                                        duration-300
                                                        ease-in-out
                                                        ${isOpen
                                                            ? 'grid-rows-[1fr]'
                                                            : 'grid-rows-[0fr]'
                                                        }
                                                    `}
                                                >

                                                    <div
                                                        className="
                                                            overflow-hidden
                                                        "
                                                    >

                                                        <div
                                                            className="
                                                                border-t
                                                                border-modura-gray-200
                                                                px-5
                                                                py-5
                                                                pl-[76px]
                                                                md:px-6
                                                                md:pl-[89px]
                                                            "
                                                        >

                                                            <p
                                                                className="
                                                                    max-w-[650px]
                                                                    text-[13px]
                                                                    leading-[1.8]
                                                                    text-modura-gray-600
                                                                    md:text-[14px]
                                                                "
                                                            >
                                                                {faq.answer}
                                                            </p>

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>
                                        );
                                    })}

                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </section>

            {/* =================================================
                    BLOGS
            ================================================= */}

            <section
                id="blog"
                ref={blogSectionRef}
                className="
                    relative
                    overflow-hidden
                    bg-modura-off-white
                    py-12
                    md:py-14
                   
                "
            >
                {/* =================================================
                            BLUEPRINT BACKGROUND
                ================================================= */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-[url('/images/blueprint-bg.png')]
                        bg-cover
                        bg-center
                        opacity-[0.06]
                    "
                />

                {/* =================================================
                MAIN CONTAINER
    ================================================= */}

                <div
                    className="
                        relative
                        z-10
                        mx-auto
                        max-w-[1300px]
                        px-5
                        md:px-8
                    "
                >

                    {/* =================================================
                                        HEADER
                    ================================================= */}

                    <div
                        className="
                            company-blog-heading
                            mb-7
                            flex
                            flex-col
                            items-start
                            justify-between
                            gap-6
                            lg:mb-7
                            lg:flex-row
                            lg:items-end
                        "
                    >
                        <div>

                            {/* LABEL */}

                            <div
                                className="
                                    mb-3
                                    flex
                                    items-center
                                    gap-3
                                "
                            >
                                <span
                                    className="
                                        text-[11px]
                                        font-bold
                                        tracking-[0.35em]
                                        text-modura-secondary
                                        uppercase
                                        md:text-[12px]
                                    "
                                >
                                    LATEST BLOGS
                                </span>
                            </div>


                            {/* HEADING */}

                            <h2
                                className="
                                    text-[36px]
                                    leading-[1]
                                    font-bold
                                    tracking-[-0.035em]
                                    text-modura-primary
                                    uppercase
                                    md:text-[44px]
                                "
                            >
                                Insights That
                                <span
                                    className="
                                        ml-2
                                        text-modura-secondary
                                    "
                                >
                                    Shape Better Projects
                                </span>
                            </h2>

                        </div>


                        {/* =================================================
                                            VIEW MORE BUTTON
                        ================================================= */}

                        <Link
                            href="/blog"
                            className="
                                group
                                border-modura-primary
                                bg-modura-white
                                text-modura-primary
                                relative
                                flex
                                h-[52px]
                                items-center
                                overflow-hidden
                                border
                                pr-[62px]
                                pl-5
                                shrink-0
                            "
                        >
                            {/* NAVY FILL */}

                            <span
                                className="
                                    bg-modura-primary
                                    absolute
                                    inset-y-0
                                    left-0
                                    w-0
                                    transition-all
                                    duration-500
                                    group-hover:w-full
                                "
                            />

                            {/* TOP ARCHITECTURAL LINE */}

                            <span
                                className="
                                    bg-modura-secondary
                                    absolute
                                    top-0
                                    left-0
                                    z-10
                                    h-[3px]
                                    w-8
                                    transition-all
                                    duration-500
                                    group-hover:w-full
                                "
                            />

                            {/* TECHNICAL MARK */}

                            <span
                                className="
                                    relative
                                    z-10
                                    mr-3
                                    flex
                                    items-center
                                "
                            >
                                <span
                                    className="
                                        bg-modura-secondary
                                        group-hover:bg-modura-white
                                        h-[5px]
                                        w-[5px]
                                        rotate-45
                                        transition-colors
                                        duration-300
                                    "
                                />
                            </span>


                            {/* TEXT */}

                            <span
                                className="
                                    group-hover:text-modura-white
                                    relative
                                    z-10
                                    text-[12px]
                                    font-bold
                                    tracking-[0.08em]
                                    whitespace-nowrap
                                    uppercase
                                    transition-colors
                                    duration-300
                                "
                            >
                                View More
                            </span>


                            {/* ARROW */}

                            <span
                                className="
                                    bg-modura-primary
                                    text-modura-white
                                    group-hover:bg-modura-secondary
                                    absolute
                                    top-0
                                    right-0
                                    z-10
                                    flex
                                    h-full
                                    w-[48px]
                                    items-center
                                    justify-center
                                    transition-colors
                                    duration-300
                                "
                            >
                                <FiArrowUpRight
                                    className="
                                        text-[18px]
                                        transition-transform
                                        duration-300
                                        group-hover:rotate-45
                                    "
                                />
                            </span>

                        </Link>

                    </div>


                    {/* =================================================
                                BLOG GRID
                    ================================================= */}

                    <div
                        className="
                            grid
                            grid-cols-1
                            gap-7
                            md:grid-cols-2
                            lg:grid-cols-3
                            lg:gap-8
                        "
                    >

                        {companyBlogs.map((blog, index) => (

                            <article
                                key={blog.slug}
                                className="
                                    company-blog-card
                                    group
                                    relative
                                    overflow-hidden
                                    bg-modura-white
                                    shadow-[0_15px_40px_rgba(11,29,51,0.08)]
                                "
                            >

                                {/* =================================================
                                CLICKABLE IMAGE
                    ================================================= */}

                                <Link
                                    href={`/blog/${blog.slug}`}
                                    className="
                            relative
                            block
                            h-[220px]
                            overflow-hidden
                            md:h-[230px]
                        "
                                >

                                    <Image
                                        src={blog.image}
                                        alt={blog.title}
                                        fill
                                        sizes="
                                (max-width: 768px) 100vw,
                                (max-width: 1024px) 50vw,
                                33vw
                            "
                                        className="
                                object-cover
                                transition-transform
                                duration-700
                                group-hover:scale-110
                            "
                                    />

                                    {/* IMAGE OVERLAY */}

                                    <span
                                        className="
                                pointer-events-none
                                absolute
                                inset-0
                                bg-gradient-to-t
                                from-modura-primary/60
                                via-modura-primary/10
                                to-transparent
                                opacity-0
                                transition-opacity
                                duration-500
                                group-hover:opacity-100
                            "
                                    />

                                </Link>


                                {/* =================================================
                                CONTENT
                    ================================================= */}

                                <div className="p-6 md:p-7">

                                    {/* DATE */}

                                    <p
                                        className="
                                text-[11px]
                                font-semibold
                                tracking-[0.2em]
                                text-modura-secondary
                                uppercase
                            "
                                    >
                                        {blog.date}
                                    </p>


                                    {/* =================================================
                                    CLICKABLE TITLE
                        ================================================= */}

                                    <Link
                                        href={`/blog/${blog.slug}`}
                                        className="
                                block
                                transition-colors
                                duration-300
                                hover:text-modura-secondary
                            "
                                    >
                                        <h3
                                            className="
                                    mt-2
                                    text-[20px]
                                    leading-7
                                    font-bold
                                    text-modura-primary
                                "
                                        >
                                            {blog.title}
                                        </h3>
                                    </Link>


                                    {/* DESCRIPTION */}

                                    <p
                                        className="
                                mt-4
                                text-[14px]
                                leading-6
                                text-modura-gray-600
                            "
                                    >
                                        {blog.desc}
                                    </p>


                                    {/* =================================================
                                    READ MORE
                        ================================================= */}

                                    <Link
                                        href={`/blog/${blog.slug}`}
                                        className="
                                group/blog-btn
                                mt-7
                                inline-flex
                                items-center
                                gap-3
                                text-[12px]
                                font-bold
                                tracking-[0.12em]
                                text-modura-primary
                                uppercase
                            "
                                    >

                                        <span
                                            className="
                                    relative
                                    after:absolute
                                    after:bottom-[-6px]
                                    after:left-0
                                    after:h-[2px]
                                    after:w-full
                                    after:bg-modura-secondary
                                    after:transition-all
                                    after:duration-500
                                    group-hover/blog-btn:after:w-[40%]
                                "
                                        >
                                            Read More
                                        </span>

                                        <span
                                            className="
                                    flex
                                    h-8
                                    w-8
                                    items-center
                                    justify-center
                                    border
                                    border-modura-secondary
                                    text-modura-secondary
                                    transition-all
                                    duration-500
                                    group-hover/blog-btn:bg-modura-secondary
                                    group-hover/blog-btn:text-modura-white
                                "
                                        >
                                            <FiArrowUpRight size={16} />
                                        </span>

                                    </Link>

                                </div>

                            </article>

                        ))}

                    </div>

                </div>
            </section>
        </>
    )
}