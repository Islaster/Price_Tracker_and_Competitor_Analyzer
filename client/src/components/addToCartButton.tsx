import { useCart } from "../context/CartContext";
import type { Product } from "../types";
import { motion } from "framer-motion";
import { useState } from "react";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    addToCart(product);
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
  };

  return (
    <motion.button
      onClick={handleClick}
      className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      animate={isClicked ? { scale: [1, 1.2, 1] } : {}}
      transition={{ duration: 0.3 }}
    >
      Add to Cart
    </motion.button>
  );
}
