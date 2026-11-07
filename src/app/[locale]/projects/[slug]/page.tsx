import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/ui/json-ld";
import { projects } from "@/content/projects";
import { isLocale } from "@/lib/i18n";
import { projectJsonLd } from "@/lib/json-ld";
import { pageMetadata, siteName } from "@/lib/seo";
import { ProjectBody } from "@/sections/project/project-body";
import { ProjectHeader } from "@/sections/project/project-header";
import { ProjectPager } from "@/sections/project/project-pager";

type ProjectParams = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectParams): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = projects.find((candidate) => candidate.slug === slug);
  if (!project || !isLocale(locale)) return {};
  // Peran tanpa nama organisasi, agar judul tidak terpotong di hasil pencarian.
  const [role] = project.role[locale].split(",");
  return pageMetadata({
    locale,
    path: `/projects/${slug}`,
    title: `${project.name}, ${role} | ${siteName}`,
    description: project.brief[locale],
    type: "article",
  });
}

export default async function ProjectPage({ params }: ProjectParams) {
  const { locale, slug } = await params;
  const index = projects.findIndex((candidate) => candidate.slug === slug);
  const project = projects[index];
  if (!isLocale(locale) || !project) notFound();

  return (
    <>
      <JsonLd data={projectJsonLd(locale, project)} />
      <ProjectHeader locale={locale} project={project} index={index} />
      {/* Bidang alas naik menutupi sampul; `data-project-slot` memicu sampul mengecil di bawahnya. */}
      <div data-project-slot="" className="relative bg-canvas">
        <ProjectBody locale={locale} project={project} />
        <ProjectPager locale={locale} index={index} />
      </div>
    </>
  );
}
