import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Catalog — сучасний каталог товарів",
  description: "Навчальний каталог товарів на Next.js і TypeScript із пошуком та фільтрацією.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
