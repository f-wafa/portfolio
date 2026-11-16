import type { Metadata, Viewport } from "next";
import {
  Instrument_Serif,
  JetBrains_Mono,
  Plus_Jakarta_Sans,
} from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { profile } from "@/content/profile";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-jb",
  subsets: ["latin"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} | Fullstack developer in training`,
    template: `%s | ${profile.name}`,
  },
  description:
    "The portfolio of Faiz Syaiful Wafa, a 15-year-old fullstack developer in training in Indonesia. Small web tools, real repositories, and a public learning trail.",
  applicationName: `${profile.name} portfolio`,
  authors: [{ name: profile.name, url: profile.github }],
  creator: profile.name,
  keywords: [
    "Faiz Syaiful Wafa",
    "f-wafa",
    "portfolio",
    "fullstack developer",
    "web developer",
    "Indonesia",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: profile.name,
    title: `${profile.name} | Fullstack developer in training`,
    description:
      "Small web tools, real repositories, and a public learning trail from a developer in training in Indonesia.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Faiz Syaiful Wafa, fullstack developer in training. I build web things by feel.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | Fullstack developer in training`,
    description:
      "Small web tools, real repositories, and a public learning trail from a developer in training in Indonesia.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f5f0" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0a" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jakarta.variable} ${mono.variable} ${instrument.variable}`}
    >
      <body className="min-h-dvh bg-paper text-ink antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
