import { useProductContext } from "../context/ProductContext";
import { ProductCard } from "./ProductCard";
import { Link } from "react-router";
import AddToCartButton from "./addToCartButton";

export default function ProductGrid() {
  const { filtered } = useProductContext();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-14">
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
  );
}
