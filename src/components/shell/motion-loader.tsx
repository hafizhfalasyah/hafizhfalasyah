"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { appReadyEvent } from "@/lib/loader";

// Motion hanya lapisan tambahan: bila chunk gagal dimuat, shell tetap berjalan tanpa animasi, dan
// `data-motion-off` melepas ruang scroll Susun Lapis yang sudah dicadangkan di CSS.
const MotionRoot = dynamic(
  () =>
    import("@/components/motion/motion-root").catch(() => {
      document.documentElement.toggleAttribute("data-motion-off", true);
      return { default: () => null };
    }),
  { ssr: false },
);

const firstInteraction = ["pointermove", "pointerdown", "keydown", "wheel", "touchstart"] as const;

/** Sebelum ada interaksi tidak ada yang perlu digerakkan, jadi chunk tidak ikut berebut dengan LCP. */
const idleDelay = 3500;

/** Menandai aplikasi terhidrasi untuk loader, lalu memuat GSAP dan Lenis saat benar-benar dibutuhkan. */
export function MotionLoader() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    document.dispatchEvent(new Event(appReadyEvent));

    const stopWaiting = () => {
      clearTimeout(timer);
      for (const name of firstInteraction) window.removeEventListener(name, start);
    };
    const start = () => {
      stopWaiting();
      setReady(true);
    };
    const timer = setTimeout(() => {
      if ("requestIdleCallback" in window) window.requestIdleCallback(start, { timeout: 2000 });
      else start();
    }, idleDelay);
    for (const name of firstInteraction) window.addEventListener(name, start, { passive: true });

    return stopWaiting;
  }, []);

  return ready ? <MotionRoot /> : null;
}
