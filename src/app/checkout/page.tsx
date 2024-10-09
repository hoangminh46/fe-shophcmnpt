"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { NumericFormat } from "react-number-format";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchUser, updateUsers } from "@/lib/features/authSlice";
import { fetchCity } from "@/lib/features/appSlice";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CheckoutLayout from "@/app/layouts/CheckoutLayout";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { addOrder } from "@/services/appService";

const checkoutSchema = z.object({
  fullName: z.string().min(1, "Họ tên còn trống, vui lòng nhập đầy đủ"),
  phoneNumber: z
    .string()
    .min(1, "Số điện thoại còn trống, vui lòng nhập đầy đủ")
    .regex(
      /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/,
      "Số điện thoại không hợp lệ"
    ),
  city: z.string().min(1, "Vui lòng chọn tỉnh/thành phố"),
  ward: z.string().min(1, "Vui lòng chọn quận/huyện"),
  district: z.string().min(1, "Vui lòng chọn phường/xã"),
  detailAddress: z.string().min(1, "Vui lòng nhập trường này"),
  payment: z.enum(["momo", "credit", "cod"], {
    errorMap: () => ({ message: "Vui lòng chọn phương thức thanh toán" }),
  }),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface City {
  Id: string;
  Name: string;
  Districts: object[];
}

export default function Checkout() {
  const user = useAppSelector((state) => state.auth.user);
  const cartProducts = useAppSelector((state) => state.auth.cart);
  const dispatch = useAppDispatch();
  const cityData = useAppSelector((state) => state.app.cityData);
  const [citis, setCitis] = useState<City>({} as City);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: user?.fullName || "",
      phoneNumber: user?.phone || "",
      city: user?.address?.city?.id || "",
      ward: user?.address?.ward?.id || "",
      district: user?.address?.district?.id || "",
      detailAddress: user?.address?.detail || "",
    },
  });

  function handleCityChange(value: any) {
    const selectedCity = cityData?.find((city: any) => city.Id === value);
    setCitis(selectedCity);
    setDistricts(selectedCity?.Districts);
    setWards([]);
    form.setValue("district", "");
    form.setValue("ward", "");
  }

  const handleDistrictChange = (value: any) => {
    const selectedDistrict: any = districts.find(
      (district: any) => district.Id === value
    );
    setWards(selectedDistrict?.Wards);
  };

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchCity());
  }, []);

  useEffect(() => {
    if (user && cityData) {
      handleLoadCity();
    }
  }, [user, cityData]);

  function handleLoadCity() {
    const selectedCity = cityData?.find(
      (city: any) => city.Id === user?.address?.city?.id
    );

    setCitis(selectedCity);
    const newDistricts = selectedCity?.Districts || [];
    setDistricts(newDistricts);

    const selectedDistrict: any = newDistricts.find(
      (district: any) => district.Id === user?.address?.district?.id
    );

    setWards(selectedDistrict?.Wards || []);
  }

  async function onSubmit(values: z.infer<typeof checkoutSchema>) {
    const data = {
      ...values,
      ...cartProducts,
    };
    addOrder(data);
    setIsOpenModal(true);
  }

  return (
    <CheckoutLayout>
      <div className="flex justify-between my-10">
        <div className="p-4 w-[30%]">
          <div className="text-2xl mb-6">THÔNG TIN GIAO HÀNG</div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Họ và tên</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập họ tên..."
                        {...field}
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập số điện thoại..."
                        {...field}
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chọn Tỉnh/Thành phố:</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleCityChange(value);
                      }}
                      defaultValue={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn Tỉnh/Thành phố..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cityData?.map((item: any) => (
                          <SelectItem key={item.Id} value={item.Id}>
                            {item.Name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chọn Quận/Huyện:</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleDistrictChange(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn Quận/Huyện..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent onChange={handleCityChange}>
                        {districts?.map((item: any) => (
                          <SelectItem key={item.Id} value={item.Id}>
                            {item.Name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ward"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chọn Phường/Xã:</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn Phường/Xã..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent onChange={handleCityChange}>
                        {wards?.map((item: any) => (
                          <SelectItem key={item.Id} value={item.Id}>
                            {item.Name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="detailAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Địa chỉ cụ thể</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập địa chỉ..."
                        {...field}
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <div className="p-4 w-[30%]">
          <div className="text-2xl mb-6">PHƯƠNG THỨC THANH TOÁN</div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="payment"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormItem className="mb-3">
                          <FormLabel
                            htmlFor="momo"
                            className="px-4 py-2 border w-full flex items-center gap-x-3"
                          >
                            <RadioGroupItem value="momo" id="momo" />
                            <Image
                              src="/images/payment/momo.png"
                              alt="momo"
                              loading="lazy"
                              width={50}
                              height={50}
                              quality={100}
                            />
                            Thanh toán bằng Momo
                          </FormLabel>
                        </FormItem>
                        <FormItem className="mb-3">
                          <FormLabel
                            htmlFor="credit"
                            className="p-4 border w-full flex items-center gap-x-3"
                          >
                            <RadioGroupItem value="credit" id="credit" />
                            <Image
                              src="/images/payment/visa.png"
                              alt="visa"
                              loading="lazy"
                              width={50}
                              height={50}
                              quality={100}
                            />
                            Thẻ tín dụng
                          </FormLabel>
                        </FormItem>
                        <FormItem>
                          <FormLabel
                            htmlFor="cod"
                            className="px-4 py-2 border w-full flex items-center gap-x-3"
                          >
                            <RadioGroupItem value="cod" id="cod" />
                            <Image
                              src="/images/payment/cod.png"
                              alt="visa"
                              loading="lazy"
                              width={50}
                              height={50}
                              quality={100}
                            />
                            Thanh toán khi nhận hàng
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <div className="p-4 w-[30%]">
          <div className="text-2xl">THÔNG TIN SẢN PHẨM</div>
          <div className="min-h-[340px] max-h-[340px] overflow-auto">
            {cartProducts?.items?.map((item: any) => (
              <div
                key={item?.id}
                className="flex gap-x-3 py-5 border-b-1 max-w-[380px]"
              >
                <div className="bg-[#ffffff] max-w-[180px] min-w-[180px] p-3 flex items-end border-[#f0eeee] shadow-sm">
                  <Image
                    src={item?.thumbnail}
                    alt=""
                    width={1000}
                    height={1000}
                    className="w-full mb-3"
                  />
                </div>
                <div>
                  <div className="font-semibold flex justify-between items-center">
                    <div className="w-[180px] truncate">{item?.name}</div>
                  </div>
                  <div className="flex gap-x-2">
                    <div className="text-[#c50c0c] font-medium">
                      <NumericFormat
                        type="text"
                        value={item?.salePrice}
                        displayType={"text"}
                        thousandsGroupStyle="thousand"
                        thousandSeparator=","
                      />
                    </div>
                    <div className="line-through">
                      <NumericFormat
                        type="text"
                        value={item?.oldPrice}
                        displayType={"text"}
                        thousandsGroupStyle="thousand"
                        thousandSeparator=","
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="min-w-[80px]">
                      Số lượng: {item?.quantity}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="min-w-[80px]">Size:</div>
                    <div>{item?.size}</div>
                  </div>
                  <div className="flex">
                    <div className="min-w-[80px]">Tổng:</div>
                    <div>
                      <NumericFormat
                        type="text"
                        value={item?.subTotal}
                        displayType={"text"}
                        thousandsGroupStyle="thousand"
                        thousandSeparator=","
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="py-4">
            <div className="flex justify-between text-xl">
              <p>Tổng đơn</p>
              <p className="font-semibold text-[22px]">
                <NumericFormat
                  type="text"
                  value={cartProducts?.total}
                  displayType={"text"}
                  thousandsGroupStyle="thousand"
                  thousandSeparator=","
                />
              </p>
            </div>
            <div className="flex justify-between mt-4 text-xl">
              <p>Ưu đãi voucher / thành viên</p>
              <p>-0</p>
            </div>
            <div className="flex justify-between mt-4 text-xl">
              <p>Phí ship</p>
              <p>0</p>
            </div>
            <div className="flex justify-between mt-4 text-2xl border-t py-4 font-semibold">
              <p>THÀNH TIỀN</p>
              <p>
                <NumericFormat
                  type="text"
                  value={cartProducts?.total}
                  displayType={"text"}
                  thousandsGroupStyle="thousand"
                  thousandSeparator=","
                />
              </p>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full mt-4"
            onClick={form.handleSubmit(onSubmit)}
          >
            Xác nhận đơn hàng
          </Button>
        </div>
      </div>
      {isOpenModal && (
        <div className="absolute inset-0 bg-white flex flex-col items-center">
          <Image
            src="/images/payment/checked.png"
            alt="checked"
            loading="lazy"
            width={120}
            height={120}
            quality={100}
            className="mt-20"
          />
          <div className="mt-6 text-[30px] font-medium">
            Đơn hàng của bạn đã được xác nhận!
          </div>
          <div className="mt-6 text-[20px] text-center">
            Cảm ơn bạn đã mua hàng. Đơn hàng sẽ được giao trong vòng 3-5 ngày
            làm việc. <br /> Bạn có thể kiểm tra trạng thái đơn hàng trong mục
            <strong> Lịch sử Mua Hàng </strong> của tài khoản.
          </div>
          <div className="flex gap-4 mt-10">
            <Link href={"/profile"}>
              <Button>Kiểm tra đơn hàng</Button>
            </Link>
            <Link href={"/"}>
              <Button>Về trang chủ</Button>
            </Link>
          </div>
        </div>
      )}
    </CheckoutLayout>
  );
}
