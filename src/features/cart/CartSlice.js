import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addItem, deleteItem, fetchItems, updateItem } from "./CartsAPI";

const initialState = {
  items: [],
  status: "idle",
};

// its  all actions creaters
// 1 asyncThunk for fetching data
export const fetchAsync = createAsyncThunk("cart/fetchCart", async () => {
  const response = await fetchItems();
  return response.data;
});
// 2 asyncThunk for add data
export const addAsync = createAsyncThunk("cart/addItem", async (item) => {
  const { id, title, brand, thumbnail, price } = item;
  const response = await addItem({
    id,
    title,
    brand,
    thumbnail,
    price,
    quantity: 1,
  });

  return response.data;
});

// 3 asyncThunk for update data
export const updateAsync = createAsyncThunk(
  "cart/updateItem",
  async ({ id, change }) => {
    const response = await updateItem(id, change);
    return response.data;
  }
);
// 4 asyncThunk for delete data
export const deleteAsync = createAsyncThunk("cart/deleteItem", async (id) => {
  await deleteItem(id);
  return id;
});

// its all Reducer for Action its useable after dispatch any action
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state) => {
      state.items += 1;
    },
    decrement: (state) => {
      state.items -= 1;
    },
    incrementByAmount: (state, action) => {
      state.items += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(addAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(deleteAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload
        );
        state.items.splice(index, 1);
      })
      .addCase(updateAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items.splice(index, 1, action.payload);
      });
    // .addCase(updateAsync.fulfilled, (state, action) => {
    //     state.status = "idle";
    //     const index = state.items.findIndex(
    //       (item) => item.id === action.payload.id
    //     );
    //     if (index !== -1) {
    //       state.items[index] = { ...state.items[index], ...action.payload };
    //     }
    //   });
  },
});

export const { increment, decrement, incrementByAmount } = cartSlice.actions;

// export const selectCount = (state) => state.counter.value;

export default cartSlice.reducer;
