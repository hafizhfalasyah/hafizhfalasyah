import type { Metadata } from "next";
import { ThemeScript } from "@/components/shell/theme-script";
import { Logo } from "@/components/ui/logo";
import { ui } from "@/content/ui";
import { martianMono, monaSans } from "@/lib/fonts";
import { locales } from "@/lib/i18n";
import "./globals.css";

export const metadata: Metadata = {
  title: `404, ${ui.id.notFound.title}`,
  robots: { index: false },
};

/**
 * Berada di luar `[locale]`, jadi bahasanya belum diketahui: kedua bahasa tampil bersama. Tema
 * memakai skrip yang sama dengan halaman lain, jadi tidak ada kilatan warna.
 */
export default function GlobalNotFound() {
  return (
    <html lang="id" className={`${monaSans.variable} ${martianMono.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-dvh flex-col">
        <main id="main" tabIndex={-1} className="page-grid w-full flex-1 content-between gap-y-16 py-6">
          <Logo className="col-span-full size-8" />
          <div className="col-span-full flex flex-col gap-8">
            <p aria-hidden="true" className="type-name">
              404
            </p>
            <div className="grid gap-8 md:grid-cols-2">
              {locales.map((locale) => {
                const { title, body, back } = ui[locale].notFound;
                return (
                  <div key={locale} lang={locale} className="flex flex-col items-start gap-2">
                    {locale === "id" ? <h1 className="text-sub font-bold">{title}</h1> : <p className="text-sub font-bold">{title}</p>}
                    <p className="text-ink-2">{body}</p>
                    <a href={`/${locale}`} className="flex min-h-12 items-center font-medium underline hover:text-ink-2">
                      {back}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
