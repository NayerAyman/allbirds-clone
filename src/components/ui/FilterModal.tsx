import { useState, useEffect } from "react";
import type { Filters, Product } from "../../pages/MenPage";

type FilterModalProps = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  onClose: () => void;
  products: Product[];
};

export default function FilterModal({ filters, setFilters, onClose, products }: FilterModalProps) {
  const [localFilters, setLocalFilters] = useState<Filters>({ ...filters });
  const [availableColors, setAvailableColors] = useState<string[]>([]);
  const [availableSizes, setAvailableSizes] = useState<number[]>([]);

  // Compute available colors and sizes from products safely
  useEffect(() => {
    const colorsSet = new Set<string>();
    const sizesSet = new Set<number>();

    products.forEach(product => {
      product.product_colors.forEach(c => colorsSet.add(c.color_name.toLowerCase()));
      product.sizes.forEach(s => sizesSet.add(s));
    });

    // Update state once asynchronously to avoid React warnings
    const colorsArray = Array.from(colorsSet);
    const sizesArray = Array.from(sizesSet).sort((a, b) => a - b);

    // Wrap in microtask to avoid synchronous setState inside effect
    Promise.resolve().then(() => {
      setAvailableColors(colorsArray);
      setAvailableSizes(sizesArray);
    });
  }, [products]);

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

  const priceOptions = [
    { label: "Under $50", min: 0, max: 50 },
    { label: "$50 to $100", min: 50, max: 100 },
    { label: "$100 to $150", min: 100, max: 150 },
    { label: "Over $150", min: 150, max: null },
  ];

  const handleApply = () => { setFilters(localFilters); onClose(); };
  const handleClearSizes = () => setLocalFilters(f => ({ ...f, sizes: [] }));
  const handleClearColors = () => setLocalFilters(f => ({ ...f, colors: [] }));
  const handleClearAll = () => setLocalFilters({ saleOnly: false, colors: [], sizes: [], minPrice: null, maxPrice: null });

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-end md:items-center" onClick={onClose}>
      <div className="bg-white w-full md:w-[600px] max-h-[90vh] rounded-t-2xl p-6 overflow-auto md:rounded-2xl" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-semibold mb-1">Filters</h2>
        <div className="flex justify-end mb-4">
          <button className="text-xs text-red-500 underline" onClick={handleClearAll}>Clear All</button>
        </div>

        {/* SALE ONLY */}
        <label className="flex items-center gap-2 mb-6">
          <input type="checkbox" checked={localFilters.saleOnly} onChange={e => setLocalFilters(f => ({ ...f, saleOnly: e.target.checked }))}/>
          Sale only
        </label>

        {/* PRICE */}
        <div className="mb-6">
          <p className="text-sm font-medium mb-2">Price</p>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input type="radio" name="price" checked={localFilters.minPrice===null && localFilters.maxPrice===null} 
                onChange={() => setLocalFilters(f => ({ ...f, minPrice: null, maxPrice: null }))}/>
              <span>Any</span>
            </label>
            {priceOptions.map(opt => (
              <label key={opt.label} className="flex items-center gap-2">
                <input type="radio" name="price" checked={localFilters.minPrice===opt.min && localFilters.maxPrice===opt.max} 
                  onChange={() => setLocalFilters(f => ({ ...f, minPrice: opt.min, maxPrice: opt.max }))}/>
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* SIZES */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium">Sizes</p>
            {localFilters.sizes.length>0 && <button className="text-xs text-red-500 underline" onClick={handleClearSizes}>Clear</button>}
          </div>
          <div className="flex flex-wrap gap-2">
            {availableSizes.map(size => (
              <button key={size} onClick={() => setLocalFilters(f => ({ ...f, sizes: f.sizes.includes(size) ? f.sizes.filter(s=>s!==size) : [...f.sizes, size] }))}
                className={`px-3 py-1 rounded-full border text-sm ${localFilters.sizes.includes(size)?"bg-black text-white":"bg-white"}`}>{size}</button>
            ))}
          </div>
        </div>

        {/* COLORS */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium">Colors</p>
            {localFilters.colors.length>0 && <button className="text-xs text-red-500 underline" onClick={handleClearColors}>Clear</button>}
          </div>
          <div className="flex flex-wrap gap-2">
            {availableColors.map(color => (
              <button key={color} onClick={() => setLocalFilters(f => ({ ...f, colors: f.colors.includes(color) ? f.colors.filter(c=>c!==color) : [...f.colors,color] }))}
                className={`w-9 md:w-12 h-9 md:h-12 rounded-full border flex items-center justify-center ${localFilters.colors.includes(color)?"ring-2 ring-black":""}`}
                style={{ backgroundColor: colorToHex(color) }}/>
            ))}
          </div>
        </div>

        <button onClick={handleApply} className="mt-4 w-full bg-black text-white py-3 rounded-full text-lg">Apply filters</button>
      </div>
    </div>
  );
}
