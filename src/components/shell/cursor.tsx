"use client";

import { useRef, useState } from "react";
import { gsap, queries, tokens, useGSAP } from "@/lib/gsap";

/**
 * Penanda kecil di samping kursor asli: membesar di atas elemen interaktif dan menjadi plate
 * berlabel tindakan di atas `data-cursor`. Hanya diimpor dari `motion-root`. Kursor asli tetap
 * terlihat, dan elemennya tidak pernah ada di touch atau saat reduced motion.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(queries.finePointer, () => {
      setEnabled(true);
      return () => setEnabled(false);
    });
  });

  return enabled ? <CursorFollower /> : null;
}

function CursorFollower() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      const dot = root?.querySelector<HTMLElement>("[data-cursor-dot]");
      const plate = root?.querySelector<HTMLElement>("[data-cursor-plate]");
      if (!root || !dot || !plate) return;

      gsap.set(root, { autoAlpha: 0 });
      gsap.set(plate, { scale: 0, autoAlpha: 0 });

      const moveX = gsap.quickTo(root, "x", { duration: tokens.short, ease: tokens.enter });
      const moveY = gsap.quickTo(root, "y", { duration: tokens.short, ease: tokens.enter });
      const state = { duration: tokens.micro, ease: tokens.enter, overwrite: "auto" } as const;
      let visible = false;
      let current: HTMLElement | null = null;

      const onMove = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        if (!visible) {
          visible = true;
          gsap.set(root, { x: event.clientX, y: event.clientY });
          gsap.to(root, { autoAlpha: 1, ...state });
        }
        moveX(event.clientX);
        moveY(event.clientY);
      };

      const onOver = (event: PointerEvent) => {
        const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-cursor], a, button") : null;
        if (target === current) return;
        current = target;

        const text = target?.dataset.cursor;
        if (text) plate.textContent = text;
        gsap.to(plate, { scale: text ? 1 : 0, autoAlpha: text ? 1 : 0, ...state });
        gsap.to(dot, { scale: text ? 0 : target ? 2 : 1, ...state });
      };

      const onLeave = () => {
        visible = false;
        gsap.to(root, { autoAlpha: 0, ...state });
      };

      const html = document.documentElement;
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerover", onOver, { passive: true });
      html.addEventListener("pointerleave", onLeave);

      return () => {
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerover", onOver);
        html.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope },
  );

  return (
    <div ref={scope} aria-hidden="true" className="pointer-events-none invisible fixed top-0 left-0 z-cursor">
      <div className="absolute top-4 left-4">
        <span data-cursor-dot className="block size-2 bg-ink outline-1 outline-canvas" />
        <span
          data-cursor-plate
          className="type-meta absolute top-0 left-0 origin-top-left bg-ink px-3 py-1 font-medium whitespace-nowrap text-canvas outline-1 outline-canvas"
        />
      </div>
    </div>
  );
}
