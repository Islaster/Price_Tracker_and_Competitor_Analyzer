import { useState, useEffect } from "react";

type Props = {
  categories: string[];
  onFilter: (filters: {
    category: string;
    maxPrice: number;
    minPrice: number;
  }) => void;
  maxPriceLimit: number;
  minPriceLimit: number;
};

export default function FilterPanel({
  categories,
  onFilter,
  maxPriceLimit,
  minPriceLimit,
}: Props) {
  const [category, setCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);

  useEffect(() => {
    if (maxPriceLimit === 0) return;
    onFilter({ category, maxPrice, minPrice });
  }, [category, maxPrice, minPrice]);

  useEffect(() => {
    setMaxPrice(maxPriceLimit);
  }, [maxPriceLimit]);

  useEffect(() => {
    setMinPrice(minPriceLimit);
  }, [minPriceLimit]);

  return (
    <aside className="flex flex-col gap-6 w-56 min-w-56 border-r border-gray-200 p-4 pt-0 min-h-screen">
      {/* Category */}
      <div className="pt-14">
        <h3 className="font-medium text-sm text-gray-800 mb-3">Category</h3>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="category"
              value="all"
              checked={category === "all"}
              onChange={() => setCategory("all")}
              className="accent-blue-500"
            />
            <span
              className={`text-sm ${
                category === "all"
                  ? "font-medium text-gray-900"
                  : "text-gray-600"
              }`}
            >
              All categories
            </span>
          </label>
          {categories.map((c) => (
            <label key={c} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                value={c}
                checked={category === c}
                onChange={() => setCategory(c)}
                className="accent-blue-500"
              />
              <span
                className={`text-sm ${
                  category === c ? "font-medium text-gray-900" : "text-gray-600"
                }`}
              >
                {c}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <h3 className="font-medium text-sm text-gray-800 mb-3">Price range</h3>
        <div className="relative w-full h-6 flex items-center">
          {/* Gray base track */}
          <div className="absolute w-full h-1 rounded bg-gray-200" />

          {/* Blue active track */}
          <div
            className="absolute h-1 bg-blue-500"
            style={{
              left: `${
                ((minPrice - minPriceLimit) / (maxPriceLimit - minPriceLimit)) *
                100
              }%`,
              right: `${
                100 -
                ((maxPrice - minPriceLimit) / (maxPriceLimit - minPriceLimit)) *
                  100
              }%`,
            }}
          />

          {/* Min thumb */}
          <input
            type="range"
            min={minPriceLimit}
            max={maxPriceLimit}
            value={minPrice}
            onChange={(e) =>
              setMinPrice(Math.min(Number(e.target.value), maxPrice - 1))
            }
            className="absolute w-full pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer"
          />

          {/* Max thumb */}
          <input
            type="range"
            min={minPriceLimit}
            max={maxPriceLimit}
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(Math.max(Number(e.target.value), minPrice + 1))
            }
            className="absolute w-full pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer"
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>${minPrice}</span>
          <span>${maxPrice}</span>
        </div>
      </div>

      {/* Clear */}
      <button
        onClick={() => {
          setCategory("all");
          setMinPrice(minPriceLimit);
          setMaxPrice(maxPriceLimit);
        }}
        className="text-xs text-blue-600 hover:underline text-left"
      >
        Clear filters
      </button>
    </aside>
  );
}
