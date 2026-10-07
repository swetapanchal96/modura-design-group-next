'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLayoutEffect, useRef, useState } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
    FiArrowLeft,
    FiArrowRight,
    FiArrowUpRight,
} from 'react-icons/fi';

import Breadcrumb from '../components/Breadcrumb';
import breadcrumb from '@/app/assets/images/breadcrumb.jpg';

import blog1 from '@/app/assets/images/about-1.jpg';
import blog2 from '@/app/assets/images/about-2.jpg';
import blog3 from '@/app/assets/images/about-3.jpg';
import blog4 from '@/app/assets/images/bim-services.jpg';
import blog5 from '@/app/assets/images/architectural-engineering.jpg';
import blog6 from '@/app/assets/images/about-1.jpg';

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   BLOG DATA
========================================================= */

const blogs = [
    {
        title: 'How BIM Is Transforming Modern Construction',
        slug: 'how-bim-is-transforming-modern-construction',
        date: 'June 24, 2026',
        image: blog1.src,
        desc: 'Building Information Modeling (BIM) is revolutionizing the construction industry by improving project coordination, reducing errors.',
    },

    {
        title: 'Future Trends In Architectural Design',
        slug: 'future-trends-in-architectural-design',
        date: 'May 18, 2026',
        image: blog3.src,
        desc: 'Modern architectural design is evolving with sustainable materials, advanced technologies, and innovative planning approaches.',
    },

    {
        title: 'Key Trends In Structural Engineering',
        slug: 'key-trends-in-structural-engineering',
        date: 'April 12, 2026',
        image: blog2.src,
        desc: 'Structural engineering is moving towards smarter solutions with advanced analysis tools, sustainable practices, and improved construction techniques.',
    },

    {
        title: 'The Growing Importance Of BIM Coordination',
        slug: 'the-growing-importance-of-bim-coordination',
        date: 'March 28, 2026',
        image: blog4.src,
        desc: 'Better coordination between disciplines helps construction teams reduce clashes, improve communication and deliver projects more efficiently.',
    },

    {
        title: 'Technology Shaping The Future Of Construction',
        slug: 'technology-shaping-the-future-of-construction',
        date: 'March 10, 2026',
        image: blog5.src,
        desc: 'Digital technologies are changing the way projects are planned, coordinated and delivered across the modern construction industry.',
    },

    {
        title: 'Building Better Through Integrated Design',
        slug: 'building-better-through-integrated-design',
        date: 'February 22, 2026',
        image: blog6.src,
        desc: 'Integrated design approaches bring architecture and engineering disciplines together for better coordination and project outcomes.',
    },

    {
        title: 'Modern Approaches To Architectural Engineering',
        slug: 'modern-approaches-to-architectural-engineering',
        date: 'February 08, 2026',
        image: blog1.src,
        desc: 'Architectural engineering continues to evolve through innovative design methods, digital workflows and improved technical coordination.',
    },

    {
        title: 'Why Detailed Project Documentation Matters',
        slug: 'why-detailed-project-documentation-matters',
        date: 'January 24, 2026',
        image: blog3.src,
        desc: 'Clear and accurate project documentation plays an important role in maintaining consistency from design development through construction.',
    },

    {
        title: 'Smarter Workflows For Complex Projects',
        slug: 'smarter-workflows-for-complex-projects',
        date: 'January 12, 2026',
        image: blog2.src,
        desc: 'Well-structured workflows help project teams coordinate complex requirements while maintaining accuracy and efficiency.',
    },

    {
        title: 'The Role Of Digital Engineering In Construction',
        slug: 'the-role-of-digital-engineering-in-construction',
        date: 'December 22, 2025',
        image: blog4.src,
        desc: 'Digital engineering is helping construction teams improve collaboration, visualization and technical decision making.',
    },

    {
        title: 'Design Coordination For Better Project Delivery',
        slug: 'design-coordination-for-better-project-delivery',
        date: 'December 10, 2025',
        image: blog5.src,
        desc: 'Effective coordination across project disciplines can reduce conflicts and create a smoother path from design to construction.',
    },

    {
        title: 'Creating Efficient Construction Documentation',
        slug: 'creating-efficient-construction-documentation',
        date: 'November 26, 2025',
        image: blog6.src,
        desc: 'Accurate construction documentation provides teams with the information they need to execute projects with confidence.',
    },
];

/* =========================================================
   BLOG PAGE
========================================================= */

export default function BlogPage() {
    const sectionRef = useRef<HTMLDivElement | null>(null);

    const [currentPage, setCurrentPage] = useState(1);

    const blogsPerPage = 6;

    const totalPages = Math.ceil(
        blogs.length / blogsPerPage,
    );

    const startIndex =
        (currentPage - 1) * blogsPerPage;

    const currentBlogs = blogs.slice(
        startIndex,
        startIndex + blogsPerPage,
    );

    /* =====================================================
       GSAP ANIMATION
    ===================================================== */

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.blog-heading',
                {
                    y: 50,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        once: true,
                    },
                },
            );

            gsap.fromTo(
                '.blog-card',
                {
                    y: 70,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                        once: true,
                    },
                },
            );

            gsap.fromTo(
                '.blog-pagination',
                {
                    y: 30,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    delay: 0.3,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'bottom 90%',
                        once: true,
                    },
                },
            );
        }, sectionRef);

        return () => ctx.revert();
    }, [currentPage]);

    /* =====================================================
       CHANGE PAGE
    ===================================================== */

    const changePage = (page: number) => {
        if (page < 1 || page > totalPages) return;

        setCurrentPage(page);

        window.scrollTo({
            top: sectionRef.current
                ? sectionRef.current.offsetTop - 100
                : 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            {/* =================================================
                BREADCRUMB
            ================================================= */}

            <Breadcrumb
                title="Blog"
                image={breadcrumb.src}
            />

            {/* =================================================
                BLOG SECTION
            ================================================= */}

            <section
                ref={sectionRef}
                className="relative overflow-hidden
                    bg-modura-white
                    py-20
                    md:py-14
                "
            >
                {/* =================================================
                    BLUEPRINT BACKGROUND
                ================================================= */}

                <div
                    className="
                        absolute
                        inset-0
                        bg-[url('/images/blueprint-bg.png')]
                        bg-cover
                        opacity-[0.07]
                    "
                />

                {/* =================================================
                    CONTAINER
                ================================================= */}

                <div
                    className="
                        relative
                        mx-auto
                        max-w-325
                        px-5
                        md:px-8
                    "
                >
                    {/* =================================================
    HEADER
================================================= */}

                    <div
                        className="
                            blog-heading
                            mb-8
                            flex
                            flex-col
                            items-start
                            justify-between
                            gap-6
                            lg:flex-row
                            lg:items-end
                        "
                    >
                        <div>

                            <div className="mb-2 flex items-center gap-3">
                                

                                <span
                                    className="
                                        text-[12px]
                                        font-bold
                                        tracking-[0.32em]
                                        text-modura-secondary
                                        uppercase
                                    "
                                >
                                    MODURA JOURNAL
                                </span>
                            </div>

                            <h2
                                className="
                                    text-[36px]
                                    leading-none
                                    font-bold
                                    uppercase
                                    text-modura-primary
                                    md:text-[44px]
                                    lg:text-[48px]
                                "
                            >
                                OUR
                                <span
                                    className="
                                        ml-2
                                        text-modura-secondary
                                    "
                                >
                                    BLOG
                                </span>
                            </h2>

                        </div>
                    </div>

                    {/* =================================================
                        BLOG GRID
                    ================================================= */}

                    <div
                        className="
                            grid
                            grid-cols-1
                            gap-8
                            md:grid-cols-2
                            lg:grid-cols-3
                        "
                    >
                        {currentBlogs.map((blog, index) => (
                            <article
                                key={`${currentPage}-${index}`}
                                className="
                                    blog-card
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

                                <div
                                    className="
                                        relative
                                        h-57.5
                                        overflow-hidden
                                    "
                                >
                                    <Link
                                        href={`/blogdetail`}
                                        aria-label={`Read ${blog.title}`}
                                        className="
                                            absolute
                                            inset-0
                                            z-10
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

                                        <div
                                            className="
                                                absolute
                                                inset-0
                                                bg-gradient-to-t
                                                from-modura-primary/50
                                                to-transparent
                                                opacity-0
                                                transition
                                                duration-500
                                                group-hover:opacity-100
                                            "
                                        />
                                    </Link>
                                </div>

                                {/* =================================================
                                    CONTENT
                                ================================================= */}

                                <div className="p-7">
                                    {/* DATE */}

                                    <p
                                        className="
                                            text-xs
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

                                    <h3
                                        className="
                                            mt-2
                                            text-xl
                                            leading-7
                                            font-bold
                                            text-modura-primary
                                        "
                                    >
                                        <Link
                                            href={`/blogdetail`}
                                            className="
                                                transition-colors
                                                duration-300
                                                hover:text-modura-secondary
                                            "
                                        >
                                            {blog.title}
                                        </Link>
                                    </h3>

                                    {/* DESCRIPTION */}

                                    <p
                                        className="
                                            mt-4
                                            text-sm
                                            leading-6
                                            text-modura-secondary
                                        "
                                    >
                                        {blog.desc}
                                    </p>

                                    {/* =================================================
                                        CLICKABLE READ MORE
                                    ================================================= */}

                                    <Link
                                        href={`/blogdetail`}
                                        className="
                                            group/btn
                                            mt-7
                                            flex
                                            w-fit
                                            items-center
                                            gap-3
                                            text-sm
                                            font-bold
                                            tracking-wider
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
                                                group-hover/btn:text-modura-white
                                            "
                                        >
                                            <FiArrowUpRight
                                                className="
                                                    transition-transform
                                                    duration-300
                                                    group-hover/btn:translate-x-0.5
                                                    group-hover/btn:-translate-y-0.5
                                                "
                                            />
                                        </span>
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* =================================================
                        CREATIVE CENTERED PAGINATION
                    ================================================= */}

                    {totalPages > 1 && (
                        <div
                            className="
                                blog-pagination
                                mt-14
                                flex
                                justify-center
                            "
                        >
                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    border
                                    border-modura-gray-300
                                    bg-modura-white
                                    p-2
                                "
                            >
                                {/* PREVIOUS */}

                                <button
                                    type="button"
                                    aria-label="Previous page"
                                    disabled={
                                        currentPage === 1
                                    }
                                    onClick={() =>
                                        changePage(
                                            currentPage - 1,
                                        )
                                    }
                                    className="
                                        group
                                        relative
                                        flex
                                        h-11
                                        w-11
                                        items-center
                                        justify-center
                                        overflow-hidden
                                        border
                                        border-transparent
                                        text-modura-primary
                                        transition-all
                                        duration-500
                                        hover:border-modura-primary
                                        hover:bg-modura-primary
                                        hover:text-modura-white
                                        disabled:pointer-events-none
                                        disabled:opacity-30
                                    "
                                >
                                    <FiArrowLeft
                                        size={17}
                                        className="
                                            relative
                                            z-10
                                            transition-transform
                                            duration-300
                                            group-hover:-translate-x-1
                                        "
                                    />

                                    <span
                                        className="
                                            absolute
                                            bottom-0
                                            left-0
                                            h-[2px]
                                            w-0
                                            bg-modura-secondary-light
                                            transition-all
                                            duration-500
                                            group-hover:w-full
                                        "
                                    />
                                </button>

                                {/* =================================================
                                    5 PAGE SLIDING WINDOW
                                ================================================= */}

                                <div className="flex items-center gap-1">
                                    {(() => {
                                        const visiblePages = 5;

                                        let startPage = Math.max(
                                            1,
                                            currentPage - 2,
                                        );

                                        let endPage = Math.min(
                                            totalPages,
                                            startPage +
                                            visiblePages -
                                            1,
                                        );

                                        if (
                                            endPage -
                                            startPage +
                                            1 <
                                            visiblePages
                                        ) {
                                            startPage = Math.max(
                                                1,
                                                endPage -
                                                visiblePages +
                                                1,
                                            );
                                        }

                                        return Array.from(
                                            {
                                                length:
                                                    endPage -
                                                    startPage +
                                                    1,
                                            },
                                            (_, index) => {
                                                const page =
                                                    startPage +
                                                    index;

                                                const active =
                                                    page ===
                                                    currentPage;

                                                return (
                                                    <button
                                                        key={page}
                                                        type="button"
                                                        onClick={() =>
                                                            changePage(
                                                                page,
                                                            )
                                                        }
                                                        aria-label={`Go to page ${page}`}
                                                        aria-current={
                                                            active
                                                                ? 'page'
                                                                : undefined
                                                        }
                                                        className={`
                                                            group
                                                            relative
                                                            flex
                                                            h-11
                                                            min-w-11
                                                            items-center
                                                            justify-center
                                                            overflow-hidden
                                                            px-3
                                                            text-[11px]
                                                            font-bold
                                                            tracking-[0.12em]
                                                            transition-all
                                                            duration-500

                                                            ${active
                                                                ? 'bg-modura-primary text-modura-white'
                                                                : 'text-modura-primary hover:bg-modura-gray-100'
                                                            }
                                                        `}
                                                    >
                                                        <span
                                                            className={`
                                                                absolute
                                                                bottom-0
                                                                left-0
                                                                h-[3px]
                                                                bg-modura-secondary-light
                                                                transition-all
                                                                duration-500

                                                                ${active
                                                                    ? 'w-full'
                                                                    : 'w-0 group-hover:w-full'
                                                                }
                                                            `}
                                                        />

                                                        <span className="relative z-10">
                                                            {String(
                                                                page,
                                                            ).padStart(
                                                                2,
                                                                '0',
                                                            )}
                                                        </span>
                                                    </button>
                                                );
                                            },
                                        );
                                    })()}
                                </div>

                                {/* NEXT */}

                                <button
                                    type="button"
                                    aria-label="Next page"
                                    disabled={
                                        currentPage ===
                                        totalPages
                                    }
                                    onClick={() =>
                                        changePage(
                                            currentPage + 1,
                                        )
                                    }
                                    className="
                                        group
                                        relative
                                        flex
                                        h-11
                                        w-11
                                        items-center
                                        justify-center
                                        overflow-hidden
                                        border
                                        border-transparent
                                        bg-modura-primary
                                        text-modura-white
                                        transition-all
                                        duration-500
                                        hover:bg-modura-secondary
                                        disabled:pointer-events-none
                                        disabled:opacity-30
                                    "
                                >
                                    <FiArrowRight
                                        size={17}
                                        className="
                                            relative
                                            z-10
                                            transition-transform
                                            duration-300
                                            group-hover:translate-x-1
                                        "
                                    />

                                    <span
                                        className="
                                            absolute
                                            bottom-0
                                            left-0
                                            h-[3px]
                                            w-0
                                            bg-modura-secondary-light
                                            transition-all
                                            duration-500
                                            group-hover:w-full
                                        "
                                    />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}