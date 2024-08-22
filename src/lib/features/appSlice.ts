import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface AppState {
  cityData: any | null;
}

const initialState: AppState = {
  cityData: null,
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCity.fulfilled, (state, action) => {
      state.cityData = action.payload;
    });
  },
});

export default appSlice.reducer;
