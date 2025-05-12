import { Noto_Sans_KR } from "next/font/google";

export const Noto = Noto_Sans_KR({
  subsets: ["latin"],
  display: "swap",
  variable: "--noto",
  fallback: ["sans-serif"],
});
