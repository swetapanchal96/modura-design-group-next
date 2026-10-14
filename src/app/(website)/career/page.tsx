
import type { Metadata } from "next";

import CareerClient from "./CareerClient";

import SeoJsonLd from "@/components/SeoJsonLd";

import { generateSeoMetadata } from "@/lib/seo";

// Revalidate SEO every 60 seconds
export const revalidate = 60;

// Dynamic Career SEO
export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata("career", "/career");
}

// Career Page
export default function CareerPage() {
  return (
    <>
      <SeoJsonLd pageKey="career" />

      <CareerClient />
    </>
  );
}
