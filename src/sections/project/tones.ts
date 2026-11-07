/** Nada sampul per proyek, searah tumpukan di beranda: setidaknya satu terbalik, jadi tidak seragam. */
const coverTones = ["bg-plate-2", "bg-plate-1", "on-ink bg-ink text-canvas", "bg-plate-3", "bg-plate-2"];

export function coverTone(index: number): string {
  return coverTones[index % coverTones.length] ?? "bg-plate-1";
}
