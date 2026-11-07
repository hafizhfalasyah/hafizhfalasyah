import { Photo } from "@/components/ui/photo";
import { profile } from "@/content/profile";
import type { Locale } from "@/lib/i18n";

/** Judul besar, potret kecil sesuai resolusi aslinya, dan tiga paragraf yang digeser ke kanan. */
export function Intro({ locale }: { locale: Locale }) {
  const { title, subHeadline, paragraphs } = profile.about;

  return (
    <section className="page-grid gap-y-12 pt-16 pb-section" aria-labelledby="about-title">
      <div className="col-span-full flex flex-col gap-6 md:col-span-6 xl:col-span-9">
        <h1 id="about-title" data-reveal="" className="type-project">
          {title[locale]}
        </h1>
        <p className="max-w-prose text-lead text-ink-2">{subHeadline[locale]}</p>
      </div>
      <div className="col-span-full md:col-span-2 md:justify-self-end xl:col-span-3">
        <Photo id="foto-1" locale={locale} sizes="165px" className="block h-auto w-full max-w-portrait bg-plate-2" />
      </div>
      <div className="col-span-full flex flex-col gap-6 md:col-span-6 md:col-start-3 xl:col-span-7 xl:col-start-5">
        {paragraphs[locale].map((paragraph) => (
          <p key={paragraph} className="max-w-prose">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
