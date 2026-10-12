'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { FiArrowUpRight, FiX, FiUser, FiMail, FiPhone } from 'react-icons/fi';

import gsap from 'gsap';

const services = [
    'Architecture Design',

    'Structural Engineering',

    'BIM Services',

    'MEP Services',

    'CAD Drafting',

    'Project Management',
];

const InquiryDrawer = () => {
    const [open, setOpen] = useState(false);

    // ADDED FOR CUSTOM SERVICE DROPDOWN

    const [serviceOpen, setServiceOpen] = useState(false);

    const [selectedService, setSelectedService] = useState('Select Service');

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

                <form ref={formRef} className="space-y-5">
                    {/* NAME */}

                    <div className="inquiry-field">
                        <label className="text-modura-gray-400 mb-2 block text-[11px] tracking-widest uppercase">
                            Name
                        </label>

                        <div className="relative">
                            <FiUser className="text-modura-secondary-light absolute top-1/2 left-0 -translate-y-1/2" />

                            <input
                                type="text"

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

                        <button
                            type="button"

                            onClick={() => setServiceOpen(!serviceOpen)}

                            className="hover:border-modura-secondary flex w-full items-center justify-between border-b border-white/20 bg-transparent py-3 text-sm text-gray-300 transition outline-none"
                        >
                            <span className={selectedService === 'Select Service' ? 'text-gray-400' : 'text-white'}>
                                {selectedService}
                            </span>

                            <svg
                                className={`h-4 w-4 transition-transform duration-300 ${serviceOpen ? 'rotate-180' : ''} `}

                                fill="none"

                                stroke="currentColor"

                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"

                                    strokeLinejoin="round"

                                    strokeWidth="2"

                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>

                        {serviceOpen && (
                            <div className="absolute top-full left-0 z-[9999] mt-2 max-h-[220px] w-full overflow-y-auto border border-white/10 bg-[#13263d] shadow-2xl">
                                {services.map((service) => (
                                    <button
                                        key={service}

                                        type="button"

                                        onClick={() => {
                                            setSelectedService(service);

                                            setServiceOpen(false);
                                        }}

                                        className="hover:bg-modura-secondary block w-full px-5 py-3 text-left text-sm text-gray-300 transition-all duration-300 hover:text-white"
                                    >
                                        {service}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* DESCRIPTION */}

                    <div className="inquiry-field">
                        <label className="text-modura-gray-400 mb-2 block text-[11px] tracking-widest uppercase">
                            Description
                        </label>

                        <textarea
                            rows={4}

                            placeholder="Tell us about your project"

                            className="focus:border-modura-secondary w-full resize-none border-b border-white/20 bg-transparent py-3 text-sm text-white outline-none"
                        />
                    </div>

                    {/* BUTTON */}

                    <button
                        type="submit"

                        className="inquiry-button group bg-modura-secondary hover:text-modura-primary mt-5 flex h-[52px] w-full items-center justify-center gap-3 text-[12px] font-bold tracking-[0.15em] text-white uppercase transition-all duration-500 hover:bg-white"
                    >
                        Send Inquiry
                        <FiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </button>
                </form>
            </aside>
        </>
    );
};

export default InquiryDrawer;
