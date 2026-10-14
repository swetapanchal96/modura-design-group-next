import type { Metadata } from "next";

import HomeClient from "./HomeClient";
import SeoJsonLd from "@/components/SeoJsonLd";
import { generateSeoMetadata } from "@/lib/seo";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata("home", "/");
}

export default function HomePage() {
  return (
    <>
      <SeoJsonLd pageKey="home" />
      <HomeClient />
    </>
  );
}