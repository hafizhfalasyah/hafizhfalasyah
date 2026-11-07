import { ImageResponse } from "next/og";
import { logoRects } from "@/lib/logo";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Satori tidak membaca oklch: nilainya setara `--color-canvas` dan `--color-ink` tema gelap. */
const plate = "#0a0a0a";
const mark = "#f2f2f2";
/** Skala grid 16 unit ke 180px, dengan margin aman untuk masker ikon iOS. */
const unit = 8;
const offset = (180 - 16 * unit) / 2;

export default function AppleIcon() {
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", position: "relative", background: plate }}>
      {logoRects.map((rect) => (
        <div
          key={`${rect.x}-${rect.y}`}
          style={{
            position: "absolute",
            left: offset + rect.x * unit,
            top: offset + rect.y * unit,
            width: rect.width * unit,
            height: rect.height * unit,
            background: mark,
          }}
        />
      ))}
    </div>,
    size,
  );
}
