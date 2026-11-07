"use client";

import { usePathname } from "next/navigation";
import { gsap, queries, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { scrollToTarget } from "@/lib/motion-bridge";

/** Plate tertutup mengecil sedikit, sehingga terbaca berada di bawah plate yang baru tiba. */
const coveredScale = 0.95;
/** Jarak bawah plate setinggi layar saat menempel. */
const fitGap = 16;

/**
 * Tumpukan proyek dan sampul studi kasus: posisinya murni CSS `sticky`, animasi ini hanya menambah
 * kedalaman antar plate. Plate yang lebih tinggi dari layar menempel dengan tepi bawahnya, sehingga
 * tidak ada teks yang tertutup plate berikutnya sebelum sempat terbaca.
 */
export function ProjectsMotion() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const slots = gsap.utils.toArray<HTMLElement>("[data-project-slot]");
      if (slots.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add(queries.motion, () => {
        const fit = () => {
          for (const slot of slots) {
            slot.style.removeProperty("top");
            const style = getComputedStyle(slot);
            if (style.position !== "sticky") continue;
            const fitted = window.innerHeight - slot.offsetHeight - fitGap;
            if (fitted < Number.parseFloat(style.top)) slot.style.top = `${fitted}px`;
          }
        };
        fit();
        ScrollTrigger.addEventListener("refreshInit", fit);

        // Sampul menempel di balik bidang alas: fokus ke breadcrumb kembali ke puncak, tempat sampul tampil utuh.
        const cover = document.querySelector<HTMLElement>(".case-slot");
        const toTop = () => scrollToTarget(0, true);
        cover?.addEventListener("focusin", toTop);

        slots.forEach((slot, index) => {
          const plate = slot.querySelector<HTMLElement>("[data-project-plate]");
          const next = slots[index + 1];
          if (plate && next) {
            gsap.to(plate, {
              scale: coveredScale,
              ease: "none",
              scrollTrigger: { trigger: next, start: "top bottom", end: "top top", scrub: true },
            });
          }
        });

        return () => {
          cover?.removeEventListener("focusin", toTop);
          ScrollTrigger.removeEventListener("refreshInit", fit);
          for (const slot of slots) slot.style.removeProperty("top");
        };
      });
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
