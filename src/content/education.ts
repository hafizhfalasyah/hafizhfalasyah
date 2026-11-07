import type { EducationEntry, L10n } from "./types";

export const educationTitle: L10n<string> = { id: "Pendidikan", en: "Education" };

/** Fakta dari profil. */
export const education: EducationEntry[] = [
  {
    school: "Universitas Negeri Malang",
    schemaType: "CollegeOrUniversity",
    program: { id: "S1 Teknik Informatika", en: "Bachelor's Degree in Informatics Engineering" },
    period: { id: "Agustus 2022 - Januari 2026", en: "August 2022 - January 2026" },
    detail: {
      id: "IPK 3,84/4,00, lulus dengan predikat Cum Laude. Studi akademik saya konsisten dipadukan dengan proyek terapan, antara lain Kripiku, platform e-commerce capstone yang meraih pengakuan internasional, dan program KKN tempat saya membangun sistem digital untuk pemerintah desa.",
      en: "GPA 3.84/4.00, graduated Cum Laude. My academic studies were consistently combined with applied projects, including Kripiku, a capstone e-commerce platform that earned international recognition, and the KKN program, where I built a digital system for a village government.",
    },
  },
  {
    school: "SMAN 2 Lumajang",
    schemaType: "HighSchool",
    program: { id: "Ilmu Pengetahuan Alam (MIPA)", en: "Natural Sciences (MIPA)" },
    period: { id: "2019 - 2022", en: "2019 - 2022" },
    detail: {
      id: "Membangun fondasi kuat dalam matematika, penalaran analitis, dan pemecahan masalah ilmiah, yang kemudian mendukung studi saya di Teknik Informatika dan pengembangan perangkat lunak.",
      en: "Built a strong foundation in mathematics, analytical reasoning, and scientific problem solving, which later supported my studies in Informatics Engineering and software development.",
    },
  },
];
