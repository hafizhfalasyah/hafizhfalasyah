"use client";

import { usePathname } from "next/navigation";
import { useRef } from "react";
import { gsap, queries, ScrollTrigger, SplitText, tokens, useGSAP } from "@/lib/gsap";

/** Teks mulai naik saat plate transisi sudah mulai terangkat. */
const afterCover = 0.25;

/** Geseran kata besar selama plate-nya terlihat, dalam persen lebar kata. */
const driftTravel = -14;

/**
 * Primitive per rute, dibersihkan setiap pathname berganti:
 * - `data-reveal`: judul muncul per baris dari balik mask, mengikuti urutan baca.
 * - `data-parallax`: foto bergerak lebih lambat dari bingkainya, memberi kedalaman antar plate.
 * - `data-drift`: kata besar bergeser di dalam plate, memperlihatkan bahwa ia dipotong oleh tepinya.
 */
export function PageMotion() {
  const pathname = usePathname();
  const isFirstRun = useRef(true);

  useGSAP(
    () => {
      const firstRun = isFirstRun.current;
      isFirstRun.current = false;
      const mm = gsap.matchMedia();

      // Saat reduced motion judul tidak pernah disembunyikan, jadi halaman utuh sejak awal.
      mm.add(queries.motion, () => {
        // Semua posisi dibaca sebelum DOM diubah: SplitText memaksa layout ulang bila keduanya bergantian.
        const viewportHeight = window.innerHeight;
        const reveals = gsap.utils
          .toArray<HTMLElement>("[data-reveal]")
          .map((element) => ({ element, onScreen: element.getBoundingClientRect().top < viewportHeight }));

        reveals.forEach(({ element, onScreen }) => {
          // Chunk ini tiba setelah idle: teks yang sudah terlihat tidak boleh hilang lalu muncul lagi.
          if (firstRun && onScreen) return;

          const scrollTrigger = { trigger: element, start: "top 88%", once: true };
          const delay = onScreen ? afterCover : 0;

          SplitText.create(element, {
            type: "lines",
            mask: "lines",
            linesClass: "split-line",
            autoSplit: true,
            onSplit: (split) =>
              gsap.from(split.lines, {
                yPercent: 115,
                duration: tokens.long,
                ease: tokens.enter,
                stagger: tokens.stagger,
                delay,
                scrollTrigger,
                onComplete: () => {
                  split.revert();
                },
              }),
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-drift]").forEach((word) => {
          gsap.to(word, {
            xPercent: driftTravel,
            ease: "none",
            // `clamp`: kata yang sudah terlihat saat halaman dibuka tidak meloncat dari posisinya.
            scrollTrigger: { trigger: word.parentElement, start: "clamp(top bottom)", end: "bottom top", scrub: true },
          });
        });
      });

      mm.add(queries.wide, () => {
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((frame) => {
          const image = frame.querySelector("img");
          if (!image) return;
          gsap.to(image, {
            yPercent: 10,
            ease: "none",
            // `clamp`: foto yang sudah terlihat saat halaman dibuka tidak meloncat dari posisinya.
            scrollTrigger: { trigger: frame, start: "clamp(top bottom)", end: "bottom top", scrub: true },
          });
        });
      });

      // Posisi trigger dihitung ulang setelah font dan gambar non-lazy siap. Gambar lazy tidak
      // perlu ditunggu: dimensinya dari manifest, sehingga tidak menggeser layout.
      const pendingImages = gsap.utils
        .toArray<HTMLImageElement>("main img")
        .filter((image) => !image.complete && image.loading !== "lazy")
        .map((image) => image.decode());
      void Promise.allSettled([document.fonts.ready, ...pendingImages]).then(() => ScrollTrigger.refresh());
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
