import { getProduct, getProductById } from "@/services/appService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface AppState {
  cityData: any | null;
  toggleCart: any | null;
  toggleSearch: any | null;
  products: any | null;
  product: any | null;
}

const initialState: AppState = {
  cityData: null,
  toggleCart: false,
  toggleSearch: false,
  products: [],
  product: null,
};

export const fetchCity = createAsyncThunk("app/fetchCity", async () => {
  const response = await axios.get(
    "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
  );
  return response.data;
});

export const fetchProducts = createAsyncThunk(
  "auth/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getProduct();
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Thao tác thất bại"
      );
    }
  }
);

export const fetchProductDetail = createAsyncThunk(
  "auth/fetchProductDetail",
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await getProductById(id);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Thao tác thất bại"
      );
    }
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleCart: (state) => {
      state.toggleCart = !state.toggleCart;
    },
    toggleSearch: (state) => {
      state.toggleSearch = !state.toggleSearch;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCity.fulfilled, (state, action) => {
      state.cityData = action.payload;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(fetchProductDetail.fulfilled, (state, action) => {
      state.product = action.payload;
    });
  },
});

export const { toggleCart, toggleSearch } = appSlice.actions;
export default appSlice.reducer;
