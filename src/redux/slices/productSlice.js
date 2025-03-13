import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getFurnitureCollection,
  getNewShoesCollection,
  getPopularProduct2023,
  getProductById,
  getRelatedProduct,
} from "../../services/productService";

const initialState = {
  popularProduct: [],
  furniture: [],
  relatedProduct: [],
  newShoes: [],
  product: {},
  loading: false,
  error: null,
};

export const fetchPopularProduct = createAsyncThunk(
  "products/fetchPopularProduct",
  async () => {
    const response = await getPopularProduct2023();
    return response;
  }
);

export const fetchFurnitureCollection = createAsyncThunk(
  "products/fetchFurnitureCollection",
  async () => {
    const response = await getFurnitureCollection();
    return response;
  }
);

export const fetchNewShoesCollection = createAsyncThunk(
  "products/fetchNewShoesCollection",
  async () => {
    const response = await getNewShoesCollection();
    return response;
  }
);

export const fetchDetailProduct = createAsyncThunk(
  "products/getProductById",
  async (id, { rejectWithValue }) => {
    const response = await getProductById(id);
    // console.log(response)
    return response;
  }
);

export const fetchRelatedProduct = createAsyncThunk(
  "products/fetchRelatedProduct",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await getRelatedProduct(categoryId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch");
    }
  }
);

// Create Slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetProductState: (state) => {
      state.product = {};
      state.relatedProduct = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.popularProduct = action.payload;
      })
      .addCase(fetchPopularProduct.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch Popular Products";
      })
      .addCase(fetchFurnitureCollection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFurnitureCollection.fulfilled, (state, action) => {
        state.loading = false;
        state.furniture = action.payload;
      })
      .addCase(fetchFurnitureCollection.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch Furniture Collection";
      })
      .addCase(fetchNewShoesCollection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewShoesCollection.fulfilled, (state, action) => {
        state.loading = false;
        state.newShoes = action.payload;
      })
      .addCase(fetchNewShoesCollection.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch New Shoes Collection";
      })
      .addCase(fetchDetailProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDetailProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchDetailProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchRelatedProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRelatedProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.relatedProduct = action.payload;
      })
      .addCase(fetchRelatedProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch Related Product";
      });
  },
});

export const {resetProductState} = productSlice.actions

export default productSlice.reducer;
