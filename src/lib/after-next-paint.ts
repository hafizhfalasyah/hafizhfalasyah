/**
 * Menjalankan kerja berat setelah frame berikutnya ter-paint, agar umpan balik sebuah interaksi
 * terlihat lebih dulu. Mengembalikan fungsi pembatal.
 */
export function afterNextPaint(callback: () => void): () => void {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const frame = requestAnimationFrame(() => {
    timer = setTimeout(callback, 0);
  });
  return () => {
    cancelAnimationFrame(frame);
    clearTimeout(timer);
  };
}
