import { logoRects, logoViewBox } from "@/lib/logo";

/** Monogram HF dari lima persegi panjang: tiang tengah H sekaligus tiang F. */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox={logoViewBox} fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      {logoRects.map((rect) => (
        <rect key={`${rect.x}-${rect.y}`} {...rect} />
      ))}
    </svg>
  );
}
