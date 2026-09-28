"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

import {
    FiPhone,
    FiMail,
    FiMapPin,
    FiArrowUpRight,
    FiArrowUp,
} from "react-icons/fi";

import {
    FaLinkedinIn,
    FaInstagram,
    FaFacebookF,
} from "react-icons/fa6";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import logo from "@/app/assets/images/modura-logo.jpeg";


gsap.registerPlugin(ScrollTrigger);



const quickLinks = [
    {
        name: "About Us",
        link: "#",
    },
    {
        name: "Portfolio",
        link: "#",
    },
    {
        name: "Software expertise",
        link: "#"
    },
    {
        name: "Blog",
        link: "#",
    },
    {
        name: "Contact Us",
        link: "#",
    },
    {
        name: "Inquiry",
        link: "#"
    }
];


const services = [
    "Architecture Design",
    "Structural Engineering",
    "BIM Services",
    "MEP Services",
    "CAD Drafting",
    "Project Management",
];



const Footer = () => {


    const footerRef = useRef<HTMLDivElement | null>(null);



    useLayoutEffect(() => {

        if (!footerRef.current) return;


        const ctx = gsap.context(() => {


            const tl = gsap.timeline({

                scrollTrigger: {

                    trigger: footerRef.current,

                    start: "top 85%",

                    once: true,

                },

            });



            tl.fromTo(

                ".footer-top-line",

                {
                    scaleX: 0,
                },

                {
                    scaleX: 1,
                    duration: 1,
                    ease: "power3.inOut",
                }

            );


            tl.fromTo(

                ".footer-logo",

                {
                    x: -50,
                    opacity: 0,
                },

                {
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                },

                "-=0.5"

            );



            tl.fromTo(

                ".footer-column",

                {
                    y: 30,
                    opacity: 0,
                },

                {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    stagger: 0.15,
                    ease: "power3.out",
                },

                "-=0.5"

            );



            tl.fromTo(

                ".footer-bottom",

                {
                    opacity: 0,
                    y: 20,
                },

                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                },

                "-=0.3"

            );



        }, footerRef);



        return () => ctx.revert();


    }, []);





    return (

        <footer
            ref={footerRef}
            className="
                relative
                overflow-hidden
                bg-modura-primary-dark
                text-white
            "
        >


            {/* TOP LINE */}

            <div
                className="
                    footer-top-line

                    absolute
                    top-0
                    left-0

                    h-[3px]
                    w-full

                    origin-left

                    bg-modura-secondary
                "
            />



            <div
                className="
                    mx-auto
                    max-w-[1440px]

                    px-5
                    md:px-8
                    xl:px-10
                "
            >



                {/* MAIN ONE ROW */}

                <div
                    className="
                        grid

                        grid-cols-1

                        gap-10

                        py-12


                        lg:grid-cols-12

                        lg:items-center
                    "
                >



                    {/* LOGO */}

                    <div
                        className="
                            footer-logo

                            lg:col-span-3

                            flex
                            items-center
                        "
                    >

                        <Link href="/">

                            <Image

                                src={logo}

                                alt="Modura Design Group"

                                className="
                                    w-[220px]
                                    xl:w-[260px]
                                "

                            />

                        </Link>

                    </div>





                    {/* QUICK LINKS */}

                    <div
                        className="
                            footer-column

                            lg:col-span-2
                        "
                    >

                        <h4
                            className="
                                mb-5

                                text-[14px]
                                font-bold
                                uppercase
                                tracking-[0.18em]

                                text-modura-secondary-light
                            "
                        >
                            Quick Links
                        </h4>



                        <div
                            className="
                                space-y-3
                            "
                        >

                            {
                                quickLinks.map((item) => (
                                    <Link

                                        key={item.name}

                                        href={item.link}

                                        className="
                                            group

                                            flex
                                            items-center
                                            gap-2

                                            text-[14px]

                                            text-modura-gray-300

                                            transition-all
                                            duration-300

                                            hover:text-white
                                        "
                                    >

                                        <FiArrowUpRight
                                            className="
                                                text-[12px]

                                                text-modura-secondary-light

                                                opacity-0

                                                transition-all
                                                duration-300

                                                group-hover:opacity-100
                                            "
                                        />


                                        {item.name}


                                    </Link>
                                ))
                            }


                        </div>


                    </div>






                    {/* SERVICES */}

                    <div
                        className="
                            footer-column

                            lg:col-span-3
                        "
                    >


                        <h4
                            className="
                                mb-5

                                text-[14px]
                                font-bold
                                uppercase
                                tracking-[0.18em]

                                text-modura-secondary-light
                            "
                        >
                            Services
                        </h4>



                        <div
                            className="
                                grid
                                grid-cols-1
                                gap-3
                            "
                        >

                            {
                                services.map((service) => (

                                    <div

                                        key={service}

                                        className="
                                            text-[15px]

                                            text-modura-gray-300

                                            transition-colors

                                            duration-300

                                            hover:text-white
                                        "
                                    >

                                        {service}

                                    </div>

                                ))
                            }


                        </div>


                    </div>








                    {/* CONTACT */}

                    <div
                        className="
                            footer-column

                            lg:col-span-4
                        "
                    >



                        <h4
                            className="
                                mb-5

                                text-[14px]
                                font-bold
                                uppercase
                                tracking-[0.18em]

                                text-modura-secondary-light
                            "
                        >
                            Contact
                        </h4>




                        <div
                            className="
                                space-y-4
                            "
                        >



                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3

                                    text-[13px]

                                    text-modura-gray-300
                                "
                            >

                                <FiPhone
                                    className="
                                        text-modura-secondary-light
                                    "
                                />

                                +91 XXXXX XXXXX


                            </div>




                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3

                                    text-[13px]

                                    text-modura-gray-300
                                "
                            >

                                <FiMail
                                    className="
                                        text-modura-secondary-light
                                    "
                                />

                                info@modura.com


                            </div>





                            <div
                                className="
                                    flex
                                    items-start
                                    gap-3

                                    text-[13px]

                                    text-modura-gray-300
                                "
                            >

                                <FiMapPin
                                    className="
                                        mt-1

                                        text-modura-secondary-light
                                    "
                                />

                                Ahmedabad, Gujarat, India


                            </div>




                            {/* SOCIAL */}

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-5

                                    pt-2
                                "
                            >

                                <FaLinkedinIn
                                    className="
                                        cursor-pointer

                                        text-[18px]

                                        text-modura-gray-300

                                        transition-all

                                        hover:-translate-y-1
                                        hover:text-white
                                    "
                                />


                                <FaInstagram
                                    className="
                                        cursor-pointer

                                        text-[18px]

                                        text-modura-gray-300

                                        transition-all

                                        hover:-translate-y-1
                                        hover:text-white
                                    "
                                />

                                <FaFacebookF
                                    className="
                                        cursor-pointer

                                        text-[18px]

                                        text-modura-gray-300

                                        transition-all

                                        hover:-translate-y-1
                                        hover:text-white
                                    "
                                />
                            </div>
                        </div>
                    </div>
                </div>


                {/* BOTTOM BAR */}
                <div
                    className="footer-bottom border-t border-white/10 py-5 text-center"
                >
                    <p
                        className="text-[12px] tracking-wide text-modura-gray-400"
                    >
                        © 2026 Modura Design Group. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>

    );

};


export default Footer;