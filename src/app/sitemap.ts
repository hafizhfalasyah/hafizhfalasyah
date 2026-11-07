import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { absoluteUrl, languageAlternates, pagePaths } from "@/lib/seo";

/** Tanpa `lastModified`: tanggal yang tidak akurat lebih buruk daripada tidak ada. */
export default function sitemap(): MetadataRoute.Sitemap {
  return pagePaths.flatMap((path) =>
    locales.map((locale) => ({
      url: absoluteUrl(`/${locale}${path}`),
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
