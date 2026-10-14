
import type { Metadata } from "next";

import BlogClient from "./BlogClient";

import SeoJsonLd from "@/components/SeoJsonLd";

import { generateSeoMetadata } from "@/lib/seo";

// Refresh SEO metadata periodically
export const revalidate = 60;

// Dynamic Blog SEO
export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata("blog", "/blog");
}

// Blog Page
export default function BlogPage() {
  return (
    <>
      <SeoJsonLd pageKey="blog" />

      <BlogClient />
    </>
  );
}
