---
target: beranda, about, dan studi kasus
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:D:\\PROYEK\\PORTOFOLIO\\hafizhfalasyah\\src\\app\\[locale]\\page.tsx"
target_fingerprint: "sha256:e921f56846473df15a0e538e6e27828d8ef5bb4e89883ae2ae9e64762f5df9bb"
target_path: "D:\\PROYEK\\PORTOFOLIO\\hafizhfalasyah\\src\\app\\[locale]\\page.tsx"
timestamp: 2026-11-07T06-46-48Z
slug: src-app-locale-page-tsx
closed: true
---
Method: dual-agent (A: design review · B: detector dan browser)

# Critique: beranda, about, dan studi kasus

**Skor 23/32 (72%, Good). P0: 0, P1: 3, P2: 2.** Heuristik 7 dan 10 bernilai n/a.

## Design Health Score

| # | Heuristik | Skor | Masalah kunci |
|---|---|---|---|
| 1 | Status sistem | 3 | Loader, penanda nav, dan transisi jelas. Tidak ada penanda selama pin 3.150 px, dan klik CV hanya mengandalkan umpan balik browser. |
| 2 | Kecocokan dunia nyata | 3 | Bahasanya lugas. S1 ada di bawah "Pengalaman Profesional", dan "Teknologi dari proyek" adalah label struktur data. |
| 3 | Kontrol dan kebebasan | 3 | Back dan reload memulihkan posisi. Ganti bahasa di tengah halaman melempar pengunjung ke puncak (y 10953 ke 0). |
| 4 | Konsistensi | 3 | Sistem token ketat. CV tampil dalam tiga bentuk: tombol, tautan bergaris bawah, dan tautan polos. |
| 5 | Pencegahan error | 3 | Label "(EN)" membantu. Tautan Govind (503) tanpa peringatan adalah keputusan pemilik. |
| 6 | Rekognisi | 2 | CV tidak terlihat setelah hero di desktop. Beda token berisi dan teks polos di Keahlian tidak dijelaskan. |
| 7 | Fleksibilitas | n/a | Kunjungan sekali jalan, tanpa tugas berulang. |
| 8 | Estetika dan minimalis | 3 | Kuat, tetapi dikurangi layar kosong Susun Lapis, kontak ganda di footer, dan kata besar yang mengulang nama. |
| 9 | Pemulihan error | 3 | 404 dwibahasa, jelas, dan punya jalan kembali. Logo di 404 bukan tautan. |
| 10 | Bantuan | n/a | Situs statis tanpa alur yang butuh dokumentasi. |
| **Total** | | **23/32** | **72%, Good** |

## Design Specificity Verdict

**Penilaian desain:** spesifik dan sulit ditukar di sepertiga pertama, lalu menurun menjadi editorial monochrome yang rapi tetapi bisa dipakai portofolio lain.
- Lahir dari produk ini: Susun Lapis, nama yang melintasi plate, loader empat plate, tema yang naik sebagai plate, dan nama proyek yang bertahan dari plate ke sampul.
- Bisa ditukar: Pengalaman (kolom tanggal, isi, foto), Keahlian (awan tag), dan kata besar 7% di sampul yang mengulang nama tepat di bawahnya.
- Peluang terlewat: kosakata empat lapisan tidak pernah kembali di halaman proyek.

**Detector:**
- Scan kode: exit 0, 0 temuan di `src/app`, `src/sections`, `src/components` (62 rule). Tidak ada file ignore yang memengaruhi hasil.
- Scan halaman dirender: satu rule, `overused-font` untuk Mona Sans. `/id` dan `/en` 69 sampai 70%, `/id/about` 95%, Kripiku 87 sampai 88%, 404 bersih di overlay (mode URL menolak memindai halaman 404).
- Kelima masalah prioritas tidak tertangkap detector, karena semuanya soal perilaku saat scroll, ukuran layar, dan isi.
- `overused-font` adalah false positive bersyarat. `CLAUDE.md` dan `DESIGN.md:178` menetapkan Mona Sans, tetapi Larangan di `CLAUDE.md` melarang "daftar Impeccable", dan Mona Sans ada di daftar internal mesin detector. Mona Sans tidak tercantum di `reference/new-work.md:67`. Pemilik perlu memutuskan tafsirnya.

**Overlay:** tidak ada overlay yang terlihat pengguna. CSP situs memblokir skrip detector, jadi detector hanya berjalan di context uji dengan `bypassCSP`. Pada kondisi normal: 0 pelanggaran CSP, 0 page error, 0 request gagal; satu-satunya error console adalah status 404 milik halaman 404.

## Overall Impression

Hero dan Susun Lapis punya sudut pandang, dan keandalan motion-nya bagus. Masalah terbesarnya ada di momen pembuktian: teks sidebar menimpa plate Hasil di studi kasus. Peluang terbesar: buat momen bukti dan momen tindakan sekuat hero.

- Beban kognitif sedang, 2 dari 8 gagal: chunking (Keahlian 41 item dalam 10 grup) dan pilihan minimal (header desktop 9 kontrol ditambah logo, Keahlian 20 token ditambah 5 tautan proyek, menu ponsel 10 kontrol, footer 9 tautan di bawah 4 aksi kontak).
- Perjalanan emosional: puncak nama raksasa dan lapisan tersusun; lembah layar kosong sekitar 1.050 px; puncak tumpukan proyek dan transisi ke sampul; lembah Pengalaman dan Keahlian sekitar 3.500 px; akhir visualnya kuat tetapi isinya paling lemah.

## What's Working

1. Susun Lapis tetap bermakna tanpa animasi: saat reduced motion dan tanpa JS menjadi daftar bertangga yang utuh, teksnya DOM nyata.
2. Hero ponsel tahan: nama, foto, peran, CV, dan kontak muat tanpa scroll pada 375x812, 375x667, dan 360x640. Hanya 320x568 meleset 16 px.
3. Satu bahasa plate di semua perubahan status: loader, menu, tema, dan transisi halaman memakai gerak yang sama.

## Priority Issues

### [P1] 1. Sidebar sticky menimpa plate Hasil di studi kasus
- Apa: "Credentials dan Google OAuth" tercetak melintasi judul "Hasil", tautan GitHub terpotong menjadi "GitHu". Pada 1024, serpihan huruf mengotori kalimat hasilnya. Terlihat di Hismaya, Kripiku, dan SIRADJU, kedua tema, kedua bahasa.
- Akar masalah (terukur di Chromium): `aside` tertahan di dasar seluruh grid, bukan dasar barisnya. Pada 1440x900, scrollY 1598: sidebar di 96 sampai 572 px, plate di 254 sampai 573 px. `aside` berposisi sticky sehingga dilukis di atas plate statis; tinta gelap di atas plate gelap tampak seperti terpotong.
- Mengapa penting: terjadi di bukti terkuat studi kasus, di depan tech lead.
- Perbaikan: pindahkan `aside` dan `article` ke `page-grid` sendiri, dan section Hasil ke `page-grid` terpisah dengan jarak yang sama (`src/sections/project/project-body.tsx:24`, `:102`).
- Perintah: /impeccable layout

### [P1] 2. CV dan kontak tidak selalu terlihat
- Apa, di fold: ukuran nama hanya mengikuti lebar (`src/app/globals.css:50`). Tombol CV: 1280x640 di 635 sampai 683 px (tidak terlihat), 1366x657 di 660 sampai 708 px (tidak terlihat), 1536x730 di 709 sampai 757 px (hanya 21 px terlihat), 1440x900 di 681 sampai 729 px (aman).
- Apa, setelah hero: header desktop tidak punya CV dan menyembunyikan diri saat scroll turun. CV berikutnya sekitar 11.500 px kemudian. Di About dan studi kasus, CV hanya tautan polos di footer.
- Mengapa penting: header memberi tempat permanen untuk tiga pilihan tema, tetapi tidak untuk tindakan yang paling dicari recruiter.
- Perbaikan: batasi nama dengan `clamp(3.5rem, min(16vw, 27svh), 19rem)` (hitungan: 1440x900 dan ponsel tidak berubah; posisi dan kontras persilangan nama perlu diukur ulang, `DESIGN.md:165`). Tambahkan CV ke header (`src/components/shell/site-nav.tsx:180`). Tambahkan CV dan kontak di akhir studi kasus dengan label yang sudah ada.
- Perintah: /impeccable adapt

### [P1] 3. Susun Lapis berakhir dengan layar kosong sekitar 1.050 px
- Apa: pada 1440x900, dari scrollY sekitar 2330 sampai 3380, viewport berisi 0 karakter teks dan header tersembunyi. Yang tampak hanya bidang abu-abu penuh.
- Mengapa penting: lembah tepat setelah puncak terbaik situs; bisa disangka halaman rusak, dan bukti proyek tertunda.
- Perbaikan: turunkan tinggi section ke sekitar `280svh` (`src/app/globals.css:1144`), hitung ulang peta `at` (`src/components/motion/structure-motion.tsx:11`), batasi bagian tanpa teks sampai sekitar 300 px, dengan judul Proyek naik saat fill berakhir.
- Perintah: /impeccable animate

### [P2] 4. Tampilan Keahlian membalik positioning
- Apa: token berisi berarti "punya relasi ke baris Teknologi", tetapi terbaca sebagai "lebih penting". Grup API dan autentikasi serta Arsitektur (8 item, termasuk RBAC dan REST API) semuanya polos; Bootstrap, jQuery, next-intl, dan Zod menonjol.
- Mengapa penting: identitas backend dan keamanan tampak seperti teks nonaktif.
- Perbaikan: samakan warna teks semua item dan tandai item yang bisa dipilih tanpa menambah bobot visual (`src/components/ui/skills-join.tsx:43`); urutkan grup mulai dari API, Arsitektur, Database, Keamanan; pecah "Teknologi dari proyek" (`src/content/skills.ts:81`). Aturan relasi di `src/content/skills.ts:12` adalah keputusan sadar; memperluasnya butuh persetujuan pemilik.
- Perintah: /impeccable clarify

### [P2] 5. Copy dan IA tidak menyampaikan apa yang dicari
- Apa: tujuan bekerja dalam tim baru muncul di paragraf ketiga About; beranda ditutup dengan "ide-ide baru yang lebih inspiratif" (`src/content/profile.ts:69`); S1 dan IPK 3,84 di bawah "Pengalaman Profesional" (`src/sections/home/experience.tsx:16`); fokus backend dan "2,5+ tahun" tidak ada di viewport pertama.
- Mengapa penting: akhir halaman paling diingat, dan recruiter sedang mencocokkan peran.
- Perbaikan: pakai kalimat yang sudah ada di profil (`src/content/profile.ts:215`) untuk penutup Kontak, ganti judul section menjadi "Pengalaman dan Pendidikan", tambahkan cuplikan `about.subHeadline` di dekat peran tanpa mengubah tagline dan tanpa fakta baru.
- Perintah: /impeccable clarify

## Persona Red Flags

- Recruiter: pada 1366x657 "Unduh CV (EN)" tidak terlihat di fold; setelah hero header tidak punya CV; Pendidikan tidak ada di nav; klik "Pengalaman" mendarat dengan header tersembunyi dan pita kosong 64 px.
- Tech lead: menemukan "GitHu" terpotong di Hismaya; tautan Situs dan GitHub tidak ada di sampul; sampul tanpa satu kalimat pun tentang proyeknya; RBAC dan REST API tidak bisa dipilih di Keahlian.
- Sam: Shift+Tab di tumpukan proyek memindahkan fokus ke Govind lalu Hismaya tanpa scroll sehingga namanya tertutup plate lain, perbaikan `.project-slot:has(:focus-visible) { z-index: var(--z-index-plate); }` (P2). Rincian proyek mendahului `h3` di DOM (`src/sections/home/projects.tsx:101`), perbaikan `aria-labelledby` (simpulan dari kode). Urutan Tab, skip link, dan cincin fokus pada CV lolos.
- Riley: ganti bahasa di y=10953 berakhir di y=0 karena hanya hash yang dibawa (`src/components/shell/locale-switch.tsx:30`). Celah 1 px antara foto Kontak dan plate di bawah 768 (`src/app/globals.css:897`).
- Casey: dari tengah halaman CV butuh tiga aksi; bar hitam Keahlian menutup sekitar 70 px dan memotong token "MySQL", setelah token dipilih tingginya 193 px, sekitar 24% layar.

## Minor Observations

- Kontak dan footer menampilkan email, LinkedIn, GitHub, dan CV dua kali dalam satu viewport (`src/components/shell/site-footer.tsx:45`).
- "Indonesia" lebih besar dari judul section (`src/sections/about/languages.tsx:19`), dan `h3` prinsip sama besar dengan `h2` (`src/sections/about/principles.tsx:21`).
- About berakhir tanpa langkah berikutnya selain footer.
- Pada 768, header yang muncul saat scroll naik menutup tab lapisan pertama.
- Pada 1536x730, sudut plate sempat memotong kalimat selama fase runtuh.
- Persilangan nama nyaris tidak terasa di tema terang, sedangkan di tema gelap sangat kuat.
- Logo di 404 bukan tautan.
- Belum dipastikan: garis tipis gelap di tepi plate Kripiku saat flip, mungkin dari pecahan piksel.

## Questions to Consider

- Mengapa sampul proyek menampilkan kata yang sudah tertulis di bawahnya, bukan Susun Lapis milik proyek itu?
- Bila recruiter punya 30 detik, pantaskah Susun Lapis memakan 3.150 px sebelum satu pun proyek muncul?
- Mengapa header memberi tiga tombol untuk tema, tetapi nol untuk CV?
- Bila halaman ini hanya boleh meminta satu hal di akhir, apakah "ide-ide baru yang lebih inspiratif" permintaan itu?

## Cakupan uji

- Dicek ulang di sesi induk: P1 nomor 1 sampai 3 lewat tangkapan layar dan kode, pengukuran sticky di Hismaya, serta data grup Keahlian. Temuan lain berasal dari Assessment A.
- Belum diuji: Safari dan Firefox, pembaca layar sungguhan, momentum sentuh nyata, jaringan lambat, tautan eksternal dan `mailto`, Esc pada menu, tombol Lewati pada loader.
- Hanya simpulan: nilai kontras diambil dari `DESIGN.md`, tidak diukur ulang.
- Sedikit dilihat: Govind dan Mentorin nyaris tidak ditinjau; tangkapan Govind 1024, Mentorin 768, Kripiku 375, dan 404 ponsel dibuat tetapi tidak dibuka.
