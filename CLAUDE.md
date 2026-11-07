# Portofolio Hafizh Falasyah

Website portofolio statis dwibahasa. Konteks produk: `PRODUCT.md`. Sistem visual: `DESIGN.md`. Rencana: `docs/plan.md`.
Fakta konten hanya berasal dari `docs/Profil Lengkap Hafizh Falasyah — Konten Website Portofolio.md`.

## Stack
- Next.js 16 App Router (RSC, SSG), TypeScript 7 strict, Tailwind CSS 4, pnpm, deploy ke Vercel.
- Animasi hanya GSAP (`ScrollTrigger`, `SplitText`) lewat `@gsap/react`, dan Lenis yang disinkronkan ke `gsap.ticker`.
- Tanpa backend, form server, CMS, state manager, analytics pihak ketiga, atau library ikon.

## Perintah
- `pnpm dev`, `pnpm build`, `pnpm start`
- `pnpm lint`, `pnpm typecheck`
- `pnpm photos`: grading foto dari `assets/photos/source` ke `public/photos`
- `pnpm check`: pemeriksaan rilis (nomor telepon, foto terlarang, em dash, teks terlarang, metadata, hreflang, sitemap, heading, struktur JSON-LD)

## Struktur
```text
src/app/[locale]/      route: beranda, about, projects/[slug], metadata per locale
src/app/               file global: sitemap, robots, llms.txt, ikon, global-not-found
src/sections/          section per halaman (home, about, project); Server Component
src/components/shell/  nav, footer, loader, transisi, tema, bahasa, kursor
src/components/motion/ island GSAP; selalu client dan di-lazy-load
src/components/ui/     Photo, Logo, JsonLd, tautan
src/content/           data bertipe dwibahasa; satu-satunya tempat teks
src/lib/               i18n, seo, json-ld, format periode, loader foto, setup GSAP
scripts/               grading foto, pemeriksaan rilis
assets/photos/source/  foto asli; tidak pernah disajikan
```

## Konvensi
- File dan folder kebab-case; komponen dan tipe PascalCase; token CSS kebab-case.
- Server Component secara default. `'use client'` hanya untuk island interaktif.
- Teks tidak ditulis di JSX. Setiap rekaman memakai `L10n<T>` agar terjemahan yang hilang gagal saat typecheck.
- Hapus kode, file, dan dependensi yang tidak terpakai pada perubahan yang sama.

## Desain
- Hanya token OKLCH netral (chroma 0) dari `globals.css`; kedua tema wajib lolos WCAG AA.
- Radius 0. Grid 4/8/12 kolom. Setiap section memakai keluarga layout yang berbeda.
- Font: Mona Sans, dan Martian Mono hanya untuk teknologi dan periode; self-host via `next/font`.
- Foto hanya hasil `pnpm photos`; teks di atas foto wajib diukur kontrasnya.
- Proyek tanpa cover memakai plate tipografi, tidak pernah mockup palsu.

## Motion
- Setiap animasi harus bisa dijelaskan tujuannya dalam satu kalimat.
- Hanya `transform` dan `opacity`. Breakpoint dan reduced motion lewat `gsap.matchMedia`.
- SSR tidak pernah menyembunyikan konten; status awal animasi di-set oleh JS.
- Animasi lewat `useGSAP` dengan scope dan cleanup; jumlah ScrollTrigger kembali ke nilai awal setelah navigasi.
- Touch tidak bergantung pada hover. Kursor kustom dan magnetic hanya untuk `pointer: fine`.

## Performa
- Lighthouse mobile di URL Vercel: performa ≥ 85, kategori lain ≥ 95; LCP < 2.5s, CLS < 0.1, INP < 200ms. Pengukuran lokal hanya untuk membandingkan perubahan.
- GSAP dan Lenis tidak masuk chunk kritis. Foto LCP `fetchPriority="high"`; foto lain lazy dengan `sizes` yang tepat.

## Aksesibilitas
- HTML semantik, skip link, fokus terlihat, navigasi keyboard, alt text, urutan baca sama dengan urutan DOM.
- Fokus berpindah ke `main` setelah transisi halaman.

## Keamanan dan privasi
- Security headers di `next.config.ts`. Perubahan CSP harus tetap nol pelanggaran di console.
- Nomor telepon tidak boleh ada di HTML, metadata, atau JSON-LD. Satu-satunya pengecualian: CV PDF di `public/cv/`.
- `foto-2` dan `foto-5` tidak boleh ada di output publik, dan file aslinya tidak di-commit.
- Tanpa secret di client. `dangerouslySetInnerHTML` hanya untuk skrip tema, loader, dan JSON-LD yang di-escape.

## Definisi done
1. `pnpm lint`, `pnpm typecheck`, `pnpm build`, dan `pnpm check` lolos.
2. Semua rute tetap SSG.
3. Screenshot Playwright MCP 375/768/1440, kedua tema, kedua bahasa sudah ditinjau.
4. Reduced motion, tanpa JS, dan keyboard sudah dicek untuk bagian yang berubah.
5. Acceptance criteria fase di `docs/plan.md` terpenuhi dan hasilnya dilaporkan apa adanya.

## Larangan
- Gradient ungu/biru, glassmorphism, card grid seragam, eyebrow chip, emoji ikon, copy generik, lorem ipsum.
- Metrik, testimoni, logo klien, atau fakta yang tidak ada di profil; terjemahan tidak boleh menambah fakta.
- Em dash dan en dash pada teks yang terlihat.
- Font terlarang: Inter, Geist, Space Grotesk, Plus Jakarta Sans, Fraunces, Instrument Sans, dan daftar Impeccable. Pengecualian: Mona Sans tetap font proyek ini walau ada di daftar internal detector Impeccable (keputusan pemilik, 2026-11-07).
- Library animasi lain, `next-intl`, `next-themes`, atau dependensi baru tanpa alasan tertulis.
- Commit, push, atau deploy tanpa permintaan eksplisit.
