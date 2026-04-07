// ShopPage.tsx
import FilterPanel from "../components/FilterPanel";
import ProductGrid from "../components/ProductGrid";
import { useProductContext } from "../context/ProductContext";
import { useEffect, useState } from "react";
import { groupByCategory } from "../utils/groupByCategory";

type FilterParamsValue = {
  categories: string[];
  prices: number[];
  maxPrice: number;
  minPrice: number;
};

export default function ShopPage() {
  const { products, setFiltered } = useProductContext();
  const [filterParams, setFilterParams] = useState<FilterParamsValue>({
    categories: [],
    prices: [],
    maxPrice: 0,
    minPrice: 0,
  });

  const handleFilter = ({
    category,
    maxPrice,
    minPrice,
  }: {
    category: string;
    maxPrice: number;
    minPrice: number;
  }) => {
    const categoryProducts =
      category === "all"
        ? products
        : products.filter((p) => p.category.name === category);
    const newMaxPrice = categoryProducts.length
      ? Math.max(...categoryProducts.map((p) => p.price))
      : 0;
    const newMinPrice = categoryProducts.length
      ? Math.min(...categoryProducts.map((p) => p.price))
      : 0;
    setFilterParams((prev) => ({
      ...prev,
      maxPrice: newMaxPrice,
      minPrice: newMinPrice,
    }));
    setFiltered(
      categoryProducts.filter((p) => p.price <= maxPrice && p.price >= minPrice)
    );
  };

  useEffect(() => {
    const categories = Object.keys(groupByCategory(products));
    const prices = products.map((p) => p.price);
    const maxPrice = prices.length ? Math.max(...prices) : 0;
    const minPrice = prices.length ? Math.min(...prices) : 0;
    setFilterParams((prev) => ({
      ...prev,
      categories,
      prices,
      maxPrice,
      minPrice,
    }));
  }, [products]);

  return (
    <div className="flex min-h-screen items-stretch">
      <FilterPanel
        categories={filterParams.categories}
        onFilter={handleFilter}
        maxPriceLimit={filterParams.maxPrice}
        minPriceLimit={filterParams.minPrice}
      />
      <main className="flex-1 p-6">
        <ProductGrid />
      </main>
    </div>
  );
}
