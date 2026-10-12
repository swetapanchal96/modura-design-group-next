'use client';

import { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';

import gsap from 'gsap';

import { FiChevronRight, FiHome } from 'react-icons/fi';
import { FaDraftingCompass } from 'react-icons/fa';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    title: string;
    image: string;
    eyebrow?: string;
    breadcrumbs?: BreadcrumbItem[];
}

export default function Breadcrumb({
    title,
    image,
    eyebrow = 'BUILDING A BETTER TOMORROW',
    breadcrumbs,
}: BreadcrumbProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const shapeRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const breadcrumbRef = useRef<HTMLDivElement>(null);

    /*
    |--------------------------------------------------------------------------
    | Breadcrumb Items
    |--------------------------------------------------------------------------
    */

    const items: BreadcrumbItem[] =
        breadcrumbs && breadcrumbs.length > 0
            ? breadcrumbs
            : [
                {
                    label: 'Home',
                    href: '/',
                },
                {
                    label: title,
                },
            ];

    /*
    |--------------------------------------------------------------------------
    | GSAP Animation
    |--------------------------------------------------------------------------
    */

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: {
                    ease: 'power4.out',
                },
            });

            /*
            |--------------------------------------------------------------------------
            | Background Image
            |--------------------------------------------------------------------------
            */

            tl.fromTo(
                imageRef.current,
                {
                    opacity: 0,
                    scale: 1.08,
                    x: 60,
                },
                {
                    opacity: 1,
                    scale: 1,
                    x: 0,
                    duration: 1.1,
                },
            );

            /*
            |--------------------------------------------------------------------------
            | Architectural Diagonal
            |--------------------------------------------------------------------------
            */

            tl.fromTo(
                shapeRef.current,
                {
                    opacity: 0,
                    x: 100,
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.9,
                },
                '-=0.8',
            );

            /*
            |--------------------------------------------------------------------------
            | Main Content
            |--------------------------------------------------------------------------
            */

            tl.fromTo(
                contentRef.current,
                {
                    opacity: 0,
                    x: -50,
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                },
                '-=0.65',
            );

            /*
            |--------------------------------------------------------------------------
            | Breadcrumb
            |--------------------------------------------------------------------------
            */

            tl.fromTo(
                breadcrumbRef.current,
                {
                    opacity: 0,
                    y: 20,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.55,
                },
                '-=0.35',
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="
                relative
                isolate
                h-90
                w-full
                overflow-hidden
                bg-modura-off-white
                md:h-75
                lg:h-87.5
            "
        >
            {/* ============================================================
                BASE
            ============================================================ */}

            <div
                className="
                    absolute
                    inset-0
                    -z-30
                    bg-modura-off-white
                "
            />

            {/* ============================================================
                ARCHITECTURAL GRID
            ============================================================ */}

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    -z-20
                    opacity-30
                "
                style={{
                    backgroundImage: `
                        linear-gradient(
                            var(--breadcrumb-grid-color) 1px,
                            transparent 1px
                        ),
                        linear-gradient(
                            90deg,
                            var(--breadcrumb-grid-color) 1px,
                            transparent 1px
                        )
                    `,
                    backgroundSize: '48px 48px',
                }}
            />

            {/* ============================================================
                RIGHT SIDE IMAGE
            ============================================================ */}

            <div
                ref={imageRef}
                className="
                    absolute
                    inset-y-0
                    right-0
                    -z-10
                    w-[72%]
                    overflow-hidden

                    md:w-[67%]

                    lg:w-[64%]
                "
            >
                {/* IMAGE */}

                <div
                    className="
                        absolute
                        inset-0
                        bg-cover
                        bg-center
                        bg-no-repeat
                    "
                    style={{
                        backgroundImage: `url(${image})`,
                    }}
                />

                {/* IMAGE OVERLAY */}

                <div
                    className="
                        absolute
                        inset-0
                        bg-modura-primary/[0.07]
                    "
                />

                {/* LEFT IMAGE FADE */}

                <div
                    className="
                        absolute
                        inset-y-0
                        left-0
                        w-[52%]
                        bg-gradient-to-r
                        from-modura-off-white
                        via-modura-off-white/95
                        to-transparent
                    "
                />

                {/* BOTTOM IMAGE FADE */}

                <div
                    className="
                        absolute
                        inset-x-0
                        bottom-0
                        h-[20%]
                        bg-gradient-to-t
                        from-modura-primary/15
                        to-transparent
                    "
                />
            </div>

            {/* ============================================================
                MAIN DARK ARCHITECTURAL DIAGONAL
            ============================================================ */}

            <div
                ref={shapeRef}
                className="
                    pointer-events-none
                    absolute
                    top-0
                    right-[27%]
                    z-0
                    h-full
                    w-[250px]

                    md:right-[29%]
                    md:w-[300px]

                    lg:right-[31%]
                    lg:w-[350px]
                "
            >
                {/* MAIN DARK SHAPE */}

                <div
                    className="
                        absolute
                        inset-0
                        bg-modura-primary
                    "
                    style={{
                        clipPath:
                            'polygon(38% 0%, 100% 0%, 62% 100%, 0% 100%)',
                    }}
                />

                {/* ARCHITECTURAL INTERNAL LINES */}

                <div
                    className="
                        absolute
                        inset-0
                        opacity-40
                    "
                    style={{
                        clipPath:
                            'polygon(38% 0%, 100% 0%, 62% 100%, 0% 100%)',
                        backgroundImage: `
                            linear-gradient(
                                125deg,
                                transparent 48%,
                                color-mix(
                                    in srgb,
                                    var(--modura-secondary) 35%,
                                    transparent
                                ) 48.2%,
                                transparent 48.6%
                            ),

                            linear-gradient(
                                55deg,
                                transparent 58%,
                                color-mix(
                                    in srgb,
                                    var(--modura-secondary) 28%,
                                    transparent
                                ) 58.2%,
                                transparent 58.6%
                            ),

                            linear-gradient(
                                145deg,
                                transparent 35%,
                                color-mix(
                                    in srgb,
                                    var(--modura-secondary) 22%,
                                    transparent
                                ) 35.2%,
                                transparent 35.6%
                            )
                        `,
                    }}
                />

                {/* LONG TECHNICAL LINE */}

                <div
                    className="
                        absolute
                        top-[18%]
                        left-[48%]
                        h-[180px]
                        w-px
                        rotate-[28deg]
                        bg-modura-secondary/30
                    "
                />

                {/* SHORT TECHNICAL LINE */}

                <div
                    className="
                        absolute
                        top-[48%]
                        left-[35%]
                        h-px
                        w-[110px]
                        rotate-[-28deg]
                        bg-modura-secondary/30
                    "
                />

                {/* LOWER TECHNICAL LINE */}

                <div
                    className="
                        absolute
                        bottom-[22%]
                        left-[30%]
                        h-px
                        w-[90px]
                        rotate-[28deg]
                        bg-modura-secondary/20
                    "
                />
            </div>

            {/* ============================================================
                SECOND DIAGONAL EDGE
            ============================================================ */}

            <div
                className="
                    pointer-events-none
                    absolute
                    top-0
                    right-[22%]
                    z-0
                    h-full
                    w-px
                    rotate-[27deg]
                    bg-modura-secondary/40

                    lg:right-[26%]
                "
            />

            {/* ============================================================
                ADDITIONAL ARCHITECTURAL DETAIL
            ============================================================ */}

            <div
                className="
                    pointer-events-none
                    absolute
                    right-[15%]
                    top-[28%]
                    z-0
                    hidden
                    h-px
                    w-[270px]
                    rotate-[-27deg]
                    bg-modura-secondary/30

                    lg:block
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    right-[12%]
                    bottom-[19%]
                    z-0
                    hidden
                    h-px
                    w-[190px]
                    rotate-[-27deg]
                    bg-modura-secondary/25

                    lg:block
                "
            />

            {/* ============================================================
                MAIN CONTENT
            ============================================================ */}

            <div
                ref={contentRef}
                className="
                    relative
                    z-20
                    mx-auto
                    flex
                    h-full
                    max-w-[1300px]
                    items-center
                    px-8

                    md:px-10

                    lg:px-12
                "
            >
                <div className="w-full max-w-[650px]">
                    {/* ====================================================
                        EYEBROW
                    ==================================================== */}

                    <div className="mb-5 flex items-center gap-3">
                        <div
                            className="
            flex
            h-7
            w-7
            shrink-0
            items-center
            justify-center
            border
            border-modura-secondary/30
            bg-modura-white
        "
                        >
                            <FaDraftingCompass
                                size={15}
                                strokeWidth={1.5}
                                className="text-modura-secondary"
                            />
                        </div>

                       
                        <span
                            className="
            text-[9px]
            font-semibold
            tracking-[0.38em]
            text-modura-secondary

            md:text-[10px]
        "
                        >
                            {eyebrow}
                        </span>
                    </div>
                    {/* ====================================================
                        TITLE
                    ==================================================== */}

                    <h1
                        className="
                            text-[48px]
                            font-bold
                            capitalize
                            leading-[0.92]
                            tracking-[-0.045em]
                            text-modura-primary

                            sm:text-[56px]

                            md:text-[64px]

                            lg:text-[72px]
                        "
                    >
                        {title}
                    </h1>

                    {/* ====================================================
                        DYNAMIC BREADCRUMB
                    ==================================================== */}

                    <div
    ref={breadcrumbRef}
    className="
        relative
        mt-6
        inline-flex
        items-center
        overflow-hidden
        bg-modura-white
        shadow-[0_10px_30px_rgba(11,29,51,0.08)]
    "
>
    {/* LEFT ACCENT */}

    <div
        className="
            relative
            flex
            h-[52px]
            w-[52px]
            shrink-0
            items-center
            justify-center
            bg-modura-primary
        "
    >
        <span
            className="
                absolute
                left-3
                top-3
                h-3
                w-3
                border-l
                border-t
                border-modura-secondary-light/60
            "
        />

        <span
            className="
                absolute
                bottom-3
                right-3
                h-3
                w-3
                border-b
                border-r
                border-modura-secondary-light/60
            "
        />

        <FaDraftingCompass
            size={19}
            strokeWidth={1.4}
            className="text-modura-white"
        />
    </div>

    {/* BREADCRUMB */}

    <div
        className="
            flex
            h-[52px]
            items-center
            px-4

            md:px-5
        "
    >
        {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
                <div
                    key={`${item.label}-${index}`}
                    className="
                        flex
                        items-center
                    "
                >
                    {/* LABEL */}

                    {item.href && !isLast ? (
                        <Link
                            href={item.href}
                            className="
                                text-[12px]
                                font-medium
                                text-modura-secondary
                                transition-colors
                                duration-300
                                hover:text-modura-primary
                            "
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span
                            className={`
                                max-w-[260px]
                                truncate
                                text-[12px]

                                ${
                                    isLast
                                        ? 'font-semibold text-modura-primary'
                                        : 'font-medium text-modura-secondary'
                                }
                            `}
                        >
                            {item.label}
                        </span>
                    )}

                    {/* SEPARATOR */}

                    {!isLast && (
                        <div
                            className="
                                mx-3
                                flex
                                items-center
                            "
                        >
                            <span
                                className="
                                    h-px
                                    w-5
                                    bg-modura-gray-300
                                "
                            />

                            <span
                                className="
                                    mx-1.5
                                    h-1.5
                                    w-1.5
                                    rotate-45
                                    bg-modura-secondary
                                "
                            />

                            <span
                                className="
                                    h-px
                                    w-5
                                    bg-modura-gray-300
                                "
                            />
                        </div>
                    )}
                </div>
            );
        })}
    </div>

    {/* RIGHT ACCENT */}

    <div
        className="
            hidden
            h-[52px]
            w-3
            bg-modura-secondary

            sm:block
        "
    />
</div>
                </div>
            </div>

            {/* ============================================================
                BOTTOM LEFT ARCHITECTURAL DETAIL
            ============================================================ */}

            <div
                className="
                    pointer-events-none
                    absolute
                    bottom-0
                    left-8
                    h-[64px]
                    w-[64px]
                    border-t
                    border-r
                    border-modura-secondary/25
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    bottom-0
                    left-0
                    h-px
                    w-[110px]
                    bg-modura-secondary/25
                "
            />


        </section>
    );
}