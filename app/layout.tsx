import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoBangla = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "700"],
  display: "swap",
});

// Metadata
export const metadata: Metadata = {
  title: "Survey",
};

// Layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" >
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoBangla.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
