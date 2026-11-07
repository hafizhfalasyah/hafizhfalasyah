---
name: Portofolio Hafizh Falasyah
description: Maket kartu monochrome yang disusun dari model data sampai tampilan.
colors:
  canvas: "light-dark(oklch(0.985 0 0), oklch(0.145 0 0))"
  plate-1: "light-dark(oklch(0.955 0 0), oklch(0.19 0 0))"
  plate-2: "light-dark(oklch(0.92 0 0), oklch(0.235 0 0))"
  plate-3: "light-dark(oklch(0.88 0 0), oklch(0.28 0 0))"
  ink: "light-dark(oklch(0.18 0 0), oklch(0.96 0 0))"
  ink-2: "light-dark(oklch(0.38 0 0), oklch(0.76 0 0))"
  ink-3: "light-dark(oklch(0.5 0 0), oklch(0.64 0 0))"
  edge: "light-dark(oklch(0.57 0 0), oklch(0.56 0 0))"
  on-photo: "oklch(0.18 0 0)"
  photo-rest: "oklch(0.72 0 0)"
typography:
  display:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3.5rem, min(16vw, 27svh), 19rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 125"
  display-small:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3rem, 8vw, 7rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 112.5"
  headline:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 2rem + 2.5vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 112.5"
  title:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 1.5rem + 1.2vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.15
  lead:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.35
  body:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.96rem + 0.2vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.96rem + 0.2vw, 1.125rem)"
    fontWeight: 500
    lineHeight: 1.55
  meta:
    fontFamily: "Mona Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)"
    fontWeight: 400
    lineHeight: 1.45
    fontVariation: "'wdth' 87.5"
  tech:
    fontFamily: "Martian Mono, ui-monospace, monospace"
    fontSize: "clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)"
    fontWeight: 400
    lineHeight: 1.45
    fontFeature: "'tnum'"
rounded:
  none: "0"
spacing:
  "0": "0"
  "1": "0.25rem"
  "2": "0.5rem"
  "3": "0.75rem"
  "4": "1rem"
  "6": "1.5rem"
  "8": "2rem"
  "12": "3rem"
  "16": "4rem"
  "24": "6rem"
  "32": "8rem"
  "48": "12rem"
  section: "clamp(6rem, 14vw, 12rem)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 1.5rem"
    height: "3rem"
  button-primary-hover:
    backgroundColor: "{colors.ink-2}"
    textColor: "{colors.canvas}"
  button-inverse:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 1.5rem"
    height: "3rem"
  button-inverse-hover:
    backgroundColor: "{colors.plate-2}"
    textColor: "{colors.ink}"
  link-action:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    height: "3rem"
  link-action-hover:
    textColor: "{colors.ink-2}"
  control:
    textColor: "{colors.ink-3}"
    typography: "{typography.meta}"
    padding: "0 0.5rem"
    height: "3rem"
  control-hover:
    textColor: "{colors.ink}"
  control-active:
    textColor: "{colors.ink}"
  skill-token:
    backgroundColor: "{colors.plate-2}"
    textColor: "{colors.ink}"
    typography: "{typography.tech}"
    rounded: "{rounded.none}"
    padding: "0 0.75rem"
    height: "3rem"
  skill-token-hover:
    backgroundColor: "{colors.plate-3}"
    textColor: "{colors.ink}"
  skill-token-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
  plate-first:
    backgroundColor: "{colors.plate-1}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "1.5rem"
  plate-second:
    backgroundColor: "{colors.plate-2}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "1.5rem"
  plate-third:
    backgroundColor: "{colors.plate-3}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "1.5rem"
  plate-foundation:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.none}"
    padding: "1.5rem"
---

# Design System: Portofolio Hafizh Falasyah

## Overview

**Creative North Star: "Maket Kartu"**

Setiap permukaan diperlakukan sebagai kartu yang dipotong dan ditumpuk di atas sebuah alas. Kedalaman datang dari nada bidang, bukan dari bayangan atau garis tipis. Fondasi selalu paling kontras terhadap alas, dan lapisan di atasnya makin dekat ke nada alas, sehingga struktur halaman sendiri menyampaikan cara kerja yang menjadi inti portofolio ini.

Kepribadiannya monochrome, presisi, tenang, dan percaya diri. Kepadatannya rendah: satu pernyataan besar diberi ruang lega, lalu detail dipadatkan ke dalam bidang yang jelas batasnya. Tipografi memikul ekspresi, foto hitam putih memberi bukti manusia, dan warna tidak dipakai sama sekali.

Sistem ini secara sadar menolak template portofolio developer generik (gradient ungu, glassmorphism, card grid seragam, emoji sebagai ikon, eyebrow chip) dan pola editorial yang sudah menjadi kebiasaan AI (garis tipis ala koran, serif italic besar, label mono kecil yang direnggangkan).

**Key Characteristics:**
- Chroma 0 di semua token, dengan foto hitam putih yang memakai netral yang sama.
- Bidang bernada solid sebagai satu-satunya sumber kedalaman, tanpa bayangan.
- Radius 0 di semua elemen.
- Satu keluarga variable font dengan tiga suara, lewat sumbu lebar dan berat.
- Skala token tertutup: nilai di luar `globals.css` tidak menghasilkan CSS.

## Colors

Sepuluh netral murni. Delapan punya dua sisi, terang dan gelap, dalam satu nilai `light-dark()`; dua sisanya sengaja sama di kedua tema karena melayani foto.

### Neutral

- **Alas Maket** (`canvas`): latar halaman, tempat semua kartu diletakkan. Juga warna teks di atas Fondasi Tinta, dan latar tombol terbalik di dalam plate kontak.
- **Karton Pertama** (`plate-1`): bidang yang nadanya paling dekat dengan alas: section Proyek, header saat halaman sudah digulir, dan hover baris proyek di panel Keahlian.
- **Karton Kedua** (`plate-2`): bidang tengah, latar token Keahlian, sekaligus warna pengisi foto sebelum termuat.
- **Karton Ketiga** (`plate-3`): bidang yang nadanya paling jauh dari alas, tepat di atas fondasi. Juga hover token Keahlian.
- **Tinta Utama** (`ink`): teks utama dan nama. Sebagai latar, inilah Fondasi Tinta: footer, plate kontak, plate Hasil, panel Keahlian di bawah 1280px, token terpilih, dan tombol primer.
- **Tinta Kedua** (`ink-2`): teks pendukung seperti tagline dan intro section, label section aktif di header ponsel, dan warna hover tautan serta tombol primer.
- **Tinta Ketiga** (`ink-3`): kontrol yang sedang tidak aktif (bahasa dan tema), dan baris proyek yang tidak cocok di panel Keahlian mulai 1280px.
- **Tepi Potong** (`edge`): cincin fokus, batas kontrol, dan thumb scrollbar. Minimal 3:1 di semua bidang, termasuk Karton Ketiga dan Fondasi Tinta; terendah terukur 3,11:1.
- **Tinta Foto** (`on-photo`): salinan nama di atas plate foto. Tetap gelap di kedua tema karena fotonya tidak ikut berganti tema. Kontras terburuk 5,31 sampai 5,59:1 pada area huruf, diukur pada 360 sampai 1920.
- **Dinding Foto** (`photo-rest`): latar plate foto sebelum termuat, agar Tinta Foto selalu terbaca.

### Named Rules

**The Chroma Zero Rule.** Semua warna ber-chroma 0, di kedua tema. Aksen berwarna tidak ada dalam sistem ini, termasuk untuk status atau hover. Satu-satunya pengecualian sah adalah mode kontras tinggi (`forced-colors: active`): token terpilih dan baris proyek yang cocok (mulai 1280px) memakai `Highlight` dan `HighlightText`, token memakai batas `ButtonText`, dan penanda nav memakai `CanvasText`. Warna itu milik sistem operasi pengguna dan hanya muncul saat mode tersebut aktif.

**The One Declaration Rule.** Setiap warna dideklarasikan sekali dengan kedua sisinya. Tidak ada blok tema gelap terpisah, dan tema hanya ditentukan oleh `color-scheme`.

**The Ink Three Limit Rule.** Tinta Ketiga hanya boleh berada di atas Alas Maket dan Karton Pertama. Di Karton Kedua dan Ketiga, teks hanya memakai Tinta Utama atau Tinta Kedua, karena hanya kombinasi itu yang sudah dihitung lolos AA di kedua tema.

**The Dim Floor Rule.** Teks yang dipudarkan menunggu gilirannya tidak pernah turun di bawah opacity 0.62, karena pengunjung bisa berhenti di tengah scroll. Kontras teks terendah terukur 5,18:1 (terang) dan 5,47:1 (gelap) saat animasi, dan 5,75:1 serta 5,88:1 saat statis.

## Typography

**Display Font:** Mona Sans (dengan ui-sans-serif, system-ui)
**Body Font:** Mona Sans (dengan ui-sans-serif, system-ui)
**Label/Mono Font:** Martian Mono (dengan ui-monospace), hanya untuk teknologi dan periode

Keduanya di-self-host lewat `next/font`; Mona Sans memuat sumbu `wdth`.

**Character:** Satu file variable font memberi tiga suara: lebar dan berat untuk nama, normal untuk teks, sempit untuk meta. Hirarki terasa sebagai sistem karena datang dari satu keluarga, sedangkan Martian Mono menandai fakta teknis.

### Hierarchy

- **Display**: nama di viewport pertama, dua baris, paling lebar dan paling berat. "Falasyah" terukur selebar 4,87em, sehingga muat sampai lebar layar 320px. Ukurannya juga dibatasi tinggi layar (27svh), agar CV dan kontak tetap di viewport pertama pada laptop pendek.
- **Display Small**: nama proyek di plate beranda, sampul studi kasus, dan pager proyek berikutnya, serta label plate transisi halaman.
- **Headline**: judul section, sedikit melebar. Di halaman About ukurannya dibatasi 9.6vw di ponsel agar kata terpanjang tidak meluap.
- **Title**: peran, judul lapisan, judul bagian studi kasus, dan nama proyek sebelumnya di pager.
- **Lead**: tagline dan kalimat pembuka section, dibatasi 65ch.
- **Body**: teks dasar, dibatasi 65ch.
- **Label**: teks tombol dan tautan tindakan.
- **Meta**: kontrol bahasa dan tema, dan label section aktif di header ponsel, dengan lebar sempit.
- **Tech**: nama teknologi dan periode, termasuk token Keahlian, dengan angka tabular.

### Named Rules

**The Three Voices Rule.** Hirarki dibangun dengan sumbu lebar dan berat Mona Sans sebelum menambah keluarga font baru.

**The Mono Is Fact Rule.** Martian Mono hanya untuk nama teknologi dan periode, dan tidak pernah uppercase dengan tracking lebar. Mono bukan kostum teknis.

**The Tracking Floor Rule.** Tracking display berhenti di -0.02em. Lebih rapat dari itu, huruf bersentuhan pada lebar 125 dan berat 800.

## Layout

Halaman berdiri di atas grid 4 kolom di bawah 768px, 8 kolom sampai 1279px, dan 12 kolom mulai 1280px, dengan lebar maksimal 1760px. Gutter sekaligus margin halaman naik bertahap: 16px, lalu 24px mulai 768px, 32px mulai 1440px, dan 40px mulai 1920px. Komposisi disusun dengan `col-span` dan `col-start` pada satu kelas grid halaman, dan semua layout asimetris runtuh menjadi satu kolom di bawah 768px. Bidang yang perlu keluar dari grid (foto kontak ke kanan, fondasi kontak ke kiri) memakai jarak bleed sampai tepi layar.

Spacing berdasar 4px dengan langkah tetap. Jarak antar section memakai token `section`; grup yang berkaitan rapat (12 sampai 24px) dan pemisahan antar blok lega (48 sampai 64px). Tinggi header 64px dan tetap satu baris; `scroll-padding-top` 64px menjaga target anchor dan elemen yang difokus tidak tertutup header. Di bawah 1280px token Keahlian memberi `scroll-margin` bawah 12rem, agar token yang difokus tidak berakhir di balik panel yang menempel di bawah layar.

Studi kasus memisahkan dua grid: sidebar Teknologi yang menempel mulai 768px bersama artikel di satu grid, lalu plate Hasil di grid sendiri, sehingga sidebar tidak tertahan di dasar wadah yang sama dengan plate Hasil. Setelahnya tombol CV dan tautan kontak, sama dengan hero.

**The Closed Scale Rule.** Tema bawaan Tailwind dihapus, sehingga utility hanya ada untuk nilai yang tertulis di `globals.css`. Bila sebuah kelas tidak menghasilkan CSS, nilainya memang di luar sistem: gunakan langkah terdekat, bukan nilai lepas.

**The Scene Mode Rule.** Mode adegan berlaku hanya bila lebar minimal 1024px, tinggi minimal 704px, dan motion tidak dikurangi, dengan query yang sama persis di CSS dan di `lib/gsap.ts`. Ruang scroll adegan dicadangkan CSS sebelum chunk motion tiba, sehingga tidak ada pergeseran layout.

## Elevation & Depth

Sistem ini sepenuhnya datar dan tidak memakai bayangan. Kedalaman disampaikan oleh urutan nada dari Alas Maket, Karton Pertama, Kedua, dan Ketiga, sampai Fondasi Tinta sebagai dasar yang paling kontras, dan oleh plate yang menempel lalu ditimpa plate berikutnya. Urutan lapisan ditentukan token z-index (`plate`, `nav`, `cursor`, `transition`, `loader`, `skip-link`), bukan angka lepas.

**The Stacked Plate Rule.** Bila dua bidang perlu dibedakan, ubah nadanya atau tumpuk posisinya. Jangan menambah bayangan, blur, atau garis tepi.

**The Focus Surfaces Rule.** Elemen yang difokus tidak boleh berakhir di balik plate. Plate proyek yang berisi fokus naik ke lapisan `plate` di atas plate berikutnya; sampul studi kasus yang berisi fokus menempel di 64px pada lapisan `plate`, lalu fokus pada breadcrumb menggulir halaman kembali ke puncak, tempat sampul tampil utuh.

## Shapes

Semua sudut tajam (radius 0) karena setiap bidang adalah kartu yang dipotong. Bentuk berulangnya hanya persegi panjang, termasuk monogram, yang tersusun dari lima persegi panjang pada grid 16 unit dengan tiang tengah H sekaligus menjadi tiang F. Satu-satunya garis adalah penanda nav aktif setebal 2px dan garis bawah tautan 1px.

**The Cut Card Rule.** Tidak ada sudut membulat, pill, atau lingkaran pada elemen antarmuka. Token radius selain `none` tidak tersedia.

## Components

Karakter semua komponen: dipotong tegas, diam. Tepinya tajam, tanpa dekorasi, dan bergerak hanya bila ada alasannya.

### Buttons

- **Shape:** sudut tajam (radius 0), tinggi minimum 48px, satu baris tanpa pembungkusan.
- **Primary:** Fondasi Tinta dengan teks Alas Maket, sehingga berbalik otomatis di tema gelap.
- **Inverse:** di dalam Fondasi Tinta (plate kontak), tombol CV memakai latar Alas Maket dengan teks Tinta Utama; hover ke Karton Kedua.
- **Hover / Focus:** latar berubah instan ke Tinta Kedua. Fokus memakai cincin Tepi Potong 2px dengan jarak 3px. Saat ditekan, bergeser turun 1px.
- **Action Link:** Tinta Utama dengan garis bawah 1px berjarak 0.2em dan tinggi target 48px; hover ke Tinta Kedua. Dipakai sebagai tindakan sekunder di samping tombol primer.
- **Primary Actions:** pasangan Unduh CV (tombol primer) dan Mari terhubung (action link) adalah satu komponen yang sama di hero dan di akhir setiap studi kasus.

### Chips

Token Keahlian adalah satu-satunya bentuk chip, dan berfungsi sebagai tombol filter, bukan hiasan.

- **Style:** Karton Kedua dengan teks Tech Tinta Utama, tinggi 48px, padding samping 12px, tanpa bingkai.
- **State:** hover dan pratinjau mouse ke Karton Ketiga; terpilih (`aria-pressed`) berbalik ke Fondasi Tinta. Saat ditekan bergeser turun 1px. Tanpa JS, token tidak bisa diklik.
- **Teks polos:** item tanpa teknologi yang bisa dipilih tampil tanpa latar dengan warna yang sama. Di grup yang punya token, teks polos diberi tinggi dan padding token agar sebaris; grup tanpa token tampil sebagai teks biasa rata dengan judulnya.
- **Urutan grup:** API dan autentikasi, Arsitektur dan design pattern, Database, Keamanan, lalu grup lain. Petunjuk di panel menyebut "teknologi berlatar".

### Navigation

- **Header:** satu baris setinggi 64px. Monogram sebagai tautan ke beranda di kiri. Mulai 1024px, empat tautan section mengikuti, lalu di kanan bahasa, satu tombol tema, dan tautan "Unduh CV (EN)". Di bawah 1024px, kanan berisi label section aktif (Meta, Tinta Kedua) dan tombol Menu. Header berganti ke Karton Pertama setelah halaman digulir dan menyingkir saat membaca ke bawah, kecuali ada fokus di dalamnya.
- **Tautan nav:** Label setinggi 48px; penanda aktif garis 2px yang masuk dari kiri dan keluar ke kanan, sehingga terbaca berpindah antar tautan.
- **Kontrol:** teks Meta berwarna Tinta Ketiga dengan target setinggi 48px, tanpa bingkai atau latar. Hover ke Tinta Utama.
- **Bahasa:** kode `ID` dan `EN`, masing-masing target minimal 48 x 48px, berupa tautan biasa dengan navigasi penuh agar skrip tema berjalan lagi. Pilihan aktif tebal dan Tinta Utama dengan `aria-current`.
- **Tema:** satu tombol yang berputar melewati Sistem, Terang, dan Gelap, bertuliskan "Tema" diikuti mode aktif yang ditebalkan dengan Tinta Utama. Disembunyikan bila JS mati, karena tema tetap mengikuti sistem.
- **Menu (di bawah 1024px):** tombol minimal 48 x 48px membuka empat baris setinggi minimal 72px dengan nada tumpukan (Karton Pertama, Kedua, Ketiga, Fondasi Tinta) dan teks Headline. Baris bawah berisi CV, bahasa, dan tema di atas Alas Maket. Tanpa JS, tombol diganti tautan ke footer.
- **Fokus:** cincin Tepi Potong 2px dengan jarak 3px; di dalam baris menu cincin masuk ke dalam (offset -5px) agar tidak terpotong tepi layar dan baris tetangga.

### Plate Stack

Komponen khas sistem ini: daftar berurutan sesuai urutan kerja, dari fondasi sampai tampilan.

- **Nada:** berurutan Fondasi Tinta, Karton Ketiga, Kedua, lalu Pertama.
- **Mode adegan:** section setinggi 280svh dengan pin 180svh. Plate foto hero miring tanpa perspektif, lalu tiga lapisan tersusun dari bawah sambil kalimat profil terbaca, dan lapisan teratas menggantikan foto. Teks tetap datar di kolom kiri. Ketukan diukur dalam svh di `structure-motion.tsx`: teks memudar pada 200 sampai 220svh, sebelum plate merapat mulai 205svh; fill layar mulai 232svh; section Proyek naik menimpa plate dengan margin atas -48svh sehingga judulnya tiba saat fill berakhir. Teks memudar lewat `opacity`, bukan `autoAlpha`, sehingga tetap ada di pohon aksesibilitas.
- **Di luar mode adegan, motion aktif:** tumpukan `sticky`; lapisan baru menutupi yang lama, labelnya tetap terlihat.
- **Tanpa JS dan reduced motion:** daftar statis utuh; mulai 768px tiap lapisan bergeser 12% ke kanan.
- **Teks:** selalu teks DOM nyata, tidak pernah gambar atau skema buatan.

### Project Plate

Plate tipografi untuk proyek tanpa cover, ditumpuk dengan `sticky`. Nada, lebar, dan tinggi berbeda tiap plate, termasuk satu Fondasi Tinta. Plate yang tertutup mengecil ke 95%.

- **Nama:** selalu utuh di `h3` dengan Display Small.
- **Kata besar:** kata pertama nama proyek, `aria-hidden`, warna teks plate dengan opacity 0.07, sengaja dipotong tepi plate.
- **Tautan:** seluruh plate bisa diklik, dengan label tindakan yang selalu terlihat agar touch tidak bergantung pada hover. Cincin fokus digambar di dalam plate (offset -5px).
- **Sisi balik:** hanya untuk pointer halus; bidang terbalik naik dari bawah dan menampilkan Hasil proyek, dengan jeda 0.12s.

### Photo

- **Sumber:** hanya hasil `pnpm photos`, hitam putih dengan satu preset dan grain seragam. Nilai presetnya ada di `scripts/grade-photos.mjs`.
- **Bentuk:** tanpa radius dan tanpa bingkai, mengisi kolomnya, dengan rasio dari manifest agar tidak terjadi pergeseran layout. `srcset` hanya mencantumkan lebar yang benar-benar ada.

**The One Preset Rule.** Semua foto melewati channel mix, kurva tone, dan grain yang identik. Foto tidak pernah disesuaikan satu per satu.

**The Raster Provenance Rule.** Setiap raster yang terbit punya asal yang tercatat:
- **Foto:** asli di `assets/photos/source/` dan tidak pernah disajikan. foto-1, 3, 4, 6, dan 7 terbit; foto-2 dan foto-5 privat, hasil gradingnya hanya ke `assets/photos/private/` yang di-ignore, dan file aslinya tidak di-commit. Semuanya digrading dengan satu preset oleh `scripts/grade-photos.mjs` lewat `pnpm photos` ke `public/photos/` sebagai AVIF dan WebP pada lebar 480, 640, 828, 1200, 1600, dan 2000px, tanpa pembesaran (foto-1 terbit pada lebar aslinya, 331px). Grain berbiji tetap per foto dan lebar, sehingga keluaran dapat diulang byte per byte; skrip mencetak sidik jari sha256 seluruh keluaran dan menulis manifest ukuran ke `src/content/photos.generated.json`.
- **Ikon dan OG:** dibangkitkan dari kode, dari data monogram yang sama: `src/app/icon.svg`, `src/app/apple-icon.tsx`, gambar OG lewat `src/lib/og.tsx` dan rute `opengraph-image`, memakai nilai hex setara token tema gelap.
- **CV:** PDF di `public/cv/` diterbitkan apa adanya.

### Monogram

Lima persegi panjang berwarna `currentColor`, mengikuti warna teks di sekitarnya. Favicon SVG mengikuti tema sistem, sedangkan ikon aplikasi memakai mark terang di atas plate gelap.

## Do's and Don'ts

### Do:

- **Do** pakai token warna, teks, dan spacing dari `globals.css`, dan tambah token di sana bila memang perlu nilai baru.
- **Do** bedakan bidang dengan nada dari Karton Pertama sampai Fondasi Tinta.
- **Do** beri setiap kontrol target minimal 48px dan cincin fokus Tepi Potong.
- **Do** pastikan elemen yang difokus tidak tertutup header atau plate lain.
- **Do** tema-kan permukaan browser dari palet: seleksi teks terbalik, scrollbar Tepi Potong, caret Tinta Utama, dan `theme-color` Alas Maket yang mengikuti tema pilihan (`themeColors` di `lib/theme.ts`).
- **Do** ukur kontras setiap teks di atas foto pada foto hasil grading.
- **Do** pakai plate tipografi untuk proyek tanpa cover.
- **Do** gambar ulang status yang hanya memakai latar dengan warna sistem saat `forced-colors` aktif.

### Don't:

- **Don't** pakai warna ber-chroma, gradient ungu atau biru, atau glassmorphism.
- **Don't** pakai bayangan, blur, atau garis tipis sebagai sumber kedalaman.
- **Don't** pakai radius selain 0.
- **Don't** pakai card grid seragam, eyebrow chip, atau emoji sebagai ikon.
- **Don't** pakai mockup palsu atau layar buatan untuk proyek.
- **Don't** pakai serif italic besar atau label mono kecil yang direnggangkan.
- **Don't** pakai em dash atau en dash pada teks yang terlihat.
- **Don't** pakai font Inter, Geist, Space Grotesk, Plus Jakarta Sans, Fraunces, atau Instrument Sans.
