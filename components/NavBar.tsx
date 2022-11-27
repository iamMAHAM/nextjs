import Link from 'next/link';
import React from 'react';

export default function NavBar() {
  return (
    <nav className="flex justify-between h-12 shadow-md items-center">
      <Link href="/" className="text-lg font-bold text-purple-800">
        NaN Tuto
      </Link>
      <div>
        <Link href="/carts" className="p-2">
          carts
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
