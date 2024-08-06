import Footer from "@/components/core/Footer";
import MainHeader from "@/components/core/MainHeader";
import { Fragment } from "react";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
      <MainHeader />
      {children}
      <Footer />
    </Fragment>
  );
}
