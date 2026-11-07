import { notFound } from "next/navigation";
import { profile } from "@/content/profile";
import { isLocale, type Locale, locales } from "@/lib/i18n";
import { ogContentType, OgLogo, ogImage, ogSize, ogTones } from "@/lib/og";
import { siteName } from "@/lib/seo";

type ImageParams = { params: Promise<{ locale: string }> };

export const contentType = ogContentType;
export const size = ogSize;
export const alt = `${siteName}, ${profile.role}`;

/** Route handler tidak mewarisi params dari layout, jadi locale ditulis di sini agar tetap SSG. */
export function generateStaticParams(): { locale: Locale }[] {
  return locales.map((locale) => ({ locale }));
}

/** Nada yang sama dengan tumpukan di beranda: fondasi paling kontras, lapisan atas makin dekat ke alas. */
const layerTones = [
  { background: ogTones.ink, color: ogTones.canvas },
  { background: ogTones.plate3, color: ogTones.ink },
  { background: ogTones.plate2, color: ogTones.ink },
  { background: ogTones.plate1, color: ogTones.ink },
];

export default async function Image({ params }: ImageParams) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  const locale: Locale = value;

  return ogImage(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        background: ogTones.canvas,
        color: ogTones.ink,
        fontFamily: "Mona Sans",
        fontWeight: 500,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, padding: "48px 56px 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 38 }}>{profile.role}</div>
          <OgLogo size={64} color={ogTones.ink} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 20,
            fontWeight: 800,
            fontSize: 172,
            lineHeight: 0.92,
            letterSpacing: "-0.02em",
          }}
        >
          <div style={{ display: "flex" }}>{profile.name.first}</div>
          <div style={{ display: "flex" }}>{profile.name.last}</div>
        </div>
      </div>

      <div style={{ display: "flex", width: "100%" }}>
        {profile.layers[locale].map((layer, index) => {
          const tone = layerTones[index] ?? layerTones[0];
          return (
            <div
              key={layer.label}
              style={{
                display: "flex",
                alignItems: "flex-end",
                width: 300,
                height: 72 + (3 - index) * 22,
                padding: "0 0 16px 24px",
                marginTop: index * 22,
                fontSize: 26,
                background: tone?.background,
                color: tone?.color,
              }}
            >
              {layer.label}
            </div>
          );
        })}
      </div>
    </div>,
  );
}
