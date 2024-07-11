import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppWrapper } from "./context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coffee Connoisseur",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/IBMPlexSans-Bold.ttf" as="font" crossOrigin="anonymous"></link>
        <link rel="preload" href="/fonts/IBMPlexSans-Regular.ttf" as="font" crossOrigin="anonymous"></link>
        <link rel="preload" href="/fonts/IBMPlexSans-SemiBold.ttf" as="font" crossOrigin="anonymous"></link>
      </head>
      <body className={inter.className}><AppWrapper>{children}</AppWrapper></body>
    </html>
  );
}
