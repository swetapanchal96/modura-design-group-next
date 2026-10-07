'use client';

import { FormEvent, useEffect, useState } from 'react';

import Link from 'next/link';

import Breadcrumb from '../components/Breadcrumb';
import breadcrumb from '@/app/assets/images/breadcrumb.jpg';

import {
    FiUser,
    FiBriefcase,
    FiMail,
    FiPhone,
    FiMapPin,
    FiMap,
    FiGlobe,
    FiLayers,
    FiFileText,
    FiRefreshCw,
    FiSend,
    FiUsers,
    FiVideo,
    FiLink,
} from 'react-icons/fi';

/* =========================================================
   TYPES
========================================================= */

type FormData = {
    name: string;
    company: string;
    email: string;
    phone: string;
    cityAddress: string;
    stateProvince: string;
    natureOfProject: string;
    country: string;
    description: string;
    teams: string;
    hangout: string;
    other: string;
};

type Captcha = {
    question: string;
    answer: number;
};

/* =========================================================
   INPUT FIELD
   IMPORTANT:
   Keep this OUTSIDE InquiryPage.
   This fixes the one-character input problem.
========================================================= */

function InputField({
    label,
    name,
    icon,
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
}: {
    label: string;
    name: keyof FormData;
    icon: React.ReactNode;
    type?: string;
    placeholder: string;
    value: string;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
    error?: string;
}) {
    return (
        <div className="group">
            <label
                htmlFor={name}
                className="
                    mb-2.5
                    block
                    text-[12px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-modura-primary

                    md:text-[13px]
                "
            >
                {label}
                <span className="ml-1 text-red-600">*</span>
            </label>

            <div
                className={`
                    relative
                    flex
                    h-14.5
                    items-center
                    border
                    bg-modura-white
                    transition-all
                    duration-300

                    ${error
                        ? 'border-red-500 focus-within:border-red-500'
                        : 'border-modura-gray-200 hover:border-modura-secondary/60 focus-within:border-modura-primary'
                    }
                `}
            >
                <div
                    className="
                        flex
                        h-full
                        w-13.5
                        shrink-0
                        items-center
                        justify-center
                        border-r
                        border-modura-gray-200
                        text-modura-secondary
                        transition-colors
                        duration-300
                        group-focus-within:text-modura-primary
                    "
                >
                    {icon}
                </div>

                <input
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    autoComplete="off"
                    className="
                        h-full
                        w-full
                        bg-transparent
                        px-5
                        text-[15px]
                        font-medium
                        text-modura-primary
                        outline-none
                        placeholder:text-modura-gray-400
                    "
                />

                <span
                    className="
                        pointer-events-none
                        absolute
                        bottom-0
                        left-0
                        h-0.5
                        w-0
                        bg-modura-primary
                        transition-all
                        duration-300
                        group-focus-within:w-full
                    "
                />
            </div>

            {error && (
                <p className="mt-1.5 text-[13px] text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
}

/* =========================================================
   SELECT FIELD
========================================================= */

function SelectField({
    label,
    name,
    icon,
    value,
    onChange,
    options,
    error,
}: {
    label: string;
    name: keyof FormData;
    icon: React.ReactNode;
    value: string;
    onChange: (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => void;
    options: string[];
    error?: string;
}) {
    const [open, setOpen] = useState(false);

    const selectedLabel =
        value || `Select ${label.toLowerCase()}`;

    const handleSelect = (option: string) => {
        const event = {
            target: {
                name,
                value: option,
            },
        } as React.ChangeEvent<HTMLSelectElement>;

        onChange(event);
        setOpen(false);
    };

    return (
        <div className="group relative">
            {/* LABEL */}

            <label
                htmlFor={name}
                className="
                    mb-2.5
                    block
                    text-[12px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-modura-primary

                    md:text-[13px]
                "
            >
                {label}

                <span className="ml-1 text-red-600">
                    *
                </span>
            </label>

            {/* SELECT FIELD */}

            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className={`
                    relative
                    flex
                    h-[58px]
                    w-full
                    items-center
                    overflow-hidden
                    border
                    bg-modura-white
                    text-left
                    transition-all
                    duration-300
                    focus:outline-none

                    ${error
                        ? 'border-red-500'
                        : open
                            ? 'border-modura-primary'
                            : 'border-modura-gray-200 hover:border-modura-secondary'
                    }
                `}
            >
                {/* ICON */}

                <span
                    className={`
                        flex
                        h-full
                        w-[54px]
                        shrink-0
                        items-center
                        justify-center
                        border-r
                        border-modura-gray-200
                        transition-all
                        duration-300

                        ${open
                            ? 'bg-modura-primary text-modura-white'
                            : 'text-modura-secondary'
                        }
                    `}
                >
                    {icon}
                </span>

                {/* SELECTED VALUE */}

                <span
                    className={`
                        flex-1
                        px-5
                        text-[15px]
                        font-medium

                        ${value
                            ? 'text-modura-primary'
                            : 'text-modura-gray-400'
                        }
                    `}
                >
                    {selectedLabel}
                </span>

                {/* SIMPLE CHEVRON */}

                <span
                    className="
                        mr-5
                        flex
                        h-5
                        w-5
                        shrink-0
                        items-center
                        justify-center
                    "
                >
                    <span
                        className={`
                            h-[8px]
                            w-[8px]
                            border-b
                            border-r
                            border-modura-primary
                            transition-transform
                            duration-300

                            ${open
                                ? 'translate-y-[2px] rotate-[225deg]'
                                : '-translate-y-[2px] rotate-45'
                            }
                        `}
                    />
                </span>

                {/* BOTTOM LINE */}

                <span
                    className={`
                        absolute
                        bottom-0
                        left-0
                        h-[2px]
                        bg-modura-primary
                        transition-all
                        duration-500

                        ${open ? 'w-full' : 'w-0'}
                    `}
                />
            </button>

            {/* CUSTOM OPTIONS */}

            <div
                className={`
                    absolute
                    left-0
                    right-0
                    z-[100]
                    mt-2
                    origin-top
                    overflow-hidden
                    border
                    border-modura-gray-200
                    bg-modura-white
                    shadow-[0_18px_45px_rgba(11,29,51,0.12)]
                    transition-all
                    duration-300

                    ${open
                        ? 'visible translate-y-0 scale-y-100 opacity-100'
                        : 'invisible -translate-y-2 scale-y-95 opacity-0'
                    }
                `}
            >
                <div className="max-h-[260px] overflow-y-auto py-1">
                    {options.map((option) => {
                        const selected = value === option;

                        return (
                            <button
                                key={option}
                                type="button"
                                onClick={() =>
                                    handleSelect(option)
                                }
                                className={`
                                    group/option
                                    relative
                                    flex
                                    min-h-[50px]
                                    w-full
                                    items-center
                                    px-5
                                    text-left
                                    transition-all
                                    duration-200

                                    ${selected
                                        ? 'bg-modura-primary text-modura-white'
                                        : 'text-modura-primary hover:bg-modura-off-white'
                                    }
                                `}
                            >
                                {/* LEFT ACTIVE LINE */}

                                <span
                                    className={`
                                        absolute
                                        bottom-0
                                        left-0
                                        top-0
                                        w-[3px]
                                        bg-modura-secondary-light
                                        transition-opacity
                                        duration-200

                                        ${selected
                                            ? 'opacity-100'
                                            : 'opacity-0 group-hover/option:opacity-100'
                                        }
                                    `}
                                />

                                {/* OPTION TEXT */}

                                <span
                                    className="
                                        text-[14px]
                                        font-medium
                                        transition-transform
                                        duration-200
                                        group-hover/option:translate-x-1
                                    "
                                >
                                    {option}
                                </span>

                                {/* SIMPLE CHECK */}

                                {selected && (
                                    <span
                                        className="
                                            ml-auto
                                            h-[7px]
                                            w-[12px]
                                            rotate-[-45deg]
                                            border-b
                                            border-l
                                            border-modura-white
                                        "
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ERROR */}

            {error && (
                <p className="mt-1.5 text-[12px] font-medium text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
}

/* =========================================================
   INQUIRY PAGE
========================================================= */

export default function InquiryPage() {
    const [captcha, setCaptcha] = useState<Captcha>({
        question: '',
        answer: 0,
    });

    const [captchaInput, setCaptchaInput] = useState('');

    const [formData, setFormData] = useState<FormData>({
        name: '',
        company: '',
        email: '',
        phone: '',
        cityAddress: '',
        stateProvince: '',
        natureOfProject: '',
        country: '',
        description: '',
        teams: '',
        hangout: '',
        other: '',
    });

    const [errors, setErrors] = useState<
        Record<string, string>
    >({});

    const [submitted, setSubmitted] = useState(false);

    /* =========================================================
       CAPTCHA
    ========================================================= */

    const generateCaptcha = () => {
        const first = Math.floor(Math.random() * 9) + 1;
        const second = Math.floor(Math.random() * 9) + 1;

        setCaptcha({
            question: `${first} + ${second}`,
            answer: first + second,
        });

        setCaptchaInput('');
    };

    useEffect(() => {
        generateCaptcha();
    }, []);

    /* =========================================================
       INPUT CHANGE
    ========================================================= */

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: '',
        }));
    };

    /* =========================================================
       SELECT CHANGE
    ========================================================= */

    const handleSelectChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: '',
        }));
    };

    /* =========================================================
       DESCRIPTION
    ========================================================= */

    const handleDescriptionChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            description: e.target.value,
        }));

        setErrors((prev) => ({
            ...prev,
            description: '',
        }));
    };

    /* =========================================================
       VALIDATION
    ========================================================= */

    const validate = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.company.trim()) {
            newErrors.company = 'Company is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                formData.email
            )
        ) {
            newErrors.email = 'Enter a valid email';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone is required';
        }

        if (!formData.cityAddress.trim()) {
            newErrors.cityAddress =
                'City / Address is required';
        }

        if (!formData.stateProvince.trim()) {
            newErrors.stateProvince =
                'State / Province is required';
        }

        if (!formData.natureOfProject) {
            newErrors.natureOfProject =
                'Select nature of project';
        }

        if (!formData.country) {
            newErrors.country = 'Select country';
        }

        if (!formData.description.trim()) {
            newErrors.description =
                'Description is required';
        }

        if (!formData.teams.trim()) {
            newErrors.teams = 'Teams is required';
        }

        if (!formData.hangout.trim()) {
            newErrors.hangout = 'Hangout is required';
        }

        if (!formData.other.trim()) {
            newErrors.other = 'Other is required';
        }

        if (!captchaInput.trim()) {
            newErrors.captcha = 'Enter captcha';
        } else if (
            Number(captchaInput) !== captcha.answer
        ) {
            newErrors.captcha = 'Incorrect captcha';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    /* =========================================================
       SUBMIT
    ========================================================= */

    const handleSubmit = (
        e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        console.log('Inquiry:', formData);

        setSubmitted(true);

        setFormData({
            name: '',
            company: '',
            email: '',
            phone: '',
            cityAddress: '',
            stateProvince: '',
            natureOfProject: '',
            country: '',
            description: '',
            teams: '',
            hangout: '',
            other: '',
        });

        generateCaptcha();

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
                title="Inquiry"
                image={breadcrumb.src}
            />

            {/* =====================================================
                INQUIRY SECTION
            ===================================================== */}

            <section
                className="
                    relative
                    overflow-hidden
                    bg-modura-off-white
                    py-16

                    md:py-20
                "
            >
                <div
                    className="
                        relative
                        mx-auto
                        w-full
                        max-w-[1320px]
                        px-5

                        md:px-8
                    "
                >
                    {/* =================================================
                        HEADING
                    ================================================= */}

                    <div className="mb-6">
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
                                    font-semibold
                                    tracking-[0.35em]
                                    text-modura-secondary
                                "
                            >
                                START A CONVERSATION
                            </span>
                        </div>

                        <h2
                            className="
                                text-[38px]
                                font-bold
                                leading-none
                                tracking-[-0.03em]
                                text-modura-primary

                                md:text-[52px]

                                lg:text-[60px]
                            "
                        >
                            LET&apos;S DISCUSS
                            <span className="ml-3 text-modura-secondary">
                                YOUR PROJECT
                            </span>
                        </h2>

                        <p
                            className="
                                mt-2
                                max-w-[720px]
                                text-[15px]
                                leading-7
                                text-modura-gray-500

                                md:text-[16px]
                            "
                        >
                            Tell us about your project and
                            requirements. Our team will get
                            back to you with the right
                            technical solution.
                        </p>
                    </div>

                    {/* =================================================
                        FORM
                    ================================================= */}

                    <div
                        className="
                            relative
                            border
                            border-modura-gray-200
                            bg-modura-white
                            p-6
                            shadow-[0_20px_60px_rgba(11,29,51,0.06)]

                            md:p-10

                            lg:p-12
                        "
                    >
                        {/* top accent */}

                        <span
                            className="
                                absolute
                                left-0
                                top-0
                                h-[3px]
                                w-28
                                bg-modura-primary
                            "
                        />

                        <form
                            onSubmit={handleSubmit}
                            noValidate
                        >
                            {/* =================================================
                                CONTACT
                            ================================================= */}

                            <div className="mb-12">
                                <h3
                                    className="
                                        mb-4
                                        text-[22px]
                                        font-bold
                                        text-modura-primary

                                        md:text-[26px]
                                    "
                                >
                                    Contact Information
                                </h3>

                                <div
                                    className="
                                        grid
                                        gap-x-6
                                        gap-y-6

                                        md:grid-cols-2
                                    "
                                >
                                    <InputField
                                        label="Name"
                                        name="name"
                                        icon={<FiUser size={18} />}
                                        placeholder="Enter your full name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        error={errors.name}
                                    />

                                    <InputField
                                        label="Company"
                                        name="company"
                                        icon={
                                            <FiBriefcase
                                                size={18}
                                            />
                                        }
                                        placeholder="Enter company name"
                                        value={formData.company}
                                        onChange={handleInputChange}
                                        error={errors.company}
                                    />

                                    <InputField
                                        label="Email"
                                        name="email"
                                        type="email"
                                        icon={<FiMail size={18} />}
                                        placeholder="Enter email address"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        error={errors.email}
                                    />

                                    <InputField
                                        label="Phone"
                                        name="phone"
                                        type="tel"
                                        icon={<FiPhone size={18} />}
                                        placeholder="Enter phone number"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        error={errors.phone}
                                    />

                                    <InputField
                                        label="City / Address"
                                        name="cityAddress"
                                        icon={
                                            <FiMapPin
                                                size={18}
                                            />
                                        }
                                        placeholder="Enter city / address"
                                        value={
                                            formData.cityAddress
                                        }
                                        onChange={handleInputChange}
                                        error={
                                            errors.cityAddress
                                        }
                                    />

                                    <InputField
                                        label="State / Province"
                                        name="stateProvince"
                                        icon={
                                            <FiMap size={18} />
                                        }
                                        placeholder="Enter state / province"
                                        value={
                                            formData.stateProvince
                                        }
                                        onChange={handleInputChange}
                                        error={
                                            errors.stateProvince
                                        }
                                    />
                                </div>
                            </div>

                            {/* =================================================
                                PROJECT
                            ================================================= */}

                            <div className="mb-12">
                                <h3
                                    className="
                                        mb-7
                                        text-[22px]
                                        font-bold
                                        text-modura-primary

                                        md:text-[26px]
                                    "
                                >
                                    Project Information
                                </h3>

                                <div
                                    className="
                                        grid
                                        gap-x-6
                                        gap-y-6

                                        md:grid-cols-2
                                    "
                                >
                                    <SelectField
                                        label="Nature of Project"
                                        name="natureOfProject"
                                        icon={
                                            <FiLayers
                                                size={18}
                                            />
                                        }
                                        value={
                                            formData.natureOfProject
                                        }
                                        onChange={
                                            handleSelectChange
                                        }
                                        options={[
                                            'Architecture Design',
                                            'BIM Solutions',
                                            'Structural Engineering',
                                            'Project Management',
                                            'Steel Detailing',
                                            'Shop Drawing',
                                            'Other',
                                        ]}
                                        error={
                                            errors.natureOfProject
                                        }
                                    />

                                    <SelectField
                                        label="Country"
                                        name="country"
                                        icon={
                                            <FiGlobe
                                                size={18}
                                            />
                                        }
                                        value={formData.country}
                                        onChange={
                                            handleSelectChange
                                        }
                                        options={[
                                            'India',
                                            'United States',
                                            'United Kingdom',
                                            'Australia',
                                            'Canada',
                                            'United Arab Emirates',
                                            'Singapore',
                                            'Other',
                                        ]}
                                        error={errors.country}
                                    />

                                    {/* DESCRIPTION */}

                                    <div className="md:col-span-2">
                                        <label
                                            htmlFor="description"
                                            className="
                                                mb-2.5
                                                block
                                                text-[12px]
                                                font-semibold
                                                uppercase
                                                tracking-[0.12em]
                                                text-modura-primary

                                                md:text-[13px]
                                            "
                                        >
                                            Description of Project
                                            <span className="ml-1 text-modura-secondary">
                                                *
                                            </span>
                                        </label>

                                        <div
                                            className="
                                                group
                                                relative
                                                border
                                                border-modura-gray-200
                                                transition-all
                                                duration-300
                                                focus-within:border-modura-primary
                                            "
                                        >
                                            <div
                                                className="
                                                    absolute
                                                    left-0
                                                    top-0
                                                    flex
                                                    h-full
                                                    w-[54px]
                                                    justify-center
                                                    border-r
                                                    border-modura-gray-200
                                                    pt-5
                                                "
                                            >
                                                <FiFileText
                                                    size={18}
                                                    className="text-modura-secondary"
                                                />
                                            </div>

                                            <textarea
                                                id="description"
                                                name="description"
                                                value={
                                                    formData.description
                                                }
                                                onChange={
                                                    handleDescriptionChange
                                                }
                                                rows={6}
                                                maxLength={1000}
                                                placeholder="Tell us about your project, requirements, scope and specific details..."
                                                className="
                                                    min-h-[170px]
                                                    w-full
                                                    resize-none
                                                    bg-transparent
                                                    px-20
                                                    py-5
                                                    text-[15px]
                                                    leading-7
                                                    text-modura-primary
                                                    outline-none
                                                    placeholder:text-modura-gray-400
                                                "
                                            />

                                            <span
                                                className="
                                                    absolute
                                                    bottom-3
                                                    right-4
                                                    text-[10px]
                                                    text-modura-gray-400
                                                "
                                            >
                                                {
                                                    formData
                                                        .description
                                                        .length
                                                }
                                                /1000
                                            </span>

                                            <span
                                                className="
                                                    pointer-events-none
                                                    absolute
                                                    bottom-0
                                                    left-0
                                                    h-[2px]
                                                    w-0
                                                    bg-modura-primary
                                                    transition-all
                                                    duration-300
                                                    group-focus-within:w-full
                                                "
                                            />
                                        </div>

                                        {errors.description && (
                                            <p className="mt-1.5 text-[13px] text-red-600">
                                                {
                                                    errors.description
                                                }
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* =================================================
                                COMMUNICATION INPUTS
                            ================================================= */}

                            <div className="mb-12">
                                <h3
                                    className="
                                        mb-7
                                        text-[22px]
                                        font-bold
                                        text-modura-primary

                                        md:text-[26px]
                                    "
                                >
                                    Preferred Communication
                                </h3>

                                <div
                                    className="
                                        grid
                                        grid-cols-1
                                        gap-5

                                        sm:grid-cols-2

                                        lg:grid-cols-3
                                        lg:gap-6
                                    "
                                >
                                    <InputField
                                        label="Teams"
                                        name="teams"
                                        icon={
                                            <FiUsers size={18} />
                                        }
                                        placeholder="Teams ID / contact"
                                        value={formData.teams}
                                        onChange={
                                            handleInputChange
                                        }
                                        error={errors.teams}
                                    />

                                    <InputField
                                        label="Hangout"
                                        name="hangout"
                                        icon={
                                            <FiVideo size={18} />
                                        }
                                        placeholder="Hangout ID / contact"
                                        value={formData.hangout}
                                        onChange={
                                            handleInputChange
                                        }
                                        error={errors.hangout}
                                    />

                                    <InputField
                                        label="Other"
                                        name="other"
                                        icon={
                                            <FiLink size={18} />
                                        }
                                        placeholder="Other contact details"
                                        value={formData.other}
                                        onChange={
                                            handleInputChange
                                        }
                                        error={errors.other}
                                    />
                                </div>
                            </div>

                            {/* =================================================
                                CAPTCHA + SUBMIT
                            ================================================= */}

                            <div
                                className="
                                    border-t
                                    border-modura-gray-200
                                    pt-8
                                "
                            >
                                <div
                                    className="
                                        grid
                                        grid-cols-1
                                        gap-6

                                        lg:grid-cols-[1fr_auto]
                                        lg:items-end
                                    "
                                >
                                    {/* CAPTCHA */}

                                    <div>
                                        <label
                                            htmlFor="captcha"
                                            className="
                                                mb-2.5
                                                block
                                                text-[12px]
                                                font-semibold
                                                uppercase
                                                tracking-[0.12em]
                                                text-modura-primary
                                            "
                                        >
                                            Captcha
                                            <span className="ml-1 text-modura-secondary">
                                                *
                                            </span>
                                        </label>

                                        <div  className="
                                                        grid
                                                        grid-cols-[minmax(0,1fr)_58px]
                                                        gap-3

                                                        sm:flex
                                                    ">
                                            <div
                                                className="
                                                    relative
                                                    flex
                                                    h-[58px]
                                                    w-full
                                                    min-w-0
                                                    items-center
                                                    justify-center
                                                    overflow-hidden
                                                    bg-modura-primary

                                                    sm:min-w-[160px]
                                                    sm:w-auto
                                                "
                                            >
                                                <span className="absolute left-0 top-3 h-px w-full rotate-6 bg-modura-secondary-light/30" />

                                                <span className="absolute left-0 top-10 h-px w-full -rotate-6 bg-modura-secondary-light/30" />

                                                <span
                                                    className="
                                                        relative
                                                        z-10
                                                        text-[19px]
                                                        font-bold
                                                        tracking-[0.3em]
                                                        text-modura-white
                                                    "
                                                >
                                                    {
                                                        captcha.question
                                                    }
                                                </span>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={generateCaptcha}
                                                className="
                                                    flex
                                                    h-[58px]
                                                    w-[58px]
                                                    shrink-0
                                                    items-center
                                                    justify-center
                                                    border
                                                    border-modura-gray-200
                                                    text-modura-secondary
                                                    transition-all
                                                    duration-300
                                                    hover:border-modura-primary
                                                    hover:bg-modura-primary
                                                    hover:text-modura-white
                                                "
                                                aria-label="Refresh captcha"
                                            >
                                                <FiRefreshCw size={18} />
                                            </button>

                                            <input
                                                id="captcha"
                                                value={
                                                    captchaInput
                                                }
                                                onChange={(e) =>
                                                    setCaptchaInput(
                                                        e.target
                                                            .value
                                                    )
                                                }
                                                placeholder="Enter captcha answer"
                                                inputMode="numeric"
                                                className="
                                                    col-span-2
                                                    h-[58px]
                                                    w-full
                                                    min-w-0
                                                    border
                                                    border-modura-gray-200
                                                    px-5
                                                    text-[14px]
                                                    text-modura-primary
                                                    outline-none
                                                    transition-all
                                                    duration-300
                                                    focus:border-modura-primary

                                                    sm:col-auto
                                                    sm:flex-1
                                                    sm:text-[15px]
                                                "
                                            />
                                        </div>

                                        {errors.captcha && (
                                            <p className="mt-1.5 text-[13px] text-red-600">
                                                {
                                                    errors.captcha
                                                }
                                            </p>
                                        )}
                                    </div>

                                    {/* SUBMIT */}

                                    <button
                                            type="submit"
                                            className="
                                                group
                                                relative
                                                flex
                                                h-[58px]
                                                w-full
                                                min-w-0
                                                items-center
                                                justify-center
                                                gap-4
                                                overflow-hidden
                                                bg-modura-primary
                                                px-6
                                                text-[11px]
                                                font-bold
                                                uppercase
                                                tracking-[0.16em]
                                                text-modura-white
                                                transition-all
                                                duration-300
                                                hover:bg-modura-primary-light

                                                sm:min-w-[220px]
                                                sm:w-auto
                                                sm:px-8
                                                sm:text-[12px]
                                            "
                                        >
                                        <span className="relative z-10">
                                            Submit Inquiry
                                        </span>

                                        <FiSend
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
                                                w-full
                                                bg-modura-secondary-light
                                                transition-all
                                                duration-500
                                                group-hover:h-full
                                                group-hover:opacity-10
                                            "
                                        />
                                    </button>
                                </div>
                            </div>

                            {/* =================================================
                                SUCCESS
                            ================================================= */}

                            {submitted && (
                                <div
                                    className="
                                        mt-6
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
                                    Your inquiry has been submitted
                                    successfully. We will get back
                                    to you shortly.
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}