import type { L10n, StructureLayer } from "./types";

type TermEntry = { term: string; detail: string };

/** Fakta berasal dari `docs/Profil Lengkap Hafizh Falasyah — Konten Website Portofolio.md`. */
export const profile = {
  name: { first: "Hafizh", last: "Falasyah" },
  role: "Software Engineer",
  email: "hafizhfalasyah1@gmail.com",
  linkedin: { href: "https://linkedin.com/in/hafizhfalasyah", label: "LinkedIn" },
  github: { href: "https://github.com/hafizhfalasyah", label: "GitHub" },
  location: {
    id: "Surabaya, Jawa Timur, Indonesia",
    en: "Surabaya, East Java, Indonesia",
  } satisfies L10n<string>,
  cvHref: "/cv/hafizh-falasyah-cv.pdf",
  tagline: {
    id: "Membangun perangkat lunak yang aman, skalabel, mudah dirawat, dan berfokus pada pengguna, dari kebutuhan bisnis hingga produksi.",
    en: "Building software that is secure, scalable, maintainable, and user-focused, from business requirements to production.",
  } satisfies L10n<string>,
  principle: {
    title: {
      id: "Struktur sebelum antarmuka",
      en: "Structure before interface",
    },
    body: {
      id: "Saya memulai dari model data, alur bisnis, dan hak akses, lalu membangun tampilan di atas fondasi itu.",
      en: "I start from the data model, business flow, and access control, then build the interface on top of that foundation.",
    },
  } satisfies Record<string, L10n<string>>,
  /** Urutan kerja seperti kalimat di atas: fondasi lebih dulu, tampilan terakhir. */
  layers: {
    id: [
      { label: "Model data", technologies: ["MySQL", "PostgreSQL", "Desain database relasional", "Migrasi database"] },
      { label: "Alur bisnis", technologies: ["REST API", "MVC", "Repository Pattern", "Service Layer"] },
      { label: "Hak akses", technologies: ["Autentikasi", "RBAC", "Google OAuth", "Password hashing"] },
      { label: "Tampilan", technologies: ["React.js", "Next.js", "Tailwind CSS"] },
    ],
    en: [
      { label: "Data model", technologies: ["MySQL", "PostgreSQL", "Relational database design", "Database migration"] },
      { label: "Business flow", technologies: ["REST API", "MVC", "Repository Pattern", "Service Layer"] },
      { label: "Access control", technologies: ["Authentication", "RBAC", "Google OAuth", "Password hashing"] },
      { label: "Interface", technologies: ["React.js", "Next.js", "Tailwind CSS"] },
    ],
  } satisfies L10n<StructureLayer[]>,
  projects: {
    title: { id: "Proyek Unggulan", en: "Featured Projects" },
    intro: {
      id: "Empat proyek berikut mewakili rentang pekerjaan saya, dari backend hingga frontend dan dari proyek klien hingga capstone akademik.",
      en: "The following four projects represent the range of my work, from backend to frontend and from client projects to an academic capstone.",
    },
    /** Pengantar SIRADJU: bukan bagian dari "empat proyek", kalimatnya dari Tentang Saya. */
    beyond: {
      id: "Di luar itu, saya membangun sebuah sistem desktop untuk pemerintah desa secara mandiri selama Kuliah Kerja Nyata (KKN) Universitas Negeri Malang.",
      en: "Beyond that, I independently built a desktop system for a village government during the Kuliah Kerja Nyata (KKN) program at Universitas Negeri Malang.",
    },
  } satisfies Record<string, L10n<string>>,
  experience: {
    title: { id: "Pengalaman Profesional", en: "Professional Experience" },
  } satisfies Record<string, L10n<string>>,
  skills: {
    title: { id: "Keahlian Teknis", en: "Technical Skills" },
    intro: {
      id: "Keahlian utama saya ada di Laravel, Next.js, dan database relasional (MySQL dan PostgreSQL), didukung desain API dan keamanan aplikasi.",
      en: "My core expertise is in Laravel, Next.js, and relational databases (MySQL and PostgreSQL), supported by API design and application security.",
    },
  } satisfies Record<string, L10n<string>>,
  contact: {
    id: "Terima kasih sudah berkunjung. Saya terbuka untuk berdiskusi dan berkolaborasi menciptakan ide-ide baru yang lebih inspiratif.",
    en: "Thank you for visiting. I am open to discussing and collaborating on new, more inspiring ideas.",
  } satisfies L10n<string>,
  principles: {
    title: { id: "Fokus dan Cara Kerja", en: "Focus and Way of Working" } satisfies L10n<string>,
    intro: {
      id: "Saya bekerja dengan lima prinsip yang konsisten di setiap proyek:",
      en: "I work by five principles that stay consistent across every project:",
    } satisfies L10n<string>,
    items: {
      id: [
        {
          term: "Struktur sebelum antarmuka.",
          detail:
            "Saya memulai dari model data, alur bisnis, dan hak akses, lalu membangun tampilan di atas fondasi itu.",
        },
        {
          term: "Keamanan sejak awal.",
          detail:
            "Password hashing, Google OAuth, RBAC, validasi sisi server, dan dasar-dasar OWASP Top 10, diperkuat pelatihan Cyber Security Specialist.",
        },
        {
          term: "Mudah dirawat.",
          detail:
            "Pola MVC, Repository, dan Service Layer, serta PHPUnit untuk logika bisnis inti dan endpoint API agar perubahan kode lebih aman.",
        },
        {
          term: "Kepemilikan end-to-end.",
          detail:
            "Analisis kebutuhan, desain sistem, pengembangan, pengujian, deployment di VPS maupun shared hosting, hingga serah terima kepada pengguna.",
        },
        {
          term: "Menerjemahkan kebutuhan non-teknis.",
          detail:
            "Kebutuhan klien atau pengguna akhir yang sering kali belum teknis saya ubah menjadi desain sistem yang jelas dan dapat dieksekusi.",
        },
      ],
      en: [
        {
          term: "Structure before interface.",
          detail:
            "I start from the data model, business flow, and access control, then build the interface on top of that foundation.",
        },
        {
          term: "Security from the start.",
          detail:
            "Password hashing, Google OAuth, RBAC, server-side validation, and OWASP Top 10 fundamentals, reinforced by Cyber Security Specialist training.",
        },
        {
          term: "Maintainable.",
          detail:
            "MVC, Repository, and Service Layer patterns, plus PHPUnit for core business logic and API endpoints so code changes are safer.",
        },
        {
          term: "End-to-end ownership.",
          detail:
            "Requirement analysis, system design, development, testing, deployment on VPS and shared hosting, through to user handover.",
        },
        {
          term: "Translating non-technical needs.",
          detail:
            "I turn client or end-user needs, which are often not yet technical, into clear and executable system designs.",
        },
      ],
    } satisfies L10n<TermEntry[]>,
  },
  softSkills: {
    title: { id: "Soft Skills", en: "Soft Skills" } satisfies L10n<string>,
    intro: {
      id: "Beberapa kemampuan nonteknis yang paling sering saya pakai dalam proyek nyata:",
      en: "A few non-technical skills I use most often in real projects:",
    } satisfies L10n<string>,
    items: {
      id: [
        {
          term: "Problem solving.",
          detail:
            "Menerjemahkan kebutuhan klien atau pengguna akhir, yang sering kali non-teknis, menjadi desain sistem yang jelas dan dapat dieksekusi.",
        },
        {
          term: "Kepemilikan dan kemandirian.",
          detail: "Mengelola proyek dari analisis kebutuhan sampai deployment dan serah terima dengan supervisi minimal.",
        },
        {
          term: "Komunikasi dan kolaborasi.",
          detail:
            "Bekerja lintas tim backend dan frontend, serta berkomunikasi langsung dengan klien agar ekspektasi selaras dengan hasil yang dikirim.",
        },
        {
          term: "Manajemen waktu.",
          detail: "Menangani beberapa proyek klien freelance secara paralel tanpa mengorbankan kualitas kode.",
        },
        {
          term: "Adaptasi teknologi.",
          detail: "Terlihat dari stack yang cukup luas, mulai dari pengembangan web modern hingga aplikasi desktop offline.",
        },
      ],
      en: [
        {
          term: "Problem solving.",
          detail:
            "Translating client or end-user needs, which are often non-technical, into clear and executable system designs.",
        },
        {
          term: "Ownership and independence.",
          detail: "Managing projects from requirement analysis through deployment and handover with minimal supervision.",
        },
        {
          term: "Communication and collaboration.",
          detail:
            "Working across backend and frontend teams, and communicating directly with clients so expectations align with what is delivered.",
        },
        {
          term: "Time management.",
          detail: "Handling several freelance client projects in parallel without sacrificing code quality.",
        },
        {
          term: "Technology adaptation.",
          detail: "Shown by a fairly broad stack, from modern web development to offline desktop applications.",
        },
      ],
    } satisfies L10n<TermEntry[]>,
  },
  languages: {
    title: { id: "Bahasa", en: "Languages" } satisfies L10n<string>,
    items: {
      id: [
        { term: "Indonesia", detail: "Penutur asli" },
        { term: "Inggris", detail: "Tingkat lanjut" },
      ],
      en: [
        { term: "Indonesian", detail: "Native" },
        { term: "English", detail: "Advanced" },
      ],
    } satisfies L10n<TermEntry[]>,
  },
  about: {
    title: { id: "Tentang Saya", en: "About Me" } satisfies L10n<string>,
    subHeadline: {
      id: "Software Engineer asal Surabaya dengan pengalaman 2,5+ tahun membangun aplikasi web berbasis Laravel, Next.js, MySQL, dan PostgreSQL, dengan fokus pada arsitektur backend, REST API, serta autentikasi dan RBAC.",
      en: "Software Engineer from Surabaya with 2.5+ years of experience building web applications with Laravel, Next.js, MySQL, and PostgreSQL, focused on backend architecture, REST APIs, and authentication and RBAC.",
    } satisfies L10n<string>,
    paragraphs: {
      id: [
        "Halo, saya Hafizh Falasyah, Software Engineer yang berbasis di Surabaya, Jawa Timur. Saya berfokus pada sisi backend pengembangan web: merancang skema database relasional, membangun REST API, serta mengimplementasikan autentikasi dan role-based access control (RBAC) yang tetap andal dalam penggunaan nyata. Stack utama saya adalah Laravel, Next.js, MySQL, dan PostgreSQL, dilengkapi pengalaman di React dan pengembangan full-stack.",
        "Selama 2,5+ tahun sebagai freelance developer di Solveit Indonesia, saya telah menyelesaikan lebih dari lima aplikasi web siap produksi untuk sektor bisnis, pendidikan, sertifikasi, dan organisasi. Di luar itu, saya membangun sebuah sistem desktop untuk pemerintah desa secara mandiri selama Kuliah Kerja Nyata (KKN) Universitas Negeri Malang. Saya lulus S1 Teknik Informatika dengan IPK 3,84/4,00 dan predikat Cum Laude.",
        "Pengalaman itu membentuk cara berpikir yang praktis: menulis kode yang berjalan adalah bagian yang mudah, sedangkan pekerjaan sebenarnya adalah merancang sistem yang tetap aman, mudah dirawat, dan mudah dikembangkan ketika pengguna dan data nyata mulai masuk. Saya cenderung berpikir tentang struktur terlebih dahulu, baru antarmuka. Ke depan, saya ingin bertumbuh dalam lingkungan tim untuk memperdalam keahlian arsitektur backend dan sistem yang skalabel, sambil berkontribusi pada produk yang berdampak nyata dan terukur.",
      ],
      en: [
        "Hi, I'm Hafizh Falasyah, a Software Engineer based in Surabaya, East Java. I focus on the backend side of web development: designing relational database schemas, building REST APIs, and implementing authentication and role-based access control (RBAC) that stay reliable in real use. My main stack is Laravel, Next.js, MySQL, and PostgreSQL, complemented by experience in React and full-stack development.",
        "Over 2.5+ years as a freelance developer at Solveit Indonesia, I have completed more than five production-ready web applications for the business, education, certification, and organization sectors. Beyond that, I independently built a desktop system for a village government during the Kuliah Kerja Nyata (KKN) program at Universitas Negeri Malang. I graduated with a bachelor's degree in Informatics Engineering with a GPA of 3.84/4.00 and Cum Laude honors.",
        "That experience shaped a practical way of thinking: writing code that runs is the easy part, while the real work is designing systems that stay secure, maintainable, and easy to extend once real users and data arrive. I tend to think about structure first, then the interface. Going forward, I want to grow in a team environment to deepen my expertise in backend architecture and scalable systems, while contributing to products with real, measurable impact.",
      ],
    } satisfies L10n<string[]>,
  },
};
