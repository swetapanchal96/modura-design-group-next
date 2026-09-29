'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLayoutEffect, useRef } from 'react';

import { FiPhone, FiMail, FiMapPin, FiArrowUpRight, FiArrowUp } from 'react-icons/fi';

import { FaLinkedinIn, FaInstagram, FaFacebookF } from 'react-icons/fa6';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import logo from '@/app/assets/images/modura-logo.jpeg';

gsap.registerPlugin(ScrollTrigger);

const quickLinks = [
    {
        name: 'About Us',
        link: '#',
    },
    {
        name: 'Portfolio',
        link: '#',
    },
    {
        name: 'Software expertise',
        link: '#',
    },
    {
        name: 'Blog',
        link: '#',
    },
    {
        name: 'Contact Us',
        link: '#',
    },
    {
        name: 'Inquiry',
        link: '#',
    },
];

const services = [
    {
        name: 'Architecture Design',
        link: '/services/architecture-design',
    },
    {
        name: 'Structural Engineering',
        link: '/services/structural-engineering',
    },
    {
        name: 'BIM Services',
        link: '/services/bim-services',
    },
    {
        name: 'MEP Services',
        link: '/services/mep-services',
    },
    {
        name: 'CAD Drafting',
        link: '/services/cad-drafting',
    },
    {
        name: 'Project Management',
        link: '/services/project-management',
    },
];

const Footer = () => {
    const footerRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        if (!footerRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: footerRef.current,

                    start: 'top 85%',

                    once: true,
                },
            });

            tl.fromTo(
                '.footer-top-line',

                {
                    scaleX: 0,
                },

                {
                    scaleX: 1,
                    duration: 1,
                    ease: 'power3.inOut',
                },
            );

            tl.fromTo(
                '.footer-logo',

                {
                    x: -50,
                    opacity: 0,
                },

                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                },

                '-=0.5',
            );

            tl.fromTo(
                '.footer-column',

                {
                    y: 30,
                    opacity: 0,
                },

                {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    stagger: 0.15,
                    ease: 'power3.out',
                },

                '-=0.5',
            );

            tl.fromTo(
                '.footer-bottom',

                {
                    opacity: 0,
                    y: 20,
                },

                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                },

                '-=0.3',
            );
        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer ref={footerRef} className="bg-modura-primary-dark relative overflow-hidden text-white">
            {/* TOP LINE */}

            <div className="footer-top-line bg-modura-secondary absolute top-0 left-0 h-[3px] w-full origin-left" />

            <div className="mx-auto max-w-[1440px] px-5 md:px-8 xl:px-10">
                {/* MAIN ONE ROW */}

                <div className="grid grid-cols-1 gap-10 py-12 lg:grid-cols-12 lg:items-center">
                    {/* LOGO */}

                    <div className="footer-logo flex items-center lg:col-span-3">
                        <Link href="/">
                            <Image
                                src={logo}

                                alt="Modura Design Group"

                                className="w-[220px] xl:w-[260px]"
                            />
                        </Link>
                    </div>

                    {/* QUICK LINKS */}

                    <div className="footer-column self-start lg:col-span-2">
                        <h4 className="text-modura-secondary-light mb-5 text-[14px] font-bold tracking-[0.18em] uppercase">
                            Quick Links
                        </h4>

                        <div className="space-y-3">
                            {quickLinks.map((item) => (
                                <Link
                                    key={item.name}

                                    href={item.link}

                                    className="group text-modura-gray-300 flex items-center gap-2 text-[14px] transition-all duration-300 hover:text-white"
                                >
                                    <FiArrowUpRight className="text-modura-secondary-light text-[12px] opacity-0 transition-all duration-300 group-hover:opacity-100" />

                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* SERVICES */}

                    <div className="footer-column self-start lg:col-span-3">
                        <h4 className="text-modura-secondary-light mb-5 text-[14px] font-bold tracking-[0.18em] uppercase">
                            Services
                        </h4>

                        <div className="grid grid-cols-1 gap-3">
                            {services.map((service) => (
                                <Link
                                    key={service.name}

                                    href={service.link}

                                    className="service-link group text-modura-gray-300 flex items-center gap-2 text-[14px] transition-all duration-300 hover:text-white"
                                >
                                    <FiArrowUpRight className="text-modura-secondary-light text-[12px] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />

                                    {service.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* CONTACT */}

                    <div className="footer-column self-start lg:col-span-3">
                        {/* HEADING */}

                        <div className="contact-heading mb-7">
                            <h4 className="text-modura-secondary-light mb-5 text-[14px] font-bold tracking-[0.18em] uppercase">
                                Contact
                            </h4>
                        </div>

                        {/* CONTACT LIST */}

                        <div className="space-y-5">
                            {/* PHONE */}

                            <a
                                href="tel:+919876543210"

                                className="contact-item group flex items-start gap-4"
                            >
                                <FiPhone className="contact-icon text-modura-secondary-light mt-1 text-[18px] transition-all duration-300 group-hover:translate-x-1" />

                                <div>
                                    <p className="text-modura-gray-500 text-[10px] tracking-[0.18em] uppercase">
                                        Phone
                                    </p>

                                    <p className="text-modura-gray-200 mt-1 text-[14px] transition-colors group-hover:text-white">
                                        +91 98765 43210
                                    </p>
                                </div>
                            </a>

                            {/* EMAIL */}

                            <a
                                href="mailto:info@modura.com"

                                className="contact-item group flex items-start gap-4"
                            >
                                <FiMail className="contact-icon text-modura-secondary-light mt-1 text-[18px] transition-all duration-300 group-hover:translate-x-1" />

                                <div>
                                    <p className="text-modura-gray-500 text-[10px] tracking-[0.18em] uppercase">
                                        Email
                                    </p>

                                    <p className="text-modura-gray-200 mt-1 text-[14px] transition-colors group-hover:text-white">
                                        info@modura.com
                                    </p>
                                </div>
                            </a>

                            {/* ADDRESS */}

                            <div className="contact-item flex items-start gap-4">
                                <FiMapPin className="contact-icon text-modura-secondary-light mt-1 text-[18px]" />

                                <div>
                                    <p className="text-modura-gray-500 text-[10px] tracking-[0.18em] uppercase">
                                        Address
                                    </p>

                                    <p className="text-modura-gray-200 mt-1 max-w-[220px] text-[14px] leading-relaxed">
                                        Ahmedabad, Gujarat,
                                        <br />
                                        India
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* SOCIAL */}

                        <div className="social-wrapper mt-7 flex gap-5">
                            <FaLinkedinIn className="social-icon text-modura-gray-300 hover:text-modura-secondary-light cursor-pointer text-[19px] transition-all hover:-translate-y-1" />

                            <FaInstagram className="social-icon text-modura-gray-300 hover:text-modura-secondary-light cursor-pointer text-[19px] transition-all hover:-translate-y-1" />

                            <FaFacebookF className="social-icon text-modura-gray-300 hover:text-modura-secondary-light cursor-pointer text-[19px] transition-all hover:-translate-y-1" />
                        </div>
                    </div>
                </div>

                {/* BOTTOM BAR */}
                <div className="footer-bottom border-t border-white/10 py-5 text-center">
                    <p className="text-modura-gray-400 text-[12px] tracking-wide">
                        © 2026 Modura Design Group. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
