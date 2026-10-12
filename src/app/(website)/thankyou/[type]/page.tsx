
'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { FiArrowUpRight, FiCheck } from 'react-icons/fi';

const thankYouContent = {
    inquiry: {
        eyebrow: 'INQUIRY RECEIVED',
        title: 'THANK',
        highlight: 'YOU.',
        message: 'Your inquiry has been submitted successfully.',
        description:
            'Thank you for reaching out to Modura Design Group. Our team will review your project requirements and get back to you shortly.',
    },
    apply: {
        eyebrow: 'APPLICATION RECEIVED',
        title: 'THANK',
        highlight: 'YOU.',
        message: 'Your application has been submitted successfully.',
        description:
            'Thank you for your interest in joining Modura Design Group. Our team will review your application and contact you if your profile matches our requirements.',
    },
};

export default function ThankYouPage() {
    const params = useParams<{ type: string }>();
    const sectionRef = useRef<HTMLElement | null>(null);

    const type = params.type?.toLowerCase();

    const content =
        thankYouContent[type as keyof typeof thankYouContent] ??
        thankYouContent.inquiry;

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: {
                    ease: 'power3.out',
                },
            });

            tl.fromTo(
                '.thank-eyebrow',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6 }
            )
                .fromTo(
                    '.thank-icon',
                    { scale: 0.5, opacity: 0, rotation: -12 },
                    {
                        scale: 1,
                        opacity: 1,
                        rotation: 0,
                        duration: 0.8,
                        ease: 'back.out(1.5)',
                    },
                    '-=0.25'
                )
                .fromTo(
                    '.thank-check',
                    { scale: 0, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.45,
                        ease: 'back.out(2)',
                    },
                    '-=0.3'
                )
                .fromTo(
                    '.thank-heading',
                    { y: 55, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.9,
                    },
                    '-=0.4'
                )
                .fromTo(
                    '.thank-message',
                    { y: 25, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.7,
                    },
                    '-=0.45'
                )
                .fromTo(
                    '.thank-description',
                    { y: 20, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.7,
                    },
                    '-=0.45'
                )
                .fromTo(
                    '.thank-button',
                    { y: 20, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.7,
                    },
                    '-=0.4'
                )
                .fromTo(
                    '.thank-bottom',
                    { opacity: 0, scaleX: 0.5 },
                    {
                        opacity: 1,
                        scaleX: 1,
                        duration: 0.7,
                    },
                    '-=0.3'
                );
        }, sectionRef);

        return () => ctx.revert();
    }, [type]);

    return (
        <main
            ref={sectionRef}
            className="
                relative
                flex
                min-h-[calc(100svh-80px)]
                items-center
                overflow-hidden
                bg-modura-off-white
                py-16
                md:py-20
            "
        >
            

            {/* BACKGROUND DECORATIONS */}
            <div className="pointer-events-none absolute -right-28 -top-28 h-[420px] w-[420px] rotate-45 border border-modura-secondary/20" />

            <div className="pointer-events-none absolute -bottom-40 -left-36 h-[440px] w-[440px] rotate-45 border border-modura-primary/10" />

            <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 md:px-8">
                <div className="mx-auto flex max-w-[850px] flex-col items-center text-center">

                    {/* EYEBROW */}
                    <div className="thank-eyebrow mb-9 flex items-center gap-4">
                        <span className="h-px w-10 bg-modura-secondary" />

                        <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-modura-secondary">
                            {content.eyebrow}
                        </span>

                        <span className="h-px w-10 bg-modura-secondary" />
                    </div>

                    {/* SUCCESS ICON */}
                    <div className="thank-icon relative mb-10 flex h-28 w-28 items-center justify-center border border-modura-secondary/25 bg-modura-white shadow-[0_20px_60px_rgba(11,29,51,0.08)]">

                        <span className="absolute -right-2 -top-2 h-5 w-5 border-r-2 border-t-2 border-modura-secondary" />

                        <span className="absolute -bottom-2 -left-2 h-5 w-5 border-b-2 border-l-2 border-modura-secondary" />

                        <div className="thank-check flex h-[70px] w-[70px] items-center justify-center bg-modura-primary">
                            <FiCheck
                                size={38}
                                className="text-modura-white"
                            />
                        </div>
                    </div>

                    {/* HEADING */}
                    <h1 className="thank-heading text-[64px] font-bold leading-[0.95] tracking-[-0.055em] text-modura-primary sm:text-[84px] md:text-[110px] lg:text-[130px]">
                        {content.title}{' '}
                        <span className="text-modura-secondary">
                            {content.highlight}
                        </span>
                    </h1>

                    {/* CONFIRMATION */}
                    <h2 className="thank-message mt-9 text-[20px] font-bold text-modura-primary md:text-[24px]">
                        {content.message}
                    </h2>

                    <p className="thank-description mx-auto mt-4 max-w-[560px] text-[14px] leading-7 text-modura-gray-600 md:text-[15px]">
                        {content.description}
                    </p>

                    {/* BACK HOME BUTTON */}
                    <div className="thank-button mt-10">
                        <Link
                            href="/"
                            className="
                                group
                                relative
                                inline-flex
                                h-[58px]
                                items-center
                                justify-center
                                gap-5
                                overflow-hidden
                                bg-modura-primary
                                px-9
                                text-[12px]
                                font-bold
                                uppercase
                                tracking-[0.18em]
                                text-modura-white
                                transition-colors
                                duration-300
                                hover:bg-modura-primary-light
                            "
                        >
                            <span className="relative z-10">
                                Back To Home
                            </span>

                            <FiArrowUpRight
                                size={18}
                                className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                            />

                            <span className="absolute bottom-0 left-0 h-[3px] w-full bg-modura-secondary-light transition-all duration-500 group-hover:h-full group-hover:opacity-10" />
                        </Link>
                    </div>

                    {/* BOTTOM ACCENT */}
                    <div className="thank-bottom mt-14 flex items-center gap-4">
                        <span className="h-px w-16 bg-modura-gray-300" />

                        <span className="h-2 w-2 rotate-45 border border-modura-secondary" />

                        <span className="h-px w-16 bg-modura-gray-300" />
                    </div>
                </div>
            </div>
        </main>
    );
}
