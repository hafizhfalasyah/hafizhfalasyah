import { Martian_Mono, Mona_Sans } from "next/font/google";

export const monaSans = Mona_Sans({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-mona",
});

export const martianMono = Martian_Mono({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-martian",
});
