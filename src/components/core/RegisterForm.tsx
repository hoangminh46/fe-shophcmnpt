"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

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
import { useAppDispatch } from "@/lib/hooks";
import { registerUser, verifyUserOTP } from "@/lib/features/authSlice";
import { toast } from "sonner";
import OTPModal from "@/components/core/OTPModal";

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
  const dispatch = useAppDispatch();
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [pendingValues, setPendingValues] = useState<RegisterFormData | null>(
    null
  );

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    const resultAction = await dispatch(registerUser(values));
    if (registerUser.fulfilled.match(resultAction)) {
      const { message } = resultAction.payload;
      toast.success(message);
      setPendingValues(values);
      setShowOTPModal(true);
    } else if (registerUser.rejected.match(resultAction)) {
      const message: any = resultAction.payload;
      toast.error(message);
    }
  }

  const handleVerifyOTP = async (otp: string) => {
    if (pendingValues) {
      const resultAction = await dispatch(
        verifyUserOTP({ email: pendingValues?.email, otp })
      );
      if (verifyUserOTP.fulfilled.match(resultAction)) {
        const { message } = resultAction.payload;
        toast.success(message);
        setShowOTPModal(false);
        onSwitchTab();
      } else if (verifyUserOTP.rejected.match(resultAction)) {
        const message: any = resultAction.payload;
        toast.error(message);
      }
    }
  };

  return (
    <>
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

      <OTPModal
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        onVerify={handleVerifyOTP}
      />
    </>
  );
}
