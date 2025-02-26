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
import { useAppDispatch } from "@/lib/hooks";
import { changePassword } from "@/lib/features/authSlice";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const changePassSchema = z.object({
  currentPassword: z
    .string()
    .min(1, "Mật khẩu còn trống, vui lòng nhập đầy đủ"),
  newPassword: z.string().min(6, "Mật khẩu mới phải trên 6 ký tự"),
  renewPassword: z.string().min(6, "Mật khẩu mới phải trên 6 ký tự"),
});

type ChangePassFormData = z.infer<typeof changePassSchema>;

export default function ChangePassForm() {
  const dispatch = useAppDispatch();
  const route = useRouter();
  const form = useForm<ChangePassFormData>({
    resolver: zodResolver(changePassSchema),
    mode: "onBlur",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      renewPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof changePassSchema>) {
    const resultAction = await dispatch(changePassword({ passData: values }));
    if (changePassword.fulfilled.match(resultAction)) {
      const message: any = resultAction.payload.message;
      toast.success(message);
      route.push("/auth");
    } else if (changePassword.rejected.match(resultAction)) {
      const message: any = resultAction.payload;
      toast.error(message);
    }
  }

  return (
    <Form {...form}>
      <p className="text-sm mb-4">Cập nhật mật khẩu</p>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu hiện tại</FormLabel>
              <FormControl>
                <Input placeholder="********" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu mới</FormLabel>
              <FormControl>
                <Input placeholder="********" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="renewPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nhập lại mật khẩu</FormLabel>
              <FormControl>
                <Input placeholder="********" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="block w-half">
          Đổi mật khẩu
        </Button>
      </form>
    </Form>
  );
}
