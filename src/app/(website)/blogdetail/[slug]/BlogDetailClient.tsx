'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import DOMPurify from 'dompurify';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { apiUrl } from '@/app/(website)/config';
import {
    FiArrowUpRight,
    FiCalendar,
} from 'react-icons/fi';

import Breadcrumb from '../../../../components/Breadcrumb';
import breadcrumb from '@/app/(website)/assets/images/breadcrumb.jpg';


gsap.registerPlugin(ScrollTrigger);

interface RelatedBlog {
    id: number;
    title: string;
    slug: string;
    imageUrl: string;
    publishedAt: string;
}

interface BlogDetailData {
    id: number;
    title: string;
    slug: string;
    description: string;
    imageUrl: string;
    publishedAt: string;
    recent: RelatedBlog[];
}

const formatBlogDate = (date: string) => {
    if (!date) return '';

    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    });
};



/* =========================================================
   BLOG DETAIL
========================================================= */

export default function BlogDetailClient() {
    const sectionRef = useRef<HTMLDivElement | null>(null);

    const params = useParams<{ slug: string }>();

    const slug = params.slug;

    const [currentBlog, setCurrentBlog] = useState<BlogDetailData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const relatedBlogs = currentBlog?.recent ?? [];

    useLayoutEffect(() => {

        if (!currentBlog) return;

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
    }, [currentBlog]);

    useEffect(() => {
        if (!slug) return;

        const controller = new AbortController();

        const fetchBlogDetail = async () => {
            setLoading(true);
            setError('');
            setCurrentBlog(null);

            try {
                const response = await axios.post(
                    `${apiUrl}/blogDetail`,
                    {
                        slug: slug,
                    },
                    {
                        signal: controller.signal,
                    }
                );

                if (response.data.success && response.data.data) {
                    setCurrentBlog(response.data.data);
                } else {
                    setError('Blog not found.');
                }
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error('Blog Detail API Error:', error);
                    setError('Unable to load blog details.');
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchBlogDetail();

        return () => controller.abort();
    }, [slug]);

    if (loading) {
        return <div className="min-h-screen bg-modura-white" />;
    }

    if (error || !currentBlog) {
        return (
            <div className="min-h-screen py-20 text-center">
                {error || 'Blog not found.'}
            </div>
        );
    }

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
                        label: currentBlog.title,
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
                                {formatBlogDate(currentBlog.publishedAt)}
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
                            src={currentBlog.imageUrl}
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
                            <div
                                className="
                                    max-w-full
                                    text-modura-gray-600

                                    [&_p]:mt-5
                                    [&_p]:text-[15px]
                                    [&_p]:leading-6
                                    [&_p]:text-modura-gray-600

                                    [&_p:first-child]:mt-0

                                    [&_h3]:mt-12
                                    [&_h3]:text-[27px]
                                    [&_h3]:leading-tight
                                    [&_h3]:font-bold
                                    [&_h3]:text-modura-primary
                                    md:[&_h3]:text-[32px]

                                    [&_h4]:mt-10
                                    [&_h4]:text-[20px]
                                    [&_h4]:font-bold
                                    [&_h4]:text-modura-primary

                                    [&_ul]:mt-5
                                    [&_ul]:list-none
                                    [&_ul]:space-y-4
                                    [&_ul]:pl-0

                                    [&_li]:relative
                                    [&_li]:pl-5
                                    [&_li]:text-[15px]
                                    [&_li]:leading-7
                                    [&_li]:mb-0
                                    [&_li]:text-modura-gray-600

                                    [&_li]:before:absolute
                                    [&_li]:before:top-[10px]
                                    [&_li]:before:left-1
                                    [&_li]:before:h-[7px]
                                    [&_li]:before:w-[7px]
                                    [&_li]:before:rotate-45
                                    [&_li]:before:bg-modura-secondary
                                    [&_li]:before:content-['']

                                    [&_ol]:mt-5
                                    [&_ol]:list-decimal
                                    [&_ol]:pl-6

                                    [&_ol_li]:pl-2
                                    [&_ol_li]:before:hidden

                                    [&_strong]:font-bold
                                "
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(currentBlog.description || '', {
                                        FORBID_ATTR: ['style'],
                                    }),
                                }}
                            />
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
                                            href={`/blogdetail/${encodeURIComponent(blog.slug)}`}
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
                                                    src={blog.imageUrl}
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
                                                {formatBlogDate(blog.publishedAt)}
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