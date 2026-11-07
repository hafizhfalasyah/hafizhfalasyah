"use client";

import { gsap, queries, tokens, useGSAP } from "@/lib/gsap";
import { motionBridge } from "@/lib/motion-bridge";

/**
 * Menu tersusun dari bawah seperti tumpukan plate: fondasi lebih dulu, lapisan atas terakhir.
 * Timeline lama selalu dihentikan, sehingga buka dan tutup bisa saling menyela tanpa loncatan.
 */
export function MenuMotion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add({ motion: queries.motion, reduce: queries.reduce }, (context) => {
      const moving = Boolean(context.conditions?.motion);
      let timeline: gsap.core.Timeline | undefined;

      const menu = context.add("menu", (panel: HTMLElement, open: boolean) => {
        return new Promise<void>((resolve) => {
          const plates = panel.querySelectorAll<HTMLElement>("[data-menu-plate]");
          const labels = panel.querySelectorAll<HTMLElement>("[data-menu-label]");
          const interrupted = timeline?.isActive() ?? false;

          timeline?.kill();
          timeline = gsap.timeline({ onComplete: resolve, onInterrupt: resolve });

          if (!moving) {
            timeline.fromTo(panel, { autoAlpha: open ? 0 : 1 }, { autoAlpha: open ? 1 : 0, duration: tokens.micro });
            return;
          }

          // Tiap plate berjarak tepat sampai tepi bawah, jadi gerak langsung terlihat begitu dimulai.
          const toBottomEdge = (_index: number, plate: HTMLElement) => panel.clientHeight - plate.offsetTop;

          if (open) {
            if (!interrupted) {
              gsap.set(plates, { y: toBottomEdge });
              gsap.set(labels, { yPercent: 115 });
            }
            timeline
              .to(plates, {
                y: 0,
                duration: tokens.base,
                ease: tokens.plate,
                stagger: { each: tokens.stagger, from: "end" },
              })
              .to(
                labels,
                { yPercent: 0, duration: tokens.base, ease: tokens.enter, stagger: { each: tokens.stagger, from: "end" } },
                0.3,
              )
              // Tinggi baris bisa pecahan piksel: tanpa transform, tepinya menempel rapat tanpa celah.
              .set([...plates, ...labels], { clearProps: "transform" });
          } else {
            timeline.to(plates, { y: toBottomEdge, duration: tokens.short, ease: tokens.plate, stagger: tokens.stagger / 2 });
          }
        });
      }) as (panel: HTMLElement, open: boolean) => Promise<void>;

      motionBridge.menu = menu;

      return () => {
        timeline?.kill();
        delete motionBridge.menu;
      };
    });
  });

  return null;
}
