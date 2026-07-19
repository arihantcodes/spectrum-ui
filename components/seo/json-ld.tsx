type JsonLdValue = Record<string, unknown> | Array<Record<string, unknown>>;

interface JsonLdProps {
  id: string;
  data: JsonLdValue;
}

export function serializeJsonLd(data: JsonLdValue) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

/** Render JSON-LD in the server response without waiting for hydration. */
export function JsonLd({ id, data }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
