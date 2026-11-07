import type { L10n, SkillGroup, SkillItem, TechId } from "./types";

const both = (text: string): L10n<string> => ({ id: text, en: text });

/** Nama sama di kedua bahasa dan tercantum di baris "Teknologi" proyek. */
const tech = (id: TechId): SkillItem => ({ label: both(id), tech: id });

/** Keahlian yang tidak tercantum di baris "Teknologi" proyek mana pun: tampil, tetapi tanpa relasi. */
const plain = (text: string, en: string = text): SkillItem => ({ label: { id: text, en } });

/**
 * Tabel "Keahlian Teknis" di profil, dengan kategori dan istilah Inggris dari CV. Relasi hanya ada bila
 * namanya memang tertulis di baris "Teknologi" sebuah proyek, jadi PHP tidak tertaut ke proyek Laravel
 * dan RBAC tidak tertaut meski disebut di poin pekerjaan. Urutan grup mengikuti fokus backend di profil.
 */
export const skillGroups: SkillGroup[] = [
  {
    title: { id: "API dan autentikasi", en: "API and authentication" },
    items: [
      plain("REST API"),
      plain("Desain RESTful API", "RESTful API design"),
      plain("Autentikasi", "Authentication"),
      plain("Role-Based Access Control (RBAC)"),
    ],
  },
  {
    title: { id: "Arsitektur dan design pattern", en: "Architecture and design patterns" },
    items: [
      plain("MVC"),
      plain("Repository Pattern"),
      plain("Service Layer"),
      plain("Object-Oriented Programming (OOP)"),
    ],
  },
  {
    title: { id: "Database", en: "Database" },
    items: [
      tech("MySQL"),
      tech("PostgreSQL"),
      plain("Desain database relasional", "Relational database design"),
      plain("Migrasi database", "Database migration"),
    ],
  },
  {
    title: { id: "Keamanan", en: "Security" },
    items: [
      // Di profil tertulis "NextAuth (Credentials dan Google OAuth)" pada baris Teknologi Hismaya.
      { label: both("Google OAuth"), tech: "NextAuth" },
      plain("Password hashing"),
      plain("Dasar-dasar OWASP Top 10", "OWASP Top 10 fundamentals"),
    ],
  },
  {
    title: { id: "Bahasa pemrograman", en: "Programming languages" },
    items: [plain("PHP"), tech("JavaScript"), tech("TypeScript"), tech("Python"), plain("SQL")],
  },
  {
    title: { id: "Framework dan library", en: "Frameworks and libraries" },
    items: [
      tech("Laravel"),
      tech("React.js"),
      tech("Next.js"),
      tech("Tailwind CSS"),
      tech("Bootstrap"),
      tech("jQuery"),
    ],
  },
  {
    title: { id: "Tools dan DevOps", en: "Tools and DevOps" },
    items: [plain("Git"), plain("GitHub"), plain("Vite"), plain("Deployment VPS", "VPS deployment"), plain("PHPUnit")],
  },
  {
    title: { id: "Integrasi pihak ketiga", en: "Third-party integration" },
    items: [tech("Midtrans Payment Gateway"), tech("RajaOngkir API")],
  },
  {
    title: { id: "Metodologi", en: "Methodologies" },
    items: [plain("Software Development Lifecycle (SDLC)"), plain("Agile Software Development")],
  },
  {
    title: { id: "Teknologi dari proyek", en: "Technologies from projects" },
    items: [
      tech("Prisma ORM"),
      tech("NextAuth"),
      tech("Zod"),
      tech("Vercel Blob"),
      tech("next-intl"),
      { label: both("Python Tkinter"), tech: "Tkinter" },
    ],
  },
];
