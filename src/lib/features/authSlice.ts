import {
  changePass,
  getUser,
  login,
  register,
  resetPass,
  updateUser,
} from "@/services/authService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

interface AuthState {
  userToken: any | null;
  isAuthenticated: boolean;
  loading: boolean;
  message: string | null;
  user: any | null;
}

const initialState: AuthState = {
  userToken: null,
  isAuthenticated: false,
  loading: false,
  message: null,
  user: null,
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

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getUser();
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Thao tác thất bại"
      );
    }
  }
);

export const updateUsers = createAsyncThunk(
  "auth/updateUser",
  async ({ user }: { user: any }, { rejectWithValue }) => {
    try {
      const data = await updateUser(user);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Thao tác thất bại"
      );
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async ({ passData }: { passData: any }, { rejectWithValue }) => {
    try {
      const data = await changePass(passData);
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
      state.user = null;
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
        state.userToken = action.payload.token;
        state.isAuthenticated = true;
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
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUsers.fulfilled, (state, action) => {
        toast.success(action.payload.message);
        state.message = action.payload.message;
        state.userToken = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.userToken = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
