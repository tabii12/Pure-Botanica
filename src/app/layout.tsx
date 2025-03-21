import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header>
          <h1>Pure Botanica</h1>
        </header>

        <nav style={{ display: "flex", gap: "20px", padding: "10px" }}>
          <Link href="/">Home</Link>
          <Link href="/about">Giới thiệu</Link>
          <Link href="/login">Đăng nhập</Link>
          <Link href="/register">Đăng ký</Link>
          <Link href="/contact">Liên hệ</Link>
          <Link href="/state">State</Link>
        </nav>

        {children}

        <footer>
          <p>© 2024 Pure Botanica</p>
        </footer>
      </body>
    </html>
  );
}
