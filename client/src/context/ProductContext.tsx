import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
} from "react";
import { Product } from "../types";

type ProductContextType = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  filtered: Product[];
  setFiltered: React.Dispatch<React.SetStateAction<Product[]>>;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_SERVER_URL)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFiltered(data);
      });
  }, []);
  const value = useMemo(
    () => ({
      products,
      setProducts,
      filtered,
      setFiltered,
    }),
    [products, filtered]
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export function useProductContext() {
  const ctx = useContext(ProductContext);
  if (!ctx) {
    throw new Error(
      "useProductContext must be used inside <ProductProvider />"
    );
  }
  return ctx;
}
