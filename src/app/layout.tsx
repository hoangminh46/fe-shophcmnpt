import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/app/StoreProvider";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import Loading from "@/app/loading";

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
        <Suspense fallback={<Loading />}>
          <StoreProvider>
            <div className="app relative w-full">{children}</div>
          </StoreProvider>
          <Toaster position="top-right" />
        </Suspense>
      </body>
    </html>
  );
}
