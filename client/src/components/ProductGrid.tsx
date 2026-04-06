import { ProductCard } from "./ProductCard/index";
import FilterBar from "./FilterBar";
import { groupByCategory } from "../utils/groupByCategory";
import { Link } from "react-router";
import AddToCartButton from "./addToCartButton";
import { useProductContext } from "../context/ProductContext";
import { useEffect, useState } from "react";

type FilterParamsValue = {
  categories: string[];
  prices: number[];
  maxPrice: number;
  minPrice: number;
};

export default function ProductGrid() {
  const { products, filtered, setFiltered } = useProductContext();
  const [filterParms, setFilterParams] = useState<FilterParamsValue>({
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

    const newFiltered = categoryProducts.filter(
      (p) => p.price <= maxPrice && p.price >= minPrice
    );
    setFiltered(newFiltered);
  };
  useEffect(() => {
    const categories = Object.keys(groupByCategory(products));
    const prices = products.map((product) => product.price);
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
    <div className="p-6">
      <FilterBar
        categories={filterParms.categories}
        onFilter={handleFilter}
        maxPriceLimit={filterParms.maxPrice}
        minPriceLimit={filterParms.minPrice}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product}>
            <Link to={`api/products/${product.id}`}>
              <ProductCard.Image images={product.images} alt={product.title} />
              <ProductCard.Title text={product.title} />
              <ProductCard.Price amount={product.price} />
            </Link>
            <AddToCartButton product={product} />
          </ProductCard>
        ))}
      </div>
    </div>
  );
}
