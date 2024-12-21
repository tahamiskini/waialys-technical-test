import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harry Potter",
  description: "This is a Harry Potter fan site.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased dark font-mono">{children}</body>
    </html>
  );
}
