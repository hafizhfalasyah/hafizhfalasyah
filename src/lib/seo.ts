import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { defaultLocale, type Locale, locales } from "./i18n";

function resolveSiteUrl(): string {
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const configured = process.env.NEXT_PUBLIC_SITE_URL || (vercel ? `https://${vercel}` : "http://localhost:3000");
  return configured.replace(/\/+$/, "");
}

export const siteUrl = resolveSiteUrl();

export const siteName = `${profile.name.first} ${profile.name.last}`;

const openGraphLocale: Record<Locale, string> = { id: "id_ID", en: "en_US" };

/** Path halaman tanpa segmen locale. Sumber tunggal untuk sitemap dan `llms.txt`. */
export const pagePaths: string[] = ["", "/about", ...projects.map(({ slug }) => `/projects/${slug}`)];

export function absoluteUrl(path: string): string {
  return `${siteUrl}${path}`;
}

/** `x-default` menunjuk versi bahasa default: `/` hanya mengalihkan, jadi tidak layak jadi target hreflang. */
export function languageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) languages[locale] = absoluteUrl(`/${locale}${path}`);
  languages["x-default"] = absoluteUrl(`/${defaultLocale}${path}`);
  return languages;
}

type PageMetadataInput = {
  locale: Locale;
  /** Path tanpa segmen locale, misalnya `/about`. */
  path: string;
  title: string;
  description: string;
  type?: "website" | "profile" | "article";
  /**
   * Hanya untuk halaman tanpa `opengraph-image.tsx` di segmennya sendiri (About): `openGraph` di halaman
   * anak membuang gambar dari segmen induk, sedangkan bila diisi di halaman lain ia menimpa gambar file.
   */
  inheritLocaleImage?: boolean;
};

export function pageMetadata({
  locale,
  path,
  title,
  description,
  type = "website",
  inheritLocaleImage = false,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(`/${locale}${path}`);
  // Kuncinya harus benar-benar tidak ada: `images: undefined` pun membuang gambar file.
  const image = inheritLocaleImage
    ? {
        images: [{ url: `/${locale}/opengraph-image`, width: 1200, height: 630, alt: `${siteName}, ${profile.role}` }],
      }
    : {};
  return {
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName,
      locale: openGraphLocale[locale],
      alternateLocale: locales.filter((other) => other !== locale).map((other) => openGraphLocale[other]),
      ...image,
    },
    twitter: { card: "summary_large_image", title, description, ...image },
  };
}
