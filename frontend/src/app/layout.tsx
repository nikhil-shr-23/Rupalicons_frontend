import type { Metadata } from "next";
import { Syne, Outfit } from "next/font/google";
import "./globals.css";
import { CompareProvider } from "@/context/CompareContext";
import CompareDrawer from "@/components/CompareDrawer";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rupali Homes",
  description: "Premium Real Estate Consultancy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${syne.variable} ${outfit.variable} antialiased bg-[#FDFCF8] text-[#1A1A1A] font-sans`}
      >
        <CompareProvider>
          {children}
          <CompareDrawer />
        </CompareProvider>
      </body>
    </html>
  );
}
