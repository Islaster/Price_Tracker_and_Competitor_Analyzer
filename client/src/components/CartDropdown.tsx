import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function CartDropdown() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://pricetrackerandcompetitorana-production.up.railway.app//api/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: cart.map((item) => ({
              price_data: {
                currency: "usd",
                product_data: {
                  name: item.title,
                },
                unit_amount: Math.round(item.price * 100),
              },
              quantity: item.quantity,
            })),
          }),
        }
      );

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Checkout failed");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute top-4 right-4 z-50">
      <button
        className="bg-gray-800 text-white px-4 py-2 rounded"
        onClick={() => setOpen(!open)}
      >
        Cart ({cart.length})
      </button>

      {open && (
        <div className="bg-white shadow-lg rounded p-4 mt-2 w-72 border">
          <h2 className="font-bold text-lg mb-2">Cart Items</h2>
          {cart.length === 0 ? (
            <p className="text-sm text-gray-500">Your cart is empty.</p>
          ) : (
            <>
              <ul className="space-y-2 max-h-60 overflow-y-auto">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="text-sm flex justify-between items-center"
                  >
                    <div>
                      <span className="font-medium">{item.title}</span> ×{" "}
                      {item.quantity}
                      <div className="text-xs text-gray-500">
                        ${item.price.toFixed(2)} each
                      </div>
                    </div>
                    <button
                      className="text-red-500 text-xs"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <div className="border-t mt-2 pt-2 text-sm flex justify-between font-semibold">
                <span>Total:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <button
                onClick={clearCart}
                className="mt-3 text-xs text-red-600 underline"
              >
                Clear Cart
              </button>
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="mt-2 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm"
              >
                {loading ? "Redirecting..." : "Checkout"}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
