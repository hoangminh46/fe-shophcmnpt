"use client";
import MainLayout from "@/app/layouts/MainLayout";
import HomeBanner from "@/components/core/HomeBanner";
import ProductBanner from "@/components/core/ProductBanner";
import ProductItem from "@/components/core/ProductItem";
import PromotionBanner from "@/components/core/PromotionBanner";
import { fetchProducts } from "@/lib/features/appSlice";
import { logout } from "@/lib/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const products = useAppSelector((state) => state.app.products);
  const userToken = useAppSelector((state) => state.auth.userToken);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    if (!userToken) {
      dispatch(logout());
      router.push("/auth");
    }
  }, [userToken]);

  return (
    <MainLayout>
      <PromotionBanner />
      <HomeBanner />
      <div className="container">
        <div className="flex items-center my-10">
          <div className="flex items-center">
            <p className="font-semibold text-xl">HÀNG MỚI VỀ</p>
            <div className="bg-black h-px ml-5 w-[140px]"></div>
          </div>
        </div>
        <ProductBanner />
        <div className="flex items-center my-10">
          <div className="flex items-center">
            <p className="font-semibold text-xl">BỘ SƯU TẬP MỚI</p>
            <div className="bg-black h-px ml-5 w-[140px]"></div>
          </div>
        </div>
        <div className="flex flex-wrap gap-y-8">
          {products.map((product: any) => (
            <ProductItem
              key={product.id}
              product={product}
              link={`/products/${product.id}`}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
