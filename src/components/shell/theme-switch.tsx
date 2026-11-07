"use client";

import { useEffect, useSyncExternalStore } from "react";
import { afterNextPaint } from "@/lib/after-next-paint";
import { type ThemeMode, themeColors, themeModes, themeStorageKey } from "@/lib/theme";

const changeEvent = "themechange";

function readMode(): ThemeMode {
  try {
    const stored = window.localStorage.getItem(themeStorageKey);
    return stored === "light" || stored === "dark" ? stored : "system";
  } catch {
    return "system";
  }
}

function readAppliedMode(): ThemeMode {
  const { theme } = document.documentElement.dataset;
  return theme === "light" || theme === "dark" ? theme : "system";
}

/** Bilah browser ikut tema pilihan; mode sistem mengembalikan meta ke warna per `prefers-color-scheme`. */
function syncThemeColor(mode: ThemeMode) {
  for (const meta of document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')) {
    const scheme = meta.media.includes("dark") ? "dark" : "light";
    meta.content = themeColors[mode === "system" ? scheme : mode];
  }
}

function applyMode(mode: ThemeMode) {
  if (mode === "system") delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = mode;
  syncThemeColor(mode);
}

function resolvedTheme(mode: ThemeMode): "light" | "dark" {
  if (mode !== "system") return mode;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function selectMode(mode: ThemeMode) {
  try {
    if (mode === "system") window.localStorage.removeItem(themeStorageKey);
    else window.localStorage.setItem(themeStorageKey, mode);
  } catch {
    // Storage diblokir: tema tetap berlaku untuk halaman ini saja.
  }

  // Tombol berubah lebih dulu: label terpilih dibaca dari storage, bukan dari `data-theme`.
  window.dispatchEvent(new Event(changeEvent));

  // Tanpa View Transition (atau warna tidak berubah), tema berganti langsung.
  if (!document.startViewTransition || resolvedTheme(mode) === resolvedTheme(readAppliedMode())) {
    applyMode(mode);
    return;
  }

  // Setelah paint: mengganti warna seluruh halaman mahal, jadi tombol harus sempat merespons dulu.
  // Tema baru naik sebagai plate di atas yang lama; saat reduced motion hanya fade singkat.
  afterNextPaint(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.dataset.themeTransition = reduce ? "fade" : "plate";
    document
      .startViewTransition(() => applyMode(mode))
      .finished.finally(() => {
        delete root.dataset.themeTransition;
      });
  });
}

function subscribe(onChange: () => void) {
  const onStorage = () => {
    applyMode(readMode());
    onChange();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(changeEvent, onChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(changeEvent, onChange);
  };
}

type ThemeSwitchProps = {
  label: string;
  modeLabels: Record<ThemeMode, string>;
};

/** Satu tombol yang berputar melewati ketiga mode dan menyebut mode yang sedang aktif. */
export function ThemeSwitch({ label, modeLabels }: ThemeSwitchProps) {
  const current = useSyncExternalStore(subscribe, readMode, () => "system" as const);
  const next = themeModes[(themeModes.indexOf(current) + 1) % themeModes.length] ?? "system";

  // Skrip tema memasang `data-theme` sebelum paint, tetapi meta `theme-color` baru bisa disamakan di sini.
  useEffect(() => syncThemeColor(readAppliedMode()), []);

  return (
    <button
      type="button"
      onClick={() => selectMode(next)}
      className="type-meta min-h-12 cursor-pointer px-2 whitespace-nowrap text-ink-3 hover:text-ink no-js:hidden md:px-3"
    >
      {label} <span className="font-bold text-ink">{modeLabels[current]}</span>
    </button>
  );
}
