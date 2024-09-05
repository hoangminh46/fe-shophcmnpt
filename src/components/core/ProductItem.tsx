import Image from "next/image";

export default function ProductItem() {
  return (
    <div className="w-[350px]">
      <div className="p-3">
        <Image
          src="https://cdn.authentic-shoes.com/wp-content/uploads/2024/02/Giay-Nike-Air-Jordan-4-Retro-Bred-Reimagined-FV5029%E2%80%91006.png"
          alt="Giày Nike Air Jordan 4 Retro"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}
