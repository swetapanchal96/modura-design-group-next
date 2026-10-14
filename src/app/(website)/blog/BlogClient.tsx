'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import axios from 'axios';
import { apiUrl } from '@/app/(website)/config';
import gsap from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
    FiArrowLeft,
    FiArrowRight,
    FiArrowUpRight,
} from 'react-icons/fi';

import Breadcrumb from '../../../components/Breadcrumb';
import breadcrumb from '@/app/(website)/assets/images/breadcrumb.jpg';

gsap.registerPlugin(ScrollTrigger);


interface Blog {
    id: number;
    title: string;
    slug: string;
    description: string;
    imageUrl: string;
    publishedAt: string;
}

const getShortDescription = (html: string, limit = 130) => {
    const text = html
        .replace(/<[^>]*>/g, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/\s+/g, ' ')
        .trim();

    return text.length > limit
        ? text.substring(0, limit).trimEnd() + '...'
        : text;
};


/* =========================================================
   BLOG PAGE
========================================================= */

export default function BlogClient() {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [totalPages, setTotalPages] = useState(1);

    const blogsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);



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


    useEffect(() => {
        const controller = new AbortController();

        const fetchBlogs = async () => {
            try {
                const response = await axios.post(
                    `${apiUrl}/blogs`,
                    {
                        page: currentPage,
                        limit: blogsPerPage,
                    },
                    {
                        signal: controller.signal,
                    }
                );

                if (response.data.success) {
                    setBlogs(response.data.data.items ?? []);
                    setTotalPages(
                        response.data.data.pagination?.totalPages ?? 1
                    );
                }
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error('Blog API Error:', error);
                }
            }
        };

        fetchBlogs();

        return () => controller.abort();
    }, [currentPage]);

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
                        {blogs.map((blog, index) => (
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
                                        href={`/blogdetail/${encodeURIComponent(blog.slug)}`}
                                        aria-label={`Read ${blog.title}`}
                                        className="
                                            absolute
                                            inset-0
                                            z-10
                                        "
                                    >
                                        <Image
                                            src={blog.imageUrl}
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
                                        {blog.publishedAt
                                            ? new Date(blog.publishedAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: '2-digit',
                                            })
                                            : ''}
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
                                            href={`/blogdetail/${encodeURIComponent(blog.slug)}`}
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
                                        {getShortDescription(blog.description, 123)}
                                    </p>

                                    {/* =================================================
                                        CLICKABLE READ MORE
                                    ================================================= */}

                                    <Link
                                        href={`/blogdetail/${encodeURIComponent(blog.slug)}`}
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