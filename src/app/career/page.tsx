'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLayoutEffect, useRef, useState } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
    FiArrowUpRight,
    FiBriefcase,
    FiCheck,
    FiCompass,
    FiLayers,
    FiMail,
    FiFileText,
    FiMapPin,
    FiUsers,
    FiUploadCloud,
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

        description:
            'We are looking for candidates with strong knowledge of architectural design to support international and offshore projects. The ideal candidate should be comfortable working with architectural BIM models, drawings and project documentation.',

        skills: [
            'Good knowledge of architectural design and BIM workflows.',
            'Knowledge of AutoCAD will be an added advantage.',
            'Experience working with architectural BIM projects.',
            'Understanding of architectural drawings and documentation.',
            'Ability to coordinate with project teams and other disciplines.',
        ],

        responsibilities: [
            'Develop and manage architectural BIM models.',
            'Create detailed architectural components including walls, floors, doors and families.',
            'Prepare accurate construction drawings and documentation.',
            'Coordinate architectural information with engineering disciplines.',
        ],

        qualification:
            'B.Arch, Diploma in Architecture or ITI Draftsman with good technical knowledge.',

        experience: '2+ Years',

        vacancy: '02',
    },

    {
        title: 'BIM Engineer',
        department: 'BIM Solutions',
        location: 'Ahmedabad / Hybrid',
        type: 'Full Time',

        description:
            'We are looking for a BIM professional who can contribute to the development and coordination of digital building models for architecture and engineering projects. The candidate should have a strong understanding of BIM workflows and project documentation.',

        skills: [
            'Good knowledge of BIM modelling and coordination workflows.',
            'Experience with Revit and BIM-based project delivery.',
            'Understanding of architectural and engineering drawings.',
            'Knowledge of BIM standards and documentation.',
            'Ability to coordinate with multidisciplinary project teams.',
        ],

        responsibilities: [
            'Develop and maintain accurate BIM models.',
            'Coordinate models between architecture and engineering disciplines.',
            'Prepare BIM documentation and project deliverables.',
            'Identify and communicate model coordination issues.',
        ],

        qualification:
            'Diploma / Degree in Architecture, Civil Engineering or a related technical field.',

        experience: '1–3 Years',

        vacancy: '03',
    },

    {
        title: 'Structural Engineer',
        department: 'Structural Engineering',
        location: 'Ahmedabad / Hybrid',
        type: 'Full Time',

        description:
            'We are looking for a structural engineering professional to support the development and coordination of structural design projects. The ideal candidate should understand structural drawings, engineering documentation and multidisciplinary coordination.',

        skills: [
            'Strong understanding of structural engineering principles.',
            'Good knowledge of structural drawings and detailing.',
            'Experience with structural design and documentation.',
            'Knowledge of BIM coordination will be an advantage.',
            'Ability to work with architects and other engineering disciplines.',
        ],

        responsibilities: [
            'Prepare and coordinate structural engineering drawings.',
            'Support structural design and documentation activities.',
            'Coordinate structural information with architectural and MEP teams.',
            'Review drawings and identify coordination requirements.',
        ],

        qualification:
            'B.E. / B.Tech / Diploma in Civil or Structural Engineering.',

        experience: '2+ Years',

        vacancy: '02',
    },

    {
        title: 'Steel Detailer',
        department: 'Steel Detailing',
        location: 'Ahmedabad / Hybrid',
        type: 'Full Time',

        description:
            'We are looking for a skilled steel detailing professional to work on structural steel projects and produce accurate fabrication and construction documentation. The candidate should have a strong understanding of steel structures and detailing practices.',

        skills: [
            'Good understanding of structural steel detailing.',
            'Knowledge of steel fabrication and construction drawings.',
            'Experience with steel detailing software and workflows.',
            'Ability to read and understand structural drawings.',
            'Strong attention to dimensions, connections and detailing accuracy.',
        ],

        responsibilities: [
            'Prepare detailed structural steel fabrication drawings.',
            'Develop accurate steel models and construction documentation.',
            'Coordinate steel detailing with structural design information.',
            'Review drawings for accuracy and fabrication requirements.',
        ],

        qualification:
            'Diploma / Degree in Civil Engineering or relevant technical qualification.',

        experience: '2+ Years',

        vacancy: '02',
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
    const [resume, setResume] = useState<File | null>(null);
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

                <section
                    className="
                        relative
                        bg-modura-white
                        py-20
                        md:py-24
                        lg:py-14
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
                        {/* =================================================
            TOP LABEL
        ================================================= */}

                        <div
                            className="
                                career-hero-content
                                flex
                                items-center
                                gap-3
                            "
                        >

                            <span
                                className="
                                    text-[13px]
                                    font-bold
                                    tracking-[0.35em]
                                    text-modura-secondary
                                    uppercase
                                "
                            >
                                CAREERS AT MODURA
                            </span>
                        </div>


                        {/* =================================================
            MAIN CONTENT
        ================================================= */}

                        <div
                            className="
                                mt-4
                                grid
                                gap-10

                                lg:grid-cols-[1.05fr_0.95fr]
                                lg:gap-24
                            "
                        >

                            {/* =================================================
                                HEADING
                            ================================================= */}

                            <div>
                                <h1
                                    className="
                                        max-w-[850px]
                                        text-[48px]
                                        leading-[0.98]
                                        font-bold
                                        tracking-[-0.04em]
                                        text-modura-primary

                                        md:text-[64px]

                                       
                                    "
                                >
                                    Build
                                    <span className="text-modura-secondary">
                                        {' '}
                                        What Comes Next.
                                    </span>
                                </h1>
                            </div>


                            {/* =================================================
                                CONTENT
                            ================================================= */}

                            <div
                                className="
                                    border-l
                                    border-modura-secondary
                                    pl-7

                                    md:pl-9

                                    lg:pl-10
                                "
                            >
                                <p
                                    className="
                                        max-w-[560px]
                                        text-[16px]
                                        leading-
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
                                        mt-2
                                        max-w-[560px]
                                        text-[16px]
                                        leading-6
                                        text-modura-gray-600
                                    "
                                >
                                    Join a team where your ideas contribute
                                    to real projects, your technical skills
                                    continue to grow and every discipline
                                    plays a part in shaping the final result.
                                </p>

                                {/* =================================================
                                    BUTTON
                                ================================================= */}

                                <div className="mt-8">
                                    <Link
                                        href="#open-positions"
                                        className="
                                            group
                                            border-modura-primary
                                            bg-modura-white
                                            text-modura-primary
                                            relative
                                            inline-flex
                                            h-[52px]
                                            items-center
                                            overflow-hidden
                                            border
                                            pr-[62px]
                                            pl-5
                                        "
                                    >
                                        {/* NAVY FILL */}

                                        <span
                                            className="
                                                bg-modura-primary
                                                absolute
                                                inset-y-0
                                                left-0
                                                w-0
                                                transition-all
                                                duration-500
                                                group-hover:w-full
                                            "
                                        />

                                        {/* TOP ARCHITECTURAL LINE */}

                                        <span
                                            className="
                                                bg-modura-secondary
                                                absolute
                                                top-0
                                                left-0
                                                z-10
                                                h-[3px]
                                                w-8
                                                transition-all
                                                duration-500
                                                group-hover:w-full
                                            "
                                        />

                                        {/* TECHNICAL MARK */}

                                        <span
                                            className="
                                                relative
                                                z-10
                                                mr-3
                                                flex
                                                items-center
                                                gap-1.5
                                            "
                                        >
                                            <span
                                                className="
                                                    bg-modura-secondary
                                                    group-hover:bg-modura-white
                                                    h-[5px]
                                                    w-[5px]
                                                    rotate-45
                                                    transition-colors
                                                    duration-300
                                                "
                                            />
                                        </span>

                                        {/* TEXT */}

                                        <span
                                            className="
                                                group-hover:text-modura-white
                                                relative
                                                z-10
                                                text-[12px]
                                                font-bold
                                                tracking-[0.08em]
                                                whitespace-nowrap
                                                uppercase
                                                transition-colors
                                                duration-300
                                            "
                                        >
                                            Explore Opportunities
                                        </span>

                                        {/* ARROW */}

                                        <span
                                            className="
                                                bg-modura-primary
                                                text-modura-white
                                                group-hover:bg-modura-secondary
                                                absolute
                                                top-0
                                                right-0
                                                z-10
                                                flex
                                                h-full
                                                w-[48px]
                                                items-center
                                                justify-center
                                                transition-colors
                                                duration-300
                                            "
                                        >
                                            <FiArrowUpRight
                                                className="
                                                text-[18px]
                                                transition-transform
                                                duration-300
                                                group-hover:rotate-45
                                            "
                                            />
                                        </span>
                                    </Link>
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
                        bg-modura-light
                        py-20
                        md:py-14
                        
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
                                items-start
                                gap-12

                                lg:grid-cols-[0.82fr_1.8fr]
                                lg:gap-14
                            "
                        >

                            {/* =================================================
                                LEFT CONTENT
                            ================================================= */}

                            <div
                                className="
                                    career-benefits-heading
                                    lg:pr-8
                                "
                            >
                                {/* EYEBROW */}

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
                                            text-[13px]
                                            font-bold
                                            tracking-[0.35em]
                                            text-modura-secondary
                                            uppercase
                                        "
                                    >
                                        WHY MODURA
                                    </span>
                                </div>

                                {/* HEADING */}

                                <h2
                                    className="
                                        max-w-[470px]
                                        text-[46px]
                                        leading-[0.96]
                                        font-bold
                                        tracking-[-0.04em]
                                        text-modura-primary

                                        md:text-[58px]

                                       
                                    "
                                >
                                    A place to
                                    <span
                                        className="
                                            block
                                            text-modura-secondary
                                        "
                                    >
                                        grow.
                                    </span>
                                </h2>
                            </div>


                            {/* =================================================
                                BENEFITS
                            ================================================= */}

                            <div
                                className="
                                    grid
                                    border-l
                                    border-modura-gray-300

                                    md:grid-cols-3
                                "
                            >
                                {benefits.map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <div
                                            key={item.title}
                                            className="
                                                career-benefit
                                                group
                                                relative
                                                border-b
                                                border-modura-gray-300
                                                px-0
                                                py-8

                                                md:min-h-[250px]
                                                md:border-r
                                                md:border-b-0
                                                md:px-7
                                                md:py-0

                                                lg:px-8

                                                last:border-r-0
                                            "
                                        >

                                            {/* =================================================
                                                ICON
                                            ================================================= */}

                                            <div
                                                className="
                                                    mb-8
                                                    flex
                                                    h-[68px]
                                                    w-[68px]
                                                    items-center
                                                    justify-center
                                                    border
                                                    border-modura-secondary
                                                    bg-modura-light
                                                    text-modura-primary
                                                    transition-all
                                                    duration-500

                                                    group-hover:bg-modura-primary
                                                    group-hover:text-modura-white
                                                "
                                            >
                                                <Icon
                                                    size={28}
                                                    strokeWidth={1.5}
                                                />
                                            </div>


                                            {/* =================================================
                                                TITLE
                                            ================================================= */}

                                            <h3
                                                className="
                                                    max-w-[250px]
                                                    text-[20px]
                                                    leading-[1.2]
                                                    font-bold
                                                    tracking-[-0.02em]
                                                    text-modura-primary

                                                    md:text-[21px]
                                                "
                                            >
                                                {item.title}
                                            </h3>


                                            {/* =================================================
                                                DESCRIPTION
                                            ================================================= */}

                                            <p
                                                className="
                                                    mt-4
                                                    max-w-[270px]
                                                    text-[14px]
                                                    leading-7
                                                    text-modura-gray-500
                                                "
                                            >
                                                {item.text}
                                            </p>


                                            {/* =================================================
                                                BOTTOM ACCENT
                                            ================================================= */}

                                            <div
                                                className="
                                                    absolute
                                                    bottom-0
                                                    left-7
                                                    h-[2px]
                                                    w-9
                                                    bg-modura-secondary
                                                    transition-all
                                                    duration-500

                                                    md:left-7

                                                    group-hover:w-16
                                                "
                                            />
                                        </div>
                                    );
                                })}
                            </div>
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
                        md:py-14
                        
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

                        {/* =================================================
                            SECTION HEADER
                        ================================================= */}

                        <div
                            className="
                                mb-7
                                flex
                                flex-col
                                gap-6

                                md:flex-row
                                md:items-end
                                md:justify-between
                            "
                        >
                            <div>

                                {/* EYEBROW */}

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
                                            text-[13px]
                                            font-bold
                                            tracking-[0.35em]
                                            text-modura-secondary
                                            uppercase
                                        "
                                    >
                                        OPPORTUNITIES
                                    </span>
                                </div>

                                {/* HEADING */}

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
                                    max-w-[430px]
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


                        {/* =================================================
                            POSITIONS
                        ================================================= */}

                        <div className="space-y-8">

                            {positions.map((position) => (
                                <article
                                    key={position.title}
                                    className="
                                        career-job
                                        group
                                        overflow-hidden
                                        border
                                        border-modura-gray-300
                                        bg-modura-white
                                        transition-all
                                        duration-500
                                        hover:border-modura-secondary
                                        hover:shadow-[0_18px_50px_rgba(11,29,51,0.06)]
                                    "
                                >

                                    {/* =================================================
                                        JOB HEADER
                                    ================================================= */}

                                    <div
                                        className="
                                            relative
                                            border-b
                                            border-modura-gray-200
                                            px-6
                                            py-6

                                            md:px-8
                                            md:py-7
                                        "
                                    >

                                        {/* TOP ACCENT */}

                                        <span
                                            className="
                                                absolute
                                                top-0
                                                left-0
                                                h-[3px]
                                                w-16
                                                bg-modura-secondary
                                                transition-all
                                                duration-500
                                                group-hover:w-28
                                            "
                                        />

                                        <div
                                            className="
                                                flex
                                                flex-col
                                                gap-5

                                                md:flex-row
                                                md:items-center
                                                md:justify-between
                                            "
                                        >

                                            {/* TITLE */}

                                            <div>
                                                <h3
                                                    className="
                                                        text-[23px]
                                                        leading-tight
                                                        font-bold
                                                        text-modura-primary

                                                        md:text-[26px]
                                                    "
                                                >
                                                    {position.title}
                                                </h3>

                                                <p
                                                    className="
                                                        mt-2
                                                        text-[13px]
                                                        font-bold
                                                        tracking-[0.18em]
                                                        text-modura-secondary
                                                        uppercase
                                                    "
                                                >
                                                    {position.department}
                                                </p>
                                            </div>


                                            {/* JOB META */}

                                            <div
                                                className="
                                                    flex
                                                    flex-wrap
                                                    items-center
                                                    gap-x-7
                                                    gap-y-3
                                                "
                                            >

                                                <div
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-2
                                                        text-[14px]
                                                        text-modura-gray-600
                                                    "
                                                >
                                                    <FiMapPin
                                                        size={15}
                                                        className="text-modura-secondary"
                                                    />

                                                    {position.location}
                                                </div>

                                                <div
                                                    className="
                                                        h-4
                                                        w-px
                                                        bg-modura-gray-300
                                                    "
                                                />

                                                <span
                                                    className="
                                                        text-[13px]
                                                        font-bold
                                                        tracking-[0.15em]
                                                        text-modura-secondary
                                                        uppercase
                                                    "
                                                >
                                                    {position.type}
                                                </span>
                                            </div>
                                        </div>
                                    </div>


                                    {/* =================================================
                                        DESCRIPTION
                                    ================================================= */}

                                    <div
                                        className="
                                            px-6
                                            py-5

                                            md:px-8
                                            md:py-6
                                        "
                                    >
                                        <p
                                            className="
                                                max-w-[1000px]
                                                text-[14px]
                                                leading-6
                                                text-modura-gray-600

                                                md:text-[15px]
                                            "
                                        >
                                            {position.description}
                                        </p>


                                        {/* =================================================
                                                SKILLS + RESPONSIBILITIES
                                            ================================================= */}

                                            {(position.skills?.length > 0 ||
                                                position.responsibilities?.length > 0) && (
                                                <div
                                                    className="
                                                        mt-8
                                                        grid
                                                        gap-8
                                                        border-t
                                                        border-modura-gray-200
                                                        pt-8

                                                        md:grid-cols-2
                                                        md:gap-10
                                                    "
                                                >

                                                    {/* =================================================
                                                        KEY SKILLS
                                                    ================================================= */}

                                                    {position.skills?.length > 0 && (
                                                        <div
                                                            className={`
                                                                ${
                                                                    position.responsibilities?.length > 0
                                                                        ? `
                                                                            md:border-r
                                                                            md:border-modura-gray-200
                                                                            md:pr-10
                                                                        `
                                                                        : ''
                                                                }
                                                            `}
                                                        >
                                                            <h4
                                                                className="
                                                                    text-[16px]
                                                                    font-bold
                                                                    tracking-[0.18em]
                                                                    text-modura-primary
                                                                    uppercase
                                                                "
                                                            >
                                                                Key Skills
                                                            </h4>

                                                            <ul
                                                                className="
                                                                    mt-2
                                                                    space-y-3
                                                                "
                                                            >
                                                                {position.skills.map(
                                                                    (
                                                                        skill: string,
                                                                        skillIndex: number,
                                                                    ) => (
                                                                        <li
                                                                            key={skillIndex}
                                                                            className="
                                                                                flex
                                                                                items-start
                                                                                gap-3
                                                                                text-[14px]
                                                                                leading-6
                                                                                text-modura-gray-600
                                                                                mb-0
                                                                            "
                                                                        >
                                                                            <span
                                                                                className="
                                                                                    mt-[9px]
                                                                                    h-[5px]
                                                                                    w-[5px]
                                                                                    shrink-0
                                                                                    bg-modura-secondary
                                                                                "
                                                                            />

                                                                            <span>
                                                                                {skill}
                                                                            </span>
                                                                        </li>
                                                                    ),
                                                                )}
                                                            </ul>
                                                        </div>
                                                    )}


                                                    {/* =================================================
                                                        RESPONSIBILITIES
                                                    ================================================= */}

                                                    {position.responsibilities?.length > 0 && (
                                                        <div>
                                                            <h4
                                                                className="
                                                                    text-[16px]
                                                                    font-bold
                                                                    tracking-[0.18em]
                                                                    text-modura-primary
                                                                    uppercase
                                                                "
                                                            >
                                                                Responsibilities
                                                            </h4>

                                                            <ul
                                                                className="
                                                                    mt-2
                                                                    space-y-3
                                                                "
                                                            >
                                                                {position.responsibilities.map(
                                                                    (
                                                                        responsibility: string,
                                                                        responsibilityIndex: number,
                                                                    ) => (
                                                                        <li
                                                                            key={responsibilityIndex}
                                                                            className="
                                                                                flex
                                                                                items-start
                                                                                gap-3
                                                                                text-[14px]
                                                                                leading-6
                                                                                text-modura-gray-600
                                                                                mb-0
                                                                            "
                                                                        >
                                                                            <span
                                                                                className="
                                                                                    mt-[9px]
                                                                                    h-[5px]
                                                                                    w-[5px]
                                                                                    shrink-0
                                                                                    bg-modura-secondary
                                                                                "
                                                                            />

                                                                            <span>
                                                                                {responsibility}
                                                                            </span>
                                                                        </li>
                                                                    ),
                                                                )}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                        {/* =================================================
                                            BOTTOM INFORMATION
                                        ================================================= */}

                                        <div
                                            className="
                                                mt-8
                                                flex
                                                flex-col
                                                gap-6
                                                border-t
                                                border-modura-gray-200
                                                pt-7

                                                md:flex-row
                                                md:items-end
                                                md:justify-between
                                            "
                                        >

                                            {/* INFORMATION */}

                                            <div
                                                className="
                                                    grid
                                                    gap-6

                                                    sm:grid-cols-3
                                                    sm:gap-10
                                                "
                                            >

                                                {/* QUALIFICATION */}

                                                <div>
                                                    <p
                                                        className="
                                                            text-[15px]
                                                            font-bold
                                                            tracking-[0.2em]
                                                            text-modura-secondary
                                                            uppercase
                                                        "
                                                    >
                                                        Qualification
                                                    </p>

                                                    <p
                                                        className="
                                                            mt-2
                                                            max-w-[190px]
                                                            text-[13px]
                                                            leading-4
                                                            text-modura-gray-600
                                                        "
                                                    >
                                                        {position.qualification}
                                                    </p>
                                                </div>


                                                {/* EXPERIENCE */}

                                                <div>
                                                    <p
                                                        className="
                                                            text-[15px]
                                                            font-bold
                                                            tracking-[0.2em]
                                                            text-modura-secondary
                                                            uppercase
                                                        "
                                                    >
                                                        Experience
                                                    </p>

                                                    <p
                                                        className="
                                                            mt-2
                                                            text-[13px]
                                                            leading-5
                                                            text-modura-gray-600
                                                        "
                                                    >
                                                        {position.experience}
                                                    </p>
                                                </div>


                                                {/* VACANCY */}

                                                <div>
                                                    <p
                                                        className="
                                                            text-[15px]
                                                            font-bold
                                                            tracking-[0.2em]
                                                            text-modura-secondary
                                                            uppercase
                                                        "
                                                    >
                                                        No. Of Vacancy
                                                    </p>

                                                    <p
                                                        className="
                                                            mt-2
                                                            text-[13px]
                                                            leading-5
                                                            text-modura-gray-600
                                                        "
                                                    >
                                                        {position.vacancy}
                                                    </p>
                                                </div>
                                            </div>


                                            {/* =================================================
                                                APPLY BUTTON
                                            ================================================= */}

                                            <Link
                                                href="#application"
                                                className="
                                                    group/apply
                                                    border-modura-primary
                                                    bg-modura-white
                                                    text-modura-primary
                                                    relative
                                                    inline-flex
                                                    h-[52px]
                                                    w-fit
                                                    shrink-0
                                                    items-center
                                                    overflow-hidden
                                                    border
                                                    pr-[62px]
                                                    pl-5
                                                "
                                            >

                                                {/* PRIMARY FILL */}

                                                <span
                                                    className="
                                                        bg-modura-primary
                                                        absolute
                                                        inset-y-0
                                                        left-0
                                                        w-0
                                                        transition-all
                                                        duration-500
                                                        group-hover/apply:w-full
                                                    "
                                                />

                                                {/* TOP LINE */}

                                                <span
                                                    className="
                                                        bg-modura-secondary
                                                        absolute
                                                        top-0
                                                        left-0
                                                        z-10
                                                        h-[3px]
                                                        w-8
                                                        transition-all
                                                        duration-500
                                                        group-hover/apply:w-full
                                                    "
                                                />

                                                {/* TECHNICAL MARK */}

                                                <span
                                                    className="
                                                        relative
                                                        z-10
                                                        mr-3
                                                        flex
                                                        items-center
                                                    "
                                                >
                                                    <span
                                                        className="
                                                            bg-modura-secondary
                                                            group-hover/apply:bg-modura-white
                                                            h-[5px]
                                                            w-[5px]
                                                            rotate-45
                                                            transition-colors
                                                            duration-300
                                                        "
                                                    />
                                                </span>

                                                {/* TEXT */}

                                                <span
                                                    className="
                                                        group-hover/apply:text-modura-white
                                                        relative
                                                        z-10
                                                        text-[11px]
                                                        font-bold
                                                        tracking-[0.12em]
                                                        whitespace-nowrap
                                                        uppercase
                                                        transition-colors
                                                        duration-300
                                                    "
                                                >
                                                    Apply Now
                                                </span>

                                                {/* ARROW */}

                                                <span
                                                    className="
                                                        bg-modura-primary
                                                        text-modura-white
                                                        group-hover/apply:bg-modura-secondary
                                                        absolute
                                                        top-0
                                                        right-0
                                                        z-10
                                                        flex
                                                        h-full
                                                        w-[48px]
                                                        items-center
                                                        justify-center
                                                        transition-colors
                                                        duration-300
                                                    "
                                                >
                                                    <FiArrowUpRight
                                                        className="
                                                            text-[18px]
                                                            transition-transform
                                                            duration-300
                                                            group-hover/apply:rotate-45
                                                        "
                                                    />
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </article>
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
                        py-10
                        md:py-14
                        
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
                                        mb-2
                                        flex
                                        items-center
                                        gap-3
                                    "
                                >
                                    
                                    <span
                                        className="
                                            text-[13px]
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
                                        mt-4
                                        max-w-[430px]
                                        text-[15px]
                                        leading-6
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

                            {/* =================================================
                                APPLICATION FORM
                            ================================================= */}

                            <form className="grid gap-6">

                                {/* =================================================
                                    NAME + EMAIL
                                ================================================= */}

                                <div
                                    className="
                                        grid
                                        gap-5
                                        md:grid-cols-2
                                    "
                                >
                                    {/* NAME */}

                                    <div>
                                        <label
                                            className="
                                                mb-2
                                                block
                                                text-[14px]
                                                font-semibold
                                                text-modura-primary
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
                                                text-[14px]
                                                text-modura-primary
                                                outline-none
                                                transition-all
                                                duration-300
                                                placeholder:text-modura-gray-400
                                                focus:border-modura-secondary
                                                focus:ring-1
                                                focus:ring-modura-secondary/20
                                            "
                                        />
                                    </div>


                                    {/* EMAIL */}

                                    <div>
                                        <label
                                            className="
                                                mb-2
                                                block
                                                text-[14px]
                                                font-semibold
                                                text-modura-primary
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
                                                text-[14px]
                                                text-modura-primary
                                                outline-none
                                                transition-all
                                                duration-300
                                                placeholder:text-modura-gray-400
                                                focus:border-modura-secondary
                                                focus:ring-1
                                                focus:ring-modura-secondary/20
                                            "
                                        />
                                    </div>
                                </div>


                                {/* =================================================
                                    PHONE + EXPERIENCE
                                ================================================= */}

                                <div
                                    className="
                                        grid
                                        gap-5
                                        md:grid-cols-2
                                    "
                                >
                                    {/* PHONE */}

                                    <div>
                                        <label
                                            className="
                                                mb-2
                                                block
                                                text-[14px]
                                                font-semibold
                                                text-modura-primary
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
                                                text-[14px]
                                                text-modura-primary
                                                outline-none
                                                transition-all
                                                duration-300
                                                placeholder:text-modura-gray-400
                                                focus:border-modura-secondary
                                                focus:ring-1
                                                focus:ring-modura-secondary/20
                                            "
                                        />
                                    </div>


                                    {/* EXPERIENCE */}

                                    <div>
                                        <label
                                            className="
                                                mb-2
                                                block
                                                text-[14px]
                                                font-semibold
                                                text-modura-primary
                                            "
                                        >
                                            Experience *
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="e.g. 3 years"
                                            className="
                                                h-14
                                                w-full
                                                border
                                                border-modura-gray-300
                                                bg-modura-white
                                                px-4
                                                text-[14px]
                                                text-modura-primary
                                                outline-none
                                                transition-all
                                                duration-300
                                                placeholder:text-modura-gray-400
                                                focus:border-modura-secondary
                                                focus:ring-1
                                                focus:ring-modura-secondary/20
                                            "
                                        />
                                    </div>
                                </div>


                                {/* =================================================
                                    POSITION
                                ================================================= */}

                                <div>
                                    <label
                                        className="
                                            mb-2
                                            block
                                            text-[14px]
                                            font-semibold
                                            text-modura-primary
                                        "
                                    >
                                        Position *
                                    </label>

                                    <div className="relative">
                                        <FiBriefcase
                                            size={18}
                                            className="
                                                text-modura-secondary
                                                pointer-events-none
                                                absolute
                                                top-1/2
                                                left-4
                                                z-10
                                                -translate-y-1/2
                                            "
                                        />

                                        <select
                                            defaultValue=""
                                            className="
                                                h-14
                                                w-full
                                                appearance-none
                                                border
                                                border-modura-gray-300
                                                bg-modura-white
                                                px-12
                                                pr-12
                                                text-[14px]
                                                text-modura-primary
                                                outline-none
                                                transition-all
                                                duration-300
                                                focus:border-modura-secondary
                                                focus:ring-1
                                                focus:ring-modura-secondary/20
                                            "
                                        >
                                            <option
                                                value=""
                                                disabled
                                            >
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

                                        <span
                                            className="
                                                pointer-events-none
                                                absolute
                                                top-1/2
                                                right-4
                                                -translate-y-1/2
                                                text-modura-secondary
                                            "
                                        >
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                            >
                                                <path
                                                    d="M4 6L8 10L12 6"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </span>
                                    </div>
                                </div>


                                {/* =================================================
                                    CURRENT CTC + EXPECTED CTC
                                ================================================= */}

                                <div
                                    className="
                                        grid
                                        gap-5
                                        md:grid-cols-2
                                    "
                                >
                                    {/* CURRENT CTC */}

                                    <div>
                                        <label
                                            className="
                                                mb-2
                                                block
                                                text-[14px]
                                                font-semibold
                                                text-modura-primary
                                            "
                                        >
                                            Current CTC *
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="Enter current CTC"
                                            className="
                                                h-14
                                                w-full
                                                border
                                                border-modura-gray-300
                                                bg-modura-white
                                                px-4
                                                text-[14px]
                                                text-modura-primary
                                                outline-none
                                                transition-all
                                                duration-300
                                                placeholder:text-modura-gray-400
                                                focus:border-modura-secondary
                                                focus:ring-1
                                                focus:ring-modura-secondary/20
                                            "
                                        />
                                    </div>


                                    {/* EXPECTED CTC */}

                                    <div>
                                        <label
                                            className="
                                                mb-2
                                                block
                                                text-[14px]
                                                font-semibold
                                                text-modura-primary
                                            "
                                        >
                                            Expected CTC *
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="Enter expected CTC"
                                            className="
                                                h-14
                                                w-full
                                                border
                                                border-modura-gray-300
                                                bg-modura-white
                                                px-4
                                                text-[14px]
                                                text-modura-primary
                                                outline-none
                                                transition-all
                                                duration-300
                                                placeholder:text-modura-gray-400
                                                focus:border-modura-secondary
                                                focus:ring-1
                                                focus:ring-modura-secondary/20
                                            "
                                        />
                                    </div>
                                </div>


                                {/* =================================================
                                    NOTICE PERIOD + PORTFOLIO
                                ================================================= */}

                                <div
                                    className="
                                        grid
                                        gap-5
                                        md:grid-cols-2
                                    "
                                >
                                    {/* NOTICE PERIOD */}

                                    <div>
                                        <label
                                            className="
                                                mb-2
                                                block
                                                text-[14px]
                                                font-semibold
                                                text-modura-primary
                                            "
                                        >
                                            Notice Period *
                                        </label>

                                        <div className="relative">
                                            <input
                                                type="number"
                                                min="0"
                                                placeholder="Enter notice period in months"
                                                className="
                                                    h-14
                                                    w-full
                                                    border
                                                    border-modura-gray-300
                                                    bg-modura-white
                                                    px-4
                                                    text-[14px]
                                                    text-modura-primary
                                                    outline-none
                                                    transition-all
                                                    duration-300
                                                    placeholder:text-modura-gray-400
                                                    focus:border-modura-secondary
                                                    focus:ring-1
                                                    focus:ring-modura-secondary/20
                                                "
                                            />

                                            
                                        </div>
                                    </div>


                                    {/* PORTFOLIO */}

                                    <div>
                                        <label
                                            className="
                                                mb-2
                                                block
                                                text-[14px]
                                                font-semibold
                                                text-modura-primary
                                            "
                                        >
                                            Portfolio Link
                                        </label>

                                        <input
                                            type="url"
                                            placeholder="https://yourportfolio.com"
                                            className="
                                                h-14
                                                w-full
                                                border
                                                border-modura-gray-300
                                                bg-modura-white
                                                px-4
                                                text-[14px]
                                                text-modura-primary
                                                outline-none
                                                transition-all
                                                duration-300
                                                placeholder:text-modura-gray-400
                                                focus:border-modura-secondary
                                                focus:ring-1
                                                focus:ring-modura-secondary/20
                                            "
                                        />
                                    </div>
                                </div>


                                {/* =================================================
                                    COVER LETTER
                                ================================================= */}

                                <div>
                                    <label
                                        className="
                                            mb-2
                                            block
                                            text-[14px]
                                            font-semibold
                                            text-modura-primary
                                        "
                                    >
                                        Cover Letter *
                                    </label>

                                    <textarea
                                        rows={7}
                                        placeholder="Tell us about yourself, your experience, expertise and why you would be a good fit for this position..."
                                        className="
                                            w-full
                                            resize-none
                                            border
                                            border-modura-gray-300
                                            bg-modura-white
                                            px-4
                                            py-4
                                            text-[14px]
                                            leading-7
                                            text-modura-primary
                                            outline-none
                                            transition-all
                                            duration-300
                                            placeholder:text-modura-gray-400
                                            focus:border-modura-secondary
                                            focus:ring-1
                                            focus:ring-modura-secondary/20
                                        "
                                    />
                                </div>


                                {/* =================================================
                                    CREATIVE RESUME UPLOAD
                                ================================================= */}

                                <div>
                                    <label
                                        className="
                                            mb-2
                                            block
                                            text-[14px]
                                            font-semibold
                                            text-modura-primary
                                        "
                                    >
                                        Upload Resume *
                                    </label>

                                    <label
                                        className="
                                            group
                                            relative
                                            flex
                                            min-h-[145px]
                                            cursor-pointer
                                            items-center
                                            justify-center
                                            overflow-hidden
                                            border
                                            border-dashed
                                            border-modura-gray-300
                                            bg-modura-off-white
                                            px-6
                                            py-8
                                            transition-all
                                            duration-300
                                            hover:border-modura-secondary
                                            hover:bg-modura-light
                                        "
                                    >
                                        {/* BACKGROUND ACCENT */}

                                        <span
                                            className="
                                                pointer-events-none
                                                absolute
                                                top-0
                                                left-0
                                                h-[3px]
                                                w-14
                                                bg-modura-secondary
                                                transition-all
                                                duration-500
                                                group-hover:w-full
                                            "
                                        />

                                        <span
                                            className="
                                                pointer-events-none
                                                absolute
                                                right-0
                                                bottom-0
                                                h-14
                                                w-14
                                                border-t
                                                border-l
                                                border-modura-secondary/20
                                            "
                                        />

                                        <div
                                            className="
                                                relative
                                                z-10
                                                flex
                                                flex-col
                                                items-center
                                                text-center
                                            "
                                        >
                                            {/* =================================================
                                                FILE ICON
                                            ================================================= */}

                                            <span
                                                className={`
                                                    mb-4
                                                    flex
                                                    h-12
                                                    w-12
                                                    items-center
                                                    justify-center
                                                    border
                                                    bg-modura-white
                                                    transition-all
                                                    duration-300

                                                    ${
                                                        resume
                                                            ? 'border-modura-primary bg-modura-primary text-modura-white'
                                                            : 'border-modura-secondary text-modura-secondary group-hover:bg-modura-primary group-hover:text-modura-white'
                                                    }
                                                `}
                                            >
                                                {resume ? (
                                                    <FiCheck size={22} />
                                                ) : (
                                                    <FiUploadCloud size={22} />
                                                )}
                                            </span>


                                            {/* =================================================
                                                FILE NAME / DEFAULT TEXT
                                            ================================================= */}

                                            {resume ? (
                                                <>
                                                    <span
                                                        className="
                                                            max-w-[400px]
                                                            truncate
                                                            text-[14px]
                                                            font-semibold
                                                            text-modura-primary
                                                        "
                                                    >
                                                        {resume.name}
                                                    </span>

                                                    <span
                                                        className="
                                                            mt-1
                                                            text-[12px]
                                                            text-modura-gray-500
                                                        "
                                                    >
                                                        {(resume.size / 1024 / 1024).toFixed(2)} MB
                                                    </span>

                                                    <span
                                                        className="
                                                            mt-2
                                                            text-[11px]
                                                            font-medium
                                                            text-modura-secondary
                                                        "
                                                    >
                                                        Click to change file
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <span
                                                        className="
                                                            text-[14px]
                                                            font-semibold
                                                            text-modura-primary
                                                        "
                                                    >
                                                        Click to upload your resume
                                                    </span>

                                                    <span
                                                        className="
                                                            mt-1
                                                            text-[12px]
                                                            text-modura-gray-500
                                                        "
                                                    >
                                                        PDF, DOC or DOCX • Maximum 2 MB
                                                    </span>
                                                </>
                                            )}
                                        </div>


                                        {/* =================================================
                                            FILE INPUT
                                        ================================================= */}

                                        <input
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            className="hidden"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];

                                                if (!file) return;

                                                const maxSize = 2 * 1024 * 1024; // 2 MB

                                                if (file.size > maxSize) {
                                                    alert('File size must be less than 2 MB.');
                                                    e.target.value = '';
                                                    setResume(null);
                                                    return;
                                                }

                                                setResume(file);
                                            }}
                                        />
                                    </label>
                                </div>


                                {/* =================================================
                                    SUBMIT
                                ================================================= */}

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        className="
                                            group
                                            border-modura-primary
                                            bg-modura-white
                                            text-modura-primary
                                            relative
                                            inline-flex
                                            h-[52px]
                                            items-center
                                            overflow-hidden
                                            border
                                            pr-[62px]
                                            pl-5
                                        "
                                    >
                                        {/* PRIMARY FILL */}

                                        <span
                                            className="
                                                bg-modura-primary
                                                absolute
                                                inset-y-0
                                                left-0
                                                w-0
                                                transition-all
                                                duration-500
                                                group-hover:w-full
                                            "
                                        />

                                        {/* TOP LINE */}

                                        <span
                                            className="
                                                bg-modura-secondary
                                                absolute
                                                top-0
                                                left-0
                                                z-10
                                                h-[3px]
                                                w-8
                                                transition-all
                                                duration-500
                                                group-hover:w-full
                                            "
                                        />

                                        {/* TECHNICAL MARK */}

                                        <span
                                            className="
                                                relative
                                                z-10
                                                mr-3
                                                flex
                                                items-center
                                            "
                                        >
                                            <span
                                                className="
                                                    bg-modura-secondary
                                                    group-hover:bg-modura-white
                                                    h-[5px]
                                                    w-[5px]
                                                    rotate-45
                                                    transition-colors
                                                    duration-300
                                                "
                                            />
                                        </span>

                                        {/* TEXT */}

                                        <span
                                            className="
                                                group-hover:text-modura-white
                                                relative
                                                z-10
                                                text-[12px]
                                                font-bold
                                                tracking-[0.08em]
                                                whitespace-nowrap
                                                uppercase
                                                transition-colors
                                                duration-300
                                            "
                                        >
                                            Submit Application
                                        </span>

                                        {/* ARROW */}

                                        <span
                                            className="
                                                bg-modura-primary
                                                text-modura-white
                                                group-hover:bg-modura-secondary
                                                absolute
                                                top-0
                                                right-0
                                                z-10
                                                flex
                                                h-full
                                                w-[48px]
                                                items-center
                                                justify-center
                                                transition-colors
                                                duration-300
                                            "
                                        >
                                            <FiArrowUpRight
                                                className="
                                                    text-[18px]
                                                    transition-transform
                                                    duration-300
                                                    group-hover:rotate-45
                                                "
                                            />
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}