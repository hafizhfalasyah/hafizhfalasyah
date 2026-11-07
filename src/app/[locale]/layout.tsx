import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { LoaderScreen, LoaderScript } from "@/components/shell/loader-screen";
import { MotionLoader } from "@/components/shell/motion-loader";
import { SiteFooter } from "@/components/shell/site-footer";
import { SiteNav } from "@/components/shell/site-nav";
import { SkipLink } from "@/components/shell/skip-link";
import { ThemeScript } from "@/components/shell/theme-script";
import { TransitionProvider } from "@/components/shell/transition-link";
import { navItems } from "@/content/nav";
import { profile } from "@/content/profile";
import { ui } from "@/content/ui";
import { martianMono, monaSans } from "@/lib/fonts";
import { isLocale, type Locale, locales } from "@/lib/i18n";
import { siteName, siteUrl } from "@/lib/seo";
import { themeColors } from "@/lib/theme";
import "../globals.css";

type LocaleParams = { params: Promise<{ locale: string }> };

export const dynamicParams = false;

export function generateStaticParams(): { locale: Locale }[] {
  return locales.map((locale) => ({ locale }));
}

/** Judul, deskripsi, canonical, dan OG ditulis per halaman lewat `pageMetadata`. */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  // Mencegah browser seluler menebak angka sebagai nomor telepon.
  formatDetection: { telephone: false },
};

/** Mengikuti tema sistem; saat tema dipilih manual, `theme-switch` menyamakan kedua meta. */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: themeColors.light },
    { media: "(prefers-color-scheme: dark)", color: themeColors.dark },
  ],
};

export default async function LocaleLayout({ children, params }: LocaleParams & { children: ReactNode }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = ui[locale];
  const items = navItems(locale);

  return (
    // `data-theme`, `data-js`, dan status loader diset skrip inline sebelum hidrasi.
    <html lang={locale} className={`${monaSans.variable} ${martianMono.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
        <LoaderScript />
      </head>
      <body className="flex min-h-dvh flex-col">
        <SkipLink label={t.skipToContent} />
        <LoaderScreen skipLabel={t.loader.skip} steps={t.loader.steps} />
        <TransitionProvider>
          <SiteNav locale={locale} items={items} cvHref={profile.cvHref} t={t} />
          <main id="main" tabIndex={-1} className="flex-1">
            {children}
          </main>
          <SiteFooter locale={locale} items={items} t={t} />
        </TransitionProvider>
        <MotionLoader />
      </body>
    </html>
  );
}
