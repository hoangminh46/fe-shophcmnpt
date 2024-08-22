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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfileForm() {
  const dispatch = useAppDispatch();
  const cityData = useAppSelector((state) => state.app.cityData);
  const [citis, setCitis] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  console.log(cityData);
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onBlur",
    defaultValues: {
      email: "minh123@gmail.com",
      fullName: "",
      phoneNumber: "",
      city: "",
      ward: "",
      district: "",
    },
  });

  function handleCityChange(value: any) {
    const selectedCity = cityData.find((city: any) => city.Id === value);
    console.log("selected city", selectedCity);
    setCitis(selectedCity);
    setDistricts(selectedCity.Districts);
    setWards([]);
  }

  const handleDistrictChange = (value: any) => {
    const selectedDistrict = districts.find(
      (district: any) => district.Id === value
    );
    setWards(selectedDistrict?.Wards);
  };

  async function onSubmit(values: z.infer<typeof profileSchema>) {}

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
                <Input placeholder="Nguyễn Văn A" {...field} type="text" />
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
                <Input placeholder="0123456789" {...field} type="text" />
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
                  {cityData.map((item: any) => (
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
                  {districts.map((item: any) => (
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
                  {wards.map((item: any) => (
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
        <Button type="submit" className="block w-half">
          Lưu thông tin
        </Button>
      </form>
    </Form>
  );
}
