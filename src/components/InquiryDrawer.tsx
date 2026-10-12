'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { FiArrowUpRight, FiX, FiUser, FiMail, FiPhone } from 'react-icons/fi';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { apiUrl } from '@/app/(website)/config';
import type { FormEvent } from 'react';

import gsap from 'gsap';


const InquiryDrawer = () => {
    const [open, setOpen] = useState(false);

    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        description: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        const updatedValue =
            name === 'phone'
                ? value.replace(/\D/g, '').slice(0, 10)
                : name === 'description'
                    ? value.slice(0, 1000)
                    : value.slice(0, 50);

        setFormData((prev) => ({
            ...prev,
            [name]: updatedValue,
        }));

        setSubmitError('');
    };

    // api call
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isSubmitting) return;

        setSubmitError('');

        const payload = {
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            service: formData.service.trim(),
            description: formData.description.trim(),
        };

        if (Object.values(payload).some((value) => !value)) {
            setSubmitError('Please fill in all required fields.');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
            setSubmitError('Please enter a valid email address.');
            return;
        }

        if (!/^\d{10}$/.test(payload.phone)) {
            setSubmitError('Phone number must contain exactly 10 digits.');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await axios.post(
                `${apiUrl}/getInTouch`,
                payload
            );

            if (response.data?.success === true) {
                // Clear all form fields after successful submission
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    service: '',
                    description: '',
                });

                // Clear previous error messages
                setSubmitError('');

                // Close the drawer
                setOpen(false);

                // Redirect to Thank You page
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

            console.error('Get In Touch API Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const drawerRef = useRef<HTMLDivElement | null>(null);

    const overlayRef = useRef<HTMLDivElement | null>(null);

    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const formRef = useRef<HTMLFormElement | null>(null);

    const tlRef = useRef<gsap.core.Timeline | null>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(drawerRef.current, {
                xPercent: 100,
            });

            gsap.set(overlayRef.current, {
                opacity: 0,

                display: 'none',
            });

            gsap.set('.inquiry-field', {
                y: 40,

                opacity: 0,
            });

            gsap.set('.inquiry-title', {
                y: 30,

                opacity: 0,
            });

            gsap.set('.inquiry-button', {
                y: 20,

                opacity: 0,
            });

            tlRef.current = gsap

                .timeline({
                    paused: true,
                })

                .set(overlayRef.current, {
                    display: 'block',
                })

                .to(overlayRef.current, {
                    opacity: 1,

                    duration: 0.4,

                    ease: 'power2.out',
                })

                .to(
                    drawerRef.current,

                    {
                        xPercent: 0,

                        duration: 0.7,

                        ease: 'power4.out',
                    },

                    '-=0.2',
                )

                .to(
                    '.inquiry-title',

                    {
                        y: 0,

                        opacity: 1,

                        duration: 0.6,

                        ease: 'power3.out',
                    },

                    '-=0.3',
                )

                .to(
                    '.inquiry-field',

                    {
                        y: 0,

                        opacity: 1,

                        duration: 0.5,

                        stagger: 0.12,

                        ease: 'power3.out',
                    },

                    '-=0.3',
                )

                .to(
                    '.inquiry-button',

                    {
                        y: 0,

                        opacity: 1,

                        duration: 0.5,

                        ease: 'power3.out',
                    },

                    '-=0.2',
                );
        });

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (open) {
            tlRef.current?.play();

            document.body.style.overflow = 'hidden';
        } else {
            tlRef.current?.reverse();

            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    return (
        <>
            {/* FLOATING BUTTON */}

            <button
                ref={buttonRef}

                onClick={() => setOpen(true)}

                className="bg-modura-primary group fixed top-1/2 right-0 z-[999] flex h-[170px] w-[55px] -translate-y-1/2 items-center justify-center border border-white/10 text-white shadow-xl"
            >
                <span className="bg-modura-secondary absolute top-0 left-0 h-full w-[3px] origin-top scale-y-0 transition-transform duration-500 group-hover:scale-y-100" />

                <span className="rotate-180 text-[11px] font-bold tracking-[0.25em] uppercase [writing-mode:vertical-rl]">
                    Get In Touch
                </span>
            </button>

            {/* OVERLAY */}

            <div
                ref={overlayRef}

                onClick={() => setOpen(false)}

                className="fixed inset-0 z-[999] hidden bg-black/60 backdrop-blur-sm"
            />

            {/* DRAWER */}

            <aside
                ref={drawerRef}

                className="bg-modura-primary-dark fixed top-0 right-0 z-[1000] h-screen w-full max-w-[470px] overflow-y-auto px-7 py-8 sm:px-10"
            >
                {/* CLOSE */}

                <button
                    onClick={() => setOpen(false)}

                    className="text-modura-gray-300 absolute top-6 right-6 transition hover:text-white"
                >
                    <FiX size={24} />
                </button>

                {/* TITLE */}

                <div className="inquiry-title mt-8 mb-10">
                    <div className="mb-4 flex items-center gap-3">
                        <span className="bg-modura-secondary h-px w-10" />

                        <span className="text-modura-secondary-light text-[10px] tracking-[0.25em] uppercase">
                            Project Inquiry
                        </span>
                    </div>

                    <h2 className="text-[34px] leading-tight font-semibold text-white uppercase">
                        Let's Build
                        <br />
                        Something Great
                    </h2>

                    <p className="text-modura-gray-300 mt-4 text-[14px] leading-relaxed">
                        Share your project details and our team will get back to you.
                    </p>
                </div>

                {/* FORM STARTS IN PART 2 */}

                <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-5">
                    {/* NAME */}

                    <div className="inquiry-field">
                        <label className="text-modura-gray-400 mb-2 block text-[11px] tracking-widest uppercase">
                            Name
                        </label>

                        <div className="relative">
                            <FiUser className="text-modura-secondary-light absolute top-1/2 left-0 -translate-y-1/2" />

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                maxLength={50}
                                placeholder="Your Name"

                                className="focus:border-modura-secondary w-full border-b border-white/20 bg-transparent py-3 pl-7 text-sm text-white transition outline-none"
                            />
                        </div>
                    </div>

                    {/* EMAIL */}

                    <div className="inquiry-field">
                        <label className="text-modura-gray-400 mb-2 block text-[11px] tracking-widest uppercase">
                            Email
                        </label>

                        <div className="relative">
                            <FiMail className="text-modura-secondary-light absolute top-1/2 left-0 -translate-y-1/2" />

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                maxLength={50}
                                placeholder="Email Address"

                                className="focus:border-modura-secondary w-full border-b border-white/20 bg-transparent py-3 pl-7 text-sm text-white outline-none"
                            />
                        </div>
                    </div>

                    {/* PHONE */}

                    <div className="inquiry-field">
                        <label className="text-modura-gray-400 mb-2 block text-[11px] tracking-widest uppercase">
                            Phone Number
                        </label>

                        <div className="relative">
                            <FiPhone className="text-modura-secondary-light absolute top-1/2 left-0 -translate-y-1/2" />

                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                maxLength={10}
                                inputMode="numeric"
                                placeholder="Phone Number"

                                className="focus:border-modura-secondary w-full border-b border-white/20 bg-transparent py-3 pl-7 text-sm text-white outline-none"
                            />
                        </div>
                    </div>

                    {/* SERVICE */}

                    <div className="inquiry-field relative z-50">
                        <label className="text-modura-gray-400 mb-2 block text-[11px] tracking-widest uppercase">
                            Service
                        </label>

                        <input
                            type="text"
                            name="service"
                            value={formData.service}
                            onChange={handleInputChange}
                            maxLength={50}
                            placeholder="Enter Service"
                            className="focus:border-modura-secondary w-full border-b border-white/20 bg-transparent py-3 text-sm text-white transition outline-none placeholder:text-gray-400"
                        />
                    </div>

                    {/* DESCRIPTION */}

                    <div className="inquiry-field">
                        <label className="text-modura-gray-400 mb-2 block text-[11px] tracking-widest uppercase">
                            Description
                        </label>

                        <textarea
                            rows={4}
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            maxLength={1000}
                            placeholder="Tell us about your project"

                            className="focus:border-modura-secondary w-full resize-none border-b border-white/20 bg-transparent py-3 text-sm text-white outline-none"
                        />
                    </div>

                    {/* BUTTON */}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inquiry-button group bg-modura-secondary hover:text-modura-primary mt-5 flex h-[52px] w-full items-center justify-center gap-3 text-[12px] font-bold tracking-[0.15em] text-white uppercase transition-all duration-500 hover:bg-white"
                    >
                        {isSubmitting ? 'Submitting...' : 'Send Inquiry'}
                        <FiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </button>
                    {submitError && (
                        <div
                            role="alert"
                            className="border border-red-400/30 bg-red-500/10 px-4 py-3 text-[13px] leading-6 text-red-300"
                        >
                            {submitError}
                        </div>
                    )}
                </form>
            </aside>
        </>
    );
};

export default InquiryDrawer;
