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

export default function FilterBar({
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
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
      <select
        className="border rounded p-2"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="all">All Categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <div className="relative w-48 h-6 flex items-center">
        {/* Gray base track */}
        <div className="absolute w-full h-1 rounded bg-gray-200" />

        {/* Blue active track between thumbs */}
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
          onChange={(e) => {
            const val = Math.min(Number(e.target.value), maxPrice - 1);
            setMinPrice(val);
          }}
          className="absolute w-full pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer"
        />

        {/* Max thumb */}
        <input
          type="range"
          min={minPriceLimit}
          max={maxPriceLimit}
          value={maxPrice}
          onChange={(e) => {
            const val = Math.max(Number(e.target.value), minPrice + 1);
            setMaxPrice(val);
          }}
          className="absolute w-full pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer"
        />
      </div>
      <span>
        ${minPrice} - ${maxPrice}
      </span>
    </div>
  );
}
