"use client";
import MainLayout from "@/app/layouts/MainLayout";
import ChangePassForm from "@/components/core/ChangePassForm";
import ProfileForm from "@/components/core/ProfileForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchCity } from "@/lib/features/appSlice";
import {
  fetchCart,
  fetchOrder,
  fetchUser,
  logout,
} from "@/lib/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Profile() {
  const user = useAppSelector((state) => state.auth.user);
  const orders = useAppSelector((state) => state.auth.order);
  const userToken = useAppSelector((state) => state.auth.userToken);
  const cityList = useAppSelector((state) => state.app.cityData);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchCity());
    dispatch(fetchUser());
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(fetchCart(user?.id));
      dispatch(fetchOrder(user?.id));
    }
  }, [user]);

  useEffect(() => {
    if (!userToken) {
      dispatch(logout());
      router.push("/auth");
    }
  }, [userToken]);

  function handleLogout() {
    localStorage.removeItem("token");
    dispatch(logout());
    router.push("/auth");
  }

  return (
    <MainLayout>
      <div className="container mt-12 w-[1240px] mx-auto mb-28">
        <h2 className="text-2xl font-semibold">Xin chào, {user?.fullName}</h2>
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
            <div
              className="p-0 mb-6 self-baseline text-red-600 font-semibold cursor-pointer text-sm"
              onClick={handleLogout}
            >
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
              loading="lazy"
              width={1000}
              height={1000}
              quality={100}
            />
          </TabsContent>
          <TabsContent value="account" className="w-3/4">
            <ProfileForm />
          </TabsContent>
          <TabsContent value="history" className="w-3/4">
            <h3 className="font-semibold text-lg mb-5">Lịch sử mua hàng</h3>
            {orders?.items?.map((order: any) => (
              <div key={order?.id} className="shadow-sm border p-4 mb-8">
                <div>Mã đơn hàng: {order?.id}</div>
                <div>
                  Địa chỉ nhận hàng: {order?.detailAddress}, {order?.district},{" "}
                  {order?.ward}, {order?.city}
                </div>
                <div>Số điện thoại: {order?.phoneNumber}</div>
                <div>
                  {order.items.map((item: any) => (
                    <div key={item?.id}>{item?.name}</div>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="change-pass" className="w-3/4">
            <ChangePassForm />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
