import Image from 'next/image';
import Link from 'next/link';

import { FiArrowUpRight, FiBox, FiLayers, FiPenTool, FiEye, FiTarget } from 'react-icons/fi';

import about1 from '@/app/assets/images/about-1.jpg';
import about2 from '@/app/assets/images/about-2.jpg';
import about3 from '@/app/assets/images/about-3.jpg';
import Breadcrumb from '../components/Breadcrumb';
import breadcrumb from '@/app/assets/images/breadcrumb.jpg';

export default function CompanyPage() {
    return (
        <>
            {/* =================================================
                BREADCRUMB
            ================================================= */}

            <Breadcrumb
                title="Company"
                image={breadcrumb.src}
            />

            <section className="bg-modura-white relative overflow-hidden py-12 lg:py-14" id="about-us">
                {/* =====================================================
                            SMALL TECHNICAL BACKGROUND LINES
                        ====================================================== */}

                <span className="bg-modura-gray-200 pointer-events-none absolute top-[13%] left-[7%] hidden h-px w-[90px] lg:block" />

                <span className="bg-modura-gray-200 pointer-events-none absolute top-[13%] left-[7%] hidden h-[90px] w-px lg:block" />

                <span className="bg-modura-gray-200 pointer-events-none absolute top-[18%] right-[8%] hidden h-px w-[70px] lg:block" />

                {/* =====================================================
                            MAIN CONTAINER
                        ====================================================== */}

                <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-8 xl:px-10 2xl:px-12">
                    <div className="grid items-center gap-14 lg:grid-cols-[1.03fr_0.97fr] lg:gap-16 xl:gap-20">
                        {/* =================================================
                                    LEFT SIDE — IMAGE COMPOSITION
                                ================================================== */}

                        <div className="relative mx-auto h-[430px] w-full max-w-[650px] sm:h-[490px] lg:mx-0 lg:h-[500px] xl:h-[530px]">
                            {/* =============================================
                                        SUBTLE TECHNICAL GRID
                                    ============================================== */}

                            <div className="pointer-events-none absolute bottom-[2%] left-[2%] h-[72%] w-[82%] opacity-70">
                                <span className="bg-modura-gray-200 absolute bottom-0 left-0 h-full w-px" />

                                <span className="bg-modura-gray-200 absolute bottom-0 left-[33%] h-full w-px" />

                                <span className="bg-modura-gray-200 absolute bottom-0 left-[66%] h-full w-px" />

                                <span className="bg-modura-gray-200 absolute bottom-0 left-0 h-px w-full" />

                                <span className="bg-modura-gray-200 absolute bottom-[33%] left-0 h-px w-full" />

                                <span className="bg-modura-gray-200 absolute bottom-[66%] left-0 h-px w-full" />
                            </div>

                            {/* =============================================
                                        IMAGE 1
                                        MAIN / LEFT IMAGE
                                    ============================================== */}

                            <div className="group/about-one border-modura-white absolute top-[5%] left-[10%] z-20 h-[82%] w-[43%] overflow-hidden border-[4px] shadow-xl">
                                <Image
                                    src={about1}
                                    alt="Modern architecture project by Modura Design Group"
                                    fill
                                    sizes="(max-width: 1024px) 45vw, 320px"
                                    className="object-cover transition-transform duration-700 group-hover/about-one:scale-[1.04]"
                                />

                                <div className="from-modura-primary/10 pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent" />
                            </div>

                            {/* =============================================
                                        IMAGE 2
                                        TOP CENTER IMAGE
                                    ============================================== */}

                            <div className="group/about-two border-modura-white absolute top-[11%] left-[51%] z-30 h-[38%] w-[29%] overflow-hidden border-[4px] shadow-lg">
                                <Image
                                    src={about2}
                                    alt="Architectural landscape and exterior design"
                                    fill
                                    sizes="(max-width: 1024px) 30vw, 220px"
                                    className="object-cover transition-transform duration-700 group-hover/about-two:scale-[1.05]"
                                />
                            </div>

                            {/* =============================================
                                        IMAGE 3
                                        BOTTOM RIGHT IMAGE
                                    ============================================== */}

                            <div className="group/about-three border-modura-white absolute bottom-[5%] left-[48%] z-40 h-[47%] w-[45%] overflow-hidden border-[4px] shadow-xl">
                                <Image
                                    src={about3}
                                    alt="Modern commercial building and engineering project"
                                    fill
                                    sizes="(max-width: 1024px) 45vw, 340px"
                                    className="object-cover transition-transform duration-700 group-hover/about-three:scale-[1.04]"
                                />

                                <div className="from-modura-primary/10 pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent" />
                            </div>

                            {/* =============================================
                                        ACCENT BLOCK
                                    ============================================== */}

                            <span className="bg-modura-secondary absolute top-[14%] left-[7%] z-10 h-[100px] w-[7px]" />

                            {/* =============================================
                                        TECHNICAL CORNER
                                    ============================================== */}

                            <div className="pointer-events-none absolute right-[3%] bottom-[2%] z-50 hidden h-[85px] w-[85px] lg:block">
                                <span className="bg-modura-secondary absolute right-0 bottom-0 h-full w-px" />

                                <span className="bg-modura-secondary absolute right-0 bottom-0 h-px w-full" />

                                <span className="border-modura-gray-300 absolute right-[14px] bottom-[14px] h-[45px] w-[45px] border-t border-l" />
                            </div>
                        </div>

                        {/* =================================================
                                    RIGHT SIDE — CONTENT
                                ================================================== */}

                        <div className="relative max-w-[650px]">
                            {/* =============================================
                                        SMALL LABEL
                                    ============================================== */}

                            <div className="mb-3 flex items-center gap-4">
                                {/* <span
                                            className="
                                                h-[2px]
                                                w-[45px]
                                                bg-modura-secondary
                                            "
                                        /> */}

                                <span className="text-modura-secondary !text-[14px] font-bold tracking-[0.26em] uppercase sm:text-[11px]">
                                    About Modura
                                </span>
                            </div>

                            {/* =============================================
                                        HEADING
                                    ============================================== */}

                            <h2 className="text-modura-primary max-w-[620px] text-[36px] leading-[1.08] font-bold tracking-[-0.035em] sm:text-[42px] lg:text-[46px] xl:text-[45px]">
                                Turning Ideas Into
                                <span className="block">Buildable Solutions</span>
                            </h2>

                            {/* =============================================
                                        HEADING LINE
                                    ============================================== */}

                            <div className="my-6 flex items-center">
                                <span className="bg-modura-primary h-[3px] w-[44px]" />

                                <span className="bg-modura-gray-300 h-px w-[75px]" />
                            </div>

                            {/* =============================================
                                        PARAGRAPH 1
                                    ============================================== */}

                            <p className="text-modura-gray-600 max-w-[620px] text-[14px] leading-[1.8] sm:text-[15px] lg:text-[15px]">
                                Modura Design Group provides comprehensive architecture, engineering, BIM and outsourcing
                                solutions designed to support projects from initial concepts through detailed design and
                                construction documentation.
                            </p>

                            {/* =============================================
                                        PARAGRAPH 2
                                    ============================================== */}

                            <p className="text-modura-gray-600 mt-4 max-w-[620px] text-[14px] leading-[1.8] sm:text-[15px] lg:text-[15px]">
                                We collaborate with architects, engineers, contractors, developers and construction teams to
                                deliver coordinated, accurate and buildable solutions. By combining technical expertise with
                                efficient digital workflows, we help improve coordination, reduce project risks and support
                                smoother project delivery.
                            </p>

                            {/* =================================================
                                    CREATIVE CAPABILITY STRIP
                                ================================================= */}

                        <div
                            className="
                                mt-8
                                border-t
                                border-modura-gray-200
                                pt-6
                            "
                        >
                            <div
                                className="
                                    grid
                                    grid-cols-1
                                    sm:grid-cols-3
                                "
                            >
                                {/* ARCHITECTURE */}

                                <div
                                    className="
                                        group
                                        relative
                                        border-b
                                        border-modura-gray-200
                                        pb-5
                                        sm:border-r
                                        sm:border-b-0
                                        sm:pr-6
                                    "
                                >
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
                                                flex
                                                h-9
                                                w-9
                                                items-center
                                                justify-center
                                                border
                                                border-modura-gray-300
                                                text-modura-secondary
                                                transition-all
                                                duration-300
                                                group-hover:border-modura-primary
                                                group-hover:bg-modura-primary
                                                group-hover:text-modura-white
                                            "
                                        >
                                            <FiPenTool size={16} />
                                        </span>

                                    
                                    </div>

                                    <h3
                                        className="
                                            text-[15px]
                                            font-bold
                                            tracking-[0.03em]
                                            text-modura-primary
                                        "
                                    >
                                        Architecture
                                    </h3>

                                    <p
                                        className="
                                            mt-1.5
                                            text-[12px]
                                            leading-5
                                            text-modura-gray-500
                                        "
                                    >
                                        Design-led planning and documentation
                                    </p>
                                </div>


                                {/* ENGINEERING */}

                                <div
                                    className="
                                        group
                                        relative
                                        border-b
                                        border-modura-gray-200
                                        py-5
                                        sm:border-r
                                        sm:border-b-0
                                        sm:px-6
                                        sm:py-0
                                    "
                                >
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
                                                flex
                                                h-9
                                                w-9
                                                items-center
                                                justify-center
                                                border
                                                border-modura-gray-300
                                                text-modura-secondary
                                                transition-all
                                                duration-300
                                                group-hover:border-modura-primary
                                                group-hover:bg-modura-primary
                                                group-hover:text-modura-white
                                            "
                                        >
                                            <FiLayers size={16} />
                                        </span>

                                        
                                    </div>

                                    <h3
                                        className="
                                            text-[15px]
                                            font-bold
                                            tracking-[0.03em]
                                            text-modura-primary
                                        "
                                    >
                                        Engineering
                                    </h3>

                                    <p
                                        className="
                                            mt-1.5
                                            text-[12px]
                                            leading-5
                                            text-modura-gray-500
                                        "
                                    >
                                        Accurate and coordinated solutions
                                    </p>
                                </div>


                                {/* BIM */}

                                <div
                                    className="
                                        group
                                        relative
                                        pt-5
                                        sm:pl-6
                                        sm:pt-0
                                    "
                                >
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
                                                flex
                                                h-9
                                                w-9
                                                items-center
                                                justify-center
                                                border
                                                border-modura-gray-300
                                                text-modura-secondary
                                                transition-all
                                                duration-300
                                                group-hover:border-modura-primary
                                                group-hover:bg-modura-primary
                                                group-hover:text-modura-white
                                            "
                                        >
                                            <FiBox size={16} />
                                        </span>

                                    
                                    </div>

                                    <h3
                                        className="
                                            text-[15px]
                                            font-bold
                                            tracking-[0.03em]
                                            text-modura-primary
                                        "
                                    >
                                        BIM & Digital
                                    </h3>

                                    <p
                                        className="
                                            mt-1.5
                                            text-[12px]
                                            leading-5
                                            text-modura-gray-500
                                        "
                                    >
                                        Connected workflows for better delivery
                                    </p>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =================================================
            VISION & MISSION
        ================================================= */}

            <section
                    className="
                        relative
                        overflow-hidden
                        bg-modura-off-white
                        py-12
                        md:py-14
                       
                    "
                >
                    {/* =================================================
                        BACKGROUND TECHNICAL LINE
                    ================================================= */}

                    
                    <span
                        className="
                            pointer-events-none
                            absolute
                            top-[12%]
                            right-[5%]
                            h-px
                            w-[120px]
                            bg-modura-gray-200
                        "
                    />

                    <div
                        className="
                            relative
                            z-10
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
                                mb-5
                                grid
                                gap-6
                                lg:mb-7
                                lg:grid-cols-[1fr_0.72fr]
                                lg:items-end
                                lg:gap-16
                            "
                        >

                            <div>
                                {/* EYEBROW */}

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
                                            font-bold
                                            tracking-[0.32em]
                                            text-modura-secondary
                                            uppercase
                                        "
                                    >
                                        OUR GUIDING PRINCIPLES
                                    </span>
                                </div>

                                {/* HEADING */}

                                <h2
                                    className="
                                        text-[38px]
                                        leading-none
                                        font-bold
                                        tracking-[-0.04em]
                                        text-modura-primary

                                        md:text-[48px]

                                        lg:text-[56px]
                                    "
                                >
                                    Vision
                                    <span
                                        className="
                                            text-modura-secondary
                                        "
                                    >
                                        {' '}
                                        &amp; Mission
                                    </span>
                                </h2>
                            </div>


                            {/* HEADER DESCRIPTION */}

                            <p
                                className="
                                    max-w-130
                                    text-[14px]
                                    leading-[1.8]
                                    text-modura-gray-600

                                    md:text-[15px]
                                "
                            >
                                Guided by a clear vision and a strong mission, we
                                continue to create value through innovative design,
                                technical excellence and a commitment to a better
                                built environment.
                            </p>

                        </div>


                        {/* =================================================
                            VISION + MISSION
                        ================================================= */}

                        <div
                            className="
                                grid
                                grid-cols-1
                                gap-6

                                lg:grid-cols-2
                            "
                        >

                            {/* =================================================
                                VISION CARD
                            ================================================= */}

                            <div
                                className="
                                    group
                                    relative
                                    min-h-[400px]
                                    overflow-hidden
                                    rounded-[10px]
                                    border
                                    border-modura-gray-300
                                    bg-modura-white
                                "
                            >

                                {/* =================================================
                                    ARCHITECTURAL BACKGROUND — RIGHT
                                ================================================= */}

                                <div
                                    className="
                                        pointer-events-none
                                        absolute
                                        top-0
                                        right-0
                                        h-full
                                        w-[43%]
                                        overflow-hidden
                                    "
                                >

                                    {/* LIGHT BLUE / GREY PANEL */}

                                    <div
                                        className="
                                            absolute
                                            top-0
                                            right-0
                                            h-[62%]
                                            w-[68%]
                                            bg-modura-gray-100
                                        "
                                    />

                                    {/* DIAGONAL ARCHITECTURAL PANEL */}

                                    <div
                                        className="
                                            absolute
                                            top-0
                                            right-[20%]
                                            h-[78%]
                                            w-[42%]
                                            border-l
                                            border-modura-gray-300
                                            bg-modura-light/50
                                            [clip-path:polygon(0_0,100%_0,100%_100%,0_72%)]
                                        "
                                    />

                                    {/* LARGE BUILDING BLOCK */}

                                    <div
                                        className="
                                            absolute
                                            top-[8%]
                                            right-[-5%]
                                            h-[63%]
                                            w-[37%]
                                            border-l
                                            border-modura-gray-300
                                            bg-modura-gray-200/70
                                            [clip-path:polygon(0_17%,100%_0,100%_100%,0_82%)]
                                        "
                                    />

                                    {/* NAVY BUILDING */}

                                    <div
                                        className="
                                            absolute
                                            right-0
                                            bottom-0
                                            h-[72%]
                                            w-[22%]
                                            bg-modura-primary
                                            [clip-path:polygon(28%_0,100%_0,100%_100%,0_100%,0_16%)]
                                        "
                                    />

                                    {/* SECOND NAVY PANEL */}

                                    <div
                                        className="
                                            absolute
                                            right-[22%]
                                            bottom-0
                                            h-[48%]
                                            w-[17%]
                                            border-l
                                            border-modura-primary
                                            bg-modura-primary/10
                                        "
                                    />

                                    {/* VERTICAL TECHNICAL LINE */}

                                    <span
                                        className="
                                            absolute
                                            top-0
                                            right-[22%]
                                            h-full
                                            w-px
                                            bg-modura-gray-300
                                        "
                                    />

                                    {/* SECOND VERTICAL LINE */}

                                    <span
                                        className="
                                            absolute
                                            top-[12%]
                                            right-[42%]
                                            h-[68%]
                                            w-px
                                            bg-modura-gray-300
                                        "
                                    />

                                    {/* HORIZONTAL LINE */}

                                    <span
                                        className="
                                            absolute
                                            top-[47%]
                                            right-0
                                            h-px
                                            w-[72%]
                                            bg-modura-gray-300
                                        "
                                    />

                                    {/* DIAGONAL TECHNICAL LINE */}

                                    <span
                                        className="
                                            absolute
                                            top-[18%]
                                            right-[3%]
                                            h-px
                                            w-[115%]
                                            origin-right
                                            rotate-[38deg]
                                            bg-modura-gray-300
                                        "
                                    />

                                    {/* BOTTOM DIAGONAL */}

                                    <span
                                        className="
                                            absolute
                                            bottom-[20%]
                                            right-[-5%]
                                            h-px
                                            w-[85%]
                                            origin-right
                                            rotate-[-35deg]
                                            bg-modura-gray-300
                                        "
                                    />

                                    {/* SMALL FRAME */}

                                    <div
                                        className="
                                            absolute
                                            top-[16%]
                                            right-[18%]
                                            h-[105px]
                                            w-[90px]
                                            border
                                            border-modura-gray-300
                                        "
                                    />

                                    {/* INNER FRAME */}

                                    <div
                                        className="
                                            absolute
                                            top-[22%]
                                            right-[23%]
                                            h-[65px]
                                            w-[55px]
                                            border
                                            border-modura-gray-300
                                        "
                                    />

                                </div>


                                {/* =================================================
                                    CONTENT
                                ================================================= */}

                                <div
                                    className="
                                        relative
                                        z-10
                                        w-[72%]
                                        p-7

                                        md:p-9

                                        lg:p-10
                                    "
                                >

                                    {/* ICON */}

                                    <div
                                        className="
                                            flex
                                            h-[60px]
                                            w-[60px]
                                            items-center
                                            justify-center
                                            rounded-[14px]
                                            bg-modura-light
                                            text-modura-primary
                                            transition-all
                                            duration-500

                                            group-hover:bg-modura-primary
                                            group-hover:text-modura-white
                                        "
                                    >
                                        <FiEye
                                            size={28}
                                            strokeWidth={1.7}
                                        />
                                    </div>


                                    {/* LABEL */}

                                    <div
                                        className="
                                            mt-7
                                            flex
                                            items-center
                                            gap-3
                                        "
                                    >
                                        <span
                                            className="
                                                h-[3px]
                                                w-12
                                                bg-modura-primary
                                            "
                                        />

                                        <span
                                            className="
                                                text-[10px]
                                                font-bold
                                                tracking-[0.32em]
                                                text-modura-secondary
                                                uppercase
                                            "
                                        >
                                            OUR VISION
                                        </span>
                                    </div>


                                    {/* TITLE */}

                                    <h3
                                        className="
                                            mt-4
                                            max-w-[500px]
                                            text-[30px]
                                            leading-[1.08]
                                            font-bold
                                            tracking-[-0.035em]
                                            text-modura-primary

                                            md:text-[36px]
                                        "
                                    >
                                        Building better ideas
                                        <span
                                            className="
                                                block
                                                text-modura-secondary
                                            "
                                        >
                                            into better spaces.
                                        </span>
                                    </h3>


                                    {/* DIVIDER */}

                                    <div
                                        className="
                                            my-6
                                            flex
                                            items-center
                                        "
                                    >
                                        <span
                                            className="
                                                h-[3px]
                                                w-12
                                                bg-modura-primary
                                            "
                                        />

                                        <span
                                            className="
                                                h-px
                                                w-16
                                                bg-modura-gray-300
                                            "
                                        />
                                    </div>


                                    {/* DESCRIPTION */}

                                    <p
                                        className="
                                            max-w-[520px]
                                            text-[14px]
                                            leading-[1.45]
                                            text-modura-gray-600

                                            md:text-[16px]
                                        "
                                    >
                                        To be a globally trusted design and engineering
                                        partner, known for innovation, precision and a
                                        commitment to creating sustainable, buildable
                                        spaces that positively impact communities.
                                    </p>

                                </div>


                                {/* BOTTOM ACCENT */}

                                <span
                                    className="
                                        absolute
                                        bottom-0
                                        left-0
                                        z-20
                                        h-[3px]
                                        w-20
                                        bg-modura-secondary
                                        transition-all
                                        duration-500
                                        group-hover:w-32
                                    "
                                />

                            </div>


                            {/* =================================================
                                MISSION CARD
                            ================================================= */}

                            <div
                                className="
                                    group
                                    relative
                                    min-h-[400px]
                                    overflow-hidden
                                    rounded-[10px]
                                    border
                                    border-modura-gray-300
                                    bg-modura-white
                                "
                            >

                                {/* =================================================
                                    ARCHITECTURAL BACKGROUND — RIGHT
                                ================================================= */}

                                <div
                                    className="
                                        pointer-events-none
                                        absolute
                                        top-0
                                        right-0
                                        h-full
                                        w-[43%]
                                        overflow-hidden
                                    "
                                >

                                    {/* LIGHT PANEL */}

                                    <div
                                        className="
                                            absolute
                                            top-0
                                            right-0
                                            h-full
                                            w-[70%]
                                            bg-modura-gray-100
                                        "
                                    />

                                    {/* LARGE LIGHT BUILDING */}

                                    <div
                                        className="
                                            absolute
                                            top-[5%]
                                            right-[13%]
                                            h-[72%]
                                            w-[43%]
                                            border-l
                                            border-modura-gray-300
                                            bg-modura-light/60
                                            [clip-path:polygon(0_18%,100%_0,100%_100%,0_80%)]
                                        "
                                    />

                                    {/* NAVY ARCHITECTURAL BUILDING */}

                                    <div
                                        className="
                                            absolute
                                            top-[10%]
                                            right-[-4%]
                                            h-[88%]
                                            w-[28%]
                                            bg-modura-primary
                                            [clip-path:polygon(35%_0,100%_12%,100%_100%,0_100%,0_13%)]
                                        "
                                    />

                                    {/* SECOND LIGHT STRUCTURE */}

                                    <div
                                        className="
                                            absolute
                                            bottom-0
                                            right-[27%]
                                            h-[48%]
                                            w-[23%]
                                            border-l
                                            border-modura-gray-300
                                            bg-modura-white/60
                                        "
                                    />

                                    {/* VERTICAL TECHNICAL LINES */}

                                    <span
                                        className="
                                            absolute
                                            top-0
                                            right-[28%]
                                            h-full
                                            w-px
                                            bg-modura-gray-300
                                        "
                                    />

                                    <span
                                        className="
                                            absolute
                                            top-0
                                            right-[48%]
                                            h-[72%]
                                            w-px
                                            bg-modura-gray-300
                                        "
                                    />

                                    {/* HORIZONTAL LINES */}

                                    <span
                                        className="
                                            absolute
                                            top-[43%]
                                            right-0
                                            h-px
                                            w-full
                                            bg-modura-gray-300
                                        "
                                    />

                                    <span
                                        className="
                                            absolute
                                            bottom-[22%]
                                            right-0
                                            h-px
                                            w-[75%]
                                            bg-modura-gray-300
                                        "
                                    />

                                    {/* DIAGONAL LINE */}

                                    <span
                                        className="
                                            absolute
                                            top-[10%]
                                            right-[-10%]
                                            h-px
                                            w-[115%]
                                            origin-right
                                            rotate-[40deg]
                                            bg-modura-gray-300
                                        "
                                    />

                                    {/* SECOND DIAGONAL */}

                                    <span
                                        className="
                                            absolute
                                            bottom-[20%]
                                            right-[-10%]
                                            h-px
                                            w-[100%]
                                            origin-right
                                            rotate-[-36deg]
                                            bg-modura-gray-300
                                        "
                                    />

                                    {/* LARGE FRAME */}

                                    <div
                                        className="
                                            absolute
                                            top-[12%]
                                            right-[30%]
                                            h-[145px]
                                            w-[125px]
                                            border
                                            border-modura-gray-300
                                        "
                                    />

                                    {/* INNER FRAME */}

                                    <div
                                        className="
                                            absolute
                                            top-[27%]
                                            right-[36%]
                                            h-[75px]
                                            w-[65px]
                                            border
                                            border-modura-gray-300
                                        "
                                    />

                                </div>


                                {/* =================================================
                                    CONTENT
                                ================================================= */}

                                <div
                                    className="
                                        relative
                                        z-10
                                        w-[72%]
                                        p-7

                                        md:p-9

                                        lg:p-10
                                    "
                                >

                                    {/* ICON */}

                                    <div
                                        className="
                                            flex
                                            h-[60px]
                                            w-[60px]
                                            items-center
                                            justify-center
                                            rounded-[14px]
                                            bg-modura-light
                                            text-modura-primary
                                            transition-all
                                            duration-500

                                            group-hover:bg-modura-primary
                                            group-hover:text-modura-white
                                        "
                                    >
                                        <FiTarget
                                            size={28}
                                            strokeWidth={1.7}
                                        />
                                    </div>


                                    {/* LABEL */}

                                    <div
                                        className="
                                            mt-7
                                            flex
                                            items-center
                                            gap-3
                                        "
                                    >
                                        <span
                                            className="
                                                h-[3px]
                                                w-12
                                                bg-modura-primary
                                            "
                                        />

                                        <span
                                            className="
                                                text-[10px]
                                                font-bold
                                                tracking-[0.32em]
                                                text-modura-secondary
                                                uppercase
                                            "
                                        >
                                            OUR MISSION
                                        </span>
                                    </div>


                                    {/* TITLE */}

                                    <h3
                                        className="
                                            mt-4
                                            min-w-[520px]
                                            text-[30px]
                                            leading-[1.08]
                                            font-bold
                                            tracking-[-0.035em]
                                            text-modura-primary
                                            md:text-[36px]
                                        "
                                    >
                                        Designing with precision.
                                        <span
                                            className="
                                                block
                                                text-modura-secondary
                                            "
                                        >
                                            Delivering with purpose.
                                        </span>
                                    </h3>


                                    {/* DIVIDER */}

                                    <div
                                        className="
                                            my-6
                                            flex
                                            items-center
                                        "
                                    >
                                        <span
                                            className="
                                                h-[3px]
                                                w-12
                                                bg-modura-primary
                                            "
                                        />

                                        <span
                                            className="
                                                h-px
                                                w-16
                                                bg-modura-gray-300
                                            "
                                        />
                                    </div>


                                    {/* DESCRIPTION */}

                                    <p
                                        className="
                                            max-w-[520px]
                                            text-[14px]
                                            leading-[1.45]
                                            text-modura-gray-600

                                            md:text-[16px]
                                        "
                                    >
                                        To provide integrated architecture, engineering,
                                        BIM and outsourcing solutions through collaboration,
                                        technology and technical excellence, helping our
                                        clients turn ideas into successful, real-world
                                        outcomes.
                                    </p>

                                </div>


                                {/* BOTTOM ACCENT */}

                                <span
                                    className="
                                        absolute
                                        right-0
                                        bottom-0
                                        z-20
                                        h-[3px]
                                        w-20
                                        bg-modura-secondary
                                        transition-all
                                        duration-500
                                        group-hover:w-32
                                    "
                                />

                            </div>

                        </div>
                    </div>
            </section>
        </>
    )
}