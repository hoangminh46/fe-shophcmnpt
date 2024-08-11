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
import Link from "next/link";

const registerSchema = z.object({
  email: z
    .string()
    .min(1, "Email còn trống, vui lòng nhập đầy đủ")
    .email("Email không đúng định dạng, vui lòng nhập lại"),
  fullName: z.string().min(1, "Họ tên còn trống, vui lòng nhập đầy đủ"),
  password: z.string().min(6, "Mật khẩu phải trên 6 ký tự"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSwitchTab: () => void;
}

export default function RegisterForm({ onSwitchTab }: RegisterFormProps) {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
    },
  });

  function onSubmit(values: z.infer<typeof registerSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <p className="text-sm mb-4">
        Trở thành thành viên Authentic Shoes để nhận ưu đãi độc quyền và thanh
        toán nhanh hơn
      </p>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email đăng nhập</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@gmail.com"
                  {...field}
                  type="email"
                />
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <Input placeholder="********" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="block w-full">
          Đăng ký
        </Button>
        <div className="w-full text-sm text-center border-t p-4 font-medium">
          Bạn đã có tài khoản?
          <span
            onClick={onSwitchTab}
            className="ml-1 underline cursor-pointer font-semibold"
          >
            Đăng nhập ngay
          </span>
        </div>
      </form>
    </Form>
  );
}
