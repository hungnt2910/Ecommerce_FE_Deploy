import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../services/API";

const token = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : null;

export const fetchWishlistQuantityAsync = createAsyncThunk(
  "wishlist/fetchWishlistQuantity",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : null;
      if (!token) throw new Error("User not authenticated");

      const response = await axios.get(`${API_URL}wishlist?`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // console.log(response.data.length)

      if (response.status !== 200) {
        throw new Error(
          response.data.message || "Failed to fetch wishlist quantity"
        );
      }

      return response.data.length; // API response should return total quantity
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch wishlist quantity"
      );
    }
  }
);

export const fetchWishlistAsync = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : null;
      if (!token) throw new Error("User not authenticated");

      const response = await axios.get(`${API_URL}wishlist?`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // console.log(response.data.length)

      if (response.status !== 200) {
        throw new Error(
          response.data.message || "Failed to fetch wishlist quantity"
        );
      }

      return response.data; // API response should return total quantity
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch wishlist quantity"
      );
    }
  }
);
// Async thunk for adding to wishlist
export const addToWishlistAsync = createAsyncThunk(
  "wishlist/addToWishlistAsync",
  async ({ productId, status }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        `${API_URL}wishlist/favorite`,
        { product_id: productId, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // console.log(response)

      if (response.status !== 200) {
        throw new Error(response.data.message || "Failed to add to wishlist");
      }

      dispatch(fetchWishlistAsync());

      return { productId, status };
    } catch (error) {
      console.error("Wishlist error:", error);
      return rejectWithValue(
        error.status || "Failed to add to wishlist"
      );
    }
  }
);

const wishListSlice = createSlice({
  name: "wishList",
  initialState: {
    items: [], // Store wishlist items
    totalQuantity: 0, // Store total count
    loading: false,
    error: null,
  },
  reducers: {
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((i) => i.productId !== action.payload);
    },
    clearWishlist: (state) => {
      state.items = [];
      state.totalQuantity = 0;
    },
    resetWishlistState: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlistAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlistAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlistAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToWishlistAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToWishlistAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const index = state.items.findIndex(
          (i) => i.productId === action.payload.productId
        );

        if (action.payload.status) {
          if (index === -1) {
            state.items.push(action.payload);
          }
          state.totalQuantity += 1;
        } else {
          if (index !== -1) {
            state.items.splice(index, 1);
          }
          state.totalQuantity = Math.max(0, state.totalQuantity - 1);
        }
      })
      .addCase(addToWishlistAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchWishlistQuantityAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.totalQuantity = action.payload;
      });
  },
});

export const { removeFromWishlist, clearWishlist, resetWishlistState } =
  wishListSlice.actions;
export default wishListSlice.reducer;
