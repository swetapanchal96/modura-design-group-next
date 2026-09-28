"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
    FiArrowRight,
    FiArrowUpRight,
    FiChevronDown,
    FiChevronRight,
    FiMenu,
    FiX,
} from "react-icons/fi";

import {
    PiBlueprint,
    PiBuildings,
    PiBridge,
    PiCube,
    PiGear,
    PiStack,
} from "react-icons/pi";

import logo from "@/app/assets/images/modura-logo-new.jpeg";

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
        title: "About Modura",
        href: "/company/about",
    },
    {
        title: "Why Choose Us",
        href: "/company/why-us",
    },
    {
        title: "Our Team",
        href: "/company/team",
    },
    {
        title: "Quality Policy",
        href: "/company/quality-policy",
    },
    {
        title: "Certifications",
        href: "/company/certifications",
    },
    {
        title: "Testimonials",
        href: "/company/testimonials",
    },
    {
        title: "FAQs",
        href: "/company/faqs",
    },
];

/* =========================================================
   SERVICES
========================================================= */

const serviceCategories: ServiceCategory[] = [
    {
        title: "CAD Drafting Services",
        href: "/services/cad-drafting-services",
        description:
            "Accurate CAD drafting and technical documentation for architecture, engineering and construction projects.",
        services: [
            {
                title: "2D CAD Drafting",
                href: "/services/cad-drafting-services/2d-cad-drafting",
            },
            {
                title: "CAD Conversion",
                href: "/services/cad-drafting-services/cad-conversion",
            },
            {
                title: "As-Built Drawings",
                href: "/services/cad-drafting-services/as-built-drawings",
            },
            {
                title: "Construction Drawings",
                href: "/services/cad-drafting-services/construction-drawings",
            },
            {
                title: "PDF / Sketch to CAD",
                href: "/services/cad-drafting-services/pdf-sketch-to-cad",
            },
        ],
    },

    {
        title: "Architectural Engineering",
        href: "/services/architectural-engineering",
        description:
            "Architectural planning, documentation, modelling and visualization for coordinated project delivery.",
        services: [
            {
                title: "Architectural Drafting",
                href: "/services/architectural-engineering/architectural-drafting",
            },
            {
                title: "Architectural Planning",
                href: "/services/architectural-engineering/architectural-planning",
            },
            {
                title: "Architectural Modeling",
                href: "/services/architectural-engineering/architectural-modeling",
            },
            {
                title: "Architectural Renderings",
                href: "/services/architectural-engineering/architectural-renderings",
            },
            {
                title: "Architectural Walkthroughs",
                href: "/services/architectural-engineering/architectural-walkthroughs",
            },
        ],
    },

    {
        title: "Structural Engineering",
        href: "/services/structural-engineering",
        description:
            "Structural analysis, design and detailing solutions for safe, coordinated and constructible building systems.",
        services: [
            {
                title: "Residential Structural Design",
                href: "/services/structural-engineering/residential-structural-design",
            },
            {
                title: "Structural Steel Detailing",
                href: "/services/structural-engineering/structural-steel-detailing",
            },
            {
                title: "Reinforcement Detailing",
                href: "/services/structural-engineering/reinforcement-detailing",
            },
            {
                title: "Steel / Concrete Structures",
                href: "/services/structural-engineering/steel-concrete-structures",
            },
            {
                title: "Structural Steel Frame Analysis",
                href: "/services/structural-engineering/structural-steel-frame-analysis",
            },
            {
                title: "Structural Calculations",
                href: "/services/structural-engineering/structural-calculations",
            },
        ],
    },

    {
        title: "Building Information Modeling",
        href: "/services/building-information-modeling",
        description:
            "Integrated BIM workflows connecting design, coordination, construction and project information.",
        services: [
            {
                title: "Architectural BIM",
                href: "/services/building-information-modeling/architectural-bim",
            },
            {
                title: "Structural BIM",
                href: "/services/building-information-modeling/structural-bim",
            },
            {
                title: "MEP BIM",
                href: "/services/building-information-modeling/mep-bim",
            },
            {
                title: "Scan to BIM",
                href: "/services/building-information-modeling/scan-to-bim",
            },
            {
                title: "Clash Detection",
                href: "/services/building-information-modeling/clash-detection",
            },
            {
                title: "BIM Coordination",
                href: "/services/building-information-modeling/bim-coordination",
            },
        ],
    },

    {
        title: "MEP Engineering",
        href: "/services/mep-engineering",
        description:
            "Integrated mechanical, electrical and plumbing engineering for coordinated building systems.",
        services: [
            {
                title: "MEP Design",
                href: "/services/mep-engineering/mep-design",
            },
            {
                title: "MEP Coordination",
                href: "/services/mep-engineering/mep-coordination",
            },
            {
                title: "MEP Drafting",
                href: "/services/mep-engineering/mep-drafting",
            },
            {
                title: "MEP BIM Modeling",
                href: "/services/mep-engineering/mep-bim-modeling",
            },
            {
                title: "MEP Shop Drawings",
                href: "/services/mep-engineering/mep-shop-drawings",
            },
        ],
    },

    {
        title: "Mechanical Engineering",
        href: "/services/mechanical-engineering",
        description:
            "Mechanical design, modelling and technical documentation for multidisciplinary engineering projects.",
        services: [
            {
                title: "Mechanical Design",
                href: "/services/mechanical-engineering/mechanical-design",
            },
            {
                title: "Mechanical Drafting",
                href: "/services/mechanical-engineering/mechanical-drafting",
            },
            {
                title: "3D Mechanical Modeling",
                href: "/services/mechanical-engineering/3d-modeling",
            },
            {
                title: "Mechanical Detailing",
                href: "/services/mechanical-engineering/mechanical-detailing",
            },
        ],
    },

    {
        title: "Shop Drawing Services",
        href: "/services/shop-drawing-services",
        description:
            "Fabrication and installation-ready shop drawings developed for accurate project execution.",
        services: [
            {
                title: "Architectural Shop Drawings",
                href: "/services/shop-drawing-services/architectural",
            },
            {
                title: "Structural Shop Drawings",
                href: "/services/shop-drawing-services/structural",
            },
            {
                title: "MEP Shop Drawings",
                href: "/services/shop-drawing-services/mep",
            },
            {
                title: "Fabrication Drawings",
                href: "/services/shop-drawing-services/fabrication",
            },
            {
                title: "Facade Shop Drawings",
                href: "/services/shop-drawing-services/facade",
            },
        ],
    },

    {
        title: "Electrical Services",
        href: "/services/electrical-services",
        description:
            "Electrical layouts, engineering documentation and coordinated building-services design.",
        services: [
            {
                title: "Electrical Design",
                href: "/services/electrical-services/electrical-design",
            },
            {
                title: "Electrical Drafting",
                href: "/services/electrical-services/electrical-drafting",
            },
            {
                title: "Lighting Layouts",
                href: "/services/electrical-services/lighting-layouts",
            },
            {
                title: "Power Distribution",
                href: "/services/electrical-services/power-distribution",
            },
        ],
    },

    {
        title: "Plumbing / Piping",
        href: "/services/plumbing-piping",
        description:
            "Coordinated plumbing and piping design solutions for building and engineering applications.",
        services: [
            {
                title: "Plumbing Design",
                href: "/services/plumbing-piping/plumbing-design",
            },
            {
                title: "Piping Design",
                href: "/services/plumbing-piping/piping-design",
            },
            {
                title: "Plumbing Drafting",
                href: "/services/plumbing-piping/plumbing-drafting",
            },
            {
                title: "Piping Layouts",
                href: "/services/plumbing-piping/piping-layouts",
            },
        ],
    },

    {
        title: "HVAC Engineering",
        href: "/services/hvac-engineering",
        description:
            "HVAC design, calculations, layouts and coordinated documentation for efficient building systems.",
        services: [
            {
                title: "HVAC System Design",
                href: "/services/hvac-engineering/system-design",
            },
            {
                title: "HVAC Load Calculations",
                href: "/services/hvac-engineering/load-calculations",
            },
            {
                title: "Duct Layouts",
                href: "/services/hvac-engineering/duct-layouts",
            },
            {
                title: "HVAC Piping Design",
                href: "/services/hvac-engineering/piping-design",
            },
            {
                title: "HVAC Shop Drawings",
                href: "/services/hvac-engineering/shop-drawings",
            },
        ],
    },

    {
        title: "Civil Engineering",
        href: "/services/civil-engineering",
        description:
            "Civil engineering and documentation support across planning, design and construction stages.",
        services: [
            {
                title: "Civil Drafting",
                href: "/services/civil-engineering/civil-drafting",
            },
            {
                title: "Civil Engineering Design",
                href: "/services/civil-engineering/design",
            },
            {
                title: "Site Development",
                href: "/services/civil-engineering/site-development",
            },
            {
                title: "Construction Documentation",
                href: "/services/civil-engineering/construction-documentation",
            },
        ],
    },

    {
        title: "Detailing Services",
        href: "/services/detailing-services",
        description:
            "Detailed fabrication and construction documentation developed for accuracy and coordination.",
        services: [
            {
                title: "Steel Detailing",
                href: "/services/detailing-services/steel-detailing",
            },
            {
                title: "Rebar Detailing",
                href: "/services/detailing-services/rebar-detailing",
            },
            {
                title: "Precast Detailing",
                href: "/services/detailing-services/precast-detailing",
            },
            {
                title: "Structural Detailing",
                href: "/services/detailing-services/structural-detailing",
            },
        ],
    },

    {
        title: "Mass Timber Buildings",
        href: "/services/mass-timber-buildings",
        description:
            "Engineering and detailing support for modern mass-timber building systems and assemblies.",
        services: [
            {
                title: "Mass Timber Detailing",
                href: "/services/mass-timber-buildings/detailing",
            },
            {
                title: "CLT Detailing",
                href: "/services/mass-timber-buildings/clt-detailing",
            },
            {
                title: "Glulam Detailing",
                href: "/services/mass-timber-buildings/glulam-detailing",
            },
            {
                title: "Timber Shop Drawings",
                href: "/services/mass-timber-buildings/shop-drawings",
            },
        ],
    },

    {
        title: "Sheet Metal Design",
        href: "/services/sheet-metal-design",
        description:
            "Precision sheet-metal modelling, detailing and fabrication documentation.",
        services: [
            {
                title: "Sheet Metal Drafting",
                href: "/services/sheet-metal-design/drafting",
            },
            {
                title: "Sheet Metal Detailing",
                href: "/services/sheet-metal-design/detailing",
            },
            {
                title: "Fabrication Drawings",
                href: "/services/sheet-metal-design/fabrication-drawings",
            },
            {
                title: "3D Sheet Metal Modeling",
                href: "/services/sheet-metal-design/3d-modeling",
            },
        ],
    },

    {
        title: "Cladding Engineering",
        href: "/services/cladding-engineering",
        description:
            "Facade and cladding engineering documentation supporting fabrication and installation.",
        services: [
            {
                title: "Cladding Design",
                href: "/services/cladding-engineering/design",
            },
            {
                title: "Facade Detailing",
                href: "/services/cladding-engineering/facade-detailing",
            },
            {
                title: "Cladding Shop Drawings",
                href: "/services/cladding-engineering/shop-drawings",
            },
            {
                title: "Panel Layouts",
                href: "/services/cladding-engineering/panel-layouts",
            },
        ],
    },
];

/* =========================================================
   SOFTWARE
========================================================= */

const softwareLinks = [
    {
        title: "AutoCAD",
        subtitle: "CAD Drafting",
        icon: PiBlueprint,
        href: "/software-expertise/autocad",
    },
    {
        title: "Autodesk Revit",
        subtitle: "BIM & Coordination",
        icon: PiCube,
        href: "/software-expertise/revit",
    },
    {
        title: "Tekla Structures",
        subtitle: "Structural Detailing",
        icon: PiBridge,
        href: "/software-expertise/tekla",
    },
    {
        title: "STAAD.Pro",
        subtitle: "Structural Analysis",
        icon: PiBuildings,
        href: "/software-expertise/staad-pro",
    },
    {
        title: "Autodesk Inventor",
        subtitle: "Mechanical Engineering",
        icon: PiGear,
        href: "/software-expertise/autodesk-inventor",
    },
];

/* =========================================================
   PORTFOLIO
========================================================= */

const portfolioLinks = [
    {
        title: "Steel Detailing Samples",
        href: "/portfolio/steel-detailing",
    },
    {
        title: "Rebar Detailing Samples",
        href: "/portfolio/rebar-detailing",
    },
    {
        title: "Architectural Samples",
        href: "/portfolio/architectural",
    },
    {
        title: "Structural Samples",
        href: "/portfolio/structural",
    },
    {
        title: "Facade Shop Drawings",
        href: "/portfolio/facade-shop-drawings",
    },
    {
        title: "Precast Shop Drawings",
        href: "/portfolio/precast-shop-drawings",
    },
    {
        title: "BIM Samples",
        href: "/portfolio/bim",
    },
    {
        title: "Mechanical Detailing",
        href: "/portfolio/mechanical-detailing",
    },
    {
        title: "Millwork / Joinery",
        href: "/portfolio/millwork-joinery",
    },
];

/* =========================================================
   HEADER
========================================================= */

export default function Header() {
    const [activeService, setActiveService] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);

    const [mobileSection, setMobileSection] = useState<string | null>(null);

    const [mobileServiceCategory, setMobileServiceCategory] = useState<
        number | null
    >(null);

    const selectedService = serviceCategories[activeService];

    const toggleMobileSection = (section: string) => {
        setMobileSection((current) => (current === section ? null : section));
    };

    return (
        <header
            className="
        relative z-50
        border-b border-modura-gray-200
        bg-modura-white
      "
        >
            {/* =====================================================
          MAIN HEADER
      ====================================================== */}

            <div className="mx-auto max-w-[1440px] px-6 xl:px-10 2xl:px-12">
                <div className="flex h-[128px] items-center justify-between">
                    {/* =================================================
              LOGO
          ================================================== */}

                    <Link
                        href="/"
                        className="
    flex
    h-full
    w-[200px]
    shrink-0
    items-center
    justify-start
  "
                    >
                        <div
                            className="
      relative
      flex h-[112px]
      w-[175px]
      items-center
      justify-center
      overflow-hidden
    "
                        >
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

                            <div
                                className="
            invisible
            absolute
            left-0
            top-full
            w-[570px]
            translate-y-3
            opacity-0
            transition-all
            duration-300
            group-hover/company:visible
            group-hover/company:translate-y-0
            group-hover/company:opacity-100
        "
                            >
                                {/* =========================================
            TOP ARCHITECTURAL ACCENT
        ========================================== */}

                                <div className="relative h-[5px] bg-modura-primary">
                                    <span
                                        className="
                    absolute
                    left-0
                    top-0
                    h-full
                    w-[105px]
                    bg-modura-secondary
                "
                                    />

                                    <span
                                        className="
                    absolute
                    right-[55px]
                    top-0
                    h-full
                    w-[2px]
                    bg-modura-white
                "
                                    />
                                </div>

                                {/* =========================================
            DROPDOWN BODY
        ========================================== */}

                                <div
                                    className="
                grid
                grid-cols-[1.15fr_0.85fr]
                overflow-hidden
                border-x
                border-b
                border-modura-gray-200
                bg-modura-white
                shadow-xl
            "
                                >
                                    {/* =====================================
                LEFT — COMPANY LINKS
            ====================================== */}

                                    <div className="px-6 py-6">
                                        {/* heading */}

                                        <div
                                            className="
                        mb-4
                        border-b
                        border-modura-gray-200
                        pb-4
                    "
                                        >
                                            <span
                                                className="
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.18em]
                            text-modura-secondary
                        "
                                            >
                                                Discover Modura
                                            </span>

                                            <h3
                                                className="
                            mt-1
                            text-[20px]
                            font-semibold
                            tracking-[-0.02em]
                            text-modura-primary
                        "
                                            >
                                                Inside Our Company
                                            </h3>
                                        </div>

                                        {/* links */}

                                        <div>
                                            {companyLinks.map((item) => (
                                                <Link
                                                    key={item.title}
                                                    href={item.href}
                                                    className="
                                group/company-link
                                relative
                                flex
                                min-h-[46px]
                                items-center
                                justify-between
                                overflow-hidden
                                border-b
                                border-modura-gray-100
                                last:border-b-0
                            "
                                                >
                                                    {/* hover background */}

                                                    <span
                                                        className="
                                    absolute
                                    inset-y-0
                                    left-0
                                    w-0
                                    bg-modura-off-white
                                    transition-all
                                    duration-300
                                    group-hover/company-link:w-full
                                "
                                                    />

                                                    {/* left hover line */}

                                                    {/* Architectural corner marker */}
                                                    <span
                                                        className="
        absolute
        left-0
        top-1/2
        h-[12px]
        w-[12px]
        -translate-y-1/2
        opacity-0
        transition-all
        duration-300
        group-hover/company-link:opacity-100
    "
                                                    >
                                                        {/* vertical */}
                                                        <span
                                                            className="
            absolute
            bottom-0
            left-0
            h-full
            w-[2px]
            bg-modura-secondary
        "
                                                        />

                                                        {/* horizontal */}
                                                        <span
                                                            className="
            absolute
            bottom-0
            left-0
            h-[2px]
            w-full
            bg-modura-secondary
        "
                                                        />
                                                    </span>

                                                    <span
                                                        className="
                                    relative
                                    z-10
                                    text-[13px]
                                    font-semibold
                                    text-modura-gray-700
                                    transition-all
                                    duration-300
                                    group-hover/company-link:translate-x-6
                                    group-hover/company-link:text-modura-primary
                                "
                                                    >
                                                        {item.title}
                                                    </span>

                                                    <FiArrowUpRight
                                                        className="
                                    relative
                                    z-10
                                    -translate-x-2
                                    translate-y-2
                                    text-[16px]
                                    text-modura-primary
                                    opacity-0
                                    transition-all
                                    duration-300
                                    group-hover/company-link:translate-x-0
                                    group-hover/company-link:translate-y-0
                                    group-hover/company-link:opacity-100
                                "
                                                    />

                                                    {/* bottom hover accent */}

                                                    <span
                                                        className="
                                    absolute
                                    bottom-0
                                    left-0
                                    h-[2px]
                                    w-0
                                    bg-modura-secondary
                                    transition-all
                                    duration-500
                                    group-hover/company-link:w-full
                                "
                                                    />
                                                </Link>
                                            ))}
                                        </div>
                                    </div>

                                    {/* =====================================
                RIGHT — MODURA BRAND AREA
            ====================================== */}

                                    <div
                                        className="
                    relative
                    overflow-hidden
                    bg-modura-primary
                    px-6
                    py-6
                "
                                    >
                                        {/* =================================
                    ARCHITECTURAL LINE ART
                ================================== */}

                                        <div
                                            className="
                        pointer-events-none
                        absolute
                        inset-0
                    "
                                        >
                                            {/* vertical grid */}

                                            <span
                                                className="
                            absolute
                            bottom-0
                            right-[32px]
                            h-[75%]
                            w-px
                            bg-modura-secondary-dark
                        "
                                            />

                                            <span
                                                className="
                            absolute
                            bottom-0
                            right-[66px]
                            h-[52%]
                            w-px
                            bg-modura-secondary-dark
                        "
                                            />

                                            <span
                                                className="
                            absolute
                            bottom-0
                            right-[100px]
                            h-[32%]
                            w-px
                            bg-modura-secondary-dark
                        "
                                            />

                                            {/* horizontal grid */}

                                            <span
                                                className="
                            absolute
                            bottom-[35px]
                            right-0
                            h-px
                            w-[145px]
                            bg-modura-secondary-dark
                        "
                                            />

                                            <span
                                                className="
                            absolute
                            bottom-[70px]
                            right-0
                            h-px
                            w-[110px]
                            bg-modura-secondary-dark
                        "
                                            />

                                            <span
                                                className="
                            absolute
                            bottom-[105px]
                            right-0
                            h-px
                            w-[75px]
                            bg-modura-secondary-dark
                        "
                                            />

                                            {/* large structural outline */}

                                            <span
                                                className="
                            absolute
                            -bottom-[48px]
                            -right-[48px]
                            h-[155px]
                            w-[155px]
                            rotate-45
                            border
                            border-modura-secondary-dark
                        "
                                            />
                                        </div>

                                        {/* =================================
                    CONTENT
                ================================== */}

                                        <div
                                            className="
                        relative
                        z-10
                        flex
                        h-full
                        flex-col
                        justify-between
                    "
                                        >
                                            <div>
                                                <div className="mb-6 flex items-center gap-3">
                                                    <span
                                                        className="
                                    h-[2px]
                                    w-8
                                    bg-modura-secondary
                                "
                                                    />

                                                    <span
                                                        className="
                                    text-[9px]
                                    font-bold
                                    uppercase
                                    tracking-[0.2em]
                                    text-modura-gray-300
                                "
                                                    >
                                                        Modura Design Group
                                                    </span>
                                                </div>

                                                <h3
                                                    className="
                                text-[23px]
                                font-semibold
                                leading-[1.3]
                                tracking-[-0.02em]
                                text-modura-white
                            "
                                                >
                                                    Design with
                                                    <br />
                                                    precision.
                                                    <br />
                                                    Deliver with
                                                    <br />
                                                    purpose.
                                                </h3>

                                                <p
                                                    className="
                                mt-5
                                max-w-[185px]
                                text-[11px]
                                leading-[1.8]
                                text-modura-gray-300
                            "
                                                >
                                                    Architecture, BIM and structural expertise working
                                                    together under one design vision.
                                                </p>
                                            </div>

                                            {/* ABOUT CTA */}

                                            <Link
                                                href="/about"
                                                className="
                            group/about
                            mt-8
                            border-t
                            border-modura-secondary-dark
                            pt-4
                        "
                                            >
                                                <div
                                                    className="
                                flex
                                items-center
                                justify-between
                            "
                                                >
                                                    <span
                                                        className="
                                    text-[11px]
                                    font-semibold
                                    text-modura-white
                                "
                                                    >
                                                        About Modura
                                                    </span>

                                                    <FiArrowUpRight
                                                        className="
                                    text-[17px]
                                    text-modura-white
                                    transition-all
                                    duration-300
                                    group-hover/about:translate-x-1
                                    group-hover/about:-translate-y-1
                                "
                                                    />
                                                </div>

                                                <span
                                                    className="
                                mt-3
                                block
                                h-[2px]
                                w-[30px]
                                bg-modura-secondary
                                transition-all
                                duration-500
                                group-hover/about:w-full
                            "
                                                />
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

                            <div
                                className="
                  invisible
                  absolute
                  left-0 right-0
                  top-full
                  translate-y-3
                  border-t border-modura-gray-200
                  bg-modura-white
                  opacity-0
                  shadow-xl
                  transition-all duration-300
                  group-hover/services:visible
                  group-hover/services:translate-y-0
                  group-hover/services:opacity-100
                "
                            >
                                <div className="mx-auto max-w-[1440px] px-6 xl:px-10 2xl:px-12">
                                    {/* MEGA MENU HEADER */}

                                    <div
                                        className="
                      flex h-[62px]
                      items-center
                      justify-between
                      border-b border-modura-gray-200
                    "
                                    >
                                        <div className="flex items-center gap-4">
                                            <span
                                                className="
                          text-[11px]
                          font-bold
                          uppercase
                          tracking-[0.16em]
                          text-modura-primary
                        "
                                            >
                                                Our Expertise
                                            </span>

                                            <span className="h-px w-10 bg-modura-secondary" />

                                            <span
                                                className="
                          text-[12px]
                          text-modura-gray-500
                        "
                                            >
                                                Architecture, engineering, BIM and construction
                                                documentation services.
                                            </span>
                                        </div>

                                        <Link
                                            href="/services"
                                            className="
                        group/all
                        flex items-center gap-2
                        text-[11px]
                        font-semibold
                        uppercase
                        tracking-[0.08em]
                        text-modura-primary
                      "
                                        >
                                            All Services
                                            <FiArrowUpRight
                                                className="
                          text-[15px]
                          transition-transform duration-300
                          group-hover/all:translate-x-0.5
                          group-hover/all:-translate-y-0.5
                        "
                                            />
                                        </Link>
                                    </div>

                                    {/* SERVICE CONTENT */}

                                    <div
                                        className="
                      grid
                      min-h-[500px]
                      grid-cols-[330px_1fr_280px]
                    "
                                    >
                                        {/* CATEGORY */}

                                        <div
                                            className="
                        border-r border-modura-gray-200
                        py-4
                      "
                                        >
                                            <div
                                                className="
                          mb-3 px-5
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-[0.16em]
                          text-modura-gray-400
                        "
                                            >
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
                                                        className={`
                              group/category
                              flex min-h-[30px]
                              w-full
                              items-center
                              justify-between
                              border-b border-modura-gray-100
                              px-5
                              text-left
                              transition-all duration-200

                              ${active
                                                                ? "bg-modura-primary text-modura-white"
                                                                : "bg-modura-white text-modura-gray-700 hover:bg-modura-off-white hover:text-modura-primary"
                                                            }
                            `}
                                                    >
                                                        <span
                                                            className="
                                text-[12px]
                                font-medium
                              "
                                                        >
                                                            {category.title}
                                                        </span>

                                                        <FiChevronRight
                                                            className={`
                                text-[13px]
                                transition-all duration-200

                                ${active
                                                                    ? "translate-x-0 opacity-100"
                                                                    : "-translate-x-1 opacity-0 group-hover/category:translate-x-0 group-hover/category:opacity-100"
                                                                }
                              `}
                                                        />
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {/* SUB SERVICES */}

                                        <div
                                            className="
                        relative
                        overflow-hidden
                        p-8
                      "
                                        >
                                            {/* TECHNICAL BACKGROUND */}

                                            <div
                                                className="
                          pointer-events-none
                          absolute
                          right-0 top-0
                          h-full w-[180px]
                          border-l border-modura-gray-100
                        "
                                            >
                                                <span
                                                    className="
                            absolute
                            left-1/3 top-0
                            h-full w-px
                            bg-modura-gray-100
                          "
                                                />

                                                <span
                                                    className="
                            absolute
                            left-2/3 top-0
                            h-full w-px
                            bg-modura-gray-100
                          "
                                                />

                                                <span
                                                    className="
                            absolute
                            left-0 top-1/3
                            h-px w-full
                            bg-modura-gray-100
                          "
                                                />

                                                <span
                                                    className="
                            absolute
                            left-0 top-2/3
                            h-px w-full
                            bg-modura-gray-100
                          "
                                                />
                                            </div>

                                            <div className="relative z-10">
                                                <div
                                                    className="
                            mb-7
                            flex items-start
                            justify-between
                            border-b border-modura-gray-200
                            pb-6
                          "
                                                >
                                                    <div>
                                                        <span
                                                            className="
                                mb-2 block
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-[0.16em]
                                text-modura-secondary
                              "
                                                        >
                                                            Service Category
                                                        </span>

                                                        <h3
                                                            className="
                                mb-2
                                text-[25px]
                                font-semibold
                                tracking-[-0.02em]
                                text-modura-primary
                              "
                                                        >
                                                            {selectedService.title}
                                                        </h3>

                                                        <p
                                                            className="
                                max-w-[560px]
                                text-[12px]
                                leading-6
                                text-modura-gray-500
                              "
                                                        >
                                                            {selectedService.description}
                                                        </p>
                                                    </div>

                                                    <Link
                                                        href={selectedService.href}
                                                        className="
                              group
                              flex h-11 w-11
                              shrink-0
                              items-center justify-center
                              border border-modura-gray-200
                              text-modura-primary
                              hover:border-modura-primary
                              hover:bg-modura-primary
                              hover:text-modura-white
                            "
                                                    >
                                                        <FiArrowUpRight
                                                            className="
                                transition-transform duration-300
                                group-hover:rotate-45
                              "
                                                        />
                                                    </Link>
                                                </div>

                                                <span
                                                    className="
                            mb-3 block
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-[0.16em]
                            text-modura-gray-400
                          "
                                                >
                                                    Explore Services
                                                </span>

                                                <div className="grid grid-cols-2 gap-x-8">
                                                    {selectedService.services.map((service) => (
                                                        <Link
                                                            key={service.title}
                                                            href={service.href}
                                                            className="
                                group/sub
                                flex min-h-[56px]
                                items-center
                                justify-between
                                border-b border-modura-gray-200
                              "
                                                        >
                                                            <span
                                                                className="
                                  text-[13px]
                                  font-medium
                                  text-modura-gray-700
                                  group-hover/sub:text-modura-primary
                                "
                                                            >
                                                                {service.title}
                                                            </span>

                                                            <FiArrowUpRight
                                                                className="
                                  -translate-x-1
                                  translate-y-1
                                  text-[15px]
                                  text-modura-primary
                                  opacity-0
                                  transition-all duration-300
                                  group-hover/sub:translate-x-0
                                  group-hover/sub:translate-y-0
                                  group-hover/sub:opacity-100
                                "
                                                            />
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* RIGHT BRAND PANEL */}

                                        <div
                                            className="
                        relative
                        overflow-hidden
                        bg-modura-primary
                        p-7
                        text-modura-white
                      "
                                        >
                                            <span
                                                className="
                          absolute
                          -right-16 -top-16
                          h-40 w-40
                          rotate-45
                          border border-modura-secondary
                        "
                                            />

                                            <span
                                                className="
                          absolute
                          -right-5 top-8
                          h-20 w-20
                          rotate-45
                          border border-modura-secondary-dark
                        "
                                            />

                                            <span
                                                className="
                          absolute
                          bottom-12 left-0
                          h-px w-full
                          bg-modura-secondary-dark
                        "
                                            />

                                            <div
                                                className="
                          relative z-10
                          flex h-full
                          flex-col
                          justify-between
                        "
                                            >
                                                <div>
                                                    <span
                                                        className="
                              mb-6 block
                              text-[10px]
                              font-bold
                              uppercase
                              tracking-[0.18em]
                              text-modura-gray-300
                            "
                                                    >
                                                        Modura Design Group
                                                    </span>

                                                    <h3
                                                        className="
                              mb-4
                              text-[26px]
                              font-semibold
                              leading-[1.25]
                              text-modura-white
                            "
                                                    >
                                                        Design.
                                                        <br />
                                                        Coordinate.
                                                        <br />
                                                        Deliver.
                                                    </h3>

                                                    <p
                                                        className="
                              text-[12px]
                              leading-6
                              text-modura-gray-300
                            "
                                                    >
                                                        Integrated architecture, engineering and BIM
                                                        expertise for coordinated project delivery.
                                                    </p>
                                                </div>

                                                <Link
                                                    href="/inquiry"
                                                    className="
                            group
                            flex items-center
                            justify-between
                            border-t border-modura-secondary-dark
                            pt-5
                          "
                                                >
                                                    <div>
                                                        <span
                                                            className="
                                block
                                text-[9px]
                                uppercase
                                tracking-[0.14em]
                                text-modura-gray-300
                              "
                                                        >
                                                            Have a project?
                                                        </span>

                                                        <span
                                                            className="
                                mt-1 block
                                text-[13px]
                                font-semibold
                                text-modura-white
                              "
                                                        >
                                                            Talk to Our Team
                                                        </span>
                                                    </div>

                                                    <span
                                                        className="
                              flex h-10 w-10
                              items-center justify-center
                              border border-modura-secondary
                              transition-all duration-300
                              group-hover:bg-modura-white
                              group-hover:text-modura-primary
                            "
                                                    >
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

                            <div
                                className="
                  invisible
                  absolute
                  left-1/2 top-full
                  w-[560px]
                  -translate-x-1/2
                  translate-y-3
                  border-t-2 border-modura-primary
                  bg-modura-white
                  p-3
                  opacity-0
                  shadow-xl
                  transition-all duration-300
                  group-hover/software:visible
                  group-hover/software:translate-y-0
                  group-hover/software:opacity-100
                "
                            >
                                <div
                                    className="
                    flex items-center
                    justify-between
                    border-b border-modura-gray-200
                    px-3 pb-3 pt-1
                  "
                                >
                                    <span
                                        className="
                      text-[11px]
                      font-bold
                      uppercase
                      tracking-[0.14em]
                      text-modura-primary
                    "
                                    >
                                        Software Expertise
                                    </span>

                                    <Link
                                        href="/software-expertise"
                                        className="
                      flex items-center gap-2
                      text-[10px]
                      font-semibold
                      text-modura-primary
                    "
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
                                                className="
                          group/software-item
                          flex items-center gap-3
                          border-b border-r border-modura-gray-200
                          p-4
                          even:border-r-0
                          hover:bg-modura-off-white
                        "
                                            >
                                                <span
                                                    className="
                            flex h-10 w-10
                            shrink-0
                            items-center justify-center
                            border border-modura-gray-200
                            text-[19px]
                            text-modura-primary
                            group-hover/software-item:border-modura-primary
                            group-hover/software-item:bg-modura-primary
                            group-hover/software-item:text-modura-white
                          "
                                                >
                                                    <Icon />
                                                </span>

                                                <div>
                                                    <span
                                                        className="
                              block
                              text-[13px]
                              font-semibold
                              text-modura-primary
                            "
                                                    >
                                                        {software.title}
                                                    </span>

                                                    <span
                                                        className="
                              mt-0.5 block
                              text-[10px]
                              text-modura-gray-500
                            "
                                                    >
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
================================================== */}

                        <div className="group/portfolio relative h-full">
                            <DesktopDropdownTrigger title="Portfolio" />

                            <div
                                className="
            invisible
            absolute
            right-0
            top-full
            w-[760px]
            translate-y-3
            opacity-0
            transition-all
            duration-300
            group-hover/portfolio:visible
            group-hover/portfolio:translate-y-0
            group-hover/portfolio:opacity-100
        "
                            >
                                {/* =========================================
            TOP ACCENT
        ========================================== */}

                                <div className="relative h-[5px] bg-modura-primary">
                                    <span className="absolute right-0 top-0 h-full w-[150px] bg-modura-secondary" />
                                </div>

                                {/* =========================================
            MAIN DROPDOWN
        ========================================== */}

                                <div
                                    className="
                overflow-hidden
                border-x
                border-b
                border-modura-gray-200
                bg-modura-white
                shadow-xl
            "
                                >
                                    {/* =====================================
                HEADER
            ====================================== */}

                                    <div
                                        className="
                    relative
                    flex
                    items-center
                    justify-between
                    overflow-hidden
                    border-b
                    border-modura-gray-200
                    px-7
                    py-5
                "
                                    >
                                        <div>
                                            <span
                                                className="
                            text-[9px]
                            font-bold
                            uppercase
                            tracking-[0.2em]
                            text-modura-secondary
                        "
                                            >
                                                Our Work
                                            </span>

                                            <h3
                                                className="
                            mt-1
                            text-[21px]
                            font-semibold
                            tracking-[-0.02em]
                            text-modura-primary
                        "
                                            >
                                                Explore Our Project Portfolio
                                            </h3>
                                        </div>

                                        <Link
                                            href="/portfolio"
                                            className="
                        group/view-portfolio
                        flex
                        items-center
                        gap-3
                        text-[11px]
                        font-semibold
                        text-modura-primary
                    "
                                        >
                                            View Complete Portfolio
                                            <span
                                                className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            border
                            border-modura-gray-200
                            transition-all
                            duration-300
                            group-hover/view-portfolio:border-modura-primary
                            group-hover/view-portfolio:bg-modura-primary
                            group-hover/view-portfolio:text-modura-white
                        "
                                            >
                                                <FiArrowUpRight
                                                    className="
                                text-[15px]
                                transition-transform
                                duration-300
                                group-hover/view-portfolio:translate-x-[2px]
                                group-hover/view-portfolio:-translate-y-[2px]
                            "
                                                />
                                            </span>
                                        </Link>
                                    </div>

                                    {/* =====================================
                PORTFOLIO GRID
            ====================================== */}

                                    <div className="grid grid-cols-3">
                                        {portfolioLinks.map((item) => (
                                            <Link
                                                key={item.title}
                                                href={item.href}
                                                className="
                            group/portfolio-item
                            relative
                            flex
                            min-h-[92px]
                            items-center
                            overflow-hidden
                            border-b
                            border-r
                            border-modura-gray-200
                            px-5
                            transition-colors
                            duration-300
                            hover:bg-modura-off-white
                            [&:nth-child(3n)]:border-r-0
                        "
                                            >
                                                {/* LEFT ARCHITECTURAL MARK */}

                                                <span
                                                    className="
                                relative
                                mr-4
                                h-[28px]
                                w-[18px]
                                shrink-0
                            "
                                                >
                                                    <span
                                                        className="
                                    absolute
                                    bottom-0
                                    left-0
                                    h-full
                                    w-px
                                    bg-modura-gray-300
                                    transition-all
                                    duration-300
                                    group-hover/portfolio-item:bg-modura-secondary
                                "
                                                    />

                                                    <span
                                                        className="
                                    absolute
                                    bottom-0
                                    left-0
                                    h-px
                                    w-[12px]
                                    bg-modura-gray-300
                                    transition-all
                                    duration-300
                                    group-hover/portfolio-item:w-[18px]
                                    group-hover/portfolio-item:bg-modura-secondary
                                "
                                                    />

                                                    <span
                                                        className="
                                    absolute
                                    left-[6px]
                                    top-[7px]
                                    h-[21px]
                                    w-px
                                    bg-modura-gray-200
                                    transition-all
                                    duration-300
                                    group-hover/portfolio-item:h-[15px]
                                    group-hover/portfolio-item:bg-modura-secondary-light
                                "
                                                    />

                                                    <span
                                                        className="
                                    absolute
                                    left-[12px]
                                    top-[13px]
                                    h-[15px]
                                    w-px
                                    bg-modura-gray-200
                                    transition-all
                                    duration-300
                                    group-hover/portfolio-item:h-[9px]
                                    group-hover/portfolio-item:bg-modura-secondary-light
                                "
                                                    />
                                                </span>

                                                {/* TITLE */}

                                                <span
                                                    className="
                                relative
                                z-10
                                flex-1
                                text-[12px]
                                font-semibold
                                leading-[1.5]
                                text-modura-gray-700
                                transition-colors
                                duration-300
                                group-hover/portfolio-item:text-modura-primary
                            "
                                                >
                                                    {item.title}
                                                </span>

                                                {/* ARROW */}

                                                <FiArrowUpRight
                                                    className="
                                absolute
                                right-4
                                top-4
                                -translate-x-1
                                translate-y-1
                                text-[15px]
                                text-modura-primary
                                opacity-0
                                transition-all
                                duration-300
                                group-hover/portfolio-item:translate-x-0
                                group-hover/portfolio-item:translate-y-0
                                group-hover/portfolio-item:opacity-100
                            "
                                                />

                                                {/* HOVER LINE */}

                                                <span
                                                    className="
                                absolute
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

                                    {/* =====================================
                BOTTOM FEATURE STRIP
            ====================================== */}

                                    <div
                                        className="
                    relative
                    flex
                    min-h-[82px]
                    items-center
                    justify-between
                    overflow-hidden
                    bg-modura-primary
                    px-7
                "
                                    >
                                        {/* subtle structural drawing */}

                                        <div className="pointer-events-none absolute inset-y-0 right-0 w-[280px]">
                                            <span
                                                className="
                            absolute
                            bottom-0
                            right-[45px]
                            h-[65px]
                            w-px
                            bg-modura-secondary-dark
                        "
                                            />

                                            <span
                                                className="
                            absolute
                            bottom-0
                            right-[90px]
                            h-[42px]
                            w-px
                            bg-modura-secondary-dark
                        "
                                            />

                                            <span
                                                className="
                            absolute
                            bottom-[22px]
                            right-0
                            h-px
                            w-[150px]
                            bg-modura-secondary-dark
                        "
                                            />

                                            <span
                                                className="
                            absolute
                            bottom-[43px]
                            right-0
                            h-px
                            w-[105px]
                            bg-modura-secondary-dark
                        "
                                            />
                                        </div>

                                        {/* LEFT */}

                                        <div className="relative z-10 flex items-center gap-5">
                                            <span className="h-[34px] w-[3px] bg-modura-secondary" />

                                            <div>
                                                <span
                                                    className="
                                block
                                text-[9px]
                                font-bold
                                uppercase
                                tracking-[0.18em]
                                text-modura-gray-300
                            "
                                                >
                                                    Design Documentation
                                                </span>

                                                <span
                                                    className="
                                mt-1
                                block
                                text-[14px]
                                font-semibold
                                text-modura-white
                            "
                                                >
                                                    From concept to construction-ready detail.
                                                </span>
                                            </div>
                                        </div>

                                        {/* RIGHT */}

                                        <Link
                                            href="/inquiry"
                                            className="
                        group/portfolio-talk
                        relative
                        z-10
                        flex
                        items-center
                        gap-4
                        text-[11px]
                        font-semibold
                        text-modura-white
                    "
                                        >
                                            Discuss Your Project
                                            <span
                                                className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            border
                            border-modura-secondary-dark
                            transition-all
                            duration-300
                            group-hover/portfolio-talk:border-modura-secondary
                            group-hover/portfolio-talk:bg-modura-secondary
                        "
                                            >
                                                <FiArrowUpRight
                                                    className="
                                text-[16px]
                                transition-transform
                                duration-300
                                group-hover/portfolio-talk:translate-x-[2px]
                                group-hover/portfolio-talk:-translate-y-[2px]
                            "
                                                />
                                            </span>
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
                            href="/get-a-quote"
                            className="
                group
                relative
                hidden h-[52px]
                items-center
                overflow-hidden
                border border-modura-primary
                bg-modura-white
                pl-5 pr-[62px]
                text-modura-primary
                xl:flex
              "
                        >
                            {/* NAVY FILL */}

                            <span
                                className="
                  absolute
                  inset-y-0 left-0
                  w-0
                  bg-modura-primary
                  transition-all duration-500
                  group-hover:w-full
                "
                            />

                            {/* TOP ARCHITECTURAL LINE */}

                            <span
                                className="
                  absolute
                  left-0 top-0
                  z-10
                  h-[3px] w-8
                  bg-modura-secondary
                  transition-all duration-500
                  group-hover:w-full
                "
                            />

                            {/* TECHNICAL MARK */}

                            <span
                                className="
                  relative z-10
                  mr-3
                  flex items-center gap-1.5
                "
                            >
                                <span
                                    className="
                    h-[5px] w-[5px]
                    rotate-45
                    bg-modura-secondary
                    transition-colors duration-300
                    group-hover:bg-modura-white
                  "
                                />

                                {/* <span
                                    className="
                    h-px w-4
                    bg-modura-secondary
                    transition-colors duration-300
                    group-hover:bg-modura-white
                  "
                                /> */}
                            </span>

                            <span
                                className="
                  relative z-10
                  whitespace-nowrap
                  text-[12px]
                  font-bold
                  uppercase
                  tracking-[0.08em]
                  transition-colors duration-300
                  group-hover:text-modura-white
                "
                            >
                                Get a Quote
                            </span>

                            {/* ARROW */}

                            <span
                                className="
                  absolute
                  right-0 top-0
                  z-10
                  flex h-full w-[48px]
                  items-center justify-center
                  bg-modura-primary
                  text-modura-white
                  transition-colors duration-300
                  group-hover:bg-modura-secondary
                "
                            >
                                <FiArrowUpRight
                                    className="
                    text-[18px]
                    transition-transform duration-300
                    group-hover:rotate-45
                  "
                                />
                            </span>
                        </Link>

                        {/* MOBILE BUTTON */}

                        <button
                            type="button"
                            aria-label="Toggle navigation"
                            aria-expanded={mobileMenu}
                            onClick={() => setMobileMenu(!mobileMenu)}
                            className="
                flex h-11 w-11
                items-center justify-center
                border border-modura-gray-200
                bg-modura-white
                text-[21px]
                text-modura-primary
                hover:bg-modura-light
                lg:hidden
              "
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
                className={`
          overflow-y-auto
          bg-modura-white
          transition-all duration-500
          lg:hidden

          ${mobileMenu
                        ? "max-h-[calc(100vh-92px)] border-t border-modura-gray-200 opacity-100"
                        : "max-h-0 opacity-0"
                    }
        `}
            >
                <div className="px-5 pb-6 md:px-8">
                    <MobileSimpleLink
                        title="Home"
                        href="/"
                        close={() => setMobileMenu(false)}
                    />

                    {/* COMPANY MOBILE */}

                    <MobileSectionButton
                        title="Company"
                        open={mobileSection === "company"}
                        onClick={() => toggleMobileSection("company")}
                    />

                    <div
                        className={`
              overflow-hidden
              bg-modura-off-white
              transition-all duration-300

              ${mobileSection === "company" ? "max-h-[500px]" : "max-h-0"}
            `}
                    >
                        {companyLinks.map((item) => (
                            <Link
                                key={item.title}
                                href={item.href}
                                onClick={() => setMobileMenu(false)}
                                className="
                  flex min-h-[46px]
                  items-center
                  border-b border-modura-gray-200
                  px-4
                  text-[13px]
                  font-medium
                  text-modura-gray-700
                "
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>

                    {/* SERVICES MOBILE */}

                    <MobileSectionButton
                        title="Services"
                        open={mobileSection === "services"}
                        onClick={() => toggleMobileSection("services")}
                    />

                    <div
                        className={`
              overflow-hidden
              bg-modura-off-white
              transition-all duration-500

              ${mobileSection === "services" ? "max-h-[2200px]" : "max-h-0"}
            `}
                    >
                        {serviceCategories.map((category, index) => {
                            const open = mobileServiceCategory === index;

                            return (
                                <div
                                    key={category.title}
                                    className="border-b border-modura-gray-200"
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setMobileServiceCategory(open ? null : index)
                                        }
                                        className="
                      flex min-h-[48px]
                      w-full
                      items-center
                      justify-between
                      px-4
                      text-left
                    "
                                    >
                                        <span
                                            className="
                        text-[13px]
                        font-semibold
                        text-modura-primary
                      "
                                        >
                                            {category.title}
                                        </span>

                                        <FiChevronDown
                                            className={`
                        text-[14px]
                        transition-transform duration-300

                        ${open ? "rotate-180" : ""}
                      `}
                                        />
                                    </button>

                                    <div
                                        className={`
                      overflow-hidden
                      bg-modura-white
                      transition-all duration-300

                      ${open ? "max-h-[500px]" : "max-h-0"}
                    `}
                                    >
                                        <Link
                                            href={category.href}
                                            onClick={() => setMobileMenu(false)}
                                            className="
                        flex min-h-[44px]
                        items-center
                        justify-between
                        border-b border-modura-gray-100
                        px-6
                        text-[11px]
                        font-bold
                        uppercase
                        tracking-[0.06em]
                        text-modura-primary
                      "
                                        >
                                            View Category
                                            <FiArrowUpRight />
                                        </Link>

                                        {category.services.map((service) => (
                                            <Link
                                                key={service.title}
                                                href={service.href}
                                                onClick={() => setMobileMenu(false)}
                                                className="
                          flex min-h-[44px]
                          items-center gap-3
                          border-b border-modura-gray-100
                          px-6
                          text-[12px]
                          text-modura-gray-600
                        "
                                            >
                                                <span className="h-px w-3 bg-modura-secondary" />

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
                        open={mobileSection === "software"}
                        onClick={() => toggleMobileSection("software")}
                    />

                    <div
                        className={`
              overflow-hidden
              bg-modura-off-white
              transition-all duration-300

              ${mobileSection === "software" ? "max-h-[500px]" : "max-h-0"}
            `}
                    >
                        {softwareLinks.map((software) => {
                            const Icon = software.icon;

                            return (
                                <Link
                                    key={software.title}
                                    href={software.href}
                                    onClick={() => setMobileMenu(false)}
                                    className="
                    flex items-center gap-3
                    border-b border-modura-gray-200
                    px-4 py-3
                  "
                                >
                                    <Icon className="text-[19px] text-modura-primary" />

                                    <div>
                                        <span
                                            className="
                        block
                        text-[13px]
                        font-semibold
                        text-modura-primary
                      "
                                        >
                                            {software.title}
                                        </span>

                                        <span
                                            className="
                        block
                        text-[10px]
                        text-modura-gray-500
                      "
                                        >
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
                        open={mobileSection === "portfolio"}
                        onClick={() => toggleMobileSection("portfolio")}
                    />

                    <div
                        className={`
              overflow-hidden
              bg-modura-off-white
              transition-all duration-300

              ${mobileSection === "portfolio" ? "max-h-[700px]" : "max-h-0"}
            `}
                    >
                        {portfolioLinks.map((item) => (
                            <Link
                                key={item.title}
                                href={item.href}
                                onClick={() => setMobileMenu(false)}
                                className="
                  flex min-h-[46px]
                  items-center
                  border-b border-modura-gray-200
                  px-4
                  text-[12px]
                  font-medium
                  text-modura-gray-700
                "
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>

                    <MobileSimpleLink
                        title="Career"
                        href="/career"
                        close={() => setMobileMenu(false)}
                    />

                    <MobileSimpleLink
                        title="Inquiry"
                        href="/inquiry"
                        close={() => setMobileMenu(false)}
                    />

                    {/* MOBILE CTA */}

                    <Link
                        href="/get-a-quote"
                        onClick={() => setMobileMenu(false)}
                        className="
              mt-5
              flex h-[52px]
              items-center
              justify-between
              bg-modura-primary
              px-5
              text-[12px]
              font-bold
              uppercase
              tracking-[0.08em]
              text-modura-white
            "
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
            className="
        group
        relative
        flex h-full
        items-center
        px-3
        text-[13px]
        font-semibold
        tracking-[0.01em]
        text-modura-gray-800
        hover:text-modura-primary
        xl:px-4
      "
        >
            {title}

            <span
                className="
          absolute
          bottom-[22px]
          left-4
          h-[2px] w-0
          bg-modura-primary
          transition-all duration-300
          group-hover:w-[18px]
        "
            />

            <span
                className="
          absolute
          bottom-[21px]
          left-[38px]
          h-1 w-1
          scale-0
          rotate-45
          bg-modura-secondary
          transition-all duration-300
          group-hover:scale-100
        "
            />
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
            className="
        group/trigger
        relative
        flex h-full
        items-center gap-2
        bg-modura-white
        px-3
        text-[15px]
        font-semibold
        tracking-[0.01em]
        text-modura-gray-800
        hover:text-modura-primary
        xl:px-4
      "
        >
            {title}

            <span
                className="
          flex h-[17px] w-[17px]
          items-center justify-center
          border border-modura-gray-300
          text-modura-gray-600
          transition-all duration-300
          group-hover/trigger:border-modura-primary
          group-hover/trigger:bg-modura-primary
          group-hover/trigger:text-modura-white
        "
            >
                <FiChevronDown
                    className="
            text-[9px]
            transition-transform duration-300
            group-hover/trigger:rotate-180
          "
                />
            </span>

            <span
                className="
          absolute
          bottom-[22px]
          left-4
          h-[2px] w-0
          bg-modura-primary
          transition-all duration-300
          group-hover/trigger:w-[18px]
        "
            />

            <span
                className="
          absolute
          bottom-[21px]
          left-[38px]
          h-1 w-1
          scale-0
          rotate-45
          bg-modura-secondary
          transition-all duration-300
          group-hover/trigger:scale-100
        "
            />
        </button>
    );
}

/* =========================================================
   MOBILE LINK
========================================================= */

function MobileSimpleLink({
    title,
    href,
    close,
}: {
    title: string;
    href: string;
    close: () => void;
}) {
    return (
        <Link
            href={href}
            onClick={close}
            className="
        flex min-h-[56px]
        items-center
        border-b border-modura-gray-200
        text-[14px]
        font-semibold
        text-modura-primary
      "
        >
            {title}
        </Link>
    );
}

/* =========================================================
   MOBILE SECTION
========================================================= */

function MobileSectionButton({
    title,
    open,
    onClick,
}: {
    title: string;
    open: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="
        flex min-h-[56px]
        w-full
        items-center
        justify-between
        border-b border-modura-gray-200
        bg-modura-white
        text-left
        text-[14px]
        font-semibold
        text-modura-primary
      "
        >
            {title}

            <FiChevronDown
                className={`
          text-[15px]
          transition-transform duration-300
          ${open ? "rotate-180" : ""}
        `}
            />
        </button>
    );
}
