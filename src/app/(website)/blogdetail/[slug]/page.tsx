
import type { Metadata } from "next";

import BlogDetailClient from "./BlogDetailClient";

import {
  getBlogDetailSeo,
} from "@/lib/seo";
import BlogDetailJsonLd from "@/components/BlogDetailJsonLd";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://modura-design-group-next.vercel.app"
).replace(/\/+$/, "");

// Convert HTML description into plain text
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

// Extract HTML attribute safely
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

// Extract meta tag content from headScript
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

// Validate absolute or relative URL
function validUrl(
  value?: string | null
): string | undefined {
  if (!value) return undefined;

  try {
    const url = new URL(value, SITE_URL);

    if (
      !["https:", "http:"].includes(url.protocol)
    ) {
      return undefined;
    }

    return url.href;
  } catch {
    return undefined;
  }
}

// Refresh data every 60 seconds
export const revalidate = 60;

// Dynamic metadata for each blog
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const blog = await getBlogDetailSeo(slug);

  if (!blog) {
    return {
      title: "Blog Not Found | Modura Design Group",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const head = blog.headScript || "";

  const title =
    stripHtml(blog.metaTitle) ||
    blog.title ||
    "Modura Design Group";

  const description =
    stripHtml(blog.metaDescription) ||
    stripHtml(blog.description).slice(0, 160);

  const fallbackUrl = new URL(
    `/blogdetail/${encodeURIComponent(slug)}`,
    SITE_URL
  ).href;

  const canonical =
    validUrl(getCanonical(head)) ||
    fallbackUrl;

  const ogTitle =
    getMetaContent(head, "property", "og:title") ||
    title;

  const ogDescription =
    getMetaContent(
      head,
      "property",
      "og:description"
    ) || description;

  const ogImage =
    validUrl(
      getMetaContent(
        head,
        "property",
        "og:image"
      )
    ) || validUrl(blog.imageUrl);

  const twitterImage =
    validUrl(
      getMetaContent(
        head,
        "name",
        "twitter:image"
      )
    ) || ogImage;

  return {
    metadataBase: new URL(SITE_URL),

    title,
    description,

    alternates: {
      canonical,
    },

    openGraph: {
      type: "article",
      title: ogTitle,
      description: ogDescription,
      url:
        validUrl(
          getMetaContent(
            head,
            "property",
            "og:url"
          )
        ) || canonical,

      ...(blog.publishedAt
        ? {
            publishedTime: blog.publishedAt,
          }
        : {}),

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
                  ) || blog.title,
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

      ...(twitterImage
        ? {
            images: [twitterImage],
          }
        : {}),
    },
  };
}

// Blog detail server page
export default async function BlogDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;

  return (
    <>
    <BlogDetailJsonLd slug={slug} />
      <BlogDetailClient key={slug} />
    </>
  );
}
