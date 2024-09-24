"use client";
import { Input } from "@/components/ui/input";
import MinusIcon from "@/icons/MinusIcon";
import PlusIcon from "@/icons/PlusIcon";

interface IPropsInputCard {
  clickMinus: () => void,
  clickAdd: () => void,
  inputValue: any
}

export default function InputCart({clickMinus, clickAdd, inputValue}: IPropsInputCard) {
  return (
    <div className="inline-flex h-[30px] border border-[#000] mt-2">
      <div
        className="w-[30px] h-30[px] border-r-1 border-[#000] cursor-pointer"
        onClick={clickMinus}
      >
        <MinusIcon />
      </div>
      <Input
        type="text"
        value={inputValue}
        readOnly
        className="text-center w-[100px] h-full border-none outline-none focus:outline-none focus:border-none hover:outline-none hover:border-none active:outline-none active:border-none"
      />
      <div
        className="w-[30px] h-30[px] border-l-1 border-[#000] cursor-pointer"
        onClick={clickAdd}
      >
        <PlusIcon />
      </div>
    </div>
  );
}
