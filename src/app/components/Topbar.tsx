import Link from "next/link";

import {
    FiMail,
    FiPhone,
    FiArrowUpRight,
} from "react-icons/fi";

import {
    FaLinkedinIn,
    FaInstagram,
} from "react-icons/fa6";


export default function Topbar() {
    return (
        <div className="hidden bg-modura-primary lg:block">

            <div className="mx-auto max-w-[1440px] px-6 xl:px-10 2xl:px-12">

                <div className="flex h-[42px] items-center justify-between">

                    {/* =====================================================
              LEFT — CORE EXPERTISE
          ====================================================== */}

                    <div className="flex h-full items-center">

                        {/* Small technical accent */}
                        <div className="mr-5 flex items-center gap-1.5">
                            <span className="h-[5px] w-[5px] bg-modura-secondary-light" />
                            <span className="h-px w-7 bg-modura-secondary-light" />
                        </div>


                        <div className="flex h-full items-center">

                            {[
                                "Architecture",
                                "BIM",
                                "Structural",
                                "Outsourcing",
                            ].map((item, index) => (
                                <div
                                    key={item}
                                    className="flex h-full items-center"
                                >

                                    <span
                                        className="
                      flex h-full items-center
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-modura-white
                    "
                                    >
                                        {item}
                                    </span>


                                    {index !== 3 && (
                                        <span
                                            className="
                        mx-4
                        h-[3px]
                        w-[3px]
                        rotate-45
                        bg-modura-secondary-light
                      "
                                        />
                                    )}

                                </div>
                            ))}

                        </div>

                    </div>


                    {/* =====================================================
    RIGHT — CONTACT + SOCIAL
====================================================== */}

                    <div className="flex h-full items-center">

                        {/* CONTACT AREA */}
                        <div
                            className="
      flex h-full items-center
      bg-modura-secondary
    "
                        >

                            {/* EMAIL */}
                            <Link
                                href="mailto:info@moduradesigngroup.com"
                                className="
        group
        relative
        flex h-full items-center gap-3
        border-r border-modura-secondary-light
        px-5
        text-modura-white
        hover:bg-modura-secondary-dark
      "
                            >
                                <span
                                    className="
          flex h-8 w-8
          items-center justify-center
          border border-modura-secondary-light rounded-3xl
          text-[15px]
          text-modura-white
          transition-all duration-300
          group-hover:border-modura-white
          group-hover:bg-modura-white
          group-hover:text-modura-primary
        "
                                >
                                    <FiMail />
                                </span>

                                <div className="flex flex-col leading-none">


                                    <span
                                        className="
            text-[12px]
            font-semibold
            tracking-[0.01em]
            text-modura-white
          "
                                    >
                                        info@moduradesigngroup.com
                                    </span>

                                </div>
                            </Link>


                            {/* PHONE */}
                            <Link
                                href="tel:+910000000000"
                                className="
        group
        relative
        flex h-full items-center gap-3
        border-r border-modura-secondary-light
        px-5
        text-modura-white
        hover:bg-modura-secondary-dark
      "
                            >
                                <span
                                    className="
          flex h-8 w-8
          items-center justify-center
          border border-modura-secondary-light rounded-3xl
          text-[15px]
          text-modura-white
          transition-all duration-300
          group-hover:border-modura-white
          group-hover:bg-modura-white
          group-hover:text-modura-primary
        "
                                >
                                    <FiPhone />
                                </span>

                                <div className="flex flex-col leading-none">

                                    

                                    <span
                                        className="
            text-[12px]
            font-semibold
            tracking-[0.04em]
            text-modura-white
          "
                                    >
                                        +91 00000 00000
                                    </span>

                                </div>
                            </Link>

                        </div>


                        {/* SOCIAL MEDIA */}
                        <div
                            className="
      flex h-full items-center
      bg-modura-primary-light
    "
                        >

                            {/* LINKEDIN */}
                            <Link
                                href="#"
                                aria-label="LinkedIn"
                                className="
        group
        relative
        flex h-full w-[44px]
        items-center justify-center
        border-r border-modura-secondary-dark
        text-[16px]
        text-modura-white
        hover:bg-modura-white
        hover:text-modura-primary
      "
                            >
                                <FaLinkedinIn
                                    className="
          transition-transform duration-300
          group-hover:-translate-y-0.5
        "
                                />

                                <span
                                    className="
          absolute
          bottom-0 left-0
          h-[2px] w-0
          bg-modura-secondary-light
          transition-all duration-300
          group-hover:w-full
        "
                                />
                            </Link>


                            {/* INSTAGRAM */}
                            <Link
                                href="#"
                                aria-label="Instagram"
                                className="
        group
        relative
        flex h-full w-[44px]
        items-center justify-center
        border-r border-modura-secondary-dark
        text-[16px]
        text-modura-white
        hover:bg-modura-white
        hover:text-modura-primary
      "
                            >
                                <FaInstagram
                                    className="
          transition-transform duration-300
          group-hover:-translate-y-0.5
        "
                                />

                                <span
                                    className="
          absolute
          bottom-0 left-0
          h-[2px] w-0
          bg-modura-secondary-light
          transition-all duration-300
          group-hover:w-full
        "
                                />
                            </Link>


                            {/* END TECHNICAL ACCENT */}
                            <div
                                className="
        flex h-full w-8
        items-center justify-center
        bg-modura-primary
      "
                            >
                                <span
                                    className="
          h-[5px] w-[5px]
          rotate-45
          bg-modura-white
        "
                                />
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}