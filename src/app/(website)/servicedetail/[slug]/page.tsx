
import type { Metadata } from "next";

import ServiceDetailClient from "./ServiceDetailClient";
import ServiceDetailJsonLd from "@/components/ServiceDetailJsonLd";
import { getServiceDetailSeo } from "@/lib/seo";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://modura-design-group-next.vercel.app"
).replace(/\/+$/, "");

// Remove HTML from description
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

// Get HTML attribute from headScript
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

// Extract OG and Twitter tags
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

// Extract canonical from headScript
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

// Validate SEO URLs
function validUrl(
  value?: string | null
): string | undefined {
  if (!value) return undefined;

  // Ignore dummy image placeholders
  if (
    value.includes("REPLACE_WITH_") ||
    value.includes("PLACEHOLDER")
  ) {
    return undefined;
  }

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

// Revalidate SEO cache
export const revalidate = 60;

// Dynamic metadata for each service
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const service = await getServiceDetailSeo(slug);

  if (!service) {
    return {
      title: "Service Not Found | Modura Design Group",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const head = service.headScript || "";

  const title =
    stripHtml(service.metaTitle) ||
    service.title ||
    "Modura Design Group";

  const description =
    stripHtml(service.metaDescription) ||
    stripHtml(service.shortDescription) ||
    stripHtml(service.description).slice(0, 160);

  const keywords = service.metaKeyword
    ?.split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  // Fallback service URL
  const fallbackUrl = new URL(
    `/servicedetail/${encodeURIComponent(slug)}`,
    SITE_URL
  ).href;

  const canonical =
    validUrl(getCanonical(head)) ||
    fallbackUrl;

  // Open Graph values
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
    ) || validUrl(service.imageUrl);

  // Twitter values
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
      title: ogTitle,
      description: ogDescription,
      url: ogUrl,
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
                  ) || service.title,
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
                  ) || service.title,
              },
            ],
          }
        : {}),
    },
  };
}

// Service Detail Server Page
export default async function ServiceDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;

  return (
    <>
      <ServiceDetailJsonLd slug={slug} />
      <ServiceDetailClient key={slug} />
    </>
  );
}
