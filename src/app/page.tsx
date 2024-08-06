"use client";
import MainLayout from "@/app/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <MainLayout>
      <div>Home page</div>
      <Button asChild>
        <Link href="/checkout">go to checkout</Link>
      </Button>
    </MainLayout>
  );
}
