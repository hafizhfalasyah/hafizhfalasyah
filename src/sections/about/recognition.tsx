import { Photo } from "@/components/ui/photo";
import { recognition } from "@/content/credentials";
import type { Locale } from "@/lib/i18n";

/** Foto tetap di tempat selama catatan digulir; penghargaan paling besar, hak cipta menyusul di bawahnya. */
export function RecognitionSection({ locale }: { locale: Locale }) {
  const { title, intro, award, copyrights } = recognition;

  return (
    <section className="page-grid gap-y-12 pb-section" aria-labelledby="recognition-title">
      <div className="col-span-full md:sticky md:top-24 md:col-span-3 md:self-start xl:col-span-5">
        <Photo
          id="foto-3"
          locale={locale}
          sizes="(width >= 80rem) 39vw, (width >= 48rem) 33vw, calc(100vw - 3rem)"
          className="block h-auto w-full bg-plate-2"
        />
      </div>

      <div className="col-span-full flex flex-col gap-12 md:col-span-5 xl:col-span-6 xl:col-start-7">
        <div className="flex flex-col gap-4">
          <h2 id="recognition-title" data-reveal="" className="type-title">
            {title[locale]}
          </h2>
          <p className="max-w-prose text-lead text-ink-2">{intro[locale]}</p>
        </div>

        <article className="flex flex-col gap-3">
          <h3 className="type-project">{award.title[locale]}</h3>
          <p className="font-medium">{award.subject}</p>
          <p className="max-w-prose">{award.detail[locale]}</p>
        </article>

        <ul className="flex flex-col gap-8">
          {copyrights.map((item) => (
            <li key={item.subject} className="flex flex-col gap-1">
              <h3 className="text-sub font-bold">{item.subject}</h3>
              <p className="font-medium">{item.title[locale]}</p>
              <p className="max-w-prose text-ink-2">{item.detail[locale]}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
