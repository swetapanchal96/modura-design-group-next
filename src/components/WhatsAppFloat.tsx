"use client";

import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_NUMBER = "919876543210";

const WHATSAPP_MESSAGE =
    "Hello Modura Design Group, I would like to discuss a project.";

export default function WhatsAppFloat() {
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        WHATSAPP_MESSAGE
    )}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="
                group
                fixed
                right-5
                bottom-5
                z-[9990]

                flex
                h-[62px]
                w-[62px]
                items-center
                justify-center

                rounded-full
                bg-[#16a765]
                text-white

                shadow-[0_12px_35px_rgba(22,167,101,0.35)]

                transition-all
                duration-300

                hover:scale-110
                hover:bg-[#108b53]
                hover:shadow-[0_16px_45px_rgba(22,167,101,0.45)]

                sm:right-6
                sm:bottom-6
                sm:h-[66px]
                sm:w-[66px]

                lg:right-7
                lg:bottom-7
            "
        >
            {/* Pulse */}
            <span
                className="
                    pointer-events-none
                    absolute
                    inset-[-9px]
                    rounded-full
                    border
                    border-[#25d366]/30
                    animate-[whatsappPulse_2.2s_ease-out_infinite]
                "
            />

            {/* Glow */}
            <span
                className="
                    pointer-events-none
                    absolute
                    inset-[-4px]
                    rounded-full
                    bg-[#25d366]/15
                    blur-sm
                "
            />

            {/* Inner Ring */}
            <span
                className="
                    pointer-events-none
                    absolute
                    inset-[5px]
                    rounded-full
                    border
                    border-white/30
                "
            />

            {/* WhatsApp Icon */}
            <FaWhatsapp
                size={32}
                className="
                    relative
                    z-10
                    transition-transform
                    duration-300
                    text-modura-white
                    group-hover:rotate-[8deg]
                "
            />

            {/* Online Dot */}
            <span
                className="
                    absolute
                    top-1
                    right-1
                    z-20
                    h-[13px]
                    w-[13px]
                    rounded-full
                    border-[3px]
                    border-white
                    bg-[#22c55e]
                "
            />
        </a>
    );
}