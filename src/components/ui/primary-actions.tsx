import { TransitionLink } from "@/components/shell/transition-link";
import { profile } from "@/content/profile";
import { ui } from "@/content/ui";
import type { Locale } from "@/lib/i18n";

type PrimaryActionsProps = {
  locale: Locale;
  className?: string;
};

/** Dua tindakan utama situs: unduh CV sebagai tombol, kontak sebagai tautan di sampingnya. */
export function PrimaryActions({ locale, className = "" }: PrimaryActionsProps) {
  const t = ui[locale];

  return (
    <div className={`flex flex-wrap items-center gap-x-6 gap-y-1 md:gap-x-8 ${className}`}>
      <a
        href={profile.cvHref}
        download
        data-magnetic=""
        className="flex min-h-12 items-center bg-ink px-6 font-medium whitespace-nowrap text-canvas no-underline hover:bg-ink-2 active:translate-y-px"
      >
        {t.downloadCv}
      </a>
      <TransitionLink
        href={`/${locale}#contact`}
        data-magnetic=""
        className="flex min-h-12 items-center font-medium whitespace-nowrap underline hover:text-ink-2"
      >
        {t.connect}
      </TransitionLink>
    </div>
  );
}
