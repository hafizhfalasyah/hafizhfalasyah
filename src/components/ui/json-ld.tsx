import type { JsonLdGraph } from "@/lib/json-ld";

/** `<` di-escape agar isi data tidak bisa menutup tag script. */
export function JsonLd({ data }: { data: JsonLdGraph }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
