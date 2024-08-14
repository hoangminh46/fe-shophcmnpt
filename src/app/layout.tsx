import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/app/StoreProvider";
import { Toaster } from "@/components/ui/sonner";

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
        <StoreProvider>
          <div className="app">{children}</div>
        </StoreProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
