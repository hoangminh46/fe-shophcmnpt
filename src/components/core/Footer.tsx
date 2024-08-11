import FacebookIcon from "@/icons/FacebookIcon";
import InstagramIcon from "@/icons/InstagramIcon";
import TiktokIcon from "@/icons/TiktokIcon";
import ZaloIcon from "@/icons/ZaloIcon";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t py-10 bottom-0 left-0 right-0">
      <div className="container flex">
        <div className="w-1/4">
          <p className="py-4 text-sm font-semibold inline-block">Mua sắm</p>
          <ul>
            <li className="mb-2 text-sm">
              <Link href={"/"} className="hover:underline cursor-pointer">
                Khuyến mãi
              </Link>
            </li>
            <li className="mb-2 text-sm">
              <Link href={"/"} className="hover:underline cursor-pointer">
                Sản phẩm mới
              </Link>
            </li>
            <li className="mb-2 text-sm">
              <Link href={"/"} className="hover:underline cursor-pointer">
                Hướng dẫn mua hàng
              </Link>
            </li>
            <li className="mb-2 text-sm">
              <Link href={"/"} className="hover:underline cursor-pointer">
                Hướng dẫn chọn size
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-1/4">
          <p className="py-4 text-sm font-semibold inline-block">Hỗ trợ</p>
          <ul>
            <li className="mb-2 text-sm">
              <Link href={"/"} className="hover:underline cursor-pointer">
                Chính sách khách hàng
              </Link>
            </li>
            <li className="mb-2 text-sm">
              <Link href={"/"} className="hover:underline cursor-pointer">
                Chính sách bảo hành
              </Link>
            </li>
            <li className="mb-2 text-sm">
              <Link href={"/"} className="hover:underline cursor-pointer">
                Chính sách vận chuyển
              </Link>
            </li>
            <li className="mb-2 text-sm">
              <Link href={"/"} className="hover:underline cursor-pointer">
                Chính sách đổi trả
              </Link>
            </li>
            <li className="mb-2 text-sm">
              <Link href={"/"} className="hover:underline cursor-pointer">
                Chính sách bảo mật
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-1/4">
          <p className="py-4 text-sm font-semibold inline-block">
            Về Authentic Store
          </p>
          <ul>
            <li className="mb-2 text-sm">
              <Link href={"/"} className="hover:underline cursor-pointer">
                Giới thiệu Authentic Store
              </Link>
            </li>
            <li className="mb-2 text-sm">
              <Link href={"/"} className="hover:underline cursor-pointer">
                Danh sách cửa hàng
              </Link>
            </li>
            <li className="mb-2 text-sm">
              <Link href={"/"} className="hover:underline cursor-pointer">
                Tuyển dụng
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-1/4">
          <p className="py-4 text-sm font-semibold inline-block">
            Kết nối với chúng tôi
          </p>
          <ul>
            <li className="mb-2 text-sm">
              <Link href={"/"} className="hover:underline cursor-pointer">
                Hotline : 1900 4620 (1000đ/phút, 9h - 22h)
              </Link>
            </li>
            <li className="mb-2 text-sm flex gap-3">
              <Link href={"/"}>
                <FacebookIcon />
              </Link>
              <Link href={"/"}>
                <InstagramIcon />
              </Link>
              <Link href={"/"}>
                <TiktokIcon />
              </Link>
              <Link href={"/"}>
                <ZaloIcon />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
