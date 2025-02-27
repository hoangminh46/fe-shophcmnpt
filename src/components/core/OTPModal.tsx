"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useState } from "react";

interface OTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (otp: string) => void;
}

export default function OTPModal({ isOpen, onClose, onVerify }: OTPModalProps) {
  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    onVerify(otp);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Xác thực OTP</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Vui lòng nhập mã OTP đã được gửi đến email của bạn
          </p>
          <div className="flex items-center justify-center">
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
          <Button onClick={handleVerify} className="w-full">
            Xác nhận
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
