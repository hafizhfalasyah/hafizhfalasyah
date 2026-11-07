import manifest from "../content/photos.generated.json";

type PhotoEntry = { widths: number[] };

/**
 * Loader `next/image`: memetakan lebar yang diminta ke file hasil `pnpm photos`.
 * Tidak ada pengoptimalan di server, jadi grading tidak dikompres ulang.
 */
export default function photoLoader({ src, width }: { src: string; width: number }): string {
  const match = /^\/photos\/([\w-]+)\.(avif|webp)$/.exec(src);
  const entry = match ? (manifest as Record<string, PhotoEntry>)[match[1] ?? ""] : undefined;
  if (!match || !entry) return src;

  const largest = entry.widths[entry.widths.length - 1];
  const file = entry.widths.find((candidate) => candidate >= width) ?? largest;
  return `/photos/${match[1]}-${file}.${match[2]}`;
}
