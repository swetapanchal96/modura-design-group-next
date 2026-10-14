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