'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { FiArrowUpRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

import blog1 from '@/app/assets/images/about-1.jpg';
import blog3 from '@/app/assets/images/about-3.jpg';

const blogs = [

    {
        title: 'How BIM Is Transforming Modern Construction',
        date: 'June 24, 2026',
        image: blog1.src,
        desc:
            'Building Information Modeling (BIM) is revolutionizing the construction industry by improving project coordination, reducing errors.'
    },


    {
        title: 'Future Trends In Architectural Design',
        date: 'May 18, 2026',
        image: blog3.src,
        desc:
            'Modern architectural design is evolving with sustainable materials, advanced technologies, and innovative planning approaches. '
    },


    {
        title: 'Key Trends In Structural Engineering',
        date: 'April 12, 2026',
        image: blog1.src,
        desc:
            'Structural engineering is moving towards smarter solutions with advanced analysis tools, sustainable practices, and improved construction techniques.'
    }

];

export default function RelatedBlogs() {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.blog-heading', {
                y: 50,
                opacity: 0,
                duration: 1,

                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
            });

            gsap.from('.blog-card', {
                y: 80,
                opacity: 0,

                stagger: 0.18,

                duration: 0.8,

                ease: 'power3.out',

                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}

            className="relative overflow-hidden bg-modura-white py-20"
        >
            {/* blueprint */}

            <div className="absolute inset-0 bg-[url('/images/blueprint-bg.png')] bg-cover opacity-[0.07]" />

            <div className="relative mx-auto max-w-[1300px] px-8">
                {/* HEADER */}

                <div className="blog-heading mb-14 flex items-end justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-3">
                            <span className="text-[14px] font-bold tracking-[0.35em] text-[#596a79]">
                                LATEST INSIGHTS
                            </span>
                        </div>

                        <h2 className="text-[48px] leading-none font-bold text-[#0b1d33] uppercase">
                            Knowledge For
                            <span className="ml-2 text-modura-secondary"> A Smarter Built World</span>
                        </h2>
                    </div>

                    {/* <button className="border border-[#0b1d33] px-6 py-3 text-xs font-bold tracking-wider text-[#0b1d33] uppercase transition-all duration-500 hover:bg-[#0b1d33] hover:text-white">
                        View All Blogs
                    </button> */}
                </div>

                {/* BLOG GRID */}

                <div className="grid grid-cols-3 gap-8">
                    {blogs.map((blog, index) => (
                        <article
                            key={index}

                            className="blog-card group relative overflow-hidden bg-white shadow-[0_15px_40px_rgba(11,29,51,0.08)]"
                        >
                            {/* IMAGE */}

                            <div className="relative h-[230px] overflow-hidden">
                                <Image
                                    src={blog.image}

                                    fill

                                    alt={blog.title}

                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* image overlay */}

                                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1d33]/50 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                            </div>

                            <div className="p-7">
                                <p className="text-xs font-semibold tracking-[0.2em] text-modura-secondary uppercase">
                                    {blog.date}
                                </p>

                                <h3 className="mt-2 text-xl leading-7 font-bold text-[#0b1d33]">{blog.title}</h3>

                                <p className="mt-4 text-sm leading-6 text-[#596a79]">{blog.desc}</p>

                                {/* CREATIVE BUTTON */}

                                <button className="group/btn mt-7 flex items-center gap-3 text-sm font-bold tracking-wider text-[#0b1d33] uppercase">
                                    <span className="relative after:absolute after:bottom-[-6px] after:left-0 after:h-[2px] after:w-full after:bg-modura-secondary after:transition-all after:duration-500 group-hover/btn:after:w-[40%]">
                                        Read More
                                    </span>

                                    <span className="flex h-8 w-8 items-center justify-center border border-modura-secondary text-modura-secondary transition-all duration-500 group-hover/btn:bg-modura-secondary group-hover/btn:text-white">
                                        <FiArrowUpRight />
                                    </span>
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
