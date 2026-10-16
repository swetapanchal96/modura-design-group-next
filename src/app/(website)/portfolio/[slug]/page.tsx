
import type { Metadata } from "next";

import PortfolioClient from "./PortfolioClient";
import PortfolioJsonLd from "@/components/PortfolioJsonLd";

import { getPortfolioCategorySeo } from "@/lib/seo";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function stripHtml(value?: string | null): string | null {
  if (!value) return null;

  const text = value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();

  return text || null;
}

function getAttribute(
  tag: string,
  attribute: string
): string | null {
  const match = tag.match(
    new RegExp(
      `\\b${attribute}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`,
      "i"
    )
  );

  return match?.[1] ?? match?.[2] ?? null;
}

function getMetaContent(
  html: string,
  key: string,
  value: string
): string | null {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];

  for (const tag of tags) {
    if (
      getAttribute(tag, key)?.toLowerCase() ===
      value.toLowerCase()
    ) {
      return getAttribute(tag, "content");
    }
  }

  return null;
}

function getCanonical(html: string): string | null {
  const links = html.match(/<link\b[^>]*>/gi) ?? [];

  for (const link of links) {
    if (
      getAttribute(link, "rel")?.toLowerCase() ===
      "canonical"
    ) {
      return getAttribute(link, "href");
    }
  }

  return null;
}

function validUrl(value?: string | null): string | null {
  if (!value) return null;

  try {
    const url = new URL(value);

    if (
      url.protocol !== "https:" &&
      url.protocol !== "http:"
    ) {
      return null;
    }

    return url.href;
  } catch {
    return null;
  }
}

export const revalidate = 60;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const result = await getPortfolioCategorySeo(slug);

  // No static SEO fallback
  if (!result?.category) {
    return {
      title: null,
      description: null,
      keywords: null,
      alternates: {
        canonical: null,
      },
      openGraph: null,
      twitter: null,
    };
  }

  // ONLY CATEGORY SEO DATA
  const category = result.category;
  const head = category.headScript || "";

  const title = stripHtml(category.metaTitle);
  const description = stripHtml(category.metaDescription);

  const keywords = category.metaKeyword
    ? category.metaKeyword
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : null;

  const canonical = validUrl(getCanonical(head));

  const ogTitle = getMetaContent(
    head,
    "property",
    "og:title"
  );

  const ogDescription = getMetaContent(
    head,
    "property",
    "og:description"
  );

  const ogUrl = validUrl(
    getMetaContent(head, "property", "og:url")
  );

  const ogImage = validUrl(
    getMetaContent(head, "property", "og:image")
  );

  const ogImageAlt = getMetaContent(
    head,
    "property",
    "og:image:alt"
  );

  const twitterTitle = getMetaContent(
    head,
    "name",
    "twitter:title"
  );

  const twitterDescription = getMetaContent(
    head,
    "name",
    "twitter:description"
  );

  const twitterImage = validUrl(
    getMetaContent(head, "name", "twitter:image")
  );

  const twitterImageAlt = getMetaContent(
    head,
    "name",
    "twitter:image:alt"
  );

  const twitterCard = getMetaContent(
    head,
    "name",
    "twitter:card"
  );

  const ogType = getMetaContent(
    head,
    "property",
    "og:type"
  );

  const hasOpenGraph = Boolean(
    ogTitle ||
    ogDescription ||
    ogUrl ||
    ogImage ||
    ogType
  );

  const hasTwitter = Boolean(
    twitterTitle ||
    twitterDescription ||
    twitterImage ||
    twitterCard
  );

  return {
    title,
    description,
    keywords,

    alternates: {
      canonical,
    },

    openGraph: hasOpenGraph
      ? {
          ...(ogType === "article"
            ? { type: "article" as const }
            : ogType === "website"
              ? { type: "website" as const }
              : {}),

          ...(ogTitle ? { title: ogTitle } : {}),
          ...(ogDescription
            ? { description: ogDescription }
            : {}),
          ...(ogUrl ? { url: ogUrl } : {}),

          ...(ogImage
            ? {
                images: [
                  {
                    url: ogImage,
                    ...(ogImageAlt ? { alt: ogImageAlt } : {}),
                  },
                ],
              }
            : {}),
        }
      : null,

    twitter: hasTwitter
      ? {
          ...(twitterCard === "summary" ||
          twitterCard === "summary_large_image" ||
          twitterCard === "player" ||
          twitterCard === "app"
            ? { card: twitterCard }
            : {}),

          ...(twitterTitle ? { title: twitterTitle } : {}),
          ...(twitterDescription
            ? { description: twitterDescription }
            : {}),

          ...(twitterImage
            ? {
                images: [
                  {
                    url: twitterImage,
                    ...(twitterImageAlt
                      ? { alt: twitterImageAlt }
                      : {}),
                  },
                ],
              }
            : {}),
        }
      : null,
  };
}

export default async function PortfolioPage({
  params,
}: PageProps) {
  const { slug } = await params;

  return (
    <>
      <PortfolioJsonLd slug={slug} />
      <PortfolioClient key={slug} />
    </>
  );
}
