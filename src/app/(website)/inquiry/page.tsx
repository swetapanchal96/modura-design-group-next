
import type { Metadata } from "next";

import InquiryClient from "./InquiryClient";

import SeoJsonLd from "@/components/SeoJsonLd";

import { generateSeoMetadata } from "@/lib/seo";

// Refresh SEO cache every 60 seconds
export const revalidate = 60;

// Dynamic Inquiry SEO
export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata("inquiry", "/inquiry");
}

// Inquiry Page
export default function InquiryPage() {
  return (
    <>
      <SeoJsonLd pageKey="inquiry" />

      <InquiryClient />
    </>
  );
}
