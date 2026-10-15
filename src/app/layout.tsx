import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk, IBM_Plex_Mono, Newsreader } from "next/font/google";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import "./globals.css";

/** Typeface roles: Hanken Grotesk for everything, Newsreader italic for editorial emphasis, Plex Mono for drawing annotations. */
const hanken = Hanken_Grotesk({ variable: "--font-hanken", subsets: ["latin"], display: "swap" });
const newsreader = Newsreader({ variable: "--font-newsreader", subsets: ["latin"], style: ["italic"], weight: ["400"], display: "swap" });
const plexMono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], weight: ["400", "500"], display: "swap" });

export const metadata: Metadata = {
  title: "Forta · Stop renting the software you run on",
  description:
    "Forta replaces costly, ill-fitting SaaS and manual workarounds with bespoke internal systems, and trains your people to own, run and extend them.",
  openGraph: {
    title: "Forta · Stop renting the software you run on",
    description: "Bespoke systems. In-house capability. Measured ROI.",
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
