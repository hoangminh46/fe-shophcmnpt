"use client";
import MainLayout from "@/app/layouts/MainLayout";
import ProfileForm from "@/components/core/ProfileForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchCity } from "@/lib/features/appSlice";
import { useAppDispatch } from "@/lib/hooks";
import Image from "next/image";
import { useEffect } from "react";

export default function Profile() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCity());
  }, []);

  return (
    <MainLayout>
      <div className="container mt-12 w-[1240px] mx-auto mb-28">
        <h2 className="text-2xl font-semibold">Xin chào, Hoàng Minh!</h2>
        <Tabs defaultValue="offer" className="w-full flex mt-10">
          <TabsList className="flex-col h-auto bg-transparent justify-start w-1/4">
            <div className="font-semibold mb-6 text-black text-left text-lg w-full">
              Thành viên mới
            </div>
            <TabsTrigger
              className="p-0 mb-6 border-b-transparent self-baseline"
              value="offer"
            >
              Xem ưu đãi thành viên
            </TabsTrigger>
            <div className="font-semibold mb-6 text-black text-left text-xl w-full">
              Tài khoản của tôi
            </div>
            <TabsTrigger
              className="p-0 mb-6 border-b-transparent self-baseline"
              value="account"
            >
              Thông tin cá nhân
            </TabsTrigger>
            <TabsTrigger
              className="p-0 mb-6 border-b-transparent self-baseline"
              value="history"
            >
              Lịch sử mua hàng
            </TabsTrigger>
            <TabsTrigger
              className="p-0 mb-6 border-b-transparent self-baseline"
              value="change-pass"
            >
              Đổi mật khẩu
            </TabsTrigger>
            <div className="p-0 mb-6 self-baseline text-red-600 font-semibold cursor-pointer text-sm">
              Đăng xuất
            </div>
          </TabsList>
          <TabsContent value="offer" className="w-3/4">
            <h3 className="font-semibold text-lg mb-5">
              Chào mừng bạn đến với Authentic Store !
            </h3>
            <p className="text-sm mb-4">
              Đây là trang tổng quan về tài khoản cá nhân của bạn gồm thông tin
              chi tiết giao dịch và ưu đãi thành viên.
            </p>
            <Image
              className="w-full h-auto"
              src="/images/profile.jpg"
              alt="Logo"
              width={1000}
              height={1000}
              quality={100}
            />
          </TabsContent>
          <TabsContent value="account" className="w-3/4">
            <ProfileForm />
          </TabsContent>
          <TabsContent value="history" className="w-3/4">
            Hisotry
          </TabsContent>
          <TabsContent value="change-pass" className="w-3/4">
            Change your password here.
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
