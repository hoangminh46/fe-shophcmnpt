"use client";
import { Input } from "@/components/ui/input";
import MinusIcon from "@/icons/MinusIcon";
import PlusIcon from "@/icons/PlusIcon";
import { useState } from "react";

export default function InputCart() {
  const [value, setValue] = useState(0);

  function handlePlus() {
    if (value < 100) {
      setValue((prev) => prev + 1);
    }
  }

  function handleMinus() {
    if (value > 0) {
      setValue((prev) => prev - 1);
    }
  }

  return (
    <div className="inline-flex h-[30px] border border-[#000] mt-2">
      <div
        className="w-[30px] h-30[px] border-r-1 border-[#000]"
        onClick={handleMinus}
      >
        <MinusIcon />
      </div>
      <Input
        type="text"
        value={value}
        readOnly
        className="text-center w-[100px] h-full border-none outline-none focus:outline-none focus:border-none hover:outline-none hover:border-none active:outline-none active:border-none"
      />
      <div
        className="w-[30px] h-30[px] border-l-1 border-[#000]"
        onClick={handlePlus}
      >
        <PlusIcon />
      </div>
    </div>
  );
}
