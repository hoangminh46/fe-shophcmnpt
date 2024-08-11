"use client";
import MainLayout from "@/app/layouts/MainLayout";
import HomeBanner from "@/components/core/HomeBanner";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <MainLayout>
      <div className="container">
        <HomeBanner />
      </div>
    </MainLayout>
  );
}
