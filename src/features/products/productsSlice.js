import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./ProductsAPI";

const initialState = {
  products: [],
  status: "idle",
};

export const fetchAsync = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetchProducts();

    return response.data;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    increment: (state) => {
      state.products += 1;
    },
    decrement: (state) => {
      state.products -= 1;
    },
    incrementByAmount: (state, action) => {
      state.products += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      });
  },
});

export const { increment, decrement, incrementByAmount } =
  productsSlice.actions;

// export const selectCount = (state) => state.counter.value;

export default productsSlice.reducer;
