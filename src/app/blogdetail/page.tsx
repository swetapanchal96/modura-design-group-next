'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLayoutEffect, useRef } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
    FiArrowUpRight,
    FiCalendar,
} from 'react-icons/fi';

import Breadcrumb from '../components/Breadcrumb';
import breadcrumb from '@/app/assets/images/breadcrumb.jpg';

import blog1 from '@/app/assets/images/about-1.jpg';
import blog2 from '@/app/assets/images/about-2.jpg';
import blog3 from '@/app/assets/images/about-3.jpg';
import blog4 from '@/app/assets/images/bim-services.jpg';

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   CURRENT BLOG
========================================================= */

const currentBlog = {
    title: 'How BIM Is Transforming Modern Construction',
    date: 'June 24, 2026',
    image: blog1,
};

/* =========================================================
   RELATED BLOGS
========================================================= */

const relatedBlogs = [
    {
        title: 'Future Trends In Architectural Design',
        date: 'May 18, 2026',
        image: blog3,
        slug: 'future-trends-in-architectural-design',
    },
    {
        title: 'Key Trends In Structural Engineering',
        date: 'April 12, 2026',
        image: blog2,
        slug: 'key-trends-in-structural-engineering',
    },
    {
        title: 'The Growing Importance Of BIM Coordination',
        date: 'March 28, 2026',
        image: blog4,
        slug: 'the-growing-importance-of-bim-coordination',
    },
];

/* =========================================================
   BLOG DETAIL
========================================================= */

export default function BlogDetail() {
    const sectionRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            /* =============================================
               HEADER
            ============================================= */

            gsap.fromTo(
                '.detail-heading',
                {
                    y: 45,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    ease: 'power3.out',
                },
            );

            /* =============================================
               HERO IMAGE
            ============================================= */

            gsap.fromTo(
                '.detail-hero-image',
                {
                    y: 50,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.15,
                    ease: 'power3.out',
                },
            );

            /* =============================================
               LEFT CONTENT
            ============================================= */

            gsap.fromTo(
                '.detail-content',
                {
                    y: 50,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    delay: 0.25,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.detail-content',
                        start: 'top 85%',
                        once: true,
                    },
                },
            );

            /* =============================================
               RIGHT SIDEBAR
            ============================================= */

            gsap.fromTo(
                '.related-sidebar',
                {
                    x: 40,
                    opacity: 0,
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.9,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.related-sidebar',
                        start: 'top 85%',
                        once: true,
                    },
                },
            );

            /* =============================================
               RELATED CARDS
            ============================================= */

            gsap.fromTo(
                '.related-card',
                {
                    y: 25,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    stagger: 0.12,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.related-sidebar',
                        start: 'top 80%',
                        once: true,
                    },
                },
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            {/* =================================================
                BREADCRUMB
            ================================================= */}

            <Breadcrumb
                title="Blog"
                image={breadcrumb.src}
                breadcrumbs={[
                    {
                        label: 'Home',
                        href: '/',
                    },
                    {
                        label: 'Blog',
                        href: '/blog',
                    },
                    {
                        label: 'How BIM Is Transforming Modern Construction',
                    },
                ]}
            />

            {/* =================================================
                BLOG DETAIL SECTION
            ================================================= */}

            <section
                ref={sectionRef}
                className="
                    relative
                    overflow-hidden
                    bg-modura-white
                    py-16
                    md:py-20
                    lg:py-14
                "
            >
                {/* =================================================
                    SUBTLE BACKGROUND
                ================================================= */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-[url('/images/blueprint-bg.png')]
                        bg-cover
                        opacity-[0.035]
                    "
                />

                {/* =================================================
                    MAIN CONTAINER
                ================================================= */}

                <div
                    className="
                        relative
                        mx-auto
                        max-w-[1300px]
                        px-5
                        md:px-8
                    "
                >
                    {/* =================================================
                        BLOG HEADER
                    ================================================= */}

                    <div
                        className="
                            detail-heading
                            max-w-[1050px]
                        "
                    >
                        {/* JOURNAL */}

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
                                    text-[12px]
                                    font-bold
                                    tracking-[0.34em]
                                    text-modura-secondary
                                    uppercase
                                "
                            >
                                MODURA JOURNAL
                            </span>
                        </div>

                        {/* TITLE */}

                        <h1
                            className="
                                max-w-[1050px]
                                text-[40px]
                                leading-[1.02]
                                font-bold
                                tracking-[-0.035em]
                                text-modura-primary

                                md:text-[54px]

                                lg:text-[60px]
                            "
                        >
                            {currentBlog.title}
                        </h1>

                        {/* DATE */}

                        <div
                            className="
                                mt-3
                                flex
                                items-center
                                gap-3
                            "
                        >
                            <FiCalendar
                                size={15}
                                className="text-modura-secondary"
                            />

                            <span
                                className="
                                    text-[11px]
                                    font-semibold
                                    tracking-[0.18em]
                                    text-modura-secondary
                                    uppercase
                                "
                            >
                                {currentBlog.date}
                            </span>
                        </div>
                    </div>

                    {/* =================================================
                        MAIN IMAGE
                    ================================================= */}

                    <div
                        className="
                            detail-hero-image
                            relative
                            mx-auto
                            mt-12
                            h-[360px]
                            max-w-[1250px]
                            overflow-hidden

                            md:h-[500px]

                            lg:h-[600px]
                        "
                    >
                        <Image
                            src={currentBlog.image}
                            alt={currentBlog.title}
                            fill
                            priority
                            sizes="100vw"
                            className="object-cover"
                        />

                        {/* BOTTOM DETAIL */}

                        <div
                            className="
                                absolute
                                bottom-0
                                left-0
                                h-[5px]
                                w-full
                                bg-modura-secondary
                            "
                        />

                        <div
                            className="
                                absolute
                                bottom-0
                                left-0
                                h-[5px]
                                w-[120px]
                                bg-modura-primary
                            "
                        />
                    </div>

                    {/* =================================================
                        70 / 30 LAYOUT
                    ================================================= */}

                    <div
                        className="
                            mt-16
                            grid
                            grid-cols-1
                            items-start
                            gap-12

                            lg:grid-cols-[minmax(0,7fr)_minmax(280px,3fr)]
                            lg:gap-16
                        "
                    >
                        {/* =================================================
                            LEFT — 70%
                            ONLY THIS AREA SCROLLS
                        ================================================= */}

                        <article
                            className="
                                detail-content
                                min-w-0

                                lg:max-h-[750px]
                                lg:overflow-y-auto
                                lg:pr-6

                                [&::-webkit-scrollbar]:w-[0px]
                                [&::-webkit-scrollbar-track]:bg-modura-gray-100
                                [&::-webkit-scrollbar-thumb]:rounded-full
                                [&::-webkit-scrollbar-thumb]:bg-modura-secondary
                                [&::-webkit-scrollbar-thumb]:hover:bg-modura-primary
                            "
                        >
                            {/* =================================================
                                INTRO
                            ================================================= */}

                            <p
                                className="
                                    max-w-[850px]
                                    text-[18px]
                                    leading-8
                                    font-medium
                                    text-modura-primary

                                    md:text-[20px]
                                    md:leading-9
                                "
                            >
                                Building Information Modeling is
                                transforming the way modern construction
                                projects are planned, coordinated and
                                delivered. By bringing different
                                disciplines together within a connected
                                digital environment, BIM creates a more
                                efficient and coordinated project workflow.
                            </p>

                            {/* =================================================
                                DIVIDER
                            ================================================= */}

                            <div
                                className="
                                    my-10
                                    flex
                                    items-center
                                    gap-4
                                "
                            >
                                <span
                                    className="
                                        h-[2px]
                                        w-12
                                        bg-modura-secondary
                                    "
                                />

                                <span
                                    className="
                                        h-px
                                        flex-1
                                        bg-modura-gray-200
                                    "
                                />
                            </div>

                            {/* =================================================
                                H3
                            ================================================= */}

                            <h3
                                className="
                                    text-[27px]
                                    leading-tight
                                    font-bold
                                    text-modura-primary

                                    md:text-[32px]
                                "
                            >
                                A More Connected Approach To Construction
                            </h3>

                            <p
                                className="
                                    mt-5
                                    text-[15px]
                                    leading-8
                                    text-modura-gray-600
                                "
                            >
                                Traditional construction workflows often
                                require multiple teams to work with separate
                                drawings, documents and project information.
                                BIM brings these elements together into a
                                coordinated digital model, allowing project
                                teams to work with a shared understanding of
                                the design.
                            </p>

                            <p
                                className="
                                    mt-5
                                    text-[15px]
                                    leading-8
                                    text-modura-gray-600
                                "
                            >
                                This connected approach can improve
                                communication between architects, engineers,
                                contractors and other stakeholders while
                                making it easier to identify potential
                                conflicts before construction begins.
                            </p>

                            {/* =================================================
                                H4
                            ================================================= */}

                            <h4
                                className="
                                    mt-10
                                    text-[20px]
                                    font-bold
                                    text-modura-primary
                                "
                            >
                                Key Benefits Of BIM
                            </h4>

                            {/* =================================================
                                LIST
                            ================================================= */}

                            <ul className="mt-5 space-y-4">
                                <li
                                    className="
                                        flex
                                        gap-4
                                        text-[15px]
                                        leading-7
                                        text-modura-gray-600
                                    "
                                >
                                    <span
                                        className="
                                            mt-[10px]
                                            h-[7px]
                                            w-[7px]
                                            shrink-0
                                            rotate-45
                                            bg-modura-secondary
                                        "
                                    />

                                    <span>
                                        Better coordination between
                                        architectural, structural and
                                        engineering disciplines.
                                    </span>
                                </li>

                                <li
                                    className="
                                        flex
                                        gap-4
                                        text-[15px]
                                        leading-7
                                        text-modura-gray-600
                                    "
                                >
                                    <span
                                        className="
                                            mt-[10px]
                                            h-[7px]
                                            w-[7px]
                                            shrink-0
                                            rotate-45
                                            bg-modura-secondary
                                        "
                                    />

                                    <span>
                                        Early identification of design
                                        conflicts and potential project
                                        issues.
                                    </span>
                                </li>

                                <li
                                    className="
                                        flex
                                        gap-4
                                        text-[15px]
                                        leading-7
                                        text-modura-gray-600
                                    "
                                >
                                    <span
                                        className="
                                            mt-[10px]
                                            h-[7px]
                                            w-[7px]
                                            shrink-0
                                            rotate-45
                                            bg-modura-secondary
                                        "
                                    />

                                    <span>
                                        Improved project visualization and
                                        communication throughout the
                                        construction lifecycle.
                                    </span>
                                </li>

                                <li
                                    className="
                                        flex
                                        gap-4
                                        text-[15px]
                                        leading-7
                                        text-modura-gray-600
                                    "
                                >
                                    <span
                                        className="
                                            mt-[10px]
                                            h-[7px]
                                            w-[7px]
                                            shrink-0
                                            rotate-45
                                            bg-modura-secondary
                                        "
                                    />

                                    <span>
                                        More organized project information
                                        for better decision-making.
                                    </span>
                                </li>
                            </ul>

                            {/* =================================================
                                H3
                            ================================================= */}

                            <h3
                                className="
                                    mt-12
                                    text-[27px]
                                    leading-tight
                                    font-bold
                                    text-modura-primary

                                    md:text-[32px]
                                "
                            >
                                Improving Project Delivery
                            </h3>

                            <p
                                className="
                                    mt-5
                                    text-[15px]
                                    leading-8
                                    text-modura-gray-600
                                "
                            >
                                As construction projects become more
                                complex, coordinated digital workflows are
                                becoming increasingly valuable. BIM allows
                                teams to access project information in a more
                                structured way and supports better
                                collaboration from early design through
                                construction.
                            </p>

                            <p
                                className="
                                    mt-5
                                    text-[15px]
                                    leading-8
                                    text-modura-gray-600
                                "
                            >
                                The result is a more informed project
                                environment where teams can identify
                                challenges earlier, communicate more clearly
                                and make decisions using a shared digital
                                representation of the project.
                            </p>

                            {/* =================================================
                                H4
                            ================================================= */}

                            <h4
                                className="
                                    mt-10
                                    text-[20px]
                                    font-bold
                                    text-modura-primary
                                "
                            >
                                The Future Of Digital Construction
                            </h4>

                            <p
                                className="
                                    mt-5
                                    text-[15px]
                                    leading-8
                                    text-modura-gray-600
                                "
                            >
                                BIM continues to evolve alongside new digital
                                tools, automation and data-driven
                                construction practices. As these technologies
                                develop, integrated digital workflows will
                                play an increasingly important role in
                                creating efficient, coordinated and
                                intelligent built environments.
                            </p>

                            {/* =================================================
                                HIGHLIGHT
                            ================================================= */}

                            <div
                                className="
                                    mt-12
                                    border-l-4
                                    border-modura-secondary
                                    bg-modura-off-white
                                    px-6
                                    py-6

                                    md:px-8
                                "
                            >
                                <p
                                    className="
                                        text-[16px]
                                        leading-8
                                        font-medium
                                        text-modura-primary
                                    "
                                >
                                    Better coordination begins with better
                                    information. BIM provides the foundation
                                    for bringing people, processes and project
                                    data together.
                                </p>
                            </div>
                        </article>

                        {/* =================================================
                            RIGHT — 30%
                            STAYS FIXED / STICKY
                        ================================================= */}

                        <aside
                            className="
                                related-sidebar
                                min-w-0
                            "
                        >
                            <div
                                className="
                                    lg:sticky
                                    lg:top-28
                                "
                            >
                                {/* =================================================
                                    SIDEBAR HEADER
                                ================================================= */}

                                <div className="mb-7">
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
                                                text-[12px]
                                                font-bold
                                                tracking-[0.3em]
                                                text-modura-secondary
                                                uppercase
                                            "
                                        >
                                            EXPLORE MORE
                                        </span>
                                    </div>

                                    <h2
                                        className="
                                            text-[28px]
                                            leading-tight
                                            font-bold
                                            uppercase
                                            text-modura-primary
                                        "
                                    >
                                        Related
                                        <span
                                            className="
                                                ml-2
                                                text-modura-secondary
                                            "
                                        >
                                            Blogs
                                        </span>
                                    </h2>
                                </div>

                                {/* =================================================
                                    RELATED BLOGS
                                ================================================= */}

                                <div
                                    className="
                                        border-t
                                        border-modura-gray-200
                                    "
                                >
                                    {relatedBlogs.map((blog) => (
                                        <Link
                                            key={blog.slug}
                                            href={`/blogdetail`}
                                            className="
                                                related-card
                                                group
                                                block
                                                border-b
                                                border-modura-gray-200
                                                py-6
                                            "
                                        >
                                            {/* IMAGE */}

                                            <div
                                                className="
                                                    relative
                                                    h-[170px]
                                                    overflow-hidden
                                                    bg-modura-light
                                                "
                                            >
                                                <Image
                                                    src={blog.image}
                                                    alt={blog.title}
                                                    fill
                                                    sizes="300px"
                                                    className="
                                                        object-cover
                                                        transition-transform
                                                        duration-700
                                                        group-hover:scale-105
                                                    "
                                                />

                                                {/* CORNER ARROW */}

                                                <span
                                                    className="
                                                        absolute
                                                        right-3
                                                        top-3
                                                        flex
                                                        h-8
                                                        w-8
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
                                                        size={14}
                                                    />
                                                </span>
                                            </div>

                                            {/* DATE */}

                                            <p
                                                className="
                                                    mt-4
                                                    text-[9px]
                                                    font-bold
                                                    tracking-[0.2em]
                                                    text-modura-secondary
                                                    uppercase
                                                "
                                            >
                                                {blog.date}
                                            </p>

                                            {/* TITLE */}

                                            <h3
                                                className="
                                                    mt-2
                                                    text-[17px]
                                                    leading-6
                                                    font-bold
                                                    text-modura-primary
                                                    transition-colors
                                                    duration-300
                                                    group-hover:text-modura-secondary
                                                "
                                            >
                                                {blog.title}
                                            </h3>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </>
    );
}