import type { Metadata } from "next";
import LocalFont from "next/font/local";
import "./globals.css";

const inter = LocalFont({ src: "../assets/fonts/Satoshi-Variable.ttf" });

export const metadata: Metadata = {
  title: "Healthcare provider App",
  description: "Application meant for healthcare provider related operations",
  icons: "/logo.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/logo.svg" />
      </head>
      <body className={inter.className}>
        <div id="modal"></div>
        {children}
      </body>
    </html>
  );
}
