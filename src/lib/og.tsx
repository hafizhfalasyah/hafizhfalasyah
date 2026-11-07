import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import type { ReactElement } from "react";
import { logoRects } from "./logo";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/** Satori tidak membaca oklch: nilai ini setara token tema gelap di `globals.css`. */
export const ogTones = {
  canvas: "#0a0a0a",
  plate1: "#141414",
  plate2: "#1e1e1e",
  plate3: "#292929",
  ink: "#f2f2f2",
  ink2: "#b1b1b1",
} as const;

const fontFile = (name: string) => readFile(path.join(process.cwd(), "assets/fonts", `${name}.ttf`));

/** Hanya dibaca saat build: semua gambar OG di-prerender. Satori butuh TTF statis, bukan variable font. */
async function ogFonts() {
  const [wide, text, mono] = await Promise.all([
    fontFile("mona-sans-wide-800"),
    fontFile("mona-sans-500"),
    fontFile("martian-mono-400"),
  ]);
  // Satori memilih file lewat keluarga dan berat: 800 adalah instance lebar untuk nama, 500 untuk teks.
  return [
    { name: "Mona Sans", data: wide, weight: 800 as const, style: "normal" as const },
    { name: "Mona Sans", data: text, weight: 500 as const, style: "normal" as const },
    { name: "Martian Mono", data: mono, weight: 400 as const, style: "normal" as const },
  ];
}

export function OgLogo({ size, color }: { size: number; color: string }) {
  const unit = size / 16;
  return (
    <div style={{ display: "flex", position: "relative", width: size, height: size }}>
      {logoRects.map((rect) => (
        <div
          key={`${rect.x}-${rect.y}`}
          style={{
            position: "absolute",
            left: rect.x * unit,
            top: rect.y * unit,
            width: rect.width * unit,
            height: rect.height * unit,
            background: color,
          }}
        />
      ))}
    </div>
  );
}

export async function ogImage(content: ReactElement): Promise<ImageResponse> {
  return new ImageResponse(content, { ...ogSize, fonts: await ogFonts() });
}
