"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchProductDetail } from "@/lib/features/appSlice";
import { useParams } from "next/navigation";
import MainLayout from "@/app/layouts/MainLayout";
import NotFound from "@/app/not-found";
import Image from "next/image";
import HeartIcon from "@/icons/HeartIcon";
import InputCart from "@/components/core/InputCart";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { addProduct } from "@/services/appService";
import { NumericFormat } from "react-number-format";

export default function ProductDetail() {
  const product = useAppSelector((state) => state.app.product);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const { productId } = useParams<{ productId: string }>();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(null);
  const [showDesc, setShowDesc] = useState(false);

  function handlePlus() {
    if (quantity < 100) {
      setQuantity((prev) => prev + 1);
    }
  }

  function handleMinus() {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
  }

  function handleAddToCart() {
    const data = {
      id: uuidv4(),
      userID: user?.id,
      productID: product?.id,
      name: product?.name,
      thumbnail: product?.thumbnail,
      oldPrice: product?.oldPrice,
      salePrice: product?.salePrice,
      size,
      quantity,
      total: product?.salePrice * quantity,
    };
    if (size && user) {
      addProduct(data);
      toast.success(`Thêm sản phẩm ${product?.name} x${quantity}`);
    } else {
      toast.warning("Bạn chưa chọn size");
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await dispatch(fetchProductDetail(productId)).unwrap();
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch, productId]);

  if (loading) {
    return;
  }

  if (error) {
    return <NotFound />;
  }

  return (
    <MainLayout>
      <div className="container mt-12 w-[1240px] mx-auto mb-28">
        <div className="flex gap-10 flex-wrap justify-between">
          <div className="bg-[#ffffff] flex items-end justify-center w-[45%] h-[450px] border border-[#f0eeee] shadow-sm relative">
            <Image
              src={product?.thumbnail}
              width={500}
              height={500}
              alt="product-image"
              className="mb-12 w-4/5"
            />
            <div className="absolute top-2 right-2 cursor-pointer">
              <HeartIcon />
            </div>
          </div>
          <div className="w-[45%]">
            <p className="text-[40px] font-semibold mb-2">{product?.name}</p>
            <p className="text-[32px] font-medium mb-2">{product?.category}</p>
            <div className="flex gap-3">
              <p className="text-[36px] font-medium">
                <NumericFormat
                  type="text"
                  value={product?.salePrice}
                  displayType={"text"}
                  thousandsGroupStyle="thousand"
                  thousandSeparator=","
                />
              </p>
              <p className="text-[36px] font-medium line-through text-[#757575]">
                <NumericFormat
                  type="text"
                  value={product?.oldPrice}
                  displayType={"text"}
                  thousandsGroupStyle="thousand"
                  thousandSeparator=","
                />
              </p>
            </div>
            <div className="mt-4">
              <p>Kích thước</p>
              <div className="flex gap-4 mt-2">
                {product?.size?.map((item: any) => (
                  <div className="h-[26px] w-[26px]" key={item}>
                    <input
                      type="radio"
                      name="size"
                      id={item}
                      value={item}
                      className="hidden input-size"
                      onChange={() => setSize(item)}
                    />
                    <label
                      htmlFor={item} // Sử dụng item làm giá trị cho htmlFor
                      className="border border-white rounded-full shadow-[0_0_0_.2rem_rgba(204,204,204,1)] cursor-pointer inline-block text-[14px] h-full text-center w-full content-center"
                    >
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <p>Số lượng</p>
              <InputCart
                clickMinus={handleMinus}
                clickAdd={handlePlus}
                inputValue={quantity}
              />
            </div>
            <Button className="w-full mt-4" onClick={handleAddToCart}>
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
        <div className="w-[50%] flex flex-col items-center">
          <div
            className={`text-justify mt-10 ${
              !showDesc && "max-h-[480px] overflow-hidden"
            }`}
          >
            <h3 className="font-semibold text-lg mb-4">CHI TIẾT SẢN PHẨM</h3>
            <h4>Tên sản phẩm: {product?.name}</h4>
            <p>---</p>
            <h4 className="font-semibold my-2">✨ THÔNG TIN SẢN PHẨM</h4>
            <div>
              <p>
                Kích cỡ:{" "}
                {product?.size?.map((item: any) => (
                  <span key={item}>{item} </span>
                ))}
              </p>
              <p>Chất liệu: vải bamboo (đi thoáng mát và đế không nhăn)</p>
              <p>Xuất xứ: Việt Nam</p>
            </div>
            <h4 className="font-semibold my-2">✨ QUI ĐỊNH ĐỔI HÀNG KHI MUA</h4>
            <div>
              <p>
                - Mỗi hoá đơn chỉ được đổi một lần. Bạn có thể đổi hàng trong 14
                ngày kể từ ngày mua hàng
              </p>
              <p>
                - Mặt hàng phải ở trong tình trạng ban đầu, còn nguyên tem mác,
                chưa qua sử dụng, chưa giặt giũ và có hoá đơn tương ứng
              </p>
              <p>
                - Bạn vui lòng giữ lại hoá đơn để được đổi hàng. Bạn có thể xuất
                trình hóa đơn mua hàng dưới dạng giấy in hoặc định dạng điện tử
                trên điện thoại di động của bạn
              </p>
              <p>
                - AUTHENTIC SHOES không áp dụng trả hàng - hoàn tiền dưới mọi
                hình thức (cả trong trường hợp hoá đơn đã mua có giá trị cao hơn
                hoá đơn đổi)
              </p>
              <p>
                - Với các sản phẩm giảm dưới 30%, AUTHENTIC SHOES sẽ hỗ trợ đổi
                hàng và số lượng sản phẩm đổi nhiều hơn sản phẩm trả, miễn tổng
                hoá đơn đổi bằng hoặc lớn hơn. Trong trường hợp hoá đơn đổi cao
                hơn, bạn vui lòng bù thêm phần chênh lệch.
              </p>
              <p>
                - Với các sản phẩm giảm dưới 30%, AUTHENTIC SHOES sẽ hỗ trợ đổi
                hàng và số lượng sản phẩm đổi nhiều hơn sản phẩm trả, miễn tổng
                hoá đơn đổi bằng hoặc lớn hơn. Trong trường hợp hoá đơn đổi cao
                hơn, bạn vui lòng bù thêm phần chênh lệch.
              </p>
              <p>
                - Với các sản phẩm giảm trên 30% và sản phẩm phụ kiện, AUTHENTIC
                SHOES sẽ không hỗ trợ đổi hàng
              </p>
              <p>- Quà tặng không được đổi hoặc qui ra tiền, voucher.</p>
            </div>
            <h4 className="font-semibold my-2">
              ✨ ĐẶC QUYỀN KHI MUA ĐỒ CỦA AUTHENTIC SHOES:
            </h4>
            <div>
              <p>
                - Sản phẩm đúng với hình ảnh, thậm chí đẹp hơn trên hình, cả nam
                và nữ sử dụng đều phù hợp.
              </p>
              <p>
                - Bao bì nylon trắng đục có thể thấy được sản phẩm bên trong,
                tái chế chống mưa và hạn chế các tác động vật lý
              </p>
              <p>
                - Thiệp cám ơn, Card shop, hoá đơn mua hàng tiêu chuẩn chuyên
                nghiệp
              </p>
            </div>
            <h4 className="font-semibold my-2">
              ✨ NHỮNG ĐIỀU LƯU Ý KHI BẢO QUẢN GIÀY:
            </h4>
            <div>
              <p>
                - Không để giày ở các nơi ẩm và nên cất ngay sau khi sử dụng để
                tránh ẩm mốc
              </p>
              <p>
                - Không đổ trực tiếp bột giặt lên quần giày khi giặt để tránh áo
                bị phai và loang màu
              </p>
            </div>
          </div>
          <Button
            onClick={() => setShowDesc((prev) => !prev)}
            className="mt-4 items-center w-[120px] mx-auto"
          >
            {showDesc ? "Rút gọn" : "Xem thêm"}
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
