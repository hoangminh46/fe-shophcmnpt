"use client";
import MainLayout from "@/app/layouts/MainLayout";
import ChangePassForm from "@/components/core/ChangePassForm";
import ProfileForm from "@/components/core/ProfileForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchCity } from "@/lib/features/appSlice";
import { fetchUser, logout } from "@/lib/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { NumericFormat } from "react-number-format";

export default function Profile() {
  const user = useAppSelector((state) => state.auth.user);
  const orders = useAppSelector((state) => state.auth.order);
  const cityList = useAppSelector((state) => state.app.cityData);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchCity());
    dispatch(fetchUser()).then((data) => {
      if (data) {
        localStorage.setItem("user", data?.payload?.user);
      }
    });
  }, [dispatch]);

  function handleLogout() {
    dispatch(logout());
    // router.push("/auth");
  }

  function handleGetAddress(
    cityId: any,
    districtId: any,
    wardId: any,
    type: any
  ) {
    const city = cityList?.find((item: any) => {
      return item.Id === cityId;
    });
    const district = city?.Districts?.find((item: any) => {
      return item.Id === districtId;
    });
    const ward = district?.Wards?.find((item: any) => {
      return item.Id === wardId;
    });
    if (type === 1) {
      return city?.Name;
    }
    if (type === 2) {
      return district?.Name;
    }
    if (type === 3) {
      return ward?.Name;
    }
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
                  Địa chỉ nhận hàng: {order?.detailAddress},{" "}
                  {handleGetAddress(
                    order?.city,
                    order?.district,
                    order?.ward,
                    3
                  )}
                  ,{" "}
                  {handleGetAddress(
                    order?.city,
                    order?.district,
                    order?.ward,
                    2
                  )}
                  ,
                  {handleGetAddress(
                    order?.city,
                    order?.district,
                    order?.ward,
                    1
                  )}
                </div>
                <div>Số điện thoại: {order?.phoneNumber}</div>
                <div>Sản phẩm:</div>
                <div className="mt-4 max-h-[266px] overflow-auto">
                  {order.items.map((item: any) => (
                    <div key={item?.id} className="border-t py-4 flex gap-4">
                      <div className="border w-[100px] h-[100px] px-2 py-4 flex flex-col justify-end">
                        <Image
                          src={item?.thumbnail}
                          width={100}
                          height={100}
                          quality={100}
                          alt="product"
                          className="w-full"
                        />
                      </div>
                      <div className="w-full">
                        <div className="font-semibold">{item?.name}</div>
                        <div className="flex justify-between">
                          <div>Phân loại hàng: Size {item?.size}</div>
                          <div className="flex gap-2">
                            <div className="text-sm line-through text-[#757575]">
                              <NumericFormat
                                type="text"
                                value={item?.oldPrice}
                                displayType={"text"}
                                thousandsGroupStyle="thousand"
                                thousandSeparator=","
                              />
                              đ
                            </div>
                            <div className="text-sm text-[#c50c0c]">
                              <NumericFormat
                                type="text"
                                value={item?.salePrice}
                                displayType={"text"}
                                thousandsGroupStyle="thousand"
                                thousandSeparator=","
                              />
                              đ
                            </div>
                          </div>
                        </div>
                        <div>Số lượng: {item?.quantity}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-right py-4 font-medium text-lg">
                  Thành tiền:{" "}
                  <span className="text-[#c50c0c]">
                    <NumericFormat
                      type="text"
                      value={order?.total}
                      displayType={"text"}
                      thousandsGroupStyle="thousand"
                      thousandSeparator=","
                    />
                    đ
                  </span>
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
