import { createContext, Dispatch, useReducer } from "react";
import { product } from "../types/product";
import Cookies from "js-cookie";

type action = {
  type: string;
  payload: product;
};

const cartItems = () => {
  const hasCart = Cookies.get("cart");
  const cartItems: Array<product> = hasCart ? JSON.parse(hasCart) : [];
  return cartItems;
};

type state = {
  cart: {
    cartItems: Array<product>;
  };
};

interface StoreContent {
  dispatch: Dispatch<action>;
  state: state;
}

const initialState: state = {
  cart: { cartItems: cartItems() },
};

const data: StoreContent = {
  dispatch: () => {},
  state: initialState,
};

export const Store = createContext<StoreContent>(data);

const reducer = (state = initialState, action: action) => {
  switch (action.type) {
    case "CART_ADD_ITEM": {
      console.log("adding new item");
      const newItem: product = action.payload;
      const exist = state.cart.cartItems.find(
        (item) => item.slug === newItem.slug
      );
      const cartItems = exist
        ? state.cart.cartItems.map((item) =>
            item.name === exist.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      Cookies.set("cart", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.slug !== action.payload.slug
      );
      Cookies.set("cart", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    default:
      return state;
  }
};

export const StoreProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}> {children} </Store.Provider>;
};
