import type { Locale } from "@/lib/i18n";
import type { NavItem } from "./types";
import { ui } from "./ui";

export function navItems(locale: Locale): NavItem[] {
  const t = ui[locale];
  return [
    { href: `/${locale}#projects`, label: t.nav.projects, section: "projects" },
    { href: `/${locale}#experience`, label: t.nav.experience, section: "experience" },
    { href: `/${locale}/about`, label: t.nav.about },
    { href: `/${locale}#contact`, label: t.connect, section: "contact" },
  ];
}
