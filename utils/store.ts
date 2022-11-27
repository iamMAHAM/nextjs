import { createContext, useReducer } from 'react';
import { product } from '../types/product';
export const Store = createContext();

type action = {
  type: string;
  payload: product;
};

type state = {
  cart: {
    cartItems: Array<product>;
  };
};

const initialState: state = {
  cart: { cartItems: [] },
};

const reducer = (state = initialState, action: action) => {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      const newItem: product = action.payload;
      const exist = state.cart.cartItems.find(
        (item) => item.slug === newItem.slug
      );
      const cartItems = exist
        ? state.cart.cartItems.map((item) =>
            item.slug === exist.slug ? newItem : item
          )
        : state.cart.cartItems;
      return { ...state, cart: { ...state.cart, cartItems } };

    default:
      return state;
  }
};

export const StoreProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  const Provider = Store.Provider;

  return <Provider value={value}> {children}</Provider>;
};
