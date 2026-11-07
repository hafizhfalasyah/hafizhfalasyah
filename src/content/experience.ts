import type { ExperienceEntry } from "./types";

/** Fakta dari profil. Rincian SIRADJU ada di halaman proyeknya, jadi di sini hanya ringkasannya. */
export const experience: ExperienceEntry[] = [
  {
    title: { id: "Full-Stack Web Developer", en: "Full-Stack Web Developer" },
    organization: { id: "Solveit Indonesia (Freelance, Remote)", en: "Solveit Indonesia (Freelance, Remote)" },
    period: { id: "Januari 2024 - Sekarang", en: "January 2024 - Present" },
    summary: {
      id: "Sebagai freelance Full-Stack Web Developer, saya mengerjakan aplikasi web untuk klien di sektor bisnis, pendidikan, sertifikasi, dan organisasi, dengan tanggung jawab atas seluruh siklus pengembangan, dari analisis kebutuhan hingga deployment dan pemeliharaan. Dalam 2,5+ tahun, saya menyelesaikan lebih dari lima aplikasi web siap produksi sambil terus meningkatkan keandalan dan kemudahan perawatan tiap sistem.",
      en: "As a freelance Full-Stack Web Developer, I build web applications for clients in the business, education, certification, and organization sectors, responsible for the entire development cycle, from requirement analysis to deployment and maintenance. Over 2.5+ years, I have completed more than five production-ready web applications while continually improving the reliability and maintainability of each system.",
    },
    responsibilities: {
      id: [
        "Merancang skema database relasional dan REST API untuk alur kerja multi-pengguna.",
        "Mengimplementasikan autentikasi dan role-based access control (RBAC).",
        "Mengintegrasikan Midtrans untuk pembayaran online dan RajaOngkir untuk otomatisasi logistik.",
        "Men-deploy dan memelihara aplikasi di lingkungan VPS dan shared hosting.",
        "Memperkenalkan unit test PHPUnit untuk logika bisnis inti dan endpoint API, agar perubahan kode selama pengembangan berjalan lebih aman.",
      ],
      en: [
        "Designed relational database schemas and REST APIs for multi-user workflows.",
        "Implemented authentication and role-based access control (RBAC).",
        "Integrated Midtrans for online payments and RajaOngkir for logistics automation.",
        "Deployed and maintained applications across VPS and shared hosting environments.",
        "Introduced PHPUnit unit tests for core business logic and API endpoints to support safer code changes during development.",
      ],
    },
    technologies: ["Laravel", "React", "Next.js", "MySQL", "PostgreSQL"],
    projectSlugs: ["hismaya-cahaya-rahayu", "govind-abra-enterprise", "mentorin-education"],
  },
  {
    title: { id: "Software Developer", en: "Software Developer" },
    organization: { id: "Program KKN, Universitas Negeri Malang", en: "KKN Program, Universitas Negeri Malang" },
    period: { id: "Januari - Maret 2025", en: "January - March 2025" },
    summary: {
      id: "Di program KKN Universitas Negeri Malang, saya membangun SIRADJU untuk memodernisasi proses estimasi biaya infrastruktur di Pemerintah Desa Junrejo.",
      en: "In the KKN program at Universitas Negeri Malang, I built SIRADJU to modernize the infrastructure cost estimation process at the Junrejo Village government.",
    },
    technologies: ["Python", "Tkinter", "MySQL"],
    projectSlugs: ["siradju"],
  },
  {
    title: { id: "S1 Teknik Informatika", en: "Bachelor's Degree in Informatics Engineering" },
    organization: { id: "Universitas Negeri Malang", en: "Universitas Negeri Malang" },
    period: { id: "Agustus 2022 - Januari 2026", en: "August 2022 - January 2026" },
    detail: { id: "IPK 3,84/4,00, Cum Laude", en: "GPA 3.84/4.00, Cum Laude" },
    projectSlugs: ["kripiku"],
  },
];
