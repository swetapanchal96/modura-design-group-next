'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { FiArrowRight, FiArrowUpRight, FiBox, FiChevronDown, FiChevronRight, FiFileText, FiGrid, FiHome, FiLayers, FiMenu, FiSettings, FiX } from 'react-icons/fi';

import { PiBlueprint, PiBuildings, PiBridge, PiCube, PiGear, PiStack } from 'react-icons/pi';

import logo from '@/app/assets/images/modura-logo-new.jpeg';

/* =========================================================
   TYPES
========================================================= */

type ServiceItem = {
    title: string;
    href: string;
};

type ServiceCategory = {
    title: string;
    href: string;
    description: string;
    services: ServiceItem[];
};

/* =========================================================
   COMPANY
========================================================= */

const companyLinks = [
    {
        title: 'About Modura',
        href: '/company#about-us',
    },
    {
        title: 'Why Choose Us',
        href: '#',
    },
    {
        title: 'Our Team',
        href: '#',
    },
    {
        title: 'Quality Policy',
        href: '#',
    },
    {
        title: 'Certifications',
        href: '#',
    },
    {
        title: 'Testimonials',
        href: '#',
    },
    {
        title: 'FAQs',
        href: '#',
    },
];

/* =========================================================
   SERVICES
========================================================= */

const serviceCategories: ServiceCategory[] = [
    {
        title: 'CAD Drafting Services',
        href: '#',
        description:
            'Accurate CAD drafting and technical documentation for architecture, engineering and construction projects.',
        services: [
            {
                title: '2D CAD Drafting',
                href: '#',
            },
            {
                title: 'CAD Conversion',
                href: '#',
            },
            {
                title: 'As-Built Drawings',
                href: '#',
            },
            {
                title: 'Construction Drawings',
                href: '#',
            },
            {
                title: 'PDF / Sketch to CAD',
                href: '#',
            },
        ],
    },

    {
        title: 'Architectural Engineering',
        href: '#',
        description:
            'Architectural planning, documentation, modelling and visualization for coordinated project delivery.',
        services: [
            {
                title: 'Architectural Drafting',
                href: '#',
            },
            {
                title: 'Architectural Planning',
                href: '#',
            },
            {
                title: 'Architectural Modeling',
                href: '#',
            },
            {
                title: 'Architectural Renderings',
                href: '#',
            },
            {
                title: 'Architectural Walkthroughs',
                href: '#',
            },
        ],
    },

    {
        title: 'Structural Engineering',
        href: '#',
        description:
            'Structural analysis, design and detailing solutions for safe, coordinated and constructible building systems.',
        services: [
            {
                title: 'Residential Structural Design',
                href: '#',
            },
            {
                title: 'Structural Steel Detailing',
                href: '#',
            },
            {
                title: 'Reinforcement Detailing',
                href: '#',
            },
            {
                title: 'Steel / Concrete Structures',
                href: '#',
            },
            {
                title: 'Structural Steel Frame Analysis',
                href: '#',
            },
            {
                title: 'Structural Calculations',
                href: '#',
            },
        ],
    },

    {
        title: 'Building Information Modeling',
        href: '#',
        description: 'Integrated BIM workflows connecting design, coordination, construction and project information.',
        services: [
            {
                title: 'Architectural BIM',
                href: '#',
            },
            {
                title: 'Structural BIM',
                href: '#',
            },
            {
                title: 'MEP BIM',
                href: '#',
            },
            {
                title: 'Scan to BIM',
                href: '#',
            },
            {
                title: 'Clash Detection',
                href: '#',
            },
            {
                title: 'BIM Coordination',
                href: '#',
            },
        ],
    },

    {
        title: 'MEP Engineering',
        href: '#',
        description: 'Integrated mechanical, electrical and plumbing engineering for coordinated building systems.',
        services: [
            {
                title: 'MEP Design',
                href: '#',
            },
            {
                title: 'MEP Coordination',
                href: '#',
            },
            {
                title: 'MEP Drafting',
                href: '#',
            },
            {
                title: 'MEP BIM Modeling',
                href: '#',
            },
            {
                title: 'MEP Shop Drawings',
                href: '#',
            },
        ],
    },

    {
        title: 'Mechanical Engineering',
        href: '#',
        description:
            'Mechanical design, modelling and technical documentation for multidisciplinary engineering projects.',
        services: [
            {
                title: 'Mechanical Design',
                href: '#',
            },
            {
                title: 'Mechanical Drafting',
                href: '#',
            },
            {
                title: '3D Mechanical Modeling',
                href: '#',
            },
            {
                title: 'Mechanical Detailing',
                href: '#',
            },
        ],
    },

    {
        title: 'Shop Drawing Services',
        href: '#',
        description: 'Fabrication and installation-ready shop drawings developed for accurate project execution.',
        services: [
            {
                title: 'Architectural Shop Drawings',
                href: '#',
            },
            {
                title: 'Structural Shop Drawings',
                href: '#',
            },
            {
                title: 'MEP Shop Drawings',
                href: '#',
            },
            {
                title: 'Fabrication Drawings',
                href: '#',
            },
            {
                title: 'Facade Shop Drawings',
                href: '#',
            },
        ],
    },

    {
        title: 'Electrical Services',
        href: '#',
        description: 'Electrical layouts, engineering documentation and coordinated building-services design.',
        services: [
            {
                title: 'Electrical Design',
                href: '#',
            },
            {
                title: 'Electrical Drafting',
                href: '#',
            },
            {
                title: 'Lighting Layouts',
                href: '#',
            },
            {
                title: 'Power Distribution',
                href: '#',
            },
        ],
    },

    {
        title: 'Plumbing / Piping',
        href: '#',
        description: 'Coordinated plumbing and piping design solutions for building and engineering applications.',
        services: [
            {
                title: 'Plumbing Design',
                href: '#',
            },
            {
                title: 'Piping Design',
                href: '#',
            },
            {
                title: 'Plumbing Drafting',
                href: '#',
            },
            {
                title: 'Piping Layouts',
                href: '#',
            },
        ],
    },

    {
        title: 'HVAC Engineering',
        href: '#',
        description: 'HVAC design, calculations, layouts and coordinated documentation for efficient building systems.',
        services: [
            {
                title: 'HVAC System Design',
                href: '#',
            },
            {
                title: 'HVAC Load Calculations',
                href: '#',
            },
            {
                title: 'Duct Layouts',
                href: '#',
            },
            {
                title: 'HVAC Piping Design',
                href: '#',
            },
            {
                title: 'HVAC Shop Drawings',
                href: '#',
            },
        ],
    },

    {
        title: 'Civil Engineering',
        href: '#',
        description: 'Civil engineering and documentation support across planning, design and construction stages.',
        services: [
            {
                title: 'Civil Drafting',
                href: '#',
            },
            {
                title: 'Civil Engineering Design',
                href: '#',
            },
            {
                title: 'Site Development',
                href: '#',
            },
            {
                title: 'Construction Documentation',
                href: '#',
            },
        ],
    },

    {
        title: 'Detailing Services',
        href: '#',
        description: 'Detailed fabrication and construction documentation developed for accuracy and coordination.',
        services: [
            {
                title: 'Steel Detailing',
                href: '#',
            },
            {
                title: 'Rebar Detailing',
                href: '#',
            },
            {
                title: 'Precast Detailing',
                href: '#',
            },
            {
                title: 'Structural Detailing',
                href: '#',
            },
        ],
    },

    {
        title: 'Mass Timber Buildings',
        href: '#',
        description: 'Engineering and detailing support for modern mass-timber building systems and assemblies.',
        services: [
            {
                title: 'Mass Timber Detailing',
                href: '#',
            },
            {
                title: 'CLT Detailing',
                href: '#',
            },
            {
                title: 'Glulam Detailing',
                href: '#',
            },
            {
                title: 'Timber Shop Drawings',
                href: '#',
            },
        ],
    },

    {
        title: 'Sheet Metal Design',
        href: '#',
        description: 'Precision sheet-metal modelling, detailing and fabrication documentation.',
        services: [
            {
                title: 'Sheet Metal Drafting',
                href: '#',
            },
            {
                title: 'Sheet Metal Detailing',
                href: '#',
            },
            {
                title: 'Fabrication Drawings',
                href: '#',
            },
            {
                title: '3D Sheet Metal Modeling',
                href: '#',
            },
        ],
    },

    {
        title: 'Cladding Engineering',
        href: '',
        description: 'Facade and cladding engineering documentation supporting fabrication and installation.',
        services: [
            {
                title: 'Cladding Design',
                href: '#',
            },
            {
                title: 'Facade Detailing',
                href: '#',
            },
            {
                title: 'Cladding Shop Drawings',
                href: '#',
            },
            {
                title: 'Panel Layouts',
                href: '#',
            },
        ],
    },
];

/* =========================================================
   SOFTWARE
========================================================= */

const softwareLinks = [
    {
        title: 'AutoCAD',
        subtitle: 'CAD Drafting',
        icon: PiBlueprint,
        href: '#',
    },
    {
        title: 'Autodesk Revit',
        subtitle: 'BIM & Coordination',
        icon: PiCube,
        href: '#',
    },
    {
        title: 'Tekla Structures',
        subtitle: 'Structural Detailing',
        icon: PiBridge,
        href: '#',
    },
    {
        title: 'STAAD.Pro',
        subtitle: 'Structural Analysis',
        icon: PiBuildings,
        href: '#',
    },
    {
        title: 'Autodesk Inventor',
        subtitle: 'Mechanical Engineering',
        icon: PiGear,
        href: '#',
    },
];

/* =========================================================
   PORTFOLIO
========================================================= */

const portfolioLinks = [
    {
        title: 'Steel Detailing Samples',
        href: '/portfolio',
        icon: FiLayers,
    },
    {
        title: 'Rebar Detailing Samples',
        href: '/portfolio/rebar-detailing',
        icon: FiLayers,
    },
    {
        title: 'Architectural Samples',
        href: '/portfolio/architectural',
        icon: FiHome,
    },
    {
        title: 'Structural Samples',
        href: '/portfolio/structural',
        icon: FiLayers,
    },
    {
        title: 'Facade Shop Drawings',
        href: '/portfolio/facade',
        icon: FiBox,
    },
    {
        title: 'Precast Shop Drawings',
        href: '/portfolio/precast',
        icon: FiGrid,
    },

    // More items...
    {
        title: 'MEP Coordination',
        href: '/portfolio/mep',
        icon: FiSettings,
    },
    {
        title: 'BIM Coordination',
        href: '/portfolio/bim',
        icon: FiLayers,
    },
    {
        title: 'Shop Drawing Services',
        href: '/portfolio/shop-drawings',
        icon: FiFileText,
    },
];

/* =========================================================
   HEADER
========================================================= */

export default function Header() {
    const [activeService, setActiveService] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);

    const [mobileSection, setMobileSection] = useState<string | null>(null);

    const [mobileServiceCategory, setMobileServiceCategory] = useState<number | null>(null);

    const selectedService = serviceCategories[activeService];

    const toggleMobileSection = (section: string) => {
        setMobileSection((current) => (current === section ? null : section));
    };

    return (
        <header className="border-modura-gray-200 bg-modura-white relative z-50 border-b">
            {/* =====================================================
          MAIN HEADER
      ====================================================== */}

            <div className="mx-auto max-w-[1440px] px-6 xl:px-10 2xl:px-12">
                <div className="flex h-[128px] items-center justify-between">
                    {/* =================================================
              LOGO
          ================================================== */}

                    <Link href="/" className="flex h-full w-[200px] shrink-0 items-center justify-start">
                        <div className="relative flex h-[112px] w-[175px] items-center justify-center overflow-hidden">
                            <Image
                                src={logo.src}
                                alt="Modura Design Group"
                                fill
                                priority
                                sizes="175px"
                                className="object-contain"
                            />
                        </div>
                    </Link>

                    {/* =================================================
              DESKTOP NAV
          ================================================== */}

                    <nav className="hidden h-full items-center lg:flex">
                        {/* <DesktopLink title="Home" href="/" /> */}

                        {/* COMPANY */}

                        {/* =================================================
    COMPANY DROPDOWN
================================================== */}

                        <div className="group/company relative h-full">
                            <DesktopDropdownTrigger title="Company" />

                            <div className="invisible absolute top-full left-0 w-[570px] translate-y-3 opacity-0 transition-all duration-300 group-hover/company:visible group-hover/company:translate-y-0 group-hover/company:opacity-100">
                                {/* =========================================
            TOP ARCHITECTURAL ACCENT
        ========================================== */}

                                <div className="bg-modura-primary relative h-[5px]">
                                    <span className="bg-modura-secondary absolute top-0 left-0 h-full w-[105px]" />

                                    <span className="bg-modura-white absolute top-0 right-[55px] h-full w-[2px]" />
                                </div>

                                {/* =========================================
            DROPDOWN BODY
        ========================================== */}

                                <div className="border-modura-gray-200 bg-modura-white grid grid-cols-[1.15fr_0.85fr] overflow-hidden border-x border-b shadow-xl">
                                    {/* =====================================
                LEFT — COMPANY LINKS
            ====================================== */}

                                    <div className="px-6 py-6">
                                        {/* heading */}

                                        <div className="border-modura-gray-200 mb-4 border-b pb-4">
                                            <span className="text-modura-secondary text-[10px] font-bold tracking-[0.18em] uppercase">
                                                Discover Modura
                                            </span>

                                            <h3 className="text-modura-primary mt-1 text-[20px] font-semibold tracking-[-0.02em]">
                                                Inside Our Company
                                            </h3>
                                        </div>

                                        {/* links */}

                                        <div>
                                            {companyLinks.map((item) => (
                                                <Link
                                                    key={item.title}
                                                    href={item.href}
                                                    className="group/company-link border-modura-gray-100 relative flex min-h-[46px] items-center justify-between overflow-hidden border-b last:border-b-0"
                                                >
                                                    {/* hover background */}

                                                    <span className="bg-modura-off-white absolute inset-y-0 left-0 w-0 transition-all duration-300 group-hover/company-link:w-full" />

                                                    {/* left hover line */}

                                                    {/* Architectural corner marker */}
                                                    <span className="absolute top-1/2 left-0 h-[12px] w-[12px] -translate-y-1/2 opacity-0 transition-all duration-300 group-hover/company-link:opacity-100">
                                                        {/* vertical */}
                                                        <span className="bg-modura-secondary absolute bottom-0 left-0 h-full w-[2px]" />

                                                        {/* horizontal */}
                                                        <span className="bg-modura-secondary absolute bottom-0 left-0 h-[2px] w-full" />
                                                    </span>

                                                    <span className="text-modura-gray-700 group-hover/company-link:text-modura-primary relative z-10 text-[13px] font-semibold transition-all duration-300 group-hover/company-link:translate-x-6">
                                                        {item.title}
                                                    </span>

                                                    <FiArrowUpRight className="text-modura-primary relative z-10 -translate-x-2 translate-y-2 text-[16px] opacity-0 transition-all duration-300 group-hover/company-link:translate-x-0 group-hover/company-link:translate-y-0 group-hover/company-link:opacity-100" />

                                                    {/* bottom hover accent */}

                                                    <span className="bg-modura-secondary absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover/company-link:w-full" />
                                                </Link>
                                            ))}
                                        </div>
                                    </div>

                                    {/* =====================================
                RIGHT — MODURA BRAND AREA
            ====================================== */}

                                    <div className="bg-modura-primary relative overflow-hidden px-6 py-6">
                                        {/* =================================
                    ARCHITECTURAL LINE ART
                ================================== */}

                                        <div className="pointer-events-none absolute inset-0">
                                            {/* vertical grid */}

                                            <span className="bg-modura-secondary-dark absolute right-[32px] bottom-0 h-[75%] w-px" />

                                            <span className="bg-modura-secondary-dark absolute right-[66px] bottom-0 h-[52%] w-px" />

                                            <span className="bg-modura-secondary-dark absolute right-[100px] bottom-0 h-[32%] w-px" />

                                            {/* horizontal grid */}

                                            <span className="bg-modura-secondary-dark absolute right-0 bottom-[35px] h-px w-[145px]" />

                                            <span className="bg-modura-secondary-dark absolute right-0 bottom-[70px] h-px w-[110px]" />

                                            <span className="bg-modura-secondary-dark absolute right-0 bottom-[105px] h-px w-[75px]" />

                                            {/* large structural outline */}

                                            <span className="border-modura-secondary-dark absolute -right-[48px] -bottom-[48px] h-[155px] w-[155px] rotate-45 border" />
                                        </div>

                                        {/* =================================
                    CONTENT
                ================================== */}

                                        <div className="relative z-10 flex h-full flex-col justify-between">
                                            <div>
                                                <div className="mb-6 flex items-center gap-3">
                                                    <span className="bg-modura-secondary h-[2px] w-8" />

                                                    <span className="text-modura-gray-300 text-[9px] font-bold tracking-[0.2em] uppercase">
                                                        Modura Design Group
                                                    </span>
                                                </div>

                                                <h3 className="text-modura-white text-[23px] leading-[1.3] font-semibold tracking-[-0.02em]">
                                                    Design with
                                                    <br />
                                                    precision.
                                                    <br />
                                                    Deliver with
                                                    <br />
                                                    purpose.
                                                </h3>

                                                <p className="text-modura-gray-300 mt-5 max-w-[185px] text-[11px] leading-[1.8]">
                                                    Architecture, BIM and structural expertise working together under
                                                    one design vision.
                                                </p>
                                            </div>

                                            {/* ABOUT CTA */}

                                            <Link
                                                href="/about"
                                                className="group/about border-modura-secondary-dark mt-8 border-t pt-4"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="text-modura-white text-[11px] font-semibold">
                                                        About Modura
                                                    </span>

                                                    <FiArrowUpRight className="text-modura-white text-[17px] transition-all duration-300 group-hover/about:translate-x-1 group-hover/about:-translate-y-1" />
                                                </div>

                                                <span className="bg-modura-secondary mt-3 block h-[2px] w-[30px] transition-all duration-500 group-hover/about:w-full" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* =================================================
                SERVICES
            ================================================== */}

                        <div className="group/services static h-full">
                            <DesktopDropdownTrigger title="Services" />

                            <div className="border-modura-gray-200 bg-modura-white invisible absolute top-full right-0 left-0 translate-y-3 border-t opacity-0 shadow-xl transition-all duration-300 group-hover/services:visible group-hover/services:translate-y-0 group-hover/services:opacity-100">
                                <div className="mx-auto max-w-[1440px] px-6 xl:px-10 2xl:px-12">
                                    {/* MEGA MENU HEADER */}

                                    <div className="border-modura-gray-200 flex h-[62px] items-center justify-between border-b">
                                        <div className="flex items-center gap-4">
                                            <span className="text-modura-primary text-[11px] font-bold tracking-[0.16em] uppercase">
                                                Our Expertise
                                            </span>

                                            <span className="bg-modura-secondary h-px w-10" />

                                            <span className="text-modura-gray-500 text-[12px]">
                                                Architecture, engineering, BIM and construction documentation services.
                                            </span>
                                        </div>

                                        <Link
                                            href="/services"
                                            className="group/all text-modura-primary flex items-center gap-2 text-[11px] font-semibold tracking-[0.08em] uppercase"
                                        >
                                            All Services
                                            <FiArrowUpRight className="text-[15px] transition-transform duration-300 group-hover/all:translate-x-0.5 group-hover/all:-translate-y-0.5" />
                                        </Link>
                                    </div>

                                    {/* SERVICE CONTENT */}

                                    <div className="grid min-h-[500px] grid-cols-[330px_1fr_280px]">
                                        {/* CATEGORY */}

                                        <div className="border-modura-gray-200 border-r py-4">
                                            <div className="text-modura-gray-400 mb-3 px-5 text-[10px] font-bold tracking-[0.16em] uppercase">
                                                Service Categories
                                            </div>

                                            {serviceCategories.map((category, index) => {
                                                const active = activeService === index;

                                                return (
                                                    <button
                                                        key={category.title}
                                                        type="button"
                                                        onMouseEnter={() => setActiveService(index)}
                                                        onFocus={() => setActiveService(index)}
                                                        className={`group/category border-modura-gray-100 flex min-h-[30px] w-full items-center justify-between border-b px-5 text-left transition-all duration-200 ${
                                                            active
                                                                ? 'bg-modura-primary text-modura-white'
                                                                : 'bg-modura-white text-modura-gray-700 hover:bg-modura-off-white hover:text-modura-primary'
                                                        } `}
                                                    >
                                                        <span className="text-[12px] font-medium">
                                                            {category.title}
                                                        </span>

                                                        <FiChevronRight
                                                            className={`text-[13px] transition-all duration-200 ${
                                                                active
                                                                    ? 'translate-x-0 opacity-100'
                                                                    : '-translate-x-1 opacity-0 group-hover/category:translate-x-0 group-hover/category:opacity-100'
                                                            } `}
                                                        />
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {/* SUB SERVICES */}

                                        <div className="relative overflow-hidden p-8">
                                            {/* TECHNICAL BACKGROUND */}

                                            <div className="border-modura-gray-100 pointer-events-none absolute top-0 right-0 h-full w-[180px] border-l">
                                                <span className="bg-modura-gray-100 absolute top-0 left-1/3 h-full w-px" />

                                                <span className="bg-modura-gray-100 absolute top-0 left-2/3 h-full w-px" />

                                                <span className="bg-modura-gray-100 absolute top-1/3 left-0 h-px w-full" />

                                                <span className="bg-modura-gray-100 absolute top-2/3 left-0 h-px w-full" />
                                            </div>

                                            <div className="relative z-10">
                                                <div className="border-modura-gray-200 mb-7 flex items-start justify-between border-b pb-6">
                                                    <div>
                                                        <span className="text-modura-secondary mb-2 block text-[10px] font-bold tracking-[0.16em] uppercase">
                                                            Service Category
                                                        </span>

                                                        <h3 className="text-modura-primary mb-2 text-[25px] font-semibold tracking-[-0.02em]">
                                                            {selectedService.title}
                                                        </h3>

                                                        <p className="text-modura-gray-500 max-w-[560px] text-[12px] leading-6">
                                                            {selectedService.description}
                                                        </p>
                                                    </div>

                                                    <Link
                                                        href={selectedService.href}
                                                        className="group border-modura-gray-200 text-modura-primary hover:border-modura-primary hover:bg-modura-primary hover:text-modura-white flex h-11 w-11 shrink-0 items-center justify-center border"
                                                    >
                                                        <FiArrowUpRight className="transition-transform duration-300 group-hover:rotate-45" />
                                                    </Link>
                                                </div>

                                                <span className="text-modura-gray-400 mb-3 block text-[10px] font-bold tracking-[0.16em] uppercase">
                                                    Explore Services
                                                </span>

                                                <div className="grid grid-cols-2 gap-x-8">
                                                    {selectedService.services.map((service) => (
                                                        <Link
                                                            key={service.title}
                                                            href={service.href}
                                                            className="group/sub border-modura-gray-200 flex min-h-[56px] items-center justify-between border-b"
                                                        >
                                                            <span className="text-modura-gray-700 group-hover/sub:text-modura-primary text-[13px] font-medium">
                                                                {service.title}
                                                            </span>

                                                            <FiArrowUpRight className="text-modura-primary -translate-x-1 translate-y-1 text-[15px] opacity-0 transition-all duration-300 group-hover/sub:translate-x-0 group-hover/sub:translate-y-0 group-hover/sub:opacity-100" />
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* RIGHT BRAND PANEL */}

                                        <div className="bg-modura-primary text-modura-white relative overflow-hidden p-7">
                                            <span className="border-modura-secondary absolute -top-16 -right-16 h-40 w-40 rotate-45 border" />

                                            <span className="border-modura-secondary-dark absolute top-8 -right-5 h-20 w-20 rotate-45 border" />

                                            <span className="bg-modura-secondary-dark absolute bottom-12 left-0 h-px w-full" />

                                            <div className="relative z-10 flex h-full flex-col justify-between">
                                                <div>
                                                    <span className="text-modura-gray-300 mb-6 block text-[10px] font-bold tracking-[0.18em] uppercase">
                                                        Modura Design Group
                                                    </span>

                                                    <h3 className="text-modura-white mb-4 text-[26px] leading-[1.25] font-semibold">
                                                        Design.
                                                        <br />
                                                        Coordinate.
                                                        <br />
                                                        Deliver.
                                                    </h3>

                                                    <p className="text-modura-gray-300 text-[12px] leading-6">
                                                        Integrated architecture, engineering and BIM expertise for
                                                        coordinated project delivery.
                                                    </p>
                                                </div>

                                                <Link
                                                    href="/inquiry"
                                                    className="group border-modura-secondary-dark flex items-center justify-between border-t pt-5"
                                                >
                                                    <div>
                                                        <span className="text-modura-gray-300 block text-[9px] tracking-[0.14em] uppercase">
                                                            Have a project?
                                                        </span>

                                                        <span className="text-modura-white mt-1 block text-[13px] font-semibold">
                                                            Talk to Our Team
                                                        </span>
                                                    </div>

                                                    <span className="border-modura-secondary group-hover:bg-modura-white group-hover:text-modura-primary flex h-10 w-10 items-center justify-center border transition-all duration-300">
                                                        <FiArrowUpRight />
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* =================================================
                SOFTWARE EXPERTISE
            ================================================== */}

                        <div className="group/software relative h-full">
                            <DesktopDropdownTrigger title="Software Expertise" />

                            <div className="border-modura-primary bg-modura-white invisible absolute top-full left-1/2 w-[560px] -translate-x-1/2 translate-y-3 border-t-2 p-3 opacity-0 shadow-xl transition-all duration-300 group-hover/software:visible group-hover/software:translate-y-0 group-hover/software:opacity-100">
                                <div className="border-modura-gray-200 flex items-center justify-between border-b px-3 pt-1 pb-3">
                                    <span className="text-modura-primary text-[11px] font-bold tracking-[0.14em] uppercase">
                                        Software Expertise
                                    </span>

                                    <Link
                                        href="/software-expertise"
                                        className="text-modura-primary flex items-center gap-2 text-[10px] font-semibold"
                                    >
                                        View All
                                        <FiArrowUpRight />
                                    </Link>
                                </div>

                                <div className="grid grid-cols-2">
                                    {softwareLinks.map((software) => {
                                        const Icon = software.icon;

                                        return (
                                            <Link
                                                key={software.title}
                                                href={software.href}
                                                className="group/software-item border-modura-gray-200 hover:bg-modura-off-white flex items-center gap-3 border-r border-b p-4 even:border-r-0"
                                            >
                                                <span className="border-modura-gray-200 text-modura-primary group-hover/software-item:border-modura-primary group-hover/software-item:bg-modura-primary group-hover/software-item:text-modura-white flex h-10 w-10 shrink-0 items-center justify-center border text-[19px]">
                                                    <Icon />
                                                </span>

                                                <div>
                                                    <span className="text-modura-primary block text-[13px] font-semibold">
                                                        {software.title}
                                                    </span>

                                                    <span className="text-modura-gray-500 mt-0.5 block text-[10px]">
                                                        {software.subtitle}
                                                    </span>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* =================================================
                            PORTFOLIO DROPDOWN
                        ================================================= */}

                        <div className="group/portfolio relative h-full">

                            {/* =================================================
                                PORTFOLIO TRIGGER
                            ================================================= */}

                            <DesktopDropdownTrigger title="Portfolio" />


                            {/* =================================================
                                DROPDOWN
                            ================================================= */}

                            <div
                                className="
                                    invisible
                                    absolute
                                    top-full
                                    right-0
                                    z-50
                                    w-[390px]
                                    translate-y-3
                                    opacity-0
                                    transition-all
                                    duration-300

                                    group-hover/portfolio:visible
                                    group-hover/portfolio:translate-y-0
                                    group-hover/portfolio:opacity-100
                                "
                            >

                                {/* =================================================
                                    MAIN DROPDOWN
                                ================================================= */}

                                <div
                                    className="
                                        overflow-hidden
                                        border
                                        border-modura-gray-200
                                        bg-modura-white
                                        shadow-[0_20px_50px_rgba(11,29,51,0.14)]
                                    "
                                >

                                    {/* =================================================
                                        TOP ACCENT
                                    ================================================= */}

                                    <div
                                        className="
                                            relative
                                            h-[5px]
                                            bg-modura-primary
                                        "
                                    >
                                        <span
                                            className="
                                                absolute
                                                top-0
                                                right-0
                                                h-full
                                                w-[120px]
                                                bg-modura-secondary
                                            "
                                        />
                                    </div>


                                    {/* =================================================
                                        HEADER
                                    ================================================= */}

                                    <div
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                            border-b
                                            border-modura-gray-200
                                            px-5
                                            py-4
                                        "
                                    >

                                        <div>

                                            <span
                                                className="
                                                    block
                                                    text-[9px]
                                                    font-bold
                                                    tracking-[0.25em]
                                                    text-modura-secondary
                                                    uppercase
                                                "
                                            >
                                                Portfolio
                                            </span>

                                            <h3
                                                className="
                                                    mt-1
                                                    text-[17px]
                                                    font-bold
                                                    tracking-[-0.01em]
                                                    text-modura-primary
                                                "
                                            >
                                                Explore Our Work
                                            </h3>

                                        </div>


                                        {/* VIEW ALL */}

                                        <Link
                                            href="/portfolio"
                                            className="
                                                group/view-all
                                                flex
                                                items-center
                                                gap-2
                                                text-[10px]
                                                font-bold
                                                tracking-[0.08em]
                                                text-modura-primary
                                                uppercase
                                            "
                                        >
                                            <span>
                                                View All
                                            </span>

                                            <span
                                                className="
                                                    flex
                                                    h-7
                                                    w-7
                                                    items-center
                                                    justify-center
                                                    border
                                                    border-modura-gray-300
                                                    transition-all
                                                    duration-300

                                                    group-hover/view-all:border-modura-primary
                                                    group-hover/view-all:bg-modura-primary
                                                    group-hover/view-all:text-modura-white
                                                "
                                            >
                                                <FiArrowUpRight
                                                    size={14}
                                                    className="
                                                        transition-transform
                                                        duration-300
                                                        group-hover/view-all:translate-x-[2px]
                                                        group-hover/view-all:-translate-y-[2px]
                                                    "
                                                />
                                            </span>
                                        </Link>

                                    </div>


                                    {/* =================================================
                                        SCROLLABLE PORTFOLIO LIST
                                    ================================================= */}

                                    <div
                                        className="
                                            max-h-[430px]
                                            overflow-y-auto
                                            overscroll-contain

                                            [&::-webkit-scrollbar]:w-[5px]
                                            [&::-webkit-scrollbar-track]:bg-modura-gray-100
                                            [&::-webkit-scrollbar-thumb]:bg-modura-secondary
                                            [&::-webkit-scrollbar-thumb:hover]:bg-modura-primary
                                        "
                                    >

                                        {portfolioLinks.map((item, index) => (

                                            <Link
                                                key={item.title}
                                                href={item.href}
                                                className="
                                                    group/portfolio-item
                                                    relative
                                                    flex
                                                    min-h-[68px]
                                                    items-center
                                                    border-b
                                                    border-modura-gray-200
                                                    bg-modura-white
                                                    px-5
                                                    transition-all
                                                    duration-300

                                                    hover:bg-modura-off-white
                                                "
                                            >

                                                {/* =================================================
                                                    LEFT ARCHITECTURAL MARK
                                                ================================================= */}

                                                <span
                                                    className="
                                                        relative
                                                        mr-4
                                                        flex
                                                        h-[34px]
                                                        w-[34px]
                                                        shrink-0
                                                        items-center
                                                        justify-center
                                                        border
                                                        border-modura-gray-300
                                                        text-modura-secondary
                                                        transition-all
                                                        duration-300

                                                        group-hover/portfolio-item:border-modura-primary
                                                        group-hover/portfolio-item:bg-modura-primary
                                                        group-hover/portfolio-item:text-modura-white
                                                    "
                                                >

                                                    {/* Use your actual item icon if available */}

                                                    {item.icon ? (
                                                        <item.icon size={17} />
                                                    ) : (
                                                        <FiLayers size={17} />
                                                    )}

                                                </span>


                                                {/* =================================================
                                                    ACTIVE LEFT LINE
                                                ================================================= */}

                                                <span
                                                    className="
                                                        absolute
                                                        top-1/2
                                                        left-0
                                                        h-0
                                                        w-[3px]
                                                        -translate-y-1/2
                                                        bg-modura-secondary
                                                        transition-all
                                                        duration-300

                                                        group-hover/portfolio-item:h-[32px]
                                                    "
                                                />


                                                {/* =================================================
                                                    TITLE
                                                ================================================= */}

                                                <span
                                                    className="
                                                        flex-1
                                                        pr-8
                                                        text-[12px]
                                                        font-semibold
                                                        leading-5
                                                        text-modura-gray-700
                                                        transition-colors
                                                        duration-300

                                                        group-hover/portfolio-item:text-modura-primary
                                                    "
                                                >
                                                    {item.title}
                                                </span>


                                                {/* =================================================
                                                    ARROW
                                                ================================================= */}

                                                <span
                                                    className="
                                                        absolute
                                                        right-5
                                                        flex
                                                        h-7
                                                        w-7
                                                        items-center
                                                        justify-center
                                                        border
                                                        border-transparent
                                                        text-modura-primary
                                                        opacity-0
                                                        translate-x-[-5px]
                                                        transition-all
                                                        duration-300

                                                        group-hover/portfolio-item:translate-x-0
                                                        group-hover/portfolio-item:opacity-100
                                                    "
                                                >
                                                    <FiArrowUpRight
                                                        size={14}
                                                    />
                                                </span>


                                                {/* =================================================
                                                    BOTTOM HOVER LINE
                                                ================================================= */}

                                                <span
                                                    className="
                                                        absolute
                                                        right-0
                                                        bottom-[-1px]
                                                        left-0
                                                        z-10
                                                        h-[2px]
                                                        w-0
                                                        bg-modura-secondary
                                                        transition-all
                                                        duration-500

                                                        group-hover/portfolio-item:w-full
                                                    "
                                                />

                                            </Link>

                                        ))}

                                    </div>


                                    {/* =================================================
                                        BOTTOM STRIP
                                    ================================================= */}

                                    <div
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                            bg-modura-primary
                                            px-5
                                            py-4
                                        "
                                    >

                                        <div
                                            className="
                                                flex
                                                items-center
                                                gap-3
                                            "
                                        >
                                            <span
                                                className="
                                                    h-[28px]
                                                    w-[2px]
                                                    bg-modura-secondary
                                                "
                                            />

                                            <div>

                                                <span
                                                    className="
                                                        block
                                                        text-[8px]
                                                        font-bold
                                                        tracking-[0.18em]
                                                        text-modura-gray-300
                                                        uppercase
                                                    "
                                                >
                                                    Modura Design Group
                                                </span>

                                                <span
                                                    className="
                                                        mt-1
                                                        block
                                                        text-[11px]
                                                        font-medium
                                                        text-modura-white
                                                    "
                                                >
                                                    Design • Engineering • BIM
                                                </span>

                                            </div>
                                        </div>


                                        <Link
                                            href="/inquiry"
                                            className="
                                                group/discuss
                                                flex
                                                items-center
                                                gap-2
                                                text-[9px]
                                                font-bold
                                                tracking-[0.1em]
                                                text-modura-white
                                                uppercase
                                            "
                                        >
                                            <span>
                                                Discuss Project
                                            </span>

                                            <FiArrowUpRight
                                                size={14}
                                                className="
                                                    text-modura-secondary
                                                    transition-transform
                                                    duration-300
                                                    group-hover/discuss:translate-x-1
                                                    group-hover/discuss:-translate-y-1
                                                "
                                            />
                                        </Link>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <DesktopLink title="Career" href="/career" />

                        <DesktopLink title="Inquiry" href="/inquiry" />
                    </nav>

                    {/* =================================================
              CREATIVE CTA
          ================================================== */}

                    <div className="flex items-center">
                        <Link
                            href="/contact"
                            className="group border-modura-primary bg-modura-white text-modura-primary relative hidden h-[52px] items-center overflow-hidden border pr-[62px] pl-5 xl:flex"
                        >
                            {/* NAVY FILL */}

                            <span className="bg-modura-primary absolute inset-y-0 left-0 w-0 transition-all duration-500 group-hover:w-full" />

                            {/* TOP ARCHITECTURAL LINE */}

                            <span className="bg-modura-secondary absolute top-0 left-0 z-10 h-[3px] w-8 transition-all duration-500 group-hover:w-full" />

                            {/* TECHNICAL MARK */}

                            <span className="relative z-10 mr-3 flex items-center gap-1.5">
                                <span className="bg-modura-secondary group-hover:bg-modura-white h-[5px] w-[5px] rotate-45 transition-colors duration-300" />

                                {/* <span
                                    className="
                    h-px w-4
                    bg-modura-secondary
                    transition-colors duration-300
                    group-hover:bg-modura-white
                  "
                                /> */}
                            </span>

                            <span className="group-hover:text-modura-white relative z-10 text-[12px] font-bold tracking-[0.08em] whitespace-nowrap uppercase transition-colors duration-300">
                                Get a Quote
                            </span>

                            {/* ARROW */}

                            <span className="bg-modura-primary text-modura-white group-hover:bg-modura-secondary absolute top-0 right-0 z-10 flex h-full w-[48px] items-center justify-center transition-colors duration-300">
                                <FiArrowUpRight className="text-[18px] transition-transform duration-300 group-hover:rotate-45" />
                            </span>
                        </Link>

                        {/* MOBILE BUTTON */}

                        <button
                            type="button"
                            aria-label="Toggle navigation"
                            aria-expanded={mobileMenu}
                            onClick={() => setMobileMenu(!mobileMenu)}
                            className="border-modura-gray-200 bg-modura-white text-modura-primary hover:bg-modura-light flex h-11 w-11 items-center justify-center border text-[21px] lg:hidden"
                        >
                            {mobileMenu ? <FiX /> : <FiMenu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* =====================================================
          MOBILE MENU
      ====================================================== */}

            <div
                className={`bg-modura-white overflow-y-auto transition-all duration-500 lg:hidden ${
                    mobileMenu
                        ? 'border-modura-gray-200 max-h-[calc(100vh-92px)] border-t opacity-100'
                        : 'max-h-0 opacity-0'
                } `}
            >
                <div className="px-5 pb-6 md:px-8">
                    <MobileSimpleLink title="Home" href="/" close={() => setMobileMenu(false)} />

                    {/* COMPANY MOBILE */}

                    <MobileSectionButton
                        title="Company"
                        open={mobileSection === 'company'}
                        onClick={() => toggleMobileSection('company')}
                    />

                    <div
                        className={`bg-modura-off-white overflow-hidden transition-all duration-300 ${mobileSection === 'company' ? 'max-h-[500px]' : 'max-h-0'} `}
                    >
                        {companyLinks.map((item) => (
                            <Link
                                key={item.title}
                                href={item.href}
                                onClick={() => setMobileMenu(false)}
                                className="border-modura-gray-200 text-modura-gray-700 flex min-h-[46px] items-center border-b px-4 text-[13px] font-medium"
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>

                    {/* SERVICES MOBILE */}

                    <MobileSectionButton
                        title="Services"
                        open={mobileSection === 'services'}
                        onClick={() => toggleMobileSection('services')}
                    />

                    <div
                        className={`bg-modura-off-white overflow-hidden transition-all duration-500 ${mobileSection === 'services' ? 'max-h-[2200px]' : 'max-h-0'} `}
                    >
                        {serviceCategories.map((category, index) => {
                            const open = mobileServiceCategory === index;

                            return (
                                <div key={category.title} className="border-modura-gray-200 border-b">
                                    <button
                                        type="button"
                                        onClick={() => setMobileServiceCategory(open ? null : index)}
                                        className="flex min-h-[48px] w-full items-center justify-between px-4 text-left"
                                    >
                                        <span className="text-modura-primary text-[13px] font-semibold">
                                            {category.title}
                                        </span>

                                        <FiChevronDown
                                            className={`text-[14px] transition-transform duration-300 ${open ? 'rotate-180' : ''} `}
                                        />
                                    </button>

                                    <div
                                        className={`bg-modura-white overflow-hidden transition-all duration-300 ${open ? 'max-h-[500px]' : 'max-h-0'} `}
                                    >
                                        <Link
                                            href={category.href}
                                            onClick={() => setMobileMenu(false)}
                                            className="border-modura-gray-100 text-modura-primary flex min-h-[44px] items-center justify-between border-b px-6 text-[11px] font-bold tracking-[0.06em] uppercase"
                                        >
                                            View Category
                                            <FiArrowUpRight />
                                        </Link>

                                        {category.services.map((service) => (
                                            <Link
                                                key={service.title}
                                                href={service.href}
                                                onClick={() => setMobileMenu(false)}
                                                className="border-modura-gray-100 text-modura-gray-600 flex min-h-[44px] items-center gap-3 border-b px-6 text-[12px]"
                                            >
                                                <span className="bg-modura-secondary h-px w-3" />

                                                {service.title}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* SOFTWARE MOBILE */}

                    <MobileSectionButton
                        title="Software Expertise"
                        open={mobileSection === 'software'}
                        onClick={() => toggleMobileSection('software')}
                    />

                    <div
                        className={`bg-modura-off-white overflow-hidden transition-all duration-300 ${mobileSection === 'software' ? 'max-h-[500px]' : 'max-h-0'} `}
                    >
                        {softwareLinks.map((software) => {
                            const Icon = software.icon;

                            return (
                                <Link
                                    key={software.title}
                                    href={software.href}
                                    onClick={() => setMobileMenu(false)}
                                    className="border-modura-gray-200 flex items-center gap-3 border-b px-4 py-3"
                                >
                                    <Icon className="text-modura-primary text-[19px]" />

                                    <div>
                                        <span className="text-modura-primary block text-[13px] font-semibold">
                                            {software.title}
                                        </span>

                                        <span className="text-modura-gray-500 block text-[10px]">
                                            {software.subtitle}
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* PORTFOLIO MOBILE */}

                    <MobileSectionButton
                        title="Portfolio"
                        open={mobileSection === 'portfolio'}
                        onClick={() => toggleMobileSection('portfolio')}
                    />

                    <div
                        className={`bg-modura-off-white overflow-hidden transition-all duration-300 ${mobileSection === 'portfolio' ? 'max-h-[700px]' : 'max-h-0'} `}
                    >
                        {portfolioLinks.map((item) => (
                            <Link
                                key={item.title}
                                href={item.href}
                                onClick={() => setMobileMenu(false)}
                                className="border-modura-gray-200 text-modura-gray-700 flex min-h-[46px] items-center border-b px-4 text-[12px] font-medium"
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>

                    <MobileSimpleLink title="Career" href="/career" close={() => setMobileMenu(false)} />

                    <MobileSimpleLink title="Inquiry" href="/inquiry" close={() => setMobileMenu(false)} />

                    {/* MOBILE CTA */}

                    <Link
                        href="#"
                        onClick={() => setMobileMenu(false)}
                        className="bg-modura-primary text-modura-white mt-5 flex h-[52px] items-center justify-between px-5 text-[12px] font-bold tracking-[0.08em] uppercase"
                    >
                        Get a Quote
                        <FiArrowUpRight className="text-[17px]" />
                    </Link>
                </div>
            </div>
        </header>
    );
}

/* =========================================================
   DESKTOP LINK
========================================================= */

function DesktopLink({ title, href }: { title: string; href: string }) {
    return (
        <Link
            href={href}
            className="group text-modura-gray-800 hover:text-modura-primary relative flex h-full items-center px-3 text-[13px] font-semibold tracking-[0.01em] xl:px-4"
        >
            {title}

            <span className="bg-modura-primary absolute bottom-[22px] left-4 h-[2px] w-0 transition-all duration-300 group-hover:w-[18px]" />

            <span className="bg-modura-secondary absolute bottom-[21px] left-[38px] h-1 w-1 scale-0 rotate-45 transition-all duration-300 group-hover:scale-100" />
        </Link>
    );
}

/* =========================================================
   DESKTOP DROPDOWN TRIGGER
========================================================= */

function DesktopDropdownTrigger({ title }: { title: string }) {
    return (
        <button
            type="button"
            className="group/trigger bg-modura-white text-modura-gray-800 hover:text-modura-primary relative flex h-full items-center gap-2 px-3 text-[15px] font-semibold tracking-[0.01em] xl:px-4"
        >
            {title}

            <span className="border-modura-gray-300 text-modura-gray-600 group-hover/trigger:border-modura-primary group-hover/trigger:bg-modura-primary group-hover/trigger:text-modura-white flex h-[17px] w-[17px] items-center justify-center border transition-all duration-300">
                <FiChevronDown className="text-[9px] transition-transform duration-300 group-hover/trigger:rotate-180" />
            </span>

            <span className="bg-modura-primary absolute bottom-[22px] left-4 h-[2px] w-0 transition-all duration-300 group-hover/trigger:w-[18px]" />

            <span className="bg-modura-secondary absolute bottom-[21px] left-[38px] h-1 w-1 scale-0 rotate-45 transition-all duration-300 group-hover/trigger:scale-100" />
        </button>
    );
}

/* =========================================================
   MOBILE LINK
========================================================= */

function MobileSimpleLink({ title, href, close }: { title: string; href: string; close: () => void }) {
    return (
        <Link
            href={href}
            onClick={close}
            className="border-modura-gray-200 text-modura-primary flex min-h-[56px] items-center border-b text-[14px] font-semibold"
        >
            {title}
        </Link>
    );
}

/* =========================================================
   MOBILE SECTION
========================================================= */

function MobileSectionButton({ title, open, onClick }: { title: string; open: boolean; onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="border-modura-gray-200 bg-modura-white text-modura-primary flex min-h-[56px] w-full items-center justify-between border-b text-left text-[14px] font-semibold"
        >
            {title}

            <FiChevronDown className={`text-[15px] transition-transform duration-300 ${open ? 'rotate-180' : ''} `} />
        </button>
    );
}
