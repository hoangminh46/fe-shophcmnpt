import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function PromotionBanner() {
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
        <CarouselItem className="text-center bg-black text-white py-1 text-sm font-medium">
          Freeship cho đơn hàng từ 500.000 vnđ
        </CarouselItem>
        <CarouselItem className="text-center bg-black text-white py-1 text-sm font-medium">
          Bảo hành giày toàn quốc
        </CarouselItem>
        <CarouselItem className="text-center bg-black text-white py-1 text-sm font-medium">
          Sản phẩm luôn được cập nhật
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
