"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchProductDetail } from "@/lib/features/appSlice";
import { useParams } from "next/navigation";
import MainLayout from "@/app/layouts/MainLayout";
import NotFound from "@/app/not-found";
import Image from "next/image";
import HeartIcon from "@/icons/HeartIcon";

export default function ProductDetail() {
  const product = useAppSelector((state) => state.app.product);
  const dispatch = useAppDispatch();

  const { productId } = useParams<{ productId: string }>();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
          {/* <h1>{product?.name}</h1>
          <p>{product?.brand}</p>
          <p>Price: ${product?.oldPrice}</p> */}
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
                    />
                    <label
                      htmlFor={item} // Sử dụng item làm giá trị cho htmlFor
                      className="border border-white rounded-full shadow-[0_0_0_.2rem_rgba(204,204,204,1)] cursor-pointer inline-block text-[14px] h-full text-center w-full"
                    >
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </MainLayout>
  );
}
