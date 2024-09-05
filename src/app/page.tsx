"use client";
import MainLayout from "@/app/layouts/MainLayout";
import HomeBanner from "@/components/core/HomeBanner";
import ProductItem from "@/components/core/ProductItem";
import PromotionBanner from "@/components/core/PromotionBanner";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
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
      <div className="container">
        <ProductItem />
      </div>
    </MainLayout>
  );
}
