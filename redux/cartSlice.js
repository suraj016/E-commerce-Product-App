import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const existing = state.cartItems.find((item) => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const index = state.cartItems.findIndex((item) => item.id === id);
      if (index !== -1) {
        let newQty = quantity;
        if (newQty < 1) {
          newQty = 1;
        }
        state.cartItems[index].quantity = newQty;
      }
    },
    clearCart(state) {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;

export const selectCartItemCount = (state) => {
  const items = state.cart.cartItems;
  if (!items.length) return 0;
  return items.reduce((sum, item) => sum + item.quantity, 0);
};

export const selectCartTotal = (state) => {
  const items = state.cart.cartItems;
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return parseFloat(total.toFixed(2));
};

export default cartSlice.reducer;
