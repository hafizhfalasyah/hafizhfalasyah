import type { Certification, L10n, Recognition } from "./types";

/** Fakta dari profil. Bronze Award diraih bersama tim; ReMot hanya satu baris di sini, tanpa halaman proyek. */
export const recognition = {
  title: { id: "Penghargaan dan Hak Cipta", en: "Awards and Copyrights" } satisfies L10n<string>,
  intro: {
    id: "Kripiku meraih Bronze Award dan terdaftar sebagai hak cipta, dan saya memiliki dua Surat Pencatatan Ciptaan terdaftar.",
    en: "Kripiku received the Bronze Award and is registered as a copyright, and I hold two registered Copyright Registration Certificates.",
  } satisfies L10n<string>,
  award: {
    title: { id: "Bronze Award", en: "Bronze Award" },
    subject: "International Capstone Expo 2024",
    year: "2024",
    detail: {
      id: 'Diraih bersama tim untuk Kripiku pada tema "Technology for Society", yang diselenggarakan Departemen Teknik Elektro dan Informatika Universitas Negeri Malang pada 15 Mei 2024.',
      en: 'Received with the team for Kripiku under the theme "Technology for Society", held by the Department of Electrical Engineering and Informatics, Universitas Negeri Malang, on May 15, 2024.',
    },
  } satisfies Recognition,
  copyrights: [
    {
      title: {
        id: "Surat Pencatatan Ciptaan (Kementerian Hukum dan HAM RI)",
        en: "Copyright Registration Certificate (Ministry of Law and Human Rights of Indonesia)",
      },
      subject: "Kripiku",
      year: "2024",
      detail: {
        id: "Program komputer atas perancangan sistem informasi penjualan keripik tempe pada UMKM Keripik Tempe Lesti berbasis web, terdaftar pada 2024.",
        en: "A computer program for the design of a web-based tempeh chip sales information system at the MSME Keripik Tempe Lesti, registered in 2024.",
      },
    },
    {
      title: {
        id: "Surat Pencatatan Ciptaan (Kementerian Hukum dan HAM RI)",
        en: "Copyright Registration Certificate (Ministry of Law and Human Rights of Indonesia)",
      },
      subject: "ReMot (Rental Motor)",
      year: "2023",
      detail: {
        id: "Program komputer berupa aplikasi web untuk memudahkan masyarakat menyewa sepeda motor di Kota Malang, terdaftar pada 2023.",
        en: "A computer program in the form of a web application that makes it easier for people to rent motorcycles in Malang City, registered in 2023.",
      },
    },
  ] satisfies Recognition[],
};

export const credentials = {
  title: { id: "Pelatihan dan Sertifikasi", en: "Training and Certifications" } satisfies L10n<string>,
  intro: {
    id: "Sertifikasi utama saya ada di bidang keamanan siber, yang mendukung praktik secure development di proyek-proyek saya.",
    en: "My main certification is in cybersecurity, which supports secure development practices in my projects.",
  } satisfies L10n<string>,
  items: [
    {
      name: {
        id: "Cyber Security Specialist (Studi Independen Bersertifikat MSIB Batch 7)",
        en: "Cyber Security Specialist (Certified Independent Study, MSIB Batch 7)",
      },
      issuer: "PT Coursenet Bangun Indonesia (Course-Net Indonesia)",
      date: { id: "6 September - 31 Desember 2024", en: "September 6 - December 31, 2024" },
    },
    {
      name: {
        id: "Microsoft Security, Compliance, and Identity Fundamentals",
        en: "Microsoft Security, Compliance, and Identity Fundamentals",
      },
      issuer: {
        id: "Talenta AI Indonesia, bersama Microsoft, Kartu Prakerja, dan Mereka",
        en: "Talenta AI Indonesia, with Microsoft, Kartu Prakerja, and Mereka",
      },
      date: { id: "26 Juni 2024", en: "June 26, 2024" },
    },
    {
      name: { id: "IT Essentials", en: "IT Essentials" },
      issuer: "Cisco Networking Academy",
      date: { id: "7 Mei 2023", en: "May 7, 2023" },
    },
  ] satisfies Certification[],
  program: {
    id: "Pada program Cyber Security Specialist, saya mempelajari pengembangan perangkat lunak yang aman, dasar-dasar OWASP Top 10, serta autentikasi dan kontrol akses, dengan proyek akhir berupa asesmen kerentanan lapisan aplikasi, penetration testing, dan digital forensics.",
    en: "In the Cyber Security Specialist program, I studied secure software development, OWASP Top 10 fundamentals, and authentication and access control, with final projects covering application-layer vulnerability assessment, penetration testing, and digital forensics.",
  } satisfies L10n<string>,
};
