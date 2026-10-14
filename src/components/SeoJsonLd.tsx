import { getSeoData } from "@/lib/seo";

export default async function SeoJsonLd({
  pageKey,
}: {
  pageKey: string;
}) {
  const seo = await getSeoData(pageKey);

  if (!seo?.headScript) return null;

  const matches = [
    ...seo.headScript.matchAll(
      /<script\b([^>]*)>([\s\S]*?)<\/script>/gi
    ),
  ];

  const schemas = matches.flatMap((match) => {
    if (
      !/\btype\s*=\s*["']application\/ld\+json["']/i.test(
        match[1]
      )
    ) {
      return [];
    }

    try {
      return [JSON.parse(match[2])];
    } catch {
      return [];
    }
  });

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`${pageKey}-${index}`}
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