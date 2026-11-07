export const locales = ["id", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "id";

export const localeCookie = "locale";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Mengganti segmen locale pada path, sehingga halaman yang sama terbuka di bahasa lain. */
export function switchLocalePath(pathname: string, locale: Locale): string {
  return pathname.replace(/^\/(?:id|en)(?=\/|$)/, `/${locale}`);
}

/** Menyimpan pilihan bahasa untuk redirect `/` di `next.config.ts`. Hanya dipanggil di browser. */
export function persistLocale(locale: Locale): void {
  const secure = window.location.protocol === "https:" ? "; secure" : "";
  document.cookie = `${localeCookie}=${locale}; path=/; max-age=31536000; samesite=lax${secure}`;
}
