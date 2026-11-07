/**
 * Kontrak antara shell di chunk kritis dan island motion yang di-lazy-load. File ini sengaja
 * tidak mengimpor GSAP atau Lenis. Selama chunk belum terpasang, method-nya kosong dan shell
 * tetap berfungsi tanpa animasi.
 */
type MotionBridge = {
  scrollTo?: (target: number | HTMLElement, immediate: boolean) => void;
  lockScroll?: (locked: boolean) => void;
  cover?: (label?: string) => Promise<void>;
  /** `fromPop`: back/forward, rute sudah berganti sehingga fase menutup dilewati. */
  uncover?: (fromPop: boolean) => Promise<void>;
  menu?: (panel: HTMLElement, open: boolean) => Promise<void>;
};

export const motionBridge: MotionBridge = {};

export function scrollToTarget(target: number | HTMLElement, immediate = false): void {
  if (motionBridge.scrollTo) motionBridge.scrollTo(target, immediate);
  else if (typeof target === "number") window.scrollTo(0, target);
  else target.scrollIntoView();
}
