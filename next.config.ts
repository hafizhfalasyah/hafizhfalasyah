import type { NextConfig } from "next";
import { defaultLocale, localeCookie, locales } from "./src/lib/i18n";

const isDev = process.env.NODE_ENV === "development";

/**
 * Tanpa nonce, karena nonce mewajibkan render dinamis dan rute ini SSG. `script-src 'unsafe-inline'`
 * tetap diperlukan oleh skrip tema, loader, dan payload RSC per halaman (Keputusan 4 di docs/plan.md;
 * hasil uji SRI ada di sana). Selain itu semua directive sekeras yang bisa dipakai situs statis tanpa
 * form: GSAP hanya menulis `element.style` dan tidak memakai `eval`.
 */
const contentSecurityPolicy = [
  "default-src 'none'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  `style-src 'self'${isDev ? " 'unsafe-inline'" : ""}`,
  // Atribut `style` dari React (rasio foto) dan GSAP; tag `<style>` tetap diblokir.
  "style-src-attr 'unsafe-inline'",
  "img-src 'self'",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws:" : ""}`,
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'none'",
  "form-action 'none'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  // Tanpa includeSubDomains dan preload sampai memakai domain sendiri (Keputusan 5).
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "accelerometer=(), browsing-topics=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Instruksi proyek ada di CLAUDE.md; tanpa ini `next dev` menulis ulang AGENTS.md.
  agentRules: false,
  // Wajib karena root layout berada di `[locale]`: URL di luar locale tidak punya layout lain.
  experimental: { globalNotFound: true },
  images: {
    loader: "custom",
    loaderFile: "./src/lib/photo-loader.ts",
    deviceSizes: [480, 640, 828, 1200, 1600, 2000],
    imageSizes: [],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Nama file foto tidak ber-hash, jadi bukan `immutable`: hasil grading baru tetap sampai dalam 30 hari.
      {
        source: "/photos/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
      // CV memuat nomor telepon (Keputusan 3): tetap bisa diunduh, tetapi tidak masuk indeks pencarian.
      { source: "/cv/:file*", headers: [{ key: "X-Robots-Tag", value: "noindex" }] },
    ];
  },
  // Dialihkan sebelum rendering: rute tetap SSG dan tidak ada komputasi per request.
  // Urutan: cookie pilihan pengguna, lalu bahasa utama browser, lalu default.
  async redirects() {
    const toLocale = (locale: string) => `/${locale}`;
    return [
      ...locales.map((locale) => ({
        source: "/",
        has: [{ type: "cookie" as const, key: localeCookie, value: locale }],
        destination: toLocale(locale),
        permanent: false,
      })),
      {
        source: "/",
        has: [{ type: "header" as const, key: "accept-language", value: "^en(?:[-,;].*)?$" }],
        destination: toLocale("en"),
        permanent: false,
      },
      { source: "/", destination: toLocale(defaultLocale), permanent: false },
    ];
  },
};

export default nextConfig;
