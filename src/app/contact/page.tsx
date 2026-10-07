'use client';

import { FormEvent, useState } from 'react';

import Breadcrumb from '../components/Breadcrumb';
import breadcrumb from '@/app/assets/images/breadcrumb.jpg';

import {
    FiArrowRight,
    FiBriefcase,
    FiChevronRight,
    FiGlobe,
    FiMail,
    FiMapPin,
    FiPhone,
    FiSend,
} from 'react-icons/fi';

/* =========================================================
   TYPES
========================================================= */

type FormData = {
    name: string;
    email: string;
    company: string;
    phone: string;
    natureOfProject: string;
    description: string;
};

/* =========================================================
   DATA
========================================================= */

const projectOptions = [
    'Architecture Design',
    'BIM Solutions',
    'Structural Engineering',
    'Project Management',
    'Steel Detailing',
    'Shop Drawing',
    'Other',
];

const contactDetails = [
    {
        number: '01',
        label: 'EMAIL',
        title: 'Write To Us',
        value: 'info@moduradesigngroup.com',
        icon: <FiMail size={19} />,
        href: 'mailto:info@moduradesigngroup.com',
    },
    {
        number: '02',
        label: 'PHONE',
        title: 'Talk To Us',
        value: '+91 00000 00000',
        icon: <FiPhone size={19} />,
        href: 'tel:+910000000000',
    },
    {
        number: '03',
        label: 'OFFICE',
        title: 'Ahmedabad, India',
        value: 'Gujarat, India',
        icon: <FiMapPin size={19} />,
        href: '#location',
    },
];

/* =========================================================
   CUSTOM DROPDOWN
========================================================= */

function ProjectDropdown({
    value,
    onChange,
}: {
    value: string;
    onChange: (value: string) => void;
}) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            <label
                className="
                    mb-2.5 block
                    text-[11px]
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    text-modura-primary
                "
            >
                Nature Of Project
                <span className="ml-1 text-red-600">*</span>
            </label>

            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className={`
                    relative flex h-[60px] w-full items-center
                    border bg-modura-white text-left
                    transition-all duration-300
                    ${open
                        ? 'border-modura-primary'
                        : 'border-modura-gray-200 hover:border-modura-secondary'
                    }
                `}
            >
                <span
                    className={`
                        flex h-full w-[58px] shrink-0 items-center justify-center
                        border-r border-modura-gray-200
                        transition-all duration-300
                        ${open
                            ? 'bg-modura-primary text-modura-white'
                            : 'text-modura-secondary'
                        }
                    `}
                >
                    <FiBriefcase size={18} />
                </span>

                <span
                    className={`
                        flex-1 px-5 text-[14px] font-medium
                        ${value
                            ? 'text-modura-primary'
                            : 'text-modura-gray-400'
                        }
                    `}
                >
                    {value || 'Select nature of project'}
                </span>

                <span className="mr-5 flex h-5 w-5 items-center justify-center">
                    <span
                        className={`
                            h-[8px] w-[8px]
                            border-b border-r border-modura-primary
                            transition-transform duration-300
                            ${open
                                ? 'translate-y-[2px] rotate-[225deg]'
                                : '-translate-y-[2px] rotate-45'
                            }
                        `}
                    />
                </span>

                <span
                    className={`
                        absolute bottom-0 left-0 h-[2px]
                        bg-modura-primary transition-all duration-500
                        ${open ? 'w-full' : 'w-0'}
                    `}
                />
            </button>

            <div
                className={`
                    absolute left-0 right-0 z-50 mt-2
                    overflow-hidden border border-modura-gray-200
                    bg-modura-white
                    shadow-[0_20px_50px_rgba(11,29,51,0.14)]
                    transition-all duration-300
                    ${open
                        ? 'visible translate-y-0 opacity-100'
                        : 'invisible -translate-y-2 opacity-0'
                    }
                `}
            >
                {projectOptions.map((option) => {
                    const selected = value === option;

                    return (
                        <button
                            key={option}
                            type="button"
                            onClick={() => {
                                onChange(option);
                                setOpen(false);
                            }}
                            className={`
                                group relative flex min-h-[49px] w-full
                                items-center px-5 text-left
                                transition-all duration-200
                                ${selected
                                    ? 'bg-modura-primary text-modura-white'
                                    : 'text-modura-primary hover:bg-modura-off-white'
                                }
                            `}
                        >
                            <span
                                className={`
                                    absolute bottom-0 left-0 top-0 w-[3px]
                                    bg-modura-secondary-light
                                    ${selected
                                        ? 'opacity-100'
                                        : 'opacity-0 group-hover:opacity-100'
                                    }
                                `}
                            />

                            <span className="text-[14px] font-medium">
                                {option}
                            </span>

                            {selected && (
                                <FiChevronRight
                                    size={16}
                                    className="ml-auto"
                                />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

/* =========================================================
   INPUT
========================================================= */

function InputField({
    label,
    placeholder,
    value,
    onChange,
    type = 'text',
    icon,
}: {
    label: string;
    placeholder: string;
    value: string;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
    type?: string;
    icon: React.ReactNode;
}) {
    return (
        <div className="group">
            <label
                className="
                    mb-2.5 block
                    text-[13px]
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    text-modura-primary
                "
            >
                {label}
                <span className="ml-1 text-red-600">*</span>
            </label>

            <div
                className="
                    relative flex h-[60px]
                    border border-modura-gray-200
                    bg-modura-white
                    transition-all duration-300
                    hover:border-modura-secondary
                    focus-within:border-modura-primary
                "
            >
                <span
                    className="
                        flex h-full w-[58px] shrink-0
                        items-center justify-center
                        border-r border-modura-gray-200
                        text-modura-secondary
                        transition-colors duration-300
                        group-focus-within:text-modura-primary
                    "
                >
                    {icon}
                </span>

                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="
                        h-full w-full min-w-0
                        bg-transparent px-5
                        text-[14px] font-medium
                        text-modura-primary
                        outline-none
                        placeholder:text-modura-gray-400
                    "
                />

                <span
                    className="
                        absolute bottom-0 left-0
                        h-[2px] w-0
                        bg-modura-primary
                        transition-all duration-500
                        group-focus-within:w-full
                    "
                />
            </div>
        </div>
    );
}

/* =========================================================
   CONTACT PAGE
========================================================= */

export default function ContactPage() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        company: '',
        phone: '',
        natureOfProject: '',
        description: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const updateField = (
        field: keyof FormData,
        value: string
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(formData);

        setSubmitted(true);

        setTimeout(() => {
            setSubmitted(false);
        }, 5000);
    };

    return (
        <>
            {/* =====================================================
                BREADCRUMB
            ===================================================== */}

            <Breadcrumb
                title="Contact"
                image={breadcrumb.src}
            />

            {/* =====================================================
                MAIN CONTACT AREA
            ===================================================== */}

            <section className="relative overflow-hidden bg-modura-white py-16 md:py-16">
                
                <div className="relative mx-auto w-full max-w-[1320px] px-5 md:px-8">

                    {/* =================================================
                        INTRO
                    ================================================= */}

                    <div className="mb-10 grid gap-8 lg:grid-cols-[1fr_380px] lg:items-end">
                        <div>
                            <div className="mb-3 flex items-center gap-3">
                               

                                <span
                                    className="
                                        text-[10px]
                                        font-bold
                                        uppercase
                                        tracking-[0.38em]
                                        text-modura-secondary
                                    "
                                >
                                    START A CONVERSATION
                                </span>
                            </div>

                            <h1
                                className="
                                    max-w-[760px]
                                    text-[40px]
                                    font-bold
                                    leading-[0.98]
                                    tracking-[-0.04em]
                                    text-modura-primary
                                    md:text-[58px]
                                "
                            >
                                LET&apos;S BUILD
                                <br />
                                <span className="text-modura-secondary">
                                    SOMETHING GREAT.
                                </span>
                            </h1>
                        </div>

                        <p
                            className="
                                max-w-[380px]
                                border-l-2
                                border-modura-gray-200
                                pl-5
                                text-[14px]
                                leading-7
                                text-modura-gray-500
                            "
                        >
                            Have a project in mind? Tell us what
                            you are planning and our team will
                            get in touch with you.
                        </p>
                    </div>

                    {/* =================================================
                        FORM + CONTACT INFORMATION
                    ================================================= */}

                    <div
                        className="
                            grid
                            overflow-hidden
                            border
                            border-modura-gray-200
                            bg-modura-off-white

                            lg:grid-cols-[1.15fr_0.85fr]
                        "
                    >
                        {/* =================================================
                            FORM
                        ================================================= */}

                        <div
                            className="
                                bg-modura-white
                                p-7

                                md:p-10

                                lg:p-12
                            "
                        >
                            
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                {/* NAME + EMAIL */}

                                <div
                                    className="
                                        grid
                                        grid-cols-1
                                        gap-5
                                        md:grid-cols-2
                                    "
                                >
                                    <InputField
                                        label="Name"
                                        placeholder="Your full name"
                                        value={formData.name}
                                        onChange={(e) =>
                                            updateField(
                                                'name',
                                                e.target.value
                                            )
                                        }
                                        icon={
                                            <FiUser size={18} />
                                        }
                                    />

                                    <InputField
                                        label="Email"
                                        type="email"
                                        placeholder="Your email address"
                                        value={formData.email}
                                        onChange={(e) =>
                                            updateField(
                                                'email',
                                                e.target.value
                                            )
                                        }
                                        icon={
                                            <FiMail size={18} />
                                        }
                                    />
                                </div>

                                {/* COMPANY + PHONE */}

                                <div
                                    className="
                                        grid
                                        grid-cols-1
                                        gap-5
                                        md:grid-cols-2
                                    "
                                >
                                    <InputField
                                        label="Company Name"
                                        placeholder="Your company name"
                                        value={formData.company}
                                        onChange={(e) =>
                                            updateField(
                                                'company',
                                                e.target.value
                                            )
                                        }
                                        icon={
                                            <FiBriefcase
                                                size={18}
                                            />
                                        }
                                    />

                                    <InputField
                                        label="Phone Number"
                                        type="tel"
                                        placeholder="Your phone number"
                                        value={formData.phone}
                                        onChange={(e) =>
                                            updateField(
                                                'phone',
                                                e.target.value
                                            )
                                        }
                                        icon={
                                            <FiPhone size={18} />
                                        }
                                    />
                                </div>

                                {/* PROJECT */}

                                <ProjectDropdown
                                    value={
                                        formData.natureOfProject
                                    }
                                    onChange={(value) =>
                                        updateField(
                                            'natureOfProject',
                                            value
                                        )
                                    }
                                />

                                {/* DESCRIPTION */}

                                <div className="group">
                                    <label
                                        className="
                                            mb-2.5 block
                                            text-[11px]
                                            font-bold
                                            uppercase
                                            tracking-[0.16em]
                                            text-modura-primary
                                        "
                                    >
                                        Description
                                        <span className="ml-1 text-red-600">
                                            *
                                        </span>
                                    </label>

                                    <div
                                        className="
                                            relative
                                            border
                                            border-modura-gray-200
                                            bg-modura-white
                                            transition-all duration-300
                                            focus-within:border-modura-primary
                                        "
                                    >
                                        <textarea
                                            rows={6}
                                            value={
                                                formData.description
                                            }
                                            onChange={(e) =>
                                                updateField(
                                                    'description',
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Tell us about your project, scope and requirements..."
                                            className="
                                                min-h-[160px]
                                                w-full
                                                resize-none
                                                bg-transparent
                                                px-5 py-5
                                                text-[14px]
                                                leading-7
                                                text-modura-primary
                                                outline-none
                                                placeholder:text-modura-gray-400
                                            "
                                        />

                                        <span
                                            className="
                                                absolute
                                                bottom-0
                                                left-0
                                                h-[2px]
                                                w-0
                                                bg-modura-primary
                                                transition-all
                                                duration-500
                                                group-focus-within:w-full
                                            "
                                        />
                                    </div>
                                </div>

                                {/* SUBMIT */}

                                <button
                                    type="submit"
                                    className="
                                        group
                                        relative
                                        flex
                                        h-15
                                        w-full md:w-60 
                                        items-center
                                        justify-center
                                        gap-4
                                        overflow-hidden
                                        bg-modura-primary
                                        px-8
                                        text-[11px]
                                        font-bold
                                        uppercase
                                        tracking-[0.2em]
                                        text-modura-white
                                        transition-all
                                        duration-300
                                        hover:bg-modura-primary-light
                                    "
                                >
                                    <span className="relative z-10">
                                        Send Inquiry
                                    </span>

                                    <FiSend
                                        size={16}
                                        className="
                                            relative z-10
                                            transition-transform
                                            duration-300
                                            group-hover:translate-x-2
                                        "
                                    />

                                    <span
                                        className="
                                            absolute
                                            bottom-0
                                            left-0
                                            h-[3px]
                                            w-full
                                            bg-modura-secondary-light
                                            transition-all
                                            duration-500
                                            group-hover:h-full
                                            group-hover:opacity-10
                                        "
                                    />
                                </button>

                                {submitted && (
                                    <div
                                        className="
                                            border
                                            border-modura-secondary/30
                                            bg-modura-off-white
                                            px-5
                                            py-4
                                            text-[13px]
                                            font-medium
                                            text-modura-primary
                                        "
                                    >
                                        Thank you. Your inquiry
                                        has been submitted
                                        successfully.
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* =====================================================
    RIGHT SIDE — CONTACT INFORMATION
===================================================== */}

                        <div
                            className="
        relative
        overflow-hidden
        bg-modura-primary
        p-7
        text-modura-white

        md:p-10

        lg:p-12
    "
                        >
                            {/* =================================================
        CREATIVE BACKGROUND
    ================================================= */}

                            <div className="pointer-events-none absolute inset-0 overflow-hidden">

                                {/* Large architectural diagonal */}

                                <div
                                    className="
                absolute
                -right-[145px]
                -top-[120px]
                h-[560px]
                w-[210px]
                rotate-[27deg]
                border-l
                border-r
                border-modura-secondary/20
                bg-modura-secondary/5
            "
                                />

                                {/* Inner diagonal line */}

                                <div
                                    className="
                absolute
                right-[70px]
                -top-[30px]
                h-[420px]
                w-px
                rotate-[27deg]
                bg-modura-secondary-light/20
            "
                                />

                                {/* Architectural diagonal line */}

                                <div
                                    className="
                absolute
                -right-[30px]
                top-[210px]
                h-px
                w-[280px]
                rotate-[-27deg]
                bg-modura-secondary-light/20
            "
                                />


                                {/* Bottom architectural frame */}

                                <div
                                    className="
                absolute
                bottom-[-90px]
                left-[-80px]
                h-[220px]
                w-[220px]
                rotate-45
                border
                border-modura-secondary/15
            "
                                />

                                {/* Fine construction lines */}

                                <span
                                    className="
                absolute
                left-0
                top-[18%]
                h-px
                w-[28%]
                bg-modura-secondary/20
            "
                                />

                                <span
                                    className="
                absolute
                bottom-[18%]
                right-0
                h-px
                w-[30%]
                bg-modura-secondary/20
            "
                                />

                            </div>


                            {/* =================================================
        CONTENT
    ================================================= */}

                            <div className="relative z-10">

                                {/* =================================================
            HEADING
        ================================================= */}

                                <div className="mb-6">

                                    <div className="mb-3 flex items-center gap-3">

                                        

                                        <span
                                            className="
                        text-[12px]
                        font-bold
                        uppercase
                        tracking-[0.32em]
                        text-modura-secondary-light
                    "
                                        >
                                            CONTACT INFORMATION
                                        </span>

                                    </div>


                                    <h2
                                        className="
                    max-w-[380px]
                    text-[34px]
                    font-bold
                    leading-[1.02]
                    tracking-[-0.025em]
                    text-modura-white

                    md:text-[42px]
                "
                                    >
                                        We&apos;re here to

                                        <span
                                            className="text-modura-secondary-light ml-3"
                                        >
                                            help.
                                        </span>
                                    </h2>


                                    <p
                                        className="
                    mt-3
                    max-w-[390px]
                    text-[13px]
                    leading-5
                    text-modura-secondary-light
                "
                                    >
                                        Reach out to our team for project discussions,
                                        technical consultations or general enquiries.
                                    </p>

                                </div>


                                {/* =================================================
            CONTACT DETAILS
        ================================================= */}

                                <div className="border-t border-modura-secondary/25">

                                    {/* EMAIL */}

                                    <a
                                        href="mailto:info@moduradesigngroup.com"
                                        className="
                    group
                    relative
                    flex
                    items-center
                    gap-4
                    border-b
                    border-modura-secondary/25
                    py-6
                    transition-all
                    duration-300
                    hover:bg-modura-secondary/10
                "
                                    >

                                        <span
                                            className="
                        relative
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        border
                        border-modura-secondary/40
                        text-modura-secondary-light
                        transition-all
                        duration-300
                        group-hover:border-modura-secondary-light
                        group-hover:bg-modura-secondary-light
                        group-hover:text-modura-primary
                    "
                                        >
                                            <FiMail size={18} />

                                            <span
                                                className="
                            absolute
                            -right-[4px]
                            -top-[4px]
                            h-[7px]
                            w-[7px]
                            bg-modura-secondary-light
                        "
                                            />
                                        </span>


                                        <span className="min-w-0">

                                            <span
                                                className="
                            block
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.3em]
                            text-modura-secondary
                        "
                                            >
                                                EMAIL
                                            </span>

                                            <span
                                                className="
                            mt-1
                            block
                            text-[15px]
                            font-semibold
                            text-modura-white
                        "
                                            >
                                                Write To Us
                                            </span>

                                            <span
                                                className="
                            mt-1
                            block
                            break-all
                            text-[14px]
                            text-modura-secondary-light
                        "
                                            >
                                                info@moduradesigngroup.com
                                            </span>

                                        </span>


                                        

                                    </a>


                                    {/* PHONE */}

                                    <a
                                        href="tel:+910000000000"
                                        className="
                    group
                    relative
                    flex
                    items-center
                    gap-4
                    border-b
                    border-modura-secondary/25
                    py-6
                    transition-all
                    duration-300
                    hover:bg-modura-secondary/10
                "
                                    >

                                        <span
                                            className="
                        relative
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        border
                        border-modura-secondary/40
                        text-modura-secondary-light
                        transition-all
                        duration-300
                        group-hover:border-modura-secondary-light
                        group-hover:bg-modura-secondary-light
                        group-hover:text-modura-primary
                    "
                                        >
                                            <FiPhone size={18} />

                                            <span
                                                className="
                            absolute
                            -right-[4px]
                            -top-[4px]
                            h-[7px]
                            w-[7px]
                            bg-modura-secondary-light
                        "
                                            />
                                        </span>


                                        <span className="min-w-0">

                                            <span
                                                className="
                            block
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.3em]
                            text-modura-secondary
                        "
                                            >
                                                PHONE
                                            </span>

                                            <span
                                                className="
                            mt-1
                            block
                            text-[15px]
                            font-semibold
                            text-modura-white
                        "
                                            >
                                                Talk To Us
                                            </span>

                                            <span
                                                className="
                            mt-1
                            block
                            text-[14px]
                            text-modura-secondary-light
                        "
                                            >
                                                +91 00000 00000
                                            </span>

                                        </span>


                                        
                                    </a>


                                    {/* OFFICE */}

                                    <div
                                        className="
                    group
                    flex
                    items-center
                    gap-4
                    border-b
                    border-modura-secondary/25
                    py-6
                    transition-all
                    duration-300
                    hover:bg-modura-secondary/10
                "
                                    >

                                        <span
                                            className="
                        relative
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        border
                        border-modura-secondary/40
                        text-modura-secondary-light
                        transition-all
                        duration-300
                        group-hover:border-modura-secondary-light
                        group-hover:bg-modura-secondary-light
                        group-hover:text-modura-primary
                    "
                                        >
                                            <FiMapPin size={18} />

                                            <span
                                                className="
                            absolute
                            -right-[4px]
                            -top-[4px]
                            h-[7px]
                            w-[7px]
                            bg-modura-secondary-light
                        "
                                            />
                                        </span>


                                        <span className="min-w-0">

                                            <span
                                                className="
                            block
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.3em]
                            text-modura-secondary
                        "
                                            >
                                                OFFICE
                                            </span>

                                            <span
                                                className="
                            mt-1
                            block
                            text-[15px]
                            font-semibold
                            text-modura-white
                        "
                                            >
                                                Ahmedabad, India
                                            </span>

                                            <span
                                                className="
                            mt-1
                            block
                            text-[14px]
                            text-modura-secondary-light
                        "
                                            >
                                                Gujarat, India
                                            </span>

                                        </span>


                                        

                                    </div>

                                </div>


                                {/* =================================================
            AVAILABILITY CARD
        ================================================= */}

                                <div
                                    className="
                relative
                mt-8
                overflow-hidden
                border
                border-modura-secondary/30
                bg-modura-secondary/10
                p-5
            "
                                >

                                    {/* Decorative corner */}

                                    <span
                                        className="
                    absolute
                    right-0
                    top-0
                    h-12
                    w-12
                    border-b
                    border-l
                    border-modura-secondary/30
                "
                                    />

                                    <span
                                        className="
                    absolute
                    right-0
                    top-0
                    h-px
                    w-5
                    bg-modura-secondary-light
                "
                                    />

                                    <span
                                        className="
                    absolute
                    right-0
                    top-0
                    h-5
                    w-px
                    bg-modura-secondary-light
                "
                                    />


                                    <div className="flex items-center gap-3">

                                        <span
                                            className="
                        relative
                        flex
                        h-2
                        w-2
                    "
                                        >

                                            <span
                                                className="
                            absolute
                            inline-flex
                            h-full
                            w-full
                            animate-ping
                            rounded-full
                            bg-modura-secondary-light
                            opacity-50
                        "
                                            />

                                            <span
                                                className="
                            relative
                            inline-flex
                            h-2
                            w-2
                            rounded-full
                            bg-modura-secondary-light
                        "
                                            />

                                        </span>


                                        <span
                                            className="
                        text-[13px]
                        font-bold
                        uppercase
                        tracking-[0.25em]
                        text-modura-white
                    "
                                        >
                                            Available For New Projects
                                        </span>

                                    </div>


                                    <p
                                        className="
                    mt-3
                    max-w-[330px]
                    text-[13px]
                    leading-5
                    text-modura-secondary-light
                "
                                    >
                                        Architecture • BIM • Structural • Engineering
                                    </p>

                                </div>


                                {/* =================================================
            BOTTOM CREATIVE LINE
        ================================================= */}

                                <div
                                    className="
                mt-8
                flex
                items-center
                gap-4
            "
                                >

                                    <span
                                        className="
                    h-px
                    flex-1
                    bg-modura-secondary/30
                "
                                    />

                                    <span
                                        className="
                    h-2
                    w-2
                    rotate-45
                    border
                    border-modura-secondary-light
                "
                                    />

                                    <span
                                        className="
                    h-px
                    w-10
                    bg-modura-secondary/30
                "
                                    />

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* =====================================================
                MAP — LAST SECTION
            ===================================================== */}

            <section
                id="location"
                className="
                    relative
                    overflow-hidden
                    border-t
                    border-modura-gray-200
                    bg-modura-off-white
                "
            >
                {/* MAP */}

                <div className="relative h-[480px] md:h-[560px]">
                    <iframe
                        title="Modura Design Group Location"
                        src="https://www.google.com/maps?q=Ahmedabad%2C%20Gujarat%2C%20India&output=embed"
                        className="
                            absolute
                            inset-0
                            h-full
                            w-full
                            border-0
                            grayscale
                        "
                        loading="lazy"
                    />

                    {/* SOFT BRAND OVERLAY */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            inset-0
                            bg-modura-primary/[0.08]
                        "
                    />

                    {/* MAP LABEL */}

                    <div
                        className="
                            absolute
                            left-5
                            top-5
                            bg-modura-white
                            px-5
                            py-4
                            shadow-[0_15px_40px_rgba(11,29,51,0.12)]

                            md:left-8
                            md:top-8
                        "
                    >
                        <div className="flex items-center gap-3">
                            <span
                                className="
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    bg-modura-primary
                                    text-modura-white
                                "
                            >
                                <FiMapPin size={16} />
                            </span>

                            <div>
                                <p
                                    className="
                                        text-[9px]
                                        font-bold
                                        uppercase
                                        tracking-[0.28em]
                                        text-modura-secondary
                                    "
                                >
                                    FIND US
                                </p>

                                <p
                                    className="
                                        mt-1
                                        text-[14px]
                                        font-semibold
                                        text-modura-primary
                                    "
                                >
                                    Ahmedabad, Gujarat
                                </p>
                            </div>
                        </div>
                    </div>

                    
                </div>
            </section>
        </>
    );
}

/* =========================================================
   USER ICON
========================================================= */

function FiUser({
    size = 18,
}: {
    size?: number;
}) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 21a8 8 0 0 0-16 0" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );
}