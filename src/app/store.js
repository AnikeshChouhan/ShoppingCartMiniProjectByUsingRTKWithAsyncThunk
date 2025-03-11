import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/CartSlice";
import productsReducer from "../features/products/productsSlice";

export const store = configureStore({
  reducer: {
    product: productsReducer,
    cart: cartReducer,
  },
});
