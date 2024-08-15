import { login, register, resetPass } from "@/services/authService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
      return rejectWithValue(
        error.response?.data?.message || "Đăng nhập thất bại"
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    {
      id,
      email,
      password,
      fullName,
    }: { id: string; email: string; password: string; fullName: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await register(id, email, password, fullName);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Đăng ký thất bại"
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/reset",
  async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
      const data = await resetPass(email);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Thao tác thất bại"
      );
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
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
