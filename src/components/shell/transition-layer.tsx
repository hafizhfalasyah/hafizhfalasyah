"use client";

import { useRef } from "react";
import { gsap, queries, tokens, useGSAP } from "@/lib/gsap";
import { motionBridge } from "@/lib/motion-bridge";

/**
 * Dua plate menutup layar dari bawah saat rute berganti, sehingga pergantian halaman terbaca
 * sebagai kartu yang ditumpuk dan diangkat. Hanya diimpor dari `motion-root` agar GSAP tetap
 * di chunk lazy. Saat reduced motion, gerak diganti fade singkat ke warna alas.
 */
export function TransitionLayer() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia(scope);

      mm.add({ motion: queries.motion, reduce: queries.reduce }, (context) => {
        const layer = scope.current;
        const label = layer?.querySelector<HTMLElement>("[data-transition-label]");
        const plates = gsap.utils.toArray<HTMLElement>("[data-transition-plate]");
        if (!layer || !label) return;

        const moving = Boolean(context.conditions?.motion);
        gsap.set(plates, moving ? { yPercent: 100 } : { autoAlpha: 0 });
        // Warna alas hanya untuk fade: saat bergerak, plate naik di atas halaman yang masih terlihat.
        layer.classList.toggle("bg-canvas", !moving);

        const cover = context.add("cover", (text?: string) => {
          return new Promise<void>((resolve) => {
            if (!moving) {
              gsap.to(layer, { autoAlpha: 1, duration: tokens.micro, onComplete: resolve });
              return;
            }
            label.textContent = text ?? "";
            gsap.set(layer, { autoAlpha: 1 });
            gsap.set(label, { yPercent: 115 });
            gsap
              .timeline({ onComplete: resolve })
              .fromTo(
                plates,
                { yPercent: 100 },
                { yPercent: 0, duration: 0.4, ease: tokens.plate, stagger: tokens.stagger },
              )
              .to(label, { yPercent: 0, duration: tokens.short, ease: tokens.enter }, 0.2);
          });
        }) as (text?: string) => Promise<void>;

        const uncover = context.add("uncover", (fromPop: boolean) => {
          return new Promise<void>((resolve) => {
            if (!moving) {
              // Back/forward tanpa penutup: tidak ada lapisan yang perlu dipudarkan.
              if (fromPop) resolve();
              else gsap.to(layer, { autoAlpha: 0, duration: tokens.micro, onComplete: resolve });
              return;
            }
            if (fromPop) {
              label.textContent = "";
              gsap.set(layer, { autoAlpha: 1 });
              gsap.set(plates, { yPercent: 0 });
            }
            gsap.to(plates, {
              yPercent: -100,
              duration: 0.5,
              ease: tokens.plate,
              stagger: { each: tokens.stagger, from: "end" },
              onComplete: () => {
                gsap.set(layer, { autoAlpha: 0 });
                resolve();
              },
            });
          });
        }) as (fromPop: boolean) => Promise<void>;

        motionBridge.cover = cover;
        motionBridge.uncover = uncover;

        return () => {
          delete motionBridge.cover;
          delete motionBridge.uncover;
        };
      });
    },
    { scope },
  );

  return (
    <div ref={scope} aria-hidden="true" className="invisible fixed inset-0 z-transition overflow-clip">
      <div data-transition-plate className="absolute inset-0 bg-plate-3" />
      <div data-transition-plate className="absolute inset-0 flex items-end bg-ink pb-12 text-canvas md:pb-16">
        <div className="overflow-clip px-gutter">
          <p data-transition-label className="type-project" />
        </div>
      </div>
    </div>
  );
}
