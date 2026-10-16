
import { getSoftwareExpertiseSeo } from "@/lib/seo";

export default async function SoftwareExpertiseJsonLd({
  slug,
}: {
  slug: string;
}) {
  const software = await getSoftwareExpertiseSeo(slug);

  if (!software?.headScript) return null;

  const scripts = [
    ...software.headScript.matchAll(
      /<script\b([^>]*)>([\s\S]*?)<\/script>/gi
    ),
  ];

  const schemas = scripts.flatMap((match) => {
    const attributes = match[1];
    const content = match[2];

    if (
      !/\btype\s*=\s*["']application\/ld\+json["']/i.test(
        attributes
      )
    ) {
      return [];
    }

    try {
      return [JSON.parse(content)];
    } catch {
      return [];
    }
  });

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`${slug}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(
              /</g,
              "\\u003c"
            ),
          }}
        />
      ))}
    </>
  );
}
