"use client";

import { usePathname } from "next/navigation";
import { gsap, queries, SplitText, useGSAP } from "@/lib/gsap";

/** Pose aksonometri tanpa perspektif: bidang diputar di tempatnya, lalu dimiringkan. */
const tiltX = 58;
const turnZ = -45;

/** Tinggi `.structure` di `globals.css`, sekaligus seluruh jarak scroll dari puncak halaman sampai pin selesai. */
const sceneHeight = 280;

/** Posisi di timeline (0 sampai 1) dari jarak scroll dalam svh. */
const beat = (svh: number) => svh / sceneHeight;

const at = {
  /** Nama sudah keluar dari plate pada semua rasio layar yang diukur (maksimum 25svh). */
  tilt: beat(28),
  /** Plate tiba di posisi saat panggung mulai terkunci. */
  stage: beat(100),
  layers: beat(105),
  layerStep: beat(20),
  swap: beat(165),
  sentenceEnd: beat(185),
  /** Teks memudar lebih dulu: plate yang merapat ke tengah melewati kolom teks. */
  textOut: beat(200),
  textOutEnd: beat(220),
  collapse: beat(205),
  /** `.projects` di `globals.css` mulai naik di titik ini, jadi judulnya masuk sekitar 35svh setelah teks habis. */
  fill: beat(232),
};

/**
 * Teks yang belum sampai gilirannya tetap lolos AA, karena pengunjung bisa berhenti di tengah scroll.
 * `--ink` di atas `--canvas` butuh minimal 0.58 (terang) dan 0.47 (gelap) untuk 4.5:1.
 */
const opacityDim = 0.62;

function sceneGeometry(stage: HTMLElement, plate: HTMLElement, text: HTMLElement) {
  const viewportWidth = document.documentElement.clientWidth;
  const viewportHeight = stage.offsetHeight;
  const stageLeft = stage.getBoundingClientRect().left;
  const width = plate.offsetWidth;
  const height = plate.offsetHeight;
  const left = plate.offsetLeft;
  const top = plate.offsetTop;

  const span = (width + height) * Math.SQRT1_2;
  const rise = Math.cos((tiltX * Math.PI) / 180);
  const gap = viewportHeight * 0.1;
  // Sudut kiri plate tidak boleh menyentuh baris teknologi di kolom kiri.
  const zoneLeft = Math.max(left, text.offsetLeft + text.offsetWidth) + 24;
  const zoneRight = stage.offsetWidth - parseFloat(getComputedStyle(stage).paddingRight);
  const scale = Math.min((zoneRight - zoneLeft) / span, (viewportHeight * 0.86 - gap * 3) / (span * rise));

  const centerX = left + width / 2;
  const centerY = top + height / 2;

  return {
    scale,
    x: (zoneLeft + zoneRight) / 2 - centerX,
    /** Lapisan 0 (fondasi) paling bawah, lapisan 3 (tampilan) paling atas. */
    y: (slot: number) => viewportHeight * 0.53 + (1.5 - slot) * gap - centerY,
    below: viewportHeight * 1.1,
    flatX: viewportWidth / 2 - stageLeft - centerX,
    flatY: viewportHeight / 2 - centerY,
    // Lebih 2px: posisi pecahan piksel tidak boleh menyisakan celah di tepi layar.
    fillX: (viewportWidth + 2) / width,
    fillY: (viewportHeight + 2) / height,
  };
}

/**
 * Susun Lapis: plate hero miring menjadi lapisan teratas, tiga lapisan lain tersusun dari bawah
 * sambil kalimat profil terbaca, lalu tumpukan rata dan plate teratas menjadi latar section Proyek.
 * Efeknya adalah klaim di kalimat itu sendiri: fondasi lebih dulu, tampilan terakhir.
 */
export function StructureMotion() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const maket = document.getElementById("maket");
      const stage = document.querySelector<HTMLElement>(".structure-stage");
      const sentence = document.querySelector<HTMLElement>("[data-structure-sentence]");
      if (!maket || !stage || !sentence) return;

      const mm = gsap.matchMedia();

      mm.add(queries.flow, () => {
        const { words } = SplitText.create(sentence, { type: "words", aria: "none" });
        gsap.fromTo(
          words,
          { opacity: opacityDim },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: sentence, start: "top 85%", end: "bottom 45%", scrub: true },
          },
        );
      });

      mm.add(queries.scene, () => {
        const plates = gsap.utils.toArray<HTMLElement>("[data-layer-plate]");
        const faces = gsap.utils.toArray<HTMLElement>("[data-layer-face]");
        const labels = gsap.utils.toArray<HTMLElement>("[data-layer-label]");
        const texts = gsap.utils.toArray<HTMLElement>("[data-layer-text]");
        const intro = document.querySelector<HTMLElement>("[data-structure-intro]");
        const photoTilt = document.querySelector<HTMLElement>("[data-plate-tilt]");
        const photoFace = document.querySelector<HTMLElement>("[data-plate-face]");
        const measure = plates[0];
        const measureText = texts[0];
        const top = plates.at(-1);
        if (!intro || !photoTilt || !photoFace || !measure || !measureText || !top) return;

        const geo = () => sceneGeometry(stage, measure, measureText);
        const { words } = SplitText.create(sentence, { type: "words", aria: "none" });

        gsap.set(faces, { rotation: turnZ });

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: maket, start: 0, end: "bottom bottom", scrub: true, invalidateOnRefresh: true },
        });

        timeline
          .to(
            photoTilt,
            {
              x: () => geo().x,
              y: () => geo().y(3),
              scale: () => geo().scale,
              rotationX: tiltX,
              duration: at.stage - at.tilt,
            },
            at.tilt,
          )
          .to(photoFace, { rotation: turnZ, duration: at.stage - at.tilt }, at.tilt)
          .fromTo(
            words,
            { opacity: opacityDim },
            { opacity: 1, duration: beat(7), stagger: { amount: at.sentenceEnd - at.layers - beat(7) } },
            at.layers,
          );

        // Fondasi lebih dulu; lapisan teratas menunggu foto selesai digantikan.
        plates.forEach((plate, slot) => {
          const landing = at.layers + at.layerStep * slot;
          const text = texts[slot];
          if (text) {
            const textAt = slot === plates.length - 1 ? at.swap : landing + beat(10);
            timeline.fromTo(text, { opacity: opacityDim }, { opacity: 1, duration: beat(14) }, textAt);
          }

          if (plate === top) {
            timeline.fromTo(
              plate,
              {
                x: () => geo().x,
                y: () => geo().y(slot),
                scale: () => geo().scale,
                rotationX: tiltX,
                autoAlpha: 0,
              },
              { autoAlpha: 1, duration: beat(10) },
              at.swap,
            );
            return;
          }

          timeline.fromTo(
            plate,
            {
              x: () => geo().x,
              y: () => geo().y(slot) + geo().below,
              scale: () => geo().scale,
              rotationX: tiltX,
            },
            { y: () => geo().y(slot), duration: at.layerStep + beat(3) },
            landing,
          );
        });

        timeline
          .to(photoTilt, { autoAlpha: 0, duration: beat(10) }, at.swap + beat(7))
          .to(
            plates,
            {
              x: () => geo().flatX,
              y: () => geo().flatY,
              rotationX: 0,
              duration: at.fill - at.collapse,
            },
            at.collapse,
          )
          .to(faces, { rotation: 0, duration: at.fill - at.collapse }, at.collapse)
          // Label lapisan bawah pergi lebih dulu, agar tidak terpotong oleh plate yang merapat.
          .to(labels.slice(0, -1), { autoAlpha: 0, duration: beat(10) }, at.collapse)
          // `opacity`, bukan `autoAlpha`: teks tetap ada di pohon aksesibilitas setelah adegan lewat.
          .to([intro, ...texts], { opacity: 0, duration: at.textOutEnd - at.textOut }, at.textOut)
          .to(labels.slice(-1), { autoAlpha: 0, duration: beat(20) }, at.textOut + beat(14))
          .to(
            top,
            { scaleX: () => geo().fillX, scaleY: () => geo().fillY, duration: 1 - at.fill },
            at.fill,
          )
          .set(plates.slice(0, -1), { autoAlpha: 0 }, at.fill);
      });
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
