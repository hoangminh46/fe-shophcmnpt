"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { handleResetPassword } from "@/lib/features/authSlice";
import { toast } from "sonner";

interface ResetPassFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const changePassSchema = z.object({
  currentPassword: z
    .string()
    .min(1, "Mật khẩu còn trống, vui lòng nhập đầy đủ"),
  newPassword: z.string().min(6, "Mật khẩu mới phải trên 6 ký tự"),
  renewPassword: z.string().min(6, "Mật khẩu mới phải trên 6 ký tự"),
});

type ChangePassFormData = z.infer<typeof changePassSchema>;

export default function ResetPassForm({ isOpen, onClose }: ResetPassFormProps) {
  const dispatch = useAppDispatch();
  const form = useForm<ChangePassFormData>({
    resolver: zodResolver(changePassSchema),
    mode: "onBlur",
    defaultValues: {
      newPassword: "",
      renewPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof changePassSchema>) {
    const resultAction = await dispatch(
      handleResetPassword({ email: "test", newPassword: values.newPassword })
    );
    if (handleResetPassword.fulfilled.match(resultAction)) {
      const message: any = resultAction.payload.message;
      toast.success(message);
    } else if (handleResetPassword.rejected.match(resultAction)) {
      const message: any = resultAction.payload;
      toast.error(message);
    }
  }

  return (
    <Dialog open={isOpen} modal={true}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="relative">
          <DialogTitle className="text-center text-3xl">
            Xác thực mật khẩu mới
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <p className="text-sm text-gray-500 text-center">
            Vui lòng nhập mật khẩu mới
          </p>
          <div className="flex items-center justify-center !mt-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 w-11/12 mx-auto"
              >
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mật khẩu mới</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="********"
                          {...field}
                          type="password"
                        />
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
                        <Input
                          placeholder="********"
                          {...field}
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="block w-2/3 mx-auto">
                  Đổi mật khẩu
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
