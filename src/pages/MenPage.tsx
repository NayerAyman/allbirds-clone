import { useParams } from "react-router-dom";
import FilterBar from "../components/menPageComponent/FilterBar";
import Products from "../components/menPageComponent/Products";
import { useState, useEffect, useMemo } from "react";
import FilterModal from "../components/ui/FilterModal";
import { getAllProducts } from "../subapase/GetData";

export type ProductColor = {
  color_name: string;
  hex: string;
  price: number;
  sale_price: number | null;
  product_images: { image: string }[];
};

export type Product = {
  id: string;
  name: string;
  sizes: number[];
  gender: "men" | "women";
  product_colors: ProductColor[];
};

export type Filters = {
  saleOnly: boolean;
  colors: string[];
  sizes: number[];
  minPrice: number | null;
  maxPrice: number | null;
};

// Utility to filter products
const applyFilters = (products: Product[], filters: Filters) => {
  return products.filter((product) => {
    if (filters.sizes.length > 0 && !filters.sizes.some((size) => product.sizes.includes(size))) {
      return false;
    }

    const hasValidColor = product.product_colors.some((color) => {
      const finalPrice = color.sale_price ?? color.price;

      if (filters.saleOnly && color.sale_price === null) return false;
      if ((filters.maxPrice && finalPrice > filters.maxPrice) || (filters.minPrice && finalPrice < filters.minPrice)) return false;
      if (filters.colors.length > 0 && !filters.colors.includes(color.color_name.toLowerCase())) return false;

      return true;
    });

    return hasValidColor;
  });
};

const MenPage: React.FC = () => {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [filters, setFilters] = useState<Filters>({
    saleOnly: false,
    colors: [],
    sizes: [],
    minPrice: null,
    maxPrice: null,
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { category } = useParams<{ category: string }>();
  type Category = "men" | "women" | "sale";
  const currentCategory: Category =
    category === "women" ? "women" : category === "sale" ? "sale" : "men";

  // Fetch products once on mount
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      if (data) setProductsData(data);
    };
    fetchProducts();
  }, []);

  // Memoize filtered products to avoid recalculating on every render
  const baseProducts = useMemo(() => {
    if (currentCategory === "men") return productsData.filter(p => p.gender === "men");
    if (currentCategory === "women") return productsData.filter(p => p.gender === "women");
    return productsData.filter(p => p.product_colors.some(c => c.sale_price !== null));
  }, [productsData, currentCategory]);

  const filteredProducts = useMemo(() => applyFilters(baseProducts, filters), [baseProducts, filters]);

  function capitalizeFirstLetter(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
  return (
    <div className="w-full min-h-screen flex bg-orange-50 flex-col items-center justify-start py-5 mt-25">

      {/* Title & Description */}
      <div className="flex flex-col gap-2 items-center justify-center w-full px-4 mt-5 h-fit md:mb-10">
        <h1 className="text-3xl">{capitalizeFirstLetter(currentCategory)}'s Shoes</h1>
        <p className="text-gray-600">
          {currentCategory === "men"
            ? "Lightweight, supportive, and wildly comfortable, our premium men's shoes make any outing feel effortless."
            : "Lightweight, supportive, and wildly comfortable, our premium women's shoes make any outing feel effortless."}
        </p>
      </div>

      {/* FilterBar & Products */}
      <div className="flex flex-col gap-2 items-center justify-start w-full h-full">
        <FilterBar onFilterClick={() => setIsFilterOpen(true)} length={filteredProducts.length} />
        {isFilterOpen && (
          <FilterModal
            filters={filters}
            setFilters={setFilters}
            onClose={() => setIsFilterOpen(false)}
            products={baseProducts}
          />
        )}
        <Products products={filteredProducts} />
      </div>
    </div>
  );
};

export default MenPage;
