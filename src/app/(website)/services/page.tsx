
import type { Metadata } from "next";

import ServicesClient from "./ServicesClient";

import SeoJsonLd from "@/components/SeoJsonLd";

import { generateSeoMetadata } from "@/lib/seo";

// SEO cache revalidation
export const revalidate = 60;

// Dynamic Services Listing SEO
export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata("services", "/services");
}

// Services Listing Page
export default function ServicesPage() {
  return (
    <>
      <SeoJsonLd pageKey="services" />

      <ServicesClient />
    </>
  );
}
