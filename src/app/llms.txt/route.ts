import { credentials, recognition } from "@/content/credentials";
import { education } from "@/content/education";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import { absoluteUrl, siteName } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * Dibangkitkan dari data konten, jadi tidak bisa menyimpang dari halaman. Sengaja tidak menautkan CV:
 * PDF itu memuat nomor telepon, sedangkan ringkasan ini hanya memberi email, LinkedIn, dan GitHub.
 */
function body(): string {
  const issuerName = (issuer: (typeof credentials.items)[number]["issuer"]) =>
    typeof issuer === "string" ? issuer : issuer.en;

  return [
    `# ${siteName}`,
    "",
    `> ${profile.about.subHeadline.en}`,
    "",
    `${profile.tagline.en} This site is available in English (/en) and Indonesian (/id).`,
    "",
    `- Role: ${profile.role}`,
    `- Location: ${profile.location.en}`,
    `- Email: ${profile.email}`,
    `- LinkedIn: ${profile.linkedin.href}`,
    `- GitHub: ${profile.github.href}`,
    `- Languages: ${profile.languages.items.en.map((item) => `${item.term} (${item.detail})`).join(", ")}`,
    "",
    "## Pages",
    "",
    `- [Home](${absoluteUrl("/en")}): summary, projects, experience, skills, and contact.`,
    `- [About](${absoluteUrl("/en/about")}): background, principles, education, awards, and certifications.`,
    `- [Beranda](${absoluteUrl("/id")}): versi Indonesia.`,
    `- [Tentang](${absoluteUrl("/id/about")}): versi Indonesia.`,
    "",
    "## Projects",
    "",
    ...projects.map(
      (project) =>
        `- [${project.name}](${absoluteUrl(`/en/projects/${project.slug}`)}): ${project.role.en}, ${project.period.en}. ${project.brief.en} Technologies: ${project.technologies.join(", ")}.`,
    ),
    "",
    "## Experience",
    "",
    ...experience
      .filter((entry) => entry.summary)
      .map((entry) => `- ${entry.title.en}, ${entry.organization.en}, ${entry.period.en}. ${entry.summary?.en}`),
    "",
    "## Skills",
    "",
    profile.skills.intro.en,
    "",
    ...skillGroups.map((group) => `- ${group.title.en}: ${group.items.map((item) => item.label.en).join(", ")}`),
    "",
    "## Education",
    "",
    ...education.map((entry) => `- ${entry.school}, ${entry.program.en}, ${entry.period.en}. ${entry.detail.en}`),
    "",
    "## Awards and copyrights",
    "",
    `- ${recognition.award.title.en}, ${recognition.award.subject}. ${recognition.award.detail.en}`,
    ...recognition.copyrights.map((item) => `- ${item.title.en}, ${item.subject}. ${item.detail.en}`),
    "",
    "## Certifications",
    "",
    ...credentials.items.map((item) => `- ${item.name.en}, ${issuerName(item.issuer)}, ${item.date.en}.`),
    "",
  ].join("\n");
}

export function GET(): Response {
  return new Response(body(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
