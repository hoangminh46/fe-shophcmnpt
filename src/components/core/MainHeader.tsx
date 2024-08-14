import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import SearchIcon from "@/icons/SearchIcon";
import UserIcon from "@/icons/UserIcon";
import CartIcon from "@/icons/CartIcon";
import { useAppDispatch } from "@/lib/hooks";
import { logout } from "@/lib/features/authSlice";
import { useRouter } from "next/navigation";

export default function MainHeader() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  function handleLogout() {
    localStorage.removeItem("token");
    dispatch(logout());
    router.push("/auth");
  }

  return (
    <header className="border-b-1 h-4.5">
      <div className="container flex items-center h-full justify-between">
        <div className="flex items-center gap-10">
          <Link href={"/"}>
            <Image
              src="/images/logo.webp"
              alt="Logo"
              width={150}
              height={60}
              quality={70}
            />
          </Link>
          <div className="flex gap-8">
            <Link href={"/adidas"} className="font-medium">
              Adidas
            </Link>
            <Link href={"/adidas"} className="font-medium">
              Nike
            </Link>
            <Link href={"/adidas"} className="font-medium">
              New Balance
            </Link>
            <Link href={"/adidas"} className="font-medium">
              MLB
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none font-medium">
                Danh mục
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="p-4 font-medium">
                  Giày thể thao
                </DropdownMenuItem>
                <DropdownMenuItem className="p-4 font-medium">
                  Giày thời trang
                </DropdownMenuItem>
                <DropdownMenuItem className="p-4 font-medium">
                  Giày chạy bộ
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div>
            <SearchIcon />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none font-medium">
              <UserIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="p-4 font-medium">
                Thông tin cá nhân
              </DropdownMenuItem>
              <DropdownMenuItem
                className="p-4 font-medium"
                onClick={handleLogout}
              >
                Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="relative">
            <CartIcon />
            <span className="absolute text-xs top-0 -right-1 bg-black text-white px-1 text-center rounded-full">
              3
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
