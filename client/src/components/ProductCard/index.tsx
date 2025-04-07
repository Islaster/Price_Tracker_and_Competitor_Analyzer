import { ProductContext } from "./ProductContext";
import Image from "./Image";
import Title from "./Title";
import Price from "./Price";
import type { Product } from "../../types";

type ProductCardProps = {
  product: Product;
  children: React.ReactNode;
};

export function ProductCard({ product, children }: ProductCardProps) {
  return (
    <ProductContext.Provider value={product}>
      <div className="bg-white shadow rounded overflow-hidden p-4">
        {children}
      </div>
    </ProductContext.Provider>
  );
}

ProductCard.Image = Image;
ProductCard.Title = Title;
ProductCard.Price = Price;
