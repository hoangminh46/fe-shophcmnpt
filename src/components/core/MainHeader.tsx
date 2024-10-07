"use client";

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
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchCart, fetchUser, logout } from "@/lib/features/authSlice";
import { useRouter } from "next/navigation";
import Cart from "@/components/core/Cart";
import { toggleCart, toggleSearch } from "@/lib/features/appSlice";
import Search from "@/components/core/Search";
import { useEffect } from "react";

export default function MainHeader() {
  const router = useRouter();
  const userAuth = useAppSelector((state) => state.auth.isAuthenticated);
  const user = useAppSelector((state) => state.auth.user);
  const cart = useAppSelector((state) => state.auth.cart);
  const dispatch = useAppDispatch();

  function handleLogout() {
    localStorage.removeItem("token");
    dispatch(logout());
    dispatch(toggleCart(false));
    router.push("/auth");
  }

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(fetchCart(user?.id));
    }
  }, []);

  return (
    <header className="border-b-1 h-4.5 fixed top-0 left-0 right-0 z-50 bg-white mb-[71px] w-full max-w-full">
      <div className="container flex items-center h-full justify-between">
        <div className="flex items-center gap-10">
          <Link href={"/"}>
            <Image
              src="/images/logo.webp"
              alt="Logo"
              loading="lazy"
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
          <div onClick={() => dispatch(toggleSearch())}>
            <SearchIcon />
          </div>
          {userAuth ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none font-medium">
                <UserIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link href={"/profile"}>
                  <DropdownMenuItem className="p-4 font-medium">
                    Thông tin cá nhân
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  className="p-4 font-medium"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href={"/auth"}>
              <UserIcon />
            </Link>
          )}
          {userAuth ? (
            <div
              className="relative"
              onClick={() => dispatch(toggleCart(null))}
            >
              <CartIcon />
              <span className="absolute text-xs top-0 -right-1 bg-black text-white px-1 text-center rounded-full">
                {cart?.cartQuantity}
              </span>
            </div>
          ) : (
            <Link href={"/auth"}>
              <div className="relative">
                <CartIcon />
                <span className="absolute text-xs top-0 -right-1 bg-black text-white px-1 text-center rounded-full">
                  0
                </span>
              </div>
            </Link>
          )}
          <Cart cartProducts={cart} />
          <Search />
        </div>
      </div>
    </header>
  );
}
