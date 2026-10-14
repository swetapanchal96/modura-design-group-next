export default function SeoJsonLd({
    json,
}: {
    json: string | null | undefined;
}) {
    if (!json) return null;

    const match = json.match(
        /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i
    );

    if (!match?.[1]) return null;

    const content = match[1].trim();

    try {
        JSON.parse(content);
    } catch {
        return null;
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: content,
            }}
        />
    );
}