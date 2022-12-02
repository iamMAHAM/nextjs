import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import data from "../../utils/data";
import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect } from "react";
import { Store } from "../../utils/store";

const ProductScreen = () => {
  const { query } = useRouter();
  const { slug } = query;
  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    console.log(state.cart.cartItems);
  }, [state]);

  const product = data.products.find((p) => p.slug === slug);

  if (!product) return <div className="text-center">Product not found</div>;

  const addToCart = () => {
    const exist = state.cart.cartItems.find((c) => c.slug === product.slug);
    const quantity =
      exist && typeof exist.quantity === "number" ? exist.quantity + 1 : 1;
    if (!(product.countInsStock >= quantity)) {
      alert("out of stock");
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity: quantity },
    });
  };
  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/">Back to Product</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            sizes="100vw"
            priority
          />
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg"> {product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>brand: {product.brand}</li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>Description: {product.description}</li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div className="Price">Price</div>
              <div>$ {product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div className="Price">Status</div>
              <div>
                {product.countInsStock > 0 ? "In Stock" : "Unaivalable"}
              </div>
            </div>
            <button className="w-full bg-amber-300 p-3 ra" onClick={addToCart}>
              Add To cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductScreen;
