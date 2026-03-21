import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lanos IT Solutions — EdTech, Software & R&D",
  description:
    "Lanos IT Solutions delivers cutting-edge EdTech platforms, software solutions, and R&D services that accelerate growth.",
  keywords: ["EdTech", "IT solutions", "software", "R&D", "Lanos"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body suppressHydrationWarning>
        <Analytics />
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
