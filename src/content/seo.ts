import type { L10n } from "./types";

type PageText = { title: L10n<string>; description: L10n<string> };

/**
 * Judul dan deskripsi mesin pencari, disusun dari kata kunci di `docs/plan.md`. Setiap fakta ada di
 * profil; deskripsi hanya lebih pendek dari kalimat aslinya agar tidak terpotong di hasil pencarian.
 * Halaman proyek memakai nama, peran, dan `brief` dari `projects.ts`.
 */
export const seoText: { home: PageText; about: PageText } = {
  home: {
    title: {
      id: "Hafizh Falasyah, Software Engineer di Surabaya",
      en: "Hafizh Falasyah, Software Engineer in Surabaya",
    },
    description: {
      id: "Software Engineer di Surabaya. 2,5+ tahun membangun aplikasi web dengan Laravel, Next.js, MySQL, dan PostgreSQL, berfokus pada backend, REST API, dan RBAC.",
      en: "Software Engineer in Surabaya. 2.5+ years building web applications with Laravel, Next.js, MySQL, and PostgreSQL, focused on backend, REST APIs, and RBAC.",
    },
  },
  about: {
    title: {
      id: "Tentang Hafizh Falasyah, Backend dan Full-Stack Web Developer",
      en: "About Hafizh Falasyah, Backend and Full-Stack Web Developer",
    },
    description: {
      id: "S1 Teknik Informatika Universitas Negeri Malang (Cum Laude), Bronze Award bersama tim di International Capstone Expo 2024, dan pelatihan Cyber Security Specialist.",
      en: "Informatics Engineering graduate of Universitas Negeri Malang (Cum Laude), team Bronze Award at International Capstone Expo 2024, Cyber Security Specialist training.",
    },
  },
};
