import { TransitionLink } from "@/components/shell/transition-link";
import { Photo } from "@/components/ui/photo";
import type { Project } from "@/content/types";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { coverTone } from "./tones";

type ProjectHeaderProps = {
  locale: Locale;
  project: Project;
  index: number;
};

/**
 * Sampul proyek: plate tipografi yang dibangkitkan dari data, tanpa mockup. Nama di kiri bawah tiba
 * di posisi yang sama dengan label plate transisi. Bila `cover` diisi, gambar menggantikan kata besar.
 */
export function ProjectHeader({ locale, project, index }: ProjectHeaderProps) {
  const t = ui[locale];

  return (
    <div data-project-slot="" className="case-slot">
      <header data-project-plate="" className={`case-cover ${coverTone(index)}`}>
        {project.cover ? null : (
          <span aria-hidden="true" data-drift="" className="project-ghost project-ghost-top">
            {project.name.split(" ")[0]}
          </span>
        )}

        <nav aria-label={t.project.breadcrumbLabel}>
          <ol className="flex flex-wrap items-center gap-x-3">
            <li>
              <TransitionLink href={`/${locale}`} className="flex min-h-12 items-center underline">
                {t.home}
              </TransitionLink>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{project.name}</li>
          </ol>
        </nav>

        {project.cover ? (
          <Photo id={project.cover.photo} locale={locale} priority sizes="100vw" className="case-cover-photo" />
        ) : null}

        <div className="flex flex-col gap-6">
          <h1 data-reveal="" className="project-name type-project">
            {project.name}
          </h1>
          <div className="flex flex-col gap-1">
            <p className="font-medium">{project.role[locale]}</p>
            <p className="type-tech">{project.period[locale]}</p>
          </div>
        </div>
      </header>
    </div>
  );
}
