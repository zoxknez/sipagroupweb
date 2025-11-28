import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { LoadingScreen } from "@/components/layout/LoadingScreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: '#030712',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Sipka Group | Archaeologists of Property",
    template: "%s | Sipka Group",
  },
  description: "Sipka Group is a family-oriented property investment group focusing on commercial and residential real estate across New Zealand. Discover our portfolio of premium properties in Auckland, Wellington, Matamata, and Queenstown.",
  keywords: ["property investment", "New Zealand", "Auckland", "Wellington", "commercial property", "residential property", "Sipka Group", "real estate"],
  authors: [{ name: "Sipka Group" }],
  creator: "Sipka Holdings Ltd",
  publisher: "Sipka Group",
  openGraph: {
    type: "website",
    locale: "en_NZ",
    url: "https://www.sipkagroup.nz",
    siteName: "Sipka Group",
    title: "Sipka Group | Archaeologists of Property",
    description: "A family-oriented property investment group with almost two decades of experience in New Zealand real estate.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sipka Group - Property Investment",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sipka Group | Archaeologists of Property",
    description: "A family-oriented property investment group with almost two decades of experience in New Zealand real estate.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white min-h-screen`}
      >
        <LoadingScreen />
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
