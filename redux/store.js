import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import cartReducer from './cartSlice';

function loadCartFromStorage() {
  try {
    if (typeof window === 'undefined') return undefined;
    const stored = localStorage.getItem('cart');
    if (!stored) return undefined;
    const parsedData = JSON.parse(stored);
    return { cartItems: parsedData };
  } catch (e) {
    return undefined;
  }
}

const cartPreload = loadCartFromStorage();

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
  preloadedState: cartPreload ? { cart: cartPreload } : {},
});

store.subscribe(() => {
  try {
    const cartItems = store.getState().cart.cartItems;
    localStorage.setItem('cart', JSON.stringify(cartItems));
  } catch (e) {
    
  }
});

export default store;
