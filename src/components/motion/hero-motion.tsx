"use client";

import { usePathname } from "next/navigation";
import { gsap, queries, useGSAP } from "@/lib/gsap";

/** Sedikit melebihi satu baris, agar descender "y" ikut keluar dari plate. */
const lineOverscan = 1.15;

/**
 * Lapisan depan hero:
 * - Adegan: plate diam (`sticky`) sementara nama naik; salinan di plate digeser sama persis dengan
 *   scroll, sehingga tetap segaris dengan nama di luar plate dan terbaca sebagai parallax antar bidang.
 * - Ponsel: foto mendekat saat plate meninggalkan layar, menandai kedalaman tanpa menggeser posisinya.
 */
export function HeroMotion() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const plate = document.querySelector<HTMLElement>(".hero-plate");
      if (!plate) return;

      const mm = gsap.matchMedia();

      mm.add(queries.scene, () => {
        const copy = plate.querySelector<HTMLElement>("[data-name-copy]");
        if (!copy) return;

        const travel = () => copy.offsetHeight * lineOverscan;
        gsap.to(copy, {
          y: () => -travel(),
          ease: "none",
          scrollTrigger: { start: 0, end: () => travel(), scrub: true, invalidateOnRefresh: true },
        });
      });

      mm.add(queries.flow, () => {
        const photo = plate.querySelector("img");
        if (!photo) return;

        gsap.to(photo, {
          scale: 1.08,
          transformOrigin: "100% 0",
          ease: "none",
          scrollTrigger: { trigger: plate, start: "clamp(top top)", end: "bottom top", scrub: true },
        });
      });
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
