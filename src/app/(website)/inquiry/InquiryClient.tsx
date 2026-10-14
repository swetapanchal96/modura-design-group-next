'use client';

import { FormEvent, useEffect, useState } from 'react';

import Link from 'next/link';

import Breadcrumb from '../../../components/Breadcrumb';
import breadcrumb from '@/app/(website)/assets/images/breadcrumb.jpg';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { apiUrl } from '@/app/(website)/config';

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
                    maxLength={name === 'phone' ? 10 : 50}
                    inputMode={name === 'phone' ? 'numeric' : undefined}
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
   INQUIRY PAGE
========================================================= */

export default function InquiryClient() {
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

    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

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

        let updatedValue = value;

        if (name === 'phone') {
            updatedValue = value.replace(/\D/g, '').slice(0, 10);
        } else {
            updatedValue = value.slice(0, 50);
        }

        setFormData((prev) => ({
            ...prev,
            [name]: updatedValue,
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
        const value = e.target.value.slice(0, 1000);

        setFormData((prev) => ({
            ...prev,
            description: value,
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

        const requiredFields: {
            key: keyof FormData;
            label: string;
        }[] = [
                { key: 'name', label: 'Name' },
                { key: 'company', label: 'Company' },
                { key: 'email', label: 'Email' },
                { key: 'phone', label: 'Phone' },
                { key: 'cityAddress', label: 'City / Address' },
                { key: 'stateProvince', label: 'State / Province' },
                { key: 'natureOfProject', label: 'Nature of Project' },
                { key: 'country', label: 'Country' },
                { key: 'description', label: 'Description' },
                { key: 'teams', label: 'Teams' },
                { key: 'hangout', label: 'Hangout' },
                { key: 'other', label: 'Other' },
            ];

        // Required and maximum length validation
        requiredFields.forEach(({ key, label }) => {
            const value = formData[key].trim();

            if (!value) {
                newErrors[key] = `${label} is required`;
            } else if (
                key !== 'phone' &&
                key !== 'description' &&
                value.length > 50
            ) {
                newErrors[key] = `${label} cannot exceed 50 characters`;
            } else if (
                key === 'description' &&
                value.length > 1000
            ) {
                newErrors[key] =
                    'Description cannot exceed 1000 characters';
            }
        });

        // Email validation
        if (
            formData.email.trim() &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
        ) {
            newErrors.email = 'Enter a valid email address';
        }

        // Phone validation
        if (
            formData.phone.trim() &&
            !/^\d{10}$/.test(formData.phone)
        ) {
            newErrors.phone = 'Phone number must contain exactly 10 digits';
        }

        // CAPTCHA validation
        if (!captchaInput.trim()) {
            newErrors.captcha = 'Enter captcha';
        } else if (
            !/^\d+$/.test(captchaInput) ||
            Number(captchaInput) !== captcha.answer
        ) {
            newErrors.captcha = 'Incorrect captcha';
            generateCaptcha();
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    /* =========================================================
       SUBMIT
    ========================================================= */

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (isSubmitting) return;

        setSubmitError('');

        // Keep existing form validation and CAPTCHA verification
        if (!validate()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const payload = {
                name: formData.name.trim(),
                company: formData.company.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim(),
                city: formData.cityAddress.trim(),
                state: formData.stateProvince.trim(),
                country: formData.country.trim(),
                natureOfProject: formData.natureOfProject.trim(),
                description: formData.description.trim(),
                teams: formData.teams.trim(),
                hangout: formData.hangout.trim(),
                other: formData.other.trim(),
            };

            const response = await axios.post(
                `${apiUrl}/projectInquiry`,
                payload
            );

            if (response.data?.success === true) {
                router.push('/thankyou/inquiry');
            } else {
                setSubmitError(
                    response.data?.message ||
                    'Unable to submit your inquiry. Please try again.'
                );
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setSubmitError(
                    error.response?.data?.message ||
                    'Unable to submit your inquiry. Please try again.'
                );
            } else {
                setSubmitError(
                    'Something went wrong. Please try again.'
                );
            }

            console.error('Project Inquiry API Error:', error);
        } finally {
            setIsSubmitting(false);
        }
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
                                    <InputField
                                        label="Nature of Project"
                                        name="natureOfProject"
                                        icon={<FiLayers size={18} />}
                                        placeholder="Enter nature of project"
                                        value={formData.natureOfProject}
                                        onChange={handleInputChange}
                                        error={errors.natureOfProject}
                                    />

                                    <InputField
                                        label="Country"
                                        name="country"
                                        icon={<FiGlobe size={18} />}
                                        placeholder="Enter country"
                                        value={formData.country}
                                        onChange={handleInputChange}
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

                                        <div className="
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
                                                onChange={(e) => {
                                                    const value = e.target.value
                                                        .replace(/\D/g, '')
                                                        .slice(0, 2);

                                                    setCaptchaInput(value);

                                                    setErrors((prev) => ({
                                                        ...prev,
                                                        captcha: '',
                                                    }));
                                                }}
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
                                        disabled={isSubmitting}
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
                                            {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
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
                                ERROR
                            ================================================= */}

                            {submitError && (
                                <div
                                    role="alert"
                                    className="
                                        mt-6
                                        border
                                        border-red-200
                                        bg-red-50
                                        px-5
                                        py-4
                                        text-[13px]
                                        font-medium
                                        text-red-600
                                    "
                                >
                                    {submitError}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}