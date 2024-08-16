import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
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
            className="w-full h-[777px] object-cover"
            src="/images/banner/bn1.webp"
            alt="Logo"
            width={2000}
            height={2000}
            quality={100}
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            className="w-full h-[777px] object-cover"
            src="/images/banner/banner2.webp"
            alt="Logo"
            width={2000}
            height={2000}
            quality={100}
          />
        </CarouselItem>
        <CarouselItem>
          <Image
            className="w-full h-[777px] object-cover"
            src="/images/banner/banner3.webp"
            alt="Logo"
            width={2000}
            height={2000}
            quality={100}
          />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="left-12 w-12 h-12 bg-gray-200 bg-opacity-20 border-none text-white" />
      <CarouselNext className="right-12 w-12 h-12 bg-gray-200 bg-opacity-20 border-none text-white" />
    </Carousel>
  );
}
