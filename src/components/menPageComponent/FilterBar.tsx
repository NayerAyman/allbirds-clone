import { CiCircleChevDown } from "react-icons/ci";
import { FaSliders } from "react-icons/fa6";
import { useParams, useNavigate } from "react-router-dom";



type FilterBarProps = {
  onFilterClick: () => void;
  length:number
};


export default function FilterBar({ onFilterClick ,length }: FilterBarProps) {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  // Determine active category from URL
  const isActive: "Men" | "Women" = category === "women" ? "Women" : "Men";

  function handleSwitch(type: "Men" | "Women") {
    navigate(`/${type.toLowerCase()}`); // update URL
  }

  return (
    <>
      {/* Big screens (md and above) */}
      <div className="hidden md:flex w-[90%] py-2 px-4 rounded-4xl items-center justify-between bg-gray-500/15 mx-auto">
        <div onClick={onFilterClick} className="flex items-center gap-3 text-gray-600 cursor-pointer">
          <FaSliders className="border border-black p-2 rounded-full" size={35} />
          <p className="font-semibold">FILTER</p>
          <span className="text-sm">({length} products)</span>
        </div>
        <div className="flex items-center justify-center gap-3">
          <div className="flex items-center py-1.5 gap-1 border text-sm font-semibold border-black rounded-4xl px-2">
            <button
              onClick={() => handleSwitch("Men")}
              className={`${isActive === "Men" ? "bg-gray-900 text-white" : "text-gray-950"} py-1 px-4 rounded-full`}
            >
              MEN
            </button>
            <button
              onClick={() => handleSwitch("Women")}
              className={`${isActive === "Women" ? "bg-gray-900 text-white" : "text-gray-950"} py-1 px-4 rounded-full`}
            >
              WOMEN
            </button>
          </div>

        </div>
      </div>

      {/* Small screens (below md) */}
      <div className="flex md:hidden w-[70%] gap-1 py-2 px-4 rounded-4xl items-center justify-center mt-4 mx-auto">
        <div  onClick={onFilterClick} className="flex items-center justify-between text-sm border text-gray-900 rounded-4xl px-3 py-1.5 gap-2 flex-1 cursor-pointer">
          <div className="flex items-center gap-1 ">
            <FaSliders size={20} />
            <p className="whitespace-nowrap">FILTER AND SORT</p>
          </div>
          <CiCircleChevDown size={28} />
        </div>
        <div className="flex items-center justify-center py-1.5  border text-sm font-semibold border-black rounded-4xl px-2">
          <button
            onClick={() => handleSwitch("Men")}
            className={`${isActive === "Men" ? "bg-gray-900 text-white" : "text-gray-950"} py-1 px-2 rounded-full`}
          >
            MEN
          </button>
          <button
            onClick={() => handleSwitch("Women")}
            className={`${isActive === "Women" ? "bg-gray-900 text-white" : "text-gray-950"} py-1 px-4 rounded-full`}
          >
            WOMEN
          </button>
        </div>
      </div>
    </>
  );
}
