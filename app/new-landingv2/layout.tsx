import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "@/app/globals.css"; // ✅ still needed for Tailwind and custom layers
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "New Landing Page",
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable} ${inter.variable} font-regular`}>{children}</body>
    </html>
  );
}

