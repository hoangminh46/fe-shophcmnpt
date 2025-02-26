"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";

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
import { toast } from "sonner";

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
  const router = useRouter();
  const dispatch = useAppDispatch();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const resultAction = await dispatch(loginUser(values));
    if (loginUser.fulfilled.match(resultAction)) {
      const { message, accessToken } = resultAction.payload;
      toast.success(message);
      localStorage.setItem("accessToken", accessToken);
      router.push("/profile");
    } else if (loginUser.rejected.match(resultAction)) {
      const message: any = resultAction.payload;
      toast.error(message);
    }
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
