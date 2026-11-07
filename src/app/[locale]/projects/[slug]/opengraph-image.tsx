import { notFound } from "next/navigation";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { isLocale, type Locale, locales } from "@/lib/i18n";
import { ogContentType, OgLogo, ogImage, ogSize, ogTones } from "@/lib/og";
import { siteName } from "@/lib/seo";

type ImageParams = { params: Promise<{ locale: string; slug: string }> };

/** Plate tipografi, bukan mockup: nada bergilir seperti sampul proyek, dengan satu plate terbalik. */
const covers = [
  { background: ogTones.plate2, color: ogTones.ink, muted: ogTones.ink2 },
  { background: ogTones.plate1, color: ogTones.ink, muted: ogTones.ink2 },
  { background: ogTones.ink, color: ogTones.canvas, muted: ogTones.plate3 },
  { background: ogTones.plate3, color: ogTones.ink, muted: ogTones.ink2 },
];

export const contentType = ogContentType;
export const size = ogSize;
export const alt = `${siteName}, ${profile.role}`;

/** Route handler tidak mewarisi params dari layout, jadi semua kombinasi ditulis di sini agar tetap SSG. */
export function generateStaticParams(): { locale: Locale; slug: string }[] {
  return locales.flatMap((locale) => projects.map(({ slug }) => ({ locale, slug })));
}

export default async function Image({ params }: ImageParams) {
  const { locale: value, slug } = await params;
  const index = projects.findIndex((candidate) => candidate.slug === slug);
  const project = projects[index];
  const cover = covers[index % covers.length];
  if (!project || !cover || !isLocale(value)) notFound();
  const locale: Locale = value;

  return ogImage(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        width: "100%",
        height: "100%",
        padding: "48px 56px",
        overflow: "hidden",
        background: cover.background,
        color: cover.color,
        fontFamily: "Mona Sans",
        fontWeight: 500,
      }}
    >
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: -48,
          left: 28,
          fontWeight: 800,
          fontSize: 320,
          whiteSpace: "nowrap",
          opacity: 0.07,
        }}
      >
        {project.name.split(" ")[0]}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", fontSize: 32 }}>{siteName}</div>
        <OgLogo size={64} color={cover.color} />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontWeight: 800, fontSize: 104, lineHeight: 1, letterSpacing: "-0.02em" }}>
          {project.name}
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 36 }}>{project.role[locale]}</div>
        <div style={{ display: "flex", marginTop: 8, fontFamily: "Martian Mono", fontWeight: 400, fontSize: 26, color: cover.muted }}>
          {project.period[locale]}
        </div>
      </div>
    </div>,
  );
}
