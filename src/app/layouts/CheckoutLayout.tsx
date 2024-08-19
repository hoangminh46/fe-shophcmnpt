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
      <div className="pt-[71px]">{children}</div>
      <Footer />
    </Fragment>
  );
}
