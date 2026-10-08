'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import {
    FiArrowLeft,
    FiArrowRight,
    FiArrowUpRight,
    FiX,
    FiMaximize2,
    FiFileText,
} from 'react-icons/fi';

import Breadcrumb from '../components/Breadcrumb';
import breadcrumb from '@/app/assets/images/breadcrumb.jpg';

/* =========================================================
   3D / SITE VIEW IMAGES
========================================================= */

import site1 from '@/app/assets/images/about-1.jpg';
import site2 from '@/app/assets/images/about-2.jpg';
import site3 from '@/app/assets/images/about-3.jpg';
import site4 from '@/app/assets/images/about-1.jpg';
import site5 from '@/app/assets/images/about-2.jpg';
import site6 from '@/app/assets/images/about-3.jpg';

/* =========================================================
   2D DRAWING IMAGES

   Replace these imports with your actual 2D drawing images.
========================================================= */

import drawing1 from '@/app/assets/images/about-1.jpg';
import drawing2 from '@/app/assets/images/about-2.jpg';
import drawing3 from '@/app/assets/images/about-3.jpg';
import drawing4 from '@/app/assets/images/about-1.jpg';
import drawing5 from '@/app/assets/images/about-2.jpg';
import drawing6 from '@/app/assets/images/about-3.jpg';


/* =========================================================
   TYPES
========================================================= */

type PortfolioItem = {
    title: string;
    image: string;
};


/* =========================================================
   3D / SITE VIEW DATA
========================================================= */

const siteViewSamples: PortfolioItem[] = [
    {
        title: 'Commercial Building — Site View',
        image: site1.src,
    },
    {
        title: 'Modern Architectural Development',
        image: site2.src,
    },
    {
        title: 'Infrastructure Development',
        image: site3.src,
    },
    {
        title: 'Industrial Facility — 3D View',
        image: site4.src,
    },
    {
        title: 'Structural Steel Development',
        image: site5.src,
    },
    {
        title: 'Residential Development — 3D View',
        image: site6.src,
    },
];


/* =========================================================
   2D DRAWING DATA
========================================================= */

const drawingSamples: PortfolioItem[] = [
    {
        title: 'Structural 2D Drawing',
        image: drawing1.src,
    },
    {
        title: 'Architectural Floor Plan',
        image: drawing2.src,
    },
    {
        title: 'Steel Detailing Drawing',
        image: drawing3.src,
    },
    {
        title: 'Shop Drawing Documentation',
        image: drawing4.src,
    },
    {
        title: 'Construction Drawing',
        image: drawing5.src,
    },
    {
        title: 'Detailed Engineering Drawing',
        image: drawing6.src,
    },
];


/* =========================================================
   COMPONENT
========================================================= */

export default function Portfolio() {

    /* =====================================================
       ACTIVE TAB
    ===================================================== */

    const [activeTab, setActiveTab] = useState<'3d' | '2d'>('3d');


    /* =====================================================
       POPUP
    ===================================================== */

    const [selectedIndex, setSelectedIndex] = useState<number | null>(
        null,
    );


    /* =====================================================
       CURRENT DATA
    ===================================================== */

    const currentItems =
        activeTab === '3d'
            ? siteViewSamples
            : drawingSamples;


    /* =====================================================
       OPEN POPUP
    ===================================================== */

    const openPopup = (index: number) => {
        setSelectedIndex(index);
        document.body.style.overflow = 'hidden';
    };


    /* =====================================================
       CLOSE POPUP
    ===================================================== */

    const closePopup = () => {
        setSelectedIndex(null);
        document.body.style.overflow = '';
    };


    /* =====================================================
       PREVIOUS
    ===================================================== */

    const previousItem = () => {

        if (selectedIndex === null) return;

        setSelectedIndex(
            selectedIndex === 0
                ? currentItems.length - 1
                : selectedIndex - 1,
        );
    };


    /* =====================================================
       NEXT
    ===================================================== */

    const nextItem = () => {

        if (selectedIndex === null) return;

        setSelectedIndex(
            selectedIndex === currentItems.length - 1
                ? 0
                : selectedIndex + 1,
        );
    };

    /* =====================================================
        POPUP KEYBOARD CONTROLS
    ===================================================== */

    useEffect(() => {
        if (selectedIndex === null) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowLeft':
                    event.preventDefault();
                    previousItem();
                    break;

                case 'ArrowRight':
                    event.preventDefault();
                    nextItem();
                    break;

                case 'Escape':
                    event.preventDefault();
                    closePopup();
                    break;

                default:
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedIndex, currentItems.length]);


    return (
        <>

            {/* =================================================
                BREADCRUMB
            ================================================= */}

            <Breadcrumb
                title="Portfolio"
                image={breadcrumb.src}
            />


            {/* =================================================
                PORTFOLIO SECTION
            ================================================= */}

            <section
                className="
                    relative
                    overflow-hidden
                    bg-modura-white
                    py-12
                    md:py-14
                "
            >

                {/* =================================================
                    SUBTLE BLUEPRINT
                ================================================= */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        opacity-[0.035]
                    "
                    
                />


                <div
                    className="
                        relative
                        mx-auto
                        max-w-[1300px]
                        px-5

                        md:px-8
                    "
                >

                    {/* =================================================
                        HEADER
                    ================================================= */}

                    <div
                        className="
                            mb-10
                            flex
                            flex-col
                            gap-8

                            lg:flex-row
                            lg:items-end
                            lg:justify-between
                        "
                    >

                        <div>

                            {/* EYEBROW */}

                            <div
                                className="
                                    mb-4
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
                                    OUR WORK
                                </span>
                            </div>


                            {/* TITLE */}

                            <h2
                                className="
                                    text-[38px]
                                    leading-[0.95]
                                    font-bold
                                    tracking-[-0.03em]
                                    text-modura-primary

                                    md:text-[52px]
                                    
                                "
                            >
                                Steel Detailing Samples
                            </h2>


                        </div>


                        {/* =================================================
                            PROJECT COUNT
                        ================================================= */}

                            {/* <div
                                className="
                                    flex
                                    items-center
                                    gap-4
                                    border-l
                                    border-modura-gray-300
                                    pl-5
                                "
                            >

                                <span
                                    className="
                                        text-[30px]
                                        font-bold
                                        text-modura-primary
                                    "
                                >
                                    {currentItems.length}
                                </span>

                                <span
                                    className="
                                        max-w-[100px]
                                        text-[9px]
                                        font-bold
                                        leading-4
                                        tracking-[0.18em]
                                        text-modura-secondary
                                        uppercase
                                    "
                                >
                                    Selected
                                    <br />
                                    Projects
                                </span>

                            </div> */}

                    </div>


                    {/* =================================================
                        PORTFOLIO TABS
                    ================================================= */}

                    <div
                        className="
                            mb-12
                            flex
                            justify-center
                        "
                    >
                        <div
                            className="
                                relative
                                inline-flex
                                items-center
                                border
                                border-modura-gray-300
                                bg-modura-off-white
                                p-1
                            "
                        >

                            {/* =================================================
                                ACTIVE SLIDING BACKGROUND
                            ================================================= */}

                            <span
                                className={`
                                    absolute
                                    top-1
                                    bottom-1
                                    w-[calc(50%-5px)]
                                    bg-modura-primary
                                    transition-all
                                    duration-500
                                    ease-out

                                    ${
                                        activeTab === '3d'
                                            ? 'left-1'
                                            : 'left-[calc(50%+0px)]'
                                    }
                                `}
                            />


                            {/* =================================================
                                3D & SITE VIEW
                            ================================================= */}

                            <button
                                type="button"
                                onClick={() => {
                                    setActiveTab('3d');
                                    setSelectedIndex(null);
                                }}
                                className={`
                                    relative
                                    z-10
                                    min-w-[190px]
                                    px-7
                                    py-4
                                    text-center
                                    text-[13px]
                                    font-bold
                                    tracking-[0.16em]
                                    uppercase
                                    transition-colors
                                    duration-500

                                    md:min-w-[220px]

                                    ${
                                        activeTab === '3d'
                                            ? 'text-modura-white'
                                            : 'text-modura-primary hover:text-modura-secondary'
                                    }
                                `}
                            >
                                3D & Site View Samples
                            </button>


                            {/* =================================================
                                2D DRAWING
                            ================================================= */}

                            <button
                                type="button"
                                onClick={() => {
                                    setActiveTab('2d');
                                    setSelectedIndex(null);
                                }}
                                className={`
                                    relative
                                    z-10
                                    min-w-[190px]
                                    px-7
                                    py-4
                                    text-center
                                    text-[11px]
                                    font-bold
                                    tracking-[0.16em]
                                    uppercase
                                    transition-colors
                                    duration-500

                                    md:min-w-[220px]

                                    ${
                                        activeTab === '2d'
                                            ? 'text-modura-white'
                                            : 'text-modura-primary hover:text-modura-secondary'
                                    }
                                `}
                            >
                                2D Drawings Samples
                            </button>


                            {/* =================================================
                                SECONDARY ARCHITECTURAL ACCENT
                            ================================================= */}

                            <span
                                className={`
                                    absolute
                                    bottom-[-5px]
                                    z-20
                                    h-[3px]
                                    w-10
                                    bg-modura-secondary
                                    transition-all
                                    duration-500

                                    ${
                                        activeTab === '3d'
                                            ? 'left-[calc(25%-20px)]'
                                            : 'left-[calc(75%-20px)]'
                                    }
                                `}
                            />

                        </div>
                    </div>


                    {/* =================================================
                        GALLERY
                    ================================================= */}

                    <div
                        className="
                            grid
                            gap-x-7
                            gap-y-10

                            md:grid-cols-2
                            lg:grid-cols-3
                        "
                    >

                        {currentItems.map(
                            (item, index) => (
                                <article
                                    key={`${activeTab}-${index}`}
                                    className="
                                        group
                                        cursor-pointer
                                    "
                                    onClick={() =>
                                        openPopup(index)
                                    }
                                >

                                    {/* =================================================
                                        TITLE
                                    ================================================= */}

                                    <div
                                        className="
                                            mb-4
                                            flex
                                            items-center
                                            justify-between
                                            gap-4
                                        "
                                    >

                                        <div>

                                            <h3
                                                className="
                                                    text-[17px]
                                                    leading-6
                                                    font-bold
                                                    text-modura-primary
                                                    transition-colors
                                                    duration-300
                                                    group-hover:text-modura-secondary
                                                "
                                            >
                                                {item.title}
                                            </h3>

                                        </div>


                                        {/* OPEN ICON */}

                                        <span
                                            className="
                                                flex
                                                h-9
                                                w-9
                                                shrink-0
                                                items-center
                                                justify-center
                                                border
                                                border-modura-gray-300
                                                text-modura-primary
                                                transition-all
                                                duration-300

                                                group-hover:border-modura-primary
                                                group-hover:bg-modura-primary
                                                group-hover:text-modura-white
                                            "
                                        >
                                            <FiArrowUpRight
                                                size={15}
                                                className="
                                                    transition-transform
                                                    duration-300
                                                    group-hover:translate-x-[2px]
                                                    group-hover:-translate-y-[2px]
                                                "
                                            />
                                        </span>

                                    </div>


                                    {/* =================================================
                                        IMAGE
                                    ================================================= */}

                                    <div
                                        className="
                                            relative
                                            aspect-[4/3]
                                            overflow-hidden
                                            border
                                            border-modura-gray-200
                                            bg-modura-gray-100
                                        "
                                    >

                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            sizes="
                                                (max-width: 768px) 100vw,
                                                (max-width: 1200px) 50vw,
                                                33vw
                                            "
                                            className="
                                                object-cover
                                                transition-transform
                                                duration-700
                                                group-hover:scale-105
                                            "
                                        />


                                        {/* IMAGE OVERLAY */}

                                        <div
                                            className="
                                                absolute
                                                inset-0
                                                bg-modura-primary/0
                                                transition-all
                                                duration-500
                                                group-hover:bg-modura-primary/15
                                            "
                                        />


                                        {/* BOTTOM LINE */}

                                        <span
                                            className="
                                                absolute
                                                right-0
                                                bottom-0
                                                left-0
                                                h-[3px]
                                                w-0
                                                bg-modura-secondary
                                                transition-all
                                                duration-500
                                                group-hover:w-full
                                            "
                                        />

                                    </div>

                                </article>
                            ),
                        )}

                    </div>

                </div>

            </section>


            {/* =================================================
                IMAGE POPUP / LIGHTBOX
            ================================================= */}

            {selectedIndex !== null && (
                <div
                    className="
                        fixed
                        inset-0
                        z-[9999]
                        flex
                        items-center
                        justify-center
                        bg-modura-primary/95
                        p-4

                        md:p-8
                    "
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            closePopup();
                        }
                    }}
                >

                    {/* =================================================
                        CLOSE
                    ================================================= */}

                    <button
                        type="button"
                        onClick={closePopup}
                        aria-label="Close"
                        className="
                            absolute
                            top-5
                            right-5
                            z-30
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            border
                            border-modura-secondary-light/40
                            text-modura-white
                            transition-all
                            duration-300
                            hover:border-modura-secondary
                            hover:bg-modura-secondary

                            md:top-7
                            md:right-7
                        "
                    >
                        <FiX size={21} />
                    </button>


                    {/* =================================================
                        COUNTER
                    ================================================= */}

                    <div
                        className="
                            absolute
                            top-6
                            left-6
                            z-20
                            flex
                            items-center
                            gap-3
                        "
                    >

                        <span
                            className="
                                h-[2px]
                                w-8
                                bg-modura-secondary
                            "
                        />

                        <span
                            className="
                                text-[10px]
                                font-bold
                                tracking-[0.2em]
                                text-modura-gray-300
                            "
                        >
                            {String(selectedIndex + 1).padStart(2, '0')}
                            {' / '}
                            {String(currentItems.length).padStart(
                                2,
                                '0',
                            )}
                        </span>

                    </div>


                    {/* =================================================
                        PREVIOUS
                    ================================================= */}

                    <button
                        type="button"
                        onClick={previousItem}
                        aria-label="Previous image"
                        className="
                            absolute
                            left-3
                            top-1/2
                            z-30
                            flex
                            h-12
                            w-12
                            -translate-y-1/2
                            items-center
                            justify-center
                            border
                            border-modura-secondary-light/40
                            text-modura-white
                            transition-all
                            duration-300
                            hover:border-modura-secondary
                            hover:bg-modura-secondary

                            md:left-8
                        "
                    >
                        <FiArrowLeft size={20} />
                    </button>


                    {/* =================================================
                        NEXT
                    ================================================= */}

                    <button
                        type="button"
                        onClick={nextItem}
                        aria-label="Next image"
                        className="
                            absolute
                            right-3
                            top-1/2
                            z-30
                            flex
                            h-12
                            w-12
                            -translate-y-1/2
                            items-center
                            justify-center
                            border
                            border-modura-secondary-light/40
                            text-modura-white
                            transition-all
                            duration-300
                            hover:border-modura-secondary
                            hover:bg-modura-secondary

                            md:right-8
                        "
                    >
                        <FiArrowRight size={20} />
                    </button>


                    {/* =================================================
                        POPUP CONTENT
                    ================================================= */}

                    <div
                        className="
                            flex
                            max-h-[92vh]
                            w-full
                            max-w-[1200px]
                            flex-col
                            items-center
                        "
                    >

                        {/* IMAGE */}

                        <div
                            className="
                                relative
                                h-[55vh]
                                w-full

                                md:h-[68vh]
                            "
                        >

                            <Image
                                src={
                                    currentItems[selectedIndex]
                                        .image
                                }
                                alt={
                                    currentItems[selectedIndex]
                                        .title
                                }
                                fill
                                sizes="100vw"
                                className="
                                    object-contain
                                "
                            />

                        </div>


                        {/* =================================================
                            POPUP TITLE
                        ================================================= */}

                        <div
                            className="
                                mt-5
                                flex
                                w-full
                                flex-col
                                items-center
                                border-t
                                border-modura-secondary-light/20
                                pt-5
                                text-center
                            "
                        >

                            <h3
                                className="
                                    mt-2
                                    max-w-[800px]
                                    text-[20px]
                                    font-semibold
                                    text-modura-white

                                    md:text-[25px]
                                "
                            >
                                {
                                    currentItems[
                                        selectedIndex
                                    ].title
                                }
                            </h3>

                        </div>

                    </div>

                </div>
            )}

        </>
    );
}