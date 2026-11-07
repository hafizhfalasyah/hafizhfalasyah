import type { CSSProperties } from "react";
import { TransitionLink } from "@/components/shell/transition-link";
import { projects } from "@/content/projects";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { coverTone } from "./tones";

type ProjectPagerProps = {
  locale: Locale;
  index: number;
};

const shortPlate = { "--plate-height": "10rem", "--plate-height-wide": "16rem" } as CSSProperties;
const tallPlate = { "--plate-height": "16rem", "--plate-height-wide": "24rem" } as CSSProperties;

/** Daftar berputar, jadi proyek pertama dan terakhir tetap punya dua arah. Nama ikut di plate transisi. */
export function ProjectPager({ locale, index }: ProjectPagerProps) {
  const t = ui[locale];
  const previousIndex = (index - 1 + projects.length) % projects.length;
  const nextIndex = (index + 1) % projects.length;
  const previous = projects[previousIndex];
  const next = projects[nextIndex];
  if (!previous || !next) return null;

  return (
    <nav aria-label={t.project.pagerLabel} className="page-grid gap-y-6 pt-section pb-section">
      <div className="col-span-full md:col-span-3 xl:col-span-4 xl:self-end">
        <div className="project-plate bg-plate-1" style={shortPlate}>
          <TransitionLink
            href={`/${locale}/projects/${previous.slug}`}
            transitionLabel={previous.name}
            data-cursor={t.openProject}
            className="project-link flex flex-1 flex-col justify-between gap-6 no-underline"
          >
            <span>{t.previousProject}</span>
            <span className="project-cue text-sub font-bold">{previous.name}</span>
          </TransitionLink>
        </div>
      </div>

      <div className="col-span-full md:col-span-5 xl:col-span-8">
        <div className={`project-plate ${coverTone(nextIndex)}`} style={tallPlate}>
          <span aria-hidden="true" className="project-ghost project-ghost-bottom">
            {next.name.split(" ")[0]}
          </span>
          <TransitionLink
            href={`/${locale}/projects/${next.slug}`}
            transitionLabel={next.name}
            data-cursor={t.openProject}
            className="project-link flex flex-1 flex-col justify-between gap-6 no-underline"
          >
            <span>{t.nextProject}</span>
            <span className="project-cue project-name type-project">{next.name}</span>
          </TransitionLink>
        </div>
      </div>
    </nav>
  );
}
