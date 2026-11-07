import { education, educationTitle } from "@/content/education";
import type { Locale } from "@/lib/i18n";

/** Dua plate berbeda ukuran dan nada: universitas sebagai fondasi, sekolah menengah bergeser turun. */
const placement = [
  "on-ink col-span-full self-start bg-ink text-canvas md:col-span-5 xl:col-span-7",
  "col-span-full self-start bg-plate-2 md:col-span-3 md:mt-24 xl:col-span-5",
];

export function Education({ locale }: { locale: Locale }) {
  return (
    <section className="page-grid gap-y-6 pb-section" aria-labelledby="education-title">
      <h2 id="education-title" data-reveal="" className="type-title col-span-full mb-6">
        {educationTitle[locale]}
      </h2>
      {education.map((entry, index) => (
        <article key={entry.school} className={`flex flex-col gap-4 p-6 md:p-8 xl:p-12 ${placement[index]}`}>
          <h3 className="text-sub font-bold">{entry.school}</h3>
          <div>
            <p className="font-medium">{entry.program[locale]}</p>
            <p className="type-tech">{entry.period[locale]}</p>
          </div>
          <p className="max-w-prose">{entry.detail[locale]}</p>
        </article>
      ))}
    </section>
  );
}
