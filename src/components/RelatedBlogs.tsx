'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { FiArrowUpRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

import Link from 'next/link';
import DOMPurify from 'dompurify';

interface HomeBlog {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    imageUrl: string | null;
    publishedAt: string;
}

interface RelatedBlogsProps {
    blogs: HomeBlog[];
}

const getBlogExcerpt = (
    description: string | null,
    limit = 130
) => {
    if (!description) return '';

    const plainText = DOMPurify.sanitize(description, {
        ALLOWED_TAGS: [],
        ALLOWED_ATTR: [],
    })
        .replace(/\u00a0/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    return plainText.length > limit
        ? `${plainText.slice(0, limit).trimEnd()}...`
        : plainText;
};

const formatBlogDate = (date: string) => {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return '';

    return parsedDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC',
    });
};

export default function RelatedBlogs({
    blogs,
}: RelatedBlogsProps) {
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

            className="bg-modura-white relative overflow-hidden py-20"
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
                            <span className="text-modura-secondary ml-2"> A Smarter Built World</span>
                        </h2>
                    </div>

                    {/* <button className="border border-[#0b1d33] px-6 py-3 text-xs font-bold tracking-wider text-[#0b1d33] uppercase transition-all duration-500 hover:bg-[#0b1d33] hover:text-white">
                        View All Blogs
                    </button> */}
                </div>

                {/* BLOG GRID */}

                <div className="grid grid-cols-3 gap-8">
                    {blogs.slice(0, 3).map((blog, index) => (
                        <article
                            key={blog.id}

                            className="blog-card group relative overflow-hidden bg-white shadow-[0_15px_40px_rgba(11,29,51,0.08)]"
                        >
                            {/* IMAGE */}

                            <div className="relative h-[230px] overflow-hidden">
                                <Link
                                    href={`/blogdetail/${encodeURIComponent(blog.slug)}`}
                                    className="block h-full w-full"
                                    aria-label={`Read ${blog.title}`}
                                >
                                {blog.imageUrl && (
                                    <Image
                                        src={blog.imageUrl}
                                        unoptimized
                                        fill
                                        alt={blog.title}
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                )}

                                {/* image overlay */}

                                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1d33]/50 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                                </Link>
                            </div>

                            <div className="p-7">
                                <p className="text-modura-secondary text-xs font-semibold tracking-[0.2em] uppercase">
                                    {formatBlogDate(blog.publishedAt)}
                                </p>

                                <h3 className="mt-2 text-xl leading-7 font-bold text-[#0b1d33]">
                                    <Link href={`/blogdetail/${encodeURIComponent(blog.slug)}`}>{blog.title}</Link></h3>

                                <p className="mt-4 text-sm leading-6 text-[#596a79]">{getBlogExcerpt(blog.description, 130)}</p>

                                {/* CREATIVE BUTTON */}

                                <Link
                                    href={`/blogdetail/${encodeURIComponent(blog.slug)}`}
                                    className="group/btn mt-7 flex items-center gap-3 text-sm font-bold tracking-wider text-[#0b1d33] uppercase">
                                    <span className="after:bg-modura-secondary relative after:absolute after:bottom-[-6px] after:left-0 after:h-[2px] after:w-full after:transition-all after:duration-500 group-hover/btn:after:w-[40%]">
                                        Read More
                                    </span>

                                    <span className="border-modura-secondary text-modura-secondary group-hover/btn:bg-modura-secondary flex h-8 w-8 items-center justify-center border transition-all duration-500 group-hover/btn:text-white">
                                        <FiArrowUpRight />
                                    </span>
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
