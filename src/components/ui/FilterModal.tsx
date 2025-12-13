import { useState } from "react";

type Filters = {
  saleOnly: boolean;
  colors: string[];
  sizes: number[];
  minPrice: number | null;
  maxPrice: number | null;
};

type FilterModalProps = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  onClose: () => void;
};

export default function FilterModal({
  filters,
  setFilters,
  onClose,
}: FilterModalProps) {
  // Local state to store changes before applying them
  const [localFilters, setLocalFilters] = useState<Filters>({ ...filters });

  // Helper function to convert color names to hex values
  const colorToHex = (colorName: string) => {
    const map: Record<string, string> = {
      black: "#000000",
      white: "#ffffff",
      gray: "#aeaeae",
      blue: "#161c36",
      red: "#d72c2c",
      creem: "#f1edbd",
      "dark - gray": "#3d3d3d",
      "dark - blue": "#121638",
      orange: "#ea783f",
    };
    return map[colorName.toLowerCase()] ?? "#ddd";
  };

  // Available color options
  const colors: string[] = [
    "black",
    "white",
    "gray",
    "blue",
    "red",
    "creem",
    "dark - gray",
    "dark - blue",
    "orange",
  ];

  // Price range options
  const priceOptions = [
    { label: "Under $50", min: 0, max: 50 },
    { label: "$50 to $100", min: 50, max: 100 },
    { label: "$100 to $150", min: 100, max: 150 },
    { label: "Over $150", min: 150, max: null },
  ];

  // Apply the changes to the global filters
  const handleApply = () => {
    setFilters(localFilters);
    onClose();
  };

  // Handle clearing specific filters
  const handleClearSizes = () => setLocalFilters((f) => ({ ...f, sizes: [] }));
  const handleClearColors = () =>
    setLocalFilters((f) => ({ ...f, colors: [] }));
  const handleClearAll = () =>
    setLocalFilters({
      saleOnly: false,
      colors: [],
      sizes: [],
      minPrice: null,
      maxPrice: null,
    });

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex justify-center items-end md:items-center overflow-hidden"
      onClick={onClose}
    >
      <div
        className="bg-white w-full md:w-[600px] max-h-[90vh] rounded-t-2xl p-6 overflow-hidden md:rounded-2xl md:mt-0"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-1">Filters</h2>

        {/* CLEAR ALL BUTTON */}
        <div className="flex justify-end mb-4">
          <button
            className="text-xs text-red-500 underline"
            onClick={handleClearAll}
          >
            Clear All
          </button>
        </div>

        {/* SALE ONLY FILTER */}
        <label className="flex items-center gap-2 mb-6">
          <input
            type="checkbox"
            checked={localFilters.saleOnly}
            onChange={(e) =>
              setLocalFilters((f) => ({ ...f, saleOnly: e.target.checked }))
            }
          />
          Sale only
        </label>

        {/* PRICE RANGE RADIO BUTTONS */}
        <div className="mb-6">
          <p className="text-sm font-medium mb-2">Price</p>
          <div className="flex flex-col gap-2">
            {/* Any price option */}
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="price"
                checked={
                  localFilters.minPrice === null &&
                  localFilters.maxPrice === null
                }
                onChange={() =>
                  setLocalFilters((f) => ({
                    ...f,
                    minPrice: null,
                    maxPrice: null,
                  }))
                }
              />
              <span>Any</span>
            </label>

            {/* Price ranges */}
            {priceOptions.map((option) => (
              <label key={option.label} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="price"
                  checked={
                    localFilters.minPrice === option.min &&
                    localFilters.maxPrice === option.max
                  }
                  onChange={() =>
                    setLocalFilters((f) => ({
                      ...f,
                      minPrice: option.min,
                      maxPrice: option.max,
                    }))
                  }
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* SIZE FILTER */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium">Sizes</p>
            {localFilters.sizes.length > 0 && (
              <button
                className="text-xs text-red-500 underline"
                onClick={handleClearSizes}
              >
                Clear
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {[39, 40, 41, 42, 43, 44, 45, 46].map((size) => (
              <button
                key={size}
                onClick={() =>
                  setLocalFilters((f) => ({
                    ...f,
                    sizes: f.sizes.includes(size)
                      ? f.sizes.filter((s) => s !== size)
                      : [...f.sizes, size],
                  }))
                }
                className={`px-3 py-1 rounded-full border text-sm ${
                  localFilters.sizes.includes(size)
                    ? "bg-black text-white"
                    : "bg-white"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* COLOR FILTER */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium">Colors</p>
            {localFilters.colors.length > 0 && (
              <button
                className="text-xs text-red-500 underline"
                onClick={handleClearColors}
              >
                Clear
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() =>
                  setLocalFilters((f) => ({
                    ...f,
                    colors: f.colors.includes(color)
                      ? f.colors.filter((c) => c !== color)
                      : [...f.colors, color],
                  }))
                }
                className={`w-9 md:w-12 h-9 md:h-12 rounded-full border flex items-center justify-center ${
                  localFilters.colors.includes(color) ? "ring-2 ring-black" : ""
                }`}
                style={{ backgroundColor: colorToHex(color) }}
              />
            ))}
          </div>
        </div>

        {/* APPLY BUTTON */}
        <button
          onClick={handleApply}
          className="mt-4 w-full bg-black text-white py-3 rounded-full text-lg"
        >
          Apply filters
        </button>
      </div>
    </div>
  );
}
