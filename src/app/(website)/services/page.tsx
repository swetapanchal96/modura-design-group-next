
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { apiUrl } from '@/app/(website)/config';

import Breadcrumb from '../../../components/Breadcrumb';
import breadcrumb from '@/app/(website)/assets/images/breadcrumb.jpg';

interface ServiceItem {
    id: number;
    title: string;
    slug: string;
    imageUrl: string | null;
}

export default function ServicesPage() {
    const [services, setServices] = useState<ServiceItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        const fetchServices = async () => {
            try {
                const response = await axios.post(
                    `${apiUrl}/services`,
                    {},
                    {
                        signal: controller.signal,
                    }
                );

                if (controller.signal.aborted) return;

                if (
                    response.data?.success === true &&
                    Array.isArray(response.data?.data)
                ) {
                    setServices(response.data.data);
                } else {
                    setServices([]);
                }
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error('Services API Error:', error);

                    if (!controller.signal.aborted) {
                        setServices([]);
                    }
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchServices();

        return () => controller.abort();
    }, []);

    return (
        <>
            {/* =================================================
                BREADCRUMB
            ================================================= */}

            <Breadcrumb
                title="Services"
                image={breadcrumb.src}
            />

            {/* =================================================
                SERVICES LISTING
            ================================================= */}

            <section className="bg-modura-white relative overflow-hidden py-12 md:py-14">

                <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 xl:px-10">

                    {/* SECTION HEADING */}

                    <div className="mb-9 md:mb-11">

                        <div className="mb-3 flex items-center gap-3">
                            <span className="bg-modura-primary h-[2px] w-9" />

                            <span className="text-modura-secondary text-[13px] font-bold tracking-[0.25em] uppercase">
                                Our Services
                            </span>
                        </div>

                        <h1 className="text-modura-primary text-[34px] leading-[1.1] font-bold tracking-[-0.035em] uppercase sm:text-[40px] md:text-[46px]">
                            Comprehensive Design
                            <span className="text-modura-secondary ml-2">
                                & Engineering Support
                            </span>
                        </h1>

                    </div>

                    {/* =================================================
                        SERVICES GRID — 4 CARDS PER ROW
                    ================================================= */}

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                        {loading ? (

                            <div className="col-span-full py-14 text-center">
                                <p className="text-modura-gray-600 text-[14px]">
                                    Loading services...
                                </p>
                            </div>

                        ) : services.length === 0 ? (

                            <div className="col-span-full py-14 text-center">
                                <p className="text-modura-gray-600 text-[14px]">
                                    Services are currently not available.
                                </p>
                            </div>

                        ) : (

                            services.map((service) => (

                                <Link
                                    key={service.id}
                                    href={`/servicedetail/${encodeURIComponent(service.slug)}`}
                                    className="group relative block overflow-hidden bg-modura-primary"
                                >

                                    {/* SERVICE IMAGE */}

                                    <div className="relative h-[280px] overflow-hidden sm:h-[300px]">

                                        {service.imageUrl && (
                                            <Image
                                                src={service.imageUrl}
                                                alt={service.title}
                                                fill
                                                unoptimized
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                            />
                                        )}

                                        {/* IMAGE OVERLAY */}

                                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#061322]/80 via-[#061322]/15 to-transparent" />

                                        {/* HOVER ACCENT */}

                                        <span className="bg-modura-secondary absolute top-0 left-0 h-[3px] w-0 transition-all duration-500 group-hover:w-full" />

                                        {/* SERVICE NAME */}

                                        <div className="absolute right-0 bottom-0 left-0 p-5 md:p-6">

                                            <span className="bg-modura-secondary-light mb-4 block h-[2px] w-9 transition-all duration-500 group-hover:w-14" />

                                            <h2 className="text-modura-white text-[19px] leading-[1.3] font-semibold tracking-[0.01em] uppercase md:text-[21px]">
                                                {service.title}
                                            </h2>

                                        </div>

                                    </div>

                                </Link>

                            ))

                        )}

                    </div>

                </div>

            </section>
        </>
    );
}
