"use client";

import Lenis from "lenis";
import { useEffect, useState } from "react";
import { Cursor } from "@/components/shell/cursor";
import { TransitionLayer } from "@/components/shell/transition-layer";
import { gsap, queries, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { motionBridge } from "@/lib/motion-bridge";
import { HeroMotion } from "./hero-motion";
import { Magnetic } from "./magnetic";
import { MenuMotion } from "./menu-motion";
import { PageMotion } from "./page-motion";
import { ProjectsMotion } from "./projects-motion";
import { StructureMotion } from "./structure-motion";

/**
 * Dipasang satu per satu, karena satu commit gabungan memblokir main thread sekitar 1,2 detik pada
 * throttle CPU 4x, sering tepat saat pengunjung mulai menggulir. Transisi dan menu lebih dulu karena
 * merespons klik; empat berikutnya mengikuti urutan halaman, sesuai urutan ScrollTrigger dibuat.
 */
const islands = [
  TransitionLayer,
  MenuMotion,
  PageMotion,
  HeroMotion,
  StructureMotion,
  ProjectsMotion,
  Magnetic,
  Cursor,
];

/** Jarak scroll sebelum header ikut bersembunyi, agar tidak hilang saat baru mulai membaca. */
const hideAfter = 320;

/** Header memberi ruang saat membaca ke bawah dan kembali begitu pengunjung berbalik arah. */
function watchHeader(hideOnScrollDown: boolean) {
  const header = document.getElementById("site-header");
  if (!header) return;

  const sync = (trigger: ScrollTrigger) => {
    const position = trigger.scroll();
    header.toggleAttribute("data-scrolled", position > 8);
    if (hideOnScrollDown) header.toggleAttribute("data-hidden", trigger.direction === 1 && position > hideAfter);
  };

  sync(ScrollTrigger.create({ start: 0, end: "max", onUpdate: sync }));

  return () => {
    header.removeAttribute("data-scrolled");
    header.removeAttribute("data-hidden");
  };
}

/** Satu-satunya pemilik Lenis, ticker, dan posisi scroll. Semua primitive berjalan di bawahnya. */
export default function MotionRoot() {
  const [mounted, setMounted] = useState(0);

  useEffect(() => {
    // Posisi trigger dihitung ulang setelah semua pin dan jarak scroll terpasang.
    if (mounted === islands.length) {
      ScrollTrigger.refresh();
      return;
    }
    const timer = setTimeout(() => setMounted(mounted + 1), 0);
    return () => clearTimeout(timer);
  }, [mounted]);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(queries.motion, () => {
      const lenis = new Lenis({ autoRaf: false, lerp: 0.1, anchors: true });
      const tick = (time: number) => lenis.raf(time * 1000);
      const syncSize = () => lenis.resize();

      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      ScrollTrigger.addEventListener("refreshInit", syncSize);

      motionBridge.scrollTo = (target, immediate) => {
        // Setelah rute berganti, batas scroll Lenis masih milik halaman sebelumnya.
        if (immediate) lenis.resize();
        lenis.scrollTo(target, { immediate, force: true });
      };
      motionBridge.lockScroll = (locked) => {
        if (locked) lenis.stop();
        else lenis.start();
      };

      return () => {
        delete motionBridge.scrollTo;
        delete motionBridge.lockScroll;
        ScrollTrigger.removeEventListener("refreshInit", syncSize);
        gsap.ticker.lagSmoothing(500, 33);
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    });

    mm.add({ motion: queries.motion, reduce: queries.reduce }, (context) =>
      watchHeader(Boolean(context.conditions?.motion)),
    );
  });

  return islands.slice(0, mounted).map((Island, index) => <Island key={index} />);
}
