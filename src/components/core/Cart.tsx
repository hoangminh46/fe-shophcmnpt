import { Button } from "@/components/ui/button";
import XIcon from "@/icons/XIcon";
import { toggleCart } from "@/lib/features/appSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function Cart() {
  const cartState = useAppSelector((state) => state.app.toggleCart);
  const dispatch = useAppDispatch();

  const toggleActive = () => {
    dispatch(toggleCart());
  };

  function handleClickCart(e: any) {
    if (e.currentTarget === e.target) {
      dispatch(toggleCart());
    }
  }

  return (
    <div
      className={`left-0 right-0 top-[72px] bg-gray-200 bg-opacity-60 h-screen fixed z-50 w-full transition-opacity duration-300 ease-in-out ${
        cartState
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={(e) => handleClickCart(e)}
    >
      <div
        className={`absolute right-0 bg-white border border-gray-300 transition-transform duration-300 ease-in-out w-1/3 ${
          cartState
            ? "transform translate-x-0"
            : "transform translate-x-[200px]"
        } `}
      >
        <div className="p-5">
          <p className="text-center">Giỏ hàng</p>
          <div
            className="absolute right-[20px] top-[15px] cursor-pointer"
            onClick={toggleActive}
          >
            <XIcon />
          </div>
        </div>
        <div className="p-5 min-h-[300px]">
          <div className="text-center">Giỏ hàng chưa có sản phẩm</div>
        </div>
        <div className="p-5 border-t-1 ">
          <div className="flex justify-between mb-3">
            <div>Thành tiền</div>
            <div className="font-semibold">9999999999</div>
          </div>
          <Button className="block w-full">Tiếp tục mua sắm</Button>
        </div>
      </div>
    </div>
  );
}
