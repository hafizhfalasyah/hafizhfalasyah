import { profile } from "@/content/profile";
import type { Locale } from "@/lib/i18n";

/** Daftar istilah dua kolom: nama kemampuan dibaca sekilas, penjelasannya di kolom sebelah. */
export function SoftSkills({ locale }: { locale: Locale }) {
  const { title, intro, items } = profile.softSkills;

  return (
    <section className="page-grid gap-y-12 pt-section pb-section" aria-labelledby="soft-skills-title">
      <div className="col-span-full flex flex-col gap-4">
        <h2 id="soft-skills-title" data-reveal="" className="type-title">
          {title[locale]}
        </h2>
        <p className="max-w-prose text-lead text-ink-2">{intro[locale]}</p>
      </div>
      <dl className="col-span-full grid grid-cols-subgrid gap-y-8">
        {items[locale].map((item) => (
          <div key={item.term} className="col-span-full grid grid-cols-subgrid gap-y-2">
            <dt className="col-span-full text-sub font-bold md:col-span-4 xl:col-span-5">{item.term}</dt>
            <dd className="col-span-full max-w-prose md:col-span-4 xl:col-span-6 xl:col-start-7">{item.detail}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
