"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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

const profileSchema = z.object({
  email: z
    .string()
    .min(1, "Email còn trống, vui lòng nhập đầy đủ")
    .email("Email không đúng định dạng, vui lòng nhập lại"),
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
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface City {
  Id: string;
  Name: string;
  Districts: object[];
}

export default function ProfileForm() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const cityData = useAppSelector((state) => state.app.cityData);
  const [citis, setCitis] = useState<City>({} as City);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onBlur",
    defaultValues: {
      email: user?.email || "",
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

  useEffect(() => {
    if (user) {
      handleLoadCity();
    }
  }, [user]);

  // useEffect(() => {
  //   dispatch(fetchUser());
  // }, []);

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    const citySelected = citis.Name;
    const districtSelected = districts.reduce((acc, curr: any) => {
      if (curr.Id === values.district) {
        return curr.Name;
      }
      return acc;
    }, "");
    const wardSelected = wards.reduce((acc, curr: any) => {
      if (curr.Id === values.ward) {
        return curr.Name;
      }
      return acc;
    }, "");

    const data = {
      id: user.id,
      fullName: values.fullName,
      phone: values.phoneNumber,
      address: {
        city: {
          id: values.city,
          name: citySelected,
        },
        district: {
          id: values.district,
          name: districtSelected,
        },
        ward: {
          id: values.ward,
          name: wardSelected,
        },
        detail: values.detailAddress,
      },
    };
    dispatch(updateUsers({ user: data })).then(() => {
      dispatch(fetchUser());
    });
  }

  return (
    <Form {...form}>
      <p className="text-sm mb-4">Thông tin cá nhân</p>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email đăng nhập</FormLabel>
              <FormControl>
                <Input {...field} type="email" disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ và tên</FormLabel>
              <FormControl>
                <Input placeholder="Nhập họ tên..." {...field} type="text" />
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
                defaultValue={field.value}
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                <Input placeholder="Nhập địa chỉ..." {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="block w-half">
          Lưu thông tin
        </Button>
      </form>
    </Form>
  );
}
