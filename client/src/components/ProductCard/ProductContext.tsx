import { createContext, useContext } from "react";
import type { Product } from "../../types";

export const ProductContext = createContext<Product | null>(null);

export function useProduct() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductContext.Provider");
  }
  return context;
}
