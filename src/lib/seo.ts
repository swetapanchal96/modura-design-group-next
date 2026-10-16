import type { Metadata } from "next";
import { apiUrl } from '@/app/(website)/config';

export interface SeoData {
  id: number;
  pageKey: string;
  pageName: string;
  metaTitle: string | null;
  metaKeyword: string | null;
  metaDescription: string | null;
  headScript: string | null;
  bodyScript: string | null;
}

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://modura-design-group-next.vercel.app"
).replace(/\/+$/, "");

const API_BASE = (
  apiUrl || "https://modura.salexo.co.in/api/v1"
).replace(/\/+$/, "");

function stripHtml(value?: string | null): string {
  if (!value) return "";

  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function getAttribute(
  tag: string,
  attribute: string
): string | undefined {
  const match = tag.match(
    new RegExp(
      `\\b${attribute}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`,
      "i"
    )
  );

  return match?.[1] ?? match?.[2];
}

function getMetaContent(
  html: string,
  key: string,
  value: string
): string | undefined {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];

  for (const tag of tags) {
    if (
      getAttribute(tag, key)?.toLowerCase() ===
      value.toLowerCase()
    ) {
      return getAttribute(tag, "content");
    }
  }

  return undefined;
}

function getCanonical(html: string): string | undefined {
  const links = html.match(/<link\b[^>]*>/gi) ?? [];

  for (const link of links) {
    if (
      getAttribute(link, "rel")?.toLowerCase() ===
      "canonical"
    ) {
      return getAttribute(link, "href");
    }
  }

  return undefined;
}

function validUrl(
  value?: string | null
): string | undefined {
  if (!value) return undefined;

  try {
    const url = new URL(value, SITE_URL);

    if (!["https:", "http:"].includes(url.protocol)) {
      return undefined;
    }

    return url.href;
  } catch {
    return undefined;
  }
}

export async function getSeoData(
  pageKey: string
): Promise<SeoData | null> {
  try {
    const response = await fetch(
      `${API_BASE}/seopageKey`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pageKey }),

        // Refresh cached SEO data every 60 seconds
        next: {
          revalidate: 60,
          tags: [`seo-${pageKey}`],
        },
      }
    );

    if (!response.ok) return null;

    const result = await response.json();

    if (!result.success || !result.data) {
      return null;
    }

    return result.data as SeoData;
  } catch (error) {
    console.error(`SEO API Error (${pageKey}):`, error);
    return null;
  }
}

export async function generateSeoMetadata(
  pageKey: string,
  pathname: string = "/"
): Promise<Metadata> {
  const seo = await getSeoData(pageKey);

  const head = seo?.headScript ?? "";

  const title =
    stripHtml(seo?.metaTitle) ||
    "Modura Design Group";

  const description =
    stripHtml(seo?.metaDescription) ||
    "Architectural, structural engineering and BIM services.";

  const keywords = seo?.metaKeyword
    ?.split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const fallbackCanonical = new URL(
    pathname,
    SITE_URL
  ).href;

  const canonical =
    validUrl(getCanonical(head)) ||
    fallbackCanonical;

  const ogTitle =
    getMetaContent(head, "property", "og:title") ||
    title;

  const ogDescription =
    getMetaContent(
      head,
      "property",
      "og:description"
    ) || description;

  const ogImage = validUrl(
    getMetaContent(head, "property", "og:image")
  );

  const twitterImage = validUrl(
    getMetaContent(head, "name", "twitter:image")
  );

  const ogUrl =
    validUrl(
      getMetaContent(head, "property", "og:url")
    ) || canonical;

  return {
    metadataBase: new URL(SITE_URL),

    title,
    description,
    keywords,

    alternates: {
      canonical,
    },

    openGraph: {
      type: "website",
      url: ogUrl,
      title: ogTitle,
      description: ogDescription,
      siteName: "Modura Design Group",
      ...(ogImage
        ? {
            images: [
              {
                url: ogImage,
                alt:
                  getMetaContent(
                    head,
                    "property",
                    "og:image:alt"
                  ) || title,
              },
            ],
          }
        : {}),
    },

    twitter: {
      card: "summary_large_image",
      title:
        getMetaContent(
          head,
          "name",
          "twitter:title"
        ) || title,

      description:
        getMetaContent(
          head,
          "name",
          "twitter:description"
        ) || description,

      ...(twitterImage || ogImage
        ? {
            images: [twitterImage || ogImage!],
          }
        : {}),
    },
  };
}


export interface BlogDetailSeo {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  headScript: string | null;
  bodyScript: string | null;
  imageUrl: string | null;
  publishedAt: string | null;
}

export async function getBlogDetailSeo(
  slug: string
): Promise<BlogDetailSeo | null> {
  if (!slug) return null;

  try {
    const response = await fetch(`${API_BASE}/blogDetail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug }),

      next: {
        revalidate: 60,
        tags: [`blog-seo-${slug}`],
      },
    });

    if (!response.ok) return null;

    const result = await response.json();

    if (!result.success || !result.data) {
      return null;
    }

    return result.data as BlogDetailSeo;
  } catch (error) {
    console.error("Blog Detail SEO API Error:", error);
    return null;
  }
}



export interface ServiceDetailSeo {
  id: number;
  title: string;
  slug: string;
  shortDescription: string | null;
  description: string | null;
  metaTitle: string | null;
  metaKeyword: string | null;
  metaDescription: string | null;
  headScript: string | null;
  bodyScript: string | null;
  imageUrl: string | null;
}

export async function getServiceDetailSeo(
  slug: string
): Promise<ServiceDetailSeo | null> {
  if (!slug) return null;

  try {
    const response = await fetch(
      `${API_BASE}/serviceDetail`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug }),
        next: {
          revalidate: 60,
          tags: [`service-seo-${slug}`],
        },
      }
    );

    if (!response.ok) return null;

    const result = await response.json();

    if (
      result.success !== true ||
      !result.data ||
      result.data.slug !== slug
    ) {
      return null;
    }

    return result.data as ServiceDetailSeo;
  } catch (error) {
    console.error(
      `Service Detail SEO Error (${slug}):`,
      error
    );
    return null;
  }
}



export interface SoftwareExpertiseSeo {
  id: number;
  name: string;
  slug: string;
  shortDescription: string | null;
  longDescription: string | null;
  metaTitle: string | null;
  metaKeyword: string | null;
  metaDescription: string | null;
  headScript: string | null;
  bodyScript: string | null;
  imageUrl: string | null;
}

export async function getSoftwareExpertiseSeo(
  slug: string
): Promise<SoftwareExpertiseSeo | null> {
  if (!slug) return null;

  try {
    const response = await fetch(
      `${API_BASE}/softwareExpertise`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug }),

        next: {
          revalidate: 60,
          tags: [`software-seo-${slug}`],
        },
      }
    );

    if (!response.ok) return null;

    const result = await response.json();

    if (
      result.success !== true ||
      !result.data
    ) {
      return null;
    }

    // API may return an array or a single object
    const data = result.data;

    const software: SoftwareExpertiseSeo | null =
      Array.isArray(data)
        ? data.find(
            (item: SoftwareExpertiseSeo) =>
              item.slug === slug
          ) ?? null
        : data.slug === slug
          ? data
          : null;

    return software;
  } catch (error) {
    console.error(
      `Software Expertise SEO Error (${slug}):`,
      error
    );

    return null;
  }
}




export interface PortfolioCategorySeo {
  id: number;
  name: string;
  slug: string;
  metaTitle: string | null;
  metaKeyword: string | null;
  metaDescription: string | null;
  headScript: string | null;
  bodyScript: string | null;
}

interface PortfolioSeoItem {
  id: number;
  coverUrl?: string | null;
  category: PortfolioCategorySeo | null;
}

interface PortfolioSeoResponse {
  success: boolean;
  data?: {
    items?: PortfolioSeoItem[];
  };
}

export interface PortfolioSeoResult {
  category: PortfolioCategorySeo;
  imageUrl: string | null;
}

export async function getPortfolioCategorySeo(
  slug: string
): Promise<PortfolioSeoResult | null> {
  if (!slug) return null;

  const types: Array<"3d" | "2d"> = ["3d", "2d"];

  for (const type of types) {
    try {
      const response = await fetch(
        `${API_BASE}/portfolios`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            category: slug,
            type,
          }),
          next: {
            revalidate: 60,
            tags: [`portfolio-seo-${slug}`],
          },
        }
      );

      if (!response.ok) continue;

      const result =
        (await response.json()) as PortfolioSeoResponse;

      if (!result.success) continue;

      const items = result.data?.items;

      if (!Array.isArray(items)) continue;

      // SEO must come from the category object
      const selectedItem = items.find(
        (item) =>
          item.category &&
          item.category.slug === slug
      );

      if (selectedItem?.category) {
        return {
          category: selectedItem.category,
          imageUrl: selectedItem.coverUrl ?? null,
        };
      }
    } catch (error) {
      console.error(
        `Portfolio SEO API Error (${slug}, ${type}):`,
        error
      );
    }
  }

  return null;
}
