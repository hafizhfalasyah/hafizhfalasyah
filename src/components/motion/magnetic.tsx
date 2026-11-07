"use client";

import { usePathname } from "next/navigation";
import { gsap, queries, tokens, useGSAP } from "@/lib/gsap";

const pull = 0.25;
const reach = gsap.utils.clamp(-12, 12);

/** CTA `data-magnetic` tertarik ke kursor saat didekati, sebagai umpan balik sebelum klik. */
export function Magnetic() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(queries.finePointer, () => {
        const detach = gsap.utils.toArray<HTMLElement>("[data-magnetic]").map((element) => {
          const moveX = gsap.quickTo(element, "x", { duration: tokens.short, ease: tokens.enter });
          const moveY = gsap.quickTo(element, "y", { duration: tokens.short, ease: tokens.enter });
          // Diukur sekali saat masuk: membaca layout di setiap gerakan pointer memicu reflow.
          let bounds = element.getBoundingClientRect();

          const onEnter = () => {
            bounds = element.getBoundingClientRect();
          };
          const onMove = (event: PointerEvent) => {
            moveX(reach((event.clientX - bounds.left - bounds.width / 2) * pull));
            moveY(reach((event.clientY - bounds.top - bounds.height / 2) * pull));
          };
          const onLeave = () => {
            moveX(0);
            moveY(0);
          };

          element.addEventListener("pointerenter", onEnter);
          element.addEventListener("pointermove", onMove);
          element.addEventListener("pointerleave", onLeave);

          return () => {
            element.removeEventListener("pointerenter", onEnter);
            element.removeEventListener("pointermove", onMove);
            element.removeEventListener("pointerleave", onLeave);
          };
        });

        return () => detach.forEach((remove) => remove());
      });
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
