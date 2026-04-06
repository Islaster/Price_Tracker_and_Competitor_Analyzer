import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.tsx";
import ProductDetail from "./components/ProductDetail/main.tsx";
import { CartProvider } from "./context/CartContext.tsx";
import Layout from "./layout.tsx";
import { ProductProvider } from "./context/ProductContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CartProvider>
      <ProductProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <App />
                </Layout>
              }
            />
            <Route
              path="api/products/:id"
              element={
                <Layout>
                  <ProductDetail />
                </Layout>
              }
            />
          </Routes>
        </BrowserRouter>
      </ProductProvider>
    </CartProvider>
  </StrictMode>
);
