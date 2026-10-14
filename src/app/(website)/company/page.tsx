
import type { Metadata } from "next";

import CompanyClient from "./CompanyClient";

import SeoJsonLd from "@/components/SeoJsonLd";

import { generateSeoMetadata } from "@/lib/seo";

// SEO cache refresh
export const revalidate = 60;

// Dynamic About Us SEO
export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata("company", "/company");
}

// About Us Page
export default function CompanyPage() {
  return (
    <>
      <SeoJsonLd pageKey="company" />

      <CompanyClient />
    </>
  );
}
