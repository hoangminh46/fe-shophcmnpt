"use client";
import MainLayout from "@/app/layouts/MainLayout";
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
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { resetPassword } from "@/lib/features/authSlice";
import { toast } from "sonner";
import LoadingIcon from "@/icons/LoadingIcon";

const forgotSchema = z.object({
  email: z
    .string()
    .min(1, "Email còn trống, vui lòng nhập đầy đủ")
    .email("Email không đúng định dạng, vui lòng nhập lại"),
});

type ForgotFormData = z.infer<typeof forgotSchema>;

export default function ForgotPass() {
  const dispatch = useAppDispatch();
  const loadingState = useAppSelector((state) => state.auth.loading);
  const router = useRouter();
  const form = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof forgotSchema>) {
    const resultAction = await dispatch(resetPassword(values));
    if (resetPassword.fulfilled.match(resultAction)) {
      const message: any = resultAction.payload.message;
      toast.success(message);
    } else if (resetPassword.rejected.match(resultAction)) {
      const message: any = resultAction.payload;
      toast.error(message);
    }
  }

  function handleNavigate() {
    // router.push("/auth");
  }

  return (
    <MainLayout>
      <div className="py-10">
        <div className="w-[464px] mx-auto mt-8">
          <p className="font-semibold text-lg mb-4">Quên mật khẩu</p>
          <p className="text-sm mb-6">
            Vui lòng nhập số điện thoại hoặc email đã đăng ký tài khoản để lấy
            lại mật khẩu
          </p>
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
              <Button type="submit" className="block w-full">
                {loadingState ? (
                  <p className="flex content-center gap-1 justify-center items-center">
                    <LoadingIcon />
                    Đang xử lý...
                  </p>
                ) : (
                  <p>Gửi lại mật khẩu</p>
                )}
              </Button>
            </form>
          </Form>
          <Button
            variant="outline"
            className="block w-full bg-transparent hover:bg-transparent border-transparent hover:border-gray-400 mt-4"
            onClick={handleNavigate}
          >
            Về trang đăng nhập
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
