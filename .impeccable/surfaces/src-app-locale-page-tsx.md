---
version: 1
slug: "src-app-locale-page-tsx"
primary_target: "src/app/[locale]/page.tsx"
related_targets: []
---

# Beranda portofolio

Scope: beranda dan keluarga halamannya (about, studi kasus). Visitor mode: Experience, dengan tindakan utama yang selalu terlihat.

Audiens dan tugas: recruiter dan tech lead menilai kandidat, lalu mengunduh CV atau menghubungi. Klien freelance adalah audiens kedua. Semua fakta dari file profil.

## Direction contract

THESIS: Halaman adalah maket kartu yang disusun dari bawah ke atas: model data, alur bisnis, hak akses, lalu tampilan, persis seperti kalimat profil. Menolak susunan standar hero, grid skill, kartu proyek, timeline, serta pola koran hairline dengan serif italic dan label mono renggang.

OWN-WORLD: Monochrome murni chroma 0, bidang kartu bernada solid sebagai material, radius 0, kedalaman dari tumpukan bidang dan bukan garis tipis. Mona Sans lebar dan berat untuk nama, normal untuk teks, sempit untuk meta; Martian Mono hanya untuk teknologi dan periode. Foto grayscale kontras dengan grain seragam.

STORY: Pengunjung mengerti siapa Hafizh dalam satu viewport, melihat cara berpikirnya lewat Susun Lapis, membuktikannya pada proyek nyata, lalu mengunduh CV atau menghubungi.

FIRST VIEWPORT: Nav satu baris 64px. Nama dua baris ukuran display-l rata kiri, baris kedua melintasi plate foto-7 di kolom 7 sampai 11 pada area dinding di atas kepala, dengan salinan aria-hidden berwarna gelap yang dipotong plate. Di bawah nama: peran, tagline, Unduh CV, Mari terhubung. Plate foto turun melewati fold.

FORM: Maket kartu aksonometri, posisi 1 pada daftar kandidat, dipilih pemilik sebagai arah alternatif. Interaksi khas Susun Lapis: pin sekitar 180svh, CSS 3D tanpa perspektif, teks DOM nyata. seed:d50c0381ac440c24

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

Domain sendiri menyusul setelah rilis di vercel.app. Terjemahan Inggris perlu ditinjau pemilik.
