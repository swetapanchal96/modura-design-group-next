'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import {
    FiArrowUpRight,
    FiCheck,
    FiChevronDown,
    FiClock,
    FiFileText,
    FiLayers,
} from 'react-icons/fi';
import Breadcrumb from '../components/Breadcrumb';
import breadcrumb from '@/app/assets/images/breadcrumb.jpg';
import serviceImage from '@/app/assets/images/Blueprint.jpg'
import blog1 from '@/app/assets/images/about-1.jpg';
import blog3 from '@/app/assets/images/about-3.jpg';

const blogs = [
    {
        title: 'How BIM Is Transforming Modern Construction',
        date: 'June 24, 2026',
        image: blog1.src,
        desc: 'Building Information Modeling (BIM) is revolutionizing the construction industry by improving project coordination, reducing errors.',
    },
    {
        title: 'Future Trends In Architectural Design',
        date: 'May 18, 2026',
        image: blog3.src,
        desc: 'Modern architectural design is evolving with sustainable materials, advanced technologies, and innovative planning approaches.',
    },
    {
        title: 'Key Trends In Structural Engineering',
        date: 'April 12, 2026',
        image: blog1.src,
        desc: 'Structural engineering is moving towards smarter solutions with advanced analysis tools, sustainable practices, and improved construction techniques.',
    },
];

export default function ServicesPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    /*
    |--------------------------------------------------------------------------
    | DYNAMIC SERVICE DATA
    |--------------------------------------------------------------------------
    | Replace this object with your API response.
    */

    const service = {
        name: '2D CAD Drafting',

        shortDescription:
            'Accurate and detailed 2D CAD drafting solutions that support architectural, structural and engineering projects from design development through construction documentation.Our 2D CAD drafting services provide accurate, detailed and well-structured drawings for architects, engineers, contractors and construction teams. We transform concepts, sketches and existing documents into precise digital drawings that support every stage of the project.',

        image: serviceImage,

        description: `
            <h4>Professional 2D CAD Drafting Services</h4>

            <p>
                Our 2D CAD drafting services provide accurate, detailed and
                well-structured drawings for architects, engineers, contractors
                and construction teams. We transform concepts, sketches and
                existing documents into precise digital drawings that support
                every stage of the project.
            </p>

            <p>
                With a strong focus on accuracy, consistency and clear
                documentation, our drafting solutions help teams coordinate
                efficiently and move projects forward with confidence.
            </p>

            <h4>Comprehensive Drawing Solutions</h4>

            <p>
                We create detailed drawings according to project requirements,
                design standards and client specifications.
            </p>

            <ul>
                <li>Architectural floor plans and layouts</li>
                <li>Elevations and building sections</li>
                <li>Structural drawings</li>
                <li>Detailed construction drawings</li>
                <li>Shop drawings</li>
                <li>As-built documentation</li>
            </ul>

            <h5>Accurate Documentation</h5>

            <p>
                Every drawing is prepared with careful attention to dimensions,
                annotations, layers and technical information so that the final
                documentation remains clear and easy to use.
            </p>

            <h5>Coordinated Workflow</h5>

            <p>
                Our drafting workflow supports better coordination between
                architectural, structural and other project disciplines,
                helping reduce inconsistencies and unnecessary revisions.
            </p>

            <h4>Built Around Your Project Requirements</h4>

            <p>
                Whether the requirement is a single drawing, a complete drawing
                package or ongoing drafting support, our team works according
                to the required scope, standards and delivery requirements.
            </p>
        `,

        faqs: [
            {
                question: 'What types of 2D CAD drawings do you provide?',
                answer:
                    'We provide architectural, structural, shop, construction, floor plan, elevation, section and as-built drawings according to project requirements.',
            },
            {
                question: 'Can you work from existing drawings or sketches?',
                answer:
                    'Yes. Existing drawings, sketches, PDFs and other reference documents can be used as the basis for preparing accurate CAD documentation.',
            },
            {
                question: 'Can the drawings follow specific standards?',
                answer:
                    'Yes. Drawings can be prepared according to the required project standards, drafting conventions and client-specific requirements.',
            },
            {
                question: 'Do you provide revisions?',
                answer:
                    'Yes. Revisions can be incorporated according to the agreed project scope and coordination requirements.',
            },
        ],
    };

    const sectionRef = useRef(null);
    
        useLayoutEffect(() => {
            const ctx = gsap.context(() => {
                gsap.from('.blog-heading', {
                    y: 50,
                    opacity: 0,
                    duration: 1,
    
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    },
                });
    
                gsap.from('.blog-card', {
                    y: 80,
                    opacity: 0,
    
                    stagger: 0.18,
    
                    duration: 0.8,
    
                    ease: 'power3.out',
    
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                    },
                });
            }, sectionRef);
    
            return () => ctx.revert();
        }, []);

    return (
        <>
            {/* =================================================
                BREADCRUMB
            ================================================= */}

            <Breadcrumb
                title={service.name}
                image={breadcrumb.src}
            />

            {/* =================================================
                SERVICE INTRO
            ================================================= */}

            <section
                className="
                    relative
                    overflow-hidden
                    bg-modura-white
                    py-12
                    md:py-14
                "
            >

                {/* subtle technical line */}

                <span
                    className="
                        pointer-events-none
                        absolute
                        top-[12%]
                        left-0
                        hidden
                        h-px
                        w-[120px]
                        bg-modura-gray-200
                        lg:block
                    "
                />

                <span
                    className="
                        pointer-events-none
                        absolute
                        top-[12%]
                        left-[120px]
                        hidden
                        h-[120px]
                        w-px
                        bg-modura-gray-200
                        lg:block
                    "
                />

                {/* =================================================
                    CONTAINER
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
                        2xl:px-12
                    "
                >

                    <div
                        className="
                            grid
                            
                            gap-10

                            lg:grid-cols-[0.95fr_1.05fr]
                            lg:gap-10

                            xl:gap-8
                        "
                    >

                        {/* =================================================
                            LEFT IMAGE
                        ================================================= */}

                        <div
                            className="
                                relative
                                mx-auto
                                w-full
                                max-w-[450px]
                            "
                        >

                            {/* architectural corner */}

                            <span
                                className="
                                    absolute
                                    top-[-14px]
                                    left-[-14px]
                                    z-0
                                    h-[100px]
                                    w-[100px]
                                    border-t-[5px]
                                    border-l-[5px]
                                    border-modura-primary
                                "
                            />

                            <span
                                className="
                                    absolute
                                    right-[-14px]
                                    bottom-[-14px]
                                    z-0
                                    h-[100px]
                                    w-[100px]
                                    border-r
                                    border-b
                                    border-modura-secondary
                                "
                            />

                            <div
                                className="
                                    relative
                                    z-10
                                    aspect-[1.12/1]
                                    overflow-hidden
                                    bg-modura-light
                                "
                            >
                                <Image
                                    src={service.image}
                                    alt={service.name}
                                    fill
                                    priority
                                    sizes="
                                        (max-width: 768px) 100vw,
                                        (max-width: 1280px) 50vw,
                                        600px
                                    "
                                    className="
                                        object-cover
                                        transition-transform
                                        duration-700
                                        hover:scale-[1.03]
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


                        {/* =================================================
                            RIGHT SERVICE CONTENT
                        ================================================= */}

                        <div
                            className="
                                max-w-[650px]
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
                                        text-[14px]
                                        font-bold
                                        tracking-[0.30em]
                                        text-modura-secondary
                                        uppercase
                                    "
                                >
                                    Our Service
                                </span>

                            </div>


                            {/* TITLE */}

                            <h1
                                className="
                                    text-[38px]
                                    leading-[1.02]
                                    font-bold
                                    tracking-[-0.045em]
                                    text-modura-primary

                                    sm:text-[44px]
                                    md:text-[50px]
                                    
                                "
                            >
                                {service.name}
                            </h1>


                            {/* LINE */}

                            <div
                                className="
                                    my-3
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


                            {/* SHORT DESCRIPTION */}

                            <p
                                className="
                                    max-w-[620px]
                                    text-[15px]
                                    leading-[1.85]
                                    text-modura-gray-600

                                    md:text-[16px]
                                "
                            >
                                {service.shortDescription}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================================================
                DETAILED SERVICE DESCRIPTION
            ================================================= */}

            <section
                className="
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

                    {/* SECTION LABEL */}

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
                                text-[14px]
                                font-bold
                                tracking-[0.30em]
                                text-modura-secondary
                                uppercase
                            "
                        >
                            Service Overview
                        </span>

                    </div>


                    {/* DYNAMIC EDITOR CONTENT */}

                    <div
                        className="
                            service-detail-content
                            max-w-[1050px]

                            [&_h4]:mb-3
                            [&_h4]:mt-5
                            [&_h4]:text-[26px]
                            [&_h4]:leading-tight
                            [&_h4]:font-bold
                            [&_h4]:tracking-[-0.025em]
                            [&_h4]:text-modura-primary

                            [&_h5]:mb-3
                            [&_h5]:mt-4
                            [&_h5]:text-[20px]
                            [&_h5]:leading-tight
                            [&_h5]:font-bold
                            [&_h5]:text-modura-primary

                            [&_p]:mb-3
                            [&_p]:text-[16px]
                            [&_p]:leading-[1.55]
                            [&_p]:text-modura-gray-600

                            {/* LIST */}

                            [&_ul]:my-4
                            [&_ul]:grid
                            [&_ul]:gap-x-14
                            [&_ul]:gap-y-3
                            [&_ul]:pl-0
                            md:[&_ul]:grid-cols-2

                            /* LIST ITEM */

                            [&_li]:relative
                            [&_li]:flex
                            [&_li]:items-center
                            [&_li]:min-h-[24px]
                            [&_li]:pl-[42px]
                            [&_li]:text-[14px]
                            [&_li]:leading-5
                            [&_li]:text-modura-gray-600

                            /* SMALL NAVY BLOCK */

                            [&_li]:before:absolute
                            [&_li]:before:left-0
                            [&_li]:before:top-1/2
                            [&_li]:before:h-[8px]
                            [&_li]:before:w-[8px]
                            [&_li]:before:-translate-y-1/2
                            [&_li]:before:bg-modura-primary

                            /* TECHNICAL LINE */

                            [&_li]:after:absolute
                            [&_li]:after:left-[8px]
                            [&_li]:after:top-1/2
                            [&_li]:after:h-px
                            [&_li]:after:w-[22px]
                            [&_li]:after:-translate-y-1/2
                            [&_li]:after:bg-modura-gray-300
                        "
                        dangerouslySetInnerHTML={{
                            __html: service.description,
                        }}
                    />

                </div>

            </section>

            {/* =================================================
                FAQ SECTION
            ================================================= */}

            <section
                id="faqs"
                className="
                    relative
                    overflow-hidden
                    border-t
                    border-modura-gray-200
                    bg-modura-light
                    py-12
                    md:py-14
                    
                "
            >

                {/* technical background */}

                <div
                    className="
                        relative
                        z-10
                        mx-auto
                        max-w-[1000px]
                        px-5
                        md:px-8
                    "
                >

                    {/* =================================================
                        FAQ HEADER
                    ================================================= */}

                    <div
                        className="
                            mx-auto
                            mb-10
                            max-w-[700px]
                            text-center
                        "
                    >

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
                                    text-[14px]
                                    font-bold
                                    tracking-[0.35em]
                                    text-modura-secondary
                                    uppercase
                                "
                            >
                                FAQS
                            </span>

                            <span
                                className="
                                    h-[2px]
                                    w-10
                                    bg-modura-primary
                                "
                            />

                        </div>


                        <h2
                            className="
                                text-[34px]
                                leading-tight
                                font-bold
                                tracking-[-0.035em]
                                text-modura-primary

                                sm:text-[40px]
                                md:text-[46px]
                            "
                        >
                            Frequently Asked Questions
                        </h2>


                        <p
                            className="
                                mx-auto
                                mt-2
                                max-w-[620px]
                                text-[14px]
                                leading-7
                                text-modura-gray-600

                                md:text-[16px]
                            "
                        >
                            Find answers to common questions about our
                            {` ${service.name.toLowerCase()}`} services.
                        </p>

                    </div>


                    {/* =================================================
                        FAQ LIST
                    ================================================= */}

                    <div
                        className="
                            overflow-hidden
                            border
                            border-modura-gray-200
                            bg-modura-white
                        "
                    >

                        {service.faqs.map((faq, index) => {

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
                                            hover:bg-modura-off-white

                                            md:px-5
                                            md:py-5
                                        "
                                    >

                                        <div
                                            className="
                                                flex
                                                items-center
                                                gap-4
                                            "
                                        >

                                            <span
                                                className={`
                                                    flex
                                                    h-10
                                                    w-10
                                                    shrink-0
                                                    items-center
                                                    justify-center
                                                    text-[14px]
                                                    font-bold
                                                    transition-all
                                                    duration-300
                                                    ${
                                                        isOpen
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

                                            <span
                                                className="
                                                    text-[14px]
                                                    font-bold
                                                    leading-6
                                                    text-modura-primary

                                                    md:text-[16px]
                                                "
                                            >
                                                {faq.question}
                                            </span>

                                        </div>


                                        <span
                                            className={`
                                                flex
                                                h-9
                                                w-9
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
                                            <FiChevronDown size={19} />
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
                                                        text-[16px]
                                                        leading-5.5
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

            {/* =================================================
                RELATED BLOGS / LATEST INSIGHTS
            ================================================= */}

            <section
                ref={sectionRef}
                className="
                    relative
                    overflow-hidden
                    bg-modura-white
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
                        opacity-[0.07]
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
                        xl:px-10
                    "
                >

                    {/* =================================================
                        HEADER
                    ================================================= */}

                    <div
                        className="
                            company-blog-heading
                            mb-10
                            flex
                            flex-col
                            items-start
                            justify-between
                            gap-6

                            lg:mb-12
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

                                        md:text-[14px]
                                    "
                                >
                                    Related BLOGS
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

                                    lg:text-[48px]
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
                            VIEW MORE
                        ================================================= */}

                        <button
                            type="button"
                            className="
                                group
                                flex
                                shrink-0
                                items-center
                                gap-4
                                border
                                border-modura-primary
                                px-5
                                py-3
                                text-[11px]
                                font-bold
                                tracking-[0.15em]
                                text-modura-primary
                                uppercase
                                transition-all
                                duration-500
                                hover:bg-modura-primary
                                hover:text-modura-white
                            "
                        >

                            <span>
                                View More
                            </span>

                            <span
                                className="
                                    flex
                                    h-7
                                    w-7
                                    items-center
                                    justify-center
                                    border
                                    border-current
                                    transition-transform
                                    duration-500
                                    group-hover:rotate-45
                                "
                            >
                                <FiArrowUpRight
                                    size={15}
                                />
                            </span>

                        </button>

                    </div>


                    {/* =================================================
                        BLOG GRID
                    ================================================= */}

                    <div
                        className="
                            grid
                            gap-6

                            md:grid-cols-2

                            lg:grid-cols-3
                            lg:gap-8
                        "
                    >

                        {blogs.map((blog, index) => (

                            <article
                                key={index}
                                className="
                                    blog-card
                                    group
                                    relative
                                    overflow-hidden
                                    bg-white
                                    shadow-[0_15px_40px_rgba(11,29,51,0.08)]
                                "
                            >

                                {/* =================================================
                                    IMAGE
                                ================================================= */}

                                <div
                                    className="
                                        relative
                                        h-[220px]
                                        overflow-hidden

                                        md:h-[230px]
                                    "
                                >

                                    <Image
                                        src={blog.image}
                                        fill
                                        alt={blog.title}
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

                                    <div
                                        className="
                                            pointer-events-none
                                            absolute
                                            inset-0
                                            bg-gradient-to-t
                                            from-modura-primary/50
                                            to-transparent
                                            opacity-0
                                            transition-opacity
                                            duration-500
                                            group-hover:opacity-100
                                        "
                                    />

                                </div>


                                {/* =================================================
                                    CONTENT
                                ================================================= */}

                                <div
                                    className="
                                        p-6

                                        md:p-7
                                    "
                                >

                                    {/* DATE */}

                                    <p
                                        className="
                                            text-modura-secondary
                                            text-[11px]
                                            font-semibold
                                            tracking-[0.2em]
                                            uppercase
                                        "
                                    >
                                        {blog.date}
                                    </p>


                                    {/* TITLE */}

                                    <h3
                                        className="
                                            mt-2
                                            text-[20px]
                                            leading-7
                                            font-bold
                                            tracking-[-0.02em]
                                            text-modura-primary
                                        "
                                    >
                                        {blog.title}
                                    </h3>


                                    {/* DESCRIPTION */}

                                    <p
                                        className="
                                            mt-4
                                            text-[14px]
                                            leading-6
                                            text-modura-secondary
                                        "
                                    >
                                        {blog.desc}
                                    </p>


                                    {/* =================================================
                                        READ MORE
                                    ================================================= */}

                                    <button
                                        type="button"
                                        className="
                                            group/btn
                                            mt-7
                                            flex
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
                                                group-hover/btn:after:w-[40%]
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
                                                group-hover/btn:bg-modura-secondary
                                                group-hover/btn:text-white
                                            "
                                        >
                                            <FiArrowUpRight
                                                size={15}
                                            />
                                        </span>

                                    </button>

                                </div>

                            </article>

                        ))}

                    </div>

                </div>

            </section>
        </>
    );
}