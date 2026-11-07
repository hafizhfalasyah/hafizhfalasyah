"use client";

import { useState } from "react";
import { TransitionLink } from "@/components/shell/transition-link";
import type { Messages, TechId } from "@/content/types";
import type { Locale } from "@/lib/i18n";

type Active = { label: string; tech: TechId };

type SkillsJoinProps = {
  locale: Locale;
  groups: { title: string; items: { label: string; tech?: TechId }[] }[];
  projects: { slug: string; name: string; period: string; technologies: TechId[] }[];
  labels: Messages["skills"];
  openProject: string;
};

/**
 * Memilih teknologi menyorot proyek yang mencantumkannya, dari data yang sama dengan baris Teknologi
 * tiap proyek. Tombol berfungsi dengan sentuh dan keyboard; hover hanya pratinjau tambahan.
 */
export function SkillsJoin({ locale, groups, projects, labels, openProject }: SkillsJoinProps) {
  const [selected, setSelected] = useState<Active | null>(null);
  const [preview, setPreview] = useState<Active | null>(null);
  const active = preview ?? selected;

  const statusFor = (current: Active) => {
    const count = projects.filter((project) => project.technologies.includes(current.tech)).length;
    return (count === 1 ? labels.usedInOne : labels.usedInMany)
      .replace("{tech}", current.label)
      .replace("{count}", String(count));
  };

  return (
    <div className="col-span-full grid grid-cols-subgrid gap-y-12 pt-6">
      <ul className="col-span-full flex flex-col gap-8 xl:col-span-7">
        {groups.map((group) => {
          // Tanpa token di grup ini, teks tidak perlu setinggi tombol dan bisa rata dengan judulnya.
          const selectable = group.items.some((item) => item.tech);
          return (
            <li key={group.title} className="flex flex-col gap-2">
              <h3 className="font-bold">{group.title}</h3>
              <ul className={selectable ? "flex flex-wrap items-center gap-1" : "flex flex-wrap gap-x-6 gap-y-1"}>
                {group.items.map((item) => {
                  const { tech } = item;
                  if (!tech) {
                    return (
                      <li key={item.label} className={selectable ? "skill-plain type-tech" : "type-tech"}>
                        {item.label}
                      </li>
                    );
                  }
                  const current = { label: item.label, tech };
                  return (
                    <li key={item.label}>
                      <button
                        type="button"
                        aria-pressed={selected?.label === item.label}
                        data-previewing={preview?.label === item.label ? "" : undefined}
                        onClick={() => setSelected(selected?.label === item.label ? null : current)}
                        onPointerEnter={(event) => {
                          if (event.pointerType === "mouse") setPreview(current);
                        }}
                        onPointerLeave={() => setPreview(null)}
                        className="skill-token type-tech"
                      >
                        {item.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>

      <div data-state={active ? "active" : "idle"} className="skills-panel col-span-full xl:col-span-4 xl:col-start-9">
        {/* Hanya pilihan yang diumumkan: pratinjau hover mengubah teks terlalu sering untuk pembaca layar. */}
        <p role="status" className="sr-only">
          {selected ? statusFor(selected) : ""}
        </p>
        <p aria-hidden="true" className="skills-status font-medium no-js:hidden">
          {active ? statusFor(active) : labels.hint}
        </p>
        <ul aria-label={labels.listLabel} className="skills-projects">
          {projects.map((project) => (
            <li
              key={project.slug}
              data-match={active && project.technologies.includes(active.tech) ? "true" : "false"}
              className="skills-project"
            >
              <TransitionLink
                href={`/${locale}/projects/${project.slug}`}
                transitionLabel={project.name}
                data-cursor={openProject}
                className="skills-project-link no-underline"
              >
                <span className="font-medium">{project.name}</span>
                <span className="type-tech">{project.period}</span>
              </TransitionLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
