import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface AppState {}

const initialState: AppState = {};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
});

export default appSlice.reducer;
