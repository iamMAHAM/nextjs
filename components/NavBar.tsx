import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../utils/store';
import { useSession } from 'next-auth/react';

export default function NavBar() {
  const { state } = useContext(Store);
  const [cartAmount, setCartAmount] = useState(0);
  const { status, data: session } = useSession();

  useEffect(() => {
    console.log('session : ', session);
    console.log('status : ', status);
  }, [session]);

  useEffect(() => {
    setCartAmount(
      state.cart.cartItems.reduce((a, b) => {
        return (a += typeof b.quantity === 'number' ? b.quantity : 0);
      }, 0)
    );
  }, [state.cart.cartItems]);

  return (
    <nav className="flex justify-between h-12 shadow-md items-center">
      <Link href="/" className="text-lg font-bold text-purple-800">
        {' '}
        Train
      </Link>
      <div>
        <Link href="/cart" className="p-2">
          cart
          {cartAmount > 0 && (
            <span className="rounded text-red-500 text-xl p-2">
              {cartAmount}
            </span>
          )}
        </Link>
        <Link href="/favorites" className="p-2">
          favorites
        </Link>
        {status === 'loading' ? (
          'Loading'
        ) : session?.user ? (
          session.user?.name
        ) : (
          <Link href="/login" className="p-2">
            login
          </Link>
        )}
      </div>
    </nav>
  );
}
