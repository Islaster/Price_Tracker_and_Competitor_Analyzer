import { useEffect, useState } from "react";
import type { Product } from "../types";
import { ProductCard } from "./ProductCard/index";

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product}>
            <ProductCard.Image src={product.image} alt={product.title} />
            <ProductCard.Title text={product.title} />
            <ProductCard.Price amount={product.price} />
          </ProductCard>
        ))}
      </div>
    </div>
  );
}
