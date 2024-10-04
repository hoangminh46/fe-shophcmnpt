import HeartIcon from "@/icons/HeartIcon";
import { toggleSearch } from "@/lib/features/appSlice";
import { useAppDispatch } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";

interface ProductProps {
  product: any;
  link: any;
  closeSearch?: any;
  slide?: any;
}

export default function ProductItem({
  product,
  link,
  closeSearch,
  slide,
}: ProductProps) {
  const dispatch = useAppDispatch();

  function handleCloseSearch() {
    if (closeSearch) {
      dispatch(toggleSearch());
    }
  }

  return (
    <div className={` ${!slide ? "max-w-[25%] basis-[25%] px-1" : ""}`}>
      <div className="p-2">
        <Link
          href={link}
          className="bg-[#E1DDD4] flex items-end justify-center h-[350px] border border-[#f0eeee] relative"
          onClick={handleCloseSearch}
        >
          <Image
            src="https://drive.usercontent.google.com/download?id=117HUkJcGQRGQv0Y1fwpP79GdTYvsXAAl&export=view&authuser=0"
            alt="Giày Nike Air Jordan 4 Retro"
            width={500}
            height={500}
            className="mb-12 w-full max-w-[250px]"
          />
          <div className="absolute top-2 right-2 cursor-pointer">
            <HeartIcon />
          </div>
        </Link>
        <div className="font-medium mt-2 underline">{product.category}</div>
        <Link
          href={link}
          className="text-lg font-medium"
          onClick={handleCloseSearch}
        >
          {product.name}
        </Link>
        <div className="flex gap-3">
          <div className="text-lg font-medium text-[#C72020]">
            {product.salePrice}đ
          </div>
          <div className="text-lg line-through text-[#757575]">
            {product.oldPrice}đ
          </div>
        </div>
      </div>
    </div>
  );
}
