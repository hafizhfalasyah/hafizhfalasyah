import manifest from "./photos.generated.json";
import type { L10n } from "./types";

export type PhotoId = keyof typeof manifest;

export const photoFiles = manifest;

export const photoAlt: Record<PhotoId, L10n<string>> = {
  "foto-1": {
    id: "Potret formal Hafizh Falasyah.",
    en: "Formal portrait of Hafizh Falasyah.",
  },
  "foto-3": {
    id: "Hafizh Falasyah berdiri di samping kotak hydrant, dengan map Universitas Negeri Malang di atas kotak.",
    en: "Hafizh Falasyah standing beside a hydrant box, with a Universitas Negeri Malang folder on top of it.",
  },
  "foto-4": {
    id: "Hafizh Falasyah duduk di tangga dengan map Universitas Negeri Malang di sampingnya.",
    en: "Hafizh Falasyah sitting on a staircase with a Universitas Negeri Malang folder alongside.",
  },
  "foto-6": {
    id: "Hafizh Falasyah dari belakang di koridor, membawa map Universitas Negeri Malang.",
    en: "Hafizh Falasyah seen from behind in a corridor, carrying a Universitas Negeri Malang folder.",
  },
  "foto-7": {
    id: "Hafizh Falasyah duduk di bangku sambil melihat jam tangan.",
    en: "Hafizh Falasyah sitting on a bench, looking at a wristwatch.",
  },
};
