/**
 * Geometri monogram pada grid 16 unit, agar tiap tepi jatuh tepat di piksel pada 16px.
 * `src/app/icon.svg` memakai angka yang sama karena file statis tidak bisa mengimpor.
 */
export const logoViewBox = "0 0 16 16";

export const logoRects = [
  { x: 1, y: 2, width: 3, height: 12 }, // tiang kiri H
  { x: 7, y: 2, width: 3, height: 12 }, // tiang bersama H dan F
  { x: 10, y: 2, width: 5, height: 3 }, // lengan atas F
  { x: 4, y: 7, width: 3, height: 3 }, // palang H
  { x: 10, y: 7, width: 4, height: 3 }, // lengan tengah F
] as const;
