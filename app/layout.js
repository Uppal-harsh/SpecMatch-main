import { Syne, DM_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";
import PageBackground from "@/components/layout/PageBackground";
import AppChrome from "@/components/layout/AppChrome";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});

export const metadata = {
  title: "SpecMatch — Find Your Perfect Device",
  description: "Answer a few questions. Get the exact device you need.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${syne.variable} ${dmMono.variable} ${instrumentSans.variable} antialiased`}
      >
        <PageBackground />
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
