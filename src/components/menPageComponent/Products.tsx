import { useState } from "react";
import { IoBagAddOutline } from "react-icons/io5";
import { addToCart } from "../../subapase/SupabaseCart";
import SizesModal from "./SizesModal";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../subapase/SubapaseAPI";

// TYPES
interface Product {
  id: string;
  name: string;
  sizes: number[];
  product_colors: ProductColor[];
}

interface ProductColor {
  color_name: string;
  hex: string;
  price: number;
  sale_price: number | null;
  product_images: { image: string }[];
}

interface ProductsProps {
  products: Product[];
}

interface CartItem {
  product_id: string;
  product_name: string;
  product_image: string;
  color_name: string;
  size: number;
  price: number;
}

export default function Products({ products }: ProductsProps) {
  return (
    <div className="w-full md:w-[93%] h-fit grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5 p-4">
      {products.map((product) => (
        <ShoeCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ShoeCard({ product }: { product: Product }) {
  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const activeColor = product.product_colors[activeColorIndex];
const addProductToCart = async (): Promise<boolean> => {

    // 1️⃣ تحقق من تسجيل الدخول
  const {
    data: { user },
  } = await supabase.auth.getUser();

    if (!user) {
    Swal.fire({
      toast: true,
      icon: "warning",
      title: "You must be logged in to add items to the cart!",
      position: "top-end",
      timer: 2500,
      showConfirmButton: false,
    });
    return false;
  }
  

  if (!selectedSize) {
    Swal.fire({
      toast: true,
      icon: "warning",
      title: "Please select a size!",
      position: "top-end",
      timer: 1500,
      showConfirmButton: false,
    });
    return false;
  }

  try {
    // 1️⃣ Optimistic cart count update
    queryClient.setQueryData<number>(["cartCount"], (old = 0) => old + 1);

    // 2️⃣ Optimistic cart items update (UI updates instantly)
    queryClient.setQueryData<CartItem[]>(["cartItems"], (old = []) => [
      ...(old || []),
      {
        product_id: product.id,
        product_name: product.name,
        product_image: activeColor.product_images[0]?.image || "/placeholder.webp",
        color_name: activeColor.color_name,
        size: selectedSize!,
        price: activeColor.sale_price ?? activeColor.price,
      },
    ]);

    // 3️⃣ Send request to Supabase
    await addToCart({
      product_id: product.id,
      product_name: product.name,
      product_image: activeColor.product_images[0]?.image || "/placeholder.webp",
      color_name: activeColor.color_name,
      size: selectedSize!,
      price: activeColor.sale_price ?? activeColor.price,
    });

    // 4️⃣ Invalidate cache to refetch and sync with server
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    queryClient.invalidateQueries(["cartItems"]);

    Swal.fire({
      toast: true,
      icon: "success",
      title: "Added to Cart!",
      position: "top-end",
      timer: 1500,
      showConfirmButton: false,
    });

    return true;
  } catch (err) {
    console.error(err);

    // Revert optimistic updates if adding fails
    queryClient.setQueryData<number>(["cartCount"], (old = 1) => Math.max(0, old - 1));
    queryClient.setQueryData<CartItem[]>(["cartItems"], (old = []) =>
      (old || []).filter((item) => item.product_id !== product.id || item.size !== selectedSize)
    );

    Swal.fire({
      toast: true,
      icon: "error",
      title: "Failed to add to cart!",
      position: "top-end",
      timer: 1500,
      showConfirmButton: false,
    });

    return false;
  }
};


  const handleAddToCart = async () => {
    const success = await addProductToCart();
    if (success) setIsModalOpen(false);
  };

  const handleDesktopClick = async () => {
    if (window.innerWidth < 768) return;

    if (!selectedSize) {
      Swal.fire({
        toast: true,
        icon: "warning",
        title: "Please select a size first!",
        position: "top-end",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    const result = await Swal.fire({
      title: "Do you want to add this to the cart?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, add it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      await addProductToCart();
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl flex-col items-center justify-center shadow-md hover:scale-105 transition-transform duration-300 p-3">
        <img
          src={activeColor.product_images[0]?.image || "/placeholder.webp"}
          className="w-full h-40 md:h-50 object-contain mb-2 hover:scale-150 transition-transform duration-500 cursor-pointer"
          alt={product.name}
          onClick={handleDesktopClick}
        />
        <h2 className="font-semibold text-sm md:text-base truncate">
          {product.name}
        </h2>
        <p className="text-gray-600 text-xs md:text-sm">
          {activeColor.color_name}
        </p>

        <div className="flex items-center gap-2 mt-3">
          {product.product_colors.map((c, i) => (
            <button
              key={i}
              onClick={() => setActiveColorIndex(i)}
              className={`w-6 h-6 rounded-full border ${
                activeColorIndex === i ? "ring-2 ring-black" : ""
              }`}
              style={{ backgroundColor: c.hex || "#ddd" }}
            />
          ))}
        </div>

        <p className="font-semibold text-red-600 text-sm mt-1">
          {activeColor.sale_price ? (
            <>
              <span className="text-red-600 mr-2">
                ${activeColor.sale_price}
              </span>
              <span className="line-through text-gray-500">
                ${activeColor.price}
              </span>
            </>
          ) : (
            <>${activeColor.price}</>
          )}
        </p>

        <div className="md:flex hidden flex-wrap gap-2 mt-4">
          {product.sizes.map((size) => (
            <div
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-8 h-8 flex items-center justify-center rounded-xl border text-xs md:text-sm cursor-pointer ${
                selectedSize === size ? "bg-black text-white" : ""
              } hover:bg-black hover:text-white transition`}
            >
              {size}
            </div>
          ))}
        </div>

        <div className="md:hidden flex items-center justify-center mt-5">
          <button
            onClick={() => setIsModalOpen(true)}
            className="font-bold text-sm w-full h-fit p-2 flex items-center justify-center gap-1 content-center border-orange-300 border-t"
          >
            <IoBagAddOutline size={18} /> ADD TO CART
          </button>
        </div>
      </div>

      <SizesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productColors={product.product_colors.map((c) => ({
          color_name: c.color_name,
          hex: c.hex,
        }))}
        sizes={product.sizes}
        activeColorIndex={activeColorIndex}
        selectedSize={selectedSize}
        setActiveColorIndex={setActiveColorIndex}
        setSelectedSize={setSelectedSize}
        onAddToCart={handleAddToCart}
      />
    </>
  );
}
