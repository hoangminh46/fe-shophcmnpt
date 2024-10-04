import CheckoutHeader from "@/components/core/CheckoutHeader";
import Footer from "@/components/core/Footer";
import { Fragment } from "react";

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
      <CheckoutHeader />
      <div className="container">{children}</div>
      <Footer />
    </Fragment>
  );
}
