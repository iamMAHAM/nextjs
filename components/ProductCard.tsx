import Link from "next/link";
import Image from "next/image";
import { product } from "../types/product";
import { useContext } from "react";
import { Store } from "../utils/store";

export default function ProductCard({ product }: { product: product }) {
  const { state, dispatch } = useContext(Store);

  const addToCart = () => {
    const exist = state.cart.cartItems.find((c) => c.slug === product.slug);
    const quantity =
      exist && typeof exist.quantity === "number" ? exist.quantity + 1 : 1;

    if (!(product.countInsStock >= quantity)) {
      alert("out of stock");
      return;
    }
    console.log("i can dispatch now ...");
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity: quantity },
    });
  };

  return (
    <div className="card text-center">
      <Link href={`/product/${product.slug}`}>
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          sizes="100vw"
          priority
          className="shadow m-auto"
        />
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <h2 className="text-lg">{product.name}</h2>
        </Link>
      </div>
      <p className="mb-2">{product.brand}</p>
      <button
        className="primary-button m-auto my-4"
        type="button"
        onClick={addToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}
