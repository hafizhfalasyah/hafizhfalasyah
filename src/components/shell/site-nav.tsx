"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Logo } from "@/components/ui/logo";
import type { Messages, NavItem } from "@/content/types";
import { afterNextPaint } from "@/lib/after-next-paint";
import type { Locale } from "@/lib/i18n";
import { motionBridge } from "@/lib/motion-bridge";
import { LocaleSwitch } from "./locale-switch";
import { ThemeSwitch } from "./theme-switch";
import { TransitionLink } from "./transition-link";

type MenuState = "closed" | "open" | "closing";

/** Satu nada per baris, sama dengan tumpukan plate: lapisan atas terang, fondasi terbalik. */
const menuTones = [
  "bg-plate-1 text-ink",
  "bg-plate-2 text-ink",
  "bg-plate-3 text-ink",
  "on-ink bg-ink text-canvas",
];

/** Section yang sedang melewati garis tengah viewport. Terikat pathname agar tidak basi saat pindah rute. */
function useActiveSection(pathname: string, items: NavItem[]): string | null {
  const [seen, setSeen] = useState<{ pathname: string; id: string } | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const { id } = entry.target;
          if (entry.isIntersecting) setSeen({ pathname, id });
          else setSeen((current) => (current?.id === id ? null : current));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    for (const item of items) {
      const section = item.section ? document.getElementById(item.section) : null;
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [pathname, items]);

  return seen?.pathname === pathname ? seen.id : null;
}

type SiteNavProps = {
  locale: Locale;
  items: NavItem[];
  cvHref: string;
  t: Messages;
};

export function SiteNav({ locale, items, cvHref, t }: SiteNavProps) {
  const pathname = usePathname();
  const activeSection = useActiveSection(pathname, items);
  const [menu, setMenu] = useState<MenuState>("closed");
  const [menuPath, setMenuPath] = useState(pathname);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Rute berganti saat menu terbuka (tautan menu atau tombol back): plate transisi sudah menutupinya.
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMenu("closed");
  }

  const reopened = useRef(false);

  const closeMenu = useCallback(async () => {
    reopened.current = false;
    setMenu("closing");
    if (panelRef.current) await motionBridge.menu?.(panelRef.current, false);
    // Animasi tutup juga selesai saat disela, padahal menu sudah dibuka lagi.
    if (reopened.current) return;
    // Sinkron: `main` harus sudah tidak inert sebelum pemanggil memindahkan fokus ke dalamnya.
    flushSync(() => setMenu("closed"));
  }, []);

  const previousMenu = useRef<MenuState>(menu);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    const wasClosing = previousMenu.current === "closing";
    previousMenu.current = menu;
    if (menu !== "open" || !panel || !motionBridge.menu) return;

    // Menyela penutupan: plate sudah terlihat, jadi harus langsung berbalik arah.
    if (wasClosing) {
      void motionBridge.menu(panel, true);
      return;
    }
    // Plate baru terlihat setelah bergerak, jadi animasi menunggu paint: tombol merespons lebih dulu.
    panel.toggleAttribute("data-menu-entering", true);
    return afterNextPaint(() => {
      panel.removeAttribute("data-menu-entering");
      void motionBridge.menu?.(panel, true);
    });
  }, [menu]);

  const menuVisible = menu !== "closed";

  useEffect(() => {
    document.documentElement.toggleAttribute("data-menu-open", menuVisible);
    motionBridge.lockScroll?.(menuVisible);

    const setInert = (inert: boolean) => {
      for (const id of ["skip-link", "main", "site-footer"]) {
        const region = document.getElementById(id);
        if (region) region.inert = inert;
      }
    };
    // Dilepas seketika: pemanggil bisa langsung memindahkan fokus ke `main` setelah menu tertutup.
    if (!menuVisible) {
      setInert(false);
      return;
    }
    // Dipasang setelah paint: `inert` menghitung ulang gaya seluruh halaman, jadi menu tampil lebih dulu.
    return afterNextPaint(() => setInert(true));
  }, [menuVisible]);

  useEffect(() => {
    if (menu !== "open") return;

    const wide = window.matchMedia("(width >= 64rem)");
    const onResize = () => {
      if (wide.matches) void closeMenu();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      void closeMenu();
      toggleRef.current?.focus();
    };

    wide.addEventListener("change", onResize);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      wide.removeEventListener("change", onResize);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menu, closeMenu]);

  const homePath = `/${locale}`;

  function ariaCurrent(item: NavItem) {
    if (item.section) {
      if (pathname === homePath) return activeSection === item.section ? ("location" as const) : undefined;
      return item.section === "projects" && pathname.startsWith(`${homePath}/projects/`) ? ("true" as const) : undefined;
    }
    return pathname === item.href ? ("page" as const) : undefined;
  }

  const currentLabel = items.find((item) => ariaCurrent(item))?.label;

  return (
    <>
      <header id="site-header" className="site-header">
        <div className="page-grid h-16 items-center">
          <TransitionLink href={homePath} aria-label={t.home} className="col-span-1 flex size-12 items-center">
            <Logo className="size-8" />
          </TransitionLink>

          <nav aria-label={t.nav.label} className="col-span-4 hidden items-center gap-1 lg:flex xl:col-span-6">
            {items.map((item) => (
              <TransitionLink
                key={item.href}
                href={item.href}
                aria-current={ariaCurrent(item)}
                className="flex min-h-12 items-center px-3 font-medium whitespace-nowrap no-underline hover:text-ink-2"
              >
                <span className="nav-marker">{item.label}</span>
              </TransitionLink>
            ))}
          </nav>

          <div className="col-span-3 hidden items-center justify-end lg:flex xl:col-span-5">
            <LocaleSwitch current={locale} label={t.localeLabel} names={t.localeNames} />
            <ThemeSwitch label={t.themeLabel} modeLabels={t.themeModes} />
            <a
              href={cvHref}
              download
              className="flex min-h-12 items-center pl-3 font-medium whitespace-nowrap underline hover:text-ink-2"
            >
              {t.downloadCv}
            </a>
          </div>

          <div className="col-span-3 flex items-center justify-end gap-4 md:col-span-7 lg:hidden">
            {currentLabel ? (
              <span aria-hidden="true" className="type-meta text-ink-2 no-js:hidden">
                {currentLabel}
              </span>
            ) : null}
            {/* Tanpa JS menu tidak bisa dibuka: bahasa tetap tersedia, dan navigasi ada di footer. */}
            <div className="hidden no-js:flex">
              <LocaleSwitch current={locale} label={t.localeLabel} names={t.localeNames} />
            </div>
            <a href="#site-footer" className="hidden min-h-12 items-center font-medium underline no-js:flex">
              {t.nav.menuOpen}
            </a>
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={menu === "open"}
              aria-controls="site-menu"
              onClick={() => {
                if (menu === "open") {
                  void closeMenu();
                } else {
                  reopened.current = true;
                  setMenu("open");
                }
              }}
              className="min-h-12 min-w-12 cursor-pointer font-medium no-js:hidden"
            >
              {menu === "open" ? t.nav.menuClose : t.nav.menuOpen}
            </button>
          </div>
        </div>
      </header>

      <div ref={panelRef} id="site-menu" hidden={!menuVisible} data-lenis-prevent className="site-menu lg:hidden">
        <nav aria-label={t.nav.menuLabel} className="site-menu-list">
          {items.map((item, index) => {
            const samePage = new URL(item.href, "http://local").pathname === pathname;
            return (
              <div key={item.href} data-menu-plate className={`flex items-center ${menuTones[index]}`}>
                <TransitionLink
                  href={item.href}
                  aria-current={ariaCurrent(item)}
                  beforeNavigate={samePage ? closeMenu : undefined}
                  className="type-title flex size-full items-center px-gutter no-underline"
                >
                  <span className="nav-marker">
                    <span className="block overflow-clip pb-1">
                      <span data-menu-label className="block">
                        {item.label}
                      </span>
                    </span>
                  </span>
                </TransitionLink>
              </div>
            );
          })}
        </nav>

        <div data-menu-plate className="flex flex-wrap items-center justify-between gap-x-4 bg-canvas px-gutter py-2">
          <a href={cvHref} download className="flex min-h-12 items-center font-medium whitespace-nowrap underline">
            {t.downloadCv}
          </a>
          <div className="flex flex-wrap items-center">
            <LocaleSwitch current={locale} label={t.localeLabel} names={t.localeNames} />
            <ThemeSwitch label={t.themeLabel} modeLabels={t.themeModes} />
          </div>
        </div>
      </div>
    </>
  );
}
