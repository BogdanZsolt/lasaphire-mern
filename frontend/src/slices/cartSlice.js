import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: '' };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find(
        (x) =>
          x._id === item._id && x.color === item.color && x.size === item.size
      );

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === item._id && x.color === item.color ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      const item = action.payload;

      state.cartItems = state.cartItems.filter((x) => x.cartId !== item.cartId);

      return updateCart(state);
    },
    saveBillingAddress: (state, action) => {
      state.billingAddress = action.payload;
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    saveShippingPriceData: (state, action) => {
      state.shippingPriceData = action.payload;
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    // eslint-disable-next-line no-unused-vars
    clearCartItems: (state, action) => {
      state.cartItems = [];
      return updateCart(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveBillingAddress,
  saveShippingAddress,
  saveShippingPriceData,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
