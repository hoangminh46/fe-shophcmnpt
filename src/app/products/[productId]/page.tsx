"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchProductDetail } from "@/lib/features/appSlice";
import { useParams } from "next/navigation";
import MainLayout from "@/app/layouts/MainLayout";
import NotFound from "@/app/not-found";
import Image from "next/image";
import HeartIcon from "@/icons/HeartIcon";
import InputCart from "@/components/core/InputCart";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

export default function ProductDetail() {
  const product = useAppSelector((state) => state.app.product);
  const dispatch = useAppDispatch();

  const { productId } = useParams<{ productId: string }>();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(null);

  function handlePlus() {
    if (quantity < 100) {
      setQuantity((prev) => prev + 1);
    }
  }

  function handleMinus() {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
  }

  function handleAddToCart() {
    const data = {
      id: uuidv4(),
      productID: product?.id,
      name: product?.name,
      thumbnail: product?.thumbnail,
      oldPrice: product?.oldPrice,
      salePrice: product?.salePrice,
      size,
      quantity,
      total: product?.salePrice * quantity,
    };
    if (size) {
      console.log(data);
    } else {
      toast.warning("Bạn chưa chọn size");
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await dispatch(fetchProductDetail(productId)).unwrap();
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch, productId]);

  if (loading) {
    return;
  }

  if (error) {
    return <NotFound />;
  }

  return (
    <MainLayout>
      <div className="container mt-12 w-[1240px] mx-auto mb-28">
        <div className="flex gap-10 flex-wrap justify-between">
          <div className="bg-[#E1DDD4] flex items-end justify-center w-[45%] h-[450px] border border-[#f0eeee] relative">
            <Image
              src={product?.thumbnail}
              width={500}
              height={500}
              alt="product-image"
              className="mb-12 w-4/5"
            />
            <div className="absolute top-2 right-2 cursor-pointer">
              <HeartIcon />
            </div>
          </div>
          <div className="w-[45%]">
            <p className="text-[40px] font-semibold mb-2">{product?.name}</p>
            <p className="text-[32px] font-medium mb-2">{product?.category}</p>
            <div className="flex gap-3">
              <p className="text-[36px] font-medium">{product?.salePrice}</p>
              <p className="text-[36px] font-medium line-through text-[#757575]">
                {product?.oldPrice}
              </p>
            </div>
            <div className="mt-4">
              <p>Kích thước</p>
              <div className="flex gap-4 mt-2">
                {product?.size?.map((item: any) => (
                  <div className="h-[26px] w-[26px]" key={item}>
                    <input
                      type="radio"
                      name="size"
                      id={item}
                      value={item}
                      className="hidden input-size"
                      onChange={() => setSize(item)}
                    />
                    <label
                      htmlFor={item} // Sử dụng item làm giá trị cho htmlFor
                      className="border border-white rounded-full shadow-[0_0_0_.2rem_rgba(204,204,204,1)] cursor-pointer inline-block text-[14px] h-full text-center w-full content-center"
                    >
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <p>Số lượng</p>
              <InputCart
                clickMinus={handleMinus}
                clickAdd={handlePlus}
                inputValue={quantity}
              />
            </div>
            <Button className="w-full mt-4" onClick={handleAddToCart}>
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
        <div></div>
      </div>
    </MainLayout>
  );
}
