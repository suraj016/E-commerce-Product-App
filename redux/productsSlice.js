import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    console.log('fetching products...');
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    return data;
  }
);

const initialState = {
  items: [],
  status: 'idle',
  error: null,
  searchQuery: '',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setProducts(state, action) {
      state.items = action.payload;
      state.status = 'succeeded';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSearchQuery, setProducts } = productsSlice.actions;

export const selectFilteredProducts = (state) => {
  const { items, searchQuery } = state.products;
  if (!searchQuery.trim()) return items;
  const q = searchQuery.toLowerCase();
  return items.filter((item) => item.title.toLowerCase().includes(q));
};

export const selectAllProducts = (state) => state.products.items;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;

export default productsSlice.reducer;
