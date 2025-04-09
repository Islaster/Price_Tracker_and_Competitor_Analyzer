import { useEffect, useState } from "react";
import type { Product } from "../types";
import { ProductCard } from "./ProductCard/index";
import FilterBar from "./FilterBar";
import { groupByCategory } from "../utils/groupByCategory";
import { Link } from "react-router";
import AddToCartButton from "./addToCartButton";

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);

  useEffect(() => {
    fetch(
      "https://pricetrackerandcompetitorana-production.up.railway.app/api/products"
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFiltered(data);
      });
  }, []);

  const handleFilter = ({
    category,
    maxPrice,
  }: {
    category: string;
    maxPrice: number;
  }) => {
    const newFiltered = products.filter((product) => {
      const matchesCategory =
        category === "all" || product.category === category;
      const matchesPrice = product.price <= maxPrice;
      return matchesCategory && matchesPrice;
    });
    setFiltered(newFiltered);
  };

  const categories = Object.keys(groupByCategory(products));
  const prices = products.map((product) => product.price);
  const maxPrice = Math.max(...prices);

  return (
    <div className="p-6">
      <FilterBar
        categories={categories}
        onFilter={handleFilter}
        maxPriceLimit={maxPrice}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product}>
            <Link to={`api/products/${product.id}`}>
              <ProductCard.Image src={product.image} alt={product.title} />
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
