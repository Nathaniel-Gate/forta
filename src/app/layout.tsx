import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import "./globals.css";

/** Typeface roles: Hanken Grotesk for everything, Newsreader italic for editorial emphasis, Plex Mono for drawing annotations. */
const plexSans = IBM_Plex_Sans({ variable: "--font-plex-sans", subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], display: "swap" });
const plexMono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], weight: ["400", "500"], display: "swap" });

export const metadata: Metadata = {
  title: "Algosoup | Make your company AI-native",
  description:
    "Algosoup teaches your team to build software with AI, so you stop renting tools that don't fit and own ones that do.",
  openGraph: {
    title: "Algosoup | Make your company AI-native",
    description: "Send us your tech stack and get it back rebuilt for your company within three hours, free.",
    type: "website",
    locale: "en_GB",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${plexSans.variable} ${plexMono.variable} antialiased`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
