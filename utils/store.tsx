import { createContext, Dispatch, useReducer } from "react";
import { product } from "../types/product";

type action = {
  type: string;
  payload: product;
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
  cart: { cartItems: [] },
};

const data: StoreContent = {
  dispatch: () => console.log("lol initial state"),
  state: initialState,
};

export const Store = createContext<StoreContent>(data);

const reducer = (state = initialState, action: action) => {
  switch (action.type) {
    case "CART_ADD_ITEM": {
      const newItem: product = action.payload;
      const exist = state.cart.cartItems.find(
        (item) => item.slug === newItem.slug
      );
      const cartItems = exist
        ? state.cart.cartItems.map((item) =>
            item.name === exist.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      console.log(cartItems);
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
