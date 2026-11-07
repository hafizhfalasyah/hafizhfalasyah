import type { Project } from "./types";

/**
 * Fakta dari profil. Teks Inggris memakai kalimat CV bila ada, sisanya terjemahan langsung.
 * Urutannya urutan tampil: empat proyek unggulan, lalu SIRADJU, yang tidak termasuk "Proyek Unggulan"
 * di profil; teksnya dari bagian Pengalaman Profesional.
 * Kalimat tidak diubah: `brief` dan `approach` adalah dua kalimat pengantar, `highlights` tiga poin
 * pertama, dan `outcome` poin terakhir.
 */
export const projects: Project[] = [
  {
    slug: "hismaya-cahaya-rahayu",
    name: "Hismaya Cahaya Rahayu",
    role: { id: "Backend Developer, Solveit Indonesia", en: "Backend Developer, Solveit Indonesia" },
    period: { id: "Maret - April 2026", en: "March - April 2026" },
    dates: { start: "2026-03", end: "2026-04" },
    featured: true,
    briefKind: "context",
    brief: {
      id: "Platform layanan sertifikasi dwibahasa yang membutuhkan manajemen konten terstruktur, autentikasi pengguna yang aman, dan alur kerja administratif.",
      en: "A bilingual certification-services platform that needs structured content management, secure user authentication, and administrative workflows.",
    },
    approach: {
      id: "Saya membangun arsitektur backend dari awal sebagai fondasi yang skalabel untuk manajemen konten berbasis database dan kontrol akses yang aman.",
      en: "I built the backend architecture from scratch as a scalable foundation for database-driven content management and secure access control.",
    },
    highlights: {
      id: [
        "Merancang arsitektur backend dengan PostgreSQL, Prisma ORM, dan Next.js Server Actions.",
        "Mengimplementasikan autentikasi dan otorisasi dengan NextAuth: login email, verifikasi nomor telepon Indonesia, Google OAuth, sesi JWT, dan RBAC (ADMIN/USER), termasuk alur kerja administratif yang terlindungi.",
        "Membangun manajemen konten multibahasa, penyimpanan gambar dengan Vercel Blob, penanganan sesi, dan validasi sisi server.",
      ],
      en: [
        "Developed the backend architecture with PostgreSQL, Prisma ORM, and Next.js Server Actions.",
        "Implemented authentication and authorization using NextAuth with email login, Indonesian phone number verification, Google OAuth, JWT sessions, and role-based access control (ADMIN/USER), including protected administrative workflows.",
        "Built multilingual content management, image storage with Vercel Blob, session handling, and server-side validation.",
      ],
    },
    outcome: {
      id: "Menghadirkan platform siap produksi untuk mengelola layanan sertifikasi dan pelatihan bagi administrator dan pengguna akhir.",
      en: "Delivered a production-ready platform for managing certification and training services for administrators and end users.",
    },
    technologies: [
      "Next.js",
      "React.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma ORM",
      "NextAuth",
      "JWT",
      "Zod",
      "Vercel Blob",
      "Tailwind CSS",
      "next-intl",
    ],
    techDetails: {
      "Next.js": {
        id: "App Router, Server Components, Server Actions",
        en: "App Router, Server Components, Server Actions",
      },
      NextAuth: { id: "Credentials dan Google OAuth", en: "Credentials and Google OAuth" },
    },
    links: [
      { kind: "site", href: "https://www.hismaya.com" },
      { kind: "github", href: "https://github.com/hafizhfalasyah/hismaya" },
    ],
  },
  {
    slug: "govind-abra-enterprise",
    name: "Govind Abra Enterprise",
    role: { id: "Backend Developer, Solveit Indonesia", en: "Backend Developer, Solveit Indonesia" },
    period: { id: "September - November 2025", en: "September - November 2025" },
    dates: { start: "2025-09", end: "2025-11" },
    featured: true,
    briefKind: "context",
    brief: {
      id: "Platform profil perusahaan modern yang memperkuat kehadiran digital Govind Abra Enterprise sekaligus memberi wawasan real-time tentang performa website.",
      en: "A modern company profile platform that strengthens Govind Abra Enterprise's digital presence while providing real-time insight into website performance.",
    },
    approach: {
      id: "Saya mengembangkan backend sebagai fondasi untuk manajemen konten, pelacakan pengunjung, dan analitik.",
      en: "I developed the backend as the foundation for content management, visitor tracking, and analytics.",
    },
    highlights: {
      id: [
        "Mengembangkan alur kerja backend dengan Laravel dan MySQL untuk konten profil perusahaan yang terstruktur dan manajemen data terpusat.",
        "Mengimplementasikan autentikasi, otorisasi, dan kontrol akses multi-peran (Admin/User) untuk mengamankan operasi administratif.",
        "Membangun pelacakan pengunjung dan pemrosesan data analitik untuk pemantauan trafik real-time dan visualisasi analitik dinamis.",
      ],
      en: [
        "Developed backend workflows with Laravel and MySQL for structured company profile content and centralized data management.",
        "Implemented authentication, authorization, and multi-role access control (Admin/User) to secure administrative operations.",
        "Built visitor tracking and analytics data processing for real-time traffic monitoring and dynamic analytics visualization.",
      ],
    },
    outcome: {
      id: "Merancang alur kerja backend berorientasi SEO dan menghadirkan platform siap produksi yang mendukung pengelolaan konten skalabel dan keputusan bisnis berbasis data.",
      en: "Designed SEO-oriented backend workflows and delivered a production-ready platform that supports scalable content management and data-driven business decisions.",
    },
    technologies: ["Laravel", "MySQL", "HTML5", "CSS3", "JavaScript", "Tailwind CSS"],
    links: [
      { kind: "site", href: "https://www.govindabraenterprise.com" },
      { kind: "github", href: "https://github.com/hafizhfalasyah/govind" },
    ],
  },
  {
    slug: "kripiku",
    name: "Kripiku",
    role: { id: "Full-Stack Developer, proyek capstone akademik", en: "Full-Stack Developer, academic capstone project" },
    period: { id: "Februari - Mei 2024", en: "February - May 2024" },
    dates: { start: "2024-02", end: "2024-05" },
    featured: true,
    briefKind: "problem",
    brief: {
      id: "Sebuah UMKM lokal masih mengelola katalog produk, stok, dan penjualan secara manual, sehingga efisiensi operasional dan jangkauan online terbatas.",
      en: "A local MSME still managed its product catalog, stock, and sales manually, which limited operational efficiency and online reach.",
    },
    approach: {
      id: "Saya mengembangkan platform e-commerce lengkap untuk mendigitalkan manajemen produk, pembelian, pembayaran, dan pengiriman.",
      en: "I developed a full-featured e-commerce platform to digitize product management, purchasing, payment, and shipping.",
    },
    highlights: {
      id: [
        "Mengembangkan modul katalog produk, manajemen inventaris, pembelian, dan transaksi.",
        "Mengintegrasikan Midtrans Payment Gateway untuk pembayaran online dan RajaOngkir API untuk perhitungan ongkos kirim real-time.",
        "Mengimplementasikan RBAC dan validasi stok untuk menjaga akurasi data.",
      ],
      en: [
        "Developed product catalog, inventory management, purchasing, and transaction modules.",
        "Integrated Midtrans Payment Gateway for online payments and RajaOngkir API for real-time shipping cost calculation.",
        "Implemented role-based access control and stock validation to keep data accurate.",
      ],
    },
    outcome: {
      id: "Meraih Bronze Award di International Capstone Expo 2024 (Technology for Society) dan mendapatkan sertifikat hak cipta Indonesia atas orisinalitas teknis platform.",
      en: "Received the Bronze Award at the International Capstone Expo 2024 (Technology for Society) and was officially registered under an Indonesian copyright certificate, recognizing the platform's technical originality.",
    },
    technologies: [
      "Laravel",
      "MySQL",
      "HTML5",
      "CSS3",
      "JavaScript",
      "Bootstrap",
      "Midtrans Payment Gateway",
      "RajaOngkir API",
    ],
    links: [{ kind: "github", href: "https://github.com/hafizhfalasyah/kripiku" }],
    award: {
      id: "Bronze Award, International Capstone Expo 2024 (Technology for Society), diraih bersama tim",
      en: "Bronze Award, International Capstone Expo 2024 (Technology for Society), received with the team",
    },
  },
  {
    slug: "mentorin-education",
    name: "Mentorin Education",
    role: { id: "Frontend Developer, Solveit Indonesia", en: "Frontend Developer, Solveit Indonesia" },
    period: { id: "Mei - Agustus 2024", en: "May - August 2024" },
    dates: { start: "2024-05", end: "2024-08" },
    featured: true,
    briefKind: "context",
    brief: {
      id: "Platform Computer-Based Test (CBT) yang menghadirkan pengalaman ujian online yang realistis, dilengkapi materi belajar terstruktur dan evaluasi performa.",
      en: "A Computer-Based Test (CBT) platform providing a realistic online examination experience, with structured learning materials and performance evaluation.",
    },
    approach: {
      id: "Saya berfokus membangun antarmuka responsif dan ramah pengguna untuk seluruh alur ujian.",
      en: "I focused on building a responsive, user-friendly interface for the entire exam flow.",
    },
    highlights: {
      id: [
        "Mengembangkan antarmuka responsif untuk modul ujian, dasbor, dan fitur pembelajaran.",
        "Mengimplementasikan timer ujian real-time, navigasi soal, pelacakan progres, dan halaman rekap skor.",
        "Berkolaborasi dengan tim backend untuk mengintegrasikan autentikasi, pembayaran Midtrans, dan modul pembelajaran.",
      ],
      en: [
        "Developed responsive interfaces for exam modules, dashboards, and learning features.",
        "Implemented real-time exam timers, question navigation, progress tracking, and score recap pages.",
        "Collaborated with the backend team to integrate authentication, Midtrans payment processing, and learning modules.",
      ],
    },
    outcome: {
      id: "Menghadirkan pengalaman ujian yang mulus, mulai dari pengerjaan soal hingga rekap skor.",
      en: "Delivered a smooth exam experience, from answering questions to the score recap.",
    },
    technologies: [
      "Laravel",
      "MySQL",
      "HTML5",
      "CSS3",
      "JavaScript",
      "Bootstrap",
      "jQuery",
      "Midtrans Payment Gateway",
    ],
    links: [{ kind: "github", href: "https://github.com/hafizhfalasyah/mentorin" }],
  },
  {
    slug: "siradju",
    name: "SIRADJU",
    role: {
      id: "Software Developer, Program KKN Universitas Negeri Malang",
      en: "Software Developer, KKN Program, Universitas Negeri Malang",
    },
    period: { id: "Januari - Maret 2025", en: "January - March 2025" },
    dates: { start: "2025-01", end: "2025-03" },
    featured: false,
    briefKind: "context",
    brief: {
      id: "Di program KKN Universitas Negeri Malang, saya membangun SIRADJU untuk memodernisasi proses estimasi biaya infrastruktur di Pemerintah Desa Junrejo.",
      en: "In the KKN program at Universitas Negeri Malang, I built SIRADJU to modernize the infrastructure cost estimation process at the Junrejo Village government.",
    },
    approach: {
      id: "Saya menangani seluruh tahapan secara mandiri: analisis kebutuhan, desain sistem, pengembangan, pengujian, pengemasan executable, deployment, hingga serah terima kepada pengguna.",
      en: "I independently managed every stage: requirement analysis, system design, development, testing, executable packaging, deployment, and user handover.",
    },
    highlights: {
      id: [
        "Membangun aplikasi desktop offline dengan Python, Tkinter, dan MySQL.",
        "Mengotomatisasi perhitungan volume pekerjaan, ekstraksi data AHSP dari dokumen PDF, dan ekspor ke template anggaran Excel yang terstandar.",
        "Mengamankan akses pengguna dengan autentikasi berbasis password hashing.",
      ],
      en: [
        "Built an offline desktop application using Python, Tkinter, and MySQL.",
        "Automated project-volume calculations, AHSP data extraction from PDF documents, and export to standardized Excel budgeting templates.",
        "Secured user access with password-hashed authentication.",
      ],
    },
    outcome: {
      id: "Menggantikan proses perhitungan dan input data manual, sehingga staf desa dapat menyusun anggaran lebih efisien dan mengoperasikan sistem secara mandiri.",
      en: "Replaced manual calculation and data-entry steps, so village staff can prepare budgets more efficiently and operate the system independently.",
    },
    technologies: ["Python", "Tkinter", "MySQL"],
    links: [],
  },
];
