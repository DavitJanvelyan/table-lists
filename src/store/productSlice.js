import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async function () {
    try {
      const response = await fetch('https://dummyjson.com/products')
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  }
)

export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async function () {
    try {
      const response = await fetch('https://dummyjson.com/products/categories');
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  }
)

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    categories: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, { payload: { products } }) => {
        state.products = products
      })
      .addCase(fetchCategories.fulfilled, (state, { payload }) => {
        state.categories = payload.slice(0, 6);
      })
  }
})

export const allProductsSelector = state => state.products.products

export const allCategoriesSelector = state => state.products.categories

export default productSlice.reducer