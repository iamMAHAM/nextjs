import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { product } from "../types/product";
import { XCircleIcon } from "@heroicons/react/24/outline";
import Layout from "../components/Layout";
import dynamic from "next/dynamic";

import { useRouter } from "next/router";
import { Store } from "../utils/store";

function CartScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);

  const [cartAmount, setCartAmount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    console.log("sstate", state.cart.cartItems);
    setCartAmount(
      state.cart.cartItems.reduce((a, b) => {
        return (a += typeof b.quantity === "number" ? b.quantity : 0);
      }, 0)
    );

    setTotal(
      state.cart.cartItems.reduce((a, b) => {
        const q = typeof b.quantity === "number" ? b.quantity : 0;
        return (a += q * b.price);
      }, 0)
    );
  }, [state]);

  const removeItemHandler = (item: product) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const updateQuantity = (product: product, quantity: number) => {
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity: quantity },
    });
  };

  return (
    <Layout title="Shopping Cart">
      <h1 className="mb-4 text-xl">Shopping Cart</h1>
      {state.cart.cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full ">
              <thead className="border-b">
                <tr>
                  <th className="p-5 text-left">Item</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {state.cart.cartItems.map((item: product) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <Link href={`/product/${item.slug}`}>
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                        ></Image>
                        &nbsp;
                        {item.name}
                      </Link>
                    </td>
                    <td className="p-5 text-right">
                      <select
                        name="selectquantity"
                        defaultValue={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item, Number(e.target.value))
                        }
                      >
                        {[...Array(item.countInsStock).keys()]!.map(
                          (number, index) => {
                            return (
                              <option key={index} value={number + 1}>
                                {number + 1}
                              </option>
                            );
                          }
                        )}
                      </select>
                    </td>
                    <td className="p-5 text-right">${item.price}</td>
                    <td className="p-5 text-center">
                      <button onClick={() => removeItemHandler(item)}>
                        <XCircleIcon
                          className="h-5 w-5"
                          title="remove"
                        ></XCircleIcon>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5">
            <ul>
              <li>
                <div className="pb-3 text-xl">
                  Subtotal ({cartAmount}) : ${total}
                </div>
              </li>
              <li>
                <button
                  onClick={() => router.push("/shipping")}
                  className="primary-button w-full"
                >
                  Check Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
