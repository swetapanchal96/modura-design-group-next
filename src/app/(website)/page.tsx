import type { Metadata } from 'next';
import axios from 'axios';

import HomeClient from './HomeClient';
import { apiUrl } from './config';
import SeoJsonLd from '@/components/SeoJsonLd';

interface SeoData {
    id: number;
    pageKey: string;
    pageName: string;
    metaTitle: string | null;
    metaKeyword: string | null;
    metaDescription: string | null;
    headScript: string | null;
    bodyScript: string | null;
}

interface SeoResponse {
    success: boolean;
    message: string;
    data: SeoData | null;
}

/**
 * Get SEO data from API
 */
async function getHomeSeo(): Promise<SeoData | null> {
    try {
        const response = await axios.post<SeoResponse>(
            `${apiUrl}/seopageKey`,
            {
                pageKey: 'home',
            },
            {
                timeout: 10000,
            }
        );

        if (
            response.data?.success === true &&
            response.data?.data
        ) {
            return response.data.data;
        }

        return null;
    } catch (error) {
        console.error('Home SEO API Error:', error);
        return null;
    }
}

/**
 * Extract a meta attribute from headScript
 */
function getMetaContent(
    html: string | null,
    attribute: string,
    value: string
): string | undefined {
    if (!html) return undefined;

    const regex = new RegExp(
        `<meta[^>]+${attribute}=["']${value}["'][^>]+content=["']([^"']*)["'][^>]*>`,
        'i'
    );

    const match = html.match(regex);

    return match?.[1];
}

/**
 * Extract canonical URL
 */
function getCanonicalUrl(
    html: string | null
): string | undefined {
    if (!html) return undefined;

    const match = html.match(
        /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/i
    );

    return match?.[1];
}

export async function generateMetadata(): Promise<Metadata> {
    const seo = await getHomeSeo();

    if (!seo) {
        return {
            title: 'Modura Design Group',
        };
    }

    const canonical = getCanonicalUrl(seo.headScript);

    const ogTitle =
        getMetaContent(
            seo.headScript,
            'property',
            'og:title'
        ) || seo.metaTitle || undefined;

    const ogDescription =
        getMetaContent(
            seo.headScript,
            'property',
            'og:description'
        ) || seo.metaDescription || undefined;

    const ogImage =
        getMetaContent(
            seo.headScript,
            'property',
            'og:image'
        );

    const twitterTitle =
        getMetaContent(
            seo.headScript,
            'name',
            'twitter:title'
        ) || seo.metaTitle || undefined;

    const twitterDescription =
        getMetaContent(
            seo.headScript,
            'name',
            'twitter:description'
        ) || seo.metaDescription || undefined;

    const twitterImage =
        getMetaContent(
            seo.headScript,
            'name',
            'twitter:image'
        );

    return {
        title: seo.metaTitle || seo.pageName,

        description:
            seo.metaDescription
                ?.replace(/<[^>]*>/g, '')
                .trim() || undefined,

        keywords: seo.metaKeyword || undefined,

        alternates: canonical
            ? {
                  canonical,
              }
            : undefined,

        openGraph: {
            type: 'website',
            title: ogTitle,
            description: ogDescription,
            url: canonical,
            images:
                ogImage &&
                !ogImage.includes('REPLACE_WITH')
                    ? [
                          {
                              url: ogImage,
                          },
                      ]
                    : undefined,
        },

        twitter: {
            card: 'summary_large_image',
            title: twitterTitle,
            description: twitterDescription,
            images:
                twitterImage &&
                !twitterImage.includes('REPLACE_WITH')
                    ? [twitterImage]
                    : undefined,
        },
    };
}

export default async function HomePage() {
    const seo = await getHomeSeo();
    return <>
            <SeoJsonLd json={seo?.headScript} />

            <HomeClient />
        </>
}