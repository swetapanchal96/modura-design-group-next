'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { apiUrl } from '@/app/(website)/config';

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

import Breadcrumb from '../../../components/Breadcrumb';
import breadcrumb from '@/app/(website)/assets/images/breadcrumb.jpg';

import careerImage from '@/app/(website)/assets/images/about-1.jpg';

gsap.registerPlugin(ScrollTrigger);

interface CareerPosition {
    id: number;
    jobTitle: string;
    slug: string;
    department: string;
    experience: string;
    location: string;
    jobType: string;
    openings: number;
    salaryRange: string | null;
    lastDate: string | null;
    description: string | null;
    requirements: string | null;
    skills: string | null;
    status: boolean;
}

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

function stripHtml(html: string | null): string {
    if (!html) return '';

    return html
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function splitLines(value: string | null): string[] {
    if (!value) return [];

    return value
        .split(/\r?\n/)
        .map((item) => item.trim())
        .filter(Boolean);
}

export default function CareerClient() {
    const [resume, setResume] = useState<File | null>(null);
    const router = useRouter();
    const [positions, setPositions] = useState<CareerPosition[]>([]);
    const [selectedCareerId, setSelectedCareerId] = useState<number | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        experience: '',
        currentCtc: '',
        expectedCtc: '',
        noticePeriod: '',
        portfolioLink: '',
        coverLetter: '',
        careerId: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loadingPositions, setLoadingPositions] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const sectionRef = useRef<HTMLDivElement | null>(null);

    // career api 
    useEffect(() => {
        const fetchCareers = async () => {
            try {
                setLoadingPositions(true);

                const response = await axios.post(
                    `${apiUrl}/careers`,
                    {}
                );

                if (
                    response.data?.success === true &&
                    Array.isArray(response.data?.data)
                ) {
                    setPositions(response.data.data);
                } else {
                    setPositions([]);
                }
            } catch (error) {
                console.error('Careers API Error:', error);
                setPositions([]);
            } finally {
                setLoadingPositions(false);
            }
        };

        fetchCareers();
    }, []);

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

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required.';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Please enter a valid name.';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ) {
            newErrors.email = 'Please enter a valid email address.';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required.';
        } else if (!/^[0-9]{1,15}$/.test(formData.phone)) {
            newErrors.phone =
                'Phone number must contain maximum 15 digits.';
        }

        if (!formData.experience.trim()) {
            newErrors.experience = 'Experience is required.';
        }

        if (!formData.currentCtc.trim()) {
            newErrors.currentCtc = 'Current CTC is required.';
        } else if (!/^\d+(\.\d+)?$/.test(formData.currentCtc)) {
            newErrors.currentCtc = 'Enter a valid CTC.';
        }

        if (!formData.expectedCtc.trim()) {
            newErrors.expectedCtc = 'Expected CTC is required.';
        } else if (!/^\d+(\.\d+)?$/.test(formData.expectedCtc)) {
            newErrors.expectedCtc = 'Enter a valid CTC.';
        }

        if (!formData.noticePeriod.trim()) {
            newErrors.noticePeriod =
                'Notice period is required.';
        }

        if (
            formData.portfolioLink.trim() &&
            !/^https?:\/\/.+/i.test(formData.portfolioLink)
        ) {
            newErrors.portfolioLink =
                'Enter a valid portfolio URL.';
        }

        if (!formData.coverLetter.trim()) {
            newErrors.coverLetter =
                'Cover letter is required.';
        }

        if (!formData.careerId) {
            newErrors.careerId =
                'Please select a position.';
        }

        if (!resume) {
            newErrors.resume =
                'Please upload your resume.';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // console.log("SUBMIT BUTTON CLICKED");

        const isValid = validateForm();

        // console.log("FORM VALID:", isValid);/
        // console.log("FORM DATA:", formData);
        // console.log("RESUME:", resume);

        if (!isValid) {
            console.log("FORM VALIDATION FAILED");
            return;
        }

        try {
            setSubmitting(true);

            const data = new FormData();

            data.append('careerId', formData.careerId);
            data.append('name', formData.name.trim());
            data.append('email', formData.email.trim());
            data.append('phone', formData.phone.trim());
            data.append('experience', formData.experience.trim());
            data.append('currentCtc', formData.currentCtc.trim());
            data.append('expectedCtc', formData.expectedCtc.trim());
            data.append('noticePeriod', formData.noticePeriod.trim());
            data.append('portfolioLink', formData.portfolioLink.trim());
            data.append('coverLetter', formData.coverLetter.trim());

            if (resume) {
                data.append('resume', resume);
            }

            // console.log("SENDING API REQUEST");

            const response = await axios.post(
                `${apiUrl}/careers/apply`,
                data
            );

            // console.log("API RESPONSE:", response.data);

            if (response.data?.success === true) {
                router.push('/thankyou/apply');

                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    experience: '',
                    currentCtc: '',
                    expectedCtc: '',
                    noticePeriod: '',
                    portfolioLink: '',
                    coverLetter: '',
                    careerId: '',
                });

                setSelectedCareerId(null);
                setResume(null);
                setErrors({});
            } else {
                alert(
                    response.data?.message ||
                    'Unable to submit application.'
                );
            }

        } catch (error) {
            console.error("APPLICATION API ERROR:", error);

            if (axios.isAxiosError(error)) {
                console.error(
                    "API ERROR RESPONSE:",
                    error.response?.data
                );

                alert(
                    error.response?.data?.message ||
                    'Something went wrong while submitting your application.'
                );
            } else {
                alert(
                    'Something went wrong while submitting your application.'
                );
            }
        } finally {
            setSubmitting(false);
        }
    };

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

                            {positions.map((position) => {
                                const skills = splitLines(position.requirements);
                                const responsibilities = splitLines(position.skills);
                                return (
                                    <article
                                        key={position.id}
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
                                                        {position.jobTitle}
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
                                                        {position.jobType === 'full_time'
                                                            ? 'Full Time'
                                                            : position.jobType === 'part_time'
                                                                ? 'Part Time'
                                                                : position.jobType === 'internship'
                                                                    ? 'Internship'
                                                                    : position.jobType}
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
                                                {stripHtml(position.description)}
                                            </p>


                                            {/* =================================================
                                                SKILLS + RESPONSIBILITIES
                                            ================================================= */}

                                            {(skills?.length > 0 ||
                                                responsibilities?.length > 0) && (
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

                                                        {skills?.length > 0 && (
                                                            <div
                                                                className={`
                                                                ${responsibilities?.length > 0
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
                                                                    {skills.map(
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

                                                        {responsibilities?.length > 0 && (
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
                                                                    {responsibilities.map(
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
                                                        flex-1
                                                        grid-cols-2
                                                        gap-6
                                                        sm:grid-cols-4
                                                        sm:gap-8
                                                    "
                                                >
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
                                                            {position.openings}
                                                        </p>
                                                    </div>

                                                    {/* SALARY */}

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
                                                            Salary Range
                                                        </p>

                                                        <p
                                                            className="
                                                                    mt-2
                                                                    text-[13px]
                                                                    leading-5
                                                                    text-modura-gray-600
                                                                "
                                                        >
                                                            {position.salaryRange
                                                                ? `₹${position.salaryRange.replace('-', ' - ₹')}`
                                                                : 'Not Disclosed'}
                                                        </p>
                                                    </div>

                                                    {/* LAST DATE */}

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
                                                            Last Date
                                                        </p>

                                                        <p
                                                            className="
                                                                mt-2
                                                                text-[13px]
                                                                leading-5
                                                                text-modura-gray-600
                                                            "
                                                        >
                                                            {position.lastDate
                                                                ? new Date(position.lastDate).toLocaleDateString(
                                                                    'en-IN',
                                                                    {
                                                                        day: '2-digit',
                                                                        month: 'short',
                                                                        year: 'numeric',
                                                                    }
                                                                )
                                                                : 'Not Specified'}
                                                        </p>
                                                    </div>
                                                </div>


                                                {/* =================================================
                                                APPLY BUTTON
                                            ================================================= */}

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedCareerId(position.id);

                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            careerId: String(position.id),
                                                        }));

                                                        setErrors((prev) => ({
                                                            ...prev,
                                                            careerId: '',
                                                        }));

                                                        document
                                                            .getElementById('application')
                                                            ?.scrollIntoView({
                                                                behavior: 'smooth',
                                                                block: 'start',
                                                            });
                                                    }}
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
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                )
                            })}
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

                            <form
                                noValidate
                                className="grid gap-6"
                                onSubmit={handleSubmit}
                            >

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
                                            value={formData.name}
                                            onChange={(e) => {
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    name: e.target.value,
                                                }));

                                                setErrors((prev) => ({
                                                    ...prev,
                                                    name: '',
                                                }));
                                            }}
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
                                        {errors.name && (
                                            <p className="mt-1 text-xs text-red-600">
                                                {errors.name}
                                            </p>
                                        )}
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
                                            value={formData.email}
                                            onChange={(e) => {
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    email: e.target.value,
                                                }));

                                                setErrors((prev) => ({
                                                    ...prev,
                                                    email: '',
                                                }));
                                            }}
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
                                        {errors.email && (
                                            <p className="mt-1 text-xs text-red-600">
                                                {errors.email}
                                            </p>
                                        )}
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
                                            value={formData.phone}
                                            maxLength={15}
                                            onChange={(e) => {
                                                const value = e.target.value
                                                    .replace(/\D/g, '')
                                                    .slice(0, 15);

                                                setFormData((prev) => ({
                                                    ...prev,
                                                    phone: value,
                                                }));

                                                setErrors((prev) => ({
                                                    ...prev,
                                                    phone: '',
                                                }));
                                            }}
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
                                        {errors.phone && (
                                            <p className="mt-1 text-xs text-red-600">
                                                {errors.phone}
                                            </p>
                                        )}
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
                                            value={formData.experience}
                                            onChange={(e) => {
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    experience: e.target.value,
                                                }));

                                                setErrors((prev) => ({
                                                    ...prev,
                                                    experience: '',
                                                }));
                                            }}
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
                                            value={formData.careerId}
                                            onChange={(e) => {
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    careerId: e.target.value,
                                                }));

                                                setErrors((prev) => ({
                                                    ...prev,
                                                    careerId: '',
                                                }));
                                            }}
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
                                                    key={position.id}
                                                    value={position.id}
                                                >
                                                    {position.jobTitle}
                                                </option>
                                            ))}
                                        </select>

                                        {errors.careerId && (
                                            <p className="mt-1 text-xs text-red-600">
                                                {errors.careerId}
                                            </p>
                                        )}

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
                                            inputMode="numeric"
                                            maxLength={6}
                                            placeholder="Enter current CTC"
                                            value={formData.currentCtc}
                                            onChange={(e) => {
                                                const value = e.target.value
                                                    .replace(/\D/g, '');

                                                setFormData((prev) => ({
                                                    ...prev,
                                                    currentCtc: value,
                                                }));

                                                setErrors((prev) => ({
                                                    ...prev,
                                                    currentCtc: '',
                                                }));
                                            }}
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
                                            maxLength={6}
                                            inputMode="numeric"
                                            placeholder="Enter expected CTC"
                                            value={formData.expectedCtc}
                                            onChange={(e) => {
                                                const value = e.target.value
                                                    .replace(/\D/g, '');

                                                setFormData((prev) => ({
                                                    ...prev,
                                                    expectedCtc: value,
                                                }));

                                                setErrors((prev) => ({
                                                    ...prev,
                                                    expectedCtc: '',
                                                }));
                                            }}
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
                                                value={formData.noticePeriod}
                                                onChange={(e) => {
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        noticePeriod: e.target.value,
                                                    }));

                                                    setErrors((prev) => ({
                                                        ...prev,
                                                        noticePeriod: '',
                                                    }));
                                                }}
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
                                            value={formData.portfolioLink}
                                            onChange={(e) => {
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    portfolioLink: e.target.value,
                                                }));

                                                setErrors((prev) => ({
                                                    ...prev,
                                                    portfolioLink: '',
                                                }));
                                            }}
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
                                        value={formData.coverLetter}
                                        onChange={(e) => {
                                            setFormData((prev) => ({
                                                ...prev,
                                                coverLetter: e.target.value,
                                            }));

                                            setErrors((prev) => ({
                                                ...prev,
                                                coverLetter: '',
                                            }));
                                        }}
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

                                                    ${resume
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

                                                const allowedTypes = [
                                                    'application/pdf',
                                                    'application/msword',
                                                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                                                ];

                                                const maxSize = 2 * 1024 * 1024;

                                                if (!allowedTypes.includes(file.type)) {
                                                    alert(
                                                        'Only PDF, DOC or DOCX files are allowed.'
                                                    );

                                                    e.target.value = '';
                                                    setResume(null);
                                                    return;
                                                }

                                                if (file.size > maxSize) {
                                                    alert(
                                                        'File size must be less than 2 MB.'
                                                    );

                                                    e.target.value = '';
                                                    setResume(null);
                                                    return;
                                                }

                                                setResume(file);

                                                setErrors((prev) => ({
                                                    ...prev,
                                                    resume: '',
                                                }));
                                            }}
                                        />
                                    </label>

                                    {errors.resume && (
                                        <p className="mt-1 text-xs text-red-600">
                                            {errors.resume}
                                        </p>
                                    )}
                                </div>


                                {/* =================================================
                                    SUBMIT
                                ================================================= */}

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={submitting}
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
                                            {submitting
                                                ? 'Submitting...'
                                                : 'Submit Application'}
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