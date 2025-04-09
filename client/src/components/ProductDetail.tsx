// components/ProductDetail.tsx
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import type { Product } from "../types";
import AddToCartButton from "./addToCartButton";
import BackButton from "./backButton";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(
      `https://pricetrackerandcompetitorana-production.up.railway.app//api/products/${id}`
    )
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch(() => setProduct(null));
  }, [id]);

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <BackButton />
      <img
        src={product.image}
        alt={product.title}
        className="w-1/2 h-auto object-contain mx-auto"
      />
      <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
      <p className="text-xl text-gray-600 mb-4">${product.price.toFixed(2)}</p>
      <p className="text-gray-800">{product.description}</p>
      <AddToCartButton product={product} />
    </div>
  );
}
