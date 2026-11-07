import { profile } from "@/content/profile";
import type { Locale } from "@/lib/i18n";

/** Penutup halaman: dua nama bahasa sebagai tipografi besar, bergeser antar baris. */
export function Languages({ locale }: { locale: Locale }) {
  const { title, items } = profile.languages;

  return (
    <section className="page-grid gap-y-8 pt-section pb-section" aria-labelledby="languages-title">
      <h2 id="languages-title" data-reveal="" className="type-title col-span-full">
        {title[locale]}
      </h2>
      <dl className="col-span-full grid grid-cols-subgrid gap-y-8">
        {items[locale].map((item, index) => (
          <div
            key={item.term}
            className={`col-span-full ${index === 0 ? "xl:col-span-8" : "md:col-span-6 md:col-start-3 xl:col-span-8 xl:col-start-5"}`}
          >
            <dt className="type-project">{item.term}</dt>
            <dd className="mt-2 text-lead text-ink-2">{item.detail}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
