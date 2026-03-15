import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"; // Added a premium serif
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// This gives you that "High-end Consultant" look for the Hero italics
const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  weight: "400",
  subsets: ["latin"],
  style: "italic",
});

export const metadata: Metadata = {
  title: "Vaulty | Collect Client Documents Without The Chase",
  description:
    "A professional, secure portal for service firms to request, verify, and organize client documents automatically.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Added 'scroll-smooth' so your Nav links glide instead of jump
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased bg-[#fafafa] text-slate-900`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
