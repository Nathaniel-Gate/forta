import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, IBM_Plex_Mono, Newsreader } from "next/font/google";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import "./globals.css";

/** Typeface roles: Hanken Grotesk for everything, Newsreader italic for editorial emphasis, Plex Mono for drawing annotations. */
const hanken = Hanken_Grotesk({ variable: "--font-hanken", subsets: ["latin"], display: "swap" });
const newsreader = Newsreader({ variable: "--font-newsreader", subsets: ["latin"], style: ["italic"], weight: ["400"], display: "swap" });
const plexMono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], weight: ["400", "500"], display: "swap" });

export const metadata: Metadata = {
  title: "Forta | Make your company AI-native",
  description:
    "Forta teaches your team to build software with AI, so you stop renting tools that don't fit and own ones that do.",
  openGraph: {
    title: "Forta | Make your company AI-native",
    description: "Send us your tech stack and get it back rebuilt for your company within three hours, free.",
    type: "website",
    locale: "en_GB",
  },
};

export const viewport: Viewport = {
  themeColor: "#08090a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${hanken.variable} ${newsreader.variable} ${plexMono.variable} antialiased`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
