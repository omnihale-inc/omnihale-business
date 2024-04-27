import type { Metadata } from "next";
import LocalFont from "next/font/local";
import "./globals.css";

const inter = LocalFont({ src: "../assets/fonts/Satoshi-Variable.ttf" });

export const metadata: Metadata = {
  title: "Omnihale | Business",
  description: "Enabling care giver providing their services easily",
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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="apple-touch-icon" href="/logo.svg" />
      </head>
      <body className={inter.className}>
        <div id="modal"></div>
        {children}
      </body>
    </html>
  );
}
