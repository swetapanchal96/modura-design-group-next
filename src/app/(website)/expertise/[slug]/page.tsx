
import type { Metadata } from "next";

import SoftwareExpertiseClient from "./SoftwareExpertiseClient";
import SoftwareExpertiseJsonLd from "@/components/SoftwareExpertiseJsonLd";

import { getSoftwareExpertiseSeo } from "@/lib/seo";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://modura-design-group-next.vercel.app"
).replace(/\/+$/, "");

// Remove HTML tags
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

// Extract attribute from HTML tag
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

// Extract OG / Twitter meta content
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

// Extract canonical URL
function getCanonical(
  html: string
): string | undefined {
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

// Validate image / canonical / OG URLs
function validUrl(
  value?: string | null
): string | undefined {
  if (!value) return undefined;

  if (
    value.includes("REPLACE_WITH_") ||
    value.includes("PLACEHOLDER")
  ) {
    return undefined;
  }

  try {
    const url = new URL(value, SITE_URL);

    if (!["http:", "https:"].includes(url.protocol)) {
      return undefined;
    }

    return url.href;
  } catch {
    return undefined;
  }
}

// SEO cache refresh
export const revalidate = 60;

// Dynamic SEO for each software
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const software = await getSoftwareExpertiseSeo(slug);

  if (!software) {
    return {
      title: "Software Expertise Not Found | Modura Design Group",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const head = software.headScript || "";

  const title =
    stripHtml(software.metaTitle) ||
    software.name ||
    "Modura Design Group";

  const description =
    stripHtml(software.metaDescription) ||
    stripHtml(software.shortDescription) ||
    stripHtml(software.longDescription).slice(0, 160);

  const keywords = software.metaKeyword
    ?.split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  // Fallback canonical URL
  const fallbackUrl = new URL(
    `/expertise/${encodeURIComponent(slug)}`,
    SITE_URL
  ).href;

  const canonical =
    validUrl(getCanonical(head)) ||
    fallbackUrl;

  // Open Graph
  const ogTitle =
    getMetaContent(
      head,
      "property",
      "og:title"
    ) || title;

  const ogDescription =
    getMetaContent(
      head,
      "property",
      "og:description"
    ) || description;

  const ogUrl =
    validUrl(
      getMetaContent(
        head,
        "property",
        "og:url"
      )
    ) || canonical;

  const ogImage =
    validUrl(
      getMetaContent(
        head,
        "property",
        "og:image"
      )
    ) || validUrl(software.imageUrl);

  // Twitter
  const twitterTitle =
    getMetaContent(
      head,
      "name",
      "twitter:title"
    ) || title;

  const twitterDescription =
    getMetaContent(
      head,
      "name",
      "twitter:description"
    ) || description;

  const twitterImage =
    validUrl(
      getMetaContent(
        head,
        "name",
        "twitter:image"
      )
    ) || ogImage;

  const twitterCard =
    getMetaContent(
      head,
      "name",
      "twitter:card"
    ) === "summary"
      ? "summary"
      : "summary_large_image";

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
                  ) || software.name,
              },
            ],
          }
        : {}),
    },

    twitter: {
      card: twitterCard,
      title: twitterTitle,
      description: twitterDescription,

      ...(twitterImage
        ? {
            images: [
              {
                url: twitterImage,
                alt:
                  getMetaContent(
                    head,
                    "name",
                    "twitter:image:alt"
                  ) || software.name,
              },
            ],
          }
        : {}),
    },
  };
}

// Software Expertise Server Page
export default async function SoftwareExpertisePage({
  params,
}: PageProps) {
  const { slug } = await params;

  return (
    <>
      <SoftwareExpertiseJsonLd slug={slug} />
      <SoftwareExpertiseClient key={slug} />
    </>
  );
}
