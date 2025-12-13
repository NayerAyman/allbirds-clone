import { useParams } from "react-router-dom";
import FilterBar from "../components/menPageComponent/FilterBar";
import Products from "../components/menPageComponent/Products";
import { useState } from "react";
import FilterModal from "../components/ui/FilterModal";
import { menShoes , womenShoes, type Product } from "../../src/data"



const applyFilters = (products: Product[], filters: Filters) => {
  return products.filter(product => {
    // SIZE
    if (
      filters.sizes.length > 0 &&
      !filters.sizes.some(size => product.sizes.includes(size))
    ) {
      return false;
    }

    // COLORS + PRICE + SALE
    const hasValidColor = product.colors.some(color => {
      // SALE
      if (filters.saleOnly && color.salePrice === null) return false;

      const finalPrice = color.salePrice ?? color.price;

      // PRICE
      if (filters.maxPrice && finalPrice > filters.maxPrice) return false;

      // COLOR
      if (
        filters.colors.length > 0 &&
        !filters.colors.includes(color.colorName.toLowerCase())
      ) {
        return false;
      }

      return true;
    });

    return hasValidColor;
  });
};


export type Filters = {
  saleOnly: boolean;
  colors: string[];
  sizes: number[];
  minPrice: number | null; // NEW
  maxPrice: number | null; // EXISTING
};

const MenPage: React.FC = () => {
const [filters, setFilters] = useState<Filters>({
  saleOnly: false,
  colors: [],
  sizes: [],
  minPrice: null,
  maxPrice: null,
});


  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { category } = useParams<{ category: string }>();

  type Category = "Men" | "Women" | "Sale";

  const currentCategory: Category =
    category === "women" ? "Women" : category === "sale" ? "Sale" : "Men";





const baseShoes =
  currentCategory === "Men"
    ? menShoes
    : currentCategory === "Women"
    ? womenShoes
    : [...menShoes, ...womenShoes].filter(
        (shoe) => shoe.colors.some((color) => color.salePrice !== null)
      ); 



    const filteredShoes = applyFilters(baseShoes, filters);

  return (
    <div className="w-full min-h-screen flex bg-orange-50 flex-col items-start py-2 mt-15 justify-start">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 ml-7 mb-5 font-extralight text-xs">
        <a href="/">HOME</a>
        <span> / </span>
        <p>{currentCategory}'s Shoes</p>
      </div>

      {/* Title & Description */}
      <div className="flex flex-col gap-2 items-center justify-center w-full px-4 my-auto h-fit mt-5 md:mb-10">
        <h1 className="text-3xl">{currentCategory}'s Shoes</h1>
        <p className="text-gray-600">
          {currentCategory === "Men"
            ? "Lightweight, supportive, and wildly comfortable, our premium men's shoes make any outing feel effortless."
            : "Lightweight, supportive, and wildly comfortable, our premium women's shoes make any outing feel effortless."}
        </p>
      </div>

      {/* FilterBar & Products */}
      <div className="flex flex-col gap-2 items-center justify-start w-full h-full ">
        {/* FilterBar now reads category from URL internally */}
        <FilterBar onFilterClick={() => setIsFilterOpen(true)} length={filteredShoes.length} />
        {isFilterOpen && (
          <FilterModal
            filters={filters}
            setFilters={setFilters}
            onClose={() => setIsFilterOpen(false)}
          />
        )}
        <Products products={filteredShoes} />
      </div>
    </div>
  );
};

export default MenPage;
