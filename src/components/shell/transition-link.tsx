"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  type ComponentProps,
  createContext,
  type ReactNode,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { motionBridge, scrollToTarget } from "@/lib/motion-bridge";

type Navigate = (href: string, label?: string) => Promise<void>;

const NavigateContext = createContext<Navigate>(async () => {});

/** Bila rute tidak kunjung siap, navigasi penuh agar penutup tidak pernah mengunci halaman. */
const routeTimeout = 8000;

function moveFocus(target: HTMLElement | null) {
  if (!target) return;
  if (!target.hasAttribute("tabindex")) target.tabIndex = -1;
  target.focus({ preventScroll: true });
}

function hashTarget(hash: string) {
  return hash ? document.getElementById(hash.slice(1)) : null;
}

function currentEntry() {
  return window.location.pathname + window.location.hash;
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const renderedPath = useRef(pathname);
  const pending = useRef<{ hash: string; timer?: ReturnType<typeof setTimeout> } | null>(null);
  // Posisi scroll per URL. Pemulihan bawaan browser tidak cocok di sini: ia berjalan sebelum rute
  // tujuan ter-render, dan posisi yang disimpannya bisa tertinggal saat Lenis masih bergerak.
  const positions = useRef(new Map<string, number>());
  const entry = useRef("");

  const restoreEntry = useCallback(() => {
    entry.current = currentEntry();
    const target = positions.current.get(entry.current) ?? hashTarget(window.location.hash) ?? 0;
    scrollToTarget(target, true);
  }, []);

  useEffect(() => {
    const onPopState = () => {
      // Mode manual: browser belum menggeser scroll, jadi ini masih posisi entri yang ditinggalkan.
      positions.current.set(entry.current, window.scrollY);
      entry.current = currentEntry();
      // Beda rute: dipulihkan oleh layout effect di bawah, setelah halaman tujuan ter-render.
      if (window.location.pathname === renderedPath.current) restoreEntry();
    };
    const setManual = () => {
      window.history.scrollRestoration = "manual";
    };
    // Reload dan pindah dokumen tetap memakai pemulihan browser.
    const setNative = () => {
      window.history.scrollRestoration = "auto";
    };

    entry.current = currentEntry();
    setManual();
    window.addEventListener("popstate", onPopState);
    window.addEventListener("pageshow", setManual);
    window.addEventListener("pagehide", setNative);
    return () => {
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("pageshow", setManual);
      window.removeEventListener("pagehide", setNative);
    };
  }, [restoreEntry]);

  const navigate = useCallback<Navigate>(
    async (href, label) => {
      const url = new URL(href, window.location.href);

      if (url.pathname === window.location.pathname) {
        const target = hashTarget(url.hash);
        positions.current.set(entry.current, window.scrollY);
        // Tanpa elemen tujuan (`#top` atau tautan beranda): kembali ke puncak halaman.
        window.history.pushState(null, "", target ? url.hash : url.pathname);
        entry.current = currentEntry();
        scrollToTarget(target ?? 0);
        moveFocus(target ?? document.getElementById("main"));
        return;
      }

      if (pending.current) return;
      const transition: { hash: string; timer?: ReturnType<typeof setTimeout> } = { hash: url.hash };
      pending.current = transition;

      await motionBridge.cover?.(label);
      positions.current.set(entry.current, window.scrollY);
      transition.timer = setTimeout(() => window.location.assign(href), routeTimeout);
      startTransition(() => router.push(href, { scroll: false }));
    },
    [router],
  );

  // Layout effect: pada back/forward, plate sudah menutup sebelum rute baru sempat ter-paint.
  // Komponen ini mendahului `MotionLoader` di tree, jadi scroll sudah benar saat trigger halaman dibuat.
  useLayoutEffect(() => {
    if (renderedPath.current === pathname) return;
    renderedPath.current = pathname;

    const arrival = pending.current;
    pending.current = null;
    if (arrival?.timer) clearTimeout(arrival.timer);

    const target = arrival ? hashTarget(arrival.hash) : null;
    if (arrival) {
      entry.current = currentEntry();
      scrollToTarget(target ?? 0, true);
    } else {
      restoreEntry();
    }

    void Promise.resolve(motionBridge.uncover?.(!arrival)).then(() => {
      moveFocus(target ?? document.getElementById("main"));
    });
  }, [pathname, restoreEntry]);

  return <NavigateContext.Provider value={navigate}>{children}</NavigateContext.Provider>;
}

type TransitionLinkProps = Omit<ComponentProps<typeof Link>, "href" | "onNavigate"> & {
  href: string;
  /** Nama halaman tujuan yang ditampilkan di penutup; hanya untuk proyek. */
  transitionLabel?: string;
  /** Dijalankan sebelum navigasi, misalnya menutup menu sebelum menggulir ke anchor. */
  beforeNavigate?: () => Promise<void>;
};

/**
 * Tetap merender `<a>`. `onNavigate` hanya terpanggil untuk navigasi klien, sehingga klik dengan
 * modifier dan buka di tab baru langsung ditangani browser.
 */
export function TransitionLink({ href, transitionLabel, beforeNavigate, ...props }: TransitionLinkProps) {
  const navigate = useContext(NavigateContext);

  return (
    <Link
      href={href}
      {...props}
      onNavigate={(event) => {
        event.preventDefault();
        void Promise.resolve(beforeNavigate?.()).then(() => navigate(href, transitionLabel));
      }}
    />
  );
}
