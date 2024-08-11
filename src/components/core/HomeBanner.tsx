import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

export default function HomeBanner() {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
    >
      <CarouselContent>
        <CarouselItem>
          <Image
            className="w-full h-[777px]"
            src="/images/banner/banner2.jpg"
            alt="Logo"
            width={2000}
            height={2000}
            quality={100}
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            className="w-full h-[777px]"
            src="/images/banner/banner4.jpg"
            alt="Logo"
            width={2000}
            height={2000}
            quality={100}
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            className="w-full h-[777px]"
            src="/images/banner/banner3.webp"
            alt="Logo"
            width={2000}
            height={2000}
            quality={100}
          />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
