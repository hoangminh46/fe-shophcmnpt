"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAppSelector, useAppDispatch, useAppStore } from "@/lib/hooks";
import { toast } from "sonner"

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
import { loginUser } from "@/lib/features/authSlice";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email còn trống, vui lòng nhập đầy đủ")
    .email("Email không đúng định dạng, vui lòng nhập lại"),
  password: z.string().min(1, "Mật khẩu còn trống, vui lòng nhập đầy đủ"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSwitchTab: () => void;
}

export default function LoginForm({ onSwitchTab }: LoginFormProps) {
  const store = useAppStore();
  const user = useAppSelector((state) => state.auth.user);
  const message = useAppSelector((state) => state.auth.error);
  const dispatch = useAppDispatch();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    dispatch(loginUser(values))
  }

  return (
    <Form {...form}>
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
        <Link
          href={"/forgotpass"}
          className="text-sm font-medium underline mt-2"
        >
          Bạn quên mật khẩu?
        </Link>
        <Button type="submit" className="block w-full">
          Đăng nhập
        </Button>
        <div className="w-full text-sm text-center border-t p-4 font-medium">
          Bạn chưa có tài khoản?
          <span
            onClick={onSwitchTab}
            className="ml-1 underline cursor-pointer font-semibold"
          >
            Đăng ký ngay
          </span>
        </div>
      </form>
    </Form>
  );
}
