import { SkillsJoin } from "@/components/ui/skills-join";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";

/** Keahlian sebagai relasi ke proyek: menjawab "pernah pakai ini di mana?" tanpa progress bar buatan. */
export function Skills({ locale }: { locale: Locale }) {
  const t = ui[locale];

  return (
    <section id="skills" className="page-grid gap-y-6 pb-section" aria-labelledby="skills-title">
      <h2 id="skills-title" data-reveal="" className="type-title col-span-full xl:col-span-9">
        {profile.skills.title[locale]}
      </h2>
      <p className="col-span-full max-w-prose text-lead text-ink-2">{profile.skills.intro[locale]}</p>

      <SkillsJoin
        locale={locale}
        groups={skillGroups.map((group) => ({
          title: group.title[locale],
          items: group.items.map((item) => ({ label: item.label[locale], tech: item.tech })),
        }))}
        projects={projects.map((project) => ({
          slug: project.slug,
          name: project.name,
          period: project.period[locale],
          technologies: project.technologies,
        }))}
        labels={t.skills}
        openProject={t.openProject}
      />
    </section>
  );
}
