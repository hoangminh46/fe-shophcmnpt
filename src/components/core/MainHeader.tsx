import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function MainHeader() {
  return (
    <header className="border-b-1 border-l-neutral-700 h-4.5">
      <div className="container flex items-center h-full">
        <div className="flex items-center gap-10">
          <Image
            src="/images/logo.webp"
            alt="Logo"
            width={150}
            height={60}
            quality={70}
          />
          <div className="flex gap-8">
            <DropdownMenu open={false}>
              <DropdownMenuTrigger className="outline-none">
                Thương Hiệu
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Adidas</DropdownMenuItem>
                <DropdownMenuItem>Nike</DropdownMenuItem>
                <DropdownMenuItem>MLB</DropdownMenuItem>
                <DropdownMenuItem>New Balance</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                Danh mục
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Giày thể thao</DropdownMenuItem>
                <DropdownMenuItem>Giày thời trang</DropdownMenuItem>
                <DropdownMenuItem>Giày chạy bộ</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
