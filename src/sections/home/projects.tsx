import type { CSSProperties } from "react";
import { TransitionLink } from "@/components/shell/transition-link";
import { Photo } from "@/components/ui/photo";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";

/**
 * Setiap plate punya nada, lebar, dan tinggi sendiri, sehingga tumpukannya tidak seragam. Tinggi
 * terpisah untuk ponsel karena teksnya lebih panjang dibanding lebar plate. `--ghost-*` menentukan
 * sudut tempat kata besar dipotong tepi plate.
 */
const plates: { tone: string; span: string; height: string; heightWide: string; ghost: string; coverSizes: string }[] = [
  {
    tone: "bg-plate-2 text-ink",
    span: "col-span-full",
    height: "72svh",
    heightWide: "84svh",
    ghost: "project-ghost-bottom",
    coverSizes: "100vw",
  },
  {
    tone: "bg-canvas text-ink",
    span: "col-span-full md:col-span-7 md:col-start-2 xl:col-span-10 xl:col-start-3",
    height: "62svh",
    heightWide: "68svh",
    ghost: "project-ghost-top",
    coverSizes: "(width >= 80rem) 83vw, (width >= 48rem) 88vw, 100vw",
  },
  {
    tone: "on-ink bg-ink text-canvas",
    span: "col-span-full md:col-span-7 xl:col-span-10",
    height: "76svh",
    heightWide: "88svh",
    ghost: "project-ghost-bottom",
    coverSizes: "(width >= 80rem) 83vw, (width >= 48rem) 88vw, 100vw",
  },
  {
    tone: "bg-plate-3 text-ink",
    span: "col-span-full md:col-span-6 md:col-start-3 xl:col-span-8 xl:col-start-4",
    height: "60svh",
    heightWide: "72svh",
    ghost: "project-ghost-top",
    coverSizes: "(width >= 80rem) 66vw, (width >= 48rem) 75vw, 100vw",
  },
  {
    tone: "bg-plate-2 text-ink",
    span: "col-span-full md:col-span-5 md:col-start-4 xl:col-span-6 xl:col-start-7",
    height: "64svh",
    heightWide: "64svh",
    ghost: "project-ghost-bottom",
    coverSizes: "(width >= 80rem) 50vw, (width >= 48rem) 63vw, 100vw",
  },
];

export function Projects({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const { title, intro, beyond } = profile.projects;

  return (
    <section id="projects" className="projects bg-plate-1" aria-labelledby="projects-title">
      <div className="page-grid gap-y-4 pt-24 pb-16 md:gap-y-6 md:pb-24">
        <h2 id="projects-title" data-reveal="" className="type-title col-span-full xl:col-span-9">
          {title[locale]}
        </h2>
        <p className="col-span-full max-w-prose text-lead text-ink-2">{intro[locale]}</p>
      </div>

      <ol className="projects-stack page-grid">
        {projects.map((project, index) => {
          const plate = plates[index % plates.length];
          if (!plate) return null;
          return (
            <li
              key={project.slug}
              data-project-slot=""
              className={`project-slot ${plate.span}`}
              style={
                {
                  "--slot-index": index,
                  "--plate-height": plate.height,
                  "--plate-height-wide": plate.heightWide,
                } as CSSProperties
              }
            >
              <article
                data-project-plate=""
                aria-labelledby={`project-${project.slug}`}
                className={`project-plate ${plate.tone}`}
              >
                {project.cover ? (
                  <Photo
                    id={project.cover.photo}
                    locale={locale}
                    sizes={plate.coverSizes}
                    className="project-cover-photo"
                  />
                ) : (
                  <span aria-hidden="true" data-drift="" className={`project-ghost ${plate.ghost}`}>
                    {project.name.split(" ")[0]}
                  </span>
                )}

                <div className="flex flex-col gap-4">
                  {project.featured ? null : <p className="max-w-prose text-lead">{beyond[locale]}</p>}
                  <div>
                    <p className="font-medium">{project.role[locale]}</p>
                    <p className="type-tech">{project.period[locale]}</p>
                  </div>
                  {project.featured ? <p className="max-w-prose">{project.brief[locale]}</p> : null}
                  <p className="type-tech max-w-prose">{project.technologies.join(", ")}</p>
                </div>

                <div className="flex flex-col items-start gap-4">
                  <h3 id={`project-${project.slug}`} className="project-name type-project">
                    <TransitionLink
                      href={`/${locale}/projects/${project.slug}`}
                      transitionLabel={project.name}
                      data-cursor={t.openProject}
                      className="project-link no-underline"
                    >
                      {project.name}
                    </TransitionLink>
                  </h3>
                  <span aria-hidden="true" className="project-cue font-medium underline">
                    {t.openProject}
                  </span>
                </div>

                {/* Sisi balik plate: nama tetap di posisinya dan warnanya berbalik di tepi yang naik. */}
                {project.outcome ? (
                  <div aria-hidden="true" className="project-flip">
                    <div className="project-flip-face">
                      <div className="flex flex-col gap-2">
                        <p className="font-bold">{t.project.outcome}</p>
                        <p className="max-w-prose text-lead">{project.outcome[locale]}</p>
                      </div>
                      <div className="flex flex-col items-start gap-4">
                        <p className="project-name type-project">{project.name}</p>
                        <span className="project-cue font-medium underline">{t.openProject}</span>
                      </div>
                    </div>
                  </div>
                ) : null}
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
