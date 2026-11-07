import { getImageProps } from "next/image";
import { type PhotoId, photoAlt, photoFiles } from "@/content/photos";
import type { Locale } from "@/lib/i18n";

type PhotoProps = {
  id: PhotoId;
  locale: Locale;
  sizes: string;
  /** Hanya untuk foto LCP. */
  priority?: boolean;
  /** Foto sedikit lebih tinggi dari bingkainya; kelebihannya menjadi ruang gerak parallax. */
  parallax?: boolean;
  /** Bingkai parallax dengan rasio dari CSS, untuk foto yang dipotong; tanpa ini mengikuti rasio asli foto. */
  frameClassName?: string;
  className?: string;
};

/** Hanya mencantumkan lebar yang benar-benar ada, agar browser tidak menganggap foto kecil lebih tajam dari aslinya. */
function honestSrcSet(srcSet: string | undefined, largest: number, fallback: string): string {
  const candidates = (srcSet ?? "").split(", ").filter((candidate) => {
    const descriptor = Number.parseInt(candidate.split(" ")[1] ?? "", 10);
    return descriptor <= largest;
  });
  return candidates.length > 0 ? candidates.join(", ") : `${fallback} ${largest}w`;
}

export function Photo({ id, locale, sizes, priority = false, parallax = false, frameClassName, className }: PhotoProps) {
  const { width, height } = photoFiles[id];
  const common = { alt: photoAlt[id][locale], width, height, sizes, className };

  const avif = getImageProps({ ...common, src: `/photos/${id}.avif` }).props;
  const { srcSet: webpSrcSet, ...image } = getImageProps({
    ...common,
    src: `/photos/${id}.webp`,
    loading: priority ? "eager" : "lazy",
    fetchPriority: priority ? "high" : undefined,
  }).props;

  const picture = (
    <picture>
      <source type="image/avif" sizes={sizes} srcSet={honestSrcSet(avif.srcSet, width, avif.src)} />
      <source type="image/webp" sizes={sizes} srcSet={honestSrcSet(webpSrcSet, width, image.src)} />
      <img {...image} alt={common.alt} />
    </picture>
  );

  if (!parallax) return picture;

  return (
    <div
      data-parallax=""
      className={`parallax-frame ${frameClassName ?? ""}`}
      style={frameClassName ? undefined : { aspectRatio: `${width} / ${height}` }}
    >
      {picture}
    </div>
  );
}
