// Grading monochrome yang identik untuk ketujuh foto. Keluaran dapat diulang byte per byte.
// Foto `publish: false` ikut digrading, tetapi hasilnya hanya ke folder privat yang di-ignore.

import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SOURCE_DIR = path.join(ROOT, "assets/photos/source");
const PUBLIC_DIR = path.join(ROOT, "public/photos");
const PRIVATE_DIR = path.join(ROOT, "assets/photos/private");
const MANIFEST_PATH = path.join(ROOT, "src/content/photos.generated.json");

const PHOTOS = [
  { id: "foto-1", file: "foto-1.jpg", publish: true },
  { id: "foto-2", file: "foto-2.JPG", publish: false },
  { id: "foto-3", file: "foto-3.JPG", publish: true },
  { id: "foto-4", file: "foto-4.JPG", publish: true },
  { id: "foto-5", file: "foto-5.JPG", publish: false },
  { id: "foto-6", file: "foto-6.JPG", publish: true },
  { id: "foto-7", file: "foto-7.JPG", publish: true },
];

const PRESET = {
  // 640 untuk plate hero di ponsel: 86vw pada 412px DPR 1.75 butuh 620px, jadi 828 mengirim piksel berlebih.
  widths: [480, 640, 828, 1200, 1600, 2000],
  // Channel mix tetap: merah hydrant dan biru bangku punya bobot yang sama di semua foto.
  mix: [0.42, 0.46, 0.12],
  // Kurva S sigmoid di sekitar pivot, lalu dipetakan ke rentang tinta foto.
  // Pivot rendah menjaga detail jas gelap; foto-6 yang paling gelap menjadi batas bawahnya.
  curve: { steepness: 4.6, pivot: 0.3, black: 0.04, white: 0.96 },
  // Simpangan grain dalam level 8-bit, paling kuat di midtone.
  // Diukur pada dinding foto-7: sigma 5 bertahan seragam 1.6 sampai 2.0 level di semua lebar AVIF,
  // sedangkan sigma 4 turun ke 0.5 karena dihapus encoder.
  grain: { sigma: 5, shadowFloor: 0.45 },
  // q62 menjaga semua 1600w di bawah anggaran; q64 dengan sigma 5 melewatinya.
  avif: { quality: 62, effort: 6, chromaSubsampling: "4:2:0" },
  webp: { quality: 78, effort: 6, smartSubsample: false },
};

// Anggaran ukuran dari docs/plan.md, hanya untuk foto yang terbit.
const BUDGETS = [
  { label: "foto hero 828w AVIF", test: (f) => f.id === "foto-7" && f.width === 828 && f.format === "avif", maxKb: 90 },
  { label: "foto 1600w AVIF", test: (f) => f.width === 1600 && f.format === "avif", maxKb: 220 },
];

function buildToneLut({ steepness, pivot, black, white }) {
  const sigmoid = (x) => 1 / (1 + Math.exp(-steepness * (x - pivot)));
  const low = sigmoid(0);
  const high = sigmoid(1);
  return Uint8Array.from({ length: 256 }, (_, i) => {
    const normalized = (sigmoid(i / 255) - low) / (high - low);
    return Math.round((black + normalized * (white - black)) * 255);
  });
}

function seedFrom(text) {
  // FNV-1a
  let hash = 0x811c9dc5;
  for (const char of text) {
    hash ^= char.codePointAt(0);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

function mulberry32(seed) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Diterapkan setelah resize, jadi ukuran butir sama satu piksel di semua lebar.
function applyGrain(pixels, seed, { sigma, shadowFloor }) {
  const random = mulberry32(seed);
  const output = Buffer.allocUnsafe(pixels.length);
  for (let i = 0; i < pixels.length; i += 1) {
    const value = pixels[i];
    const luma = value / 255;
    const midtone = shadowFloor + (1 - shadowFloor) * (1 - Math.abs(2 * luma - 1));
    const gaussian = Math.sqrt(-2 * Math.log(1 - random())) * Math.cos(2 * Math.PI * random());
    output[i] = Math.max(0, Math.min(255, Math.round(value + gaussian * sigma * midtone)));
  }
  return output;
}

function assertSingleChannel(info) {
  if (info.channels !== 1) throw new Error(`Buffer grading harus 1 kanal, didapat ${info.channels}`);
}

async function gradeBase(sourcePath, lut) {
  const [r, g, b] = PRESET.mix;
  const { data, info } = await sharp(sourcePath)
    .autoOrient()
    .removeAlpha()
    .recomb([
      [r, g, b],
      [r, g, b],
      [r, g, b],
    ])
    .extractChannel(0)
    .toColourspace("b-w")
    .raw()
    .toBuffer({ resolveWithObject: true });
  assertSingleChannel(info);

  const toned = Buffer.allocUnsafe(data.length);
  for (let i = 0; i < data.length; i += 1) toned[i] = lut[data[i]];
  return { pixels: toned, width: info.width, height: info.height };
}

function outputWidths(naturalWidth) {
  const widths = PRESET.widths.filter((width) => width <= naturalWidth);
  // Foto yang lebih kecil dari lebar terkecil tetap terbit pada ukuran aslinya, tanpa pembesaran.
  return widths.length > 0 ? widths : [naturalWidth];
}

async function exportPhoto(photo, base, outDir) {
  const entries = [];
  for (const width of outputWidths(base.width)) {
    const raw = { width: base.width, height: base.height, channels: 1 };
    const resized = await sharp(base.pixels, { raw })
      .resize({ width, kernel: "lanczos3", withoutEnlargement: true })
      .toColourspace("b-w")
      .raw()
      .toBuffer({ resolveWithObject: true });
    assertSingleChannel(resized.info);
    const grained = applyGrain(resized.data, seedFrom(`${photo.id}:${width}`), PRESET.grain);
    const encoder = () =>
      sharp(grained, { raw: { width: resized.info.width, height: resized.info.height, channels: 1 } }).toColourspace(
        "srgb",
      );

    for (const format of ["avif", "webp"]) {
      const file = path.join(outDir, `${photo.id}-${width}.${format}`);
      await encoder()[format](PRESET[format]).toFile(file);
      entries.push({ id: photo.id, width, format, file, height: resized.info.height });
    }
  }
  return entries;
}

async function main() {
  await rm(PUBLIC_DIR, { recursive: true, force: true });
  await rm(PRIVATE_DIR, { recursive: true, force: true });
  await mkdir(PUBLIC_DIR, { recursive: true });
  await mkdir(PRIVATE_DIR, { recursive: true });

  const lut = buildToneLut(PRESET.curve);
  const manifest = {};
  const failures = [];

  for (const photo of PHOTOS) {
    const base = await gradeBase(path.join(SOURCE_DIR, photo.file), lut);
    const entries = await exportPhoto(photo, base, photo.publish ? PUBLIC_DIR : PRIVATE_DIR);
    const summary = [];

    for (const entry of entries) {
      const { size } = await stat(entry.file);
      const kb = size / 1024;
      if (entry.format === "avif") summary.push(`${entry.width}w ${kb.toFixed(0)}KB`);
      if (!photo.publish) continue;
      for (const budget of BUDGETS) {
        if (budget.test(entry) && kb > budget.maxKb) {
          failures.push(`${path.basename(entry.file)}: ${kb.toFixed(1)}KB melebihi ${budget.label} (${budget.maxKb}KB)`);
        }
      }
    }

    const largest = entries[entries.length - 1];
    if (photo.publish) {
      manifest[photo.id] = {
        width: largest.width,
        height: largest.height,
        widths: [...new Set(entries.map((entry) => entry.width))],
      };
    }
    console.log(`${photo.id}${photo.publish ? "" : " (privat)"} ${base.width}x${base.height} | AVIF ${summary.join(", ")}`);
  }

  await writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);

  // Sidik jari seluruh keluaran untuk membuktikan hasil dapat diulang.
  const digest = createHash("sha256");
  for (const dir of [PUBLIC_DIR, PRIVATE_DIR]) {
    for (const name of (await readdir(dir)).sort()) {
      digest.update(name);
      digest.update(await readFile(path.join(dir, name)));
    }
  }
  console.log(`sha256 ${digest.digest("hex")}`);

  if (failures.length > 0) {
    console.error(`Anggaran ukuran terlampaui:\n${failures.join("\n")}`);
    process.exitCode = 1;
  }
}

await main();
