import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";
import { defaultLocale } from "@/lib/i18n";
import { siteName } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteName}, ${profile.role}`,
    short_name: siteName,
    description: profile.tagline[defaultLocale],
    start_url: "/",
    display: "browser",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
