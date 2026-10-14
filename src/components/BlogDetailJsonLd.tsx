
import { getBlogDetailSeo } from "@/lib/seo";

export default async function BlogDetailJsonLd({
  slug,
}: {
  slug: string;
}) {
  const blog = await getBlogDetailSeo(slug);

  if (!blog?.headScript) return null;

  const scripts = [
    ...blog.headScript.matchAll(
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
