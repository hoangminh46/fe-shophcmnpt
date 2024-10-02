import ProductItem from "@/components/core/ProductItem";
import BackIcon from "@/icons/BackIcon";
import { toggleSearch } from "@/lib/features/appSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useState } from "react";

export default function Search() {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useAppDispatch();
  const showSearch = useAppSelector((state) => state.app.toggleSearch);
  const products = useAppSelector((state) => state.app.products);

  const searchValueRegex = searchValue.replace(new RegExp("\\\\", "g"), "\\\\");

  const searchProducts = products.filter((item: any) => {
    return item.name.toLowerCase().match(searchValueRegex.trim().toLowerCase());
  });

  const handleClick = () => {
    dispatch(toggleSearch());
  };

  const handleSearchValue = (e: any) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) {
      setSearchValue(searchValue);
    }
  };

  return (
    <div
      className={`bg-white fixed inset-0 h-auto transition duration-400 ease-in-out z-50 ${
        showSearch
          ? "transform translate-y-0 opacity-100 pointer-events-auto"
          : "transform translate-y-[-1500px] opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`flex items-center justify-center gap-5 h-[100px] my-5 w-full`}
      >
        <div className="flex items-center cursor-pointer" onClick={handleClick}>
          <BackIcon />
        </div>
        <input
          type="text"
          name=""
          id=""
          className="border-0 border-b border-gray-300 h-[40px] outline-none px-2.5 w-[60%]"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchValue}
          onChange={handleSearchValue}
        />
      </div>
      <div className="text-[2.4rem] mb-5 text-center">
        {searchValue ? `Đã tìm thấy ${searchProducts.length} sản phẩm` : ""}
      </div>
      <div className="flex flex-wrap gap-y-10 h-[450px] mx-[50px] mb-5 overflow-auto">
        {searchValue &&
          searchProducts.map((product: any) => (
            <ProductItem
              key={product.id}
              product={product}
              link={`/products/${product.id}`}
              closeSearch={true}
            />
          ))}
      </div>
    </div>
  );
}
