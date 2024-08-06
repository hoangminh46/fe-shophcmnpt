import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montFont = Montserrat({ subsets: ["vietnamese"] });

export const metadata: Metadata = {
  title: "Shop",
  description: "Shop bán giày đỉnh cao",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montFont.className}>
        <div className="app">{children}</div>
      </body>
    </html>
  );
}
