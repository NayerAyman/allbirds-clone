import { useState } from "react";
import { IoBagAddOutline } from "react-icons/io5";




// =====================
// TYPES
// =====================
interface Color {
  colorName: string;
  hex: string;
  price: number;
  salePrice: number | null;
  images: string;
}

interface Product {
  id: string;
  name: string;
  sizes: number[];
  colors: Color[];
}

interface ProductsProps {
  products: Product[];
}

// =====================
// PRODUCTS COMPONENT
// =====================
export default function Products({ products }: ProductsProps) {


  return (
    <div className="w-full md:w-[93%] h-fit grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5 p-4">
      {products.map((product) => (
        <ShoeCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// =====================
// SHOE CARD COMPONENT
// =====================
function ShoeCard({ product }: { product: Product }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeColor = product.colors[activeIndex];

  return (
    <div className="bg-white rounded-2xl flex-col items-center justify-center shadow-md hover:scale-105 transition-transform duration-300 p-3">
      {/* IMAGE */}
      <img
        src={activeColor.images || "/placeholder.webp"}
        className="w-full h-40 md:h-50 object-contain mb-2 hover:scale-150 transition-transform duration-500"
        alt={product.name}
      />

      {/* NAME */}
      <h2 className="font-semibold text-sm md:text-base truncate ">{product.name}</h2>

      {/* COLOR NAME */}
      <p className="text-gray-600 text-xs md:text-sm">
        {activeColor.colorName || "Select"}
      </p>

      <div className="flex md:flex-row flex-col-reverse items-center justify-between">
        {/* COLOR CIRCLES */}
        <div className="flex items-center gap-2 mt-3">
          {product.colors.map((c, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-6 h-6 rounded-full border ${
                activeIndex === i ? "ring-2 ring-black" : ""
              }`}
              style={{ backgroundColor: c.hex || "#ddd" }}
            />
          ))}
        </div>

        {/* PRICE */}
        <p className="font-semibold text-red-600 text-sm mt-1">
          {activeColor.salePrice ? (
            <>
              <span className="text-red-600 mr-2">${activeColor.salePrice}</span> 
              <span className="line-through text-gray-500 ">
                ${activeColor.price}
              </span>
            </>
          ) : (
            <>${activeColor.price}</>
          )}
        </p>
      </div>

      {/* SIZES */}
      <div className="md:flex hidden flex-wrap gap-2 mt-4">
        {product.sizes.map((size) => (
          <div
            key={size}
            className="w-8 h-8 flex items-center justify-center rounded-xl border text-xs md:text-sm hover:bg-black hover:text-white transition cursor-pointer"
          >
            {size}
          </div>
        ))}
      </div>

      <div className="md:hidden flex items-center justify-center mt-5">
        <button className=" font-bold text-sm w-full h-fit p-2  flex items-center justify-center gap-1 content-center border-orange-300 border-t">
          <IoBagAddOutline size={18} /> ADD TO CART
        </button>
      </div>
    </div>
  );
}
