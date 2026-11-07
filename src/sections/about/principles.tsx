import type { CSSProperties } from "react";
import { profile } from "@/content/profile";
import type { Locale } from "@/lib/i18n";

/** Lima pernyataan besar di plate penuh, tiap baris turun satu anak tangga seperti lapisan yang disusun. */
export function Principles({ locale }: { locale: Locale }) {
  const { title, intro, items } = profile.principles;

  return (
    <section className="bg-plate-1 py-section" aria-labelledby="principles-title">
      <div className="page-grid gap-y-16">
        <div className="col-span-full flex flex-col gap-4">
          <h2 id="principles-title" data-reveal="" className="type-title">
            {title[locale]}
          </h2>
          <p className="max-w-prose text-lead text-ink-2">{intro[locale]}</p>
        </div>
        <ul className="col-span-full flex flex-col gap-16">
          {items[locale].map((item, index) => (
            <li key={item.term} className="principle" style={{ "--step": index } as CSSProperties}>
              <h3 className="type-title">{item.term}</h3>
              <p className="mt-4 max-w-prose text-ink-2">{item.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
