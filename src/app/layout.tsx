import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import "./globals.css";

/** Typeface roles: Hanken Grotesk for everything, Newsreader italic for editorial emphasis, Plex Mono for drawing annotations. */
const plexSans = IBM_Plex_Sans({ variable: "--font-plex-sans", subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], display: "swap" });
const plexMono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], weight: ["400", "500"], display: "swap" });

export const metadata: Metadata = {
  title: "Algosoup | AI training where everyone builds something useful",
  description:
    "Hands-on AI workshops from Algosoup. Every person builds a working tool for their own job, connects it to their day, and leaves knowing how to use it tomorrow.",
  openGraph: {
    title: "Algosoup | AI training where everyone builds something useful",
    description: "Send us one manual workflow and get it back redone with AI, plus the Claude skills to run it, within three hours, free.",
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
