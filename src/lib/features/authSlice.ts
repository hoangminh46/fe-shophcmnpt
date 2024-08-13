import { login } from "@/services/authService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner"

interface AuthState {
  userToken: any | null;
  isAuthenticated: boolean;
  loading: boolean;
  message: string | null;
}

const initialState: AuthState = {
  userToken: null,
  isAuthenticated: false,
  loading: false,
  message: null,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await login(email, password);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Đăng nhập thất bại");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.userToken = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.userToken = action.payload.token;
        state.message = action.payload.message;
        toast.success(state.message)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
        toast.error(state.message)
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
