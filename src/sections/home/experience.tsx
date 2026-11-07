import { TransitionLink } from "@/components/shell/transition-link";
import { Photo } from "@/components/ui/photo";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";

/** Kolom periode tetap terlihat selama rincian dibaca, sehingga garis waktu tidak hilang di entri panjang. */
export function Experience({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const projectsBySlug = new Map(projects.map((project) => [project.slug, project]));

  return (
    <section id="experience" className="page-grid gap-y-12 pt-section pb-section" aria-labelledby="experience-title">
      <h2 id="experience-title" data-reveal="" className="type-title col-span-full xl:col-span-9">
        {profile.experience.title[locale]}
      </h2>

      <ol className="col-span-full grid grid-cols-subgrid gap-y-16 xl:col-span-8">
        {experience.map((entry) => (
          <li key={entry.organization.id} className="col-span-full grid grid-cols-subgrid gap-y-3">
            <p className="type-tech col-span-full md:sticky md:top-24 md:col-span-2 md:self-start xl:col-span-3">
              {entry.period[locale]}
            </p>

            <div className="col-span-full flex flex-col gap-4 md:col-span-6 xl:col-span-5">
              <div>
                <h3 className="text-sub font-bold">{entry.title[locale]}</h3>
                <p className="mt-2 text-ink-2">{entry.organization[locale]}</p>
                {entry.detail ? <p className="text-ink-2">{entry.detail[locale]}</p> : null}
              </div>

              {entry.summary ? <p className="max-w-prose">{entry.summary[locale]}</p> : null}

              {entry.responsibilities ? (
                <ul className="flex max-w-prose flex-col gap-3 text-ink-2">
                  {entry.responsibilities[locale].map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}

              {entry.technologies ? <p className="type-tech">{entry.technologies.join(", ")}</p> : null}

              {entry.projectSlugs ? (
                <ul className="flex flex-wrap gap-x-6">
                  {entry.projectSlugs.map((slug) => {
                    const project = projectsBySlug.get(slug);
                    if (!project) return null;
                    return (
                      <li key={slug}>
                        <TransitionLink
                          href={`/${locale}/projects/${slug}`}
                          transitionLabel={project.name}
                          data-cursor={t.openProject}
                          className="flex min-h-12 items-center font-medium underline hover:text-ink-2"
                        >
                          {project.name}
                        </TransitionLink>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </div>
          </li>
        ))}
      </ol>

      <div className="col-span-full md:col-span-6 md:col-start-3 xl:sticky xl:top-24 xl:col-span-4 xl:col-start-9 xl:row-start-2 xl:self-start">
        <Photo
          id="foto-4"
          locale={locale}
          sizes="(width >= 80rem) 30vw, (width >= 48rem) 69vw, calc(100vw - 3rem)"
          className="block h-auto w-full bg-plate-2"
        />
      </div>
    </section>
  );
}
