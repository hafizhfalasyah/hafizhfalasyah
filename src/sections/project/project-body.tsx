import type { CSSProperties } from "react";
import { PrimaryActions } from "@/components/ui/primary-actions";
import type { Project } from "@/content/types";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";

/** Poin pekerjaan bertumpuk bergeser, memakai bentuk yang sama dengan Susun Lapis. */
const stepTones = ["bg-plate-3", "bg-plate-2", "bg-plate-1"];

const factTitle = "font-bold";

type ProjectBodyProps = {
  locale: Locale;
  project: Project;
};

/** Teks asli profil, hanya diberi label; peran dan periode ada di sampul. Bagian yang tidak ada di profil tidak dirender. */
export function ProjectBody({ locale, project }: ProjectBodyProps) {
  const t = ui[locale];
  const { technologies, links, award, context, problem, approach, outcome } = t.project;
  const linkLabel = { site: t.project.site, github: t.project.github };

  return (
    <>
      {/* Grid sendiri: `aside` sticky tertahan di dasar wadahnya, jadi tidak boleh sewadah dengan plate Hasil. */}
      <div className="page-grid gap-y-16 pt-24 md:pt-32">
        <aside className="col-span-full md:sticky md:top-24 md:col-span-3 md:self-start xl:col-span-4">
          <dl className="flex flex-col gap-6">
            <div>
              <dt className={factTitle}>{technologies}</dt>
              <dd>
                <ul className="mt-1 flex flex-col gap-1">
                  {project.technologies.map((tech) => {
                    const detail = project.techDetails?.[tech];
                    return (
                      <li key={tech} className="type-tech">
                        {tech}
                        {detail ? <span className="block text-ink-2">{detail[locale]}</span> : null}
                      </li>
                    );
                  })}
                </ul>
              </dd>
            </div>
            {project.links.length > 0 ? (
              <div>
                <dt className={factTitle}>{links}</dt>
                <dd>
                  <ul className="flex flex-wrap gap-x-6">
                    {project.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="flex min-h-12 items-center font-medium underline hover:text-ink-2"
                        >
                          {linkLabel[link.kind]}
                        </a>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ) : null}
            {project.award ? (
              <div>
                <dt className={factTitle}>{award}</dt>
                <dd>{project.award[locale]}</dd>
              </div>
            ) : null}
          </dl>
        </aside>

        <article className="col-span-full flex flex-col gap-16 md:col-span-5 xl:col-span-7 xl:col-start-6">
          <section className="flex flex-col gap-4">
            <h2 data-reveal="" className="text-sub font-bold">
              {project.briefKind === "problem" ? problem : context}
            </h2>
            <p className="max-w-prose text-lead">{project.brief[locale]}</p>
          </section>

          <section className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <h2 data-reveal="" className="text-sub font-bold">
                {approach}
              </h2>
              <p className="max-w-prose text-lead">{project.approach[locale]}</p>
            </div>
            <ul className="case-steps">
              {project.highlights[locale].map((item, index) => (
                <li
                  key={item}
                  className={`case-step ${stepTones[index % stepTones.length]}`}
                  style={{ "--step": index } as CSSProperties}
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </article>
      </div>

      {project.outcome ? (
        <div className="page-grid pt-16">
          <section className="on-ink col-span-full bg-ink p-6 text-canvas md:p-8 xl:col-span-11 xl:col-start-2 xl:p-12">
            <h2 data-reveal="" className="text-sub font-bold">
              {outcome}
            </h2>
            <p className="case-outcome mt-4">{project.outcome[locale]}</p>
          </section>
        </div>
      ) : null}

      <div className="page-grid pt-16">
        <PrimaryActions locale={locale} className="col-span-full xl:col-span-11 xl:col-start-2" />
      </div>
    </>
  );
}
