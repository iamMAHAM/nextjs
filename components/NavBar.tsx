import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../utils/store";

export default function NavBar() {
  const { state, dispatch: _ } = useContext(Store);
  const [cartAmount, setCartAmount] = useState(0);

  useEffect(() => {
    setCartAmount(
      state.cart.cartItems.reduce((a, b) => {
        return (a += typeof b.quantity === "number" ? b.quantity : 0);
      }, 0)
    );
  }, [state]);
  return (
    <nav className="flex justify-between h-12 shadow-md items-center">
      <Link href="/" className="text-lg font-bold text-purple-800">
        {" "}
        Train
      </Link>
      <div>
        <Link href="/cart" className="p-2">
          cart
          <span className="rounded text-red-500 text-xl p-2">
            {cartAmount > 0 && cartAmount}
          </span>
        </Link>
        <Link href="/favorites" className="p-2">
          favorites
        </Link>
        <Link href="/login" className="p-2">
          login
        </Link>
      </div>
    </nav>
  );
}
