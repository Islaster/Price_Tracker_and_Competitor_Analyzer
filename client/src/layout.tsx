// src/Layout.tsx
import { ReactNode } from "react";
import CartDropdown from "./components/CartDropdown";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <CartDropdown />
      <main>{children}</main>
    </div>
  );
}
