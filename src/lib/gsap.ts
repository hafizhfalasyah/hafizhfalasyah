import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Hanya diimpor dari chunk motion yang di-lazy-load: plugin terdaftar sekali, dan di browser saja.
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

/** Padanan GSAP dari token motion di `globals.css`. */
export const tokens = {
  enter: "expo.out",
  plate: "power4.inOut",
  micro: 0.18,
  short: 0.32,
  base: 0.6,
  long: 0.9,
  stagger: 0.06,
} as const;

export const queries = {
  motion: "(prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
  /** Parallax digerakkan JS; di touch ia tertinggal dari scroll native, jadi hanya mulai 1024px. */
  wide: "(min-width: 64rem) and (prefers-reduced-motion: no-preference)",
  finePointer: "(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)",
  /** Susun Lapis 3D. Sama persis dengan media query mode adegan di `globals.css`. */
  scene: "(min-width: 64rem) and (min-height: 44rem) and (prefers-reduced-motion: no-preference)",
  /** Kebalikan `scene` selama motion hidup: tumpukan sticky tanpa 3D. */
  flow: "(prefers-reduced-motion: no-preference) and ((max-width: 63.99rem) or (max-height: 43.99rem))",
} as const;

export { gsap, ScrollTrigger, SplitText, useGSAP };
