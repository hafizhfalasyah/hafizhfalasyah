import { Logo } from "@/components/ui/logo";
import { profile } from "@/content/profile";
import type { Messages, NavItem } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { TransitionLink } from "./transition-link";

const linkClass = "flex min-h-12 items-center no-underline hover:underline";

type SiteFooterProps = {
  locale: Locale;
  items: NavItem[];
  t: Messages;
};

/** Fondasi halaman: plate terbalik, satu-satunya bidang yang paling kontras terhadap alas. */
export function SiteFooter({ locale, items, t }: SiteFooterProps) {
  const { name, role, email, linkedin, github, cvHref, location } = profile;

  return (
    <footer id="site-footer" className="on-ink flex-none bg-ink text-canvas">
      <div className="page-grid gap-y-12 py-16 md:py-24">
        <div className="col-span-full flex flex-col gap-4 md:col-span-3 xl:col-span-6">
          <Logo className="size-12" />
          <div>
            <p className="text-sub font-bold">
              {name.first} {name.last}
            </p>
            <p>{role}</p>
            <p>{location[locale]}</p>
          </div>
        </div>

        <nav aria-label={t.nav.footerLabel} className="col-span-full md:col-span-2 xl:col-span-3">
          <ul>
            {items.map((item) => (
              <li key={item.href}>
                <TransitionLink href={item.href} className={linkClass}>
                  {item.label}
                </TransitionLink>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="col-span-full md:col-span-3">
          <li>
            <a href={`mailto:${email}`} className={linkClass}>
              {email}
            </a>
          </li>
          <li>
            <a href={linkedin.href} target="_blank" rel="noreferrer" className={linkClass}>
              {linkedin.label}
            </a>
          </li>
          <li>
            <a href={github.href} target="_blank" rel="noreferrer" className={linkClass}>
              {github.label}
            </a>
          </li>
          <li>
            <a href={cvHref} download className={linkClass}>
              {t.downloadCv}
            </a>
          </li>
        </ul>

        <div className="col-span-full">
          <TransitionLink href="#top" className="inline-flex min-h-12 items-center font-medium underline">
            {t.backToTop}
          </TransitionLink>
        </div>
      </div>
    </footer>
  );
}
