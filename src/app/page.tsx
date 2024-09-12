"use client";
import MainLayout from "@/app/layouts/MainLayout";
import HomeBanner from "@/components/core/HomeBanner";
import ProductItem from "@/components/core/ProductItem";
import PromotionBanner from "@/components/core/PromotionBanner";
import { Button } from "@/components/ui/button";
import { fetchProducts } from "@/lib/features/appSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const products = useAppSelector((state) => state.app.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <MainLayout>
      <PromotionBanner />
      <HomeBanner />
      <div className="flex items-center container my-10">
        <div className="flex items-center">
          <p className="font-semibold text-xl">BỘ SƯU TẬP MỚI</p>
          <div className="bg-black h-px ml-5 w-[140px]"></div>
        </div>
      </div>
      <div className="container flex flex-wrap gap-y-8">
        {products.map((product: any) => (
          <ProductItem
            key={product.id}
            product={product}
            link={`/products/${product.id}`}
          />
        ))}
      </div>
    </MainLayout>
  );
}
