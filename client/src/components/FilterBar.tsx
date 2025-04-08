import { useState, useEffect } from "react";

type Props = {
  categories: string[];
  onFilter: (filters: { category: string; maxPrice: number }) => void;
  maxPriceLimit: number;
};

export default function FilterBar({
  categories,
  onFilter,
  maxPriceLimit,
}: Props) {
  const [category, setCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(0);

  useEffect(() => {
    onFilter({ category, maxPrice });
  }, [category, maxPrice]);

  useEffect(() => {
    setMaxPrice(maxPriceLimit);
  }, [maxPriceLimit]);
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

      <input
        type="range"
        min={0}
        max={maxPriceLimit}
        value={maxPrice}
        onChange={(e) => setMaxPrice(Number(e.target.value))}
      />
      <span>Max Price: ${maxPrice}</span>
    </div>
  );
}
