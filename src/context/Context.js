import { createContext, useContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { commerce } from "faker";
import { cartReducer, productReducer } from "./Reducers.js";

const Cart = createContext();

const Context = ({ children }) => {
  const products = [...Array(20)].map(() => ({
    id: uuidv4(),
    name: commerce.productName(),
    price: commerce.price(),
    image: `https://picsum.photos/200/300?random=${Math.floor(
      Math.random() * 100
    )}`,
    inStock: Math.floor(Math.random() * 8),
    fastDelivery: Math.random() < 0.5,
    ratings: Math.floor(Math.random() * 5) + 1,
  }));

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  console.log(productState);

  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  );
};

export const CartState = () => {
  return useContext(Cart);
};

export default Context;
