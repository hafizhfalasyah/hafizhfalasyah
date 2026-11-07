"use client";

import { usePathname } from "next/navigation";
import { type Locale, locales, persistLocale, switchLocalePath } from "@/lib/i18n";

type LocaleSwitchProps = {
  current: Locale;
  label: string;
  names: Record<Locale, string>;
};

/** Section yang melewati garis tengah layar; pada tumpang tindih, yang paling akhir di DOM. */
function sectionAtCenter(): string {
  const middle = window.innerHeight / 2;
  const current = Array.from(document.querySelectorAll("section[id]"))
    .filter((section) => {
      const { top, bottom } = section.getBoundingClientRect();
      return top <= middle && bottom > middle;
    })
    .at(-1);
  return current ? `#${current.id}` : "";
}

/**
 * Sengaja `<a>`, bukan `next/link`: mengganti `[locale]` me-remount `<html>` dan menghapus
 * `data-theme`, sedangkan navigasi penuh menjalankan ulang skrip tema sebelum paint.
 * Hash menunjuk section yang sedang dibaca, agar pengunjung kembali ke tempat yang sama.
 */
export function LocaleSwitch({ current, label, names }: LocaleSwitchProps) {
  const pathname = usePathname();

  return (
    <nav aria-label={label} className="type-meta flex">
      {locales.map((locale) => (
        <a
          key={locale}
          href={switchLocalePath(pathname, locale)}
          hrefLang={locale}
          lang={locale}
          aria-label={names[locale]}
          aria-current={locale === current ? "true" : undefined}
          onClick={(event) => {
            persistLocale(locale);
            event.currentTarget.hash = sectionAtCenter();
          }}
          className="flex min-h-12 min-w-12 items-center justify-center text-ink-3 uppercase no-underline hover:text-ink aria-[current]:font-bold aria-[current]:text-ink"
        >
          {locale}
        </a>
      ))}
    </nav>
  );
}
