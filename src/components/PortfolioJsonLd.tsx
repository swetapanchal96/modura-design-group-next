
import { getPortfolioCategorySeo } from "@/lib/seo";

export default async function PortfolioJsonLd({
  slug,
}: {
  slug: string;
}) {
  const result = await getPortfolioCategorySeo(slug);

  const head = result?.category.headScript;

  if (!head) return null;

  const scripts = [
    ...head.matchAll(
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
