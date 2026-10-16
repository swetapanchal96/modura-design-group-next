'use client';

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from 'next/image';
import Link from "next/link";
import { useParams } from 'next/navigation';
import api from '@/lib/admin/api';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import {
    FiArrowLeft,
    FiArrowRight,
    FiArrowUpRight,
    FiX,
    FiMaximize2,
    FiFileText,
} from 'react-icons/fi';

import Breadcrumb from '../../../../components/Breadcrumb';
import breadcrumb from '@/app/(website)/assets/images/breadcrumb.jpg';

/* =========================================================
   3D / SITE VIEW IMAGES
========================================================= */

import site1 from '@/app/(website)/assets/images/about-1.jpg';
import site2 from '@/app/(website)/assets/images/about-2.jpg';
import site3 from '@/app/(website)/assets/images/about-3.jpg';
import site4 from '@/app/(website)/assets/images/about-1.jpg';
import site5 from '@/app/(website)/assets/images/about-2.jpg';
import site6 from '@/app/(website)/assets/images/about-3.jpg';

/* =========================================================
   2D DRAWING IMAGES

   Replace these imports with your actual 2D drawing images.
========================================================= */

import drawing1 from '@/app/(website)/assets/images/about-1.jpg';
import drawing2 from '@/app/(website)/assets/images/about-2.jpg';
import drawing3 from '@/app/(website)/assets/images/about-3.jpg';
import drawing4 from '@/app/(website)/assets/images/about-1.jpg';
import drawing5 from '@/app/(website)/assets/images/about-2.jpg';
import drawing6 from '@/app/(website)/assets/images/about-3.jpg';


/* =========================================================
   TYPES
========================================================= */

type PortfolioImage = {
    id: number;
    image: string;
    imageUrl: string;
};

type PortfolioAlbum = {
    id: number;
    title: string;
    images: PortfolioImage[];
};

type ProjectAlbum = {
    id: string;
    title: string;
    description: string;
    images: string[];
};

type PortfolioItem = {
    id: number;
    title: string;
    slug: string;
    type: "2d" | "3d";
    imageType: "image" | "album";
    clientName: string | null;
    isFeatured: boolean;
    category: {
        id: number;
        name: string;
        slug: string;
    };
    images?: PortfolioImage[];
    albums?: PortfolioAlbum[];
    cover?: string;
    coverUrl?: string;
};

type PortfolioResponse = {
    success: boolean;
    message: string;
    data: {
        items: PortfolioItem[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    };
};





/* =========================================================
   COMPONENT
========================================================= */

export default function PortfolioClient() {

    const params = useParams();

    const categorySlug =
        typeof params?.slug === "string"
            ? params.slug
            : "";

    /* =====================================================
       ACTIVE TAB
    ===================================================== */

    const [activeTab, setActiveTab] = useState<'3d' | '2d'>('3d');
    const [portfolioItems, setPortfolioItems] = useState<
        PortfolioItem[]
    >([]);

    const [loading, setLoading] = useState(true);

    const [apiError, setApiError] = useState<string | null>(null);

    /* =====================================================
       POPUP
    ===================================================== */

    const [selectedIndex, setSelectedIndex] = useState<number | null>(
        null,
    );

    

    const [selectedAlbum, setSelectedAlbum] =
    useState<ProjectAlbum | null>(null);

    const [selectedAlbumImage, setSelectedAlbumImage] =
        useState(0);

    const albumPopupSwiperRef = useRef<SwiperType | null>(null);

    /* =====================================================
       CURRENT DATA
    ===================================================== */

    /* =====================================================
   CURRENT PROJECT DATA
===================================================== */

const projectImages = portfolioItems
    .filter(
        (item) =>
            item.imageType === "image" &&
            Array.isArray(item.images) &&
            item.images.length > 0
    )
    .flatMap((item) =>
        item.images!.map((image) => ({
            id: image.id,
            title: item.title,
            image: image.imageUrl,
        }))
    );

const projectAlbums: ProjectAlbum[] = (() => {
    const albumMap = new Map<
        string,
        ProjectAlbum
    >();

    portfolioItems
        .filter(
            (item) =>
                item.imageType === "album" &&
                Array.isArray(item.albums) &&
                item.albums.length > 0
        )
        .forEach((item) => {
            item.albums!.forEach((album) => {
                const title = album.title?.trim();

                if (!title) return;

                const key = title.toLowerCase();

                const images = album.images
                    .map((image) => image.imageUrl)
                    .filter(Boolean);

                if (albumMap.has(key)) {
                    const existingAlbum = albumMap.get(key)!;

                    existingAlbum.images = [
                        ...existingAlbum.images,
                        ...images.filter(
                            (image) =>
                                !existingAlbum.images.includes(image)
                        ),
                    ];
                } else {
                    albumMap.set(key, {
                        id: String(album.id),
                        title,
                        description: "",
                        images,
                    });
                }
            });
        });

    return Array.from(albumMap.values()).filter(
        (album) => album.images.length > 0
    );
})();




    const openAlbumPopup = (
        album: ProjectAlbum,
        imageIndex: number = 0,
    ) => {
        setSelectedAlbum(album);
        setSelectedAlbumImage(imageIndex);
        document.body.style.overflow = 'hidden';
    };

    const closeAlbumPopup = () => {
        setSelectedAlbum(null);
        setSelectedAlbumImage(0);
        document.body.style.overflow = '';
    };


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
                ? projectImages.length - 1
                : selectedIndex - 1,
        );
    };


    /* =====================================================
       NEXT
    ===================================================== */

    const nextItem = () => {

        if (selectedIndex === null) return;

        setSelectedIndex(
            selectedIndex === projectImages.length - 1
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
    }, [selectedIndex, projectImages.length]);


    /* =====================================================
   ALBUM POPUP KEYBOARD CONTROLS
===================================================== */

    useEffect(() => {
        if (!selectedAlbum) return;

        const handleAlbumKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case 'ArrowLeft':
                    event.preventDefault();
                    albumPopupSwiperRef.current?.slidePrev();
                    break;

                case 'ArrowRight':
                    event.preventDefault();
                    albumPopupSwiperRef.current?.slideNext();
                    break;

                case 'Escape':
                    event.preventDefault();
                    closeAlbumPopup();
                    break;

                case ' ':
                case 'Spacebar':
                    event.preventDefault();
                    closeAlbumPopup();
                    break;

                default:
                    break;
            }
        };

        document.addEventListener(
            'keydown',
            handleAlbumKeyDown,
        );

        return () => {
            document.removeEventListener(
                'keydown',
                handleAlbumKeyDown,
            );
        };
    }, [selectedAlbum]);


    useEffect(() => {
        if (!categorySlug) return;

        const fetchPortfolio = async () => {
            try {
                setLoading(true);
                setApiError(null);

                const response = await api.post<PortfolioResponse>(
                    "/portfolios",
                    {
                        category: categorySlug,
                        type: activeTab,
                    }
                );

                setPortfolioItems(
                    response.data?.data?.items ?? []
                );
            } catch (error) {
                console.error(
                    "Failed to load portfolio:",
                    error
                );

                setPortfolioItems([]);
                setApiError(
                    "Failed to load portfolio data."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchPortfolio();
    }, [categorySlug, activeTab]);

    

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

                                    ${activeTab === '3d'
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

                                    ${activeTab === '3d'
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

                                    ${activeTab === '2d'
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

                                    ${activeTab === '3d'
                                        ? 'left-[calc(25%-20px)]'
                                        : 'left-[calc(75%-20px)]'
                                    }
                                `}
                            />

                        </div>
                    </div>

                    {projectImages.length > 0 && (
                        <>
                            <div className="mb-10 mt-4">
                                <div className="mb-3 flex items-center gap-3">
                                    <span className="h-[2px] w-8 bg-modura-secondary" />

                                    <span className="
                                    text-[11px]
                                    font-bold
                                    tracking-[0.28em]
                                    text-modura-secondary
                                    uppercase
                                ">
                                        PROJECT IMAGES
                                    </span>
                                </div>

                                <h3 className="
                                    text-[30px]
                                    font-bold
                                    leading-tight
                                    tracking-[-0.025em]
                                    text-modura-primary
                                    md:text-[40px]
                                ">
                                    Explore Our Project Images
                                </h3>
                            </div>


                            <div
                                className="
                            grid
                            gap-x-7
                            gap-y-10

                            md:grid-cols-2
                            lg:grid-cols-3
                        "
                            >

                                {projectImages.map(
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
                        </>
                    )}

                    {/* =================================================
                        PROJECT ALBUMS HEADING
                    ================================================= */}

                    {projectAlbums.length > 0 && (
                        <>

                            <div className="mb-5 mt-20">
                                <div className="mb-3 flex items-center gap-3">

                                    <span
                                        className="
                                    text-[13px]
                                    font-bold
                                    tracking-[0.28em]
                                    text-modura-secondary
                                    uppercase
                                "
                                    >
                                        PROJECT ALBUMS
                                    </span>
                                </div>

                                <h3
                                    className="
                                text-[30px]
                                font-bold
                                leading-tight
                                tracking-[-0.025em]
                                text-modura-primary
                                md:text-[40px]
                            "
                                >
                                    Explore Our Project Albums
                                </h3>
                            </div>


                            <div
                                className="
                            grid
                            grid-cols-1
                            gap-x-8
                            gap-y-12
                            md:grid-cols-2
                        "
                            >
                                {projectAlbums.map((album) => (
                                    <article
                                        key={album.id}
                                        className="group"
                                    >
                                        {/* ALBUM IMAGE SLIDER */}

                                        <div
                                            className="
                                        relative
                                        overflow-hidden
                                        border
                                        border-modura-gray-200
                                        bg-modura-gray-100
                                    "
                                        >
                                            <Swiper
                                                modules={[
                                                    Autoplay,
                                                    Navigation,
                                                    Pagination,
                                                ]}
                                                slidesPerView={1}
                                                loop={album.images.length > 1}
                                                autoplay={{
                                                    delay: 5000,
                                                    disableOnInteraction: false,
                                                    pauseOnMouseEnter: true,
                                                }}
                                                navigation
                                                pagination={{
                                                    clickable: true,
                                                }}
                                                className="project-album-swiper"
                                            >
                                                {album.images.map(
                                                    (image, imageIndex) => (
                                                        <SwiperSlide
                                                            key={`${album.id}-${imageIndex}`}
                                                        >
                                                            <button
                                                                type="button"
                                                                className="
                                                                relative
                                                                block
                                                                aspect-[16/10]
                                                                w-full
                                                                cursor-pointer
                                                            "
                                                                onClick={() =>
                                                                    openAlbumPopup(
                                                                        album,
                                                                        imageIndex,
                                                                    )
                                                                }
                                                            >
                                                                <Image
                                                                    src={image}
                                                                    alt={`${album.title} - Image ${imageIndex + 1
                                                                        }`}
                                                                    fill
                                                                    sizes="
                                                                (max-width: 768px) 100vw,
                                                                50vw
                                                            "
                                                                    className="
                                                                object-contain
                                                                transition-transform
                                                                duration-700
                                                                group-hover:scale-105
                                                            "
                                                                />

                                                                {/* IMAGE OVERLAY */}

                                                                <span
                                                                    className="
                                                                absolute
                                                                inset-0
                                                                bg-modura-primary/0
                                                                transition-all
                                                                duration-300
                                                                group-hover:bg-modura-primary/15
                                                            "
                                                                />

                                                                {/* VIEW ICON */}

                                                                <span
                                                                    className="
                                                                    absolute
                                                                    right-5
                                                                    bottom-5
                                                                    flex
                                                                    h-11
                                                                    w-11
                                                                    items-center
                                                                    justify-center
                                                                    border
                                                                    border-white/60
                                                                    bg-modura-primary/80
                                                                    text-white
                                                                    opacity-0
                                                                    transition-all
                                                                    duration-300
                                                                    group-hover:opacity-100
                                                                "
                                                                >
                                                                    <FiMaximize2
                                                                        size={17}
                                                                    />
                                                                </span>
                                                            </button>
                                                        </SwiperSlide>
                                                    ),
                                                )}
                                            </Swiper>
                                        </div>

                                        {/* ALBUM DETAILS */}

                                        <div className="mt-5">
                                            <div
                                                className="
                                            mb-3
                                            flex
                                            items-center
                                            justify-between
                                            gap-4
                                        "
                                            >
                                                <h3
                                                    className="
                                                text-[19px]
                                                font-bold
                                                leading-6
                                                text-modura-primary
                                                transition-colors
                                                duration-300
                                                group-hover:text-modura-secondary
                                            "
                                                >
                                                    {album.title}
                                                </h3>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        openAlbumPopup(album, 0)
                                                    }
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
                                                hover:border-modura-primary
                                                hover:bg-modura-primary
                                                hover:text-modura-white
                                            "
                                                >
                                                    <FiArrowUpRight size={15} />
                                                </button>
                                            </div>



                                            <div
                                                className="
                                            mt-4
                                            h-[2px]
                                            w-0
                                            bg-modura-secondary
                                            transition-all
                                            duration-500
                                            group-hover:w-full
                                        "
                                            />
                                        </div>
                                    </article>
                                ))}
                            </div>

                        </>
                    )}
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
                            {String(projectImages.length).padStart(
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
                                    projectImages[selectedIndex]
                                        .image
                                }
                                alt={
                                    projectImages[selectedIndex]
                                        .title
                                }
                                fill
                                unoptimized
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
                                    projectImages[
                                        selectedIndex
                                    ].title
                                }
                            </h3>

                        </div>

                    </div>

                </div>
            )}

            {/* =================================================
                PROJECT ALBUM POPUP
            ================================================= */}

            {selectedAlbum && (
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
                        if (
                            event.target ===
                            event.currentTarget
                        ) {
                            closeAlbumPopup();
                        }
                    }}
                >
                    {/* CLOSE */}

                    <button
                        type="button"
                        onClick={closeAlbumPopup}
                        aria-label="Close"
                        className="
                            absolute
                            top-5
                            right-5
                            z-50
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

                    {/* ALBUM COUNTER */}

                    <div
                        className="
                                absolute
                                top-6
                                left-6
                                z-50
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
                            {selectedAlbumImage + 1}
                            {' / '}
                            {selectedAlbum.images.length}
                        </span>
                    </div>

                    {/* ALBUM SLIDER */}

                    <div
                        className="
                            flex
                            max-h-[92vh]
                            w-full
                            max-w-[1300px]
                            flex-col
                        "
                    >
                        <Swiper
                            modules={[
                                Navigation,
                                Pagination,
                            ]}
                            initialSlide={selectedAlbumImage}
                            slidesPerView={1}
                            navigation
                            pagination={{
                                clickable: true,
                            }}
                            onSwiper={(swiper) => {
                                albumPopupSwiperRef.current = swiper;
                            }}
                            onSlideChange={(swiper) => {
                                setSelectedAlbumImage(
                                    swiper.realIndex,
                                );
                            }}
                            className="album-popup-swiper"
                        >
                            {selectedAlbum.images.map(
                                (image, index) => (
                                    <SwiperSlide
                                        key={`${selectedAlbum.id}-popup-${index}`}
                                    >
                                        <div
                                            className="
                                    relative
                                    h-[55vh]
                                    w-full
                                    md:h-[70vh]
                                "
                                        >
                                            <Image
                                                src={image}
                                                alt={`${selectedAlbum.title} - Image ${index + 1
                                                    }`}
                                                fill
                                                sizes="100vw"
                                                className="
                                        object-contain
                                    "
                                            />
                                        </div>
                                    </SwiperSlide>
                                ),
                            )}
                        </Swiper>

                        {/* POPUP TITLE */}

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
                            <span
                                className="
                        text-[10px]
                        font-bold
                        tracking-[0.25em]
                        text-modura-secondary
                        uppercase
                    "
                            >
                                Project Album
                            </span>

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
                                {selectedAlbum.title}
                            </h3>


                        </div>
                    </div>
                </div>
            )}
        </>
    );
}