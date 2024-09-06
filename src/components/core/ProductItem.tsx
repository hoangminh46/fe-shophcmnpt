import Image from "next/image";

interface ProductProps {
  product: any;
}

export default function ProductItem({ product }: ProductProps) {
  return (
    <div className="w-[350px]">
      <div className="p-3">
        <h1>{product.name}</h1>
        <Image
          src="https://drive.usercontent.google.com/download?id=117HUkJcGQRGQv0Y1fwpP79GdTYvsXAAl&export=view&authuser=0"
          alt="Giày Nike Air Jordan 4 Retro"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}
