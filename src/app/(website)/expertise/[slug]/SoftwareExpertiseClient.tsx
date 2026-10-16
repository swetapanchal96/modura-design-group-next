'use client';

import Image from 'next/image';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import DOMPurify from 'dompurify';
import { apiUrl } from '@/app/(website)/config';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
    FiArrowDown,
    FiChevronDown,
    FiCheck,
    FiLayers,
    FiPenTool,
    FiArrowUpRight,
} from 'react-icons/fi';

import Breadcrumb from '@/components/Breadcrumb';

import breadcrumb from '@/app/(website)/assets/images/breadcrumb.jpg';
import Link from 'next/link';


gsap.registerPlugin(ScrollTrigger);

interface SoftwareFAQ {
    id: number;
    question: string;
    answer: string;
}

interface RelatedBlog {
    id: number;
    title: string;
    slug: string;
    description: string;
    imageUrl: string;
    publishedAt: string;
}

interface SoftwareDetail {
    id: number;
    name: string;
    slug: string;
    shortDescription: string | null;
    longDescription: string | null;
    imageUrl: string | null;
    faqs: SoftwareFAQ[];
    relatedBlogs: RelatedBlog[];
}

const formatBlogDate = (date: string) => {
    if (!date) return '';

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) return '';

    return parsed.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
    });
};

const getBlogExcerpt = (
    html: string,
    limit: number = 130
) => {
    if (!html) return '';

    const text = DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [],
        ALLOWED_ATTR: [],
    })
        .replace(/\u00a0/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    return text.length > limit
        ? `${text.slice(0, limit).trimEnd()}...`
        : text;
};

export default function SoftwareExpertiseClient() {
    const pageRef = useRef<HTMLDivElement | null>(null);

    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const { slug } = useParams<{ slug: string }>();

    const [software, setSoftware] = useState<SoftwareDetail | null>(null);
    const [softwareLoading, setSoftwareLoading] = useState(true);
    const [softwareError, setSoftwareError] = useState('');

    useEffect(() => {
        if (!slug) {
            setSoftware(null);
            setSoftwareError('Software expertise not found.');
            setSoftwareLoading(false);
            return;
        }

        const controller = new AbortController();

        const fetchSoftwareDetail = async () => {
            setSoftwareLoading(true);
            setSoftwareError('');
            setSoftware(null);
            setOpenFaq(0);

            try {
                const response = await axios.post(
                    `${apiUrl}/softwareExpertise`,
                    { slug },
                    { signal: controller.signal }
                );

                if (response.data?.success === true) {
                    const data = response.data.data;

                    // Supports an array or a single object response
                    const selectedSoftware: SoftwareDetail | null =
                        Array.isArray(data)
                            ? data.find(
                                (item: SoftwareDetail) =>
                                    item.slug === slug
                            ) || null
                            : data?.slug === slug
                                ? data
                                : null;

                    if (selectedSoftware) {
                        setSoftware({
                            ...selectedSoftware,

                            faqs: Array.isArray(selectedSoftware.faqs)
                                ? selectedSoftware.faqs
                                : [],

                            relatedBlogs: Array.isArray(selectedSoftware.relatedBlogs)
                                ? selectedSoftware.relatedBlogs
                                    .filter((blog: RelatedBlog) => blog.slug)
                                    .sort(
                                        (a: RelatedBlog, b: RelatedBlog) =>
                                            new Date(b.publishedAt).getTime() -
                                            new Date(a.publishedAt).getTime()
                                    )
                                    .slice(0, 3)
                                : [],
                        });
                    } else {
                        setSoftwareError(
                            'Software expertise not found.'
                        );
                    }
                } else {
                    setSoftwareError(
                        response.data?.message ||
                        'Software expertise not found.'
                    );
                }
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error(
                        'Software Detail API Error:',
                        error
                    );

                    setSoftwareError(
                        'Unable to load software expertise. Please try again.'
                    );
                }
            } finally {
                if (!controller.signal.aborted) {
                    setSoftwareLoading(false);
                }
            }
        };

        fetchSoftwareDetail();

        return () => controller.abort();
    }, [slug]);

    /*
    ============================================================
        GSAP ANIMATION
    ============================================================
    */

    useLayoutEffect(() => {
        if (!software) return;

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
    }, [software]);

    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        if (!software) return;
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
    }, [software]);

    if (softwareLoading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center bg-modura-white text-[15px] text-modura-gray-600">
                Loading software expertise...
            </div>
        );
    }

    if (!software) {
        return (
            <div className="flex min-h-[400px] items-center justify-center bg-modura-white px-5 text-center text-[16px] text-modura-primary">
                {softwareError || 'Software expertise is currently not available.'}
            </div>
        );
    } ``

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
                    py-12

                    md:py-14
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
                            mt-8
                            flex
                            justify-center

                            md:mt-10
                        "
                    >
                        {/* =================================================
                            IMAGE FRAME
                        ================================================= */}

                        <div
                            className="
                                relative
                                inline-block
                                max-w-full
                            "
                        >

                            {/* =================================================
                                TOP LEFT BORDER
                            ================================================= */}

                            <span
                                className="
                                    pointer-events-none
                                    absolute
                                    top-[-15px]
                                    left-[-15px]
                                    z-20

                                    h-[75px]
                                    w-[75px]

                                    border-t-[4px]
                                    border-l-[4px]
                                    border-modura-primary

                                    md:h-[90px]
                                    md:w-[90px]
                                "
                            />

                            {/* =================================================
                                BOTTOM RIGHT BORDER
                            ================================================= */}

                            <span
                                className="
                                    pointer-events-none
                                    absolute
                                    right-[-12px]
                                    bottom-[-12px]
                                    z-20

                                    h-[75px]
                                    w-[75px]

                                    border-r
                                    border-b
                                    border-modura-secondary

                                    md:h-[90px]
                                    md:w-[90px]
                                "
                            />

                            {/* =================================================
                                ACTUAL IMAGE
                            ================================================= */}

                            {software.imageUrl && (
                                <Image
                                    src={software.imageUrl}
                                    alt={`${software.name} software expertise`}
                                    width={1200}
                                    height={700}
                                    unoptimized
                                    priority
                                    sizes="
                                        (max-width: 640px) 92vw,
                                        (max-width: 1024px) 85vw,
                                        1200px
                                    "
                                    className="
                                        block
                                        h-auto
                                        w-auto
                                        max-w-full
                                        object-contain
                                        transition-transform
                                        duration-700
                                        hover:scale-[1.02]
                                    "
                                />
                            )}

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
                            mb-2
                            flex
                            items-center
                            gap-4
                        "
                    >



                        <span
                            className="
                                text-[15px]
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
                            [&_h4]:mt-4
                            [&_h4]:text-[25px]
                            [&_h4]:leading-[1.15]
                            [&_h4]:font-bold
                            [&_h4]:tracking-[-0.025em]
                            [&_h4]:text-modura-primary

                            first:[&_h4]:mt-0

                            [&_h5]:mb-3
                            [&_h5]:mt-3
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

                            /* =================================================
                            SOFTWARE EXPERTISE — CREATIVE POINTER
                            ================================================= */

                            [&_li]:relative
                            [&_li]:pl-7
                            [&_li]:text-[14px]
                            [&_li]:leading-6
                            [&_li]:text-modura-gray-600

                            /* OUTER CROSS */

                            [&_li]:before:absolute
                            [&_li]:before:left-0
                            [&_li]:before:top-1/2
                            [&_li]:before:h-3.5
                            [&_li]:before:w-3.5
                            [&_li]:before:-translate-y-1/2
                            [&_li]:before:border
                            [&_li]:before:border-modura-primary
                            [&_li]:before:rotate-45

                            /* CENTER DOT */

                            [&_li]:after:absolute
                            [&_li]:after:left-1.25
                            [&_li]:after:top-1/2
                            [&_li]:after:h-1
                            [&_li]:after:w-1
                            [&_li]:after:-translate-y-1/2
                            [&_li]:after:rounded-full
                            [&_li]:after:bg-modura-secondary
                        "
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(
                                software.longDescription || '',
                                {
                                    FORBID_ATTR: ['style'],
                                }
                            ),
                        }}
                    />
                </div>
            </section>

            {/* =================================================
                FAQ
            ================================================= */}

            {software.faqs.length > 0 && (
            <section
                className="
                    software-faq
                    relative
                    overflow-hidden
                    border-t
                    border-modura-gray-200
                    bg-modura-light
                    py-12
                    md:py-14
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
                                    text-[13px]
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
                                    key={faq.id}
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

                                            {/* NUMBER */}

                                            <span
                                                className={`
                                                    flex
                                                    h-9
                                                    w-9
                                                    shrink-0
                                                    items-center
                                                    justify-center
                                                    text-[12px]
                                                    font-bold
                                                    transition-all
                                                    duration-300
                                                    ${isOpen
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
                                                ${isOpen
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
                                            ${isOpen
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

                                                    md:px-5
                                                    md:py-5
                                                    md:pl-[84px]
                                                "
                                            >

                                                <p
                                                    className="
                                                        max-w-[760px]
                                                        text-[15px]
                                                        leading-5
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
            )}

            {/* =================================================
                RELATED BLOGS / LATEST INSIGHTS
            ================================================= */}
            {software.relatedBlogs.length > 0 && (
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

                        <Link
                            href="/blog"
                            
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
                                            hover:text-modura-white!
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

                        </Link>

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

                        {software.relatedBlogs.map((blog) => (

                            <article
                                key={blog.id}
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
                                        src={blog.imageUrl}
                                        fill
                                        unoptimized
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
                                        {formatBlogDate(blog.publishedAt)}
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
                                        {getBlogExcerpt(blog.description, 130)}
                                    </p>


                                    {/* =================================================
                                                    READ MORE
                                                ================================================= */}

                                    <Link
                                     href={`/blogdetail/${encodeURIComponent(blog.slug)}`}
                                        
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

                                    </Link>

                                </div>

                            </article>

                        ))}

                    </div>

                </div>

            </section>
            )}
        </div>
    );
}