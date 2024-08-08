"use client";
import MainLayout from "@/app/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  return (
    <MainLayout>
      <div className="container">
        <Carousel>
          <CarouselContent>
            <CarouselItem>123</CarouselItem>
            <CarouselItem>456</CarouselItem>
            <CarouselItem>789</CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
      <div>Home page</div>
      <Button asChild>
        <Link href="/checkout">go to checkout</Link>
      </Button>
    </MainLayout>
  );
}
