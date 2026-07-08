import { Caveat, Karla, Libre_Baskerville } from "next/font/google";

export const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
});

export const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});
