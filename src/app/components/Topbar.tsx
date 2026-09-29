import Link from 'next/link';

import { FiMail, FiPhone, FiArrowUpRight } from 'react-icons/fi';

import { FaLinkedinIn, FaInstagram } from 'react-icons/fa6';

export default function Topbar() {
    return (
        <div className="bg-modura-primary hidden lg:block">
            <div className="mx-auto max-w-[1440px] px-6 xl:px-10 2xl:px-12">
                <div className="flex h-[42px] items-center justify-between">
                    {/* =====================================================
              LEFT — CORE EXPERTISE
          ====================================================== */}

                    <div className="flex h-full items-center">
                        {/* Small technical accent */}
                        <div className="mr-5 flex items-center gap-1.5">
                            <span className="bg-modura-secondary-light h-[5px] w-[5px]" />
                            <span className="bg-modura-secondary-light h-px w-7" />
                        </div>

                        <div className="flex h-full items-center">
                            {['Architecture', 'BIM', 'Structural', 'Outsourcing'].map((item, index) => (
                                <div key={item} className="flex h-full items-center">
                                    <span className="text-modura-white flex h-full items-center text-[10px] font-semibold tracking-[0.18em] uppercase">
                                        {item}
                                    </span>

                                    {index !== 3 && (
                                        <span className="bg-modura-secondary-light mx-4 h-[3px] w-[3px] rotate-45" />
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
                        <div className="bg-modura-secondary flex h-full items-center">
                            {/* EMAIL */}
                            <Link
                                href="mailto:info@moduradesigngroup.com"
                                className="group border-modura-secondary-light text-modura-white hover:bg-modura-secondary-dark relative flex h-full items-center gap-3 border-r px-5"
                            >
                                <span className="border-modura-secondary-light text-modura-white group-hover:border-modura-white group-hover:bg-modura-white group-hover:text-modura-primary flex h-8 w-8 items-center justify-center rounded-3xl border text-[15px] transition-all duration-300">
                                    <FiMail />
                                </span>

                                <div className="flex flex-col leading-none">
                                    <span className="text-modura-white text-[12px] font-semibold tracking-[0.01em]">
                                        info@moduradesigngroup.com
                                    </span>
                                </div>
                            </Link>

                            {/* PHONE */}
                            <Link
                                href="tel:+910000000000"
                                className="group border-modura-secondary-light text-modura-white hover:bg-modura-secondary-dark relative flex h-full items-center gap-3 border-r px-5"
                            >
                                <span className="border-modura-secondary-light text-modura-white group-hover:border-modura-white group-hover:bg-modura-white group-hover:text-modura-primary flex h-8 w-8 items-center justify-center rounded-3xl border text-[15px] transition-all duration-300">
                                    <FiPhone />
                                </span>

                                <div className="flex flex-col leading-none">
                                    <span className="text-modura-white text-[12px] font-semibold tracking-[0.04em]">
                                        +91 00000 00000
                                    </span>
                                </div>
                            </Link>
                        </div>

                        {/* SOCIAL MEDIA */}
                        <div className="bg-modura-primary-light flex h-full items-center">
                            {/* LINKEDIN */}
                            <Link
                                href="#"
                                aria-label="LinkedIn"
                                className="group border-modura-secondary-dark text-modura-white hover:bg-modura-white hover:text-modura-primary relative flex h-full w-[44px] items-center justify-center border-r text-[16px]"
                            >
                                <FaLinkedinIn className="transition-transform duration-300 group-hover:-translate-y-0.5" />

                                <span className="bg-modura-secondary-light absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full" />
                            </Link>

                            {/* INSTAGRAM */}
                            <Link
                                href="#"
                                aria-label="Instagram"
                                className="group border-modura-secondary-dark text-modura-white hover:bg-modura-white hover:text-modura-primary relative flex h-full w-[44px] items-center justify-center border-r text-[16px]"
                            >
                                <FaInstagram className="transition-transform duration-300 group-hover:-translate-y-0.5" />

                                <span className="bg-modura-secondary-light absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full" />
                            </Link>

                            {/* END TECHNICAL ACCENT */}
                            <div className="bg-modura-primary flex h-full w-8 items-center justify-center">
                                <span className="bg-modura-white h-[5px] w-[5px] rotate-45" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
