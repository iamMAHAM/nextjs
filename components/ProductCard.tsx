import Link from "next/link";
import Image from "next/image";
import { product } from "../types/product";

export default function ProductCard({ product }: { product: product }) {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          sizes="100vw"
          className="rounded shadow"
        />
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
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
