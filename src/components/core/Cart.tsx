import InputCart from "@/components/core/InputCart";
import { Button } from "@/components/ui/button";
import XIcon from "@/icons/XIcon";
import { toggleCart } from "@/lib/features/appSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";

export default function Cart({ cartProducts }: { cartProducts: any }) {
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
        className={`absolute right-0 bg-white border border-gray-300 transition-transform duration-300 ease-in-out w-1/4 ${
          cartState
            ? "transform translate-x-0"
            : "transform translate-x-[200px]"
        } `}
      >
        <div className="p-5 border-b-1">
          <p className="text-center">Giỏ hàng</p>
          <div
            className="absolute right-[20px] top-[15px] cursor-pointer"
            onClick={toggleActive}
          >
            <XIcon />
          </div>
        </div>
        <div className="min-h-[300px] max-h-[330px] flex flex-col overflow-auto">
          {cartProducts?.lenght < 1 ? (
            <div className="p-5 text-center">Giỏ hàng chưa có sản phẩm</div>
          ) : (
            cartProducts?.items?.map((item: any) => (
              <div key={item?.id} className="flex gap-x-3 p-5 border-b-1">
                <div className="bg-[#E1DDD4] max-w-[180px] p-3 flex items-end">
                  <Image
                    src={item?.thumbnail}
                    alt=""
                    width={1000}
                    height={1000}
                    className="w-full mb-3"
                  />
                </div>
                <div className="min-w-[300px]">
                  <div className="font-semibold flex justify-between items-center">
                    <div>{item?.name}</div>
                    <div className="cursor-pointer">
                      <XIcon />
                    </div>
                  </div>
                  <div className="flex gap-x-2">
                    <div className="text-[#c50c0c] font-medium">
                      {item?.salePrice}
                    </div>
                    <div className="line-through">{item?.oldPrice}</div>
                  </div>
                  <div className="flex items-center">
                    <div className="min-w-[80px]">Số lượng:</div>
                    <InputCart inputValue={item?.quantity} />
                  </div>
                  <div className="flex">
                    <div className="min-w-[80px]">Size:</div>
                    <div>{item?.size}</div>
                  </div>
                  <div className="flex">
                    <div className="min-w-[80px]">Tổng:</div>
                    <div>{item?.subTotal}</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-5 border-t-1 ">
          <div className="flex justify-between mb-3">
            <div>Thành tiền</div>
            <div className="font-semibold">{cartProducts?.total || 0}</div>
          </div>
          <Button className="block w-full">Tiếp tục mua sắm</Button>
        </div>
      </div>
    </div>
  );
}
