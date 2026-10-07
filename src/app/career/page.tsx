'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLayoutEffect, useRef } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
    FiArrowUpRight,
    FiBriefcase,
    FiCheck,
    FiCompass,
    FiLayers,
    FiMail,
    FiMapPin,
    FiUsers,
} from 'react-icons/fi';

import Breadcrumb from '../components/Breadcrumb';
import breadcrumb from '@/app/assets/images/breadcrumb.jpg';

import careerImage from '@/app/assets/images/about-1.jpg';

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   OPEN POSITIONS
========================================================= */

const positions = [
    {
        title: 'Senior Architect',
        department: 'Architecture',
        location: 'Ahmedabad / Hybrid',
        type: 'Full Time',
    },
    {
        title: 'BIM Engineer',
        department: 'BIM Solutions',
        location: 'Ahmedabad / Hybrid',
        type: 'Full Time',
    },
    {
        title: 'Structural Engineer',
        department: 'Structural Engineering',
        location: 'Ahmedabad / Hybrid',
        type: 'Full Time',
    },
    {
        title: 'Steel Detailer',
        department: 'Steel Detailing',
        location: 'Ahmedabad / Hybrid',
        type: 'Full Time',
    },
];

/* =========================================================
   WHY MODURA
========================================================= */

const benefits = [
    {
        icon: FiCompass,
        title: 'Meaningful Projects',
        text: 'Work across complex architectural, engineering and construction projects.',
    },
    {
        icon: FiLayers,
        title: 'Technical Growth',
        text: 'Build deeper expertise across BIM, engineering and digital workflows.',
    },
    {
        icon: FiUsers,
        title: 'Collaborative Culture',
        text: 'Work alongside professionals from different disciplines and backgrounds.',
    },
];

/* =========================================================
   CAREER PAGE
========================================================= */

export default function Career() {
    const sectionRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.career-hero-content',
                {
                    y: 50,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                },
            );

            gsap.fromTo(
                '.career-hero-image',
                {
                    scale: 1.08,
                    opacity: 0,
                },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power3.out',
                },
            );

            gsap.fromTo(
                '.career-benefit',
                {
                    y: 40,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.career-benefits',
                        start: 'top 80%',
                        once: true,
                    },
                },
            );

            gsap.fromTo(
                '.career-job',
                {
                    y: 40,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    stagger: 0.12,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.career-jobs',
                        start: 'top 80%',
                        once: true,
                    },
                },
            );

            gsap.fromTo(
                '.career-application',
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
                        trigger: '.career-application',
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
                title="Career"
                image={breadcrumb.src}
            />

            <main
                ref={sectionRef}
                className="overflow-hidden bg-modura-white"
            >
                {/* =================================================
                    CAREER INTRO
                ================================================= */}

                <section className="relative py-16 md:py-20 lg:py-4">
                    <div
                        className="
                            mx-auto
                            max-w-[1300px]
                            px-5
                            md:px-8
                        "
                    >
                        <div
                            className="
                                grid
                                items-center
                                gap-12

                                lg:grid-cols-[0.9fr_1.1fr]
                                lg:gap-20
                            "
                        >
                            {/* LEFT */}

                            <div className="career-hero-content">
                                <div
                                    className="
                                        mb-5
                                        flex
                                        items-center
                                        gap-3
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
                                            text-[10px]
                                            font-bold
                                            tracking-[0.35em]
                                            text-modura-secondary
                                            uppercase
                                        "
                                    >
                                        CAREERS AT MODURA
                                    </span>
                                </div>

                                <h1
                                    className="
                                        max-w-[650px]
                                        text-[42px]
                                        leading-[1.02]
                                        font-bold
                                        tracking-[-0.035em]
                                        text-modura-primary

                                        md:text-[56px]

                                        lg:text-[68px]
                                    "
                                >
                                    Build
                                    <span className="text-modura-secondary">
                                        {' '}
                                        What Comes Next.
                                    </span>
                                </h1>

                                <p
                                    className="
                                        mt-7
                                        max-w-[580px]
                                        text-[16px]
                                        leading-8
                                        text-modura-gray-600
                                    "
                                >
                                    At Modura Design Group, we bring
                                    architecture, engineering, BIM and
                                    technology together to create better
                                    built environments.
                                </p>

                                <p
                                    className="
                                        mt-4
                                        max-w-[580px]
                                        text-[15px]
                                        leading-8
                                        text-modura-gray-600
                                    "
                                >
                                    Join a team where your ideas contribute
                                    to real projects, your technical skills
                                    continue to grow and every discipline
                                    plays a part in shaping the final result.
                                </p>

                                <Link
                                    href="#open-positions"
                                    className="
                                        mt-8
                                        inline-flex
                                        items-center
                                        gap-4
                                        border
                                        border-modura-primary
                                        px-6
                                        py-4
                                        text-[11px]
                                        font-bold
                                        tracking-[0.18em]
                                        text-modura-primary
                                        uppercase
                                        transition-all
                                        duration-300
                                        hover:bg-modura-primary
                                        hover:text-modura-white
                                    "
                                >
                                    Explore Opportunities

                                    <FiArrowUpRight size={17} />
                                </Link>
                            </div>

                            {/* RIGHT IMAGE */}

                            <div className="career-hero-image relative">
                                <div
                                    className="
                                        absolute
                                        -left-5
                                        top-8
                                        z-0
                                        h-[85%]
                                        w-[85%]
                                        border
                                        border-modura-secondary/30
                                    "
                                />

                                <div
                                    className="
                                        relative
                                        z-10
                                        h-[400px]
                                        overflow-hidden

                                        md:h-[500px]
                                    "
                                >
                                    <Image
                                        src={careerImage}
                                        alt="Modura Design Group careers"
                                        fill
                                        priority
                                        className="
                                            object-cover
                                        "
                                    />

                                    <div
                                        className="
                                            absolute
                                            inset-0
                                            bg-gradient-to-t
                                            from-modura-primary/60
                                            via-transparent
                                            to-transparent
                                        "
                                    />

                                    <div
                                        className="
                                            absolute
                                            bottom-0
                                            left-0
                                            flex
                                            items-center
                                            gap-4
                                            p-7
                                            text-modura-white
                                        "
                                    >
                                        <FiBriefcase size={20} />

                                        <span
                                            className="
                                                text-[10px]
                                                font-bold
                                                tracking-[0.25em]
                                                uppercase
                                            "
                                        >
                                            Shape Better Spaces
                                        </span>
                                    </div>
                                </div>

                                {/* DECORATIVE MARK */}

                                <div
                                    className="
                                        absolute
                                        -right-4
                                        -bottom-4
                                        z-20
                                        flex
                                        h-24
                                        w-24
                                        items-center
                                        justify-center
                                        bg-modura-secondary
                                        text-modura-white
                                    "
                                >
                                    <FiCompass size={30} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =================================================
                    WHY MODURA
                ================================================= */}

                <section
                    className="
                        career-benefits
                        bg-modura-primary
                        py-16
                        md:py-20
                    "
                >
                    <div
                        className="
                            mx-auto
                            max-w-[1300px]
                            px-5
                            md:px-8
                        "
                    >
                        <div
                            className="
                                mb-12
                                max-w-[700px]
                            "
                        >
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
                                        h-[2px]
                                        w-12
                                        bg-modura-secondary-light
                                    "
                                />

                                <span
                                    className="
                                        text-[10px]
                                        font-bold
                                        tracking-[0.35em]
                                        text-modura-secondary-light
                                        uppercase
                                    "
                                >
                                    WHY MODURA
                                </span>
                            </div>

                            <h2
                                className="
                                    text-[34px]
                                    leading-tight
                                    font-bold
                                    text-modura-white

                                    md:text-[46px]
                                "
                            >
                                A place to
                                <span className="text-modura-secondary-light">
                                    {' '}
                                    grow.
                                </span>
                            </h2>
                        </div>

                        <div
                            className="
                                grid
                                border-t
                                border-modura-primary-light

                                md:grid-cols-3
                            "
                        >
                            {benefits.map((item, index) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={item.title}
                                        className="
                                            career-benefit
                                            border-b
                                            border-modura-primary-light
                                            px-0
                                            py-8

                                            md:border-r
                                            md:px-8
                                            md:py-10

                                            first:md:pl-0
                                            last:md:border-r-0
                                        "
                                    >
                                        <div
                                            className="
                                                mb-6
                                                flex
                                                h-12
                                                w-12
                                                items-center
                                                justify-center
                                                border
                                                border-modura-secondary-light/40
                                                text-modura-secondary-light
                                            "
                                        >
                                            <Icon size={21} />
                                        </div>

                                        <h3
                                            className="
                                                text-[19px]
                                                font-bold
                                                text-modura-white
                                            "
                                        >
                                            {item.title}
                                        </h3>

                                        <p
                                            className="
                                                mt-3
                                                max-w-[330px]
                                                text-[14px]
                                                leading-7
                                                text-modura-secondary-light
                                            "
                                        >
                                            {item.text}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* =================================================
                    OPEN POSITIONS
                ================================================= */}

                <section
                    id="open-positions"
                    className="
                        career-jobs
                        bg-modura-off-white
                        py-16
                        md:py-20
                        lg:py-24
                    "
                >
                    <div
                        className="
                            mx-auto
                            max-w-[1300px]
                            px-5
                            md:px-8
                        "
                    >
                        <div
                            className="
                                mb-12
                                flex
                                flex-col
                                gap-5

                                md:flex-row
                                md:items-end
                                md:justify-between
                            "
                        >
                            <div>
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
                                            h-[2px]
                                            w-12
                                            bg-modura-secondary
                                        "
                                    />

                                    <span
                                        className="
                                            text-[10px]
                                            font-bold
                                            tracking-[0.35em]
                                            text-modura-secondary
                                            uppercase
                                        "
                                    >
                                        OPPORTUNITIES
                                    </span>
                                </div>

                                <h2
                                    className="
                                        text-[36px]
                                        leading-tight
                                        font-bold
                                        text-modura-primary

                                        md:text-[48px]
                                    "
                                >
                                    Open
                                    <span className="text-modura-secondary">
                                        {' '}
                                        Positions
                                    </span>
                                </h2>
                            </div>

                            <p
                                className="
                                    max-w-[420px]
                                    text-[14px]
                                    leading-7
                                    text-modura-gray-600
                                "
                            >
                                Find your place within a multidisciplinary
                                team working across architecture,
                                engineering and digital construction.
                            </p>
                        </div>

                        <div
                            className="
                                border-t
                                border-modura-gray-300
                            "
                        >
                            {positions.map((position) => (
                                <div
                                    key={position.title}
                                    className="
                                        career-job
                                        group
                                        grid
                                        gap-5
                                        border-b
                                        border-modura-gray-300
                                        py-7

                                        md:grid-cols-[1fr_180px_180px_150px]
                                        md:items-center
                                    "
                                >
                                    <div>
                                        <h3
                                            className="
                                                text-[20px]
                                                font-bold
                                                text-modura-primary
                                                transition-colors
                                                duration-300
                                                group-hover:text-modura-secondary
                                            "
                                        >
                                            {position.title}
                                        </h3>

                                        <p
                                            className="
                                                mt-1
                                                text-[12px]
                                                font-medium
                                                tracking-[0.08em]
                                                text-modura-secondary
                                                uppercase
                                            "
                                        >
                                            {position.department}
                                        </p>
                                    </div>

                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-2
                                            text-[13px]
                                            text-modura-gray-600
                                        "
                                    >
                                        <FiMapPin size={15} />

                                        {position.location}
                                    </div>

                                    <div
                                        className="
                                            text-[11px]
                                            font-bold
                                            tracking-[0.12em]
                                            text-modura-secondary
                                            uppercase
                                        "
                                    >
                                        {position.type}
                                    </div>

                                    <Link
                                        href="#application"
                                        className="
                                            inline-flex
                                            w-fit
                                            items-center
                                            gap-3
                                            text-[11px]
                                            font-bold
                                            tracking-[0.15em]
                                            text-modura-primary
                                            uppercase
                                        "
                                    >
                                        Apply

                                        <span
                                            className="
                                                flex
                                                h-8
                                                w-8
                                                items-center
                                                justify-center
                                                border
                                                border-modura-gray-300
                                                transition-all
                                                duration-300
                                                group-hover:border-modura-secondary
                                                group-hover:bg-modura-secondary
                                                group-hover:text-modura-white
                                            "
                                        >
                                            <FiArrowUpRight size={14} />
                                        </span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* =================================================
                    APPLICATION FORM
                ================================================= */}

                <section
                    id="application"
                    className="
                        career-application
                        bg-modura-white
                        py-16
                        md:py-20
                        lg:py-24
                    "
                >
                    <div
                        className="
                            mx-auto
                            max-w-[1300px]
                            px-5
                            md:px-8
                        "
                    >
                        <div
                            className="
                                grid
                                gap-12

                                lg:grid-cols-[0.7fr_1.3fr]
                                lg:gap-20
                            "
                        >
                            {/* FORM INTRO */}

                            <div>
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
                                            h-[2px]
                                            w-12
                                            bg-modura-secondary
                                        "
                                    />

                                    <span
                                        className="
                                            text-[10px]
                                            font-bold
                                            tracking-[0.35em]
                                            text-modura-secondary
                                            uppercase
                                        "
                                    >
                                        JOIN MODURA
                                    </span>
                                </div>

                                <h2
                                    className="
                                        text-[38px]
                                        leading-[1.05]
                                        font-bold
                                        text-modura-primary

                                        md:text-[50px]
                                    "
                                >
                                    Bring your
                                    <span className="text-modura-secondary">
                                        {' '}
                                        expertise.
                                    </span>
                                </h2>

                                <p
                                    className="
                                        mt-6
                                        max-w-[430px]
                                        text-[15px]
                                        leading-8
                                        text-modura-gray-600
                                    "
                                >
                                    Don't see the exact position you're
                                    looking for? Send us your details and
                                    tell us where you can make an impact.
                                </p>

                                <div
                                    className="
                                        mt-8
                                        border-l-2
                                        border-modura-secondary
                                        bg-modura-off-white
                                        p-6
                                    "
                                >
                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-3
                                            text-modura-primary
                                        "
                                    >
                                        <FiMail size={18} />

                                        <span
                                            className="
                                                text-[12px]
                                                font-bold
                                                tracking-[0.12em]
                                                uppercase
                                            "
                                        >
                                            Send your profile
                                        </span>
                                    </div>

                                    <p
                                        className="
                                            mt-2
                                            text-sm
                                            text-modura-secondary
                                        "
                                    >
                                        careers@moduradesigngroup.com
                                    </p>
                                </div>
                            </div>

                            {/* FORM */}

                            <form
                                className="
                                    grid
                                    gap-5
                                "
                            >
                                {/* NAME + EMAIL */}

                                <div
                                    className="
                                        grid
                                        gap-5

                                        md:grid-cols-2
                                    "
                                >
                                    <div>
                                        <label
                                            className="
                                                mb-2
                                                block
                                                text-[10px]
                                                font-bold
                                                tracking-[0.16em]
                                                text-modura-primary
                                                uppercase
                                            "
                                        >
                                            Name *
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="Your full name"
                                            className="
                                                h-14
                                                w-full
                                                border
                                                border-modura-gray-300
                                                bg-modura-white
                                                px-4
                                                text-sm
                                                text-modura-primary
                                                outline-none
                                                transition
                                                placeholder:text-modura-gray-400
                                                focus:border-modura-secondary
                                            "
                                        />
                                    </div>

                                    <div>
                                        <label
                                            className="
                                                mb-2
                                                block
                                                text-[10px]
                                                font-bold
                                                tracking-[0.16em]
                                                text-modura-primary
                                                uppercase
                                            "
                                        >
                                            Email *
                                        </label>

                                        <input
                                            type="email"
                                            placeholder="Your email address"
                                            className="
                                                h-14
                                                w-full
                                                border
                                                border-modura-gray-300
                                                bg-modura-white
                                                px-4
                                                text-sm
                                                text-modura-primary
                                                outline-none
                                                transition
                                                placeholder:text-modura-gray-400
                                                focus:border-modura-secondary
                                            "
                                        />
                                    </div>
                                </div>

                                {/* PHONE + POSITION */}

                                <div
                                    className="
                                        grid
                                        gap-5

                                        md:grid-cols-2
                                    "
                                >
                                    <div>
                                        <label
                                            className="
                                                mb-2
                                                block
                                                text-[10px]
                                                font-bold
                                                tracking-[0.16em]
                                                text-modura-primary
                                                uppercase
                                            "
                                        >
                                            Phone *
                                        </label>

                                        <input
                                            type="tel"
                                            placeholder="Your phone number"
                                            className="
                                                h-14
                                                w-full
                                                border
                                                border-modura-gray-300
                                                bg-modura-white
                                                px-4
                                                text-sm
                                                text-modura-primary
                                                outline-none
                                                transition
                                                placeholder:text-modura-gray-400
                                                focus:border-modura-secondary
                                            "
                                        />
                                    </div>

                                    <div>
                                        <label
                                            className="
                                                mb-2
                                                block
                                                text-[10px]
                                                font-bold
                                                tracking-[0.16em]
                                                text-modura-primary
                                                uppercase
                                            "
                                        >
                                            Position
                                        </label>

                                        <select
                                            className="
                                                h-14
                                                w-full
                                                appearance-none
                                                border
                                                border-modura-gray-300
                                                bg-modura-white
                                                px-4
                                                text-sm
                                                text-modura-primary
                                                outline-none
                                                focus:border-modura-secondary
                                            "
                                            defaultValue=""
                                        >
                                            <option value="" disabled>
                                                Select position
                                            </option>

                                            {positions.map((position) => (
                                                <option
                                                    key={position.title}
                                                    value={position.title}
                                                >
                                                    {position.title}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* RESUME */}

                                <div>
                                    <label
                                        className="
                                            mb-2
                                            block
                                            text-[10px]
                                            font-bold
                                            tracking-[0.16em]
                                            text-modura-primary
                                            uppercase
                                        "
                                    >
                                        Resume / CV *
                                    </label>

                                    <input
                                        type="file"
                                        className="
                                            block
                                            h-14
                                            w-full
                                            border
                                            border-modura-gray-300
                                            bg-modura-white
                                            px-4
                                            py-4
                                            text-sm
                                            text-modura-gray-500
                                            file:mr-4
                                            file:border-0
                                            file:bg-transparent
                                            file:text-xs
                                            file:font-bold
                                            file:text-modura-primary
                                        "
                                    />
                                </div>

                                {/* MESSAGE */}

                                <div>
                                    <label
                                        className="
                                            mb-2
                                            block
                                            text-[10px]
                                            font-bold
                                            tracking-[0.16em]
                                            text-modura-primary
                                            uppercase
                                        "
                                    >
                                        Tell Us About Yourself
                                    </label>

                                    <textarea
                                        rows={6}
                                        placeholder="Share your experience, expertise and what you would like to contribute..."
                                        className="
                                            w-full
                                            resize-none
                                            border
                                            border-modura-gray-300
                                            bg-modura-white
                                            px-4
                                            py-4
                                            text-sm
                                            leading-7
                                            text-modura-primary
                                            outline-none
                                            transition
                                            placeholder:text-modura-gray-400
                                            focus:border-modura-secondary
                                        "
                                    />
                                </div>

                                {/* SUBMIT */}

                                <button
                                    type="submit"
                                    className="
                                        mt-2
                                        flex
                                        h-14
                                        items-center
                                        justify-center
                                        gap-4
                                        bg-modura-primary
                                        px-8
                                        text-[11px]
                                        font-bold
                                        tracking-[0.2em]
                                        text-modura-white
                                        uppercase
                                        transition-all
                                        duration-300
                                        hover:bg-modura-secondary
                                    "
                                >
                                    Submit Application

                                    <FiArrowUpRight size={17} />
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}