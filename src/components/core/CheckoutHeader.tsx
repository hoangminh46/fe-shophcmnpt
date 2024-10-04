import BackIcon from "@/icons/BackIcon";
import Link from "next/link";

export default function CheckoutHeader() {
  return (
    <header>
      <div className="container mt-6">
        <Link href={"/"} className="inline-flex items-center gap-3 text-[30px]">
          <BackIcon />
          <div>Về trang chủ</div>
        </Link>
      </div>
    </header>
  );
}
