'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef, useState } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
    FiArrowDown,
    FiChevronDown,
    FiCheck,
    FiLayers,
    FiPenTool,
} from 'react-icons/fi';

import Breadcrumb from '../components/Breadcrumb';

import breadcrumb from '@/app/assets/images/breadcrumb.jpg';
import autocadImage from '@/app/assets/images/autocad.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function SoftwareExpertise() {
    const pageRef = useRef<HTMLDivElement | null>(null);

    const [openFaq, setOpenFaq] = useState<number | null>(0);

    /*
    ============================================================
        SOFTWARE DATA
        Later this can directly come from your API.
    ============================================================
    */

    const software = {
        name: 'AutoCAD',

        shortDescription:
            'AutoCAD is a powerful CAD software used for creating precise 2D drawings and detailed documentation. It helps architects, engineers and designers develop accurate, industry-standard drawings for a wide range of projects.',

        image: autocadImage,

        description: `
            <h4>Professional AutoCAD Drafting Support</h4>

            <p>
                Our team uses AutoCAD to create accurate, well-structured and
                industry-compliant drawings for architectural, structural,
                MEP and construction projects. We work with the latest drafting
                practices to ensure clear, consistent and coordinated documentation.
            </p>

            <p>
                From concept design to detailed construction drawings, we provide
                drafting support tailored to your project needs, helping you achieve
                better planning, smoother coordination and efficient project execution.
            </p>

            <h4>Our AutoCAD Drafting Services</h4>

            <p>
                We create a wide range of drawings using AutoCAD, including:
            </p>

            <ul>
                <li>Architectural floor plans and layouts</li>
                <li>Detailed construction drawings</li>
                <li>Elevations and sections</li>
                <li>Shop drawings</li>
                <li>Structural drawings</li>
                <li>As-built drawings</li>
                <li>MEP drawings</li>
                <li>Drawing updates and revisions</li>
            </ul>

            <h5>Accurate Technical Documentation</h5>

            <p>
                Every drawing is prepared with attention to dimensions,
                annotations, layers and technical information. This helps
                maintain consistency throughout the complete drawing package.
            </p>

            <h5>Coordinated Drawing Workflow</h5>

            <p>
                Our structured drafting workflow helps coordinate information
                across project disciplines and reduces inconsistencies during
                design development and documentation.
            </p>

            <h4>Reliable, Accurate and Industry-Standard Drawings</h4>

            <p>
                AutoCAD offers precision, flexibility and wide industry acceptance,
                making it an essential tool for professional drafting. Our expertise
                ensures that every drawing is prepared with appropriate layers,
                annotation, dimensions and standards, supporting seamless
                collaboration and timely project delivery.
            </p>
        `,

        faqs: [
            {
                question:
                    'What types of drawings can be created using AutoCAD?',
                answer:
                    'AutoCAD can be used to create architectural floor plans, elevations, sections, structural drawings, MEP drawings, shop drawings, construction drawings and as-built documentation.',
            },
            {
                question:
                    'Can you work from PDFs, images or hand sketches?',
                answer:
                    'Yes. Existing PDFs, images, sketches and other reference documents can be used as the basis for preparing accurate AutoCAD drawings.',
            },
            {
                question:
                    'Do you follow specific drafting standards?',
                answer:
                    'Yes. Drawings can be prepared according to project-specific drafting standards, layer structures, annotation requirements and client specifications.',
            },
            {
                question:
                    'What file formats will you provide?',
                answer:
                    'Depending on the project requirement, drawings can be delivered in commonly required CAD and documentation formats.',
            },
        ],
    };

    /*
    ============================================================
        GSAP ANIMATION
    ============================================================
    */

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.software-intro-content', {
                y: 45,
                opacity: 0,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.software-intro',
                    start: 'top 78%',
                },
            });

            gsap.from('.software-intro-image', {
                y: 55,
                opacity: 0,
                duration: 1,
                delay: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.software-intro-image',
                    start: 'top 82%',
                },
            });

            gsap.from('.software-detail-content', {
                y: 45,
                opacity: 0,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.software-detail',
                    start: 'top 80%',
                },
            });

            gsap.from('.software-faq-header', {
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.software-faq',
                    start: 'top 80%',
                },
            });

            gsap.from('.software-faq-list', {
                y: 50,
                opacity: 0,
                duration: 0.9,
                delay: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.software-faq-list',
                    start: 'top 82%',
                },
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={pageRef}>

            {/* =================================================
                BREADCRUMB
            ================================================= */}

            <Breadcrumb
                title={software.name}
                image={breadcrumb.src}
                breadcrumbs={[
                    {
                        label: 'Home',
                        href: '/',
                    },
                    {
                        label: 'Software Expertise',
                        href: '#',
                    },
                    {
                        label: software.name,
                    },
                ]}
            />


            {/* =================================================
                SOFTWARE INTRO
            ================================================= */}

            <section
                className="
                    software-intro
                    relative
                    overflow-hidden
                    bg-modura-white
                    py-14

                    md:py-18

                    lg:py-20
                "
            >

                {/* TECHNICAL BACKGROUND */}

                <span
                    className="
                        pointer-events-none
                        absolute
                        top-[10%]
                        left-0
                        hidden
                        h-px
                        w-[110px]
                        bg-modura-gray-200
                        lg:block
                    "
                />

                <span
                    className="
                        pointer-events-none
                        absolute
                        top-[10%]
                        left-[110px]
                        hidden
                        h-[110px]
                        w-px
                        bg-modura-gray-200
                        lg:block
                    "
                />

                <span
                    className="
                        pointer-events-none
                        absolute
                        right-[-80px]
                        top-[15%]
                        hidden
                        h-[240px]
                        w-[240px]
                        rounded-full
                        border
                        border-modura-gray-200
                        lg:block
                    "
                />


                {/* CONTAINER */}

                <div
                    className="
                        relative
                        z-10
                        mx-auto
                        max-w-[1380px]
                        px-5

                        md:px-8

                        xl:px-10

                        2xl:px-12
                    "
                >

                    {/* =================================================
                        TOP CONTENT
                    ================================================= */}

                    <div
                        className="
                            grid
                            items-center
                            gap-10

                            lg:grid-cols-[1fr_1fr]
                            lg:gap-16

                            xl:gap-24
                        "
                    >

                        {/* LEFT */}

                        <div
                            className="
                                software-intro-content
                                relative
                                max-w-[650px]
                            "
                        >

                            {/* LABEL */}

                            <div
                                className="
                                    mb-2
                                    flex
                                    items-center
                                    gap-4
                                "
                            >


                                <span
                                    className="
                                        text-[14px]
                                        font-bold
                                        tracking-[0.30em]
                                        text-modura-secondary
                                        uppercase
                                    "
                                >
                                    Software Expertise
                                </span>

                            </div>


                            {/* TITLE */}

                            <h1
                                className="
                                    text-[42px]
                                    leading-[0.95]
                                    font-bold
                                    tracking-[-0.045em]
                                    text-modura-primary

                                    sm:text-[50px]

                                    md:text-[58px]

                                    lg:text-[62px]
                                "
                            >
                                {software.name}
                            </h1>


                            {/* TITLE LINE */}

                            <div
                                className="
                                    mt-3
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

                        </div>


                        {/* RIGHT */}

                        <div
                            className="
                                software-intro-content
                                relative
                                max-w-[620px]
                            "
                        >

                            {/* VERTICAL LINE */}

                            <span
                                className="
                                    absolute
                                    top-0
                                    left-0
                                    hidden
                                    h-full
                                    w-[2px]
                                    bg-modura-gray-300

                                    md:block
                                "
                            />

                            <p
                                className="
                                    text-[15px]
                                    leading-[1.8]
                                    text-modura-gray-600

                                    md:pl-7
                                    md:text-[16px]

                                    lg:text-[17px]
                                "
                            >
                                {software.shortDescription}
                            </p>

                        </div>

                    </div>


                    {/* =================================================
                        LARGE SOFTWARE IMAGE
                    ================================================= */}

                    <div
                        className="
                            software-intro-image
                            relative
                            mt-12

                            md:mt-14

                            
                        "
                    >

                        {/* CORNER */}

                        <span
                            className="
                                absolute
                                top-[-12px]
                                left-[-12px]
                                z-0
                                h-[90px]
                                w-[90px]
                                border-t-[4px]
                                border-l-[4px]
                                border-modura-primary
                            "
                        />

                        <span
                            className="
                                absolute
                                right-[-12px]
                                bottom-[-12px]
                                z-0
                                h-[90px]
                                w-[90px]
                                border-r
                                border-b
                                border-modura-secondary
                            "
                        />


                        {/* IMAGE */}

                        <div
                            className="
                                relative
                                z-10
                                h-[280px]
                                w-full
                                flex
                                items-center
                                justify-center
                                overflow-hidden
                                bg-modura-light

                                sm:h-[340px]

                                md:h-[420px]

                                lg:h-[500px]
                            "
                        >

                            <Image
                                src={software.image}
                                alt={`${software.name} software expertise`}
                                
                                fill
                                priority
                                sizes="auto"
                                
                                className="
                                    
                                    object-contain
                                    transition-transform
                                    duration-700
                                    hover:scale-[1.02]
                                "
                            />

                            <div
                                className="
                                    pointer-events-none
                                    absolute
                                    inset-0
                                    bg-modura-primary/5
                                "
                            />

                        </div>

                    </div>

                </div>

            </section>


            {/* =================================================
                DETAIL DESCRIPTION
            ================================================= */}

            <section
                className="
                    software-detail
                    relative
                    overflow-hidden
                    border-t
                    border-modura-gray-200
                    bg-modura-white
                    py-12

                    md:py-14

                  
                "
            >

                <div
                    className="
                        mx-auto
                        max-w-[1180px]
                        px-5

                        md:px-8

                        xl:px-10
                    "
                >

                    {/* =================================================
                        SECTION LABEL
                    ================================================= */}

                    <div
                        className="
                            mb-4
                            flex
                            items-center
                            gap-4
                        "
                    >

                       

                        <span
                            className="
                                text-[13px]
                                font-bold
                                tracking-[0.30em]
                                text-modura-secondary
                                uppercase
                            "
                        >
                            Overview
                        </span>

                    </div>


                    {/* =================================================
                        DYNAMIC EDITOR CONTENT
                    ================================================= */}

                    <div
                        className="
                            software-detail-content
                            max-w-[1080px]

                            [&_h4]:mb-4
                            [&_h4]:mt-10
                            [&_h4]:text-[25px]
                            [&_h4]:leading-[1.15]
                            [&_h4]:font-bold
                            [&_h4]:tracking-[-0.025em]
                            [&_h4]:text-modura-primary

                            first:[&_h4]:mt-0

                            [&_h5]:mb-3
                            [&_h5]:mt-8
                            [&_h5]:text-[19px]
                            [&_h5]:leading-tight
                            [&_h5]:font-bold
                            [&_h5]:text-modura-primary

                            [&_p]:mb-4
                            [&_p]:text-[15px]
                            [&_p]:leading-[1.8]
                            [&_p]:text-modura-gray-600

                            [&_ul]:my-6
                            [&_ul]:grid
                            [&_ul]:gap-x-14
                            [&_ul]:gap-y-3
                            [&_ul]:pl-0

                            md:[&_ul]:grid-cols-2

                            [&_li]:relative
                            [&_li]:pl-7
                            [&_li]:text-[14px]
                            [&_li]:leading-6
                            [&_li]:text-modura-gray-600

                            [&_li]:before:absolute
                            [&_li]:before:left-0
                            [&_li]:before:top-[10px]
                            [&_li]:before:h-[6px]
                            [&_li]:before:w-[6px]
                            [&_li]:before:bg-modura-primary
                        "
                        dangerouslySetInnerHTML={{
                            __html: software.description,
                        }}
                    />

                </div>

            </section>


            {/* =================================================
                FAQ
            ================================================= */}

            <section
                className="
                    software-faq
                    relative
                    overflow-hidden
                    border-t
                    border-modura-gray-200
                    bg-modura-light
                    py-16

                    md:py-20

                    lg:py-24
                "
            >

                {/* =================================================
                    TECHNICAL BACKGROUND
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
                            top-0
                            left-[8%]
                            h-[180px]
                            w-px
                            bg-modura-gray-200
                        "
                    />

                    <span
                        className="
                            absolute
                            top-[75px]
                            left-0
                            h-px
                            w-[180px]
                            bg-modura-gray-200
                        "
                    />

                    <span
                        className="
                            absolute
                            top-[75px]
                            right-0
                            h-px
                            w-[220px]
                            bg-modura-gray-200
                        "
                    />

                    <span
                        className="
                            absolute
                            right-[10%]
                            bottom-0
                            h-[200px]
                            w-px
                            bg-modura-gray-200
                        "
                    />

                </div>


                {/* =================================================
                    FAQ CONTAINER
                ================================================= */}

                <div
                    className="
                        relative
                        z-10
                        mx-auto
                        max-w-[950px]
                        px-5

                        md:px-8
                    "
                >

                    {/* =================================================
                        FAQ HEADER
                    ================================================= */}

                    <div
                        className="
                            software-faq-header
                            mx-auto
                            mb-10
                            max-w-[720px]
                            text-center
                        "
                    >

                        {/* LABEL */}

                        <div
                            className="
                                mb-4
                                flex
                                items-center
                                justify-center
                                gap-4
                            "
                        >

                            <span
                                className="
                                    h-[2px]
                                    w-10
                                    bg-modura-primary
                                "
                            />

                            <span
                                className="
                                    text-[11px]
                                    font-bold
                                    tracking-[0.35em]
                                    text-modura-secondary
                                    uppercase
                                "
                            >
                                Frequently Asked Questions
                            </span>

                            <span
                                className="
                                    h-[2px]
                                    w-10
                                    bg-modura-primary
                                "
                            />

                        </div>


                        {/* HEADING */}

                        <h2
                            className="
                                text-[34px]
                                leading-[1.05]
                                font-bold
                                tracking-[-0.035em]
                                text-modura-primary

                                sm:text-[40px]

                                md:text-[46px]
                            "
                        >
                            Questions About
                            <span
                                className="
                                    block
                                    text-modura-secondary
                                "
                            >
                                {software.name}
                            </span>
                        </h2>


                        {/* DESCRIPTION */}

                        <p
                            className="
                                mx-auto
                                mt-4
                                max-w-[620px]
                                text-[14px]
                                leading-7
                                text-modura-gray-600

                                md:text-[15px]
                            "
                        >
                            Find answers to common questions about our
                            {` ${software.name}`} expertise and drafting workflow.
                        </p>

                    </div>


                    {/* =================================================
                        FAQ LIST
                    ================================================= */}

                    <div
                        className="
                            software-faq-list
                            overflow-hidden
                            border
                            border-modura-gray-200
                            bg-modura-white
                        "
                    >

                        {software.faqs.map((faq, index) => {

                            const isOpen = openFaq === index;

                            return (
                                <div
                                    key={index}
                                    className="
                                        border-b
                                        border-modura-gray-200
                                        last:border-b-0
                                    "
                                >

                                    {/* QUESTION */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setOpenFaq(
                                                isOpen ? null : index,
                                            )
                                        }
                                        className="
                                            flex
                                            w-full
                                            items-center
                                            justify-between
                                            gap-5
                                            px-5
                                            py-5
                                            text-left
                                            transition-colors
                                            duration-300
                                            hover:bg-modura-light

                                            md:px-7
                                            md:py-6
                                        "
                                    >

                                        <div
                                            className="
                                                flex
                                                items-center
                                                gap-4
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
                                                    text-[10px]
                                                    font-bold
                                                    transition-all
                                                    duration-300
                                                    ${
                                                        isOpen
                                                            ? 'bg-modura-primary text-white'
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
                                                    text-[14px]
                                                    leading-6
                                                    font-bold
                                                    text-modura-primary

                                                    md:text-[15px]
                                                "
                                            >
                                                {faq.question}
                                            </span>

                                        </div>


                                        {/* ARROW */}

                                        <span
                                            className={`
                                                flex
                                                h-8
                                                w-8
                                                shrink-0
                                                items-center
                                                justify-center
                                                text-modura-secondary
                                                transition-transform
                                                duration-300
                                                ${
                                                    isOpen
                                                        ? 'rotate-180'
                                                        : ''
                                                }
                                            `}
                                        >
                                            <FiChevronDown
                                                size={19}
                                            />
                                        </span>

                                    </button>


                                    {/* ANSWER */}

                                    <div
                                        className={`
                                            grid
                                            transition-all
                                            duration-300
                                            ${
                                                isOpen
                                                    ? 'grid-rows-[1fr]'
                                                    : 'grid-rows-[0fr]'
                                            }
                                        `}
                                    >

                                        <div className="overflow-hidden">

                                            <div
                                                className="
                                                    border-t
                                                    border-modura-gray-200
                                                    px-5
                                                    py-5
                                                    pl-[68px]

                                                    md:px-7
                                                    md:py-6
                                                    md:pl-[84px]
                                                "
                                            >

                                                <p
                                                    className="
                                                        max-w-[760px]
                                                        text-[14px]
                                                        leading-7
                                                        text-modura-gray-600
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

            </section>

        </div>
    );
}