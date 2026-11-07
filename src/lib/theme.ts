export const themeModes = ["system", "light", "dark"] as const;

export type ThemeMode = (typeof themeModes)[number];

export const themeStorageKey = "theme";

/** `--color-canvas` per tema dalam hex, untuk bilah browser (`theme-color`) yang tidak membaca CSS. */
export const themeColors = { light: "#fafafa", dark: "#0a0a0a" } as const;

/**
 * Berjalan sebelum paint agar tema tersimpan tidak berkedip. Mode `system` tidak
 * memakai `data-theme`, sehingga CSS mengikuti `prefers-color-scheme`, juga tanpa JS.
 */
export const themeScript = `(function(){var r=document.documentElement;r.dataset.js="";try{var t=localStorage.getItem(${JSON.stringify(themeStorageKey)});if(t==="light"||t==="dark")r.dataset.theme=t}catch(e){}})()`;
