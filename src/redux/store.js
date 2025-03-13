import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import cartReducer from './slices/cartSlice'
import wishListReducer from './slices/wishListSlice'
import productDetailReducer from './slices/productDetailSlice'


export const store = configureStore({
  reducer: {
    products: productReducer, 
    cart: cartReducer,
    wishlist: wishListReducer,
    productDetails: productDetailReducer
  },
});
