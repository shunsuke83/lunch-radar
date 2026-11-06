import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const manrope = localFont({
  src: "./fonts/manrope-latin-variable.woff2",
  variable: "--font-sans",
  weight: "200 800",
  display: "swap",
});

const syne = localFont({
  src: "./fonts/syne-latin-variable.woff2",
  variable: "--font-display",
  weight: "600 700",
  display: "swap",
});

export const metadata: Metadata = {
  title: "점심맛집 · Slack 수집 목록",
  description: "Slack에서 모은 점심 맛집을 검색하고 필터링합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${manrope.variable} ${syne.variable}`}>{children}</body>
    </html>
  );
}
