import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../services/API";

// Fetch token from localStorage or authentication state
const token = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : null;

export const fetchCartQuantityAsync = createAsyncThunk(
  "cart/fetchCartQuantity",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : null;
      if (!token) throw new Error("User not authenticated");

      const response = await axios.get(`${API_URL}cart/quantity`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status !== 200) {
        throw new Error(
          response.data.message || "Failed to fetch cart quantity"
        );
      }

      return response.data.quantityItemsCart; // API response should return total quantity
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart quantity"
      );
    }
  }
);

export const fetchCartListAsync = createAsyncThunk(
  "cart/fetchCartList",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : null;
      if (!token) throw new Error("User not authenticated");

      const response = await axios.get(`${API_URL}cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(response);

      if (response.status !== 200) {
        throw new Error(
          response.data.message || "Failed to fetch cart quantity"
        );
      }

      return response.data; // API response should return total quantity
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart quantity"
      );
    }
  }
);

// Async thunk for adding item to cart
export const addToCartAsync = createAsyncThunk(
  "cart/addToCartAsync",
  async ({ variantId, quantity }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        `${API_URL}cart/add`,
        { variant_id: variantId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status !== 200) {
        throw new Error(response.data.message || "Add to cart failed");
      }

      dispatch(fetchCartQuantityAsync());
      dispatch(fetchCartListAsync());

      return { variantId, quantity }; // Return payload for Redux
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add to cart"
      );
    }
  }
);

export const deleteItemCartAsync = createAsyncThunk(
  "cart/deleteItemCartAsync",
  async (item_id, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(`${API_URL}cart/${item_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status !== 200) {
        throw new Error(response.data.message || "Add to cart failed");
      }

      dispatch(fetchCartQuantityAsync())

      return { item_id }; // Return payload for Redux
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add to cart"
      );
    }
  }
);

export const updateItemQuantityCartAsync = createAsyncThunk(
  "cart/updateItemQuantityCartAsync",
  async ({ item_id, quantity }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.put(
        `${API_URL}cart/update`,
        { item_id: item_id, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(response);

      if (response.status !== 200) {
        throw new Error(response.data.message || "Update cart failed");
      }
      return { item_id, quantity };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update cart"
      );
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Store cart items
    totalQuantity: 0, // Store total count
    loading: false,
    error: null,
  },
  reducers: {
    addItemLocally: (state, action) => {
      const { variantId, quantity } = action.payload;
      const item = state.items.find((i) => i.variantId === variantId);
  
      if (item) {
        item.quantity += quantity;
      } else {
        state.items.push({ variantId, quantity });
      }
      state.totalQuantity += quantity;
    },
    removeItemLocally: (state, action) => {
      state.items = state.items.filter(item => item.variantId !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
    },
    resetCartState: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart Quantity
      .addCase(fetchCartQuantityAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartQuantityAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.totalQuantity = action.payload;
      })
      .addCase(fetchCartQuantityAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add to Cart
      .addCase(addToCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const item = state.items.find(
          (i) => i.variantId === action.payload.variantId
        );

        if (item) {
          state.totalQuantity = state.items.reduce(
            (sum, i) => sum + i.quantity,
            0
          );
        }
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCartListAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartListAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload.items;
      })
      .addCase(fetchCartListAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //handle delete
      .addCase(deleteItemCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteItemCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          (item) => item.item_id !== action.payload.item_id
        );
      })
      .addCase(deleteItemCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle quantity update
      .addCase(updateItemQuantityCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateItemQuantityCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        const item = state.items.find(
          (item) => item.item_id === action.payload.item_id
        );
        if (item) {
          item.quantity = action.payload.quantity;
        }
      })
      .addCase(updateItemQuantityCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { removeFromCart, clearCart, resetCartState, addItemLocally } = cartSlice.actions;
export default cartSlice.reducer;
