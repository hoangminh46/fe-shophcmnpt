"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { X } from "lucide-react";

interface OTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (otp: string) => void;
}

export default function OTPModal({ isOpen, onClose, onVerify }: OTPModalProps) {
  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    if (otp && otp.length === 6) {
      onVerify(otp);
    }
  };

  return (
    <Dialog open={isOpen} modal={true}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="relative">
          <DialogTitle className="text-center text-3xl">
            Xác thực OTP
          </DialogTitle>
          <DialogClose
            onClick={() => onClose()}
            className="absolute right-0 top-0 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Đóng</span>
          </DialogClose>
        </DialogHeader>
        <div className="space-y-6">
          <p className="text-sm text-gray-500">
            Vui lòng nhập mã OTP đã được gửi đến email của bạn
          </p>
          <div className="flex items-center justify-center !mt-8">
            <InputOTP
              value={otp}
              onChange={(value) => setOtp(value)}
              maxLength={6}
              containerClassName="group flex items-center has-[:disabled]:opacity-50"
            >
              <InputOTPGroup>
                {Array.from({ length: 6 }).map((_, idx) => (
                  <InputOTPSlot key={idx} index={idx} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button onClick={handleVerify} className="w-full !mt-8">
            Xác nhận
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
