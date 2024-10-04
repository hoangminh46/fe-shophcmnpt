"use client";
import ProductItem from "@/components/core/ProductItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useAppSelector } from "@/lib/hooks";
import Autoplay from "embla-carousel-autoplay";

export default function ProductBanner() {
  const products = useAppSelector((state) => state.app.products);
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 2500,
        }),
      ]}
    >
      <CarouselContent>
        {products.map((product: any) => (
          <CarouselItem
            className="text-center bg-black text-white py-1 text-sm font-medium basis-1/4"
            key={product.id}
          >
            <ProductItem
              key={product.id}
              product={product}
              link={`/products/${product.id}`}
              slide={true}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
