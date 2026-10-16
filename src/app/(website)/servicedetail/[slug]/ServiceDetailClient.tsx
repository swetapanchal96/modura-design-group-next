'use client';

import Image from 'next/image';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import DOMPurify from 'dompurify';
import { apiUrl } from '@/app/(website)/config';
import gsap from 'gsap';
import {
    FiArrowUpRight,
    FiCheck,
    FiChevronDown,
    FiClock,
    FiFileText,
    FiLayers,
} from 'react-icons/fi';
import Breadcrumb from '@/components/Breadcrumb';
import breadcrumb from '@/app/(website)/assets/images/breadcrumb.jpg';

interface ServiceFAQ {
    id: number;
    question: string;
    answer: string;
}

interface ServiceBlog {
    id: number;
    title: string;
    slug: string;
    description: string;
    imageUrl: string;
    publishedAt: string;
}



interface ServiceDetail {
    id: number;
    title: string;
    slug: string;
    shortDescription: string | null;
    description: string | null;
    imageUrl: string | null;
    category: {
        id: number;
        name: string;
        slug: string;
    } | null;
    faqs: ServiceFAQ[];
    blogs: ServiceBlog[];
}

export default function ServiceDetailClient() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const { slug } = useParams<{ slug: string }>();

    const [service, setService] = useState<ServiceDetail | null>(null);
    const [serviceLoading, setServiceLoading] = useState(true);
    const [serviceError, setServiceError] = useState('');

    const sectionRef = useRef(null);

    // service detail api

    useEffect(() => {
        const controller = new AbortController();

        const fetchServiceDetail = async () => {
            setServiceLoading(true);
            setServiceError('');
            setService(null);
            setOpenFaq(0);

            try {
                const response = await axios.post(
                    `${apiUrl}/serviceDetail`,
                    { slug },
                    { signal: controller.signal }
                );

                if (controller.signal.aborted) return;

                if (
                    response.data?.success === true &&
                    response.data?.data &&
                    !Array.isArray(response.data.data) &&
                    response.data.data.slug === slug
                ) {
                    const data = response.data.data;

                    setService({
                        id: data.id,
                        title: data.title,
                        slug: data.slug,
                        shortDescription: data.shortDescription ?? null,
                        description: data.description ?? null,
                        imageUrl: data.imageUrl ?? null,
                        category: data.category ?? null,
                        faqs: Array.isArray(data.faqs)
                            ? data.faqs
                            : [],
                        blogs: Array.isArray(data.blogs)
                            ? data.blogs
                                .filter((blog: ServiceBlog) => blog.slug)
                                .sort(
                                    (a: ServiceBlog, b: ServiceBlog) =>
                                        new Date(b.publishedAt).getTime() -
                                        new Date(a.publishedAt).getTime()
                                )
                                .slice(0, 3)
                            : [],
                    });
                } else {
                    setServiceError(
                        'Service details are currently not available.'
                    );
                }
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error('Service Detail API Error:', error);

                    setServiceError(
                        'Unable to load service details. Please try again.'
                    );
                }
            } finally {
                if (!controller.signal.aborted) {
                    setServiceLoading(false);
                }
            }
        };

        if (slug) {
            fetchServiceDetail();
        } else {
            setServiceLoading(false);
            setServiceError('Service not found.');
        }

        return () => controller.abort();
    }, [slug]);

    const formatServiceBlogDate = (date: string) => {
        if (!date) return '';

        const parsed = new Date(date);

        if (Number.isNaN(parsed.getTime())) return '';

        return parsed.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            timeZone: 'UTC',
        });
    };

    const getServiceBlogExcerpt = (
        html: string,
        limit = 130
    ) => {
        if (!html) return '';

        const plainText = DOMPurify.sanitize(html, {
            ALLOWED_TAGS: [],
            ALLOWED_ATTR: [],
        })
            .replace(/\u00a0/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

        return plainText.length > limit
            ? `${plainText.slice(0, limit).trimEnd()}...`
            : plainText;
    };

    useLayoutEffect(() => {
        if (!service?.blogs?.length) return;

        const ctx = gsap.context(() => {
            gsap.from('.company-blog-heading', {
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
    }, [service]);

    if (serviceLoading) {
        return (
            <div className="flex min-h-[450px] items-center justify-center bg-modura-white text-[15px] text-modura-gray-600">
                Loading service details...
            </div>
        );
    }

    if (!service) {
        return (
            <div className="flex min-h-[450px] items-center justify-center bg-modura-white px-5 text-center text-[16px] text-modura-primary">
                {serviceError || 'Service not found.'}
            </div>
        );
    }

    return (
        <>
            {/* =================================================
                BREADCRUMB
            ================================================= */}

            <Breadcrumb
                title={service.title}
                image={breadcrumb.src}
                breadcrumbs={[
                    {
                        label: 'Home',
                        href: '/',
                    },
                    ...(service.category
                        ? [
                            {
                                label: service.category.name,
                            },
                        ]
                        : []),
                    {
                        label: service.title,
                    },
                ]}
            />

            {/* =================================================
                SERVICE INTRO
            ================================================= */}

            <section
                className="
                    relative
                    overflow-hidden
                    bg-modura-white
                    pt-12
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
                                {service.imageUrl && (
                                    <Image
                                        src={service.imageUrl}
                                        alt={service.title}
                                        fill
                                        unoptimized
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
                                )}

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
                                    text-[35px]
                                    leading-[1.02]
                                    font-bold
                                    tracking-[-0.045em]
                                    text-modura-primary

                                    sm:text-[44px]
                                    md:text-[45px]
                                    
                                "
                            >
                                {service.title}
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
                    border-none
                    md-border-t
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

                            /* =========================
                            HEADINGS
                            ========================== */

                            [&_h3]:mt-5!
                            [&_h3]:mb-3!
                            [&_h3]:text-[24px]!
                            [&_h3]:leading-[1.25]!
                            [&_h3]:font-bold!
                            [&_h3]:tracking-[-0.025em]!
                            [&_h3]:text-modura-primary!

                            [&_h4]:mt-5!
                            [&_h4]:mb-3!
                            [&_h4]:text-[26px]!
                            [&_h4]:leading-tight!
                            [&_h4]:font-bold!
                            [&_h4]:tracking-[-0.025em]!
                            [&_h4]:text-modura-primary!

                            [&_h5]:mt-4!
                            [&_h5]:mb-3!
                            [&_h5]:text-[20px]!
                            [&_h5]:leading-tight!
                            [&_h5]:font-bold!
                            [&_h5]:text-modura-primary!


                            /* =========================
                            NORMAL PARAGRAPHS
                            ========================== */

                            [&_p]:mt-0!
                            [&_p]:mb-3!
                            [&_p]:text-[16px]!
                            [&_p]:leading-[1.55]!
                            [&_p]:text-modura-gray-600!


                            /* =========================
                            LIST
                            ========================== */

                            [&_ul]:my-3!
                            [&_ul]:grid!
                            [&_ul]:grid-cols-1!
                            [&_ul]:gap-y-2!
                            [&_ul]:gap-x-14!
                            [&_ul]:pl-0!
                            [&_ul]:list-none!


                            /* =========================
                            LIST ITEM
                            ========================== */

                            [&_li]:relative!
                            [&_li]:block!
                            [&_li]:min-h-0!
                            [&_li]:pl-[38px]!
                            [&_li]:text-[14px]!
                            [&_li]:leading-[1.5]!
                            [&_li]:text-modura-gray-600!


                            /* =========================
                            EDITOR <P> INSIDE <LI>
                            ========================== */

                            [&_li>p]:mt-0!
                            [&_li>p]:mb-0!
                            [&_li>p]:p-0!
                            [&_li>p]:text-[16px]!
                            [&_li>p]:leading-[1.5]!
                            [&_li>p]:text-modura-gray-600!


                            /* =========================
                            REMOVE EDITOR BR
                            ========================== */

                            [&_li>p>br]:hidden!


                            /* =========================
                            STRONG / BOLD
                            ========================== */

                            [&_strong]:font-bold!
                            [&_b]:font-bold!


                            /* =========================
                            BULLET BLOCK
                            ========================== */

                            [&_li]:before:absolute!
                            [&_li]:before:left-0!
                            [&_li]:before:top-[8px]!
                            [&_li]:before:h-[7px]!
                            [&_li]:before:w-[7px]!
                            [&_li]:before:bg-modura-primary!


                            /* =========================
                            TECHNICAL LINE
                            ========================== */

                            [&_li]:after:absolute!
                            [&_li]:after:left-[7px]!
                            [&_li]:after:top-[11px]!
                            [&_li]:after:h-px!
                            [&_li]:after:w-[22px]!
                            [&_li]:after:bg-modura-gray-300!
                        "
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(
                                service.description || '',
                                {
                                    FORBID_ATTR: [
                                        'style',
                                        'class',
                                        'id',
                                        'dir',
                                    ],
                                }
                            ),
                        }}
                    />

                </div>

            </section>

            {/* =================================================
                FAQ SECTION
            ================================================= */}

            {service.faqs.length > 0 && (
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
                                {` ${service.title.toLowerCase()}`} services.
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
                                                ${isOpen
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
            )}

            {/* =================================================
                RELATED BLOGS / LATEST INSIGHTS
            ================================================= */}

            {service.blogs.length > 0 && (
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

                            {service.blogs.map((blog) => (

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
                                            {formatServiceBlogDate(blog.publishedAt)}
                                        </p>


                                        {/* TITLE */}

                                        <Link
                                            href={`/blogdetail/${encodeURIComponent(blog.slug)}`}
                                            className="
                                            mt-2
                                            text-[20px]
                                            leading-7
                                            font-bold
                                            tracking-[-0.02em]
                                            text-modura-primary!
                                        "
                                        >
                                            {blog.title}
                                        </Link>


                                        {/* DESCRIPTION */}

                                        <p
                                            className="
                                            mt-4
                                            text-[14px]
                                            leading-6
                                            text-modura-secondary
                                        "
                                        >
                                            {getServiceBlogExcerpt(blog.description, 130)}
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
        </>
    );
}