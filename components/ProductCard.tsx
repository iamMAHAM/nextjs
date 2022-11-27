import Link from 'next/link';
import { product } from '../types/product';

export default function ProductCard({
  product,
}: {
  product: product;
}): JSX.Element {
  return (
    <div className="card">
      <Link href={`/products/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          className="rounded shadow"
        />
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/products/${product.slug}`}>
          <h2 className="text-lg">{product.name}</h2>
        </Link>
      </div>
      <p className="mb-2">{product.brand}</p>
      <button className="primary-button" type="button">
        Add to Cart
      </button>
    </div>
  );
}
