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
import {
  handleResetCode,
  handleVerifyResetCode,
} from "@/lib/features/authSlice";
import { toast } from "sonner";
import LoadingIcon from "@/icons/LoadingIcon";
import OTPModal from "@/components/core/OTPModal";
import { useState } from "react";
import ResetPassForm from "@/components/core/ResetPassForm";

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
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [showResetPassForm, setShowResetPassForm] = useState(false);
  const [pendingValues, setPendingValues] = useState<ForgotFormData | null>(
    null
  );
  const router = useRouter();
  const form = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof forgotSchema>) {
    const resultAction = await dispatch(handleResetCode(values));
    if (handleResetCode.fulfilled.match(resultAction)) {
      const message: any = resultAction.payload.message;
      setPendingValues(values);
      setShowOTPModal(true);
      toast.success(message);
    } else if (handleResetCode.rejected.match(resultAction)) {
      const message: any = resultAction.payload;
      toast.error(message);
    }
  }

  const handleVerifyOTP = async (otp: string) => {
    if (pendingValues) {
      const resultAction = await dispatch(
        handleVerifyResetCode({ email: pendingValues?.email, otp })
      );
      if (handleVerifyResetCode.fulfilled.match(resultAction)) {
        const { message } = resultAction.payload;
        toast.success(message);
        setShowOTPModal(false);
        setShowResetPassForm(true);
      } else if (handleVerifyResetCode.rejected.match(resultAction)) {
        const message: any = resultAction.payload;
        toast.error(message);
      }
    }
  };

  function handleNavigate() {
    router.push("/auth");
  }

  return (
    <MainLayout>
      <div className="py-10">
        <div className="w-[464px] mx-auto mt-8">
          <p className="font-semibold text-lg mb-4">Quên mật khẩu</p>
          <p className="text-sm mb-6">
            Vui lòng nhập email đã đăng ký tài khoản để lấy lại mật khẩu
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
                  <p>Lấy lại mật khẩu</p>
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
      <OTPModal
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        onVerify={handleVerifyOTP}
      />
      <ResetPassForm
        isOpen={showResetPassForm}
        onClose={() => setShowResetPassForm(false)}
      />
    </MainLayout>
  );
}
