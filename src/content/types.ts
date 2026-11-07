import type { Locale } from "@/lib/i18n";
import type { PhotoId } from "./photos";

/** Setiap teks wajib punya semua locale, sehingga terjemahan yang hilang gagal saat typecheck. */
export type L10n<T> = Record<Locale, T>;

export type StructureLayer = {
  label: string;
  technologies: string[];
};

/** Dipakai bersama oleh proyek dan keahlian, agar relasi keduanya diperiksa saat kompilasi. */
export type TechId =
  | "Next.js"
  | "React.js"
  | "TypeScript"
  | "PostgreSQL"
  | "Prisma ORM"
  | "NextAuth"
  | "JWT"
  | "Zod"
  | "Vercel Blob"
  | "Tailwind CSS"
  | "next-intl"
  | "Laravel"
  | "MySQL"
  | "HTML5"
  | "CSS3"
  | "JavaScript"
  | "Bootstrap"
  | "jQuery"
  | "Midtrans Payment Gateway"
  | "RajaOngkir API"
  | "Python"
  | "Tkinter";

type ProjectLink = {
  kind: "site" | "github";
  href: string;
};

export type Project = {
  slug: string;
  name: string;
  role: L10n<string>;
  period: L10n<string>;
  /** Periode yang sama dalam format ISO, untuk `temporalCoverage` di JSON-LD. */
  dates: { start: string; end: string };
  /** Empat proyek unggulan di profil; SIRADJU tercantum sebagai pengalaman. */
  featured: boolean;
  /** Kalimat pembuka profil. Berlabel "problem" hanya bila profil menyebut masalahnya secara eksplisit. */
  brief: L10n<string>;
  briefKind: "context" | "problem";
  /** Kalimat kedua profil: apa yang dikerjakan. */
  approach: L10n<string>;
  highlights: L10n<string[]>;
  /** Poin terakhir di profil, yang menyatakan hasil. Dilewati bila profil tidak memuatnya. */
  outcome?: L10n<string>;
  technologies: TechId[];
  /** Rincian dalam tanda kurung pada baris "Teknologi" di profil. */
  techDetails?: Partial<Record<TechId, L10n<string>>>;
  links: ProjectLink[];
  award?: L10n<string>;
  /**
   * Gambar asli pengganti plate tipografi. Langkah: tambahkan file ke `assets/photos/source`, daftarkan
   * di `PHOTOS` pada `scripts/grade-photos.mjs`, jalankan `pnpm photos`, lalu isi alt di `photoAlt`.
   */
  cover?: { photo: PhotoId };
};

export type ExperienceEntry = {
  title: L10n<string>;
  organization: L10n<string>;
  period: L10n<string>;
  detail?: L10n<string>;
  summary?: L10n<string>;
  responsibilities?: L10n<string[]>;
  /** Tertulis apa adanya dari baris "Teknologi" pada pengalaman di profil. */
  technologies?: string[];
  projectSlugs?: string[];
};

export type SkillItem = {
  label: L10n<string>;
  /** Hanya bila tercantum di baris "Teknologi" sebuah proyek; selain itu teks biasa. */
  tech?: TechId;
};

export type SkillGroup = {
  title: L10n<string>;
  items: SkillItem[];
};

export type EducationEntry = {
  school: string;
  /** Tipe schema.org untuk `alumniOf` di JSON-LD. */
  schemaType: "CollegeOrUniversity" | "HighSchool";
  program: L10n<string>;
  period: L10n<string>;
  detail: L10n<string>;
};

export type Recognition = {
  title: L10n<string>;
  subject?: string;
  year: string;
  detail: L10n<string>;
};

export type Certification = {
  name: L10n<string>;
  issuer: string | L10n<string>;
  date: L10n<string>;
};

export type NavItem = {
  href: string;
  label: string;
  /** ID section di beranda yang menandai tautan ini aktif. */
  section?: string;
};

export type Messages = {
  home: string;
  skipToContent: string;
  downloadCv: string;
  connect: string;
  backToTop: string;
  openProject: string;
  previousProject: string;
  nextProject: string;
  project: {
    breadcrumbLabel: string;
    pagerLabel: string;
    technologies: string;
    links: string;
    award: string;
    context: string;
    problem: string;
    approach: string;
    outcome: string;
    site: string;
    github: string;
  };
  skills: {
    hint: string;
    /** `{tech}` dan `{count}` diisi di komponen. */
    usedInOne: string;
    usedInMany: string;
    listLabel: string;
  };
  credentials: {
    name: string;
    issuer: string;
    date: string;
  };
  notFound: {
    title: string;
    body: string;
    back: string;
  };
  nav: {
    label: string;
    footerLabel: string;
    menuLabel: string;
    menuOpen: string;
    menuClose: string;
    projects: string;
    experience: string;
    about: string;
  };
  loader: {
    skip: string;
    /** Satu label per plate, sesuai pekerjaan yang ditunggu: HTML, font, foto, aplikasi. */
    steps: [string, string, string, string];
  };
  localeLabel: string;
  localeNames: Record<Locale, string>;
  themeLabel: string;
  themeModes: { system: string; light: string; dark: string };
};
