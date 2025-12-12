import { useParams } from "react-router-dom";
import FilterBar from "../components/menPageComponent/FilterBar";
import Products from "../components/menPageComponent/Products";

const MenPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const currentCategory: "Men" | "Women" = category === "women" ? "Women" : "Men";

  return (
    <div className="w-full h-full flex bg-orange-50 flex-col items-start py-20 justify-center overflow-auto">
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
      <div className="flex flex-col gap-2 items-center justify-start w-full h-dvh mt-5 mb-10">
        {/* FilterBar now reads category from URL internally */}
        <FilterBar />
        <Products category={currentCategory} />
      </div>
    </div>
  );
};

export default MenPage;
