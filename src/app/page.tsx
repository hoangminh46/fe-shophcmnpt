"use client";
import MainLayout from "@/app/layouts/MainLayout";
import HomeBanner from "@/components/core/HomeBanner";
import PromotionBanner from "@/components/core/PromotionBanner";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <MainLayout>
      <PromotionBanner />
      <HomeBanner />
    </MainLayout>
  );
}
