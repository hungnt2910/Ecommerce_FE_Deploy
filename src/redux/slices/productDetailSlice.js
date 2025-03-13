import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getArticle, getShopInfo } from "../../services/shopService";

const initialState = {
  shopInfomation: {},
  article: [],
  loading: false,
  error: null,
};

export const fetchShopInfomation = createAsyncThunk(
    "productDetails/fetchShopInfomation",
    async (shopId) => {
      const response = await getShopInfo(shopId);
      return response.data;
    }
  );

  export const fetchArticle = createAsyncThunk(
    "productDetails/fetchArticle",
    async () => {
      const response = await getArticle();
      return response.data;
    }
  );


// Create Slice
const productDetailSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShopInfomation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShopInfomation.fulfilled, (state, action) => {
        state.loading = false;
        state.shopInfomation = action.payload;
      })
      .addCase(fetchShopInfomation.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch Shop Infomation";
      })
      .addCase(fetchArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.article = action.payload;
      })
      .addCase(fetchArticle.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch Article";
      })
  },
});

export default productDetailSlice.reducer;