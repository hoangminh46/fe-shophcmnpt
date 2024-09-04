import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface AppState {
  cityData: any | null;
  toggleCart: any | null;
  toggleSearch: any | null;
}

const initialState: AppState = {
  cityData: null,
  toggleCart: false,
  toggleSearch: false,
};

export const fetchCity = createAsyncThunk("app/fetchCity", async () => {
  const response = await axios.get(
    "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
  );
  return response.data;
});

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
  },
});

export const { toggleCart, toggleSearch } = appSlice.actions;
export default appSlice.reducer;
