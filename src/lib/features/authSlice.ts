import { getOrderByUserId } from "@/services/appService";
import {
  changePass,
  deleteProduct,
  editQuantityProduct,
  getUser,
  login,
  logout,
  register,
  updateUser,
  verifyRegister,
  sendResetCode,
  verifyResetCode,
  sendResetPassword
} from "@/services/authService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";

interface AuthState {
  userToken: any | null;
  isAuthenticated: boolean;
  loading: boolean;
  message: string | null;
  user: any | null;
  cart: any | null;
  order: any | null;
}

const initialState: AuthState = {
  userToken: null,
  isAuthenticated: false,
  loading: false,
  message: null,
  user: null,
  cart: null,
  order: null,
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

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const data = await logout();
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Đăng xuất thất bại"
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    {
      email,
      password,
      fullName,
    }: { email: string; password: string; fullName: string},
    { rejectWithValue }
  ) => {
    try {
      const data = await register(email, password, fullName);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Đăng ký thất bại"
      );
    }
  }
);

export const verifyUserOTP = createAsyncThunk(
  "auth/verify-otp",
  async (
    {
      email,
      otp
    }: { email: string; otp: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await verifyRegister(email, otp);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Đăng ký thất bại"
      );
    }
  }
);

export const handleResetCode = createAsyncThunk(
  "auth/reset-code",
  async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
      const data = await sendResetCode(email);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Thao tác thất bại"
      );
    }
  }
);

export const handleVerifyResetCode = createAsyncThunk(
  "auth/verify-reset-code",
  async ({ email, otp }: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      const data = await verifyResetCode(email, otp);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Thao tác thất bại"
      );
    }
  }
);

export const handleResetPassword = createAsyncThunk(
  "auth/reset-password",
  async ({ email, newPassword }: { email: string; newPassword: string }, { rejectWithValue }) => {
    try {
      const data = await sendResetPassword(email, newPassword);
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

export const deleteProductFormCart = createAsyncThunk(
  "auth/deleteProductFormCart",
  async (infoDelete: any, { rejectWithValue }) => {
    try {
      const data = await deleteProduct(infoDelete);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Thao tác thất bại"
      );
    }
  }
);

export const fetchOrder = createAsyncThunk(
  "auth/fetchOrder",
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await getOrderByUserId(id);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Thao tác thất bại"
      );
    }
  }
);

export const changeQuantityProduct = createAsyncThunk(
  "auth/changeQuantityProduct",
  async (infoChange: any, { rejectWithValue }) => {
    try {
      const data = await editQuantityProduct(infoChange);
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
  reducers: {},
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
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.userToken = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.message = null;
        state.user = null;
        state.cart = null;
        state.order = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload as string;
        toast.error(action.payload as string);
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
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUsers.fulfilled, (state, action) => {
        toast.success(action.payload.message);
        state.message = action.payload.message;
        state.userToken = action.payload.token;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.userToken = null;
      })
      .addCase(deleteProductFormCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(changeQuantityProduct.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.order = action.payload;
      });
  },
});

// export const {  } = authSlice.actions;
export default authSlice.reducer;
