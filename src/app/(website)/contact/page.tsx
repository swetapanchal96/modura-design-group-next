
import type { Metadata } from "next";

import ContactClient from "./ContactClient";

import SeoJsonLd from "@/components/SeoJsonLd";

import { generateSeoMetadata } from "@/lib/seo";

// SEO cache revalidation
export const revalidate = 60;

// Dynamic Contact Us SEO
export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata("contact-us", "/contact");
}

// Contact Us Page
export default function ContactPage() {
  return (
    <>
      <SeoJsonLd pageKey="contact-us" />

      <ContactClient />
    </>
  );
}
