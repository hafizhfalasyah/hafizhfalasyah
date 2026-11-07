# Rencana Portofolio Hafizh Falasyah

Design read: portofolio engineer yang berfokus pada backend untuk recruiter dan tech lead, dengan bahasa visual monochrome editorial yang presisi, dibangun di atas sistem tipe dan grid buatan sendiri, bukan design system siap pakai.

Dial: `DESIGN_VARIANCE=8`, `MOTION_INTENSITY=7`, `VISUAL_DENSITY=3`.

## Konteks

Repo saat ini tidak berisi aplikasi: scaffold Next.js di commit `24eb90c` sudah terhapus dari working tree. Yang ada hanya `PRODUCT.md`, file profil, CV, dan tujuh foto. Tujuannya adalah portofolio yang setara situs Awwwards, tetapi setiap kalimat dan efeknya bisa dipertanggungjawabkan ke fakta di profil.

Plan ini punya tiga bagian sesuai permintaan: isi `CLAUDE.md`, isi `docs/plan.md`, dan daftar keputusan. Kedua file baru ditulis setelah plan disetujui.

## Temuan yang perlu Anda ketahui lebih dulu

| Temuan | Dampak |
| --- | --- |
| `CV - Hafizh Falasyah.pdf` sudah ada, dan **mencantumkan nomor telepon Anda** | Bertentangan dengan keputusan "kontak tanpa nomor telepon". Lihat Keputusan 3 |
| Permintaan menyebut **tujuh** foto diterbitkan ke `public/`, sedangkan `PRODUCT.md` melarang `foto-2` dan `foto-5` terbit | Lihat Keputusan 2 |
| CSP berbasis nonce **mewajibkan render dinamis** dan mematikan cache CDN (dokumentasi Next.js) | Bertentangan dengan SSG. Lihat Keputusan 4 |
| `www.govindabraenterprise.com` mengembalikan **503** pada semua uji hari ini; versi tanpa `www` juga 503 | Tautan situs Govind bisa rusak. Lihat Keputusan 5 |
| Keempat repo GitHub proyek publik (200), `hismaya.com` hidup (200) | `PRODUCT.md` perlu diperbarui |
| Lighthouse selalu melihat kunjungan pertama, artinya selalu melihat loading screen | Loading screen adalah risiko terbesar untuk target skor awal (95, kini 85 lewat Keputusan 7). Ada gate pengukuran di Fase 2 |
| Playwright MCP **tidak tersedia** di sesi ini; pnpm belum terpasang (corepack 0.34.6 tersedia) | Prasyarat sebelum Fase 1, lihat di bawah |
| Next.js 16.4.5 mendukung TypeScript 7.0.2 lewat `tsc` lokal; prop `priority` pada `next/image` sudah deprecated | Dipakai langsung di stack |
| GSAP 3.15.1 memakai lisensi "standard no charge": penggunaan komersial dan plugin seperti SplitText gratis | Bukan lisensi MIT, tetapi tidak membatasi kasus ini |

### Prasyarat sebelum Fase 1
1. Playwright MCP: jalankan `! claude mcp add playwright -- npx @playwright/mcp@latest`, lalu mulai ulang sesi. Tanpa ini, verifikasi screenshot yang Anda minta tidak bisa berjalan.
2. pnpm: saya menjalankan `corepack enable pnpm` di awal Fase 1, dan memakai `npm i -g pnpm` jika gagal.

## 2.1 Arah desain

Yang harus dihindari ada dua. Yang pertama adalah portofolio developer standar: hero, grid skill, kartu proyek, timeline. Yang kedua lebih halus: kata "editorial" mudah jatuh ke pola AI yang sudah umum, yaitu garis tipis ala koran, serif italic besar, dan label mono kecil yang direnggangkan. Kedua konsep di bawah menolak keduanya.

Konsep A berasal dari proses acak Impeccable, yang memang dirancang untuk menghindari jawaban default. Konsep B adalah kandidat teratas saya sendiri.

### Konsep A: Modul

- **Ide:** seluruh halaman berdiri di atas satu modul. Grid adalah struktur penahan beban dan konten hanya mengisinya. Motion bergerak per langkah modul, bukan melayang bebas.
- **Gaya rujukan:** *Grid Systems* karya Josef Müller-Brockmann dan Unigrid karya Massimo Vignelli.
- **Alasan cocok:** presisi dan tenang secara alami, sangat mudah dipindai recruiter, dan "struktur dulu" ditunjukkan lewat tata letak.
- **Viewport pertama:** kelima foto tersusun sebagai klaster modul asimetris, dengan `foto-7` paling besar. Nama mengisi satu pita penuh, sedangkan tagline, CV, dan kontak mengisi modul di bawahnya.
- **Interaksi khas, Re-grid:** saat di-scroll, foto berpindah per langkah modul menuju posisinya di section berikutnya, sehingga halaman terasa seperti satu lembar layout yang menyusun ulang dirinya.
- **Risiko jujur:** ini arah yang paling familier di Awwwards. Foto diri mendominasi sebelum karya terlihat, dan pesan backend baru terbaca lewat teks.

### Konsep B: Maket (rekomendasi)

- **Ide:** halaman diperlakukan sebagai maket kartu yang disusun dari bawah ke atas, persis mengikuti kalimat di profil Anda: *"Saya memulai dari model data, alur bisnis, dan hak akses, lalu membangun tampilan di atas fondasi itu."*
- **Gaya rujukan:** aksonometri Auguste Choisy dan maket kartu arsitektur. Sengaja bukan blueprint: kedalaman datang dari bidang bernada solid, bukan garis tipis.
- **Alasan cocok:** efek utamanya adalah klaim Anda sendiri yang sedang didemonstrasikan. Portofolio lain tidak bisa menyalinnya tanpa kehilangan makna, dan tech lead langsung membaca cara berpikir Anda.
- **Viewport pertama:** nama dalam ukuran sangat besar melintasi plate `foto-7`, di area dinding di atas kepala. Bagian nama di atas foto selalu berwarna gelap, sedangkan di luar foto mengikuti tema, sehingga di tema gelap warnanya berbalik tepat di tepi plate. Tagline, Unduh CV, dan Mari terhubung terlihat tanpa scroll.
- **Teknik nama:** salinan `aria-hidden` dari nama dipotong oleh plate, bukan `mix-blend-mode: difference`. Dinding `foto-7` terukur di nilai 0,44 sampai 0,70, padahal `difference` butuh latar di luar 0,34 sampai 0,66 untuk mencapai 3:1, dan mendekati 1:1 di nilai 0,50. Tinta gelap di atas dinding yang sama mencapai sekitar 3,8:1 setelah sisi kiri foto yang lebih gelap dipotong. Teknik ini juga tidak memicu repaint saat scroll.

```text
┌────────────────────────────────────────────────────────────────────┐
│ HF          Proyek  Pengalaman  Tentang  Mari terhubung   ID  Tema │
│                                                                    │
│ Hafizh                         ┌───────────────────────┐           │
│                                │                       │           │
│ Falasyah ──────────────────────┼───── melintasi ───┐   │           │
│                                │      plate foto-7     │           │
│ Software Engineer              │                       │           │
│ Membangun perangkat lunak...   │                       │           │
│ Unduh CV    Mari terhubung     │                       │           │
└────────────────────────────────┴───────────────────────┴───────────┘
```

- **Interaksi khas, Susun Lapis:** section di-pin selama sekitar 180svh (Keputusan 9). Plate hero miring menjadi aksonometri tanpa perspektif dan menjadi lapisan "Tampilan". Tiga lapisan lain muncul di bawahnya, lalu tersusun satu per satu dari bawah sambil kalimat profil terbaca kata demi kata. Setelah itu tumpukan kembali rata dan lapisan teratas berubah menjadi section Proyek.
- **Isi tiap lapisan:** teks nyata dari Keahlian Teknis, bukan skema buatan.

| Lapisan | Isi |
| --- | --- |
| Tampilan | React.js, Next.js, Tailwind CSS |
| Hak akses | Autentikasi, RBAC, Google OAuth, password hashing |
| Alur bisnis | REST API, MVC, Repository Pattern, Service Layer |
| Model data | MySQL, PostgreSQL, desain database relasional, migrasi database |

- **Perluasan ke elemen lain:** loading screen, transisi halaman, tumpukan proyek, dan logo memakai satu bahasa yang sama, yaitu plate.
- **Risiko jujur:** tumpukan isometrik familier dari situs pemasaran SaaS. Yang menjauhkannya dari template: isinya teks nyata, yang miring adalah halaman itu sendiri, dan tiap lapisan berasal dari kalimat Anda. Pin yang panjang juga bisa mengganggu recruiter, sehingga navigasi selalu bisa melompatinya.

**Rekomendasi: Konsep B.** Pengujinya sederhana: jika pengunjung pergi setelah satu menit, apa yang masih ia ingat sejam kemudian? Untuk A, kemungkinan besar "situs Swiss yang rapi". Untuk B, "situs yang menyusun dirinya sesuai kalimat orang itu". B juga lebih menyatu sebagai sistem dan lebih kuat menyampaikan identitas backend, yang menjadi inti `PRODUCT.md`.

**3D:** B tidak memakai WebGL. CSS 3D dengan GSAP memberi efek yang setara untuk bidang datar, tanpa tambahan library, sedangkan three.js menambah sekitar 150 KB gzip. Ini memenuhi syarat "pilih opsi termurah", dan semua teks tetap bisa di-crawl.

### Arah lain yang ditimbang

| Arah | Putusan | Alasan | Disiplin yang dipinjam (berlaku untuk konsep terpilih) |
| --- | --- | --- | --- |
| Spread Harper's Bazaar era Brodovitch | Ditolak | Kuat untuk foto, tetapi tidak menyampaikan sisi engineering | Pose dan jawaban: setiap foto dibalas satu gestur tipografi, tidak ada foto dekoratif |
| Plane sinematik multiplane | Kompetitif | Unggul di kejelasan lapisan, kalah di kedekatan dengan audiens, dan butuh aset lukis yang tidak ada. Sumbu ini sudah dipegang Konsep B, dan Anda meminta dua konsep | Teks selalu di bidang terdekat; jumlah bidang berkurang di ponsel; membeku jadi komposisi utuh saat reduced motion |
| Osiloskop | Ditolak | Hijau fosfor melanggar monochrome; kostum alat | Setiap ukuran diturunkan dari satu modul, tanpa nilai lepas |
| Minihompy | Ditolak | Nada tidak sesuai | Objek utama tetap utuh di semua lebar, panel yang menyusun ulang di sekitarnya |
| Papan tanda pasar malam | Ditolak | Warna dan nada tidak sesuai | Rute keluar sederhana: CV dan kontak selalu satu langkah dari mana pun |
| Kalender acar | Ditolak | Tidak relevan | Label seragam: setiap proyek memakai kolom sama (Peran, Periode, Teknologi) agar bisa dibandingkan |

## 2.2 Sistem desain

Ditulis untuk Konsep B. Jika memilih A, hanya bahasa motion dan interaksi khas yang berubah.

### Token warna

Semua chroma 0. Rasio kontras dihitung, bukan diperkirakan. Foto grayscale memakai netral yang sama sehingga menyatu dengan UI.

| Token | Light | Dark | Kontras di `canvas` (L / D) | Peran |
| --- | --- | --- | --- | --- |
| `--canvas` | `oklch(0.985 0 0)` | `oklch(0.145 0 0)` | - | Latar halaman |
| `--plate-1` | `oklch(0.955 0 0)` | `oklch(0.19 0 0)` | - | Plate pertama |
| `--plate-2` | `oklch(0.92 0 0)` | `oklch(0.235 0 0)` | - | Plate kedua |
| `--plate-3` | `oklch(0.88 0 0)` | `oklch(0.28 0 0)` | - | Plate ketiga |
| `--ink` | `oklch(0.18 0 0)` | `oklch(0.96 0 0)` | 18.01 / 17.62 | Teks utama |
| `--ink-2` | `oklch(0.38 0 0)` | `oklch(0.76 0 0)` | 9.59 / 9.22 | Teks sekunder |
| `--ink-3` | `oklch(0.50 0 0)` | `oklch(0.64 0 0)` | 5.75 / 5.88 | Meta, hanya di `canvas` dan `plate-1` |
| `--line` | `oklch(0.86 0 0)` | `oklch(0.30 0 0)` | 1.47 / 1.45 | Pemisah dekoratif, bukan untuk kontrol |
| `--edge` | `oklch(0.60 0 0)` | `oklch(0.52 0 0)` | 3.78 / 3.59 | Fokus dan batas kontrol (minimum 3:1) |

Di `plate-2` dan `plate-3`, teks hanya boleh memakai `--ink` atau `--ink-2`. Tema disimpan di `data-theme` pada `<html>`, diset oleh skrip inline sebelum paint, dan tanpa JS jatuh ke `prefers-color-scheme`.

### Tiga opsi pairing font

Semua tersedia di `next/font/google` sebagai variable font dan dilayani dari domain sendiri. Ukuran adalah file woff2 subset latin yang diukur hari ini.

| Opsi | Pairing | Ukuran | Alasan | Risiko |
| --- | --- | --- | --- | --- |
| **1 (rekomendasi)** | **Mona Sans** (`wdth` 75-125, `wght` 200-900) + **Martian Mono** (`wght`) | 95 + 23 KB | Satu file memberi tiga suara: lebar dan berat untuk nama, normal untuk teks, sempit untuk meta. Hirarki datang dari satu keluarga sehingga terasa sebagai sistem | Paling berat; karena itu hanya Mona Sans yang di-preload |
| 2 | **Schibsted Grotesk** + **Sometype Mono** | 45 + 16 KB | Dibuat untuk grup media berita, jadi editorial tanpa serif, dan sangat nyaman dibaca | Lebih netral, viewport pertama lebih bergantung pada komposisi |
| 3 | **Brygada 1918** + **Hanken Grotesk** | 22 + 33 KB | Serif berkarakter dokumen resmi, senada dengan Surat Pencatatan Ciptaan; paling ringan | Paling dekat dengan pola serif editorial AI |

Aturan mono: hanya untuk nama teknologi dan periode, tidak pernah uppercase dengan tracking lebar. Glyph panah `↗` diperiksa di Fase 1; jika tidak ada di font, dipakai satu ikon `@phosphor-icons/react` sesuai aturan taste skill. Teks memakai `font-variant-numeric: tabular-nums` untuk angka periode.

### Type scale

| Token | Ukuran | Pemakaian |
| --- | --- | --- |
| `--step--1` | `clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)` | Meta |
| `--step-0` | `clamp(1rem, 0.96rem + 0.2vw, 1.125rem)` | Teks |
| `--step-1` | `clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem)` | Lead |
| `--step-2` | `clamp(1.75rem, 1.5rem + 1.2vw, 2.25rem)` | Subjudul |
| `--step-3` | `clamp(2.5rem, 2rem + 2.5vw, 3.5rem)` | Judul section |
| `--display-s` | `clamp(3rem, 8vw, 7rem)` | Nama proyek |
| `--display-l` | `clamp(3.5rem, 16vw, 19rem)` | Nama di hero |

Teks dibatasi 65ch. Ukuran `--display-l` difinalkan dengan pengukuran agar "Falasyah" tidak meluap pada lebar 360px.

### Spacing, grid, dan bentuk

- **Spacing:** dasar 4px, dengan langkah 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192.
- **Jarak antar section:** `clamp(6rem, 14vw, 12rem)`, sesuai density 3.
- **Grid:** 4 kolom di bawah 768px, 8 kolom sampai 1279px, 12 kolom di atasnya, dengan lebar maksimal 1760px.
- **Gutter:** 16px (360), 24px (768), 32px (1440), 40px (1920).
- **Bentuk:** radius 0 di semua elemen, karena plate adalah kartu yang dipotong.
- **Lapisan z-index:** konten, plate, nav, kursor, transisi, loader, skip link; didefinisikan sebagai token.

### Bahasa motion

| Aspek | Nilai |
| --- | --- |
| Easing masuk | `expo.out` |
| Easing tutup dan buka plate | `power4.inOut` |
| Scrub | `none`, dengan `scrub: true` karena Lenis sudah menghaluskan |
| Durasi | Mikro 0.18s, pendek 0.32s, dasar 0.6s, panjang 0.9s |
| Stagger | 0.06s |
| Lenis | `lerp: 0.1`, `anchors: true`, touch tetap native |

Setiap efek punya alasan:

| Efek | Tempat | Yang dikomunikasikan |
| --- | --- | --- |
| Pin dan scrub | Susun Lapis, hero ke Proyek | Sistem dibangun dari bawah ke atas |
| Parallax berlapis | Nama dan foto hero, foto Kontak | Kedalaman antar plate |
| Text reveal per baris | Judul section lewat `SplitText` dengan mask | Urutan baca |
| Sticky stack | Proyek | Proyek bertumpuk seperti plate |
| Magnetic | CTA utama | Umpan balik saat target didekati |
| Kursor kustom | Hanya `pointer: fine` | Label tindakan di atas plate proyek; kursor asli tetap terlihat |

Aturan tegas: SSR tidak pernah menyembunyikan konten. Semua status awal animasi diset oleh JS, sehingga tanpa JS semua konten tetap terlihat dan CLS tetap nol. Tidak ada animasi `opacity: 0` pada elemen LCP.

Saat `prefers-reduced-motion`: Lenis, pin, parallax, magnetic, kursor, dan loader dimatikan, dan transisi halaman menjadi instan.

Di bawah 1024px tidak ada 3D. Susun Lapis menjadi plate `position: sticky` yang bertumpuk.

### Loading screen

Empat plate naik satu per satu, dan setiap plate mewakili satu pekerjaan nyata yang selesai: HTML terbaca, font siap (`document.fonts`), foto hero ter-decode, dan aplikasi siap. Setelah lengkap, plate terangkat dan hero yang sudah ter-render di bawahnya terlihat.

- **Pemicu:** skrip inline membaca `sessionStorage` sebelum paint. Tanpa JS, reduced motion, atau `saveData`, loader tidak pernah muncul.
- **Batas waktu:** target 1.2 detik, batas JS 2 detik, dan animasi CSS failsafe di 2.4 detik agar halaman tidak pernah terkunci meski JS gagal.
- **Skip:** tombol Lewati, klik, atau tombol apa pun di keyboard.
- **Implementasi:** CSS murni, supaya GSAP tidak perlu masuk chunk kritis. Hero dirender penuh sejak HTML pertama.
- **Gate:** diukur di Fase 2. Jika skor di bawah target, batasnya diturunkan bertahap ke 1.2 detik, lalu 0.8 detik, lalu loader dimatikan saat koneksi lambat. Target Lighthouse menang atas durasi loader; keduanya tetap terpenuhi karena 2 detik adalah batas atas.

### Transisi halaman

`TransitionLink` membungkus `next/link` dan tetap merender `<a>`, jadi klik dengan modifier dan buka di tab baru tetap normal.

1. Dua plate menutup layar dari bawah (0.4 detik), menampilkan nama halaman tujuan jika tujuannya proyek.
2. `router.push` berjalan dan scroll direset di balik penutup.
3. Plate terangkat ke atas (0.5 detik) setelah rute siap, lalu fokus pindah ke `main`.

Tombol back dan forward melewati fase menutup. Layer ini berada di layout, sehingga Lenis dan kursor tetap hidup di antara halaman.

### Logo

Monogram ligatur HF dari persegi panjang saja (5 `rect`, `fill="currentColor"`): tiang tengah H sekaligus menjadi tiang F, dengan palang H dan lengan tengah F berada pada satu garis. Karena dibentuk dari plate, logo langsung terbaca sebagai bagian dari sistem dan tetap jelas di 16px.

```text
█     █████
█     █
███████████
█     █
█     █
```

Turunannya: `icon.svg` yang mengikuti tema sistem, `apple-icon` dan OG lewat `next/og`, serta wordmark "Hafizh Falasyah" dari Mona Sans lebar. Geometri final diperiksa pada 16, 32, dan 180px di Fase 1.

### Foto

`scripts/grade-photos.mjs` menjalankan langkah berikut, identik untuk setiap foto:

1. Rotasi otomatis sesuai EXIF (empat foto memakai orientasi 8).
2. Channel mix tetap lewat `recomb`, supaya kotak hydrant merah dan bangku biru tidak punya bobot berbeda antar foto.
3. Konversi grayscale, lalu kurva tone S dari satu LUT 256 entri yang sama.
4. Resize ke lebar 480, 828, 1200, 1600, 2000, tanpa pembesaran.
5. Grain dengan PRNG ber-seed, diterapkan setelah resize supaya ukuran butirnya sama di semua lebar.
6. Ekspor AVIF dan WebP tanpa metadata, plus manifest dimensi untuk mencegah CLS.

Foto disajikan lewat `getImageProps` dan `<picture>` dengan `loaderFile` khusus yang memetakan lebar ke file yang sudah dibuat. Tidak ada pengoptimalan di server, jadi grading tidak dikompres ulang dan tidak memakai kuota Vercel. Grain membuat file lebih besar, sehingga ada anggaran ukuran yang diperiksa skrip.

| Foto | Dimensi setelah rotasi | Peran |
| --- | --- | --- |
| `foto-7` | 2847 × 3797 | Hero |
| `foto-4` | 4000 × 6000 | Pengalaman, dipasangkan dengan pendidikan |
| `foto-6` | 2320 × 3093 | Kontak, penutup halaman |
| `foto-3` | 4000 × 6000 | About, Penghargaan dan Hak Cipta |
| `foto-1` | 331 × 441 | About, maksimal sekitar 165px lebar di layar 2x kecuali file asli tersedia |

## 2.3 Peta informasi

Beranda untuk pemindaian cepat, About untuk pendalaman. Judul section memakai judul dari profil. Tidak ada eyebrow.

### `/[locale]`: Beranda

| Section | Konten dari profil | Keluarga layout |
| --- | --- | --- |
| Hero | Headline, Tagline, Unduh CV, Mari terhubung; `foto-7` | Tipografi besar melintasi plate foto |
| Struktur | Prinsip "Struktur sebelum antarmuka", kalimat lapisan, Keahlian Teknis terkait | Pin 3D Susun Lapis |
| Proyek Unggulan | Kalimat pembuka; lima plate proyek: nama, peran, periode, tautan ke studi kasus | Sticky stack dengan ukuran berbeda |
| Pengalaman Profesional | Solveit Indonesia, KKN, Universitas Negeri Malang dengan IPK dan Cum Laude; `foto-4` | Kolom periode sticky dengan rincian |
| Keahlian Teknis | Kalimat pembuka dan 10 kategori | Relasi interaktif |
| Kontak | Kalimat CTA, email, LinkedIn, GitHub, CV, lokasi; `foto-6` | Foto penuh dengan kontak besar |

**Keahlian Teknis sebagai join:** memilih satu teknologi menyorot proyek yang memakainya, dengan data yang sama persis dari baris "Teknologi" di profil. Misalnya PostgreSQL menyorot Hismaya, dan Midtrans menyorot Kripiku serta Mentorin. Ini menggantikan progress bar palsu, menjawab pertanyaan recruiter ("pernah pakai Laravel di mana?"), dan menunjukkan pola pikir relasional. Komponennya memakai `<button aria-pressed>`, jadi berfungsi dengan sentuh dan keyboard.

### `/[locale]/about`: Tentang

| Section | Konten | Foto |
| --- | --- | --- |
| Tentang Saya | Tiga paragraf, Sub-headline | `foto-1` |
| Fokus dan Cara Kerja | Lima prinsip sebagai pernyataan besar | - |
| Soft Skills | Lima kemampuan | - |
| Pendidikan | Universitas Negeri Malang, SMAN 2 Lumajang | - |
| Penghargaan dan Hak Cipta | Bronze Award (bersama tim), Kripiku, ReMot | `foto-3` |
| Pelatihan dan Sertifikasi | Tiga sertifikasi dan deskripsi program | - |
| Bahasa | Indonesia, Inggris | - |

### `/[locale]/projects/[slug]`: Studi kasus

Slug: `hismaya-cahaya-rahayu`, `govind-abra-enterprise`, `kripiku`, `mentorin-education`, `siradju`.

Isi tiap halaman: nama, peran, periode, konteks, yang dikerjakan, teknologi, tautan, penghargaan (Kripiku), dan proyek sebelum/berikutnya. Teksnya sekitar 70 sampai 110 kata per proyek, karena hanya itu yang ada di profil. Saya tidak menambah narasi tantangan dan solusi.

### Strategi proyek tanpa screenshot

Cover default adalah **plate tipografi** yang dibangkitkan dari data: nama proyek dalam ukuran display yang terpotong oleh tepi plate, dengan peran dan periode. Nada plate berbeda per proyek, termasuk satu plate terbalik (`--ink` sebagai latar), sehingga kelimanya tidak seragam. Tidak ada bingkai browser palsu dan tidak ada dasbor buatan.

Field `cover?: { src, alt }` bersifat opsional. Saat diisi, gambar diproses lewat pipeline grading yang sama dan otomatis menggantikan plate tipografi, tanpa perubahan kode.

### Halaman lain

- **404:** `src/app/global-not-found.tsx`. Ini wajib karena root layout berada di `[locale]`, dan memerlukan `experimental.globalNotFound`. Ini satu-satunya flag eksperimental yang dipakai.
- **Routing bahasa:** `/` dialihkan lewat `redirects()` di `next.config.ts` berdasarkan cookie lalu `Accept-Language`, dengan default `/id`. Tidak perlu `proxy.ts`, jadi tidak ada komputasi tiap request.
- **Tanpa halaman indeks proyek,** supaya tidak ada konten ganda dengan beranda. Breadcrumb: Beranda > Nama proyek.

### Strategi kata kunci (semuanya dari profil)

| Tingkat | Kata kunci |
| --- | --- |
| Utama | Hafizh Falasyah, Hafizh Falasyah Software Engineer |
| Peran dan kota | Software Engineer Surabaya, Backend Developer Surabaya, Full-Stack Web Developer Surabaya, Jawa Timur |
| Stack | Laravel, Next.js, MySQL, PostgreSQL, REST API, RBAC |
| Proyek | Hismaya Cahaya Rahayu, Govind Abra Enterprise, Kripiku, Mentorin Education, SIRADJU |

Untuk GEO: kalimat pertama setiap halaman berdiri sendiri sebagai jawaban faktual, `llms.txt` dibangkitkan dari data konten sehingga tidak bisa menyimpang, dan JSON-LD memuat `knowsAbout`, `alumniOf`, dan `sameAs` tanpa `telephone`.

## 2.4 Struktur folder dan dependensi

```text
.
├─ CLAUDE.md
├─ PRODUCT.md
├─ docs/plan.md
├─ assets/
│  ├─ photos/source/            foto asli
│  └─ fonts/                    TTF statis khusus next/og (Satori tidak mendukung variable font)
├─ scripts/
│  ├─ grade-photos.mjs
│  └─ check-release.mjs
├─ public/
│  ├─ photos/                   hasil grading
│  └─ cv/hafizh-falasyah-cv.pdf
├─ src/
│  ├─ app/
│  │  ├─ [locale]/
│  │  │  ├─ layout.tsx          root layout: html lang, font, skrip tema dan loader, shell
│  │  │  ├─ page.tsx
│  │  │  ├─ opengraph-image.tsx
│  │  │  ├─ not-found.tsx
│  │  │  ├─ about/page.tsx
│  │  │  └─ projects/[slug]/
│  │  │     ├─ page.tsx
│  │  │     └─ opengraph-image.tsx
│  │  ├─ llms.txt/route.ts
│  │  ├─ global-not-found.tsx
│  │  ├─ globals.css
│  │  ├─ icon.svg
│  │  ├─ apple-icon.tsx
│  │  ├─ manifest.ts
│  │  ├─ robots.ts
│  │  └─ sitemap.ts
│  ├─ sections/
│  │  ├─ home/       hero, structure, projects, experience, skills, contact
│  │  ├─ about/      intro, principles, soft-skills, education, recognition, credentials, languages
│  │  └─ project/    project-header, project-body, project-pager
│  ├─ components/
│  │  ├─ shell/      site-nav, site-footer, skip-link, theme-script, theme-switch,
│  │  │              locale-switch, loader-screen, transition-layer, transition-link, cursor
│  │  ├─ motion/     motion-root, hero-motion, structure-motion, projects-motion, magnetic
│  │  └─ ui/         photo, logo, json-ld
│  ├─ content/       types, profile, projects, experience, education, credentials,
│  │                 skills, ui, photos.generated.json
│  └─ lib/           i18n, seo, json-ld, format-period, photo-loader, gsap
├─ next.config.ts, tsconfig.json, postcss.config.mjs, eslint.config.mjs
├─ package.json, pnpm-lock.yaml, .gitignore, .env.example
```

Island motion hanya file saudara yang menunjuk section lewat ID. Konten tetap Server Component, sehingga motion tidak menambah payload konten.

Model konten: `L10n<T> = { id: T; en: T }`. Teknologi memakai union `TechId` yang dipakai bersama oleh `skills` dan `projects`, sehingga relasi Keahlian dan Proyek diperiksa saat kompilasi.

### Dependensi

| Paket | Versi saat ini | Alasan |
| --- | --- | --- |
| `next`, `react`, `react-dom` | 16.4.5, 19.3.1 | Fondasi yang Anda tetapkan |
| `gsap` | 3.15.1 | ScrollTrigger dan SplitText |
| `@gsap/react` | 2.1.2 | `useGSAP` untuk cleanup otomatis |
| `lenis` | 1.3.27 | Smooth scroll |
| `tailwindcss`, `@tailwindcss/postcss` (dev) | 4.3.4 | Styling |
| `@typescript/native` (alias `typescript@7.0.2`), `@types/*` (dev) | 7.0.2 | Menyediakan `tsc`, didukung resmi oleh `next build` |
| `typescript` (alias `@typescript/typescript6`) (dev) | 6.0.2 | Hanya untuk `typescript-eslint`, yang menolak TS 7 karena TS 7 belum punya JS API; jalur side-by-side resmi dari pengumuman TS 7. Hapus saat `typescript-eslint` mendukung TS 7 |
| `eslint`, `eslint-config-next` (dev) | 10.14.0, 16.4.5 | Lint; didukung resmi sejak Next 16.4, walau `eslint-plugin-import`, `jsx-a11y`, dan `react` belum mencantumkan ESLint 10 di peer (peringatan saat install, lint tetap berjalan) |
| `sharp` (dev) | 0.35.5 | Pipeline grading |

Sengaja tidak dipakai:

- **`next-intl`:** konten sudah bertipe per locale.
- **`next-themes`:** cukup skrip sekitar 10 baris.
- **`clsx`:** tidak diperlukan.
- **Library ikon:** UI memakai label teks.
- **Motion:** taste skill menyarankannya, tetapi Anda menetapkan GSAP.

**Alternatif stack:** tidak saya usulkan. Astro berpotensi mengirim JS dasar lebih kecil, tetapi saya tidak punya pengukuran untuk kasus ini, dan Next.js sudah menjadi pilihan Anda.

**Aturan taste skill yang sengaja ditimpa oleh permintaan Anda:** kursor kustom tetap dibuat (hanya `pointer: fine`, kursor asli tetap terlihat), dan GSAP dipakai sebagai pengganti Motion.

## 2.5 Roadmap

Anggaran yang berlaku di semua fase:

| Item | Batas |
| --- | --- |
| JS kritis tanpa motion | ≤ 145 KB gzip (Keputusan 8) |
| Chunk motion, dimuat setelah idle | ≤ 70 KB gzip |
| Font yang di-preload | Satu file, ≤ 100 KB |
| Foto hero 828w AVIF | ≤ 90 KB |
| Foto 1600w AVIF | ≤ 220 KB |

Setiap fase diverifikasi dengan `pnpm lint`, `pnpm typecheck`, `pnpm build`, lalu screenshot Playwright MCP pada 375/768/1440, kedua tema, kedua bahasa. Tangkapan layar diambil setelah animasi tenang. Tidak ada commit tanpa permintaan; saya akan bertanya di akhir tiap fase.

### Fase 1: Fondasi

**Tujuan:** proyek berjalan dengan token, font, konten bertipe, foto hasil grading, dan logo, tanpa motion.

**File:** konfigurasi root, `globals.css`, `[locale]/layout.tsx`, halaman kerangka, `src/content/*`, `src/lib/{i18n,format-period,photo-loader}.ts`, `ui/{photo,logo}.tsx`, `icon.svg`, `scripts/grade-photos.mjs`, foto dipindah ke `assets/photos/source/`. Juga: pembaruan `PRODUCT.md` dan direction contract di surface brief dengan `seed:d50c0381ac440c24`.

**Acceptance criteria:**
- Semua rute tercatat SSG di output build, tanpa error TypeScript strict.
- `pnpm photos` dijalankan dua kali menghasilkan SHA-256 yang sama, dan file output tidak memiliki metadata EXIF.
- Hanya foto yang disetujui berada di `public/`, dan semua anggaran ukuran terpenuhi.
- Menghapus satu terjemahan membuat `pnpm typecheck` gagal.
- `pnpm audit --prod` tanpa temuan high atau critical.
- Tidak ada sisa boilerplate scaffold.
- Logo terbaca pada 16, 32, dan 180px.

**Verifikasi:** perintah standar, hitung ulang kontras semua token, screenshot halaman kerangka.

### Fase 2: Shell dan Motion Engine

**Tujuan:** navigasi, tema, bahasa, Lenis, loader, transisi, kursor, dan magnetic bekerja di atas kerangka.

**File:** `components/shell/*`, `motion/{motion-root,magnetic}.tsx`, `lib/gsap.ts`, `redirects()` di `next.config.ts`.

**Acceptance criteria:**
- Tidak ada flash tema pada ketiga mode; tidak ada hydration warning.
- Pengalih bahasa mempertahankan path dan menyimpan pilihan; `/` dialihkan sesuai cookie, lalu `Accept-Language`.
- Loader hanya muncul pada kunjungan pertama per sesi, ≤ 2 detik, bisa di-skip, dan tidak muncul saat reduced motion atau tanpa JS.
- `ScrollTrigger.getAll().length` kembali ke nilai awal setelah 5 kali navigasi bolak-balik.
- Klik dengan modifier dan back/forward normal; fokus berpindah ke `main`.
- Kursor kustom tidak ada di emulasi touch.
- **Gate:** Lighthouse mobile pada kerangka ≥ 97 dengan loader aktif, supaya ada ruang untuk konten. Dibandingkan dengan loader mati; jika selisihnya membuat target tidak tercapai, jalankan tangga penurunan. Tidak berlaku lagi sejak Keputusan 7: tidak lulus (92), dan loader terbukti bukan penyebabnya.

**Verifikasi:** perintah standar, Playwright untuk alur di atas dengan emulasi reduced motion, touch, dan JS mati, `pnpm dlx lighthouse` pada `pnpm start`.

### Fase 3: Hero, Struktur, Proyek Unggulan

**Tujuan:** tiga section yang membentuk kesan pertama dan interaksi khas.

**File:** `sections/home/{hero,structure,projects}.tsx`, `motion/{hero-motion,structure-motion,projects-motion}.tsx`, `src/content/projects.ts` lengkap.

**Acceptance criteria:**
- Hero muat di 360×640, 375×667, 768×1024, 1440×900, 1920×1080, dengan nama, tagline, CV, dan kontak terlihat tanpa scroll.
- Nama di atas foto memiliki kontras ≥ 3:1 di titik terburuk, diukur dengan sampling piksel pada foto hasil grading. Jika gagal, crop dan kurva grading disesuaikan; jika masih gagal, nama tidak lagi melintasi foto.
- Salinan nama di dalam plate tepat segaris dengan nama di luar pada semua lebar dan selama parallax, tanpa selisih yang terlihat.
- Susun Lapis hanya memakai transform dan opacity, dan tetap di atas 50 fps pada throttle CPU 4x.
- Urutan baca DOM tetap benar: empat lapisan adalah `<ol>`, teks bisa dipilih dan di-crawl.
- Reduced motion dan JS mati menampilkan daftar statis yang utuh.
- Lebar 360 sampai 1920 tanpa scroll horizontal.
- CLS < 0.1 selama scroll penuh.

**Verifikasi:** perintah standar, screenshot termasuk posisi tengah scrub, rekaman performa Chrome.

### Fase 4: Section lanjutan dan studi kasus

**Tujuan:** seluruh konten profil tampil.

**File:** `sections/home/{experience,skills,contact}.tsx`, `sections/about/*`, `sections/project/*`, `about/page.tsx`, `projects/[slug]/page.tsx`, `not-found.tsx`, `global-not-found.tsx`.

**Acceptance criteria:**
- Setiap fakta bisa dirunut ke profil; terjemahan Inggris tidak menambah fakta.
- Relasi Keahlian dan Proyek cocok persis dengan baris "Teknologi" di profil.
- 14 halaman SSG terbangun: 2 beranda, 2 about, 10 proyek.
- Keahlian berfungsi dengan sentuh dan keyboard.
- Setiap section memakai keluarga layout berbeda, dan tidak ada eyebrow.
- Tidak ada nomor telepon di HTML; 404 tampil sesuai tema.
- Contoh `cover` diuji pada satu proyek lalu dikembalikan kosong.

**Verifikasi:** perintah standar, `pnpm check`, screenshot semua halaman, jalan-jalan keyboard penuh.

### Fase 5: SEO/GEO, Security, Performance

**Tujuan:** target terukur tercapai.

**File:** `lib/{seo,json-ld}.ts`, `ui/json-ld.tsx`, `opengraph-image.tsx`, `sitemap.ts`, `robots.ts`, `llms.txt/route.ts`, `manifest.ts`, `apple-icon.tsx`, `assets/fonts/*`, security headers di `next.config.ts`.

**Acceptance criteria:**
- Metadata, canonical, dan hreflang timbal balik benar di 14 URL; sitemap memuat 14 URL.
- JSON-LD Person, WebSite, ProfilePage, CreativeWork, dan BreadcrumbList tanpa error di validator schema.org; `sameAs` memuat LinkedIn dan GitHub; tidak ada `telephone`.
- OG image tampil benar untuk setiap locale dan proyek.
- CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, dan frame-ancestors terlihat lewat `curl -I`.
- Nol pelanggaran CSP di console pada semua halaman.
- Lighthouse mobile di URL Vercel pada `/id`, `/en`, `/id/about`, dan satu halaman proyek: performa ≥ 85, tiga kategori lain ≥ 95; LCP < 2.5s, CLS < 0.1 (Keputusan 7).
- INP < 200ms diukur lewat interaksi Playwright pada Keahlian, nav, dan tema (belum ada data lapangan sebelum rilis).
- Semua anggaran JS, font, dan foto terpenuhi.

**Verifikasi:** Lighthouse CLI di URL Vercel, median 5 run, `curl -I`, validator schema.org, laporan ukuran chunk.

**Status:** ditutup pemilik pada 2026-11-07, dengan dua catatan terbuka untuk pengukuran saat deploy final: LCP Kripiku masih 2,67 s di Vercel (target < 2.5s), dan perubahan INP belum diukur di Vercel. Fase 6 dikerjakan pada hari yang sama; statusnya ada di bagian Fase 6.

### Fase 6: QA dan Polish

**Tujuan:** siap rilis dan terdokumentasi.

**File:** perbaikan hasil review, `scripts/check-release.mjs`, `DESIGN.md`, `.impeccable/design.json`.

**Acceptance criteria:**
- `pnpm check` lolos: tidak ada pola nomor telepon di HTML dan metadata, tidak ada `foto-2`/`foto-5`, em dash, en dash, atau teks terlarang di output. `public/cv/` dikecualikan dari pemeriksaan nomor telepon sesuai Keputusan 3.
- Uji tambahan pada 360 dan 1920.
- `impeccable detect` dijalankan sekali dan temuannya ditangani; pre-flight taste skill lolos, kecuali dua aturan yang sengaja ditimpa.
- Audit salinan: setiap teks dibaca ulang dalam kedua bahasa.
- Tautan keluar diperiksa ulang, termasuk Govind.
- `impeccable-finish-reviewer` memberi putusan, dan temuannya diselesaikan.
- `impeccable-documenter` menulis `DESIGN.md` dari hasil build.
- Lighthouse akhir tetap memenuhi target.

**Verifikasi:** matriks screenshot penuh, reduced motion, JS mati, keyboard, cek silang dengan profil. Deploy ke Vercel hanya setelah Anda meminta.

**Status (2026-11-07):** dikerjakan pada build lokal; belum dideploy.
- [x] Temuan P1 critique dan audit diperbaiki, juga P2 yang murah (Keputusan 9 sampai 11).
- [x] `pnpm lint`, `pnpm typecheck`, `pnpm build`, `pnpm check`, dan `npx knip` bersih. Semua rute tetap SSG.
- [x] Matriks 360, 390, 768, 1024, 1440, 1920 × terang/gelap × id/en untuk beranda dan Kripiku: 0 overflow, 0 pelanggaran axe, kontras teks terendah 5,18:1. Keyboard: 1.768 titik fokus tanpa yang tertutup, cincin terendah 3,11:1. Loader 1,29 sampai 1,43 detik dan tidak muncul lagi saat reload. Reduced motion dan tanpa JS utuh. Tambahan 375×667 juga lolos.
- [x] `impeccable detect`: kode 0 temuan; halaman 1 temuan `overused-font`, pengecualian Mona Sans (Keputusan 10). Pre-flight taste skill lolos, kecuali kursor kustom dan GSAP.
- [x] Audit salinan terhadap profil: tidak ada selisih fakta.
- [x] Tautan keluar: semua 200, kecuali Govind 503 (Keputusan 5).
- [x] `impeccable-finish-reviewer`: lulus dengan catatan. W1 sampai W3 dan O3 diperbaiki.
- [x] `impeccable-documenter` menulis ulang `DESIGN.md` dan `.impeccable/design.json` dari build.
- [ ] Tinjauan teks Inggris oleh pemilik.
- [ ] Keputusan pemilik atas saran reviewer: relasi RBAC dan autentikasi di Keahlian, ringkasan di sampul studi kasus, kalimat penutup Kontak, label "Teknologi dari proyek", dan asal `src/app/favicon.ico`.
- [ ] Lighthouse akhir di URL Vercel (butuh izin deploy). Lokal, median 5 run: `/id` 79, `/en` 80, Kripiku 89 dan 90; tiga kategori lain 100; CLS 0. Permintaan Fase 6 menyebut 95, sedangkan Keputusan 7 menetapkan 85 di Vercel; keputusan tetap menunggu pemilik.

## 2.6 Keputusan final

Dijawab pemilik pada 2026-11-06.

| No | Topik | Keputusan | Konsekuensi untuk build |
| --- | --- | --- | --- |
| 1 | Arah desain | Konsep B, Maket | Sistem desain di dokumen ini berlaku apa adanya |
| 1 | Font | Mona Sans + Martian Mono | Hanya Mona Sans yang di-preload |
| 2 | Foto | Grading tujuh, terbitkan lima | `foto-2` dan `foto-5` diberi `publish: false`; hasil dan file aslinya masuk `.gitignore` |
| 3 | CV | Diterbitkan apa adanya, termasuk nomor telepon | Pemilik menerima nomor terbuka lewat PDF. Nomor tetap tidak boleh ada di HTML, metadata, atau JSON-LD. `pnpm check` mengecualikan `public/cv/`. Label versi Indonesia: Unduh CV (EN) |
| 4 | CSP | Tetap SSG, uji SRI dulu | Fase 5 menguji SRI dengan `script-src 'self'`; jika terblokir, memakai `'unsafe-inline'` dengan directive lain tetap ketat. **Hasil uji 2026-11-06:** terblokir. `experimental.sri` hanya menambah `integrity` pada skrip eksternal, sedangkan skrip tema, loader, dan payload RSC tetap inline: 4 sampai 7 pelanggaran per halaman, hidrasi gagal, dan GSAP tidak berjalan. Hash per halaman tidak bisa dipakai karena `headers()` dibaca sebelum halaman dibangun. `script-src` memakai `'unsafe-inline'`; `style-src` tanpa `'unsafe-inline'` (hanya `style-src-attr`), `default-src 'none'`, `base-uri 'none'`, `form-action 'none'` |
| 5 | Domain | Subdomain vercel.app untuk rilis awal | Nilai dari `NEXT_PUBLIC_SITE_URL`. HSTS tanpa `includeSubDomains` dan `preload` sampai memakai domain sendiri. Saat pindah perlu redirect dan pembaruan URL |
| 5 | Tautan Govind | Tetap ditampilkan meski situs 503 | Tautan situs dan GitHub tampil sesuai profil. Status diperiksa dan dilaporkan di Fase 6, tanpa menyembunyikan tautan |
| 6 | Studi kasus | Lima halaman | Empat proyek unggulan ditambah SIRADJU; ReMot satu baris di Penghargaan |
| 6 | Teks fungsional | Boleh, tanpa fakta atau klaim baru | Berlaku untuk label nav, tombol Lewati, alt text, dan 404 |
| 6 | Bahasa Inggris | Memakai kalimat CV jika ada, sisanya terjemahan langsung | Pemilik meninjau sebelum rilis |
| 7 | Target Lighthouse (2026-11-07) | Performa mobile ≥ 85, menggantikan 95 | Diukur di URL Vercel, median 5 run. Hasil saat diputuskan: 88 sampai 89,5, TBT sekitar 400 ms dari framework, hidrasi, dan layout font lebar. Kategori lain tetap ≥ 95. LCP < 2.5s tetap berlaku; Kripiku masih 2,67 s (rentang 1,56 sampai 2,81 antar run; 2,23 s dengan throttling `devtools`). A/B lokal tanpa `project-ghost` hanya mengubah LCP 60 ms, jadi ghost bukan penyebab dan tetap dipertahankan |
| 8 | Anggaran JS kritis (2026-11-07) | ≤ 145 KB gzip, menggantikan 130 KB | Terukur 140,8 KB, sekitar 132 KB di antaranya framework. webpack tidak lebih kecil (145,3 KB) |
| 9 | Susun Lapis (2026-11-07) | Pin 180svh (section 280svh), menggantikan 250vh | Bagian tanpa teks turun dari sekitar 1.050 px ke 300 sampai 360 px. Teks memudar sebelum plate merapat, dan section Proyek naik menimpa plate. Ketukan dalam svh di `structure-motion.tsx` |
| 10 | Mona Sans dan detector (2026-11-07) | Mona Sans tetap, walau ada di daftar internal detector Impeccable | Pengecualian tercatat di `CLAUDE.md` dan `.impeccable/critique/ignore.md` |
| 11 | Header dan hero (2026-11-07) | CV masuk header desktop; tema menjadi satu tombol siklus; nama dibatasi tinggi layar | `--text-display-l: clamp(3.5rem, min(16vw, 27svh), 19rem)`, sehingga CV terlihat di fold pada 1280×640 dan 1366×657 |

## Sumber

- [Next.js: Content Security Policy](https://nextjs.org/docs/app/guides/content-security-policy)
- [Next.js: Image Component](https://nextjs.org/docs/app/api-reference/components/image)
- [Next.js: TypeScript](https://nextjs.org/docs/app/api-reference/config/typescript)
- [Next.js: not-found dan global-not-found](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)
- [GSAP Standard License](https://gsap.com/standard-license)
